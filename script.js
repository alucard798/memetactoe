document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('game-status');
    const restartBtn = document.getElementById('restart-btn');
    
    let currentPlayer = 'X';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function updateStatusText() {
        if (currentPlayer === 'X') {
            statusText.innerText = "Yoru's turn";
            statusText.style.color = 'blue';
        } else {
            statusText.innerText = "Reyna's turn";
            statusText.style.color = 'purple';
        }
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        placeMark(clickedCell, currentPlayer);

        if (checkForWinner()) {
            statusText.innerText = `${currentPlayer === 'X' ? 'Yoru' : 'Reyna'} wins!`;
            statusText.style.color = currentPlayer === 'X' ? 'blue' : 'purple';
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            statusText.innerText = 'Draw!';
            statusText.style.color = 'green';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatusText();
        }
    }

    function placeMark(cell, player) {
        const img = document.createElement('img');
        img.src = player === 'X' ? 'yo.png' : 're.png';
        cell.appendChild(img);
        cell.classList.add('marked');
    }

    function checkForWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    function restartGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        updateStatusText();

        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('marked');
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);

    // Initialize the game with the correct status text and color
    updateStatusText();
});