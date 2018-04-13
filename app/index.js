const cells = document.getElementsByClassName("cell");
const human = '0';
const ai = 'X';
const table = [];
const winningcombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function intializeTableValues() {
    for (var i=1; i<=9; i++) {
        table[i] = -1;
    }
}

document.getElementById("replay").addEventListener("click", prepareBoard);
showButtonsAndInitializeHandlers();

function prepareBoard() {
    clear();
    intializeTableValues();
    declare("");
    showButtonsAndInitializeHandlers();
    removeEventListenerHandlers();
}
 

function clear() {
    for (var i=0; i<cells.length; i++) {
        cells[i].innerHTML = "";
        cells[i].style.backgroundColor = "";
    }
}

function playerTurn(cell) {
    if (table[cell.target.id] === -1) {
        fill(cell.target.id, human);
        if (!checkWin(table, human) && !checkTie()) {
            fill(bestSpot(), ai);
            if (checkTie()) {
                return;
            }
        }
    }

}

function fill(cellId, player) {
    table[cellId] = player;
    document.getElementById(cellId).innerHTML = player;
    let playerwon = checkWin(table, player);
    if (playerwon != null)
        gameover(playerwon);
    
}

function checkWin(table, player) {
    let currentStatus = table.reduce((a, e, i) => (e==player) ? a.concat(i) : a, []);
    let won = null;

    let iterator = winningcombinations.entries();
    for (let [index, win] of iterator) {
        
        let t = [];
        if(win.every(elem => currentStatus.indexOf(elem) > -1)) {
            won = {index: index, player: player};
            break;
        }
    }
    return won;
}

function gameover(playerwon) {

    for (let id of winningcombinations[playerwon.index]) {
        document.getElementById(id).style.backgroundColor =  (playerwon.player == human) ? "blue" :"red";
    }

    removeEventHandlersFromSquares();

    if (playerwon.player === '0') {
        declare("You Win!");
    } else {
        declare("You Lose!");
    }
}

function checkTie() {

    if(emptyTableRows().length == 0){
        declare("Tie Game");
        return true;
    }
    return false;
}

function emptyTableRows() {
    let emptyTableRows = [];
    for (var i=1; i<=9; i++) {
        if (table[i] == -1) {
            emptyTableRows.push(i);
        }
    }
    return emptyTableRows;
}

function declare(result) {
    document.getElementById("result").innerHTML = result;
}

function bestSpot() {
    return minimax(table, ai).index;
}

function minimax(table, player) {
    let availableSquares = emptyTableRows();
    
    if(checkWin(table, human) != null) {
        return {score: -10};
    } else if(checkWin(table, ai) != null) {
        return {score: 10};
    } else if(availableSquares.length == 0) {
        return {score: 0};
    }

    var moves = [];

    for (var i=0; i<availableSquares.length; i++) {
        var move = {};

        move.index = availableSquares[i];
        table[availableSquares[i]] = player;

        if (player == ai) {
            var result = minimax(table, human);
            move.score = result.score;
        } else {
            var result = minimax(table, ai);
            move.score = result.score;

        }
        table[availableSquares[i]] = -1;
        moves.push(move);
    }

    var bestMove;

    if (player == ai) {
        var bestScore = -100000;
        for (var i=0; i<moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 100000;
        for (var i=0; i<moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    console.log(moves[bestMove].index);
    return moves[bestMove];
}

function first() {
    
    removeButtons();
    addClickEventsToSquares();
    document.getElementById("first").removeEventListener("click", first);
    document.getElementById("second").removeEventListener("click", second);
}

function second() {
    
    removeButtons();
    selectFromRandomCorners();
    addClickEventsToSquares();
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "none";
    
    
}

function addClickEventsToSquares() {
    for(var i=0; i<cells.length; i++) {
        cells[i].addEventListener('click', playerTurn);
    }    
}

function removeButtons() {
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "none";
}

function showButtonsAndInitializeHandlers() {
    document.getElementById("first").style.display = "block";
    document.getElementById("second").style.display = "block";
    document.getElementById("first").addEventListener("click", first);
    document.getElementById("second").addEventListener("click", second);

}

function selectFromRandomCorners() {
    var arr = [1, 3, 7, 9];
    var rand = Math.floor(Math.random()*4);
    console.log(arr[rand]);
    fill(arr[rand], ai);
}

function removeEventHandlersFromSquares() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', playerTurn);
    }
}
prepareBoard();
