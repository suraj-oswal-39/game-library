// Modified Tic Tac Toe Logic with Player vs AI using Minimax

let bgsound = new Audio("/game-library/Tic Tac Toe project/audios/motivational-background-corporate-city-273359.mp3");
let turnsound = new Audio("/game-library/Tic Tac Toe project/audios/level-up-3-199576.mp3");
let winsound = new Audio("/game-library/Tic Tac Toe project/audios/you-win-sequence-1-183948.mp3");
let clicksound = new Audio("/game-library/Tic Tac Toe project/audios/pen-click-99025.mp3");
let drawsound = new Audio("/game-library/Tic Tac Toe project/audios/game-over-39-199830.mp3");

let turn = "X";
let isgameover = false;
let Xpoint = 0;
let Opoint = 0;
let mode = "AI"; // Set to "PVP" for Player vs Player or "AI" for Player vs AI

bgsound.volume = 0.3;
turnsound.volume = 0.5;
winsound.volume = 0.7;
clicksound.volume = 0.4;

bgsound.loop = true;
bgsound.play();

document.addEventListener("DOMContentLoaded", () => {
    const clickableLinks = document.querySelectorAll("a");

    clickableLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // stop immediate navigation
            clicksound.play();
            const targetUrl = this.href;

            // Wait for the sound to play, then navigate
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 200); // Adjust delay if needed
        });
    });
});

document.getElementsByClassName("info")[0].innerText = "Turn : " + turn;

const changeTurn = () => turn === "X" ? "O" : "X";

const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combo of wins) {
        let [a, b, c] = combo;
        if (boxtexts[a].innerText !== "" && boxtexts[a].innerText === boxtexts[b].innerText && boxtexts[a].innerText === boxtexts[c].innerText) {
            document.querySelector(".info").innerText = boxtexts[a].innerText + " Won!";
            isgameover = true;
            if (boxtexts[a].innerText === "X") {
                Xpoint++;
                document.querySelector(".Xpoints").innerText = "(Player) X Point: " + Xpoint;
            } else {
                Opoint++;
                document.querySelector(".Opoints").innerText = "(AI) O Point: " + Opoint;
            }
            winsound.play();
            setTimeout(() => resetFullGame(), 2000);
            return;
        }
    }

    if ([...boxtexts].every(box => box.innerText !== "") && !isgameover) {
        isgameover = true;
        drawsound.play();
        document.querySelector(".info").innerText = "It's a Draw!";
        setTimeout(() => resetFullGame(), 2000);
    }
};

const bestMove = () => {
    let bestScore = -Infinity;
    let move;
    let boxtexts = document.getElementsByClassName("boxtext");

    for (let i = 0; i < 9; i++) {
        if (boxtexts[i].innerText === "") {
            boxtexts[i].innerText = "O";
            let score = minimax(boxtexts, 0, false);
            boxtexts[i].innerText = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== undefined) {
        boxtexts[move].innerText = "O";
        checkWin();
        if (!isgameover) {
            turn = "X";
            turnsound.play();
            document.querySelector(".info").innerText = "Turn : " + turn;
        }
    }
};

const minimax = (board, depth, isMaximizing) => {
    let result = evaluateBoard(board);
    if (result !== null) return result;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i].innerText === "") {
                board[i].innerText = "O";
                let score = minimax(board, depth + 1, false);
                board[i].innerText = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i].innerText === "") {
                board[i].innerText = "X";
                let score = minimax(board, depth + 1, true);
                board[i].innerText = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const evaluateBoard = (board) => {
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of wins) {
        if (board[a].innerText && board[a].innerText === board[b].innerText && board[a].innerText === board[c].innerText) {
            return board[a].innerText === "O" ? 10 : -10;
        }
    }

    if ([...board].every(cell => cell.innerText !== "")) return 0;
    return null;
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === '' && !isgameover && turn === "X") {
            boxtext.innerText = turn;
            checkWin();
            if (!isgameover && mode === "AI") {
                turn = "O";
                turnsound.play();
                setTimeout(bestMove, 300); // delay for realism
            } else if (!isgameover) {
                turn = changeTurn();
                turnsound.play();
                document.querySelector(".info").innerText = "Turn : " + turn;
            }
        }
    });
});

const resetBoard = () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach(box => box.innerText = "");
    document.querySelector(".line").style.width = "0vw";
};

const resetFullGame = () => {
    resetBoard();
    turn = "X";
    isgameover = false;
    document.querySelector(".info").innerText = "Turn : " + turn;
    document.querySelector(".line").style.width = "0vw";
};

const resetgame = document.querySelector(".resetgame");
resetgame.addEventListener('click', () => {
    clicksound.play();
    resetBoard();
    turn = "X";
    isgameover = false;
    Xpoint = 0;
    Opoint = 0;
    document.querySelector(".info").innerText = "Turn : " + turn;
    document.querySelector(".Xpoints").innerText = "(Player) X Point: 0";
    document.querySelector(".Opoints").innerText = "(AI) O Point: 0";
});
