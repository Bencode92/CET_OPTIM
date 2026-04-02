# SPEC MISE À JOUR SIMULATEUR — Ce qu'on sait maintenant

**Priorité : HAUTE — À implémenter immédiatement dans `public/index.html`**
**Date : 2 avril 2026**
**Sources confirmées : Accord de branche 27/03/2000, Prism'emploi (06/2025), BOSS n°985, DSS (2012), Cass. 22/10/2020**

---

## RÉSUMÉ DES CHANGEMENTS

Le simulateur a été construit sur des hypothèses dont certaines sont maintenant CONFIRMÉES FAUSSES. Voici ce qui doit changer :

| Élément | Avant | Maintenant | Action |
|---|---|---|---|
| Étage 1 RGDU | Gain ~103 K€ | **0 €** | Désactiver ou marquer comme invalide |
| Cotisations | Supposées réduites le mois du CET | **Différées, pas réduites** | Changer le calcul PERCOL |
| Plafond ICCP entrée CET | Pas de limite | **10 jours-équivalent/an** | Ajouter ce plafond |
| Plafond IFM entrée CET | Pas de limite | **Confirmé : pas de limite** | OK |
| Plafond sortie PERCOL | Pas de plafond / 16% PASS | **10 jours-équivalent/an** | Ajouter ce plafond |
| Abondement/rendement | Coût = taux brut | **Abondement cotisé immédiatement** | Ajouter les charges sur l'abondement |
| Éligibilité | 100% des intérimaires | **910h d'ancienneté requises** | Ajouter un slider |

---

## 1. ÉTAGE 1 RGDU — DÉSACTIVER

### Ce qui est confirmé :
Le CET est dans l'assiette RGDU (service-public.fr + BOSS n°985). Le coefficient RGDU ne change pas quand un intérimaire met en CET. De plus, au déblocage, les montants CET sont réintégrés dans l'assiette RGDU de la dernière mission (Cass. 22/10/2020).

### Action dans le code :

