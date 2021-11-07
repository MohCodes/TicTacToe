const gameBoard = (() => {
    const board = ['square1','square2','square3','square4','square5','square6','square7','square8','square9'];
 return {board};
})();

const players = (name,symbol) => {
    return{ name, symbol};
};




const render = (() => {

    let turn = "X";
    function nextTurn (){
        if(turn =="X"){
            turn = "O";
        }
        else{
            turn = "X";
        }
    }


    const player1 = players('player1','X');
    const player2 = players('player2','O');
    
    const createGridSquares = () =>{ 
        for (var i = 0; i<gameBoard.board.length;i++){
            let div = document.createElement('div');
            div.className = `squares`;
            div.setAttribute('id',`${gameBoard.board[i]}`);

            let mainDiv = document.getElementById("ticTacToeContainer");
            mainDiv.appendChild(div);
        };
    };

    const AddEventListners = () => {

        createGridSquares();
        for(var i = 0; i<gameBoard.board.length;i++){
           let div = document.getElementById(gameBoard.board[i]);

           function addInput(){
            div.textContent = `${turn}`
            nextTurn();
            div.removeEventListener('click',addInput);
           };

           div.addEventListener('click', addInput)
           };
        };

    return {AddEventListners};

})();

render.AddEventListners();


