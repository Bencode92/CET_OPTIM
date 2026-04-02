# État des lieux — Ce qu'on sait et ce qu'on ne sait pas

**Date : 2 avril 2026**
**Statut : En cours de validation — NE PAS LANCER avant réponses expert/rescrit**

---

## CE QU'ON SAIT (confirmé par textes, expert, ou bulletins)

### 1. La formule RGDU 2026 est validée

Source : service-public.fr, vérifié le 21/02/2026.

```
C = Tmin + Tδ × [½ × (3 × SMIC × H / Brut − 1)]^1,75
```

Paramètres confirmés pour une entreprise < 50 salariés (FNAL 0,10%) :
- Tmin = 0,0200
- Tδ = 0,3781 (et non 0,3813 comme on utilisait — écart mineur)
- Tmax = 0,3981
- SMIC horaire = 12,02 €
- Puissance = 1,75
- Seuil extinction = 3 × SMIC

**⚠ CORRECTION** : le site service-public.fr donne Tδ = 0,3781 pour < 50 salariés et non 0,3813 qu'on utilisait. Cet écart vient du fait qu'on avait utilisé les paramètres FNAL 0,50% (≥ 50 sal.) alors que vous avez 5 salariés permanents. À vérifier : pour le FNAL, c'est l'effectif total (intérimaires inclus) qui compte. Si ≥ 50 en ETP → FNAL 0,50% → Tδ = 0,3813. Si < 50 → FNAL 0,10% → Tδ = 0,3781.

### 2. Le CET est dans l'assiette RGDU → Étage 1 = 0 €

Source : service-public.fr (RGDU), texte exact :
> "Sont pris en compte : rémunérations versées sur le compte épargne-temps (CET)"

Confirmé par l'expert : les IFM/ICCP restent dans l'assiette RGDU que le salarié mette en CET ou non. Le coefficient RGDU ne change pas.

**Conséquence : le gain RGDU de 103 K€/an qu'on simulait N'EXISTE PAS. L'onglet Simulation montre un gain théorique qui ne se matérialise pas en pratique.**

### 3. Le transfert CET → PERCOL est exonéré de cotisations sécu

Source : AG2R La Mondiale, Code du travail, Code de la sécurité sociale.

Texte exact (AG2R) :
> "Les droits CET transférés sur un PERCOL ne sont pas soumis aux cotisations de Sécurité sociale dans la limite de 16% du PASS par an et par épargnant."

16% du PASS 2026 = 16% × 48 060 € = **7 690 €/an/salarié**.

