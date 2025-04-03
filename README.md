# Projet sniveau-tpcomplementweb

## Description
Ce projet est une application web permettant la gestion et l'affichage de cartes et d'équipes, avec la possibilité de sauvegarder des favoris. Il repose sur un serveur JSON ainsi qu'une architecture modulaire en JavaScript et Python.

## Structure du projet

### **Fichiers principaux**
- **cards.json** : Contient les données des cartes utilisées dans l'application.
- **fix_int.js** : Script pour corriger certaines incohérences de données ou effectuer des modifications spécifiques.
- **lauch_jsonserveur.sh** : Script shell pour démarrer le serveur JSON utilisé pour la gestion des données.
- **lauch_serveur_web.sh** : Script shell pour lancer le serveur web.
- **main.py** : Script Python permettant la manipulation de données ou la gestion de fonctionnalités backend spécifiques.
- **output.json** : Fichier JSON généré après certaines opérations sur les données.
- **package.json** : Fichier de gestion des dépendances du projet (Node.js).
- **routes.json** : Définit les routes utilisées par le serveur JSON pour l’API.

### **Dossiers**


##### **models/**
Contient les modèles de données utilisés dans l’application :
- **Equipe.js** : Modèle représentant une équipe.
- **Personnage.js** : Modèle représentant un personnage.

##### **services/**
Contient les services utilisés pour interagir avec les données :
- **AddFavoris.js** : Gère l'ajout et la suppression de cartes dans les favoris.
- **CardsProvider.js** : Service permettant de récupérer les cartes depuis l'API.
- **EquipeProvider.js** : Service pour la gestion des équipes et leur récupération.
- **utils.js** : Contient des fonctions utilitaires utilisées à divers endroits de l'application.

##### **views/pages/**
Composants représentant les différentes pages de l'application :
- **About.js** : Page "À propos", décrivant le projet.
- **CardsAll.js** : Affiche toutes les cartes disponibles.
- **CardsDetail.js** : Affiche le détail d’une carte spécifique.
- **Equipe.js** : Page dédiée à la gestion d’une équipe.
- **FavoriCardAll.js** : Affiche toutes les cartes ajoutées en favoris.
- **Jouer.js** : Page permettant d’interagir avec les cartes pour jouer.
- **MesEquipe.js** : Affiche les équipes enregistrées par l’utilisateur.

## Installation et exécution

### **Prérequis**
- Node.js installé
- Python installé

### **Installation**
1. Cloner le dépôt :
   ```sh
   git clone <URL_DU_REPO>
   cd sniveau-tpcomplementweb
   ```
2. Installer les dépendances Node.js :
   ```sh
   npm install
   ```

### **Lancement du projet**
1. Démarrer le serveur JSON :
   ```sh
   ./lauch_jsonserveur.sh
   ```
2. Démarrer le serveur web :
   ```sh
   ./lauch_serveur_web.sh
   ```
3. Ouvrir le projet dans un navigateur à l’adresse indiquée.

