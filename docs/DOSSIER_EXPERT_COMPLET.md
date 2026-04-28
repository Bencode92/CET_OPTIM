# Dossier expert complet — Simulateur CET × RGDU × PERCOL

> **Objet** : permettre à un expert paie / social / fiscal de **vérifier l'intégralité des paramètres, hypothèses et formules** du simulateur d'optimisation des charges patronales en intérim, en complément de la note juridique de l'avocat (28 avril 2026).
>
> **Périmètre** : Entreprise de Travail Temporaire (ETT) — projet d'instauration d'un Compte Épargne Temps (CET) pour les intérimaires, avec passerelle vers un PERCOL.
>
> **Volumétrie de référence** : 656 lignes (1 mois de données réelles), extrapolation à 660 salariés annualisée.
>
> **Date du dossier** : 28 avril 2026.

---

## Table des matières

1. [Contexte et objectifs](#1-contexte-et-objectifs)
2. [Cadre juridique de référence](#2-cadre-juridique-de-référence)
3. [Architecture du dispositif — 3 étages](#3-architecture-du-dispositif--3-étages)
4. [Formules de calcul détaillées](#4-formules-de-calcul-détaillées)
5. [Hypothèses paramétriques — valeurs et justifications](#5-hypothèses-paramétriques--valeurs-et-justifications)
6. [Calibration empirique RGDU sur bulletins réels](#6-calibration-empirique-rgdu-sur-bulletins-réels)
7. [Spécificités intérimaires](#7-spécificités-intérimaires)
8. [Données source (CSV) — structure et qualité](#8-données-source-csv--structure-et-qualité)
9. [Référencement du code source](#9-référencement-du-code-source)
10. [Résultats actuels du simulateur](#10-résultats-actuels-du-simulateur)
11. [Limites et incertitudes connues](#11-limites-et-incertitudes-connues)
12. [Questions ouvertes pour l'expert](#12-questions-ouvertes-pour-lexpert)
13. [Annexes — exemples de calcul](#13-annexes--exemples-de-calcul)

---

## 1. Contexte et objectifs

### 1.1 Qui sommes-nous ?
Entreprise de Travail Temporaire (ETT) gérant ~660 salariés intérimaires en mission régulière. Forte proportion de salariés seniors (>55 ans) à 3-5 ans de la retraite. Population mixte : qualifiés et non-qualifiés, taux horaires de 11 à 50 €/h.

### 1.2 Qu'est-ce qu'on cherche à valider ?
Un simulateur en ligne (https://bencode92.github.io/CET_OPTIM/) qui chiffre l'économie potentielle pour l'ETT d'un dispositif **CET → PERCOL** combinant :

| Levier | Mécanisme | Impact attendu |
|---|---|---|
| **Étage 1 — RGDU** | Mise en CET d'IFM/ICCP fait baisser le brut mensuel → augmente l'allègement RGDU | Réduction immédiate des cotisations patronales |
| **Étage 2 — Spread tréso** | L'ETT détient le cash CET 12 mois et le place à un taux supérieur à celui servi au salarié | Marge financière |
| **Étage 3 — PERCOL** | Transfert CET → PERCOL : exonération SS sur la fraction sous plafond + forfait social 16-20 % en remplacement de ~48 % de cotisations | Économie de charges patronales pérenne |

### 1.3 Objectif de la revue d'expert
Confirmer ou infirmer **chacune des hypothèses, formules et chiffres** ci-dessous, et identifier les angles morts.

---

## 2. Cadre juridique de référence

### 2.1 Texte fondateur — accord de branche
**Accord du 27 mars 2000** relatif à l'aménagement et à la réduction du temps de travail dans le travail temporaire (Convention collective nationale du travail temporaire, IDCC 0412).

Articles structurants pour le CET :
- **Art. 6-3-1** — Conditions d'éligibilité : **910 heures de travail effectif** au cours des 12 mois précédents auprès de l'ETT.
- **Art. 6-3-2** — Conversion temps/argent : **1 jour = 7 heures** au taux horaire de la dernière mission.

→ Cf. `docs/CET_Accord_27_mars_2000.pdf` (à archiver).

### 2.2 Note juridique avocat — 28 avril 2026
Document : `docs/Note_juridique_CET_PERCOL.docx` — Synthèse : `docs/NOTE_JURIDIQUE_SYNTHESE.md`.

Points actés :

| Question | Réponse de l'avocat |
|---|---|
| Mise en place du CET | **Pas de DUE** possible. Accord d'entreprise OU application directe de l'accord de branche du 27 mars 2000 |
| Plafond IFM/ICCP à l'entrée | **Aucun plafond légal** — choix libre du salarié |
| Plafond exo SS au transfert PERCOL | **10 jours/an × 7h × taux horaire individuel** (≈ 1 960 €/an à 28 €/h) |
| Fraction > plafond 10j | Cotisations SS complètes + CSG/CRDS + IR comme un salaire |
| IR vs SS au transfert | **Strictement alignés** — pas de plafond fiscal autonome |
| Rendement CET servi par ETT | Qualifié d'**abondement employeur** → soumis cotisations classiques **indépendamment du plafond 10j** |
| Sort du rendement au transfert | **Choix du salarié** : transfert avec principal OU perception cash |
| Obligation servir un rendement | Aucune — facultatif |
| Sortie retraite PERCOL | Prélèvements sociaux (17,2 %) **uniquement sur les plus-values**, pas sur le capital issu du CET |
| Clause de révision du taux | Possible via mention dans la note d'information initiale (« révisable par note de service ») |

### 2.3 Sources réglementaires
- **Code de la Sécurité Sociale** art. L241-13 — Réduction générale dégressive
- **Décret n° 2025-XXX** (à confirmer) — Paramètres RGDU 2026 (Tmin, Tmax, puissance 1,75, seuil 3 SMIC)
- **CGI** art. 81-18° bis — Exonération IR au transfert CET → PERCOL
- **Code du Travail** art. L3151-1 et s. — Régime général du CET
- **Code du Travail** art. L3334-1 et s. — PERCOL (Plan d'Épargne pour la Retraite Collectif)

---

## 3. Architecture du dispositif — 3 étages

```
┌─────────────────────────────────────────────────────────────────────┐
│ ÉTAPE 1 — Mois M : versement de la paye                             │
│ Brut mensuel = X €                                                  │
│ IFM (10 % du brut hors primes) + ICCP (~10 %) versées normalement   │
│  → l'intérimaire choisit % IFM et % ICCP à placer en CET            │
│  → Brut CET = Brut − (IFM × pctIfm) − (ICCP × pctIccp)              │
│  → Application formule RGDU sur Brut CET → coefficient C_CET        │
│  → Réduction CET = C_CET × Brut CET                                 │
│  → GAIN ÉTAGE 1 = Réduction CET − Réduction baseline                │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ ÉTAPE 2 — Mois M à M+11 : détention par l'ETT                       │
│ Solde CET cumulé sur 12 mois                                        │
│ Rendement servi au salarié : taux rS (ex : 2,9 %)                   │
│ Placement par l'ETT : taux rE (ex : 3,2 %)                          │
│ ⚠ rS × CET = abondement employeur soumis cotisations classiques     │
│  → SPREAD BRUT = (rE − rS) × CET annuel                             │
│  → COÛT ABONDEMENT = rS × CET annuel × 48 % (cotisations patron.)   │
│  → SPREAD NET = SPREAD BRUT − COÛT ABONDEMENT                       │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ ÉTAPE 3 — Mois M+12 : choix du salarié                              │
│ Option A — Sortie cash : régime SS + IR de droit commun             │
│ Option B — Transfert PERCOL : sur la fraction ≤ plafond_i           │
│   plafond_i = 10 j × 7 h × taux horaire individuel                  │
│   Fraction ≤ plafond_i : exo SS + exo IR                            │
│   Fraction > plafond_i : cotisations SS + CSG/CRDS + IR             │
│   → Forfait social 16 % (si gestion pilotée) ou 20 % en remplacement│
│  → ÉCONOMIE ÉTAGE 3 = Pool plafonné × (25 % − forfait social)       │
│       avec 25 % = cotisations SS patronales évitées                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Formules de calcul détaillées

### 4.1 RGDU 2026 — réduction générale dégressive uniformisée

**Constantes** (`index.html:30`) :
```js
const RGDU = {
  smicH: 12.02,    // SMIC horaire 2026
  seuil: 3,        // seuil d'extinction = 3 × SMIC
  tMin: 0.02,      // 2 % plancher
  tMax: 0.4013,    // 40,13 % cap (FNAL 0,50%)
  tDelta: 0.3813,  // amplitude = Tmax − Tmin
  pow: 1.75        // puissance courbe
};
```

**Formule** (`index.html:161-167`) :
```
ratio = (3 × SMIC × heures) / brut
si ratio ≤ 1 :  C = 0       (au-dessus du seuil 3 SMIC)
sinon         :  C = min(Tmin + Tδ × [½ × (ratio − 1)]^1,75 ; Tmax)
réduction = C × brut
```

**Cas test** (matricule 2296 — 106 h, brut 3 297,17 €) :
- ratio = (3 × 12,02 × 106) / 3 297,17 = **1,1593**
- inner = ½ × (1,1593 − 1) = **0,0797**
- inner^1,75 = **0,01196**
- C = 0,02 + 0,3813 × 0,01196 = **0,02456**
- Réduction théorique = 0,02456 × 3 297,17 = **80,95 €**
- Réduction réelle bulletin (CSV) = **84,36 €**
- Écart = +4,2 % → cohérent

**Cas problématique** (Mourice Laure — 206 h, brut 7 284,94 €) :
- ratio = 1,0197 (juste au-dessus du seuil)
- inner^1,75 ≈ 0,000308 → C ≈ Tmin = 0,02 (plancher actif)
- Réduction théorique = 0,02 × 7 284,94 = **146 €**
- Réduction réelle bulletin = **33 €**
- Écart = ×4,4 → **incohérent**

→ **Voir section 6** (calibration empirique) pour le traitement du problème.

### 4.2 Plafond CET → PERCOL exonéré (par salarié)

Pour chaque salarié `i` (`index.html:174-178`) :
```
tauxHoraire_i  = (brut_i − IFM_i − ICCP_i) / heures_i
plafond_i      = 10 × 7 × tauxHoraire_i
cetAn_i        = (IFM_i × pctIfm + ICCP_i × pctIccp) × 12
cetAnPlafonne_i = min(cetAn_i, plafond_i)
cetAnExcess_i  = max(0, cetAn_i − plafond_i)
```

**Justification** : Confirmé par l'avocat (28/04). Article 6-3-2 de l'accord de branche : 1 jour = 7 heures.

### 4.3 Agrégation pool PERCOL exonéré

```
cetAnPlafonne_moyen = (1/N) × Σᵢ min(cetAn_i, plafond_i)
nbPercol = N × pctEligible × pctAdhCET × pctChoixPERCOL
poolPERCOL = cetAnPlafonne_moyen × nbPercol
```

**Important** : on somme les `min(cetAn_i, plafond_i)` ligne par ligne **avant** de moyenner, pour capter l'hétérogénéité réelle des taux horaires (pas un plafond uniforme).

### 4.4 Étage 1 — Gain RGDU sur la population CET

```
gainRGDU_i = (réduction(brutCet_i) − réduction(brut_i)) × calibration_i
gainRGDU_total = Σᵢ gainRGDU_i × pctAdhCET × 12 mois
```

Avec `calibration_i = redAct_i / formulaBase_i` quand redAct disponible (cf. section 6).

### 4.5 Étage 2 — Spread trésorerie net

```
cetAnnuelAjuste = (IFM_moy × pctIfm + ICCP_moy × pctIccp) × 12 × nbAdhCET
spreadBrut      = (rE − rS) × cetAnnuelAjuste
coûtAbondement  = rS × cetAnnuelAjuste × 0,48        ← charges patronales sur abondement employeur
spreadNet       = spreadBrut − coûtAbondement
```

⚠ **Ce point appelle une vérification expert** (cf. Q3 section 12).

### 4.6 Étage 3 — Économie nette PERCOL

```
econE3 = poolPERCOL × (tauxCotisSSEvitees − forfaitSocial)
```

Avec :
- `tauxCotisSSEvitees = 0,25` — cotisations patronales SS évitées par le transfert
- `forfaitSocial = 0,16` (gestion pilotée + PEA-PME) ou `0,20`

`COTIS = 0,48` pour la sortie cash.

---

## 5. Hypothèses paramétriques — valeurs et justifications

| # | Paramètre | Valeur | Source / justification | Ajustable UI ? | À valider expert |
|---|---|---:|---|:---:|:---:|
| 1 | SMIC horaire | 12,02 € | Valeur 2026 | Non | ❓ confirmer si 2026 ou évolution |
| 2 | Seuil extinction RGDU | 3 × SMIC | Code SS L241-13 | Non | ✅ |
| 3 | Tmax RGDU | 0,4013 | Décret RGDU 2026 (FNAL 0,50 %) | Non | ❓ confirmer |
| 4 | Tmin RGDU | 0,02 (2 %) | Décret RGDU 2026 | Non | ❓ **confirmer si plancher s'applique au seuil** |
| 5 | Tδ = Tmax − Tmin | 0,3813 | Calcul | Non | ✅ dérivé |
| 6 | Puissance courbe RGDU | 1,75 | Décret 2026 | Non | ❓ confirmer |
| 7 | Cotisations patronales totales | 48 % | Estimation marges intérim | Non | ❓ **confirmer ventilation** |
| 8 | Cotisations SS évitées au transfert | 25 % | Patronales SS hors CSG/CRDS | Non | ❓ **confirmer périmètre exact** |
| 9 | Forfait social PERCOL | 16 % ou 20 % | Selon gestion (pilotée/libre, PEA-PME) | Oui (slider) | ❓ **dépend du gestionnaire** |
| 10 | Éligibilité 910h/12 mois | 40 % | Donnée réelle ETT | Oui (slider) | ✅ donnée empirique |
| 11 | Adhésion CET parmi éligibles | 50 % (défaut) | Estimation | Oui (slider) | N/A |
| 12 | Choix PERCOL parmi adhérents | 30 % (défaut) | Population senior → PERCOL attractif | Oui (slider) | N/A |
| 13 | Rendement CET servi salarié (rS) | 2,9 % (défaut) | Au-dessus livret A | Oui (input) | ❓ vérifier traitement social |
| 14 | Rendement placement ETT (rE) | 3,2 % (défaut) | Hypothèse trésorerie | Oui (input) | N/A |
| 15 | Conversion 1 jour | 7 heures | Accord branche art. 6-3-2 | Non | ✅ |
| 16 | Plafond exo PERCOL | 10 j/an × 7 h × taux horaire | Note avocat 28/04 | Non | ✅ |

---

## 6. Calibration empirique RGDU sur bulletins réels

### 6.1 Le problème

La formule RGDU pure surestime la réduction réelle. Sur le cas Mourice Laure : **formule 146 € vs bulletin 33 € (×4,4)**.

### 6.2 La méthode

Le CSV d'entrée contient une colonne `Réduction générale` issue du système de paie. **458 / 656 lignes** sont renseignées (les 198 vides correspondent aux salariés > 3 SMIC où la réduction réelle est nulle).

Pour chaque salarié `i` avec `redAct_i > 0` :
```
formulaBase_i = calcRgdu(heures_i, brut_i)
k_i           = redAct_i / formulaBase_i             ← coefficient de calibration personnel
redBase_i     = redAct_i                              ← baseline = réalité bulletin
formulaCet_i  = calcRgdu(heures_i, brutCet_i)
redCet_i      = formulaCet_i × k_i                   ← scénario CET calibré au profil du salarié
gain_i        = (formulaCet_i − formulaBase_i) × k_i
```

Pour les lignes sans `redAct` : `redBase_i = formulaBase_i`, `redCet_i = formulaCet_i` (formule pure, fallback).

### 6.3 Justification théorique

La calibration `k_i` est une correction multiplicative qui suppose que :
- La **forme** de la courbe RGDU (pente, courbure) est correcte dans la formule
- Le **niveau** absolu peut être décalé pour des raisons de paramétrage (ex : Tmax intégrant des cotisations non applicables à l'ETT, base abattue 90 % en raison de la déduction forfaitaire spécifique 10 % intérim, etc.)

Si `k_i` est **homogène** sur la population (typiquement autour de 0,23 = 1/4,4), c'est une erreur de paramétrage uniforme → la calibration corrige correctement.

Si `k_i` **varie fortement** selon les profils, il y a un problème de structure de la formule, et la calibration n'est qu'un pansement → **point de vigilance pour l'expert**.

### 6.4 Toggle dans l'UI

Onglet « Détail expert » → bandeau bleu en haut : checkbox **« Utiliser la Réduction générale réelle du CSV comme baseline »**, activée par défaut.

L'UI affiche en temps réel :
- `nCalibrated / N` salariés calibrés
- `k_moyen` — moyenne des coefficients individuels
- `k_global` — Σ redAct / Σ formulaBase

**Point de validation expert** : k_moyen ≈ k_global signale homogénéité ; un écart fort signale hétérogénéité.

---

## 7. Spécificités intérimaires

### 7.1 Composition de la rémunération
- **Brut horaire** = taux de la mission × heures effectuées
- **IFM** (Indemnité de Fin de Mission) = 10 % du brut hors primes
- **ICCP** (Indemnité Compensatrice de Congés Payés) = ~10 % du brut + IFM
- **Brut total** ≈ Brut hors primes × 1,21 (validé sur 367/368 lignes du fichier)

### 7.2 Éligibilité CET (art. 6-3-1 accord branche)
- 910 heures de travail effectif au cours des 12 derniers mois auprès de l'ETT
- **Taux d'éligibilité réel observé sur le fichier : 40 %** (donnée ETT)
- → Le pool potentiel de bénéficiaires est de ~660 × 40 % = **264 personnes**, pas 660

### 7.3 Conversion temps/argent (art. 6-3-2)
- 1 jour de CET = 7 heures au taux horaire de la dernière mission
- → Plafond exo PERCOL = 10 j × 7 h × taux horaire ≈ 1 960 €/an à 28 €/h

### 7.4 Particularités à confirmer

| Sujet | État | Question expert |
|---|---|---|
| **Déduction Forfaitaire Spécifique 10 %** (intérim) | Non intégrée dans le simulateur | La DFS s'applique-t-elle à la base RGDU ? Si oui, base abattue × 0,90 → impacte la formule |
| **Taux AT/MP plafonnés** | Inclus dans Tmax ? | Vérifier que Tmax = 0,4013 inclut bien la composante AT/MP intérim |
| **CSG/CRDS** | Hors RGDU | Confirmer non-impact sur RGDU |
| **Réintégration sociale CET sortie cash** | Non simulée | Quand un salarié sort en cash, la cotisation tombe-t-elle au moment de la sortie ? |
| **CSE / représentation du personnel** | Hors scope juridique | Est-ce qu'un accord d'entreprise est requis ou l'application directe de la branche suffit ? |

---

## 8. Données source (CSV) — structure et qualité

### 8.1 Format

Fichier : `data/historique/latest_marges.csv`
- **Encodage** : UTF-8 avec BOM
- **Séparateur** : `;`
- **Décimal** : virgule (`1062,93`)
- **Fin de ligne** : `\r\n`
- **Volumétrie** : 656 lignes (1 mois)

### 8.2 Colonnes attendues

| # | Colonne | Type | Utilisation simulateur |
|---|---|---|---|
| 1 | Dossier Tempo | str | — |
| 2 | Mois de paie | str | — |
| 3-4 | Code/Nom Commercial | str | — |
| 5 | Matricule | str | Affichage |
| 6 | Nom Salarié | str | Affichage |
| 7 | **Hrs Paye** | num | RGDU (heures) |
| 8 | Hrs Fact | num | — |
| 9 | **Brut réel** | num | RGDU (brut), inclut IFM + ICCP |
| 10 | **IFM réelles** | num | Pool CET, plafond |
| 11 | **ICCP réelles** | num | Pool CET, plafond |
| 12 | CET | num | Affichage |
| 13 | Brut appliqué | num | = base × 1,21 (managérial) |
| 14 | Cot. Pat. Montant | num | Affichage |
| 15 | **Réduction générale** | num | **Calibration** (458/656 renseignées) |
| 16-19 | Total Payé / Facturé / Marge | num | Marges (info) |

### 8.3 Qualité des données

- **376 lignes** ont IFM/ICCP renseignées (cas 1)
- **280 lignes** ont IFM/ICCP vides → estimées à 10 % et 11 % du brut hors primes (cas 2)
- **458 lignes** ont Réduction générale renseignée (calibration possible)
- **198 lignes** sans Réduction générale → fallback formule

### 8.4 Cas usage des données

```
Cas 1 (IFM renseignée) : Brut réel inclut IFM + ICCP, on les utilise telles quelles
Cas 2 (IFM = 0)        : Brut réel = base pure, on estime IFM = 10%, ICCP = 11%, Brut total = base × 1,21
```

→ `index.html:127-132`

---

## 9. Référencement du code source

Repository : https://github.com/Bencode92/CET_OPTIM

Fichier principal : `index.html` (déployé sur GitHub Pages)

| Fonction | Lignes | Rôle |
|---|---|---|
| `parseCSVFrench` | ~70-95 | Parsing CSV format français (séparateur `;`, virgule décimale, BOM) |
| `mapRows` | 100-142 | Détection colonnes, parsing, fallback Cas 2 |
| `calcRgdu` | 161-167 | Formule RGDU 2026 |
| `simRow` | 168-189 | Calcul ligne par ligne (RGDU calibré, plafond CET, gain) |
| `App` (composant principal) | 240-... | Orchestration |
| `tot` (useMemo) | ~302-322 | Agrégation totaux |
| `percol` (useMemo) | ~330-465 | Calculs étages 2 et 3 |
| Onglet « Méthodologie » | ~947-1145 | Page méthodologique dans l'UI |

Documents associés (`docs/`) :
- `Note_juridique_CET_PERCOL.docx` — note avocat brute
- `NOTE_JURIDIQUE_SYNTHESE.md` — synthèse markdown
- `FORMULES_RGDU_2026.md` — détail formule + cas tests
- `SCHEMA_3_ETAGES.md` — schéma fonctionnel
- `ETAT_DES_LIEUX.md` — état projet
- `QUESTIONS_EXPERT.md` — questions précédentes (à fusionner)
- `QUESTIONS_PRISM_EMPLOI.md` — questions au syndicat patronal
- `DOSSIER_EXPERT_CET_PERCOL.md` — version précédente (à archiver)

---

## 10. Résultats actuels du simulateur

### 10.1 Hypothèses retenues (paramètres par défaut)
- Effectif total : 660 (extrapolé)
- Échantillon : 656 lignes (1 mois)
- pctIfm = pctIccp = 100 %
- pctEligible = 40 % (donnée réelle 910 h)
- pctAdhCET = 50 %, pctChoixPERCOL = 30 %
- rS = 2,9 %, rE = 3,2 %
- Forfait social = 20 % (prudent)
- Calibration RGDU : **activée** (mode bulletin réel)

### 10.2 Résultats projetés
*Les chiffres précis sont à lire dans le simulateur en ligne, ils dépendent de la donnée du moment.*

Pour information (snapshot mars 2026, calibration désactivée) :
- Étage 1 RGDU : ~78 K€/an (formule pure ; à diviser par k_global avec calibration)
- Étage 2 Spread tréso brut : ~9 K€/an (avant déduction coût abondement)
- Étage 3 PERCOL : ~271 K€/an (avant prise en compte plafond par salarié et 40 % éligibilité)
- **Total formule pure : ~358 K€/an**

Avec les corrections post-note avocat et calibration :
- Plafond par salarié appliqué → réduit étage 3 d'un facteur ~0,4
- Éligibilité 40 % → réduit étage 3 d'un facteur ~0,4
- Calibration RGDU → étage 1 multiplié par k_global (~0,23 sur l'ex Mourice)
- Coût abondement étage 2 → spread devient potentiellement négatif

→ **Le total recalé devrait être de l'ordre de 30 à 60 K€/an**, soit ~10 % de l'estimation initiale.

---

## 11. Limites et incertitudes connues

### 11.1 Sur la formule RGDU
- **Plancher Tmin = 0,02** : actif même quand ratio ≈ 1 (juste au-dessus du seuil 3 SMIC), ce qui semble produire des réductions sur-estimées. À investiguer : doit-il y avoir une condition supplémentaire `ratio > 1 + ε` pour activer le plancher ?
- **Tmax = 0,4013** : suppose que toutes les cotisations FNAL 0,50 % + maladie + AF + AGIRC-ARRCO + chômage + AT/MP plafonné sont éligibles. À confirmer pour intérim.
- **Base abattue ?** : la déduction forfaitaire spécifique 10 % en intérim impacte-t-elle la base RGDU ?

### 11.2 Sur la calibration empirique
- **Single point d'origine** : seul Mourice Laure était documenté avec son écart formule/bulletin. Les 458 lignes du CSV permettent maintenant de mesurer la dispersion de `k_i`.
- **Coefficients constant ou variable ?** : si k_i varie fortement selon les profils, la correction ×k n'est pas suffisante.
- **Lignes vides** : on suppose que les 198 lignes sans Réduction générale ont une réduction nulle (au-dessus du seuil). À vérifier avec le service paie.

### 11.3 Sur le PERCOL
- **Forfait social 16 % vs 20 %** : non tranché. Dépend de la configuration retenue chez le gestionnaire (gestion pilotée + composante PEA-PME pour 16 %).
- **Cotisations SS évitées 25 %** : périmètre exact à confirmer (URSSAF, retraite complémentaire, AT/MP, etc.).

### 11.4 Sur le rendement CET
- **Qualification d'abondement employeur** : confirmée par l'avocat → soumis cotisations classiques. Mais quel est le taux exact (48 % patronales totales, ou un sous-ensemble) ?
- **Effet sur le salarié** : les cotisations salariales s'appliquent-elles aussi au rendement servi ?

### 11.5 Sur l'extrapolation 656 → 660
- **Profil moyen identique** supposé. Si les 4 manquants ont des profils atypiques, biais possible.

### 11.6 Effets pluri-annuels non capturés
- Modèle annualisé. N'intègre pas la **rampe d'adhésion** (les premiers mois sont plus lents).
- N'intègre pas le **moment de sortie en cash** (la cotisation tombe à ce moment-là, pas effacée).

---

## 12. Questions ouvertes pour l'expert

### 12.1 Validation des paramètres RGDU
**Q1.** Les paramètres `Tmin = 0,02`, `Tmax = 0,4013`, `puissance = 1,75`, `seuil = 3 × SMIC` correspondent-ils au décret RGDU 2026 ? Si non, quelles sont les valeurs correctes ?

**Q2.** Le plancher `Tmin` s'applique-t-il littéralement même quand `ratio ≈ 1` ? Ou existe-t-il une zone où `C = 0` au-dessus du seuil de 3 SMIC ?

**Q3.** La base de calcul RGDU pour un intérimaire est-elle le brut total (incluant IFM + ICCP) ou le brut hors primes (base abattue 90 % via DFS) ?

**Q4.** Le `Tmax = 0,4013` est-il bien applicable à une ETT intérim, ou faut-il ajuster pour les particularités sectorielles (taux AT/MP, prévoyance, etc.) ?

### 12.2 Validation de la calibration
**Q5.** Au regard des 458 valeurs de `Réduction générale` réelles du CSV, le coefficient `k_global` (ratio total bulletin/formule) que tu observes dans le simulateur est-il **homogène** ou **dispersé** par profil ? Si dispersé, quelle structure (par tranche de salaire, par taux horaire, par profil de mission) ?

**Q6.** La méthode de calibration `k_i = redAct_i / formulaBase_i` puis `redCet_i = formulaCet_i × k_i` est-elle valide ? Ou faut-il calibrer additivement (`redCet = redBase + (formulaCet − formulaBase)`) ?

### 12.3 Validation du périmètre PERCOL
**Q7.** Le taux de **cotisations SS évitées au transfert** = 25 % — quel est le périmètre exact de cotisations couvert (maladie, vieillesse plafonnée, vieillesse déplafonnée, AF, FNAL, CSA, AGIRC-ARRCO, chômage, AT/MP) ?

**Q8.** Le **forfait social** pour le transfert CET → PERCOL — confirmer si 16 % requiert (a) gestion pilotée par défaut **ET** (b) au moins 7 % du portefeuille en titres PME via PEA-PME, ou seulement (a).

**Q9.** Le **rendement servi au salarié** (qualifié d'abondement employeur par l'avocat) est-il soumis à 100 % du taux patronal classique (48 % dans le simulateur) ? Ou seulement à un sous-ensemble (par exemple uniquement aux contributions, hors cotisations vieillesse) ?

### 12.4 Validation des spécificités intérim
**Q10.** L'éligibilité 910 h sur 12 mois (art. 6-3-1 accord branche) s'apprécie-t-elle :
- (a) en heures travaillées effectives,
- (b) en heures payées,
- (c) en heures rémunérées (incluant ICCP) ?

**Q11.** Le plafond annuel d'exonération `10 j × 7 h × taux horaire de la dernière mission` est-il vraiment annuel (réinitialisé chaque année civile) ou s'apprécie-t-il sur 12 mois glissants ?

**Q12.** Pour un salarié qui change de taux horaire en cours d'année (mission différente), comment se calcule le plafond ? Sur la **dernière mission** ou sur une moyenne ?

### 12.5 Validation juridique
**Q13.** L'**application directe de l'accord de branche** (sans accord d'entreprise) est-elle suffisante pour mettre en place le CET, sachant que l'avocat indique que la DUE est exclue ? Faut-il un acte formel d'adhésion par l'ETT ?

**Q14.** La **clause de révision du taux** (« révisable par note de service ») est-elle juridiquement opposable aux salariés qui ont déjà des droits constitués sur le CET au moment de la révision ?

### 12.6 Effets non capturés
**Q15.** Lorsqu'un salarié sort son CET **en cash** au bout de 12 mois (non transfert PERCOL), les cotisations sociales s'appliquent-elles à ce moment-là sur le principal + le rendement, ou y a-t-il un régime particulier ?

**Q16.** En cas de **départ du salarié avant 12 mois** (fin de contrat, démission, etc.), comment se gère le CET ? Restitution immédiate ? Conservation chez l'ETT ? Transfert vers un autre dispositif ?

---

## 13. Annexes — exemples de calcul

### 13.1 Exemple 1 — Salarié milieu de courbe (matricule 2296)

Données :
- 106 h, brut 3 297,17 €, IFM 343,20 €, ICCP 377,52 €
- Réduction générale réelle (CSV) : **84,36 €**

**Sans CET (baseline) :**
```
formulaBase = 0,02456 × 3 297,17 = 80,95 €
k_2296      = 84,36 / 80,95     = 1,042         ← légère sous-estimation
redBase     = 84,36 € (calibré)
```

**Avec CET 100 %/100 % :**
```
CET IFM     = 343,20 × 100% = 343,20 €
CET ICCP    = 377,52 × 100% = 377,52 €
brutCet     = 3 297,17 − 343,20 − 377,52 = 2 576,45 €
ratio_CET   = (3 × 12,02 × 106) / 2 576,45 = 1,4836
inner       = ½ × (1,4836 − 1) = 0,2418
inner^1,75  = 0,0834
C_CET       = 0,02 + 0,3813 × 0,0834 = 0,05180
formulaCet  = 0,05180 × 2 576,45 = 133,5 €
redCet      = 133,5 × 1,042 = 139,1 €  (calibré)
gain_2296   = 139,1 − 84,36 = +54,7 €/mois (sans calibration : +52,5 €/mois)
gain annuel = +656,5 €/an
```

Plafond CET → PERCOL :
```
tauxHoraire = (3 297,17 − 343,20 − 377,52) / 106 = 24,30 €/h
plafond     = 10 × 7 × 24,30 = 1 701 €/an
cetAn       = (343,20 + 377,52) × 12 = 8 649 €/an
cetAnPlafonne = min(8 649, 1 701) = 1 701 €  ← plafond actif
cetAnExcess   = 8 649 − 1 701 = 6 948 €      ← cotisations classiques
```

### 13.2 Exemple 2 — Salarié au-dessus du seuil (Mourice Laure)

Données :
- 206 h, brut 7 284,94 €
- Réduction générale réelle (CSV) : **33 €**

**Calibration extrême :**
```
formulaBase = 0,02 × 7 284,94 = 145,7 € (plancher Tmin actif)
k_Mourice   = 33 / 145,7 = 0,226         ← divergence forte
```

→ La formule donne ×4,4 trop, mais la calibration corrige.

### 13.3 Distribution attendue de k_i

Hypothèse : si k_global ≈ 0,23 et k_moyen ≈ 0,23 sur les 458 lignes, la formule a une erreur de paramétrage uniforme et la calibration multiplicative est correcte.

Si la dispersion de k_i est forte (par exemple écart-type > 0,15), il y a un problème de structure de la formule à investiguer (effet de seuil mal modélisé, paramètres dépendant du profil, etc.).

→ **Question Q5 pour l'expert.**

---

## Pour aller plus loin

- Simulateur en ligne : https://bencode92.github.io/CET_OPTIM/
- Brochure intérimaires : https://bencode92.github.io/CET_OPTIM/brochure.html
- Code source : https://github.com/Bencode92/CET_OPTIM
- Note avocat (référence juridique) : `docs/Note_juridique_CET_PERCOL.docx`

---

**Document établi le 28 avril 2026.**
**Auteur : équipe CET_OPTIM, ETT.**
**Pour validation : expert paie / social / fiscal.**
