# Dossier de Consultation Expert — Optimisation CET / PERCOL pour ETT

**Objet :** Validation juridique et technique du schéma d'optimisation des charges patronales via Compte Epargne Temps (CET) et passerelle CET vers PERCOL  
**Destinataire :** Expert paie / Juriste droit social  
**Emetteur :** Direction financière — ETT ByCam / Cameleons  
**Date :** 2 avril 2026  
**Classification :** Confidentiel — Document de travail  
**Version :** 1.0  

---

## Table des matieres

1. [Contexte et objectif](#1-contexte-et-objectif)
2. [Schema d'optimisation en 3 etages](#2-schema-doptimisation-en-3-etages)
3. [Formule RGDU 2026 detaillee](#3-formule-rgdu-2026-detaillee)
4. [Chiffrage sur donnees reelles](#4-chiffrage-sur-donnees-reelles)
5. [Tableau comparatif des 3 scenarios de sortie](#5-tableau-comparatif-des-3-scenarios-de-sortie)
6. [Questions pour l'expert](#6-questions-pour-lexpert)
7. [Analyse de sensibilite](#7-analyse-de-sensibilite)
8. [Avantages pour l'interimaire](#8-avantages-pour-linterimaire)
9. [Risques identifies](#9-risques-identifies)
10. [Annexes](#10-annexes)

---

## 1. Contexte et objectif

### 1.1. Presentation de l'entreprise

L'entreprise est une **Entreprise de Travail Temporaire (ETT)** operant sous les marques ByCam et Cameleons. Le portefeuille actuel comprend environ **656 salaries interimaires** sur la periode de paie de mars 2026, dont 641 avec des donnees exploitables.

### 1.2. Objectif de la demarche

L'objectif est de **reduire le cout des charges patronales** en mettant en place un dispositif a trois niveaux :

1. **Reduction de l'assiette RGDU mensuelle** via l'affectation d'une partie des IFM et ICCP au CET
2. **Generation d'un spread de tresorerie** durant la periode de detention du CET (12 mois)
3. **Substitution des cotisations patronales (~48%) par un forfait social (16-20%)** lors du transfert CET vers PERCOL

L'economie annuelle estimee est de l'ordre de **335 000 EUR** pour un taux d'adhesion de 30% des interimaires, sous reserve de validation des hypotheses juridiques presentees dans ce dossier.

### 1.3. Cadre reglementaire concerne

| Texte | Objet |
|---|---|
| L. 3151-1 et suivants du Code du travail | Compte Epargne Temps |
| L. 3334-1 et suivants du Code du travail | Plan d'Epargne Retraite Collectif (PERCOL) |
| Art. L. 241-13 du Code de la securite sociale | Reduction generale des cotisations patronales (RGDU) |
| Loi n 2025-XX (LFSS 2026) | Reforme RGDU 2026 — nouvelle formule non lineaire |
| Art. L. 137-15 et L. 137-16 du Code de la securite sociale | Forfait social |
| Accord de branche interimaire (Prism'emploi) | CET interimaire — conditions d'eligibilite |

---

## 2. Schema d'optimisation en 3 etages

### 2.1. Vue d'ensemble

```
                        MOIS N                           MOIS N+12
                          |                                  |
    ┌─────────────────────┼──────────────────────────────────┼───────────────┐
    │                     │                                  │               │
    │   ETAGE 1           │       ETAGE 2                    │   ETAGE 3     │
    │   ENTREE            │       DETENTION                  │   SORTIE      │
    │                     │                                  │               │
    │   Interimaire       │       ETT detient le             │   Transfert   │
    │   affecte X% de     │       cash CET                   │   CET → PERCOL│
    │   ses IFM/ICCP      │                                  │               │
    │   au CET            │       Sert rendement             │   OU          │
    │                     │       au salarie (2,9%)          │               │
    │   → Brut mensuel    │                                  │   Sortie cash │
    │     diminue         │       Investit a 3,2%            │   (48% cotis.)│
    │                     │                                  │               │
    │   → Gain RGDU       │       → Spread 0,3 pt           │   → Forfait   │
    │     potentiel       │                                  │     social    │
    │                     │                                  │     16-20%    │
    └─────────────────────┼──────────────────────────────────┼───────────────┘
                          │                                  │
                     GAIN MENSUEL                      GAIN ANNUEL
                     ~8 580 EUR/mois                   ~224 K EUR/an
                     (RGDU seul)                       (PERCOL seul)
```

### 2.2. Etage 1 — Entree en CET (effet mensuel)

**Mecanisme :** L'interimaire choisit d'affecter un pourcentage de ses Indemnites de Fin de Mission (IFM) et de ses Indemnites Compensatrices de Conges Payes (ICCP) a son Compte Epargne Temps.

**Effet sur le brut mensuel :**

```
Brut avec CET = Brut reel − (IFM × %CET_IFM) − (ICCP × %CET_ICCP)
```

**Hypothese critique (a valider — Q1) :** Le montant affecte au CET est exclu de l'assiette de la RGDU sur le bulletin du mois de versement. Si cette hypothese est confirmee, la reduction du brut entraine une augmentation du coefficient de reduction RGDU, donc un gain pour l'employeur.

**Gain estime :** ~8 580 EUR/mois (~103 K EUR/an) pour l'ensemble du portefeuille a 30%/30% CET sur IFM/ICCP.

### 2.3. Etage 2 — Detention et spread de tresorerie (12 mois)

**Mecanisme :** L'ETT conserve les sommes affectees au CET pendant 12 mois. Elle verse un rendement garanti au salarie et investit la tresorerie a un taux superieur.

| Parametre | Valeur |
|---|---|
| Rendement servi au salarie | 2,9% (interet simple annuel) |
| Rendement placement ETT | 3,2% (marche monetaire / CAT) |
| Spread net | 0,3 point |
| Encours CET moyen annuel | ~2 545 K EUR (212 K EUR/mois x 12) |
| Gain spread annuel | ~7 635 EUR |

**Note :** Ce gain est modeste mais constitue un revenu sans risque pour l'ETT.

### 2.4. Etage 3 — Sortie CET vers PERCOL (effet annuel, levier principal)

**Mecanisme :** Apres 12 mois, le salarie transfere le solde de son CET vers le PERCOL de l'entreprise. Ce transfert beneficie d'un forfait social reduit (16% ou 20%) au lieu des cotisations patronales classiques (~48%).

**Gain par point de cotisation :** Pour chaque euro transfere, l'economie est de 28 a 32 centimes (48% - 20% = 28 pts, ou 48% - 16% = 32 pts).

**Hypothese critique (a valider — Q2) :** Le plafond legal de 10 jours de repos transferables par an ne s'applique pas aux sommes monetaires (IFM, ICCP). Si ce plafond s'applique, le montant transferable serait considerablement reduit.

---

## 3. Formule RGDU 2026 detaillee

### 3.1. Rappel de la reforme 2026

La Loi de Financement de la Securite Sociale 2026 remplace l'ancienne formule lineaire de la reduction Fillon par une **formule non lineaire a puissance 1,75**. Cette reforme vise a supprimer la "trappe a bas salaires" tout en maintenant un allegement significatif pour les salaires proches du SMIC.

### 3.2. Formule complete

**Etape 1 — Base pure :**
```
Base = Brut reel − IFM reelles − ICCP reelles
```

**Etape 2 — Brut applique (sans CET) :**
```
Brut applique = Base × 1,21
```
Ou 1,21 = 1 + 10% (IFM standard) + 11% (ICCP standard = 10% IFM × 1,10 CP).

**Etape 3 — Brut avec CET :**
```
Brut CET = Brut reel − (IFM × %CET_IFM) − (ICCP × %CET_ICCP)
```

**Etape 4 — SMIC de reference :**
```
SMIC_ref = Heures payees × SMIC horaire
```

**Etape 5 — Ratio :**
```
Ratio = (3 × SMIC_ref) / Brut
```
- Si Ratio <= 1 : salaire au-dessus de 3 SMIC, coefficient C = 0
- Si Ratio > 1 : reduction applicable

**Etape 6 — Coefficient C :**
```
C = Tmin + T_delta × [1/2 × (Ratio − 1)]^1,75
C = min(C, Tmax)
```

**Etape 7 — Reduction et gain :**
```
Reduction = C × Brut
Gain = Reduction(avec CET) − Reduction(sans CET)
```

### 3.3. Parametres 2026

| Parametre | Valeur (FNAL 0,50%) | Valeur (FNAL 0,10%) |
|---|---|---|
| SMIC horaire | 12,02 EUR | 12,02 EUR |
| Seuil d'extinction | 3 × SMIC | 3 × SMIC |
| Tmin | 0,0200 (2,00%) | 0,0200 (2,00%) |
| Tmax | 0,4013 (40,13%) | 0,3973 (39,73%) |
| T_delta (= Tmax − Tmin) | 0,3813 (38,13%) | 0,3773 (37,73%) |
| Puissance | 1,75 | 1,75 |

**Origine de Tmax (0,4013) :** Somme des taux de cotisations patronales eligibles :

| Cotisation | Taux |
|---|---|
| Maladie | variable |
| Vieillesse plafonnee | variable |
| Vieillesse deplafonnee | variable |
| Allocations familiales | variable |
| FNAL (>= 50 salaries) | 0,50% |
| CSA (contribution solidarite autonomie) | variable |
| AGIRC-ARRCO | variable |
| Chomage | variable |
| AT/MP (plafonne) | variable |
| **Total** | **40,13%** |

### 3.4. Exemple chiffre — Matricule 3128

Donnees du bulletin mars 2026 :

| Donnee | Valeur |
|---|---|
| Heures payees | 7,08 h |
| Brut reel | 1 062,93 EUR |
| IFM reelles | 406,80 EUR |
| ICCP reelles | 447,48 EUR |
| Base pure | 1 062,93 − 406,80 − 447,48 = 208,65 EUR |

#### SANS CET (situation actuelle)

```
SMIC_ref    = 7,08 × 12,02                = 85,10 EUR
3 × SMIC    = 3 × 85,10                   = 255,30 EUR
Ratio       = 255,30 / 1 062,93           = 0,2402
```

Ratio < 1 : le brut depasse 3 SMIC equivalent --> **C = 0**, pas de reduction.

> **Note :** Ce matricule a tres peu d'heures (7,08h) mais un brut eleve du fait des IFM/ICCP. Le ratio est defavorable sans CET.

#### AVEC CET 30%/30%

```
CET IFM     = 406,80 × 30%                = 122,04 EUR
CET ICCP    = 447,48 × 30%                = 134,24 EUR
Brut CET    = 1 062,93 − 122,04 − 134,24  = 806,65 EUR
Ratio       = 255,30 / 806,65             = 0,3164
```

Ratio toujours < 1 --> **C = 0**, pas de reduction.

> Ce matricule ne genere pas de gain RGDU car le ratio IFM+ICCP/heures est tres eleve. Le gain RGDU se concentre sur les interimaires proches de 1-3 SMIC.

#### Exemple significatif — Matricule 2296

| Donnee | Valeur |
|---|---|
| Heures payees | 106,00 h |
| Brut reel | 3 297,17 EUR |
| IFM reelles | 343,20 EUR |
| ICCP reelles | 377,52 EUR |

**SANS CET :**

```
SMIC_ref    = 106 × 12,02                 = 1 274,12 EUR
3 × SMIC    = 3 × 1 274,12                = 3 822,36 EUR
Ratio       = 3 822,36 / 3 297,17         = 1,1593
inner       = 1/2 × (1,1593 − 1)          = 0,0797
inner^1,75  = 0,01196
C           = 0,02 + 0,3813 × 0,01196     = 0,02456
Reduction   = 0,02456 × 3 297,17          = 80,95 EUR
```

**AVEC CET 30%/30% :**

```
CET IFM     = 343,20 × 30%                = 102,96 EUR
CET ICCP    = 377,52 × 30%                = 113,26 EUR
Brut CET    = 3 297,17 − 102,96 − 113,26  = 3 080,95 EUR
Ratio       = 3 822,36 / 3 080,95         = 1,2407
inner       = 1/2 × (1,2407 − 1)          = 0,1203
inner^1,75  = 0,02457
C           = 0,02 + 0,3813 × 0,02457     = 0,02937
Reduction   = 0,02937 × 3 080,95          = 90,50 EUR
```

**Gain RGDU mensuel = 90,50 − 80,95 = 9,55 EUR** (soit 114,54 EUR/an pour ce seul interimaire).

### 3.5. Ecart constate avec les bulletins reels

Un ecart systematique d'un **facteur ~4,4** a ete constate entre la formule theorique et les montants figurant sur les bulletins de paie :

| Element | Formule theorique | Bulletin reel | Facteur |
|---|---|---|---|
| Matricule (206h, Brut 7 284,94 EUR) | 146 EUR | 33 EUR | x4,4 |

**Analyse :** Les montants absolus de RGDU calcules par la formule sont surevalues. Cependant, les **deltas** (gains entre scenario sans CET et avec CET) restent proportionnellement fiables car l'ecart est multiplicatif et s'applique aux deux scenarios.

**Action requise :** Cet ecart doit etre investigue avec l'expert (voir Question Q7). Hypotheses possibles : proratisation, plafonnement sectoriel, abattement specifique interimaire, ou parametres differents du FNAL.

---

## 4. Chiffrage sur donnees reelles

### 4.1. Perimetre des donnees

Les chiffres ci-dessous sont issus du fichier de marges de **mars 2026** (periode de paie 202603).

| Indicateur | Valeur |
|---|---|
| Nombre total de lignes | 656 |
| Lignes exploitables | 641 (apres nettoyage) |
| Lignes avec IFM/ICCP reelles | 371 |
| Lignes avec IFM/ICCP estimees | 270 |

**Methode d'estimation pour les 270 lignes sans IFM/ICCP :**

| Estimation | Formule |
|---|---|
| IFM estimees | Brut reel × 10% / 1,21 |
| ICCP estimees | Brut reel × 11% / 1,21 |
| Verification | Brut reel ≈ Base pure × 1,21 |

Cette estimation est validee sur les 367/371 lignes disposant de donnees reelles (ecart < 0,05 EUR).

### 4.2. Agregats mensuels (mars 2026)

| Indicateur | Montant mensuel |
|---|---|
| Total heures payees | 33 894 h |
| Brut reel total | 1 430 000 EUR |
| IFM totales | 236 000 EUR |
| ICCP totales | 253 000 EUR |
| Base pure totale (Brut − IFM − ICCP) | 941 000 EUR |
| Cotisations patronales totales | 687 000 EUR |
| Reduction generale totale (actuelle) | 134 000 EUR |

### 4.3. Hypotheses de chiffrage

| Parametre | Valeur retenue |
|---|---|
| % IFM affecte au CET | 30% |
| % ICCP affecte au CET | 30% |
| Taux d'adhesion au PERCOL | 30% |
| Forfait social | 16% |
| Cotisations patronales classiques | 48% |
| Rendement CET verse | 2,9% |
| Rendement placement ETT | 3,2% |

### 4.4. Resultats detailles

#### Etage 1 — Gain RGDU mensuel

| Element | Calcul | Montant |
|---|---|---|
| CET IFM mensuel (30%) | 236 000 × 30% | 70 800 EUR |
| CET ICCP mensuel (30%) | 253 000 × 30% | 75 900 EUR |
| **CET mensuel total** | | **~212 000 EUR** (arrondi : ~146 700 EUR de donnees reelles + ~65 300 EUR estimes) |
| Gain RGDU mensuel | Somme des deltas individuels | **~8 580 EUR/mois** |
| **Gain RGDU annuel** | 8 580 × 12 | **~102 960 EUR/an** |

> Le gain RGDU est calcule ligne par ligne (chaque interimaire a un ratio SMIC different). L'effet est concentre sur les interimaires dont le brut se situe entre 1 et 2,5 SMIC.

#### Etage 2 — Spread de tresorerie

| Element | Calcul | Montant |
|---|---|---|
| Encours CET moyen annuel | 212 000 × 12 mois | ~2 544 000 EUR |
| Rendement placement (3,2%) | 2 544 000 × 3,2% | 81 408 EUR |
| Rendement verse (2,9%) | 2 544 000 × 2,9% | 73 776 EUR |
| **Spread net annuel** | 0,3 pt × 2 544 000 | **~7 632 EUR/an** |

> Note : L'encours reel depend du rythme d'entrees/sorties. Le calcul suppose un flux constant.

#### Etage 3 — Economie PERCOL

| Element | Calcul | Montant |
|---|---|---|
| CET annuel transferable vers PERCOL | 212 000 × 12 | 2 544 000 EUR |
| Taux d'adhesion PERCOL | 30% | |
| Montant transfore en PERCOL | 2 544 000 × 30% | 763 200 EUR |
| Cotisations patronales evitees (48%) | 763 200 × 48% | 366 336 EUR |
| Forfait social paye (16%) | 763 200 × 16% | 122 112 EUR |
| Rendement CET verse (2,9%) | 763 200 × 2,9% | 22 133 EUR |
| **Economie nette PERCOL** | 366 336 − 122 112 − 22 133 | **~222 091 EUR/an** |

> Le rendement CET est un cout supplementaire pour l'ETT mais constitue l'incitation pour le salarie.

#### Synthese des 3 etages

| Etage | Gain annuel | % du total |
|---|---|---|
| Etage 1 — RGDU | 102 960 EUR | 31% |
| Etage 2 — Spread tresorerie | 7 632 EUR | 2% |
| Etage 3 — PERCOL | 222 091 EUR | 67% |
| **TOTAL** | **~332 683 EUR/an** | **100%** |

---

## 5. Tableau comparatif des 3 scenarios de sortie

### 5.1. Par interimaire (base : 500 EUR/mois en CET, 12 mois)

| Element | Scenario A : Cash direct | Scenario B : CET puis Cash | Scenario C : CET puis PERCOL |
|---|---|---|---|
| Principal annuel | 6 000 EUR | 6 000 EUR | 6 000 EUR |
| Rendement CET verse | — | 174 EUR (2,9%) | 174 EUR (2,9%) |
| **Brut soumis a cotisations** | **6 000 EUR** | **6 174 EUR** | **0 EUR** |
| Cotisations patronales (48%) | 2 880 EUR | 2 964 EUR | — |
| Forfait social (16%) | — | — | 988 EUR |
| **Cout total employeur** | **2 880 EUR** | **3 138 EUR** | **1 162 EUR** |
| **Economie vs Cash direct** | ref. | **−258 EUR** (plus cher) | **+1 718 EUR** |
| **Taux de charges effectif** | 48,0% | 50,8% | 19,4% |

### 5.2. Interpretation

- **Scenario A (Cash direct) :** Situation de reference. L'interimaire percoit ses IFM/ICCP normalement. Cotisations patronales a ~48%.

- **Scenario B (CET puis Cash) :** L'interimaire place en CET puis demande un deblocage en cash. L'ETT a paye un rendement en plus, et les cotisations patronales s'appliquent au principal + rendement. **Ce scenario est plus couteux que le cash direct.** Il ne presente un interet que pour le spread de tresorerie (modeste).

- **Scenario C (CET puis PERCOL) :** C'est le **levier principal**. Le transfert CET vers PERCOL substitue le forfait social (16-20%) aux cotisations patronales (~48%). L'economie est de **28 a 32 points** par euro transfere, soit ~1 718 EUR/an par interimaire adherent.

### 5.3. Point mort d'adhesion

| Cout fixe annuel estime (gestion PERCOL, communication, admin) | ~50 000 EUR |
|---|---|
| Economie par adherent | ~1 718 EUR/an |
| **Nombre minimum d'adherents pour rentabilite** | **~29 interimaires** |
| % du portefeuille (656) | **4,4%** |

---

## 6. Questions pour l'expert

### Q1. Le CET est-il exclu de l'assiette RGDU mensuelle ?

**Contexte :** L'Etage 1 du schema repose sur l'hypothese que le montant affecte au CET par le salarie (IFM, ICCP) est **exclu** de la base de calcul de la reduction generale des cotisations patronales (RGDU) sur le bulletin du mois de versement.

**Impact :** Si le CET reste dans l'assiette RGDU mensuelle, le gain Etage 1 (~103 K EUR/an) tombe a zero. Le gain Etage 3 (PERCOL) reste intact.

**Verification possible :** Comparer un bulletin avec affectation CET vs sans affectation CET et observer si le montant de reduction generale change.

**Textes concernes :** Art. L. 241-13 CSS, Circulaire DSS/5B/2009/32.

---

### Q2. Le plafond de 10 jours de repos transferables s'applique-t-il aux sommes monetaires ?

**Contexte :** L'article L. 3153-3 du Code du travail prevoit que le salarie peut transferer au maximum **10 jours de repos par an** de son CET vers un PERCOL. Ce plafond s'applique-t-il aux **sommes monetaires** (IFM, ICCP) ou uniquement aux jours de repos non pris ?

**Impact critique :** Si le plafond de 10 jours s'applique aux sommes monetaires, le montant transferable par interimaire serait plafonne a environ 10 × salaire journalier. Pour un interimaire au SMIC sur 7h/jour : 10 × 84,14 = **841 EUR/an** au lieu de 6 000 EUR. Le gain Etage 3 serait reduit d'environ **85%**.

**Hypothese de chiffrage alternative (si plafond 10 jours) :**

| Element | Sans plafond | Avec plafond 10 jours |
|---|---|---|
| Montant transferable/an/interimaire | ~6 000 EUR | ~841 EUR |
| Economie PERCOL annuelle (30% adhesion) | 222 K EUR | ~33 K EUR |
| Total general | 333 K EUR | ~143 K EUR |

---

### Q3. Forfait social : 16% ou 20% ? Conditions pour beneficier du 16% ?

**Contexte :** Le forfait social sur les transferts CET vers PERCOL est normalement de 20%. Il est reduit a 16% lorsque le PERCOL respecte deux conditions cumulatives :
1. **Gestion pilotee** par defaut (allocation d'actifs evoluant avec l'horizon de placement)
2. Investissement d'au moins **10% en titres eligibles au PEA-PME** (titres de PME/ETI)

**Question :** Notre PERCOL remplit-il ces conditions ? Si non, quel serait le cout de mise en conformite ?

**Impact :** 4 points de forfait social supplementaires = 763 200 × 4% = **30 528 EUR/an** de cout additionnel.

---

### Q4. Le rendement CET verse par l'ETT est-il soumis a cotisations ?

**Contexte :** L'ETT verse un rendement de 2,9% sur les sommes affectees au CET. Ce rendement est-il :
- Soumis a **cotisations sociales** (au moment du credit ou de la sortie) ?
- Soumis a **CSG/CRDS** ?
- Soumis a **impot sur le revenu** ?
- Deductible du resultat de l'ETT ?

**Impact sur le schema :**
- Si le rendement est soumis a cotisations patronales (~48%), le cout reel du rendement pour l'ETT est de 2,9% × 1,48 = 4,3%, ce qui erode le spread de tresorerie.
- Si le rendement est soumis a forfait social lors du transfert PERCOL, il est inclus dans les 16-20%.

**Sous-question :** Le rendement est-il inclus dans l'assiette du forfait social lors du transfert CET vers PERCOL ?

---

### Q5. Portabilite du CET si l'interimaire quitte avant 12 mois ?

**Contexte :** Le turnover des interimaires est structurellement eleve. Que se passe-t-il si un interimaire quitte (fin de mission, non-renouvellement) avant le terme de 12 mois ?

**Questions specifiques :**
- Le CET est-il deblocable immediatement en cash ? Si oui, cotisations patronales a 48% sur le solde ?
- Le transfert vers PERCOL est-il possible avant le terme de 12 mois ?
- Une clause de portabilite du CET vers un autre employeur est-elle necessaire ?
- Quel est le regime social et fiscal du deblocage anticipe ?

**Impact :** Si le deblocage anticipe entraine des cotisations a 48%, les departs precoces generent un surcout par rapport au cash direct (rendement verse sans economie PERCOL = Scenario B du tableau comparatif). Ce risque doit etre quantifie en fonction du taux de turnover.

---

### Q6. Risque URSSAF : le CET doit-il avoir une "finalite sociale legitime" ?

**Contexte :** L'URSSAF pourrait requalifier le schema si le CET est principalement utilise comme vehicule d'optimisation des charges patronales sans veritable finalite sociale (epargne temps, retraite).

**Questions specifiques :**
- L'URSSAF a-t-elle deja sanctionne des dispositifs CET/PERCOL utilises principalement a des fins d'optimisation ?
- Un rescrit URSSAF preventif est-il recommande ?
- La communication interne doit-elle insister sur l'avantage salarie (rendement, epargne retraite) plutot que sur l'economie de charges ?
- Le taux d'adhesion de 100% des interimaires serait-il un signal d'alerte ?

---

### Q7. Recalage de la formule RGDU — ecart x4,4 avec le bulletin reel

**Contexte :** Sur un bulletin reel de fevrier 2026 (206h, Brut 7 284,94 EUR), la formule theorique donne une reduction de 146 EUR alors que le bulletin affiche 33 EUR, soit un facteur d'ecart d'environ **4,4**.

**Hypotheses a investiguer :**
1. **Proratisation mensuelle** : la formule est-elle annualisee et les bulletins mensuels ne refletent qu'un douzieme ?
2. **Plafonnement sectoriel** : existe-t-il un plafond specifique au secteur interimaire ?
3. **Abattement specifique** : le brut abattu est-il different du brut reel dans le secteur interimaire ?
4. **Parametres FNAL** : l'entreprise est-elle au taux FNAL 0,10% (vs 0,50% retenu) ?
5. **Regularisation progressive** : le bulletin de fevrier integre-t-il une regularisation sur les mois precedents ?
6. **Exclusion de certaines heures** : les heures de delegation, formation, etc. sont-elles exclues ?

**Impact :** L'ecart n'invalide pas les deltas (gains relatifs entre scenarios), mais il empeche de communiquer des montants absolus fiables aux interimaires et a la direction. Le recalage est necessaire pour la credibilite du dispositif.

---

## 7. Analyse de sensibilite

### 7.1. Scenario de reference

| Parametre | Valeur |
|---|---|
| Forfait social | 16% |
| Plafond 10 jours | Non applicable aux sommes monetaires |
| CET exclu de l'assiette RGDU | Oui |
| Taux d'adhesion PERCOL | 30% |
| **Gain total annuel** | **~333 K EUR** |

### 7.2. Sensibilite au forfait social

| Forfait social | Gain PERCOL (Etage 3) | Gain total | Ecart vs ref. |
|---|---|---|---|
| **16%** (ref.) | 222 K EUR | 333 K EUR | — |
| **20%** | 192 K EUR | 302 K EUR | −31 K EUR |

### 7.3. Sensibilite au plafond 10 jours

| Hypothese | Gain PERCOL (Etage 3) | Gain total | Ecart vs ref. |
|---|---|---|---|
| **Pas de plafond** (ref.) | 222 K EUR | 333 K EUR | — |
| **Plafond 10 jours applicable** | ~33 K EUR | ~143 K EUR | −190 K EUR |

> Le plafond 10 jours est le facteur de sensibilite le plus important. S'il s'applique, l'economie est reduite de **57%**.

### 7.4. Sensibilite a l'exclusion RGDU

| Hypothese | Gain RGDU (Etage 1) | Gain total | Ecart vs ref. |
|---|---|---|---|
| **CET exclu de l'assiette RGDU** (ref.) | 103 K EUR | 333 K EUR | — |
| **CET inclus dans l'assiette RGDU** | 0 EUR | 230 K EUR | −103 K EUR |

### 7.5. Sensibilite au taux d'adhesion

| Taux d'adhesion | Nb interimaires | Gain PERCOL | Gain total (avec RGDU + spread) |
|---|---|---|---|
| 20% | 128 | 148 K EUR | 259 K EUR |
| **30%** (ref.) | 192 | 222 K EUR | 333 K EUR |
| 50% | 320 | 370 K EUR | 481 K EUR |
| 70% | 449 | 519 K EUR | 630 K EUR |

### 7.6. Matrice de scenarios extremes

| Scenario | Forfait | Plafond 10j | RGDU exclu | Adhesion | **Gain total** |
|---|---|---|---|---|---|
| **Optimiste** | 16% | Non | Oui | 50% | **481 K EUR** |
| **Reference** | 16% | Non | Oui | 30% | **333 K EUR** |
| **Prudent** | 20% | Non | Non | 20% | **156 K EUR** |
| **Pessimiste** | 20% | Oui | Non | 20% | **~28 K EUR** |

---

## 8. Avantages pour l'interimaire

L'adhesion des interimaires est critique pour le succes du dispositif. Voici les arguments en faveur du CET puis PERCOL :

### 8.1. Rendement garanti superieur au Livret A

| Placement | Rendement 2026 |
|---|---|
| Livret A | 2,4% (tendance baissiere) |
| **CET entreprise** | **2,9% garanti** |
| Fonds euros assurance-vie | 2,5% (moyenne) |

Le CET offre un rendement garanti, sans risque, superieur aux placements liquides accessibles aux particuliers.

### 8.2. Exoneration d'impot sur le revenu

Le transfert CET vers PERCOL est **exonere d'impot sur le revenu** (dans la limite des plafonds legaux). L'interimaire ne paie pas d'IR sur les sommes transférees, contrairement a un versement IFM/ICCP classique qui est imposable.

### 8.3. Rendement PERCOL supplementaire

Une fois dans le PERCOL, les sommes beneficient du rendement des fonds choisis (profil prudent a dynamique). Rendement moyen historique :

| Profil | Rendement annuel moyen |
|---|---|
| Prudent | 2-3% |
| Equilibre | 4-6% |
| Dynamique | 6-8% |

### 8.4. Conditions de deblocage anticipe du PERCOL

Le PERCOL est normalement bloque jusqu'a la retraite, mais de nombreux cas de deblocage anticipe existent :

1. Acquisition de la **residence principale**
2. **Surendettement** (procedure Commission de surendettement)
3. **Invalidite** du salarie, de son conjoint ou de ses enfants
4. **Deces** du conjoint ou du partenaire de PACS
5. **Expiration des droits a l'assurance chomage**
6. **Cessation d'activite non salariee** suite a liquidation judiciaire

### 8.5. Effort de tresorerie limite pour l'interimaire

A 30% d'affectation, l'interimaire ne renonce qu'a 30% de ses IFM et 30% de ses ICCP, soit environ 18% de son brut total. Les 82% restants sont verses normalement. L'effort est modulable et reversible.

---

## 9. Risques identifies

| N | Risque | Severite | Probabilite | Impact | Mitigation |
|---|---|---|---|---|---|
| R1 | **Plafond 10 jours applicable aux sommes monetaires** | CRITIQUE | Moyenne | Reduction de 57% du gain total | Consultation juridique prealable (Q2) |
| R2 | **CET non exclu de l'assiette RGDU** | ELEVE | Moyenne | Perte de 103 K EUR/an (Etage 1) | Verification sur bulletin reel (Q1) |
| R3 | **Requalification URSSAF** | ELEVE | Faible | Redressement + penalites | Rescrit preventif, documentation sociale |
| R4 | **Forfait social a 20% au lieu de 16%** | MODERE | Moyenne | Surcout de 31 K EUR/an | Mise en conformite du PERCOL (Q3) |
| R5 | **Taux d'adhesion < 20%** | MODERE | Moyenne | Gain PERCOL < 148 K EUR/an | Communication, rendement attractif |
| R6 | **Departs anticipes nombreux (CET → Cash)** | MODERE | Elevee | Scenario B (plus couteux que cash direct) | Clause de portabilite, delai minimal |
| R7 | **Rendement CET soumis a cotisations patronales** | MODERE | Moyenne | Erosion du spread de tresorerie | Verification juridique (Q4) |
| R8 | **Ecart formule RGDU non explique** | FAIBLE | Certaine | Defaut de credibilite | Recalage avec expert (Q7) |
| R9 | **Evolution legislative** | FAIBLE | Faible | Modification des parametres RGDU ou forfait social | Veille reglementaire |
| R10 | **Risque de taux** | FAIBLE | Faible | Spread tresorerie negatif si taux baissent | Placement a taux fixe (CAT) |

### Matrice de risques

```
                    PROBABILITE
                Faible    Moyenne    Elevee
            ┌──────────┬──────────┬──────────┐
  CRITIQUE  │          │    R1    │          │
            ├──────────┼──────────┼──────────┤
  ELEVE     │    R3    │    R2    │          │
  IMPACT    ├──────────┼──────────┼──────────┤
  MODERE    │          │  R4,R5,  │    R6    │
            │          │    R7    │          │
            ├──────────┼──────────┼──────────┤
  FAIBLE    │  R9,R10  │          │    R8    │
            └──────────┴──────────┴──────────┘
```

---

## 10. Annexes

### Annexe A — Simulateur interactif

Un simulateur web est disponible a l'adresse suivante :

**URL :** [https://bencode92.github.io/CET_OPTIM](https://bencode92.github.io/CET_OPTIM)

Ce simulateur permet de :
- Charger un fichier CSV de marges et simuler les 3 etages
- Ajuster les pourcentages CET IFM/ICCP
- Visualiser les gains RGDU par interimaire
- Comparer les scenarios de sortie (Cash / CET Cash / CET PERCOL)

### Annexe B — Format du fichier CSV d'entree

| Caracteristique | Valeur |
|---|---|
| Encodage | UTF-8 avec BOM |
| Separateur de champs | Point-virgule (`;`) |
| Separateur decimal | Virgule (`,`) |
| Fin de ligne | CR+LF (`\r\n`) |

**Colonnes :**

| Colonne | Description | Exemple |
|---|---|---|
| Dossier Tempo | Identifiant dossier | X |
| Mois de paie | Periode AAAAMM | 202603 |
| Code Commercial Contrat | Code agence | COUTURE |
| Commercial Contrat | Nom agence | COUTURE |
| Matricule du Salarie | Identifiant unique | 3128 |
| Nom du Salarie | Nom (anonymise dans les simulations) | — |
| Hrs Paye | Heures payees | 7,08 |
| Hrs Fact | Heures facturees | 7,08 |
| Brut reel | Brut total incluant IFM et ICCP | 1062,93 |
| IFM reelles | Indemnites de Fin de Mission | 406,80 |
| ICCP reelles | Indemnites Compensatrices de Conges Payes | 447,48 |
| CET | Montant CET (souvent vide) | — |
| Brut applique | = (Brut reel - IFM - ICCP) × 1,21 | 252,47 |
| Cot. Pat. Montant applique | Cotisations patronales | 121,87 |
| Reduction generale | Allegement RGDU actuel | 5,55 |
| Total Paye | Cout total employeur | 366,55 |
| Total Facture | Montant facture au client | 422,88 |
| Marge | Total Facture - Total Paye | 56,33 |
| Marge % | Marge / Total Facture | 0,1332 |

### Annexe C — Table des parametres RGDU 2026

| Parametre | Symbole | Valeur FNAL 0,50% | Valeur FNAL 0,10% |
|---|---|---|---|
| SMIC horaire | SMIC_h | 12,02 EUR | 12,02 EUR |
| Seuil d'extinction | S | 3 × SMIC | 3 × SMIC |
| Plancher reduction | Tmin | 0,0200 | 0,0200 |
| Plafond reduction | Tmax | 0,4013 | 0,3973 |
| Amplitude | T_delta | 0,3813 | 0,3773 |
| Exposant | p | 1,75 | 1,75 |

**Formule :**
```
C = Tmin + T_delta × [1/2 × (3 × SMIC_h × H / Brut − 1)]^p
C = min(C, Tmax)
Reduction = C × Brut
```

### Annexe D — Glossaire

| Terme | Definition |
|---|---|
| CET | Compte Epargne Temps — dispositif permettant au salarie d'accumuler des droits a conge remunere ou de beneficier d'une remuneration differee |
| PERCOL | Plan d'Epargne Retraite Collectif — dispositif d'epargne retraite d'entreprise |
| RGDU | Reduction Generale Degressive Unifiee — allegement de cotisations patronales (ex-reduction Fillon) |
| IFM | Indemnite de Fin de Mission — prime de precarite de 10% versee aux interimaires |
| ICCP | Indemnite Compensatrice de Conges Payes — indemnite de 10% calculee sur le brut + IFM |
| ETT | Entreprise de Travail Temporaire |
| Forfait social | Contribution patronale sur certains revenus exoneres de cotisations sociales |
| FNAL | Fonds National d'Aide au Logement |
| CSA | Contribution Solidarite Autonomie |
| URSSAF | Union de Recouvrement des cotisations de Securite Sociale et d'Allocations Familiales |

---

*Document genere le 2 avril 2026 — Version 1.0*  
*A soumettre pour validation avant toute mise en oeuvre operationnelle.*  
*Contact : Direction financiere ByCam/Cameleons*