C'est l'exonération de cotisations sociales (pas juste l'IR). L'employeur paie uniquement le forfait social (16% ou 20%) au lieu des cotisations complètes (~48%).

### 4. Le forfait social est de 16% sous conditions, sinon 20%

Source : URSSAF (urssaf.fr, mis à jour 11/02/2026), service-public.fr.

Conditions pour le 16% (cumulatives) :
- PERCOL en gestion pilotée par défaut
- Au moins 10% de titres éligibles PEA-PME dans le portefeuille

Si ces conditions ne sont pas remplies → 20%.

### 5. Le CET intérim est possible et encadré

Source : accord de branche intérim (Prism'emploi), Code du travail.

- Éligibilité : 910 heures sur 12 mois (accord de branche)
- Éléments affectables : IFM, ICCP, primes conventionnelles, 13ème mois (selon accord)
- Rendement observé chez les ETT : 5% à 8% brut
- L'ETT qui met en place un CET doit le proposer à tous les intérimaires éligibles

### 6. Le brut appliqué du fichier Marges = Base × 1,21

Vérifié sur 367/368 lignes (écart < 0,05 €).

Formule : Brut appliqué = (Brut réel − IFM − ICCP) × 1,21

Où 1,21 = 1 + 10% IFM standard + 11% ICCP standard. C'est un concept managérial interne, pas le brut abattu du bulletin de paie.

### 7. L'écart formule RGDU vs bulletin réel = facteur ~4,4

Sur le bulletin Mourice Laure (206h, Brut 7 284,94 €) :
- Formule théorique → 146 € de réduction
- Bulletin réel → 33 €

Cause non identifiée. Hypothèses : régularisation progressive, proratisation, paramètres FNAL différents. Les deltas (gains entre scénarios) sont proportionnellement fiables, mais les montants absolus sont surévalués.

### 8. Le spread de trésorerie fonctionne

L'ETT détient le cash CET, le place à un taux supérieur au rendement versé. Le spread est modeste (~0,3 point) mais sans risque.

Estimation : ~8 K€/an sur un encours de ~2,5 M€.

---

## CE QU'ON NE SAIT PAS (à valider impérativement)

### ❓ Question 1 : Le plafond de 10 jours s'applique-t-il aux sommes monétaires ?

**Contexte** : L'article L.3334-8 du Code du travail limite à 10 jours/an le transfert CET → PERCOL pour l'exonération d'IR. Mais les IFM/ICCP sont des sommes monétaires, pas des jours de repos.

**Deux plafonds coexistent** :
- Plafond 10 jours (article L.3334-8) → vise l'exonération d'impôt sur le revenu
- Plafond 16% du PASS = 7 690 € (article L.3153-3 et CSS) → vise l'exonération de cotisations sociales

**Ce qu'on ne sait pas** : pour des sommes monétaires (IFM/ICCP), est-ce le plafond de 10 jours OU le plafond de 7 690 € qui s'applique pour l'exonération de cotisations sociales ?

**Impact** :
- Si plafond 10 jours → ~910 €/pers. transférable → gain PERCOL ~10-30 K€/an
- Si plafond 7 690 € → ~4 000 €/pers. transférable (tout passe) → gain PERCOL ~150-220 K€/an

**Action** : rescrit URSSAF. C'est LA question qui détermine le business case.

### ❓ Question 2 : Les cotisations patronales sur l'IFM/ICCP sont-elles différées avec le CET ?

**Contexte** : L'expert dit que les cotisations sont dues "au moment où elles sont dues (fin de mission)". Mais si l'intérimaire choisit de mettre en CET, les IFM/ICCP ne sont pas versées au salarié ce mois-là — elles sont créditées au CET.

**Ce qu'on ne sait pas** : les cotisations patronales sont-elles payées au moment du dépôt en CET (= fin de mission) ou au moment de la sortie du CET (= déblocage ou transfert PERCOL) ?

**Impact** :
- Si cotisations payées à l'entrée en CET → le CET est un simple report côté salarié, l'employeur paie ses charges immédiatement. Au transfert PERCOL, il n'y a PAS de nouvelle charge (déjà payée) mais PAS d'économie non plus.
- Si cotisations différées à la sortie → à la sortie cash = cotisations complètes, à la sortie PERCOL = forfait social seulement. C'est dans ce cas que l'Étage 3 fonctionne.

**Action** : demander à l'expert/gestionnaire de paie de montrer sur un bulletin réel ce qui se passe côté employeur quand un intérimaire dépose en CET. Les cotisations patronales figurent-elles sur le bulletin du mois du dépôt, ou sont-elles absentes ?

### ❓ Question 3 : Votre PERCOL est-il à 16% ou 20% de forfait social ?

**Ce qu'on ne sait pas** : si votre PERCOL remplit les conditions de gestion pilotée + 10% PEA-PME.

**Impact** : 4 points de forfait social → ~30 K€/an de différence sur le scénario sans plafond.

**Action** : demander la fiche technique de votre PERCOL à votre gestionnaire d'épargne salariale.

### ❓ Question 4 : Le rendement CET est-il soumis à cotisations au crédit ou à la sortie ?

**Ce qu'on ne sait pas** : quand l'ETT crédite 2,9% de rendement sur le CET, ce rendement est-il :
- Soumis à cotisations patronales immédiatement (= coût de 2,9% × 1,48 = 4,3%)
- Ou soumis seulement à la sortie (et donc potentiellement au forfait social si PERCOL)

**Impact** : si cotisé immédiatement, le rendement coûte plus cher et le spread est érodé.

### ❓ Question 5 : L'accord de branche intérim exclut-il l'IFM du CET ?

**Contexte** : l'expert mentionne que l'IFM pourrait être exclue de l'extension de l'accord de branche. Mais en tant qu'ETT, vous pouvez rédiger votre propre accord d'entreprise CET qui réintègre l'IFM.

**Ce qu'on ne sait pas** : avez-vous déjà un accord d'entreprise CET ? Si non, l'IFM est-elle couverte par l'accord de branche que vous appliquez ?

**Action** : vérifier votre accord CET existant ou en négocier un.

### ❓ Question 6 : Le risque URSSAF de requalification est-il réel ?

**Ce qu'on ne sait pas** : l'URSSAF a-t-elle déjà sanctionné des ETT utilisant le CET → PERCOL comme outil d'optimisation ?

**Action** : le rescrit URSSAF couvre aussi ce risque — si la réponse est favorable, elle protège contre la requalification.

---

## RÉSUMÉ DÉCISIONNEL

```
┌─────────────────────────────────────┬───────────────┬────────────────────────┐
│ Étage                               │ Gain estimé   │ Statut                 │
├─────────────────────────────────────┼───────────────┼────────────────────────┤
│ 1. RGDU (réduction assiette)        │ 0 €           │ ❌ CONFIRMÉ : ne       │
│                                     │               │    fonctionne pas      │
├─────────────────────────────────────┼───────────────┼────────────────────────┤
│ 2. Spread trésorerie                │ ~8 K€/an      │ ✅ Fonctionne          │
├─────────────────────────────────────┼───────────────┼────────────────────────┤
│ 3. PERCOL (si plafond 7 690 €)      │ ~150-220 K€   │ ❓ Dépend du rescrit   │
│ 3. PERCOL (si plafond 10 jours)     │ ~10-30 K€     │ ❓ Dépend du rescrit   │
├─────────────────────────────────────┼───────────────┼────────────────────────┤
│ TOTAL optimiste                     │ ~230 K€/an    │ ❓ Rescrit nécessaire   │
│ TOTAL pessimiste                    │ ~18 K€/an     │                        │
└─────────────────────────────────────┴───────────────┴────────────────────────┘
```

## PROCHAINES ÉTAPES (dans l'ordre)

1. **Semaine 1** : Vérifier votre accord CET (IFM incluse ?) et votre PERCOL (16% ou 20% ?)
2. **Semaine 1** : Demander un bulletin réel avec dépôt CET pour voir si cotisations patronales sont différées ou payées immédiatement
3. **Semaine 2** : Déposer le rescrit URSSAF avec la question double :
   - Les sommes monétaires (IFM/ICCP) transférées du CET au PERCOL sont-elles soumises au plafond de 10 jours (art. L.3334-8) ?
   - Le plafond de 16% du PASS pour l'exonération de cotisations sociales est-il bien le plafond opérant ?
4. **Attendre le rescrit** (3-6 mois) avant d'engager les coûts de mise en place
5. Si rescrit favorable → lancer la mise en place (accord CET, communication intérimaires)
6. Si rescrit défavorable → évaluer si le gain de ~18 K€ justifie les coûts

---

*Document de travail — ne constitue pas un avis juridique*
