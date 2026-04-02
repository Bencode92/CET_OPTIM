# Instructions pour Claude Code — CET_OPTIM

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
│   ├── FORMULES_RGDU_2026.md    # Formules détaillées + exemples
│   ├── SCHEMA_3_ETAGES.md        # Architecture optimisation CET→PERCOL
│   └── QUESTIONS_EXPERT.md        # Questions juriste/paie
├── src/
│   ├── simulateur.jsx             # React interactif (à ajouter)
│   ├── generate_simulation.py     # Python → Excel avec formules
│   └── README.md
└── data/
    └── template_marges.csv        # Structure fichier Marges
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
- Plafond transfert CET→PERCOL : 10 jours/an pour jours de repos, à confirmer pour sommes monétaires

## Conventions de code

- Langue : français pour les commentaires, noms de variables en anglais
- React : composants fonctionnels avec hooks, Tailwind pour le style
- Python : pandas + openpyxl, formules Excel (pas de valeurs hardcodées)
- Formats numériques : virgule décimale pour l'affichage FR, point pour le calcul
- Tous les montants en euros, heures en décimal

## Fichier Marges (input)

Colonnes attendues (détection automatique) :
- `Hrs Paye` : heures payées
- `Brut réel` : brut total incluant IFM et ICCP
- `IFM réelles` : indemnités de fin de mission réelles
- `ICCP réelles` : indemnités compensatrices de congés payés réelles
- `CET` : montant CET (souvent vide)
- `Brut appliqué` : = (Brut réel − IFM − ICCP) × 1,21 (concept managérial)
- `Cot. Pat. Montant appliqué` : cotisations patronales
- `Réduction générale` : allègement RGDU actuel
- `Marge` : = Total Facturé − Total Payé

## Tâches prioritaires

### TODO immédiat
- [ ] Ajouter `src/simulateur.jsx` au repo (copier depuis conversation Claude.ai)
- [ ] Intégrer l'étage PERCOL dans le simulateur React :
  - Nouvel onglet "PERCOL" avec comparaison 3 scénarios (cash / CET→cash / CET→PERCOL)
  - Paramètres : forfait social %, rendement CET %, taux adhésion PERCOL %
  - Calcul : économie = (cotis_patronales − forfait_social) × montant_CET × nb_adhérents

### TODO après validation expert
- [ ] Recaler la formule RGDU sur le bulletin réel (écart ×4,4 constaté)
- [ ] Confirmer si CET exclu de l'assiette RGDU mensuelle
- [ ] Confirmer plafond 10 jours applicable ou non aux sommes monétaires
- [ ] Ajuster forfait social (16% vs 20%) selon config PERCOL réelle

## Points de vigilance

⚠ Les montants absolus de la simulation RGDU sont à recaler (écart formule vs bulletin)
⚠ Les DELTAS (gains entre scénarios) sont fiables
⚠ L'extrapolation suppose un profil moyen identique pour les salariés non chargés
⚠ Ne jamais commiter de données nominatives (noms, n° sécu, IBAN)
⚠ Le schéma CET→PERCOL doit être validé juridiquement avant mise en production
