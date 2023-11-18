# The Game of Life

Ce projet a été réalisé en réponse au défi lancé par le Master Elias Ba sur X/Twitter à la communauté Galsen Dev. Le but du défi était de créer une implémentation du "Jeu de la Vie" (Game of Life) en utilisant HTML, CSS et JavaScript. Ce document fournit une documentation complète sur le projet.

## Challenge

Le défi consistait à créer une version du "Jeu de la Vie" en utilisant les technologies web classiques, à savoir HTML pour la structure, CSS pour la présentation et JavaScript pour la logique du jeu.

## Le Jeu de la Vie

Le "Jeu de la Vie" est un automate cellulaire imaginé par le mathématicien John Conway en 1970. Il s'agit d'un jeu à zéro joueur, ce qui signifie que son évolution est déterminée par son état initial, sans aucune interaction ultérieure. Le jeu se déroule sur une grille bidimensionnelle infinie, mais dans cette implémentation, une grille finie est utilisée.

## Règles du Jeu de la Vie

- Survie: Une cellule vivante avec deux ou trois voisins vivants survit.
- Mort par isolement: Une cellule vivante avec moins de deux voisins vivants meurt.
- Mort par surpopulation: Une cellule vivante avec plus de trois voisins vivants meurt.
- Naissance: Une cellule morte avec exactement trois voisins vivants devient une cellule vivante.
- Structure du Code


## Structure du Code

### HTML (index.html)

Le fichier HTML définit la structure de la page web. Il comprend des balises select pour choisir le nombre de lignes et de colonnes, un conteneur pour la grille du jeu, et des boutons de contrôle pour démarrer, effacer et générer une configuration aléatoire.

### CSS (style.css)

Le fichier CSS fournit des styles pour la mise en page et l'apparence des éléments HTML. Il définit également les styles pour les cellules vivantes et mortes dans la grille.

### JavaScript (script.js)

Le fichier JavaScript contient la logique du "Jeu de la Vie". Il initialise la grille, gère les interactions utilisateur, met en œuvre les règles du jeu, et contrôle le déroulement du jeu.

## Fonctionnalités

- Initialisation de la Grille: La grille est créée lors du chargement de la page avec des cellules mortes.
- Interaction Utilisateur: Les utilisateurs peuvent cliquer sur les cellules pour les faire passer de mortes à vivantes et vice versa.
- Contrôle du Jeu: Les boutons permettent de démarrer, mettre en pause, continuer, effacer et générer une configuration aléatoire.
- Calcul Génératif: Le jeu calcule la génération suivante en appliquant les règles du "Jeu de la Vie".
- Mise à Jour de la Vue: La vue est mise à jour pour refléter l'état actuel de la grille après chaque itération.
Utilisation
- Choisir la Taille de la Grille: Sélectionnez le nombre de lignes et de colonnes dans les listes déroulantes.
- Interaction avec la Grille: Cliquez sur les cellules pour les activer ou les désactiver.
- Contrôle du Jeu: Utilisez les boutons "Start", "Pause", "Continue", "Clear" et "Random" pour contrôler le jeu.

## Technologies Utilisées

- HTML
- CSS
- JavaScript
- Commentaires Supplémentaires
- Le code source est commenté pour expliquer chaque fonction et son rôle dans le fonctionnement du jeu.

## Exécution du Programme

Pour exécuter l'application "The Game of Life", suivez ces étapes simples :

1- Accès à l'Application : Ouvrez votre navigateur web et accédez à l'URL suivante : [GameLife](https://lifeegame.netlify.app/) .

2- Configuration de la Grille : Choisissez la taille de la grille en utilisant les listes déroulantes pour le nombre de lignes et de colonnes.

3- Interaction avec la Grille : Cliquez sur les cellules pour les activer ou les désactiver selon votre configuration initiale.

4- Contrôle du Jeu : Utilisez les boutons de contrôle situés sous la grille.

- "Start": Démarre le jeu.
- "Pause": Met en pause le jeu.
- "Continue": Continue le jeu après une pause.
- "Clear": Efface la grille et arrête le jeu.
- "Random": Génère une configuration aléatoire pour commencer le jeu.


5- Arrêt de l'Application : Pour arrêter complètement l'application, fermez simplement l'onglet du navigateur.

## Auteur

Ce projet a été réalisé par Mbacke Mbaye en réponse au défi lancé par le Master Elias Ba sur X/Twitter à la communauté Galsen Dev