


const gameBoard = (() => {
    let board = ['','','','','','','','',''];
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

    const renderSquares =()=>{
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
        renderSquares();
        winningLogic.determineIndexOfPlays();
        winningLogic.determineWinnerO();
        winningLogic.determineWinnerX();
        winningLogic.stopGameWhenWon();
        
    }

     return {renderSquares,addInput};

    })();

const winningLogic = (() => {
    let indexesOfPlayer1 = [];
    let indexesOfPlayer2 = [];

const determineIndexOfPlays = ()=>{

    var resultsX =[];
    var resultsO =[];

    gameBoard.board.forEach((choice,index)=> choice ==='X'? resultsX.push(index):null);
    indexesOfPlayer1 = resultsX;


    gameBoard.board.forEach((choice,index)=> choice ==='O'? resultsO.push(index):null);
    indexesOfPlayer2 = resultsO;


}

let resultO
let resultX
const determineWinnerX = () =>{
     resultX = gameBoard.winningCombination.some((ar) => ar.every((e) => indexesOfPlayer1.includes(e)));

};

const determineWinnerO = () =>{
     resultO = gameBoard.winningCombination.some((ar) => ar.every((e) => indexesOfPlayer2.includes(e)));

};

const stopGameWhenWon = ()=>{
    let winnerDiv = document.getElementById('winner')

    if(resultX == true){
        winnerDiv.textContent = `${player1.name} Has Won!`
        let div = document.querySelectorAll(".squares");
        div.forEach(function(element){
            element.removeEventListener('click',render.addInput);
        }
        )}
    else if(resultO == true){
        winnerDiv.textContent = `${player2.name} Has Won!!`
        let div = document.querySelectorAll(".squares");
        div.forEach(function(element){
            element.removeEventListener('click',render.addInput);
        }
        )}
    else if (resultO == false && resultX == false &&indexesOfPlayer1.length==5 || indexesOfPlayer2.length==5  ){
        winnerDiv.textContent = "Its A DRAW!"
        }

};


return{indexesOfPlayer1,indexesOfPlayer2,determineIndexOfPlays,determineWinnerO,determineWinnerX,stopGameWhenWon}

 })();



 const buttonLogic = (() => {

    const resetButton = ()=>{
        let resetBtn = document.getElementById("resetButton");
        resetBtn.addEventListener('click', resetBoard)
    };
    const resetBoard = ()=>{
        const OGboard = ['','','','','','','','',''];
        gameBoard.board = OGboard;
        render.renderSquares();
    };

    const submitButton = ()=>{
        let player1Name = document.getElementById("user1Input").value;
        let player2Name = document.getElementById("user2Input").value;
        if(player1Name == '' || player2Name == ''){
            return alert('Enter Names!!!');
        }
        player1.name = player1Name;
        player2.name = player2Name;

        let userScreen = document.getElementById('startScreen')
        userScreen.style.display = 'none';
        let TicTacToeScreen = document.getElementById('app')
        TicTacToeScreen.style.display='block';
    };


    return{submitButton,resetButton};
})();

 render.renderSquares();
 buttonLogic.resetButton();
 let submitBtn = document.getElementById('submiteButton')
 submitBtn.addEventListener('click',buttonLogic.submitButton);


 let player1Name = document.getElementById("user1Input").value;