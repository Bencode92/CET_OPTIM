# Synthèse note juridique CET / PERCOL — Avocat (28 avril 2026)

> Source : `docs/Note_juridique_CET_PERCOL.docx` — réponse de l'avocat aux 3 questions du mail du 10 avril.

## 1. Plafond d'exonération CET → PERCOL

**Formule confirmée :**
```
Plafond annuel = 10 jours × 7 h × taux horaire de la dernière mission
```
Soit ≈ **1 960 €/an** pour un taux à 28 €/h. Le plafond est **par salarié**, calculé sur **son** taux horaire.

| Fraction transférée | Cotisations SS | IR |
|---|---|---|
| ≤ plafond 10j | **Exonérée** (patronales + salariales) | **Exonérée** |
| > plafond 10j | Régime de droit commun (patronales + salariales + CSG/CRDS) | Imposable comme salaire |

→ Les deux régimes (social + fiscal) sont **strictement alignés**.

## 2. Rendement CET (2,9 %) servi par l'ETT

| Question | Réponse |
|---|---|
| Sort du rendement au transfert ? | **Choix du salarié** : (a) transféré avec le principal vers PERCOL, ou (b) perçu directement |
| Imputation sur les 10 j ? | **Non** — le rendement = abondement employeur, soumis au régime social classique **indépendamment** du plafond |
| Obligation de servir un rendement ? | **Non** — facultatif. Une fois transféré au PERCOL, l'ETT n'a plus aucune obligation |

⚠ **Implication** : les 2,9 % servis subissent les charges patronales classiques côté ETT, à intégrer dans le coût net.

## 3. Régime fiscal & social — seniors

- **IR au transfert** : exonération suit exactement le plafond social (pas de plafond fiscal autonome).
- **Sortie retraite PERCOL** : prélèvements sociaux (17,2 %) **uniquement sur les plus-values**, **pas sur le capital** issu du CET.
- **Sortie anticipée** :
  - Cas autorisés : invalidité, décès conjoint, fin chômage, surendettement, liquidation judiciaire, achat résidence principale.
  - Accident de la vie → capital exo IR, produits 12,8 % + PS.
  - Achat RP → versements épargne salariale exo IR, produits imposés.
- **Modalités de sortie** : capital, rente, ou panaché (régime fiscal distinct selon).

## 4. Clause de révision du taux de rendement

✅ **Approche recommandée** : intégrer dès la note d'information initiale une clause type :

> « Le taux d'intérêt pourra être révisé à la hausse ou à la baisse en fonction des conditions de marché, par le biais d'une note de service adressée aux salariés. »

→ Évite de modifier la note à chaque révision.
→ S'applique **uniquement pendant la phase de détention CET par l'ETT** (après transfert PERCOL, c'est le gestionnaire qui pilote).

## Impact sur le simulateur (à intégrer)

1. **Plafond par salarié** : `10 × 7 × tauxHoraire_i` calculé pour chaque salarié, pas un plafond uniforme.
2. **Fraction excédentaire** : soumise aux cotisations patronales complètes — pas d'avantage social (étage 3 réduit).
3. **Rendement CET 2,9 %** : ajouter les charges patronales sur cet abondement (étage 2).
4. **Choix transfert vs perception cash du rendement** : variable salarié.

## Points encore ouverts

- Forfait social PERCOL **16 % vs 20 %** (relève du gestionnaire, pas du juridique).
- Recalage formule RGDU × 4,4 vs bulletin réel.
