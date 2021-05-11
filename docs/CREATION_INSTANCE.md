## Guide de création d'une instance

### Créer un projet Firebase

1. Se rendre sur : https://console.firebase.google.com/ ;
1. Cliquer sur `Ajouter un projet` et lui donner un nom et un identifiant unique ;
1. Décocher la case `Activer Google Analytics pour ce projet` ;
1. Appuyer sur `Créer un projet`.

### Configuration du projet

:warning: Attention à bien faire cette étape avant d'envoyer des ressources sur firebase.

1. Dans la console du projet généré, se rendre dans `Paramètres du projet` > `Paramètres généraux` et modifier `Emplacement des ressources GCP par défaut` vers `europe-west3`. Il s'agit de l'emplacement des ressources du projet, c'est cette région qui est utilisé par les fonctions. Il est préférable de conserver un maximum les ressources dans la même région pour diminuer la latence.
1. Activer la facturation pour le nouveau projet (formule `Blaze` (facturation à l'utilisation)).
1. [Optionnel] Définir une alerte budgétaire pour éviter les dépassements non contrôlée
1. Dans la section Firestore, créer une base de données Firestore. Choisir le mode `production`. Les règles de sécurisation seront mises à jour lors du premier déploiement.
1. Dans l'onglet `Authentification`, ajouter `Google` comme fournisseur de connexion. Attention à bien saisir le nom public qui sera affiché dans la mire d'authentification Google visible aux utilisateurs.
1. Dans `Paramètres du projet` > `Paramètres généraux`, ajouter une application web. Lui donner un nom (par exemple `frontend`). Activer la case à cocher `Configurez Firebase Hosting pour cette application`. Quitter le menu une fois l'application créée.
1. Dans `Paramètres du projet` > `Cloud messaging` > `Certificats Web push`, cliquer sur `Generate key pair`. Conserver la clé générée pour la mise en place de la configuration. Cette clé sera la `vapidKey`.
1. Dans les paramètres du projet puis dans la section `Installation et configuration du SDK`, cocher la case `Configuration` et copier la configuration générée.

### Première version de l'application

Depuis le dossier local de l'application:

1. Installer si ce n'est déjà fait le CLI Firebase `npm install -g firebase-tools`
1. Si ce n'est pas déjà fait, se logger avec le CLI avec la commande `firebase login`
1. Ajouter le projet localement avec la commande `firebase use --add` puis choisir le nom du projet créé précédemment
1. Modifier le fichier `src/firebaseConfig.js` pour pointer vers la nouvelle configuration selon les bonnes variables d'environnement. Ajouter la clé `vapidKey` générée dans l'étape précédente.
1. Lancer un premier build de l'application en faisant attention aux variables d'environnement pour pointer vers la bonne config. Si besoin ajouter un script de build dans le package.json. `cross-env REACT_APP_DATABASE=MON_ENV react-scripts build`
1. Lancer le premier déploiement avec la commande `firebase deploy`. La plupart des APIs devraient être activées automatiquement.

Si le déploiement est complet, l'instance est correctement créée.

### Peuplement de la base de données

L'application a besoin d'un ensemble minimum de données pour fonctionner.

> > Documentation à compléter
