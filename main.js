const board = document.getElementById("board");
const boardClass = document.querySelectorAll(".board");

const Player = (sign) => {
  const getSign = sign;
  return {
    getSign,
  };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

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
    setSign,
    getSign,
    reset,
  };
})();

const game = (() => {
  let player1 = Player("X");
  let player2 = Player("O");

  let playerOneTurn;

  const changeTurn = () => {
    playerOneTurn = !playerOneTurn;
  };

  boardClass.forEach((element) => {
    element.addEventListener("click", () => {
      if (playerOneTurn) {
        gameBoard.setSign(player1.getSign, element.id);
        element.textContent = player1.getSign;
        changeTurn();
      } else {
        gameBoard.setSign(player2.getSign, element.id);
        element.textContent = player2.getSign;
        changeTurn();
      }
    });
  });

  return {};
})();
