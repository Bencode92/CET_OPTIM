import React, { useState, useMemo, useCallback } from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell
} from 'recharts';
import * as XLSX from 'xlsx';

// ─── RGDU 2026 Parameters ───────────────────────────────────────────────────
const RGDU = {
  smicHoraire: 12.02,
  seuil: 3,
  tMin: 0.02,
  tMax: 0.4013,
  tDelta: 0.3813,
  puissance: 1.75,
};

const COTIS_PATRONALES_RATE = 0.48;
const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
const TAB_NAMES = ['Upload', 'Simulation', 'Graphiques', 'Synthèse', 'PERCOL'];

// ─── RGDU Calculation ───────────────────────────────────────────────────────
function computeRgdu(hrs, brut) {
  if (hrs <= 0 || brut <= 0) return 0;
  const smicRef = hrs * RGDU.smicHoraire;
  const ratio = (RGDU.seuil * smicRef) / brut;
  if (ratio <= 1) return 0;
  const inner = 0.5 * (ratio - 1);
  const c = Math.min(
    RGDU.tMin + RGDU.tDelta * Math.pow(inner, RGDU.puissance),
    RGDU.tMax
  );
  return c * brut;
}

function computeRow(row, pctIfm, pctIccp) {
  const { hrs, brut, ifm, iccp } = row;
  const cetIfm = ifm * pctIfm;
  const cetIccp = iccp * pctIccp;
  const cetTotal = cetIfm + cetIccp;
  const brutCet = brut - cetIfm - cetIccp;
  const redBase = computeRgdu(hrs, brut);
  const redCet = computeRgdu(hrs, brutCet);
  const gain = redCet - redBase;
  return { ...row, cetIfm, cetIccp, cetTotal, brutCet, redBase, redCet, gain };
}

// ─── CSV/XLSX Parser ────────────────────────────────────────────────────────
function parseFileData(arrayBuffer, fileName) {
  const ext = fileName.split('.').pop().toLowerCase();
  let rows;
  if (ext === 'csv') {
    const text = new TextDecoder('utf-8').decode(arrayBuffer);
    const wb = XLSX.read(text, { type: 'string' });
    rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  } else {
    const wb = XLSX.read(arrayBuffer, { type: 'array' });
    rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  }

  const detect = (cols, patterns) =>
    cols.find((c) => {
      const cl = c.toLowerCase();
      return patterns.every((p) => cl.includes(p));
    });

  const cols = rows.length > 0 ? Object.keys(rows[0]) : [];
  const colMap = {
    hrs: detect(cols, ['hrs', 'paye']) || detect(cols, ['heures']),
    brut: detect(cols, ['brut', 'réel']) || detect(cols, ['brut', 'reel']),
    ifm: detect(cols, ['ifm', 'réel']) || detect(cols, ['ifm', 'reel']) || detect(cols, ['ifm']),
    iccp: detect(cols, ['iccp', 'réel']) || detect(cols, ['iccp', 'reel']) || detect(cols, ['iccp']),
    matricule: detect(cols, ['matricule']),
    nom: detect(cols, ['nom']) || detect(cols, ['salarié']) || detect(cols, ['salarie']),
    cotPat: detect(cols, ['cot', 'pat']),
    reduction: detect(cols, ['réduction']) || detect(cols, ['reduction']),
    marge: cols.find((c) => c.toLowerCase().trim() === 'marge'),
  };

  const missing = ['hrs', 'brut', 'ifm', 'iccp'].filter((k) => !colMap[k]);
  if (missing.length > 0) {
    throw new Error(`Colonnes manquantes : ${missing.join(', ')}. Colonnes trouvées : ${cols.join(', ')}`);
  }

  return rows
    .map((r) => ({
      matricule: r[colMap.matricule] || '',
      nom: r[colMap.nom] || '',
      hrs: parseFloat(r[colMap.hrs]) || 0,
      brut: parseFloat(r[colMap.brut]) || 0,
      ifm: parseFloat(r[colMap.ifm]) || 0,
      iccp: parseFloat(r[colMap.iccp]) || 0,
      cotPat: colMap.cotPat ? parseFloat(r[colMap.cotPat]) || 0 : 0,
      reductionActuelle: colMap.reduction ? parseFloat(r[colMap.reduction]) || 0 : 0,
      marge: colMap.marge ? parseFloat(r[colMap.marge]) || 0 : 0,
    }))
    .filter((r) => r.hrs > 0 && r.ifm > 0);
}

