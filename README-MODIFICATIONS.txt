5S CONSTRUCTION — VERSION REDESIGNÉE

MODIFICATIONS INTÉGRÉES
- Navigation textuelle retirée sur toutes les pages : seul le logo reste dans l’en-tête, centré horizontalement.
- Accueil entièrement restructuré : présentation éditoriale en deux colonnes, photo de résidence dans un cadre vertical dédié, boutons repositionnés et sections de présentation, services et contact.
- Nouveau thème sombre : graphite, surfaces profondes, texte clair et accent vert assorti au logo (avec le rouge conservé dans l’identité visuelle).
- Pages « Nos biens », « Nos services » et « Contact » harmonisées avec le même univers visuel.
- Image d’accueil recadrée dans un cadre adapté à son format portrait, au lieu d’être étirée en arrière-plan sur toute la page.
- Animations d’entrée, apparition des sections au défilement, effets de survol sur les cartes et boutons et défilement fluide.
- Mise en page responsive pour ordinateur, tablette et mobile.
- Le formulaire de contact, sa fenêtre modale, ses champs, son envoi AJAX et ses validations sont conservés. La fenêtre « Nous peaufinons chaque détail » n’a pas été ajoutée.

FICHIERS MODIFIÉS / AJOUTÉS
- index.html : nouveau contenu et nouvelle disposition de l’accueil.
- biens.html : en-tête centré et présentation modernisée des rubriques de biens.
- services.html : en-tête centré et cartes de services actualisées.
- contact.html : en-tête centré et page de contact modernisée.
- css/modern.css : nouvelle feuille de style de la refonte, chargée après css/style.css.
- js/script.js : ajout de l’observation des sections pour les animations au défilement ; la logique du formulaire est conservée.
- images/photo1.jpg et images/logo-crop.png : assets existants réutilisés, sans remplacement.

POUR TESTER
1. Décompresser l’archive.
2. Ouvrir le dossier « site-2-main » dans VS Code.
3. Lancer index.html avec Live Server.
4. Tester les liens « Découvrir nos biens », « Nos services » et les boutons qui ouvrent le formulaire.
5. Faire un envoi de test du formulaire et vérifier que le service FormSubmit est bien activé.
6. Remplacer les liens sociaux href="#" par les URL réelles de l’entreprise avant publication.

À NOTER
- Les cartes de la page « Nos biens » sont encore des emplacements de contenu : il faudra y mettre les photos, noms, prix et descriptions réels des biens lorsqu’ils seront disponibles.
- La police DM Sans / Playfair Display est chargée depuis Google Fonts ; des polices de secours sont prévues si le service externe n’est pas accessible.
