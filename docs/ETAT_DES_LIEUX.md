# ÉTAT DES LIEUX FINAL — Post analyse Prism'emploi

**Date : 2 avril 2026**
**Sources : Accord de branche 27/03/2000, Dépêche Prism'emploi N°22 (04/2023), Note juridique Prism'emploi (02/06/2025), BOSS n°985, DSS courrier 14/11/2012, Cour de cassation 22/10/2020**

---

## RÉSUMÉ EN 30 SECONDES

Le CET intérim fonctionne. Les cotisations sont bien différées. MAIS il y a deux plafonds distincts qu'on confondait : un plafond de 10 jours à l'ENTRÉE du CET (ICCP seulement, pas l'IFM) et un plafond de 10 jours à la SORTIE vers PERCOL. L'IFM n'a pas de limite à l'entrée. Le gain dépend de la passerelle PERCOL qui reste à valider par rescrit.

---

## CE QU'ON SAIT MAINTENANT (confirmé par Prism'emploi)

### 1. Les cotisations sont DIFFÉRÉES — confirmé par 3 sources

**Note Prism'emploi juin 2025, page 8 :**
> "Les sommes issues d'un CET ont la nature d'un élément de rémunération et entrent dans l'assiette des cotisations et contributions de sécurité sociale **au moment où elles sont versées au salarié intérimaire**."

**Conséquence :** quand l'intérimaire met ses IFM/ICCP en CET, l'ETT ne paie PAS les cotisations patronales ce mois-là. Les cotisations sont dues uniquement au moment de la sortie (déblocage cash ou transfert PERCOL). C'est le fondement de l'Étage 3.

### 2. Deux plafonds DIFFÉRENTS qu'on confondait

**Plafond A — À l'ENTRÉE dans le CET (accord de branche art. 6-3-1) :**
- IFM : **PAS DE LIMITE** — l'intérimaire peut mettre 100% de ses IFM en CET
- ICCP : **limité à 10 jours-équivalent par an**
- Heures de repos, CP, RTT : limités à 22 jours/an au cumul

**Plafond B — À la SORTIE vers PERCOL (art. L.3334-8 Code du travail) :**
- Transfert CET → PERCOL pour bénéficier de l'exonération : **10 jours/an maximum**
- S'applique à TOUS les droits CET (IFM + ICCP + repos), pas seulement l'ICCP

**ATTENTION** : ces deux plafonds sont DIFFÉRENTS et se cumulent :
- L'IFM entre sans limite dans le CET
- Mais à la sortie vers PERCOL, seuls 10 jours-équivalent sont exonérés (tous types confondus)

### 3. La conversion euros → jours est définie précisément

**Accord de branche art. 6-3-2 :**
> "Le montant des primes ou indemnités versées au CET par un intérimaire est transformé en jours (un jour = 7 heures) par division par le salaire brut horaire de la mission au titre de laquelle elles sont dues."

**Formule :** Jours-équivalent = Montant € / (Salaire brut horaire × 7)

**Exemple :** IFM de 500 € pour un intérimaire à 14 €/h → 500 / (14 × 7) = 500 / 98 = **5,1 jours**

### 4. Les sommes CET sont rattachées à la DERNIÈRE mission pour la RGDU

**BOSS allègements généraux n°985 + DSS courrier 14/11/2012 + Cass. 22/10/2020 :**
> "Les IFM, jours de repos ou ICCP placés sur le CET et monétisés postérieurement doivent être intégrés à la rémunération prise en compte pour le calcul de la réduction de la dernière mission, même si les sommes issues du CET sont liées à de précédentes missions."

**Conséquence :** quand le CET est débloqué (cash ou PERCOL), les montants sont réintégrés dans l'assiette RGDU de la dernière mission. Ça ne change pas l'Étage 1 = 0 (les cotisations sont les mêmes, juste décalées dans le temps), mais ça confirme le mécanisme de report.

### 5. La fin de mission NE déclenche PAS le déblocage automatique

**Accord de branche + Note Prism'emploi :**
> "La fin d'un contrat de mission ne constitue pas un cas de déblocage automatique du CET, sauf demande du salarié intérimaire."

**Conséquence :** le CET reste en place entre les missions. L'ETT conserve le cash. Le spread de trésorerie fonctionne sur toute la durée de détention.

### 6. L'IFM et l'ICCP placées au CET sont payées à la fin de la mission SAUF demande contraire

**Accord de branche art. 6-3-1 :**
> "L'IFM et l'ICCP dues au titre des sommes placées au CET sont payées à la fin de la mission y ayant ouvert droit sauf demande contraire de l'intérimaire."

**Interprétation :** C'est ambigu. Deux lectures possibles :
- Lecture 1 : l'IFM/ICCP sont versées (et cotisées) à la fin de la mission, et c'est seulement le NET qui va au CET → les cotisations sont payées immédiatement
- Lecture 2 : l'IFM/ICCP sont "dues" mais si l'intérimaire demande le CET, elles ne sont PAS versées et les cotisations sont différées

La Note Prism'emploi page 8 tranche en faveur de la lecture 2 : "les sommes entrent dans l'assiette des cotisations **au moment où elles sont versées au salarié**". Si elles ne sont pas versées (car mises en CET), les cotisations ne sont pas dues à ce moment-là.

### 7. Condition d'ancienneté : 910 heures sur 12 mois

**Accord de branche art. 6-2 :**
> "Les intérimaires sont susceptibles de bénéficier d'un CET dès lors qu'ils justifient d'une ancienneté de 910 heures au cours des 12 derniers mois."

Un accord d'entreprise peut fixer une condition MOINS restrictive. 910h = environ 6 mois temps plein. Ça exclut les intérimaires très occasionnels.

**Impact sur le simulateur :** sur vos 641 intérimaires du mois de mars, il faudrait filtrer ceux qui ont 910h sur 12 mois. Ce n'est probablement pas 100%.

### 8. L'abondement employeur est soumis à cotisations sécu

**Note Prism'emploi page 6 :**
> "L'ETT peut compléter, en temps ou en argent, les éléments placés par le salarié intérimaire dans le CET. Cet abondement, constituant un complément de rémunération, est soumis à cotisations de sécurité sociale."

**Conséquence :** si vous abondez à 8% comme Randstad, ces 8% sont cotisés immédiatement. Ce n'est PAS du rendement gratuit — c'est un coût de 8% × 1,48 = 11,8% du montant CET.

### 9. Délai d'utilisation du CET = 5 ans maximum

**Accord de branche art. 6-5-1 :**
> "Le salarié intérimaire doit utiliser son CET avant l'expiration d'un délai de 5 ans à compter de la date à laquelle il a accumulé un nombre de jours égal à la durée minimale de 22 jours."

Passé 5 ans, liquidation automatique (= paiement cash avec cotisations).

### 10. Transfert inter-ETT possible mais limité

**Accord de branche art. 6-7 :**
Transfert possible uniquement vers une filiale du même groupe, et seulement si la filiale propose aussi un CET. En pratique, ça ne concerne pas ByCam/Cameleons (pas de filiale TT).

---

## CE QU'ON NE SAIT TOUJOURS PAS

### ❓ Question centrale : Le plafond de 10 jours pour le transfert CET → PERCOL

Le plafond de 10 jours à l'ENTRÉE dans le CET ne concerne que l'ICCP (pas l'IFM). Mais le plafond de 10 jours pour l'exonération lors du transfert CET → PERCOL (art. L.242-4-3 CSS + art. L.3334-8 C.trav) s'applique à TOUS les droits CET.

**La question :** un intérimaire met 100% de ses IFM (pas de limite) + 10 jours d'ICCP dans le CET. Au total, il a peut-être 30 jours-équivalent en CET. Il transfère vers le PERCOL : seuls 10 jours sont exonérés de cotisations SS et d'IR. Les 20 jours restants sont cotisés normalement (comme un déblocage cash).

**Impact chiffré :** avec un taux journalier moyen de ~175 € (25 €/h × 7h), le montant exonéré = 10 × 175 = 1 750 €/an/intérimaire. L'économie par intérimaire = différentiel cotisations évitées - forfait social payé.

### ❓ Le forfait social s'applique-t-il sur les 10 jours exonérés ?

L'expert Perplexity a dit que non ("les jours exonérés de cotisations SS ne sont pas assujettis au forfait social"). AG2R semble confirmer. Mais la Note Prism'emploi ne mentionne PAS le PERCOL du tout. C'est un silence inquiétant — soit parce que c'est évident, soit parce que les ETT ne font pas la passerelle PERCOL.

### ❓ Combien de vos 641 intérimaires ont 910h d'ancienneté ?

C'est un filtre important qu'on n'a pas dans les données. Si seulement 50% sont éligibles, ça divise le pool par deux.

---

## TABLEAU RÉCAPITULATIF FINAL

| Étage | Mécanisme | Gain annuel | Statut | Source |
|---|---|---|---|---|
| 1. RGDU | CET réduit l'assiette → plus d'allègement | **0 €** | ❌ Mort | BOSS n°985 : CET dans l'assiette RGDU |
| 2. Spread tréso | ETT place le cash CET, verse un rendement inférieur | **~8 K€** | ✅ Confirmé | Prism'emploi : cotis. différées |
| 3a. PERCOL (sans forfait social sur 10j) | 10 jours exonérés de cotis. SS → économie ~25% × 1 750 €/pers. | **~84 K€** (avec 192 adhérents) | ❓ Rescrit nécessaire | Art. L.242-4-3 CSS |
| 3b. PERCOL (avec forfait social 16% sur 10j) | 10 jours : économie (25% - 16%) × 1 750 €/pers. | **~30 K€** (avec 192 adhérents) | ❓ Rescrit nécessaire | |
| **TOTAL optimiste** | | **~92 K€** | | |
| **TOTAL prudent** | | **~38 K€** | | |

---

## PLAN D'ACTION RÉVISÉ

### Phase 1 — Immédiate (sans risque, sans rescrit)
1. Créer l'accord d'entreprise CET (ou appliquer l'accord de branche du 27/03/2000)
2. Proposer le CET avec rendement attractif (5-8% comme Randstad)
3. Gain = spread trésorerie (~8 K€) + fidélisation + attractivité
4. Coût = faible (gestion interne, pas besoin de PERCOL)

### Phase 2 — Après rescrit URSSAF
5. Déposer le rescrit sur deux questions :
   - Les 10 jours exonérés au transfert CET→PERCOL incluent-ils les IFM converties en jours-équivalent ?
   - Le forfait social s'applique-t-il sur ces 10 jours exonérés ?
6. Si favorable → mettre en place le PERCOL + passerelle CET→PERCOL
7. Gain additionnel = 30-84 K€/an selon la réponse sur le forfait social

### Ce qu'il NE FAUT PAS faire
- Ne PAS engager les coûts PERCOL (~50 K€) avant le rescrit
- Ne PAS promettre de gains RGDU (Étage 1 = 0 confirmé)
- Ne PAS confondre les deux plafonds de 10 jours (entrée ICCP vs sortie PERCOL)

---

*Sources primaires : Accord de branche 27/03/2000 (signé CFDT, CFTC, CFE-CGC, SNSETT-CGT, CGT-FO, SETT), Dépêche Prism'emploi N°22 (25/04/2023), Note juridique Prism'emploi (02/06/2025), BOSS allègements généraux n°985, Courrier DSS 14/11/2012, Cass. soc. 22/10/2020.*
