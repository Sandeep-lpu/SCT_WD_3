const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;
let mode = "player"; // "player" or "computer"

// Create board UI
function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    boardElement.appendChild(cell);
  });
}

// Handle cell click
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusElement.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    statusElement.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusElement.textContent = `Player ${currentPlayer}'s Turn`;

  if (mode === "computer" && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

// Computer Move
function computerMove() {
  let available = board.map((val, i) => val ? null : i).filter(v => v !== null);
  let move = available[Math.floor(Math.random() * available.length)];
  
  board[move] = "O";
  document.querySelector(`[data-index='${move}']`).textContent = "O";

  if (checkWin("O")) {
    statusElement.textContent = "Computer Wins!";
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    statusElement.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusElement.textContent = "Player X's Turn";
}

// Check win conditions
function checkWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Cols
    [0,4,8], [2,4,6]           // Diagonals
  ];
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === player)
  );
}

// Reset game
function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = "Player X's Turn";
  createBoard();
}

// Set game mode
function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
}

// Initialize
createBoard();
