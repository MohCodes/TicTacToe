


const gameBoard = (() => {
    const board = ['','','','','','','','',''];
    const winningCombination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],]
 return {winningCombination,board};
})();

const players = (name,symbol) => {
    return{ name, symbol};
};


    //players
    const player1 = players('player1','X');
    const player2 = players('player2','O');
    

const render = (() => {


    //turn changing logic
    let turn = player1;

    const nextTurn = ()=>{

        if(turn ==player1){
            turn = player2
        }
        else{
            turn = player1
        };
    };
    
    //creating DOM elements for grid

    const renderUsedSquares =()=>{
        let mainDiv = document.getElementById("ticTacToeContainer");
        mainDiv.innerHTML =``;

        for (var i = 0; i<gameBoard.board.length;i++){
            if(gameBoard.board[i] == 'X'||gameBoard.board[i] == 'O'){
            let div = document.createElement('div');
            div.className = `squares`;
            div.setAttribute('id',`${i}`);
            div.textContent = gameBoard.board[i];
            if(gameBoard.board[i] == "X"){
                div.style.color = "red"
            }
            else if (gameBoard.board[i] == "O"){
                div.style.color = "darkcyan"
            }
            mainDiv.appendChild(div);
            div.removeEventListener('click', addInput);
            }
            else{
                let div = document.createElement('div');
                div.className = `squares`;
                div.setAttribute('id',`${i}`);
                div.textContent = gameBoard.board[i];
                mainDiv.appendChild(div);
                div.addEventListener('click', addInput);
            }
        };


    }

    //event listeners that add input to grid
    const addInput = (e) => {

        const squareClicked = e.target.id;
        gameBoard.board.splice(squareClicked,1,`${turn.symbol}`);
        nextTurn();
        renderUsedSquares();

    }

     return {renderUsedSquares,addInput};

    })();

 render.renderUsedSquares();

