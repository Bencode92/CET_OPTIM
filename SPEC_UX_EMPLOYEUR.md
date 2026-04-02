# SPEC UX v2 — Refonte onglets Synthèse et PERCOL uniquement

**Fichier à modifier : `public/index.html`**
**Scope : NE TOUCHER QU'AUX onglets Synthèse (tab 3) et PERCOL (tab 4)**

## CE QU'IL NE FAUT PAS TOUCHER

- ❌ Onglet Upload (tab 0) → ne rien changer
- ❌ Onglet Simulation (tab 1) → ne rien changer
- ❌ Onglet Graphiques (tab 2) → ne rien changer
- ❌ La logique de calcul RGDU et PERCOL → ne rien changer
- ❌ Le parsing CSV → ne rien changer
- ❌ L'auto-chargement GitHub → ne rien changer

## CE QU'IL FAUT REFAIRE

- ✅ Onglet Synthèse (tab 3) → refaire complètement
- ✅ Onglet PERCOL (tab 4) → refaire complètement

---

## ONGLET SYNTHÈSE (tab 3) — "La page que le DG regarde"

L'onglet Synthèse actuel est un tableau technique avec 3 scénarios CET. Il faut le transformer en **page de présentation exécutive** qui raconte l'histoire complète en une seule page scrollable.

### Section 1 : BANDEAU AVANT / APRÈS (tout en haut)

3 blocs côte à côte, très gros :

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐
│  AUJOURD'HUI     │  │  AVEC LE         │  │  VOTRE ÉCONOMIE          │
│                  │  │  DISPOSITIF      │  │                          │
│  Charges         │  │  Charges         │  │                          │
│  patronales      │  │  patronales      │  │    209 000 €             │
│  annuelles       │  │  annuelles       │  │       /an                │
│                  │  │                  │  │                          │
│  8 244 000 €     │  │  8 035 000 €     │  │  soit -2,5%              │
│                  │  │                  │  │                          │
│  (fond rouge     │  │  (fond bleu      │  │  (fond vert,             │
│   sombre)        │  │   sombre)        │  │   police 48px,           │
│                  │  │                  │  │   très visible)          │
└──────────────────┘  └──────────────────┘  └──────────────────────────┘
```

**Calcul :**
```javascript
const chargesAnnuelles = tot.cotPat * 12;  // ou somme colonne cot.pat × 12
// Si cotPat n'est pas dispo, utiliser : tot.brut * COTIS * 12 en approximation
const chargesApres = chargesAnnuelles - percol.gainTotal;
const economie = percol.gainTotal;
const pctReduction = (economie / chargesAnnuelles * 100);
```

**Labels simples (pas de jargon) :**
- "Charges patronales annuelles" (pas "cotisations patronales")
- "Votre économie" (pas "gain RGDU + spread + PERCOL net")

### Section 2 : COMMENT ÇA MARCHE — Les 3 étapes

Reprendre la timeline visuelle des 3 étages (cercles 1-2-3) qui existe déjà dans l'onglet PERCOL, MAIS avec un vocabulaire simplifié :

**Étape 1 (cercle bleu) :**
- Titre : "L'intérimaire épargne une partie de ses primes"
- Sous-titre : "Chaque mois"
- Texte : "[nbAdhCET] intérimaires mettent [pctIfm]% de leurs primes de fin de mission en épargne, soit [fmtE(cetMensuelAjuste)]/mois."
- Encart : "Réduction de charges : [fmtE(gainRGDU)]/an"

**Étape 2 (cercle violet) :**
- Titre : "Vous placez cette épargne pendant 12 mois"
- Sous-titre : "Votre trésorerie travaille"
- Texte : "Vous investissez à [txEtt]% et versez [txSalarie]% à l'intérimaire."
- Encart : "Votre marge : [fmtE(spreadTotal)]/an"

**Étape 3 (cercle vert) :**
- Titre : "Transfert vers le plan retraite"
- Sous-titre : "Le levier principal"
- Texte : "[nbPercol] intérimaires transfèrent vers le plan retraite. Taxe : [fSocial]% au lieu de 48% de charges."
- Deux sous-blocs :
  - "→ Cash ([nbCash] pers.) : charges classiques 48%" (en orange/rouge)
  - "→ Plan retraite ([nbPercol] pers.) : taxe réduite [fSocial]%" (en vert)
- Encart : "Économie nette : [fmtE(gainNetEtage3)]/an"

### Section 3 : RÉCAP DES 3 ÉTAGES (tableau simple)

Un tableau propre, lisible :

```
┌──────────────────────────────────────────┬──────────────┬────────┐
│  Source d'économie                       │ Gain annuel  │  Part  │
├──────────────────────────────────────────┼──────────────┼────────┤
│  Réduction de charges (allègement)       │   51 480 €   │  25%   │
├──────────────────────────────────────────┼──────────────┼────────┤
│  Marge de placement (12 mois)            │    3 818 €   │   2%   │
├──────────────────────────────────────────┼──────────────┼────────┤
│  Plan retraite (16% au lieu de 48%)      │  153 714 €   │  73%   │
├──────────────────────────────────────────┼──────────────┼────────┤
│  TOTAL                                   │  209 012 €   │ 100%   │
└──────────────────────────────────────────┴──────────────┴────────┘
```

**Pas de jargon** : "RGDU" → "Réduction de charges", "spread" → "Marge de placement", "PERCOL" → "Plan retraite".

### Section 4 : HYPOTHÈSES ET RISQUES (en clair)

Bloc orange/warning en bas :

```
📋 Hypothèses retenues :
• [txAdhCET]% des intérimaires participent à l'épargne (soit [nbAdhCET] personnes)
• [txChoixPERCOL]% d'entre eux choisissent le plan retraite (soit [nbPercol] personnes)
• Rendement versé à l'intérimaire : [txSalarie]%
• Rendement placement : [txEtt]%
• Taxe sur le plan retraite : [fSocial]%

