# Instructions pour Claude Code — CET_OPTIM

## ⚠ BUG CRITIQUE À FIXER EN PRIORITÉ

### Parsing CSV français cassé dans `src/simulateur.jsx`

Le fichier CSV d'entrée est en **format français** :
- **Séparateur de champs : point-virgule** (`;`) et non virgule
- **Séparateur décimal : virgule** (`7,08` et non `7.08`)
- **BOM UTF-8** en début de fichier (`\xEF\xBB\xBF`)
- **Retours de ligne Windows** (`\r\n`)

Résultat actuel : `7,08` heures est lu comme `708`, `1062,93 €` comme `106293 €`. **Tout est ×100.**

### Correctif à appliquer dans `parseFileData()` :

La fonction actuelle utilise `XLSX.read(text, { type: 'string' })` pour parser le CSV. SheetJS ne gère pas correctement le format FR.

Remplacer le parsing CSV par cette logique :

```javascript
function parseCSVFrench(text) {
  // 1. Strip BOM
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  
  // 2. Detect delimiter (semicolon vs comma)
  const firstLine = text.split(/\r?\n/)[0];
  const delimiter = firstLine.includes(';') ? ';' : ',';
  
  // 3. Split into lines
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  const headers = lines[0].split(delimiter).map(h => h.trim());
  
  // 4. Parse rows with French decimal handling
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(delimiter);
    const row = {};
    headers.forEach((h, j) => {
      let val = (values[j] || '').trim();
      // Try to parse as French number (replace comma with dot)
      const numVal = val.replace(',', '.');
      const parsed = parseFloat(numVal);
      row[h] = !isNaN(parsed) && val !== '' ? parsed : val;
    });
    rows.push(row);
  }
  return rows;
}
```

Puis dans `parseFileData`, remplacer le bloc CSV :
```javascript
if (ext === 'csv') {
  const text = new TextDecoder('utf-8').decode(arrayBuffer);
  rows = parseCSVFrench(text);
} else {
  // XLSX reste identique
}
```

### Données de vérification après fix :

La première ligne du CSV doit donner :
- Matricule: `3128`
- Hrs Paye: `7.08` (PAS `708`)
- Brut réel: `1062.93` (PAS `106293`)
- IFM réelles: `406.8` (PAS `40680`)
- ICCP réelles: `447.48` (PAS `44748`)

## Contexte du projet

Simulateur d'optimisation des charges patronales en intérim via CET (Compte Épargne Temps) et passerelle CET → PERCOL.

### Schéma en 3 étages
1. **Entrée** : intérimaire met X% IFM/ICCP en CET → potentiel gain RGDU
2. **Détention** : ETT détient le cash 12 mois, sert rendement (3-5%)
3. **Sortie** : transfert CET → PERCOL = forfait social 16-20% au lieu de ~48% cotisations patronales

## Structure du repo

```
CET_OPTIM/
├── CLAUDE.md              ← ce fichier
├── README.md
├── docs/
│   ├── FORMULES_RGDU_2026.md
│   ├── SCHEMA_3_ETAGES.md
│   └── QUESTIONS_EXPERT.md
├── src/
│   ├── simulateur.jsx
│   ├── generate_simulation.py
│   └── README.md
└── data/
    └── template_marges.csv
```

## Paramètres RGDU 2026 (ne pas modifier sans validation)

- SMIC horaire : 12,02 €
- Seuil extinction : 3 × SMIC
- Tmin : 0,02 (2%)
- Tmax (FNAL 0,50%) : 0,4013
- Tδ : 0,3813
- Puissance : 1,75
- Formule : `C = 0,02 + 0,3813 × [½ × (3×SMIC×H/Brut − 1)]^1,75`

## Paramètres PERCOL (à confirmer avec expert)

- Forfait social : 16% (gestion pilotée + PEA-PME) ou 20%
- Cotisations patronales classiques : ~48%
- Rendement CET : 3-5% (intérêts simples, non capitalisés)

## Format des fichiers Marges (input)

### ⚠ FORMAT FRANÇAIS — CRITIQUE
- **Séparateur : point-virgule** (`;`)
- **Décimale : virgule** (`1062,93`)
- **Encodage : UTF-8 avec BOM**
- **Fin de ligne : `\r\n`**

### Colonnes attendues (détection automatique) :
- `Hrs Paye` : heures payées (ex: `7,08`)
- `Brut réel` : brut total incluant IFM et ICCP
- `IFM réelles` : indemnités de fin de mission réelles
- `ICCP réelles` : indemnités compensatrices de congés payés réelles
- `CET` : montant CET (souvent vide)
- `Brut appliqué` : = (Brut réel − IFM − ICCP) × 1,21
- `Cot. Pat. Montant appliqué` : cotisations patronales
- `Réduction générale` : allègement RGDU actuel
- `Marge` : = Total Facturé − Total Payé

## Conventions de code

- Langue : français pour les commentaires, noms de variables en anglais
- React : composants fonctionnels avec hooks, Tailwind pour le style
- Python : pandas + openpyxl, formules Excel
- Formats numériques : virgule décimale affichage FR, point pour calcul
- Tous les montants en euros, heures en décimal

## Tâches prioritaires

### TODO immédiat — BUG
- [ ] **FIXER le parsing CSV français** (voir correctif ci-dessus)
- [ ] Vérifier que les valeurs parsées correspondent aux données réelles

### TODO fonctionnel
- [ ] Intégrer l'étage PERCOL (déjà fait par Claude Code ✓)
- [ ] Ajouter exemple chiffré pas-à-pas dans l'onglet Paramètres
- [ ] Ajouter explication du ×1.79 (facteur extrapolation)
- [ ] Ajouter explication des marges

### TODO après validation expert
- [ ] Recaler formule RGDU sur bulletin réel (écart ×4,4)
- [ ] Confirmer CET exclu de l'assiette RGDU mensuelle
- [ ] Confirmer plafond 10 jours applicable aux sommes monétaires
- [ ] Ajuster forfait social (16% vs 20%) selon config PERCOL

## Points de vigilance

⚠ Les montants absolus RGDU sont à recaler (écart formule vs bulletin)
⚠ Les DELTAS (gains entre scénarios) sont fiables
⚠ L'extrapolation suppose un profil moyen identique
⚠ Ne jamais commiter de données nominatives (noms, n° sécu, IBAN)
⚠ Le schéma CET→PERCOL doit être validé juridiquement
