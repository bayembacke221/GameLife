var rows = 25;
var cols = 50;
var playing = false;
var grid = new Array(rows);
var nextGrid = new Array(rows);
var timer;

function initializeGrids() {
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        nextGrid[i] = new Array(cols);
    }
}

function resetGrids() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = 0;
            nextGrid[i][j] = 0;
        }
    }
}

function copyAndResetGrid() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}


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

function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = document.getElementById(i + "_" + j);
            cell.setAttribute("class", grid[i][j] === 0 ? "dead" : "live");
        }
    }
}

function setupControlButtons() {
    var startButton = document.getElementById('start');
    startButton.onclick = startButtonHandler;

    var clearButton = document.getElementById('clear');
    clearButton.onclick = clearButtonHandler;

    var randomButton = document.getElementById("random");
    randomButton.onclick = randomButtonHandler;
}

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

function play() {
    computeNextGen();
    if (playing) {
        timer = setTimeout(play, 100);
    }
}

function computeNextGen() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(i, j);
        }
    }

    copyAndResetGrid();
    updateView();
}

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

window.onload = function(){
    createTable();
    initializeGrids();
    resetGrids();
    setupControlButtons();
};