**Onglet "Détail salariés" (ex-Simulation, tab 1) :**
- Garder le tableau et les calculs RGDU (c'est utile pour comprendre la formule)
- MAIS ajouter un bandeau d'avertissement en haut, en rouge/orange :

```
⚠ ATTENTION : Le CET est explicitement inclus dans l'assiette de la RGDU (BOSS n°985, Cass. 22/10/2020).
Les gains RGDU affichés ci-dessous sont THÉORIQUES et ne se matérialisent PAS en pratique.
Le CET ne modifie pas vos allègements de charges mensuels.
```

- Mettre les KPI de gain RGDU en grisé (opacity 0.4) avec un barré sur le montant
- Garder les chiffres visibles (pour comprendre pourquoi ça ne marche pas) mais clairement marqués comme invalides

**Onglet "Vue d'ensemble" (ex-Synthèse, tab 3) :**
- Dans le tableau récap 3 étages, afficher l'Étage 1 avec "0 €" et un badge "❌ Non applicable"
- Ne PAS inclure de gain RGDU dans le total

**Onglet "Détail expert" (ex-PERCOL, tab 4) :**
- Dans le récap 3 étages en haut, Étage 1 = 0 € avec explication courte

### Code JavaScript :
```javascript
// Dans le calcul percol, remplacer :
// const gainRGDU = tot.gain * pctAdhCET * 12;
// Par :
const gainRGDU = 0; // RGDU désactivé : CET dans l'assiette (BOSS n°985)
```

---

## 2. PLAFONDS À AJOUTER

### 2a. Plafond ICCP à l'entrée du CET = 10 jours-équivalent/an

Source : Accord de branche art. 6-3-1 : "l'ICCP dans la limite de l'équivalent de 10 jours par an"

**Nouveau paramètre :**
```javascript
// Taux horaire moyen pour la conversion jours/euros
const [tauxHoraireMoyen, setTauxHoraireMoyen] = useState(14); // €/h, slider 10-30
const valeurJour = tauxHoraireMoyen * 7; // 1 jour = 7h × taux horaire (accord art. 6-3-2)
```

**Calcul du CET ajusté par salarié :**
```javascript
// Pour chaque salarié :
// IFM : pas de plafond à l'entrée → CET_IFM = ifm * pctIfm (inchangé)
// ICCP : plafonné à 10 jours-équivalent/an à l'entrée
const plafondICCPEntree = 10 * valeurJour; // ex: 10 × 98 = 980 €/an
const iccpMensuel = iccp * pctIccp;
const iccpAnnuel = iccpMensuel * 12;
const iccpCETAnnuel = Math.min(iccpAnnuel, plafondICCPEntree);
const iccpCETMensuel = iccpCETAnnuel / 12; // répartir le plafond annuel sur 12 mois

// CET total par salarié/mois (ajusté)
const cetMensuel = (ifm * pctIfm) + iccpCETMensuel;
```

**Affichage :** Ajouter un indicateur quand le plafond ICCP est atteint (badge orange "ICCP plafonné" à côté du montant).

### 2b. Plafond sortie PERCOL = 10 jours-équivalent/an (tous types confondus)

Source : Art. L.242-4-3 CSS + Art. L.3334-8 C.trav

**Calcul :**
```javascript
// Par salarié, le montant exonéré au PERCOL est plafonné :
const plafondPERCOL = 10 * valeurJour; // ex: 10 × 98 = 980 €/an (si taux 14€/h)
                                        // ex: 10 × 175 = 1 750 €/an (si taux 25€/h)

// CET annuel par salarié (IFM illimitée + ICCP plafonnée)
const cetAnnuelParSalarie = cetMensuel * 12;

// Montant transférable en PERCOL avec exonération
const montantExonerePERCOL = Math.min(cetAnnuelParSalarie, plafondPERCOL);

// Le reste sort en cash (cotisations complètes)
const montantCashForce = cetAnnuelParSalarie - montantExonerePERCOL;
```

### 2c. Impact sur le calcul global PERCOL

```javascript
// Pool des adhérents PERCOL
const nbAdhCET = Math.round(nbEligibles * pctAdhCET);
const nbPercol = Math.round(nbAdhCET * pctChoixPERCOL);

// Montant total exonéré (plafonné par personne)
const poolExonere = nbPercol * montantExonerePERCOL;

// Économie : cotisations SS évitées sur la part exonérée
// Les cotisations SS (maladie, vieillesse, AF) représentent environ 25% du brut
// Le forfait social (16% ou 20%) peut ou non s'appliquer — en attente de confirmation
// Hypothèse prudente : forfait social s'applique
const tauxCotisSSEvitees = 0.25; // cotisations SS patronales + salariales exonérées
const economiePERCOL_sansFS = poolExonere * tauxCotisSSEvitees;
const economiePERCOL_avecFS = poolExonere * (tauxCotisSSEvitees - fSocial/100);

// Afficher les deux scénarios (avec et sans forfait social)
```

**IMPORTANT** : les cotisations qui RESTENT dues même sur les 10 jours exonérés :
- CSG/CRDS (9,7%)
- Retraite complémentaire AGIRC-ARRCO
- AT/MP
- Chômage + AGS
- FNAL
- CSA

Seules les cotisations SS (maladie, vieillesse, allocations familiales) sont exonérées.

---

## 3. ÉLIGIBILITÉ — SLIDER 910h

### Nouveau paramètre :
```javascript
const [pctEligible, setPctEligible] = useState(70); // % d'intérimaires ayant 910h d'ancienneté
const nbEligibles = Math.round(tot.n * pctEligible / 100);
```

**Slider :**
- Label : "% intérimaires éligibles (910h d'ancienneté)"
- Range : 20% à 100%
- Défaut : 70% (hypothèse : ~30% des intérimaires sont trop récents)

**Impact :** Ce slider réduit le pool de base avant les taux d'adhésion CET et choix PERCOL.

```
Pool effectif = nb salariés fichier × % éligibles × % adhésion CET × % choix PERCOL
Ex : 641 × 70% × 50% × 40% = 90 personnes au PERCOL (au lieu de 128 sans le filtre)
```

---

## 4. ABONDEMENT — COÛT RÉEL

### Ce qui est confirmé :
L'abondement employeur est un complément de rémunération soumis à cotisations sécu immédiatement (Prism'emploi page 6).

### Changement dans le calcul :
```javascript
// Le "rendement" qu'on modélise est en réalité un abondement
// Son coût réel pour l'ETT = taux × (1 + cotisations patronales sur l'abondement)
const tauxAbondement = txSalarie / 100; // ex: 0.05 (5%)
const coutAbondement = tauxAbondement * 1.48; // 5% × 1,48 = 7,4% du pool CET

// Le spread de trésorerie doit déduire ce surcoût
// Avant : spread = (txETT - txSalarie) × pool
// Maintenant : spread = txETT × pool - txSalarie × 1.48 × pool
//            = pool × (txETT - txSalarie × 1.48)
const spreadReel = cetAnnuelAjuste * (txEtt/100 - (txSalarie/100) * 1.48);
// Ex: pool × (3.2% - 5% × 1.48) = pool × (3.2% - 7.4%) = NÉGATIF !
// Ça veut dire qu'avec un abondement de 5%, le spread est négatif.
// Il faut que txEtt > txSalarie × 1.48 pour que le spread soit positif.
// Avec txEtt = 3.2% : txSalarie max = 3.2 / 1.48 = 2.16%
```

