# Formules RGDU 2026 — Documentation complète

## 1. Base pure

```
Base = Brut réel − IFM réelles − ICCP réelles
```

Le Brut réel dans le fichier Marges **inclut** les IFM et ICCP.

## 2. Brut appliqué (actuel, sans CET)

```
Brut appliqué = Base × 1,21
```

Où 1,21 = 1 + 10% (IFM standard) + 11% (ICCP standard = 10% × 1,10).  
Vérifié sur **367/368 lignes** du fichier Marges (écart < 0,05 €).

> Note : ce Brut appliqué est un concept **managérial** (fichier Marges), pas le Brut abattu du bulletin. Sur le bulletin, Brut abattu = Brut total.

## 3. Brut avec CET

```
Brut CET = Brut réel − (IFM × %CET_IFM) − (ICCP × %CET_ICCP)
```

## 4. SMIC de référence

```
SMIC_ref = Heures payées × 12,02 €
```

## 5. Ratio

```
Ratio = (3 × SMIC_ref) / Brut_CET
```

- ratio ≤ 1 : au-dessus de 3 SMIC → C = 0
- ratio > 1 : réduction applicable

## 6. Coefficient C

```
C = Tmin + Tδ × [½ × (ratio − 1)]^1,75
C = min(C, Tmax)
```

### Paramètres (en vigueur depuis le 1er janvier 2026)

| Paramètre | FNAL 0,50 % (>50 sal.) | FNAL 0,10 % |
|---|---|---|
| Tmin | 0,0200 | 0,0200 |
| Tmax | **0,4021** | **0,3981** |
| Tδ | **0,3821** | **0,3781** |
| Puissance | 1,75 | 1,75 |

> **Source** : Décret n° 2025-1446 du 31 décembre 2025, art. 1er, 3° b) — modifie l'article D. 241-7 du Code de la Sécurité Sociale. La valeur initialement publiée par le décret du 4 septembre 2025 (Tδ = 0,3813) a été remplacée 4 mois plus tard.
>
> Pour une ETT à 660 salariés (FNAL 0,50 % obligatoire) : **Tδ = 0,3821, Tmax = 0,4021**.

### D'où vient Tδ ?

Tδ = Tmax − Tmin = amplitude de la réduction.  
Tmax = somme des cotisations patronales éligibles (maladie, vieillesse, AF, FNAL, CSA, AGIRC-ARRCO, chômage, AT/MP plafonné).  
Tmin (0,02) = plancher de la réforme 2026.

### Pourquoi puissance 1,75 ?

Choix du législateur. Remplace l'ancienne formule linéaire (Fillon) :
- Réduction reste forte en bas de grille
- Chute seulement près de 3 SMIC
- Supprime la "trappe à bas salaires"

Pour le CET : gain **plus fort** pour salariés proches de 3 SMIC (zone pentue).

## 7. Réduction & Gain

```
Réduction = C × Brut_CET
Gain = Réduction(CET) − Réduction(0%)
```

## Exemple chiffré — Matricule 2296

106h, Brut = 3 297,17 €, IFM = 343,20 €, ICCP = 377,52 €

### SANS CET

```
SMIC_ref = 106 × 12,02 = 1 274,12 €
3×SMIC = 3 822,36 €
Ratio = 3 822,36 / 3 297,17 = 1,1593
inner = ½ × (1,1593 − 1) = 0,0797
inner^1,75 = 0,01196
C = 0,02 + 0,3813 × 0,01196 = 0,02456
Réduction = 0,02456 × 3 297,17 = 80,95 €
```

### AVEC CET 30%/30%

```
CET IFM = 343,20 × 30% = 102,96 €
CET ICCP = 377,52 × 30% = 113,26 €
Brut CET = 3 297,17 − 102,96 − 113,26 = 3 080,95 €
Ratio = 3 822,36 / 3 080,95 = 1,2407
inner = ½ × (1,2407 − 1) = 0,1203
inner^1,75 = 0,02457
C = 0,02 + 0,3813 × 0,02457 = 0,02937
Réduction = 0,02937 × 3 080,95 = 90,50 €
```

### GAIN = 90,50 − 80,95 = **9,55 €/mois** (114,54 €/an)

## Écart constaté

### Cas extrême — Mourice Laure (206h, Brut 7 284,94 €)
- Formule → 146 €
- Bulletin → 33 €
- Facteur ≈ ×4,4

### Verdict après test corrélation sur 158 lignes (28/04/2026)

**La calibration multiplicative tient** (CV = 0,18, corrélations |corr| < 0,27 vs ratio, brut, taux horaire).

Mais résultat clé : `k_global = 1,078` — la formule **sous-estime** la réduction réelle de **~8 %** sur la population, **pas l'inverse**. Mourice était un cas pathologique non représentatif.

### Cause des cas pathologiques

**Régularisation annuelle progressive** dans la paie : 24 % des lignes avec réduction > 0 sont au-dessus du seuil 3 SMIC mensuel (formule = 0) parce que le logiciel paie applique le coefficient sur la **rémunération annuelle cumulée**, pas sur le brut mensuel isolé.

→ **Limite structurelle** : la formule mensuelle ne peut pas reproduire la régul annuelle. La précision individuelle est limitée sur un mois isolé. Au niveau population, l'écart se moyenne (k_global ≈ 1,08).

### Secteurs DFS mission-dépendants

L'arrêté du 4 septembre 2025 prévoit que la DFS s'applique **par mission**, pas par statut intérim. BTP construction = 7 % en 2026 → base RGDU réduite à 93 % du brut. Ce dispositif explique une partie de la dispersion individuelle non capturée par la formule pure.

→ Recommandation : enrichir le CSV avec un code mission/secteur DFS pour appliquer la base abattue par ligne.

### Calibration appliquée dans le simulateur

Pour chaque salarié `i` avec `Réduction générale > 0` dans le CSV :
- `k_i = redAct_i / formulaBase_i`
- `redCet_i = formulaCet_i × k_i`
- `gain_i = (formulaCet_i − formulaBase_i) × k_i`

Pour les lignes sans `redAct` ou avec `formulaBase = 0` (24 % « incohérentes ») : fallback formule pure (probablement sous-estime le gain réel).
