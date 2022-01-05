const board = document.getElementById("board");
const boardClass = document.querySelectorAll(".board");
const result = document.getElementById("result");

const Player = (sign) => {
  const getSign = sign;
  return {
    getSign,
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
  let player1 = Player("X");
  let player2 = Player("O");
  let playerOneTurn = true;
  let turn = 0;
  let gameEnd = false;

  const changeTurn = () => {
    playerOneTurn = !playerOneTurn;
    turn++;
  };

  boardClass.forEach((element) => {
    element.addEventListener(
      "click",
      () => {
        if (!gameEnd) {
          if (playerOneTurn) {
            gameBoard.setSign(player1.getSign, element.id);
            element.textContent = player1.getSign;
            checkGame(parseInt(element.id), player1);
            changeTurn();
          } else {
            gameBoard.setSign(player2.getSign, element.id);
            element.textContent = player2.getSign;
            checkGame(parseInt(element.id), player2);
            changeTurn();
          }
        }
      },
      { once: true }
    );
  });

  const playTurns = () => {};

  const checkGame = (index, player) => {
    if (checkWinner(index, player) === true) {
      result.textContent = `${player} its the winner!`;
      gameEnd = true;
    } else if (turn === 8) {
      result.textContent = `Its a tie`;
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
        (position) => gameBoard.getSign(position) === player.getSign
      )
    );
  };

  const endGame = () => {
    boardClass.forEach((element) => {
      element.removeEventListener("click", () => {});
    });
  };

  return {
    checkGame,
  };
})();
