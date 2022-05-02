

const board = (() => {
    const board_array = ["e", "e", "e","e", "e", "e", "e", "e", "e"];

    const placeSymbol = function (symbol, index) {
        board_array[index] = symbol;

    };

    const checkWin = function () {

        let winChar = "";

        if (board_array[0] === board_array[1] && board_array[0] === board_array[2] && board_array[2] != "e") {
            winChar = board_array[2];
        }
        if (board_array[3] === board_array[4] && board_array[3] === board_array[5] && board_array[4] != "e") {
            winChar = board_array[4];
        }
        if (board_array[6] === board_array[7] && board_array[6] === board_array[8] && board_array[7] != "e") {
            winChar = board_array[7];
        }
        if (board_array[0] === board_array[4] && board_array[0] === board_array[8] && board_array[4] != "e") {
            winChar = board_array[4];
        }
        if (board_array[2] === board_array[4] && board_array[2] === board_array[6] && board_array[4] != "e") {
            winChar = board_array[4];
        }
        if (board_array[0] === board_array[3] && board_array[0] === board_array[6] && board_array[3] != "e") {
            winChar = board_array[3];
        }
        if (board_array[1] === board_array[4] && board_array[1] === board_array[7] && board_array[4] != "e") {
            winChar = board_array[4];
        }
        if (board_array[2] === board_array[5] && board_array[2] === board_array[8] && board_array[5] != "e") {
            winChar = board_array[5];
        }
        return winChar;
    }

    return {
        board_array,
        placeSymbol,
        checkWin,
    }
}

)();