// ─── Formatters ─────────────────────────────────────────────────────────────
const fmtEur = (v) =>
  v != null ? v.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }) : '—';
const fmtEur2 = (v) =>
  v != null ? v.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
const fmtPct = (v) => `${(v * 100).toFixed(0)} %`;

// ─── Slider Component ───────────────────────────────────────────────────────
function SliderParam({ label, value, onChange, min = 0, max = 100, step = 1, unit = '%', tooltip }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700" title={tooltip}>
        {label} : <span className="font-bold text-blue-700">{value}{unit}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function Simulateur() {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  // CET sliders
  const [pctIfm, setPctIfm] = useState(30);
  const [pctIccp, setPctIccp] = useState(30);

  // Extrapolation
  const [effectifTotal, setEffectifTotal] = useState(660);

  // PERCOL parameters
  const [forfaitSocial, setForfaitSocial] = useState(16);
  const [rendementCet, setRendementCet] = useState(3);
  const [tauxAdhesion, setTauxAdhesion] = useState(30);

  // ─── File Upload ────────────────────────────────────────────────────────
  const handleFile = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    try {
      const buf = await file.arrayBuffer();
      const parsed = parseFileData(buf, file.name);
      setData(parsed);
      setFileName(file.name);
      setActiveTab(1);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // ─── Computed simulation ────────────────────────────────────────────────
  const simulated = useMemo(
    () => data.map((r) => computeRow(r, pctIfm / 100, pctIccp / 100)),
    [data, pctIfm, pctIccp]
  );

  const totals = useMemo(() => {
    const t = {
      n: simulated.length,
      hrs: 0, brut: 0, ifm: 0, iccp: 0,
      cetTotal: 0, redBase: 0, redCet: 0, gain: 0,
      cotPat: 0, reductionActuelle: 0, marge: 0,
    };
    for (const r of simulated) {
      t.hrs += r.hrs;
      t.brut += r.brut;
      t.ifm += r.ifm;
      t.iccp += r.iccp;
      t.cetTotal += r.cetTotal;
      t.redBase += r.redBase;
      t.redCet += r.redCet;
      t.gain += r.gain;
      t.cotPat += r.cotPat;
      t.reductionActuelle += r.reductionActuelle;
      t.marge += r.marge;
    }
    return t;
  }, [simulated]);

  const extrapolationFactor = totals.n > 0 ? effectifTotal / totals.n : 1;
  const gainAnnuel = totals.gain * 12;
  const gainExtrapole = gainAnnuel * extrapolationFactor;

  // ─── Multi-scenario data for charts ─────────────────────────────────────
  const scenarioData = useMemo(() => {
    const scenarios = [0, 10, 20, 30, 50, 100];
    return scenarios.map((pct) => {
      const rows = data.map((r) => computeRow(r, pct / 100, pct / 100));
      const totalGain = rows.reduce((s, r) => s + r.gain, 0);
      const totalCet = rows.reduce((s, r) => s + r.cetTotal, 0);
      return {
        name: `${pct}%`,
        gainMensuel: totalGain,
        gainAnnuel: totalGain * 12,
        gainExtrapole: totalGain * 12 * extrapolationFactor,
        cetMensuel: totalCet,
      };
    });
  }, [data, extrapolationFactor]);

  // ─── PERCOL Calculations ────────────────────────────────────────────────
  const percolData = useMemo(() => {
    const cetMensuelMoyen = totals.n > 0 ? totals.cetTotal / totals.n : 0;
    const cetAnnuelParSalarie = cetMensuelMoyen * 12;
    const rendement = cetAnnuelParSalarie * (rendementCet / 100);
    const principalPlusRendement = cetAnnuelParSalarie + rendement;

    // Scenario A: Cash direct (no CET at all)
    const cashCotis = cetAnnuelParSalarie * COTIS_PATRONALES_RATE;
    const coutCashDirect = cashCotis;

    // Scenario B: CET → Cash (deferred, still 48% cotisations + rendement paid)
    const cetCashCotis = cetAnnuelParSalarie * COTIS_PATRONALES_RATE;
    const coutCetCash = cetCashCotis + rendement;

    // Scenario C: CET → PERCOL (forfait social only + rendement paid)
    const fs = forfaitSocial / 100;
    const forfaitAmount = principalPlusRendement * fs;
    const coutCetPercol = forfaitAmount + rendement;

    const econPerSalarie = coutCashDirect - coutCetPercol + rendement;
    const econVsCash = coutCashDirect - coutCetPercol;

    const nbAdherents = Math.round(effectifTotal * (tauxAdhesion / 100));
    const econTotale = econVsCash * nbAdherents;

    // Breakdown for 3 adhesion scenarios
    const adhesionScenarios = [20, 30, 50, 70, 100].map((taux) => {
      const nb = Math.round(effectifTotal * (taux / 100));
      return {
        taux: `${taux}%`,
        nbAdherents: nb,
        econAnnuelle: econVsCash * nb,
      };
    });

    return {
      cetMensuelMoyen,
      cetAnnuelParSalarie,
      rendement,
      principalPlusRendement,
      scenarios: [
        {
          name: 'Cash direct',
          principal: cetAnnuelParSalarie,
          rendementVerse: 0,
          cotisations: cashCotis,
          forfait: 0,
          coutEmployeur: coutCashDirect,
          econVsCash: 0,
        },
        {
          name: 'CET → Cash',
          principal: cetAnnuelParSalarie,
          rendementVerse: rendement,
          cotisations: cetCashCotis,
          forfait: 0,
          coutEmployeur: coutCetCash,
          econVsCash: coutCashDirect - coutCetCash,
        },
        {
          name: 'CET → PERCOL',
          principal: cetAnnuelParSalarie,
          rendementVerse: rendement,
          cotisations: 0,
          forfait: forfaitAmount,
          coutEmployeur: coutCetPercol,
          econVsCash: econVsCash,
        },
      ],
      nbAdherents,
      econTotale,
      adhesionScenarios,
    };
  }, [totals, rendementCet, forfaitSocial, effectifTotal, tauxAdhesion]);

  // ═══════════════════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Simulateur CET &times; RGDU 2026
        </h1>
        <p className="text-sm text-gray-500">
          Optimisation charges patronales int&eacute;rim &mdash; Sch&eacute;ma 3 &eacute;tages
          {fileName && <span className="ml-2 text-blue-600">({fileName} &mdash; {data.length} lignes)</span>}
        </p>
      </header>

      {/* ─── Tabs ────────────────────────────────────────────────────────── */}
      <nav className="flex gap-1 mb-6 border-b border-gray-200">
        {TAB_NAMES.map((name, i) => (
          <button
            key={name}
            onClick={() => setActiveTab(i)}
            disabled={i > 0 && data.length === 0}
            className={`px-4 py-2 text-sm font-medium rounded-t transition-colors
              ${activeTab === i
                ? 'bg-white border border-b-0 border-gray-200 text-blue-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
              ${i > 0 && data.length === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {name}
          </button>
        ))}
      </nav>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>
      )}

      {/* ═══ TAB 0 : Upload ═════════════════════════════════════════════════ */}
      {activeTab === 0 && (
        <section className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="mb-4 text-5xl text-gray-300">&#128196;</div>
            <h2 className="text-lg font-semibold mb-2">Charger un fichier Marges</h2>
            <p className="text-sm text-gray-500 mb-6">
              Formats accept&eacute;s : CSV ou XLSX. Colonnes requises : Hrs Paye, Brut r&eacute;el, IFM r&eacute;elles, ICCP r&eacute;elles.
            </p>
            <label className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg cursor-pointer hover:bg-blue-700 transition">
              S&eacute;lectionner un fichier
              <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} className="hidden" />
            </label>
            {fileName && (
              <p className="mt-4 text-green-600 text-sm font-medium">
                &#10003; {fileName} charg&eacute; ({data.length} salari&eacute;s)
              </p>
            )}
          </div>

          <div className="mt-6 bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3 text-sm">Param&egrave;tres RGDU 2026</h3>
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['SMIC horaire', `${RGDU.smicHoraire} \u20ac`],
                  ['Seuil d\'extinction', `${RGDU.seuil} \u00d7 SMIC`],
                  ['Tmin', fmtPct(RGDU.tMin)],
                  ['Tmax', fmtPct(RGDU.tMax)],
                  ['T\u03b4', fmtPct(RGDU.tDelta)],
                  ['Puissance', RGDU.puissance],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-gray-100">
                    <td className="py-1 text-gray-600">{k}</td>
                    <td className="py-1 font-mono text-right">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ═══ TAB 1 : Simulation ═════════════════════════════════════════════ */}
      {activeTab === 1 && data.length > 0 && (
        <section>
          {/* Controls */}
          <div className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SliderParam
              label="% IFM vers CET"
              value={pctIfm}
              onChange={setPctIfm}
              tooltip="Pourcentage de l'IFM affect\u00e9 au CET"
            />
            <SliderParam
              label="% ICCP vers CET"
              value={pctIccp}
              onChange={setPctIccp}
              tooltip="Pourcentage de l'ICCP affect\u00e9 au CET"
            />
            <SliderParam
              label="Effectif total"
              value={effectifTotal}
              onChange={setEffectifTotal}
              min={1}
              max={5000}
              step={10}
              unit=""
              tooltip="Nombre total d'int\u00e9rimaires pour extrapolation"
            />
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              ['CET mensuel total', fmtEur(totals.cetTotal), 'bg-blue-50 text-blue-800'],
              ['Gain RGDU mensuel', fmtEur2(totals.gain), 'bg-green-50 text-green-800'],
              ['Gain annuel (fichier)', fmtEur(gainAnnuel), 'bg-green-50 text-green-800'],
              ['Gain annuel extrapol\u00e9', fmtEur(gainExtrapole), 'bg-amber-50 text-amber-800'],
            ].map(([label, val, cls]) => (
              <div key={label} className={`rounded-xl p-4 ${cls}`}>
                <div className="text-xs font-medium opacity-70">{label}</div>
                <div className="text-xl font-bold mt-1">{val}</div>
              </div>
            ))}
          </div>

          {/* Data table */}
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {['#', 'Matricule', 'Hrs', 'Brut r\u00e9el', 'IFM', 'ICCP',
                    'CET IFM', 'CET ICCP', 'CET Total', 'Brut CET',
                    'R\u00e9d. base', 'R\u00e9d. CET', 'Gain'].map((h) => (
                    <th key={h} className="px-2 py-2 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {simulated.slice(0, 50).map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-2 py-1 text-gray-400">{i + 1}</td>
                    <td className="px-2 py-1 font-mono">{r.matricule}</td>
                    <td className="px-2 py-1 text-right">{r.hrs}</td>
                    <td className="px-2 py-1 text-right">{fmtEur2(r.brut)}</td>
                    <td className="px-2 py-1 text-right">{fmtEur2(r.ifm)}</td>
                    <td className="px-2 py-1 text-right">{fmtEur2(r.iccp)}</td>
                    <td className="px-2 py-1 text-right text-blue-600">{fmtEur2(r.cetIfm)}</td>
                    <td className="px-2 py-1 text-right text-blue-600">{fmtEur2(r.cetIccp)}</td>
                    <td className="px-2 py-1 text-right font-medium text-blue-700">{fmtEur2(r.cetTotal)}</td>
                    <td className="px-2 py-1 text-right">{fmtEur2(r.brutCet)}</td>
                    <td className="px-2 py-1 text-right">{fmtEur2(r.redBase)}</td>
                    <td className="px-2 py-1 text-right">{fmtEur2(r.redCet)}</td>
                    <td className="px-2 py-1 text-right font-bold text-green-700">{fmtEur2(r.gain)}</td>
                  </tr>
                ))}
                {/* Totals row */}
                <tr className="bg-gray-800 text-white font-medium">
                  <td className="px-2 py-2" colSpan={2}>TOTAUX ({totals.n})</td>
                  <td className="px-2 py-2 text-right">{totals.hrs.toFixed(0)}</td>
                  <td className="px-2 py-2 text-right">{fmtEur(totals.brut)}</td>
                  <td className="px-2 py-2 text-right">{fmtEur(totals.ifm)}</td>
                  <td className="px-2 py-2 text-right">{fmtEur(totals.iccp)}</td>
                  <td className="px-2 py-2 text-right">{fmtEur(totals.cetTotal * pctIfm / (pctIfm + pctIccp || 1))}</td>
                  <td className="px-2 py-2 text-right">{fmtEur(totals.cetTotal * pctIccp / (pctIfm + pctIccp || 1))}</td>
                  <td className="px-2 py-2 text-right text-blue-300">{fmtEur(totals.cetTotal)}</td>
                  <td className="px-2 py-2 text-right">{fmtEur(totals.brut - totals.cetTotal)}</td>
                  <td className="px-2 py-2 text-right">{fmtEur(totals.redBase)}</td>
                  <td className="px-2 py-2 text-right">{fmtEur(totals.redCet)}</td>
                  <td className="px-2 py-2 text-right text-green-300">{fmtEur2(totals.gain)}</td>
                </tr>
              </tbody>
            </table>
            {simulated.length > 50 && (
              <p className="text-xs text-gray-400 p-2 text-center">
                Affichage limit&eacute; aux 50 premi&egrave;res lignes sur {simulated.length}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ═══ TAB 2 : Graphiques ═════════════════════════════════════════════ */}
      {activeTab === 2 && data.length > 0 && (
        <section className="space-y-8">
          {/* Bar chart: gain by scenario */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Gain RGDU annuel par sc&eacute;nario CET</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={{ value: '% CET (IFM=ICCP)', position: 'insideBottom', offset: -5 }} />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k\u20ac`} />
                <Tooltip formatter={(v) => fmtEur(v)} />
                <Legend />
                <Bar dataKey="gainAnnuel" name="Gain annuel (fichier)" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gainExtrapole" name={`Gain extrapol\u00e9 (${effectifTotal} sal.)`} fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line chart: gain curve */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Courbe du gain RGDU mensuel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `${v.toFixed(0)}\u20ac`} />
                <Tooltip formatter={(v) => fmtEur2(v)} />
                <Line
                  type="monotone"
                  dataKey="gainMensuel"
                  name="Gain mensuel"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
                <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribution chart: gain per employee */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Distribution du gain par salari&eacute; (mensuel)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={simulated.map((r, i) => ({ idx: i + 1, gain: r.gain, brut: r.brut }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="idx" label={{ value: 'Salari\u00e9', position: 'insideBottom', offset: -5 }} />
                <YAxis tickFormatter={(v) => `${v.toFixed(1)}\u20ac`} />
                <Tooltip formatter={(v) => fmtEur2(v)} />
                <Bar dataKey="gain" name="Gain RGDU" fill="#16a34a" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* ═══ TAB 3 : Synth\u00e8se ═══════════════════════════════════════════════ */}
      {activeTab === 3 && data.length > 0 && (
        <section className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-lg">Synth&egrave;se &mdash; Projection 3 sc&eacute;narios CET</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-2 text-left"></th>
                  <th className="py-2 text-right text-blue-600">Prudent (10%)</th>
                  <th className="py-2 text-right text-amber-600">Moyen (30%)</th>
                  <th className="py-2 text-right text-green-600">Ambitieux (50%)</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const scens = [10, 30, 50].map((pct) => {
                    const rows = data.map((r) => computeRow(r, pct / 100, pct / 100));
                    const g = rows.reduce((s, r) => s + r.gain, 0);
                    const cet = rows.reduce((s, r) => s + r.cetTotal, 0);
                    return {
                      pct,
                      gainMensuel: g,
                      gainAnnuel: g * 12,
                      gainExtrapole: g * 12 * extrapolationFactor,
                      cetMensuel: cet,
                      cetAnnuel: cet * 12,
                      gainMoyenParSalarie: g / (rows.length || 1),
                    };
                  });
                  const lines = [
                    ['CET mensuel (fichier)', (s) => fmtEur(s.cetMensuel)],
                    ['CET annuel (fichier)', (s) => fmtEur(s.cetAnnuel)],
                    ['Gain RGDU mensuel', (s) => fmtEur2(s.gainMensuel)],
                    ['Gain RGDU annuel (fichier)', (s) => fmtEur(s.gainAnnuel)],
                    ['Gain RGDU annuel extrapol\u00e9', (s) => fmtEur(s.gainExtrapole)],
                    ['Gain moyen / salari\u00e9 / mois', (s) => fmtEur2(s.gainMoyenParSalarie)],
                  ];
                  return lines.map(([label, fn]) => (
                    <tr key={label} className="border-b border-gray-100">
                      <td className="py-2 text-gray-600">{label}</td>
                      {scens.map((s) => (
                        <td key={s.pct} className="py-2 text-right font-mono">{fn(s)}</td>
                      ))}
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-gray-400">
              Extrapolation : &times;{extrapolationFactor.toFixed(2)} (fichier {totals.n} &rarr; effectif {effectifTotal}).
              Annualisation &times;12. Les deltas sont fiables, les montants absolus &agrave; recaler.
            </p>
          </div>

          {/* 3-scenario bar chart */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4">Comparaison 3 sc&eacute;narios &mdash; Gain annuel extrapol&eacute;</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[10, 30, 50].map((pct) => {
                  const rows = data.map((r) => computeRow(r, pct / 100, pct / 100));
                  const g = rows.reduce((s, r) => s + r.gain, 0);
                  return {
                    name: `${pct}% CET`,
                    gainExtrapole: g * 12 * extrapolationFactor,
                  };
                })}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k\u20ac`} />
                <Tooltip formatter={(v) => fmtEur(v)} />
                <Bar dataKey="gainExtrapole" name="Gain annuel extrapol\u00e9" radius={[4, 4, 0, 0]}>
                  {[0, 1, 2].map((i) => (
                    <Cell key={i} fill={['#2563eb', '#f59e0b', '#16a34a'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* ═══ TAB 4 : PERCOL ═════════════════════════════════════════════════ */}
      {activeTab === 4 && data.length > 0 && (
        <section className="space-y-6">
          {/* PERCOL parameters */}
          <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <SliderParam
              label="% IFM vers CET"
              value={pctIfm}
              onChange={setPctIfm}
            />
            <SliderParam
              label="% ICCP vers CET"
              value={pctIccp}
              onChange={setPctIccp}
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Forfait social : <span className="font-bold text-blue-700">{forfaitSocial} %</span>
              </label>
              <div className="flex gap-2 mt-1">
                {[16, 20].map((v) => (
                  <button
                    key={v}
                    onClick={() => setForfaitSocial(v)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition
                      ${forfaitSocial === v
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {v}%{v === 16 ? ' (gestion pilot\u00e9e)' : ' (standard)'}
                  </button>
                ))}
              </div>
            </div>
            <SliderParam
              label="Rendement CET"
              value={rendementCet}
              onChange={setRendementCet}
              min={1}
              max={8}
              step={0.5}
              tooltip="Int\u00e9r\u00eats simples servis par l'ETT"
            />
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <SliderParam
              label="Taux d'adh\u00e9sion PERCOL"
              value={tauxAdhesion}
              onChange={setTauxAdhesion}
              min={10}
              max={100}
              step={5}
              tooltip="Part des int\u00e9rimaires transf\u00e9rant CET vers PERCOL"
            />
          </div>

          {/* Comparison table per employee */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-lg">
              Comparaison par int&eacute;rimaire (CET moyen : {fmtEur2(percolData.cetMensuelMoyen)}/mois &rarr; {fmtEur(percolData.cetAnnuelParSalarie)}/an)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="py-2 text-left"></th>
                    <th className="py-2 text-right px-3 text-gray-600">Cash direct</th>
                    <th className="py-2 text-right px-3 text-amber-600">CET &rarr; Cash</th>
                    <th className="py-2 text-right px-3 text-green-600">CET &rarr; PERCOL</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Principal annuel', 'principal'],
                    ['Rendement CET vers\u00e9', 'rendementVerse'],
                    [`Cotisations patronales (${(COTIS_PATRONALES_RATE * 100).toFixed(0)}%)`, 'cotisations'],
                    [`Forfait social (${forfaitSocial}%)`, 'forfait'],
                    ['Co\u00fbt total employeur', 'coutEmployeur'],
                    ['\u00c9conomie vs cash', 'econVsCash'],
                  ].map(([label, key]) => (
                    <tr
                      key={label}
                      className={`border-b border-gray-100 ${key === 'coutEmployeur' ? 'font-bold bg-gray-50' : ''} ${key === 'econVsCash' ? 'font-bold' : ''}`}
                    >
                      <td className="py-2 text-gray-600">{label}</td>
                      {percolData.scenarios.map((s) => (
                        <td
                          key={s.name}
                          className={`py-2 text-right px-3 font-mono ${
                            key === 'econVsCash' && s[key] > 0 ? 'text-green-700' : ''
                          } ${key === 'econVsCash' && s[key] < 0 ? 'text-red-600' : ''}`}
                        >
                          {fmtEur(s[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Extrapolation table */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-4 text-lg">
              Extrapolation &mdash; {effectifTotal} int&eacute;rimaires
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="py-2 text-left">Taux adh&eacute;sion PERCOL</th>
                    <th className="py-2 text-right">Nb adh&eacute;rents</th>
                    <th className="py-2 text-right">&Eacute;conomie annuelle</th>
                  </tr>
                </thead>
                <tbody>
                  {percolData.adhesionScenarios.map((s) => (
                    <tr
                      key={s.taux}
                      className={`border-b border-gray-100 ${s.taux === `${tauxAdhesion}%` ? 'bg-blue-50 font-medium' : ''}`}
                    >
                      <td className="py-2">{s.taux}</td>
                      <td className="py-2 text-right font-mono">{s.nbAdherents}</td>
                      <td className="py-2 text-right font-mono text-green-700 font-bold">{fmtEur(s.econAnnuelle)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PERCOL visual chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">Co&ucirc;t employeur par sc&eacute;nario</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={percolData.scenarios}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(v) => `${v.toFixed(0)}\u20ac`} />
                  <Tooltip formatter={(v) => fmtEur(v)} />
                  <Legend />
                  <Bar dataKey="cotisations" name="Cotisations patronales" stackId="a" fill="#ef4444" />
                  <Bar dataKey="forfait" name="Forfait social" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="rendementVerse" name="Rendement vers\u00e9" stackId="a" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">&Eacute;conomie annuelle par taux d'adh&eacute;sion</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={percolData.adhesionScenarios}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="taux" />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k\u20ac`} />
                  <Tooltip formatter={(v) => fmtEur(v)} />
                  <Bar dataKey="econAnnuelle" name="\u00c9conomie annuelle" radius={[4, 4, 0, 0]}>
                    {percolData.adhesionScenarios.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key insight box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-800 text-lg mb-2">
              Levier principal : {(COTIS_PATRONALES_RATE * 100).toFixed(0)}% &rarr; {forfaitSocial}% = &eacute;conomie de {((COTIS_PATRONALES_RATE - forfaitSocial / 100) * 100).toFixed(0)} points
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">{fmtEur(percolData.scenarios[2]?.econVsCash || 0)}</div>
                <div className="text-sm text-green-600">&eacute;conomie / int&eacute;rimaire / an</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">{percolData.nbAdherents}</div>
                <div className="text-sm text-green-600">adh&eacute;rents PERCOL ({tauxAdhesion}%)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">{fmtEur(percolData.econTotale)}</div>
                <div className="text-sm text-green-600">&eacute;conomie annuelle totale</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-gray-400">
        Simulateur CET &times; RGDU 2026 &mdash; Les deltas sont fiables, les montants absolus sont &agrave; recaler sur bulletin r&eacute;el.
        <br />Formule : C = 0,02 + 0,3813 &times; [&frac12; &times; (3&times;SMIC&times;H/Brut &minus; 1)]^1,75
      </footer>
    </div>
  );
}
