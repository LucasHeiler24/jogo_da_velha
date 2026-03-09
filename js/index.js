import { board, moves } from "./constants.js";
import { validColumn, validLine, validMainDiagonal, validSecondaryDiagonal } from "./helpers.js";

window.onload = function(){

    const sectionGame = document.getElementById('sectionGame');
    const errorsNames = document.getElementById('errorsNames');
    const tabs = document.querySelectorAll('.tab');
    const tableBody = document.getElementById('tableBody');
    
    let play = false;
    let movePlayer1;
    let movePlayer2;
    let names;
    let contMoves = 0;

    function addListenerInTabs(){
        tabs.forEach(tab => {
            tab.addEventListener('click', function(){
                const [line, column] = this.id.split(':');

                const movePlayer = play ? movePlayer1 : movePlayer2;
                board[parseInt(line)][parseInt(column)] = movePlayer;
                tab.textContent = movePlayer;
                contMoves++;

                if(contMoves == 9){
                    alert(`Deu velha!`);
                    window.location.reload();
                }

                let win = false;
                if(validLine(line, movePlayer) || validColumn(column, movePlayer)
                || validMainDiagonal(movePlayer) || validSecondaryDiagonal(movePlayer))
                    win = true;

                if(win){
                    alert(`Jogador ${play ? names.player1 : names.player2} venceu!`);
                    window.location.reload();
                }
                else {
                    play = !play;
                    changePlayer();
                }
            })
        })
    }

    function changePlayer(){
        document.querySelector(play ? '.player-1' : '.player-2').classList.add('selected');
        document.querySelector(!play ? '.player-1' : '.player-2').classList.remove('selected');
    }

    function buildTable(movePlayer1, movePlayer2){
        tableBody.innerHTML += `
            <tr class="player-1">
                <td>${names.player1}</td>
                <td>${movePlayer1}</td>
            </tr>
            <tr class="player-2">
                <td>${names.player2}</td>
                <td>${movePlayer2}</td>
            </tr>
        `;
        changePlayer();
    }

    function sortePlayers(){        
        play = (Math.floor(Math.random() * 11) < 5) ? true : false;
        const sortedMove = Math.floor(Math.random() * 11);
        if(sortedMove < 5){
            movePlayer1 = moves[0];
            movePlayer2 = moves[1];
        }
        else {
            movePlayer1 = moves[1];
            movePlayer2 = moves[0];
        }
        buildTable(movePlayer1, movePlayer2);
    }

    document.getElementById('formNames').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        if(!formData.get('player1') || !formData.get('player2'))
            return errorsNames.innerHTML = `Preencher os nomes corretamente!`;

        names = Object.fromEntries(formData);

        document.querySelector('.section-names').classList.add('hidden');
        setTimeout(() => {
            document.querySelector('.section-names').style.display = 'none';
            sectionGame.classList.add('show');
            sortePlayers();
            addListenerInTabs();
        }, 500);
    });

}