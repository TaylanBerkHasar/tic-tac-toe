const player1 = createPlayer("Player", "x");
const player2 = createPlayer("AI", "o");



const game = (() => {
    let isGameOver = false;
    const player_array = [player1, player2];
    let currentPlayer = player_array[0];
    const turnChange = function () {
        console.log(currentPlayer.name + " " + player_array[0].name + " " + player_array[1].name)
        if (this.currentPlayer === player_array[0]) {
            this.currentPlayer = player_array[1];
            if (last6(board.board_array)) { 
                board.placeSymbol(minimax(board.board_array, "o").index)
                
            } else {
                myEmptyIndex = emptyIndexies(board.board_array);
                board.placeSymbol(myEmptyIndex[Math.floor(Math.random() * myEmptyIndex.length)]);
            }
            document.querySelector(".turn-tracker").textContent = game.currentPlayer.symbol + "'s turn!";
            
            return;
        } else {
            this.currentPlayer = player_array[0];
            
            document.querySelector(".turn-tracker").textContent = game.currentPlayer.symbol + "'s turn!";
        }


    };
    return {
        player_array, currentPlayer, turnChange
    };
})();

const board = (() => {
    const board_array = ["", "", "", "", "", "", "", "", ""];

    const placeSymbol = function (index) {

        if(board_array[index] == ""){
            board_array[index] = game.currentPlayer.symbol;
            populateDisplay();
            game.turnChange();
            board.checkWin();
        }

       
    };

    const checkWin = function () {

        let winChar = "";

        if (board_array[0] === board_array[1] && board_array[0] === board_array[2] && board_array[2] != "") {
            winChar = board_array[2];
        }
        if (board_array[3] === board_array[4] && board_array[3] === board_array[5] && board_array[4] != "") {
            winChar = board_array[4];
        }
        if (board_array[6] === board_array[7] && board_array[6] === board_array[8] && board_array[7] != "") {
            winChar = board_array[7];
        }
        if (board_array[0] === board_array[4] && board_array[0] === board_array[8] && board_array[4] != "") {
            winChar = board_array[4];
        }
        if (board_array[2] === board_array[4] && board_array[2] === board_array[6] && board_array[4] != "") {
            winChar = board_array[4];
        }
        if (board_array[0] === board_array[3] && board_array[0] === board_array[6] && board_array[3] != "") {
            winChar = board_array[3];
        }
        if (board_array[1] === board_array[4] && board_array[1] === board_array[7] && board_array[4] != "") {
            winChar = board_array[4];
        }

        if (board_array[2] === board_array[5] && board_array[2] === board_array[8] && board_array[5] != "") {
            winChar = board_array[5];
        }

        for (x = 0; x < game.player_array.length; x++) {
            if (game.player_array[x].symbol == winChar) {
                document.querySelector(".turn-tracker").textContent = game.player_array[x].name + " wins! Be a darling and refresh your browser to play again.";
                game.isGameOver = true;
                return game.player_array[x];
            }
            else {
                console.log("no wins yet!");
            }
        }

        if(emptyIndexies(board.board_array).length == 0){
            document.querySelector(".turn-tracker").textContent = "It's draw! Be a darling and refresh your browser to play again.";
            game.isGameOver = true;
        }
    }



    return {
        board_array,
        placeSymbol,
        checkWin,
    };
})();

function createPlayer(name, symbol) {
    return {
        name,
        symbol,
        win() {
            console.log(name + " wins");
        }
    };
}

const gridList = document.querySelectorAll(".grid");

for (x = 0; x < gridList.length; x++) {

    gridList[x].addEventListener("click", function () {

        if (!game.isGameOver) {
            board.placeSymbol(this.id);
            console.log(this.id)

        };




    });
}

function populateDisplay() {
    for (x = 0; x < gridList.length; x++) {
        gridList[x].textContent = board.board_array[x];
    }


}



// Trial with AI!

//keeps count of function calls
var fc = 0;
// var bestSpot = minimax(board.board_array, aiPlayer);

function minimax(theBoard, player) {

    let newBoard = [];

    for(i = 0; i< theBoard.length; i++){
        if(theBoard[i] != "x" && theBoard[i] != "o"){
            newBoard[i] = i;
        } else {
            newBoard[i] = theBoard[i];
        }
    }

    //add one to function calls
    fc++;

    //available spots
    var availSpots = emptyIndexies(newBoard);
    let huPlayer = "x";
    let aiPlayer = "o";
    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (winning(newBoard, huPlayer)) {
        return { score: -10 };
    }
    else if (winning(newBoard, aiPlayer)) {
        return { score: 10 };
    }
    else if (availSpots.length === 0) {
        return { score: 0 };
    }

    // an array to collect all the objects
    var moves = [];

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++) {
        //create an object for each and store the index of that spot that was stored as a number in the object's index key
        var move = {};
        move.index = newBoard[availSpots[i]];

        // set the empty spot to the current player
        newBoard[availSpots[i]] = player;

        //if collect the score resulted from calling minimax on the opponent of the current player
        if (player == aiPlayer) {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        }
        else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        //reset the spot to empty
        newBoard[availSpots[i]] = move.index;

        // push the object to the array
        moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {

        // else loop over the moves and choose the move with the lowest score
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
}

// returns the available spots on the board
function last6(board) {
    let theEmptyList = [];
    for (x = 0; x < board.length; x++) {
        if (board[x] != "x" && board[x] != "o") {
            theEmptyList.push(x);
        }
    }

    if (theEmptyList.length <= 6) {
        return true;
    } else {
        return false;
    }
}

// returns the available spots on the board
function emptyIndexies(board) {
    let emptyList = [];
    for (x = 0; x < board.length; x++) {
        if (board[x] != "x" && board[x] != "o") {
            emptyList.push(x);
        }
    }

    return emptyList;
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player) {
 
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}