⚠ 3 points à confirmer avec votre expert :
1. Le plafond de transfert (10 jours/an s'applique-t-il aux primes ?)
   Si oui : économie réduite à ~70 K€/an
2. Les charges le mois de l'épargne (exclues de la base ?)
   Si non : -50 K€/an
3. Le taux de la taxe (16% si plan en gestion pilotée, sinon 20%)
   Si 20% : -30 K€/an
```

### Section 5 : SLIDERS SIMPLIFIÉS

3 sliders seulement dans cet onglet (les mêmes valeurs que l'onglet PERCOL, synchronisés) :

1. **"Part des primes épargnées"** → contrôle pctIfm ET pctIccp ensemble (un seul curseur)
   - Label : "30% des primes en épargne"
   - Range : 10% à 100%

2. **"Intérimaires participants"** → contrôle txAdhCET
   - Label : "50% des intérimaires participent"
   - Range : 10% à 100%

3. **"Choix du plan retraite"** → contrôle txChoixPERCOL
   - Label : "40% choisissent le plan retraite"
   - Range : 10% à 100%

**IMPORTANT** : quand l'utilisateur bouge ces sliders dans l'onglet Synthèse, les valeurs doivent être synchronisées avec l'onglet PERCOL (ce sont les mêmes state variables).

### Section 6 : RETOUR SUR INVESTISSEMENT

```
┌─────────────────────────────────────────────────────┐
│  Coût de mise en place estimé :  [input: 50 000 €]  │
│  Économie annuelle :             209 000 €           │
│  Retour sur investissement :     3 mois              │
│  Gain net sur 3 ans :            577 000 €           │
└─────────────────────────────────────────────────────┘
```

Le coût de mise en place est un **input éditable** (défaut 50 000 €).
```javascript
const [coutMiseEnPlace, setCoutMiseEnPlace] = useState(50000);
const roi = percol.gainTotal > 0 ? Math.ceil(coutMiseEnPlace / (percol.gainTotal / 12)) : 0;
const gainNet3ans = percol.gainTotal * 3 - coutMiseEnPlace;
```

---

## ONGLET PERCOL (tab 4) — "La page pour le DAF"

Garder TOUT le contenu actuel de l'onglet PERCOL tel quel (c'est le détail technique), mais ajouter en haut :

### Ajout 1 : Titre clair

```
"Détail technique — Pour le DAF et l'expert paie"
"Cette page contient le détail des calculs. Pour la vue résumée, voir l'onglet Synthèse."
```

### Ajout 2 : Vocabulaire entre parenthèses

Dans l'onglet PERCOL, garder les termes techniques MAIS ajouter l'équivalent simple entre parenthèses la première fois qu'il apparaît :

- "Forfait social (taxe réduite)"
- "RGDU (allègement de charges)"
- "Spread trésorerie (marge de placement)"
- "CET (épargne salariale)"

### Ajout 3 : Avertissements visuels plus clairs

Dans la section "Coût par intérimaire", ajouter un indicateur visuel de l'économie :

```
48% ████████████████████████ charges classiques
16% ████████               taxe réduite
     ════════════════       = 32 points d'économie
```

Utiliser une barre de progression pour visualiser l'écart 48% vs 16%.

### Ajout 4 : Tableau de flux COMPLET (déjà demandé dans SPEC_PERCOL_REFACTOR.md)

S'assurer que le tableau de flux euro par euro de la spec PERCOL est bien présent :
- Pool PERCOL vs Pool Cash
- Rendement versé, gains placement, forfait social, cotisations
- Coût net employeur par scénario
- Économie vs référence

---

## RENOMMAGE DES ONGLETS

Renommer les onglets dans la barre de navigation :

| Actuel | Nouveau |
|---|---|
| Upload | Données |
| Simulation | Détail salariés |
| Graphiques | Graphiques |
| Synthèse | **Vue d'ensemble** |
| PERCOL | **Détail expert** |

L'onglet "Vue d'ensemble" doit avoir un style visuel différent (fond vert, texte blanc) pour indiquer que c'est l'onglet principal.

---

## VÉRIFICATION APRÈS IMPLÉMENTATION

1. Charger le fichier CSV
2. Aller sur "Vue d'ensemble" (anciennement Synthèse)
3. Vérifier que le bandeau Avant/Après affiche des chiffres cohérents
4. Vérifier que les 3 sliders mettent à jour tous les chiffres en temps réel
5. Vérifier que les sliders sont synchronisés entre "Vue d'ensemble" et "Détail expert"
6. Vérifier que l'onglet "Détail expert" affiche toujours tout le détail technique
7. Vérifier que les onglets "Détail salariés" et "Graphiques" n'ont pas changé
