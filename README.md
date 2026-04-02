# CET_OPTIM — Simulateur CET × RGDU 2026

## Objectif

Optimisation des charges patronales en intérim via le mécanisme CET (Compte Épargne Temps) et la passerelle CET → PERCOL.

### Schéma en 3 étages

1. **Entrée (mois N)** : L'intérimaire affecte X% de ses IFM/ICCP au CET → potentiel gain RGDU
2. **Détention (N à N+12)** : L'ETT détient le cash et sert un rendement (3-5%) → spread de trésorerie
3. **Sortie (mois N+12)** : Transfert CET → PERCOL = forfait social 16-20% au lieu de ~48% cotisations → **le vrai levier**

## Structure du projet

```
CET_OPTIM/
├── README.md
├── docs/
│   ├── FORMULES_RGDU_2026.md      # Formules détaillées avec exemples
│   ├── SCHEMA_3_ETAGES.md          # Architecture du schéma d'optimisation
│   └── QUESTIONS_EXPERT.md          # Questions à valider avec juriste/paie
├── src/
│   ├── simulateur.jsx               # Artefact React interactif
│   └── generate_simulation.py       # Script Python → Excel avec formules
└── data/
    └── template_marges.csv          # Template structure fichier Marges
```

## Paramètres RGDU 2026

| Paramètre | Valeur |
|---|---|
| SMIC horaire | 12,02 € |
| Seuil d'extinction | 3 × SMIC |
| Tmin (plancher) | 2,00% |
| Tmax (FNAL 0,50%) | 40,13% |
| Tδ | 38,13% |
| Puissance | 1,75 |

## Formule

```
C = Tmin + Tδ × [½ × (3×SMIC×Heures/Brut − 1)]^1,75
Réduction = C × Brut
```

## Statut

- [x] Formule RGDU 2026 validée
- [x] Simulateur interactif React
- [x] Script Python → Excel
- [x] Documentation formules + schéma 3 étages
- [ ] Validation CET exclu de l'assiette RGDU
- [ ] Validation plafond 10 jours vs sommes monétaires
- [ ] Intégration étage PERCOL dans simulateur
- [ ] Validation forfait social 16% vs 20%
- [ ] Recalage formule sur bulletin réel
