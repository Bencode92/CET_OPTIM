# SPEC UX — Rendre le simulateur lisible pour un employeur non financier

**Fichier à modifier : `public/index.html`**

## Principe directeur

Un employeur non financier doit comprendre le message en **3 secondes** :
> "Vous payez X€ de charges. Avec ce dispositif, vous payez Y€. Vous économisez Z€/an."

Tout le reste est du détail. L'outil doit raconter une **histoire**, pas afficher des données.

---

## 1. RESTRUCTURER LES ONGLETS

### Remplacer les 5 onglets actuels par 3 :

| Ancien | Nouveau | Contenu |
|---|---|---|
| Upload | **Données** | Upload + résumé du fichier chargé |
| Simulation + Graphiques + Synthèse | **Résultat** | Page unique avec le message clé + visuels |
| PERCOL | **Détail expert** | Tout le détail technique (pour le DAF/expert) |

L'onglet **Résultat** est celui qui s'affiche automatiquement après chargement du fichier.

---

## 2. ONGLET "RÉSULTAT" — L'écran principal

### Section A : Le message en 3 secondes (tout en haut)

Un grand bandeau qui dit :

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  Aujourd'hui          Avec CET + PERCOL       Économie     │
│                                                            │
│  Vous payez            Vous payez             Vous         │
│  687 000 €/mois        ??? €/mois             économisez   │
│  de charges            de charges                          │
│  patronales            patronales             209 000 €    │
│                                                            │
│  8 244 000 €/an        8 035 000 €/an         par an       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

Le calcul :
- "Aujourd'hui" = somme des cotisations patronales du fichier (colonne Cot.Pat.) × 12
- "Avec CET+PERCOL" = "Aujourd'hui" - gainTotal (percol.gainTotal)
- "Économie" = percol.gainTotal

**Style** : fond vert foncé pour l'économie, très gros chiffre, police 48px pour le gain.

### Section B : L'histoire en 3 étapes (la timeline)

Garder la timeline actuelle des 3 étages (cercles 1-2-3) mais **simplifier le langage** :

| Actuel | Remplacer par |
|---|---|
| "Étage 1 — Entrée CET" | "**Étape 1 — L'intérimaire épargne**" |
| "Mois N" | "Chaque mois" |
| "gain RGDU" | "réduction de vos charges sociales" |
| "Étage 2 — Détention 12 mois" | "**Étape 2 — Vous placez l'épargne**" |
| "spread trésorerie" | "votre marge de placement" |
| "Étage 3 — Sortie" | "**Étape 3 — Transfert vers l'épargne retraite**" |
| "forfait social 16%" | "taxe réduite (16% au lieu de 48%)" |
| "surcoût CET→Cash" | "ceux qui préfèrent récupérer en cash" |
| "économie PERCOL" | "votre économie principale" |

Dans chaque étape, utiliser des **phrases complètes** au lieu de listes de chiffres :
- Étape 1 : "321 intérimaires mettent de côté 30% de leurs primes (106 000 €/mois). Cela réduit vos charges de 51 000 €/an."
- Étape 2 : "Vous placez cet argent pendant 12 mois à 3,2% et versez 2,9% à l'intérimaire. Votre marge : 3 800 €/an."
- Étape 3 : "128 intérimaires transfèrent vers un plan retraite. Au lieu de 48% de charges, vous payez seulement 16%. Économie : 154 000 €/an."

### Section C : Les hypothèses clés (sliders simplifiés)

Garder seulement **3 sliders** dans l'écran Résultat :

1. "% des primes mises en épargne" (= pctIfm = pctIccp, un seul slider pour les deux)
2. "% d'intérimaires qui participent" (= tauxAdhesionCET)
3. "% qui choisissent le plan retraite" (= tauxChoixPERCOL)

Les autres paramètres (rendement, taux placement, forfait social) vont dans l'onglet "Détail expert".

### Section D : Le retour sur investissement

Ajouter un bloc ROI simple :

```
Coût de mise en place estimé : [input éditable, défaut 50 000 €]
Économie annuelle : 209 000 €
Retour sur investissement : 3 mois
```

### Section E : Les risques en clair

Remplacer la matrice de risques technique par des phrases simples :

```
⚠ 3 points à valider avec votre expert avant de lancer :

1. Le plafond de transfert vers le plan retraite : si limité à 10 jours/an,
   l'économie passe de 209 K€ à ~70 K€. → Demandez à votre juriste.

2. Les charges sociales sur l'épargne CET : vérifier si elles sont réduites
   le mois du versement. Si non, l'économie baisse de ~50 K€.

3. Le taux de la taxe sur le plan retraite : 16% si votre PERCOL est en
   "gestion pilotée" avec 10% de PME. Sinon c'est 20%.
```

---

## 3. ONGLET "DÉTAIL EXPERT"

Garder tout le contenu actuel de l'onglet PERCOL :
- Les 6 sliders détaillés
- Le tableau flux euro par euro
- Les graphiques de sensibilité
- Les KPI techniques

Ajouter aussi le contenu des onglets Simulation, Graphiques, Synthèse actuels.

Ce n'est pas l'écran principal mais il est disponible pour le DAF qui veut creuser.

---

## 4. VOCABULAIRE — REMPLACEMENT SYSTÉMATIQUE

Dans TOUT le simulateur, remplacer ces termes :

| Technique | Simple |
|---|---|
| RGDU | allègement de charges |
| CET | épargne salariale / épargne intérimaire |
| PERCOL | plan retraite d'entreprise |
| Forfait social | taxe réduite |
| Cotisations patronales | charges sociales |
| Spread trésorerie | marge de placement |
| Taux d'adhésion CET | % d'intérimaires participants |
| Taux choix PERCOL | % qui choisissent le plan retraite |
| IFM | primes de fin de mission |
| ICCP | indemnités de congés |
| Brut réel | salaire brut |
| Gain RGDU | réduction de charges |
| Forfait social 16% / 20% | taxe réduite à 16% (au lieu de 48%) |
| Effectif total | nombre total d'intérimaires |
| Extrapolation | projection |

**IMPORTANT** : Dans l'onglet "Détail expert", GARDER les termes techniques. Le remplacement ne concerne que l'onglet "Résultat".

---

## 5. COULEURS ET HIÉRARCHIE VISUELLE

### Palette simplifiée

- **Vert** (#22c55e) : économies, gains → C'est ce que l'employeur veut voir
- **Bleu** (#3b82f6) : informations neutres, montants actuels
- **Orange** (#f59e0b) : attention, hypothèses à valider
- **Rouge** (#ef4444) : coûts, charges → C'est ce que l'employeur veut réduire

### Hiérarchie

1. Le gain total = plus gros chiffre de la page (48px, vert, au centre)
2. Les 3 étapes = visuels moyens (20px, dans des cartes)
3. Les sliders = petits, en dessous
4. Le détail = dans un autre onglet

---

## 6. MOBILE

Vérifier que l'onglet Résultat fonctionne sur mobile :
- Le bandeau Avant/Après doit passer en stack vertical
- Les 3 étapes en stack vertical au lieu de 3 colonnes
- Les sliders en pleine largeur

---

## 7. CE QU'IL NE FAUT PAS CHANGER

- La logique de calcul RGDU et PERCOL (déjà correcte)
- Le parsing CSV français
- La logique d'estimation IFM/ICCP pour les lignes vides
- L'auto-chargement depuis GitHub
