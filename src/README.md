# Simulateur React CET × RGDU 2026

Le fichier `simulateur.jsx` est trop volumineux pour être poussé via l'API GitHub depuis Claude.

## Pour l'ajouter au repo :

### Option 1 : Via Claude Code
```bash
cd CET_OPTIM
# Copier le fichier depuis l'artefact Claude
claude "copie le simulateur React CET RGDU 2026 dans src/simulateur.jsx"
```

### Option 2 : Via Claude.ai
Télécharger l'artefact depuis la conversation Claude.ai et l'ajouter manuellement :
```bash
git add src/simulateur.jsx
git commit -m "feat: add React CET simulator"
git push
```

## Fonctionnalités du simulateur

- **Upload CSV/XLSX** : glisser-déposer le fichier Marges
- **4 onglets** : Paramètres, Simulation, Détail, Synthèse
- **Curseurs interactifs** : % IFM et % ICCP en CET
- **Extrapolation** : effectif total configurable (ex: 368 → 660)
- **Annualisation** : projection sur 12 mois
- **Graphiques** : gains par scénario + évolution de la marge
- **Exemple chiffré** : calcul pas-à-pas avec explication de chaque paramètre

## Dépendances React

```jsx
import * as Papa from "papaparse";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
         CartesianGrid, ComposedChart, Line } from "recharts";
```

## Prochaine étape

Ajouter l'étage PERCOL au simulateur :
- Comparaison coûts : cash direct vs CET→Cash vs CET→PERCOL
- Paramètres : forfait social (16/20%), rendement CET, taux adhésion
- Projection combinée : gain RGDU + gain forfait social
