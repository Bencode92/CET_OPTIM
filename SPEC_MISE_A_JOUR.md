# SPEC MISE À JOUR SIMULATEUR v2 — Corrigée

**Priorité : HAUTE — À implémenter dans `public/index.html`**
**Date : 2 avril 2026**
**CORRECTION : L'Étage 1 RGDU n'est PAS zéro. Il est un effet de timing.**

---

## CORRECTION CRITIQUE — Étage 1 RGDU

### Ce qu'on avait dit à tort : "RGDU = 0 €"
### Ce qui est vrai : "RGDU = effet de timing, gain net à calculer"

**Le mécanisme réel (confirmé par Prism'emploi + BOSS n°985 + Cass. 22/10/2020) :**

**Mois N (entrée CET) :**
- L'intérimaire met IFM/ICCP en CET
- Les cotisations sont DIFFÉRÉES (pas payées ce mois)
- Le brut servant au calcul RGDU ce mois est PLUS BAS
- Le coefficient RGDU est PLUS ÉLEVÉ
- → GAIN RGDU ce mois

**Mois N+12 (sortie CET — cash ou PERCOL) :**
- Les montants CET sont monétisés/transférés
- BOSS n°985 : "doivent être intégrés à la rémunération prise en compte pour le calcul de la réduction de la dernière mission"
- Le brut de la dernière mission GONFLE
- Le coefficient RGDU BAISSE (voire tombe à 0 si brut > 3 SMIC)
- → PERTE RGDU sur cette mission

**Le gain NET dépend de la non-linéarité :**
La formule RGDU est en puissance 1,75 (convexe). Étaler les revenus sur plusieurs mois au lieu de concentrer sur un seul mois peut créer un gain net grâce à l'effet de convexité (inégalité de Jensen).

### Ce que le simulateur doit faire :

**GARDER le calcul RGDU actuel** (gain mensuel quand le brut est réduit par le CET) — c'est le GAIN côté entrée.

**AJOUTER un calcul de PERTE côté sortie** : quand le CET est monétisé, les montants sont rattachés à la dernière mission. Simuler l'impact RGDU de ce brut gonflé.

**AFFICHER les deux :**
- Gain RGDU mensuel (entrées CET) = ce qu'on calcule déjà
- Perte RGDU annuelle (sorties CET) = à calculer
- **Gain RGDU net = Gain - Perte**

### Calcul de la perte RGDU à la sortie :

```javascript
// Pour chaque salarié qui sort du CET (cash ou PERCOL) :
// Son CET annuel est rattaché à sa dernière mission
// La dernière mission a un brut = brutDerniereMission
// Le brut gonflé = brutDerniereMission + cetAnnuel
// La perte RGDU = calcRgdu(hrs, brutDerniereMission) - calcRgdu(hrs, brutDerniereMission + cetAnnuel)

// Approximation : on suppose que la dernière mission a le même profil que la mission moyenne
// Donc pour chaque salarié :
function calcPerteRGDU(hrs, brutBase, cetAnnuel) {
  const rgduAvant = calcRgdu(hrs, brutBase);
  const rgduApres = calcRgdu(hrs, brutBase + cetAnnuel);
  return rgduAvant - rgduApres; // positif = perte de réduction
}

// Perte totale = somme des pertes par salarié adhérent CET
// Note : seuls les adhérents CET génèrent cette perte (ceux qui sortent du CET)
```

### Bandeau dans l'onglet Simulation :

Ne PAS mettre "RGDU = 0". À la place :

```
ℹ Note : Le gain RGDU affiché ci-dessous est le gain MENSUEL à l'entrée en CET.
À la sortie du CET (12 mois plus tard), les montants sont réintégrés dans l'assiette RGDU
de la dernière mission (BOSS n°985, Cass. 22/10/2020), ce qui réduit partiellement ce gain.
Le gain NET est affiché dans l'onglet Vue d'ensemble.
```

---

## RESTE DES CHANGEMENTS (inchangés par rapport à la spec v1)

### 2. Plafonds à ajouter

**2a. Plafond ICCP entrée CET = 10 jours-équivalent/an**
Source : Accord de branche art. 6-3-1
- IFM : PAS DE LIMITE
- ICCP : plafonné à 10 jours-équivalent/an

**2b. Plafond sortie PERCOL = 10 jours-équivalent/an pour l'exonération**
Source : Art. L.242-4-3 CSS + Art. L.3334-8 C.trav
- S'applique à TOUT le CET (IFM + ICCP) pas seulement l'ICCP

**Nouveau paramètre :**
```javascript
const [tauxHoraireMoyen, setTauxHoraireMoyen] = useState(14); // €/h
const valeurJour = tauxHoraireMoyen * 7; // accord art. 6-3-2
const plafondICCPEntree = 10 * valeurJour; // plafond ICCP à l'entrée du CET
const plafondPERCOLSortie = 10 * valeurJour; // plafond exonération à la sortie PERCOL
```

### 3. Éligibilité 910h

```javascript
const [pctEligible, setPctEligible] = useState(70);
const nbEligibles = Math.round(tot.n * pctEligible / 100);
```

Slider : "% éligibles (910h d'ancienneté)", range 20-100%, défaut 70%.

### 4. Abondement vs rendement

L'abondement (complément employeur) est cotisé immédiatement (Prism'emploi p.6).
Le rendement (intérêts sur le solde) pourrait être cotisé au déblocage seulement — à confirmer.

Ajouter un toggle "Abondement (cotisé immédiatement) / Rendement (cotisé au déblocage)" :
- Si abondement : coût réel = taux × 1.48, spread = pool × (txETT - txSalarie × 1.48)
- Si rendement : spread = pool × (txETT - txSalarie) comme avant

### 5. Récap 3 étages — nouveau calcul

```javascript
// Étage 1 : RGDU (timing effect)
const gainRGDU_entrees = tot.gain * pctAdhCET * 12; // gain côté entrée (existant)
// Perte côté sortie : à calculer avec la formule ci-dessus
// gainRGDU_net = gainRGDU_entrees - perteRGDU_sorties

// Étage 2 : Spread trésorerie
// Dépend du toggle abondement/rendement

// Étage 3 : PERCOL (plafonné à 10 jours par personne)
const montantExonere = Math.min(cetAnnuelParSalarie, plafondPERCOLSortie);
const tauxCotisSSEvitees = 0.25; // cotis SS exonérées sur la part transférée
// Deux scénarios : avec et sans forfait social
```

### 6. Nouveaux sliders (résumé)

| Slider | Label | Min | Max | Défaut | Unité |
|---|---|---|---|---|---|
| pctEligible | "% éligibles (910h)" | 20 | 100 | 70 | % |
| tauxHoraireMoyen | "Taux horaire moyen" | 10 | 35 | 14 | €/h |
| typeRendement | Toggle "Abondement / Rendement" | — | — | Rendement | — |

---

## CE QU'IL NE FAUT PAS CHANGER

- Le calcul RGDU existant (il est correct pour le gain côté entrée)
- Le parsing CSV
- L'auto-chargement GitHub
- La structure des onglets
