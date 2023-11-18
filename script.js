// Déclaration des variables globales
var rows = 25;
var cols = 50;
var playing = false;
var grid = new Array(rows);
var nextGrid = new Array(rows);
var timer;

/**
 * Initialisation les grilles principale et de travail
 * */ 
function initializeGrids() {
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

/**
 * Réinitialisation des grilles principale et de travail avec des cellules mortes
 * */ 
function resetGrids() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

/**
 * Copie le contenu de la grille de travail dans la grille principale et réinitialise la grille de travail
 * */ 
function copyAndResetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

/**
 * Création de la table initiale dans le conteneur spécifié
 *  */ 
function createTable() {
    var container = document.getElementById('container');
    if (!container) {
        return;
    }

    var table = document.createElement("table");

    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }

    container.appendChild(table);
}

/**
 * Gèstion de clics sur une cellule pour la faire passer de morte à vivante ou vice versa
 * */ 
function cellClickHandler() {
    var rowcol = this.id.split("_");
    var row = rowcol[0];
    var col = rowcol[1];

    var classes = this.getAttribute("class");
    if (classes.indexOf("live") > -1) {
        this.setAttribute("class", "dead");
        grid[row][col] = 0;
    } else {
        this.setAttribute("class", "live");
        grid[row][col] = 1;
    }
}

/**
 * Mise à jour la vue en fonction de l'état actuel de la grille
 * */ 
function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = document.getElementById(i + "_" + j);
            cell.setAttribute("class", grid[i][j] === 0 ? "dead" : "live");
        }
    }
}

/**
 * Gestion des boutons de contrôle
 * */ 
function setupControlButtons() {
    var startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;

    var clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandler;

    var randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;
}

/**
 * Initialisation d'une grille aléatoire pour commencer le jeu
 * */ 
function randomButtonHandler() {
    if (playing) return;
    clearButtonHandler();
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var isLive = Math.round(Math.random());
            if (isLive == 1) {
                var cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}

/**
 * Réinitialisation du jeu en arrêtant le jeu, réinitialisant les boutons et nettoyant la grille
 * */ 
function clearButtonHandler() {
    playing = false;
    var startButton = document.getElementById('start');
    startButton.innerHTML = "Start";
    clearTimeout(timer);

    var cellsList = document.getElementsByClassName("live");
    var cells = Array.from(cellsList);

    cells.forEach(function (cell) {
        cell.setAttribute("class", "dead");
    });

    resetGrids();
}

/**
 * Gère le bouton de démarrage en alternant entre démarrage et pause
 * */ 
function startButtonHandler() {
    if (playing) {
        playing = false;
        this.innerHTML = "Continue";
        clearTimeout(timer);
    } else {
        playing = true;
        this.innerHTML = "Pause";
        play();
    }
}

/**
 * 
 * Exécution du jeu, calcul de la génération suivante et planification de la prochaine itération
 * */ 
function play() {
    computeNextGen();
    if (playing) {
        timer = setTimeout(play, 100);
    }
}

/**
 * Calcul de la génération suivante en appliquant les règles du jeu de la vie
 * */ 
function computeNextGen() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }

    copyAndResetGrid();
    updateView();
}

/**
 * Appliquer les règles du jeu de la vie à la cellule spécifiée
 * */ 
function applyRules(row, col) {
    var numNeighbors = countNeighbors(row, col);
    if (grid[row][col] == 1) {
        if (numNeighbors < 2 || numNeighbors > 3) {
            nextGrid[row][col] = 0;
        } else {
            nextGrid[row][col] = 1;
        }
    } else if (grid[row][col] === 0 && numNeighbors === 3) {
        nextGrid[row][col] = 1;
    }
}

/**
 * Compter le nombre de voisins vivants autour de la cellule spécifiée
 * */ 
function countNeighbors(row, col) {
    var count = 0;
    for (var i = row - 1; i <= row + 1; i++) {
        for (var j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < cols && !(i === row && j === col)) {
                count += grid[i][j];
            }
        }
    }
    return count;
}

/**
 * Mise à jour de la taille de la grille en fonction des sélections dans les listes déroulantes
 * */ 
function updateGridSize() {
    var rowsDropdown = document.getElementById('rows');
    var colsDropdown = document.getElementById('cols');

    rows = parseInt(rowsDropdown.value);
    cols = parseInt(colsDropdown.value);

    
    var container = document.getElementById('container');
    container.innerHTML = '';

    initializeGrids();
    createTable();
    setupControlButtons();
    resetGrids();
    updateView();
}

/**  
 * Événements déclenchés par les changements dans les listes déroulantes
 * */
document.getElementById('rows').addEventListener('change', updateGridSize);
document.getElementById('cols').addEventListener('change', updateGridSize);

/**
 * Exécution de la mise à jour initiale de la grille lors du chargement de la page
 * */ 
window.onload = updateGridSize;
