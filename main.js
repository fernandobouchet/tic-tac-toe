const board = document.getElementById("board");
const boardClass = document.querySelectorAll(".board");
const resetButton = document.getElementById("restart");
const gameStatus = document.getElementById("game-status");
const playerOneName = document.getElementById("player-one-name");
const playerTwoName = document.getElementById("player-two-name");

const Player = (name, sign) => {
  const playerName = name;

  const playerSign = sign;

  return {
    playerName,
    playerSign,
  };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return board;
  };

  const setSign = (sign, index) => {
    if (board[index] === "") board[index] = sign;
  };
  const getSign = (index) => {
    return board[index];
  };
  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return {
    getBoard,
    setSign,
    getSign,
    reset,
  };
})();

const game = (() => {
  let player1 = Player(playerOneName.value, "X");
  let player2 = Player(playerTwoName.value, "O");
  let playerOneTurn = true;
  let turn = 0;
  let gameEnd = false;

  const changeTurn = () => {
    playerOneTurn = !playerOneTurn;

    if (playerOneTurn) {
      gameStatus.textContent = `Its ${player1.playerName} TURN`;
    } else {
      gameStatus.textContent = `Its ${player2.playerName} TURN`;
    }
    turn++;
  };

  const checkGame = (index, player) => {
    if (checkWinner(index, player) === true) {
      gameStatus.textContent = `${player.playerName} WINS!`;
      gameEnd = true;
    } else if (turn === 9) {
      gameStatus.textContent = `Its a tie`;
      gameEnd = true;
    }
  };

  const checkWinner = (index, player) => {
    const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return WINNING_COMBINATIONS.filter((combination) =>
      combination.includes(index)
    ).some((possibleCombination) =>
      possibleCombination.every(
        (position) => gameBoard.getSign(position) === player.playerSign
      )
    );
  };

  const start = () => {
    player1 = Player(playerOneName.value, "X");
    player2 = Player(playerTwoName.value, "O");
    boardClass.forEach((element) => {
      element.addEventListener(
        "click",
        () => {
          if (!gameEnd) {
            if (playerOneTurn) {
              gameBoard.setSign(player1.playerSign, element.id);
              element.textContent = player1.playerSign;
              changeTurn();
              checkGame(parseInt(element.id), player1);
            } else {
              gameBoard.setSign(player2.playerSign, element.id);
              element.textContent = player2.playerSign;
              changeTurn();
              checkGame(parseInt(element.id), player2);
            }
          }
        },
        { once: true }
      );
    });
  };

  const restart = () => {
    playerOneTurn = true;
    turn = 0;
    gameEnd = false;
    gameBoard.reset();
    boardClass.forEach((element) => (element.textContent = ""));
    start();
  };

  resetButton.addEventListener("click", restart);

  return {
    checkGame,
  };
})();
