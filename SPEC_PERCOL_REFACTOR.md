# SPEC — Refonte de l'onglet PERCOL et Synthèse

**Priorité : HAUTE — À implémenter immédiatement**
**Fichier à modifier : `src/simulateur.jsx`**

---

## 1. PROBLÈME ACTUEL

Le calcul PERCOL actuel a 3 erreurs de logique :

### Erreur 1 : Un seul taux d'adhésion au lieu de deux
Actuellement il y a un seul slider `tauxAdhesion` (30%). En réalité il faut **deux étapes** :
- **Étape A** : combien d'intérimaires acceptent de mettre des IFM/ICCP en CET ? (pas 100%)
- **Étape B** : parmi ceux qui ont un CET, combien choisissent le PERCOL plutôt que le cash ?

Le taux effectif = étape A × étape B.

### Erreur 2 : Le gain de placement ETT n'est pas soustrait du coût
L'ETT place le cash CET à un taux supérieur (3,2%) et verse un rendement inférieur (2,9%). Ce spread réduit le coût net mais n'apparaît pas dans le calcul PERCOL.

### Erreur 3 : Le flux complet euro par euro n'est pas clair
Il faut montrer exactement ce qui entre, ce qui sort, ce que l'ETT garde.

---

## 2. NOUVEAUX PARAMÈTRES (sliders à ajouter)

Remplacer les sliders actuels de l'onglet PERCOL par ces 6 paramètres :

```javascript
// Paramètres CET
const [pctIfm, setPctIfm] = useState(30);           // % IFM vers CET (déjà existant)
const [pctIccp, setPctIccp] = useState(30);          // % ICCP vers CET (déjà existant)

// Paramètres adhésion (NOUVEAU : 2 sliders au lieu de 1)
const [tauxAdhesionCET, setTauxAdhesionCET] = useState(50);    // % intérimaires qui acceptent le CET
const [tauxChoixPERCOL, setTauxChoixPERCOL] = useState(40);    // % de ceux avec CET qui choisissent PERCOL

// Paramètres financiers
const [tauxRendementSalarie, setTauxRendementSalarie] = useState(2.9);  // Rendement versé au salarié
const [tauxPlacementETT, setTauxPlacementETT] = useState(3.2);          // Rendement placement ETT
const [forfaitSocial, setForfaitSocial] = useState(16);                  // Forfait social 16% ou 20%
```

### Configuration des sliders :

| Slider | Label | Min | Max | Step | Défaut | Unité |
|---|---|---|---|---|---|---|
| tauxAdhesionCET | "% intérimaires qui adhèrent au CET" | 10 | 100 | 5 | 50 | % |
| tauxChoixPERCOL | "% adhérents CET qui choisissent PERCOL" | 10 | 100 | 5 | 40 | % |
| tauxRendementSalarie | "Rendement CET versé au salarié" | 1 | 8 | 0.1 | 2.9 | % |
| tauxPlacementETT | "Rendement placement ETT" | 1 | 8 | 0.1 | 3.2 | % |
| forfaitSocial | "Forfait social" | — | — | — | 16 | % (boutons 16% / 20%) |

Afficher aussi un **KPI calculé** (pas un slider) :
```
Taux effectif PERCOL = tauxAdhesionCET × tauxChoixPERCOL / 100
Exemple : 50% × 40% = 20% effectif
```

---

## 3. NOUVEAU CALCUL PERCOL (formule exacte)

### Variables d'entrée (calculées depuis les données chargées) :

```javascript
// Depuis les données du fichier (totals existants)
const nbSalariesFichier = totals.n;                    // ex: 641
const cetMensuelTotal = totals.cetTotal;                // ex: 212 093 €/mois (somme de tous les CET)
const cetMensuelMoyen = cetMensuelTotal / nbSalariesFichier;  // ex: 331 €/mois

// Depuis les sliders
const pctAdhCET = tauxAdhesionCET / 100;     // ex: 0.50
const pctChoixPERCOL = tauxChoixPERCOL / 100; // ex: 0.40
const pctEffectifPERCOL = pctAdhCET * pctChoixPERCOL; // ex: 0.20
const rSalarie = tauxRendementSalarie / 100;  // ex: 0.029
const rETT = tauxPlacementETT / 100;          // ex: 0.032
const fs = forfaitSocial / 100;               // ex: 0.16
const cotisPatronales = 0.48;                 // constante
```

### ATTENTION : Le CET mensuel total (212 093 €) suppose que 100% adhèrent au CET.
### En réalité, seuls tauxAdhesionCET % adhèrent.

