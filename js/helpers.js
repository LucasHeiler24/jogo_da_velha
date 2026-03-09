import { board } from "./constants.js";

function validLine(line, movePlayer){
    for(let i=0; i<3; i++){
        if(board[line][i] != movePlayer)
            return false;
    }
    return true;
}

function validColumn(column, movePlayer){
    for(let i=0; i<3; i++){
        if(board[i][column] != movePlayer)
            return false;
    }
    return true;
}

function validMainDiagonal(movePlayer){
    for(let i=0; i<3; i++){
        if(board[i][i] != movePlayer)
            return false;
    }
    return true;
}

function validSecondaryDiagonal(movePlayer){
    for(let i=0; i<3; i++){
        if(board[i][2-i] != movePlayer)
            return false;
    }
    return true;
}

export {
    validColumn,
    validLine,
    validMainDiagonal,
    validSecondaryDiagonal
}