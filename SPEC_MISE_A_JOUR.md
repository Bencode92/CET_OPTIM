# SPEC MISE À JOUR SIMULATEUR v3 — Corrigée avec effet RGDU × PERCOL

**Priorité : HAUTE — À implémenter dans `public/index.html`**
**Date : 2 avril 2026**

---

## CORRECTION CRITIQUE — L'Étage 1 RGDU interagit avec l'Étage 3 PERCOL

### Le mécanisme complet (4 temps) :

**Temps 1 — Entrée en CET (mois N) :**
- L'intérimaire met IFM/ICCP en CET
- Cotisations DIFFÉRÉES (Prism'emploi p.8 : "au moment où elles sont versées au salarié")
- Brut du mois PLUS BAS → coefficient RGDU PLUS ÉLEVÉ
- → **GAIN RGDU mensuel** (c'est ce que l'onglet Simulation calcule déjà)

**Temps 2 — Détention (mois N → N+12) :**
- ETT détient le cash, place à txETT, verse txSalarie en abondement
- → **Spread de trésorerie** (Étage 2)

**Temps 3a — Sortie CASH (mois N+12) :**
- Les montants CET sont réintégrés dans la dernière mission (BOSS n°985)
- Cotisations patronales COMPLÈTES (~48%) sur le montant débloqué
- RGDU recalculée sur le brut gonflé → coefficient PLUS BAS
- → **PERTE RGDU** qui annule partiellement le gain d'entrée
- Gain net RGDU ≈ faible (effet de timing non-linéaire)

**Temps 3b — Sortie PERCOL (mois N+12) :**
- Les montants CET sont transférés au PERCOL
- Cotisations patronales REMPLACÉES par forfait social (16-20%) sur les 10 jours exonérés
- La RGDU est une réduction sur les cotisations patronales
- Si les cotisations patronales ne sont pas dues (forfait social à la place), la perte RGDU est NULLE sur cette part
- → **Le gain RGDU d'entrée est PRÉSERVÉ pour la part PERCOL**
- C'est un gain additionnel : RGDU gain entrée + économie forfait social

### Implications pour le simulateur :

Le gain RGDU n'est pas un étage séparé — il interagit avec la sortie :
- Part sortie cash → gain RGDU ≈ 0 (annulé par la réintégration)
- Part sortie PERCOL → gain RGDU ≈ **préservé** (pas de cotis. patronales à recalculer)

### Calcul dans le code :

```javascript
// Le gain RGDU mensuel qu'on calcule déjà (tot.gain) est le gain BRUT à l'entrée
// Ce gain n'est préservé que pour la part qui sort en PERCOL

// Part des adhérents CET qui vont en PERCOL
const pctPERCOL = pctAdhCET * pctChoixPERCOL; // ex: 50% × 40% = 20%
// Part des adhérents CET qui sortent en cash
const pctCash = pctAdhCET * (1 - pctChoixPERCOL); // ex: 50% × 60% = 30%

// Gain RGDU préservé = gain d'entrée × part PERCOL
// (la part cash est annulée par la réintégration RGDU à la sortie)
const gainRGDU_preserve = tot.gain * 12 * pctPERCOL;

// Gain RGDU résiduel sur la part cash (effet de timing, non-linéarité)
// C'est petit mais pas zéro — approximation : ~10% du gain brut
const gainRGDU_timing = tot.gain * 12 * pctCash * 0.10;

// Gain RGDU total
const gainRGDU = gainRGDU_preserve + gainRGDU_timing;
```

### Affichage dans l'onglet Vue d'ensemble :

Dans le tableau récap 3 étages, afficher :

```
| Source d'économie                                    | Gain annuel |
|------------------------------------------------------|-------------|
| Allègement de charges préservé (part plan retraite)  |   XX XXX €  |
| Marge de placement (12 mois)                         |    X XXX €  |
| Plan retraite (16% au lieu de 48%)                   |   XX XXX €  |
| TOTAL                                                |  XXX XXX €  |
```

Dans l'onglet Détail expert, montrer le détail :
- Gain RGDU brut mensuel (= tot.gain, ce qu'on calcule)
- Part préservée (sortie PERCOL)
- Part annulée (sortie cash)
- Part résiduelle timing

---

## AUTRES CHANGEMENTS (résumé)

### Plafonds
- ICCP entrée CET : 10 jours-équivalent/an (IFM sans limite)
- Sortie PERCOL exonérée : 10 jours-équivalent/an (tous types)
- Conversion : jours = montant € / (taux horaire × 7h)

### Nouveaux sliders
- Taux horaire moyen (10-35 €/h, défaut 14)
- % éligibles 910h (20-100%, défaut 70)
- Toggle abondement/rendement (impact sur le spread)

### Abondement
- Si abondement : cotisé immédiatement → coût = taux × 1.48
- Si rendement : cotisé au déblocage → coût = taux brut
- En attente réponse Prism'emploi (Question 4)

---

## CE QU'IL NE FAUT PAS CHANGER

- Le calcul RGDU existant dans l'onglet Simulation (correct, c'est le gain brut d'entrée)
- Le parsing CSV
- L'auto-chargement GitHub
- Les onglets Upload, Simulation, Graphiques
