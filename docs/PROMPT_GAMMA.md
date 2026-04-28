# Prompts Gamma — Mode d'emploi

Trois documents disponibles, à générer chacun dans Gamma.app via le mode **« Generate / Import »**.

## 🎨 Recommandations de thème Gamma

| Document | Thème suggéré | Tonalité visuelle |
|---|---|---|
| **Brochure intérimaires** | *Modern Light* ou *Editorial* | Marketing, attractif, coloré |
| **Note d'information** | *Corporate Blue* ou *Professional* | Sobre, institutionnel, sérieux |
| **Dossier expert** | *Default* ou *Minimal* | Technique, dense, neutre |

---

## 1️⃣ Brochure intérimaires (marketing)

### Mode 1 — Import markdown direct (recommandé)

1. Ouvrir Gamma → **Create new** → **Import** → **Text/Markdown**
2. Copier le contenu de `docs/BROCHURE_GAMMA.md`
3. Coller dans Gamma
4. Choisir thème **Modern Light** ou **Editorial**
5. Cliquer **Generate** → ~25 slides générées

### Mode 2 — Generate from prompt (alternative)

À coller dans la zone de prompt Gamma :

```
Créer une brochure marketing destinée aux salariés intérimaires de CAMÉLÉONS RH (entreprise de travail temporaire) pour leur présenter le nouveau dispositif Compte Épargne Temps (CET) et son extension vers un Plan d'Épargne Retraite (PERCOL).

Tonalité : moderne, accessible, chaleureuse mais professionnelle. Pas de jargon. Vocabulaire simple.

Cible : population mixte intérim (jeunes 25-35 ans, milieu de carrière 40-50 ans, seniors 55-62 ans). La brochure doit donner envie d'adhérer sans en cacher les contraintes.

Couleurs dominantes : vert (épargne, croissance) + bleu marine (sérieux, confiance).

Structure en 25 slides :
1. Hero : « Votre épargne salariale chez CAMÉLÉONS RH »
2. Pitch en 30 secondes
3. Pourquoi nous le mettons en place (3 raisons)
4. Éligibilité 910 heures sur 12 mois (article 6-3-1)
5. Mécanique en 3 étapes (épargner → fructifier → choisir)
6. Exemple Marie 200€/mois → 4 944€ fin d'année
7. Le PERCOL = la suite logique du CET
8. 3 grands avantages PERCOL (pas d'IR + pas de cotisations sous plafond + capital retraite sans cotisations)
9. Tableau plafond exonération par taux horaire (14€ → 50€)
10. Au-delà du plafond, ce qui se passe
11. Choix sur le rendement capitalisé (cash ou transfert)
12. Cas n°1 — Lucas 28 ans BTP (livret rémunéré)
13. Cas n°2 — Sandrine 45 ans logistique (épargne longue)
14. Cas n°3 — Patricia 58 ans senior (~6000€ d'économie IR)
15. Trois modes de sortie retraite (capital / rente / panaché)
16. Six cas de déblocage anticipé PERCOL
17. ⚠ Avertissement allocation chômage post-1er avril 2025 (très important)
18. Délai 5 ans pour utiliser le CET
19. Vos droits et garanties
20. Révision possible du taux 3%
21. FAQ 12 questions
22. Mode d'emploi 4 étapes (formulaire + ID + justificatif domicile)
23. Pour aller plus loin
24. Mot de la fin
25. Disclaimer non contractuel

Chaque slide doit avoir un titre court et 3-5 points clés visuels. Les exemples chiffrés en tableaux. Les citations de l'avocat (28 avril 2026) en blockquote distincts.
```

---

## 2️⃣ Note d'information officielle (institutionnelle)

### Mode 1 — Import markdown direct (recommandé)

1. Ouvrir Gamma → **Create new** → **Import** → **Text/Markdown**
2. Copier le contenu de `docs/NOTE_INFORMATION_GAMMA.md`
3. Coller dans Gamma
4. Choisir thème **Corporate Blue** ou **Professional**
5. Cliquer **Generate** → ~12-15 slides générées
6. **Important** : exporter en PDF pour distribution officielle

### Mode 2 — Generate from prompt (alternative)

À coller dans la zone de prompt Gamma :

