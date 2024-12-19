//by including the following line of code, we ensure that the javascript is only executed when the HTML is fully loaded
$(document).ready(function() {
    console.log("Ready");


    //-------------Variables---------------------------------
    let table = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]; //will hold the current values on board
    let player = 0; // will track whose turn it is
    const playerSymbols = ['X', '0']; //array holding symbols for each player
    const cellDim = 150; //dimension of cell in pixels
    let selectedRow = 0; //the row the user just picked
    let selectedCol = 0; //the col the user just picked


    $('td').each(function() {
        $(this).css({
            height: cellDim + 'px',
            width: cellDim + 'px'
        });
    });


    $('#resetButton').on('click', resetGame)

    //-------------Functions---------------------------------
    function checkForWin(player) {

        // use the player here so it doesnt compare empty values
        let playerToCheck = playerSymbols[player]

        for (let row = 0; row < table[0].length; row++){

            if (table[row][0] == playerToCheck && table[row][1] == playerToCheck && playerToCheck == table[row][2]) {
                return true;
            }
            
        }

        for (let col = 0; col < table[0].length; col++){
            if (table[0][col] == playerSymbols[player] && table[1][col] == playerSymbols[player] && table[2][col] == playerSymbols[player]) {
                return true;
            }
            
        }
        console.log(table)
        if (table[0][0] == playerSymbols[player] && playerSymbols[player] == table[1][1] &&  table[2][2] == playerSymbols[player]){
            return true;
        }
        if (table[0][2] == playerSymbols[player] && playerSymbols[player] == table[1][1] &&  table[2][0] == playerSymbols[player]){
            return true;
        }


        return false;
    }


    function sendWinNotification() {
        alert("Player " + playerSymbols[player] + " has won!");
        resetGame();
    }


    function takeTurn() {
        if (isFree(selectedRow, selectedCol)) {
            table[selectedRow][selectedCol] = playerSymbols[player];
            //fill the element in  the  HTML

            var desiredTd = $('#table tr:eq(' + selectedRow + ') td:eq(' + selectedCol + ')');

            $(desiredTd).html(playerSymbols[player]);
            if (checkForWin(player)) {
                setTimeout(function() {
                    sendWinNotification();
                }, 100); //execute after a small delay
                console.log("win")
            } else {
                //change player!
                if (player == 0) {
                    player = 1;
                } else if (player == 1) {
                    player = 0;
                }
               //Task! Make the html display the updated player!
            }

            $("#currentPlayer").html("Current Player: " + playerSymbols[player])
        }


    }

    /*Remember Javascript does not check the parameter type, so wo do not have to tell the function that row and col are ints */
    function isFree(row, col) {
        if (table[row][col] == '') {
            return true;
        }
        return false;
    }


    //-------------Event Listener---------------------------------
    //when the table is clicked execute the function 'take turn!'  

    $('table').on('click', function(event) {
        // Get the mouse position relative to the clicked element
        var x = event.pageX - $(this).offset().left;
        var y = event.pageY - $(this).offset().top;


        // Print the mouse position
        console.log('Mouse Position - X: ' + x + ', Y: ' + y);


        //this is the maths part that tells us which row or column is selected
        selectedRow = Math.floor(y / cellDim);
        selectedCol = Math.floor(x / cellDim);


        console.log('Selected Cell - row: ' + selectedRow + ', col: ' + selectedCol);


        takeTurn();
    });


    // $('table').on('click', function(event) {


    //     takeTurn();
    // });



    function resetGame() {


        table = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        $('#table tr td').each(function () {
            $(this).html('')
        });

        console.log(table)
        player = 0
        $("#currentPlayer").html("Current Player: " + playerSymbols[player])

}


}); // end document ready