```javascript
// Pool CET réel (ajusté par l'adhésion)
const cetMensuelAjuste = cetMensuelTotal * pctAdhCET;  
// ex: 212 093 × 50% = 106 047 €/mois

const cetAnnuelAjuste = cetMensuelAjuste * 12;          
// ex: 106 047 × 12 = 1 272 560 €/an

const nbAdherentsCET = Math.round(nbSalariesFichier * pctAdhCET);  
// ex: 641 × 50% = 321

const nbAdherentsPERCOL = Math.round(nbAdherentsCET * pctChoixPERCOL);  
// ex: 321 × 40% = 128

const nbSortieCash = nbAdherentsCET - nbAdherentsPERCOL;  
// ex: 321 - 128 = 193
```

### Flux financier COMPLET pour le pool PERCOL (les 128 qui choisissent PERCOL) :

```javascript
const poolPERCOL = cetAnnuelAjuste * pctChoixPERCOL;
// ex: 1 272 560 × 40% = 509 024 € de principal annuel transféré en PERCOL

// Ce que l'ETT GAGNE pendant les 12 mois de détention
const gainsPlacementPERCOL = poolPERCOL * rETT;  
// ex: 509 024 × 3.2% = 16 289 €

// Ce que l'ETT VERSE au salarié comme rendement CET (part PERCOL)
const rendementVersePERCOL = poolPERCOL * rSalarie;  
// ex: 509 024 × 2.9% = 14 762 €

// Ce qui part au PERCOL = principal + rendement
const montantTransferePERCOL = poolPERCOL + rendementVersePERCOL;  
// ex: 509 024 + 14 762 = 523 786 €

// Forfait social payé par l'ETT sur le montant transféré
const forfaitSocialPaye = montantTransferePERCOL * fs;  
// ex: 523 786 × 16% = 83 806 €

// COÛT TOTAL EMPLOYEUR scénario PERCOL
const coutPERCOL = forfaitSocialPaye + rendementVersePERCOL - gainsPlacementPERCOL;
// ex: 83 806 + 14 762 - 16 289 = 82 279 €
// Note : le principal sort de la poche de l'employeur dans TOUS les scénarios
// donc on ne le compte pas (il s'annule dans la comparaison)

// COÛT TOTAL EMPLOYEUR scénario CASH DIRECT (si ces mêmes sommes avaient été payées normalement)
const coutCashDirect = poolPERCOL * cotisPatronales;
// ex: 509 024 × 48% = 244 332 €

// ÉCONOMIE NETTE PERCOL (le vrai gain)
const economiePERCOL = coutCashDirect - coutPERCOL;
// ex: 244 332 - 82 279 = 162 053 €/an
```

### Flux financier pour le pool CASH (les 193 qui choisissent le cash après CET) :

```javascript
const poolCash = cetAnnuelAjuste * (1 - pctChoixPERCOL);
// ex: 1 272 560 × 60% = 763 536 € de principal annuel sorti en cash

// Ce que l'ETT GAGNE pendant les 12 mois de détention
const gainsPlacementCash = poolCash * rETT;
// ex: 763 536 × 3.2% = 24 433 €

// Ce que l'ETT VERSE au salarié comme rendement CET
const rendementVerseCash = poolCash * rSalarie;
// ex: 763 536 × 2.9% = 22 143 €

// Au déblocage cash : cotisations patronales complètes sur principal + rendement
const cotisPaye = (poolCash + rendementVerseCash) * cotisPatronales;
// ex: (763 536 + 22 143) × 48% = 377 126 €

// COÛT TOTAL scénario CET→Cash (PIRE que cash direct !)
const coutCETCash = cotisPaye + rendementVerseCash - gainsPlacementCash;
// ex: 377 126 + 22 143 - 24 433 = 374 836 €

// Comparaison avec cash direct
const coutCashDirectPool2 = poolCash * cotisPatronales;
// ex: 763 536 × 48% = 366 497 €

// SURCOÛT du CET→Cash vs cash direct
const surcoutCETCash = coutCETCash - coutCashDirectPool2;
// ex: 374 836 - 366 497 = 8 339 € de surcoût
// (l'ETT a payé un rendement pour rien car les cotisations s'appliquent quand même)
```

### GAIN NET GLOBAL combinant PERCOL + surcoût Cash :

```javascript
// Étage 3 : gain net = économie PERCOL - surcoût des sorties cash
const gainNetEtage3 = economiePERCOL - surcoutCETCash;
// ex: 162 053 - 8 339 = 153 714 €/an

// Étage 1 : gain RGDU (déjà calculé, ne changer rien)
// Mais attention : ne s'applique qu'aux adhérents CET
const gainRGDU = totals.gain * pctAdhCET * 12;
// ex: 8 580 × 50% × 12 = 51 480 €/an (et non 103K car seulement 50% adhèrent)

// Étage 2 : spread trésorerie sur TOUT le pool CET (PERCOL + cash)
const spreadTotal = (rETT - rSalarie) * cetAnnuelAjuste;
// ex: (0.032 - 0.029) × 1 272 560 = 3 818 €/an

// TOTAL DES 3 ÉTAGES
const gainTotal = gainRGDU + spreadTotal + gainNetEtage3;
// ex: 51 480 + 3 818 + 153 714 = 209 012 €/an
```