```
Créer une note d'information officielle de l'entreprise CAMÉLÉONS RH (entreprise de travail temporaire) destinée à ses salariés intérimaires, pour formaliser la mise en place d'un Compte Épargne Temps (CET).

Tonalité : institutionnelle, sobre, juridique, formelle. C'est un document quasi-contractuel qui sera remis aux salariés au moment de l'adhésion. Pas d'effets visuels excessifs. Pas d'émojis. Style notarial proche.

Couleurs dominantes : bleu marine + gris clair + accents subtils. Aspect typographique « rapport d'entreprise ».

Structure en 12-15 sections (1 section ≈ 1 slide ou 1 page selon export) :

1. Page de garde : « Note d'information — Mise en place d'un Compte Épargne Temps (CET) — CAMÉLÉONS RH »
2. Mot de la direction (Madame, Monsieur)
3. Section 1 — Cadre juridique (accord branche 27/03/2000, articles L.3151-1 à L.3153-2 Code du travail)
4. Section 2 — Qui peut ouvrir un CET (910 heures sur 12 mois, facultatif)
5. Section 3 — Comment fonctionne le CET (5 modalités, format tableau)
6. Section 4 — Éléments affectables (tableau IFM/ICCP/RTT/etc. avec limites)
7. Section 5 — Rémunération 3 % par an (modalités calcul + régime social)
8. Section 6 — Comment utiliser le CET (déblocage cash + congés financés)
9. Section 7 — Cas de déblocage (7 cas listés)
10. Section 8 — Délai d'utilisation 5 ans
11. Section 9 — ⚠ Points d'attention importants (cotisations + chômage 2025 + transfert)
12. Section 10 — Comment ouvrir le CET (formulaire + pièce ID + justificatif)
13. Page de signatures (date, signataire CAMÉLÉONS RH)
14. Disclaimer non contractuel

Format : tableaux propres, citations de textes légaux en blockquote, pas de personas/cas concrets (réservés à la brochure marketing). Numérotation hiérarchique (1, 1.1, 1.2). Tons professionnels, peu de couleurs vives.
```

---

## 3️⃣ Dossier expert (technique)

### Mode 1 — Import markdown direct (recommandé)

1. Ouvrir Gamma → **Create new** → **Import** → **Text/Markdown**
2. Copier le contenu de `docs/DOSSIER_EXPERT_COMPLET.md`
3. Coller dans Gamma
4. Choisir thème **Default** ou **Minimal**
5. Cliquer **Generate** → ~30 slides générées

### Mode 2 — Generate from prompt (alternative)

À coller dans la zone de prompt Gamma :

```
Créer un dossier de revue technique destiné à un expert en paie / fiscalité / droit social, pour validation d'un simulateur d'optimisation des charges patronales en intérim via le dispositif CET → PERCOL.

Tonalité : technique, dense, factuelle, sans fioritures. Le lecteur est un professionnel sénior qui veut auditer un projet, pas être convaincu.

Couleurs : monochromatique gris/blanc avec accents bleu et vert pour les éléments importants. Aspect rapport de cabinet de conseil.

Structure en 13 sections / 30 slides :
1. Page de garde + objet de la revue
2. Contexte et objectifs (volumétrie 656 lignes / 660 salariés)
3. Cadre juridique (accord branche 27/03/2000, note avocat 28/04/2026, sources réglementaires)
4. Architecture en 3 étages (RGDU + Spread + PERCOL) avec flow diagrams
5. Formules détaillées (RGDU 2026, plafond par salarié, agrégation pool)
6. Tableau 16 paramètres (valeur / source / ajustable / à valider)
7. Calibration empirique sur 458 bulletins (méthode k_i = redAct/formulaBase)
8. Spécificités intérim (910h, IFM/ICCP, taux horaire, DFS mission)
9. Données source CSV (structure colonnes, qualité)
10. Référencement code source (fichiers + lignes)
11. Résultats actuels (~80-90 K€/an post-corrections)
12. Limites et incertitudes (RGDU plancher, calibration, PERCOL, rendement)
13. 16 questions ouvertes pour l'expert (par thématique)
14. Annexes : exemples de calcul détaillés (matricule 2296 et Mourice Laure)

Format : beaucoup de tableaux, formules en bloc code, citations légales en blockquote. Hiérarchie claire (1, 1.1, 1.1.1). Slides denses mais lisibles.
```

---

## 💡 Astuces Gamma

### Pour avoir un beau rendu
- Utiliser le **theme picker** de Gamma pour tester 2-3 thèmes avant de choisir
- Générer avec **« More detailed »** activé pour avoir plus de contenu visuel (icônes, illustrations)
- Pour les notes officielles, désactiver **« Auto images »** (pas d'illustrations marketing dans une note légale)

### Export
- **Brochure** : exporter en PDF + en PowerPoint si besoin de modifs ultérieures
- **Note d'information** : exporter en **PDF haute qualité** pour distribution officielle, et en **DOCX** pour signature
- **Dossier expert** : PDF + lien partageable à l'expert pour commentaires en ligne

### Personnalisation après génération
- Ajouter le **logo CAMÉLÉONS RH** dans le master slide
- Vérifier que les **citations légales** sont bien préservées en blockquote (Gamma peut parfois les casser)
- Pour la note d'information, **passer en relecture juridique** avant signature

---

## Workflow complet recommandé

1. **Import dans Gamma** des 3 documents (brochure + note d'info + dossier expert)
2. **Personnalisation** logo, couleurs corporate
3. **Brochure** → diffusion intérimaires (papier + digital)
4. **Note d'information** → archivée, distribuée à l'adhésion contre signature
5. **Dossier expert** → envoyé à l'expert paie / cabinet juridique pour validation
6. **Cycle de retours** → amender les markdowns dans le repo, regénérer dans Gamma

→ Les documents source restent en markdown dans `docs/` pour traçabilité git.