**⚠ C'EST UN CHANGEMENT MAJEUR** : si l'abondement est cotisé immédiatement, alors :
- Avec 5% d'abondement et 3,2% de placement → spread = **NÉGATIF** (-4,2% × pool)
- Avec 2% d'abondement et 3,2% de placement → spread = **POSITIF** (+0,24% × pool)
- Le rendement élevé (5-8% type Randstad) n'est PAS financé par le spread — c'est un coût RH pur

**Affichage :** Ajouter un KPI "Coût réel de l'abondement" qui montre le taux × 1,48 et le comparer au taux de placement. Si le spread est négatif, l'afficher en rouge.

### ALTERNATIVE — En attente de la réponse Prism'emploi (Question 4) :
Si le "rendement" (intérêts sur le solde CET) est juridiquement différent de l'"abondement" (complément versé par l'employeur), et que le rendement n'est cotisé qu'au déblocage, alors le calcul change :
- Rendement cotisé au déblocage → spread = (txETT - txSalarie) × pool (comme avant)
- Abondement cotisé immédiatement → coût = taux × 1.48

En attendant la réponse, **implémenter les deux scénarios** avec un toggle :
- "Abondement (cotisé immédiatement)" → spread = pool × (txETT - txSalarie × 1.48)
- "Rendement (cotisé au déblocage)" → spread = pool × (txETT - txSalarie)

---

## 5. RÉCAP DES 3 ÉTAGES — NOUVEAU CALCUL

```javascript
// Étage 1 : RGDU
const gainEtage1 = 0; // Confirmé mort

// Étage 2 : Spread trésorerie
// Dépend du toggle abondement/rendement (voir section 4)
const gainEtage2 = spreadReel; // peut être négatif !

// Étage 3 : PERCOL
// Scénario A : sans forfait social sur les 10 jours exonérés
const gainEtage3_sansFS = nbPercol * montantExonerePERCOL * tauxCotisSSEvitees;
// Scénario B : avec forfait social 16%
const gainEtage3_avecFS = nbPercol * montantExonerePERCOL * (tauxCotisSSEvitees - fSocial/100);

// TOTAL
const gainTotal_sansFS = gainEtage1 + gainEtage2 + gainEtage3_sansFS;
const gainTotal_avecFS = gainEtage1 + gainEtage2 + gainEtage3_avecFS;
```

### Valeurs de vérification (paramètres par défaut) :

Avec : 641 salariés, 70% éligibles (449), 50% adhésion CET (224), 40% choix PERCOL (90),
taux horaire 25 €/h, valeur jour 175 €, plafond PERCOL 1 750 €, 30% CET IFM/ICCP,
abondement 2.9%, placement 3.2%, forfait social 16%

```
Étage 1 : 0 €
Étage 2 (si rendement) : ~3 K€
Étage 2 (si abondement) : ~-6 K€ (négatif !)
Étage 3 (sans FS) : 90 × 1 750 × 25% = ~39 K€
Étage 3 (avec FS 16%) : 90 × 1 750 × 9% = ~14 K€
Total optimiste : ~42 K€
Total prudent : ~14 K€
```

---

## 6. CE QU'IL NE FAUT PAS CHANGER

- Le parsing CSV (parseCSVFrench, estimation IFM/ICCP pour lignes vides)
- La formule RGDU (correcte, juste non applicable au CET)
- L'auto-chargement GitHub
- Les graphiques de distribution par salarié
- La structure des onglets (Upload, Détail salariés, Graphiques, Vue d'ensemble, Détail expert)

---

## 7. NOUVEAUX SLIDERS (résumé)

| Slider | Onglet | Label | Min | Max | Défaut | Unité |
|---|---|---|---|---|---|---|
| pctEligible | Vue d'ensemble + Expert | "% éligibles (910h)" | 20 | 100 | 70 | % |
| tauxHoraireMoyen | Expert | "Taux horaire moyen" | 10 | 35 | 14 | €/h |
| typeRendement | Expert | Toggle "Abondement / Rendement" | — | — | Rendement | — |

Les sliders existants (pctIfm, pctIccp, txAdhCET, txChoixPERCOL, txSalarie, txEtt, fSocial) restent inchangés.
