const X_CLASS = 'x';
const O_CLASS = 'o';
let currentPlayerClass = X_CLASS;

const cells = document.querySelectorAll('.cell');
const turnMessage = document.getElementById('turn-message');
const resetButton = document.getElementById('reset-button');
const gameBoard = document.getElementById('game-board');

let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    resetButton.addEventListener('click', resetGame);
    updateTurnMessage();
}

function handleClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (!gameActive || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
        return;
    }

    placeMark(cell, cellIndex);
    if (checkWin(currentPlayerClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updateTurnMessage();
    }
}

function placeMark(cell, cellIndex) {
    cell.classList.add(currentPlayerClass);
    gameState[cellIndex] = currentPlayerClass;
}

function swapTurns() {
    currentPlayerClass = currentPlayerClass === X_CLASS ? O_CLASS : X_CLASS;
}

function updateTurnMessage() {
    turnMessage.innerText = `Player ${currentPlayerClass.toUpperCase()}'s turn`;
}

function checkWin(playerClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === playerClass;
        });
    });
}

function isDraw() {
    return gameState.every(cell => {
        return cell === X_CLASS || cell === O_CLASS;
    });
}

function endGame(draw) {
    if (draw) {
        turnMessage.innerText = 'Draw!';
    } else {
        turnMessage.innerText = `Player ${currentPlayerClass.toUpperCase()} wins!`;
    }
    gameActive = false;
}

function resetGame() {
    gameActive = true;
    currentPlayerClass = X_CLASS;
    gameState = ['', '', '', '', '', '', '', '', ''];
    initializeGame();
    turnMessage.innerText = `Player X's turn`;
}
