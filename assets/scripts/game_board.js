const gameBoard = function(){
  let board = [];

  return {
    setSquare(square, to) {
      board[square] = to;
    },
    clearBoard() {
      board = [];
    }
  }

}();
