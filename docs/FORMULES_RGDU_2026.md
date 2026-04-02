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

### Paramètres

| Paramètre | FNAL 0,50% | FNAL 0,10% |
|---|---|---|
| Tmin | 0,0200 | 0,0200 |
| Tmax | 0,4013 | 0,3973 |
| Tδ | 0,3813 | 0,3773 |
| Puissance | 1,75 | 1,75 |

### D'où vient Tδ (0,3813) ?

Tδ = Tmax − Tmin = amplitude de la réduction.  
Tmax (0,4013) = somme des cotisations patronales éligibles (maladie, vieillesse, AF, FNAL, CSA, AGIRC-ARRCO, chômage, AT/MP plafonné).  
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

Bulletin Mourice Laure (206h, Brut 7 284,94 €) :
- Formule → 146 €
- Bulletin → 33 €
- Facteur ≈ ×4,4

À investiguer. Les **deltas** restent fiables.
