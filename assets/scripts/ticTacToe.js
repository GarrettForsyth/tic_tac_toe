let playerOneName = "Bob";
let playerTwoName = "Alice";

/* this module includes everything needed to play tic-tac-toe */
const ticTacToe = (function(playerOneName, playerTwoName){

  /* factory function for creating players */
  const playerProto = {
    name() { return this.name;},
    setName(name) { this.name = name; },
    marker(){ return this.marker; },
    setMarker(marker){ this.marker = marker;}
  };
    
  function playerFactory(name, marker) {
    var player = Object.create(playerProto);
    player.setName(name);
    player.setMarker(marker)
    return player;
  }

  /* private state of a tic tac toe game */
  let player1 = playerFactory(`${playerOneName}`, "&times"); // x symbol
  let player2 = playerFactory(`${playerTwoName}`, "&#9675"); // o symbol
  let isPlayerOneTurn = true;
  let isGameOver = false;

  function currentPlayer(){
    return isPlayerOneTurn? player1 : player2;
  }

  /* define a board object */
  const gameBoard = function(){

    /* private state of the board object */
    let board = [];

    /* add listeners to squares */
    squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('click', e => {
        console.log(square);
        rules.placeMarker(e, square);
    }));
    
  
    /* public methods of the board object (that a ticTacToe object
     * can manipulate 
     */
    return {
      setSquare(square, to) {
        board[square] = to;
      },
      getSquare(square){ 
        return board[square];
      },
      clearBoard() {
        board = [];
      }, 
      tie() {
        /* returns non empty items */
        return board.filter(Boolean).length === 9;
      }
    }
  }();

  /* private object used for rendering */
  const displayController = function() {
    return {
      renderSquare(square, m){
        square.classList.add(m);
        square.childNodes[0].innerHTML = m;
      }
    }
  }();

  /* contains rule logic */
  const rules = function() {
    /* private function that checks board for a winning position */
    function checkEndConditions(player) {

      /*Check rows */
      counter = 0;
      for(i = 0; i < 9; i=i+3) {
        for( j=i+1; j <= i+3; j++) {
          if (gameBoard.getSquare(j) === currentPlayer().marker) counter++;
        }

        if (counter === 3){
          alert(`${currentPlayer().name} has formed a row!`);
          break;
        }
        else counter = 0;
      }
      
      /* Check columns */
      counter = 0;
      for(i= 1; i <= 3; i++) {
        for( j=i; j <= i+6; j=j+3) {
          if (gameBoard.getSquare(j) === currentPlayer().marker) counter++;
        }

        if (counter === 3){
          alert(`${currentPlayer().name} has formed a column!`);
          break;
        }
        else counter = 0;
      }

      if (gameBoard.getSquare(1) == currentPlayer().marker
        && gameBoard.getSquare(5) == currentPlayer().marker
        && gameBoard.getSquare(9) == currentPlayer().marker) {
          alert(`${currentPlayer().name} has formed a diagnal!`);
      }

      if (gameBoard.getSquare(3) == currentPlayer().marker
        && gameBoard.getSquare(5) == currentPlayer().marker
        && gameBoard.getSquare(7) == currentPlayer().marker) {
          alert(`${currentPlayer().name} has formed a diagnal!`);
      }


      /* check for tie AFTER checking for win */
      /* in case the last move wins the game  */
      if (gameBoard.tie()){
        alert('It\'s a tie!');
        return true;
      }
    }

    return {
      placeMarker(e, square) {
        /* get the relevent square from the game board */
        squareNum = square.getAttribute('data-box-number');
        gameSquare = gameBoard.getSquare(squareNum);

        // if the square is open
        if ( gameSquare == undefined) {
          m = currentPlayer().marker;
          gameBoard.setSquare(squareNum, m);
          displayController.renderSquare(square, m);
          checkEndConditions();
          isPlayerOneTurn = !isPlayerOneTurn;
        }
      }
    }

  }();

  return {
    startGame(){
    }
  }

})(playerOneName, playerTwoName);

ticTacToe.startGame();