---

## 4. AFFICHAGE — TABLEAU DE FLUX COMPLET

Ajouter un tableau "Flux euro par euro" dans l'onglet PERCOL qui montre :

### Section 1 : Paramètres résumés (en haut)

Afficher dans une barre de KPI :
```
| Adhérents CET: 321 (50%) | Choix PERCOL: 128 (40%) | Choix Cash: 193 (60%) | Taux effectif: 20% |
```

### Section 2 : Tableau comparatif par pool

```
┌─────────────────────────────────────┬──────────────┬──────────────┬──────────────┐
│                                     │ Sans CET     │ CET → Cash   │ CET → PERCOL │
│                                     │ (référence)  │ (193 pers.)  │ (128 pers.)  │
├─────────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Principal annuel                    │   763 536 €  │   763 536 €  │   509 024 €  │
├─────────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Rendement CET versé (2,9%)          │         — €  │    22 143 €  │    14 762 €  │
├─────────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Gains placement ETT (3,2%)          │         — €  │   −24 433 €  │   −16 289 €  │
│ (en négatif car c'est un GAIN)      │              │              │              │
├─────────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Cotisations patronales (48%)        │   366 497 €  │   377 126 €  │         — €  │
├─────────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Forfait social (16%)                │         — €  │         — €  │    83 806 €  │
├─────────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ COÛT ADDITIONNEL EMPLOYEUR          │   366 497 €  │   374 836 €  │    82 279 €  │
│ (hors principal, car identique)     │              │              │              │
├─────────────────────────────────────┼──────────────┼──────────────┼──────────────┤
│ Économie vs référence               │       ref.   │    −8 339 €  │  +162 053 €  │
│                                     │              │  (surcoût)   │  (ÉCONOMIE)  │
└─────────────────────────────────────┴──────────────┴──────────────┴──────────────┘
```

### Section 3 : Récap 3 étages

```
┌───────────────────────────────────────────────┬──────────────┐
│ Étage                                         │ Gain annuel  │
├───────────────────────────────────────────────┼──────────────┤
│ 1. RGDU (ajusté au taux d'adhésion CET)       │    51 480 €  │
├───────────────────────────────────────────────┼──────────────┤
│ 2. Spread trésorerie (3,2% − 2,9%)           │     3 818 €  │
├───────────────────────────────────────────────┼──────────────┤
│ 3. PERCOL net (économie − surcoût cash)       │   153 714 €  │
├───────────────────────────────────────────────┼──────────────┤
│ TOTAL                                         │  ~209 012 €  │
└───────────────────────────────────────────────┴──────────────┘
```

---

## 5. GRAPHIQUE DE SENSIBILITÉ AU RENDEMENT CET

Ajouter un graphique LineChart qui montre :
- Axe X : rendement CET versé au salarié (de 1% à 8%)
- Axe Y : gain total annuel (€)
- 3 courbes : adhésion CET à 30%, 50%, 70%
- Le tauxChoixPERCOL reste fixe (valeur du slider)

Pour chaque point du graphique, recalculer le gain total avec la formule ci-dessus.

Le graphique doit montrer que :
- Plus le rendement augmente → le coût du rendement augmente
- MAIS si on suppose que l'adhésion augmente avec le rendement (élasticité), le gain total peut augmenter

Ajouter un point "optimum" sur chaque courbe = le rendement qui maximise le gain.

---

## 6. VÉRIFICATION DES CHIFFRES

Après implémentation, les valeurs suivantes doivent être obtenues avec les paramètres par défaut (50% adhésion CET, 40% choix PERCOL, 2.9% rendement salarié, 3.2% placement ETT, 16% forfait social, 30% CET IFM/ICCP) :

```
Nb adhérents CET: ~321 (sur 641)
Nb choix PERCOL: ~128
Nb choix Cash: ~193
Taux effectif: 20%

CET mensuel ajusté: ~106 047 €
CET annuel ajusté: ~1 272 560 €

Pool PERCOL: ~509 024 €
Pool Cash: ~763 536 €

Économie PERCOL: ~162 000 €
Surcoût Cash: ~8 300 €
Gain net étage 3: ~153 700 €

Gain RGDU (ajusté): ~51 500 €
Spread tréso: ~3 800 €

TOTAL: ~209 000 €
```

Si les chiffres sont significativement différents, il y a une erreur dans l'implémentation.

---

## 7. CE QU'IL NE FAUT PAS CHANGER

- L'onglet Simulation (étage 1 RGDU) : ne rien modifier, il fonctionne correctement
- L'onglet Graphiques : garder tel quel
- Le parsing CSV : garder la fonction parseCSVFrench et la logique d'estimation IFM/ICCP
- Les paramètres RGDU (SMIC, Tmin, Tmax, Tδ, puissance 1.75)
