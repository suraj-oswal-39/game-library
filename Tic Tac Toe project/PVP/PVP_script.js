let bgsound = new Audio("/game-library/Tic Tac Toe project/audios/motivational-background-corporate-city-273359.mp3");
let turnsound = new Audio("/game-library/Tic Tac Toe project/audios/level-up-3-199576.mp3");
let winsound = new Audio("/game-library/Tic Tac Toe project/audios/you-win-sequence-1-183948.mp3");
let clicksound = new Audio("/game-library/Tic Tac Toe project/audios/pen-click-99025.mp3");
let drawsound = new Audio("/game-library/Tic Tac Toe project/audios/game-over-39-199830.mp3");

let turn = "X";
let isgameover = false;
let Xpoint = 0;
let Opoint = 0;

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

//function of change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

//function check for winner
const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 0, -10, 0],
        [3, 4, 5, 0, -0, 0],
        [6, 7, 8, 0, 10, 0],
        [0, 3, 6, -10, 0, 90],
        [1, 4, 7, 0, 0, 90],
        [2, 5, 8, 10, 0, 90],
        [0, 4, 8, 0, 0, 45],
        [2, 4, 6, 0, 0, -45]
    ];

    wins.forEach((e) => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && 
            (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && 
            (boxtexts[e[0]].innerText !== "")) {
            document.querySelector(".info").innerText = boxtexts[e[0]].innerText + " Won!";
            isgameover = true;
            if (turn === "X") {
                Xpoint += 1;
                document.querySelector(".Xpoints").innerText = "X Point: " + Xpoint;
            } else {
                Opoint += 1;
                document.querySelector(".Opoints").innerText = "O Point: " + Opoint;
            }
            winsound.play();
            document.querySelector(".line").style.width = "33vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            setTimeout(() => {
                resetBoard();
                turn = "X";
                isgameover = false;
                document.getElementsByClassName("info")[0].innerText = "Turn : " + turn;   
                document.querySelector(".line").style.width = "0vw";
            }, 2000);
        }
    });

    if (!isgameover) {
        let allFilled = true;
        Array.from(boxtexts).forEach((box) => {
            if (box.innerText === "") {
                allFilled = false;
            }
        }); 

        if (allFilled) {
            isgameover = true;
            drawsound.play();
            document.querySelector(".info").innerText = "It's a Draw!";
            
            setTimeout(() => {
                resetBoard();
                turn = "X";
                isgameover = false;
                document.querySelector(".info").innerText = "Turn : " + turn;
            }, 2000);
        }
    }
};

//game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => { 
    let boxtexts = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtexts.innerText === '' && !isgameover) {
            boxtexts.innerText = turn;
            checkWin();
            if (!isgameover) {
                turn = changeTurn();
                turnsound.play();
                document.getElementsByClassName("info")[0].innerText = "Turn : " + turn;       
            }
        }
    });
});

// Function to reset the game board
const resetBoard = () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    document.querySelector(".line").style.width = "0vw";
};

//game reset logic
const resetgame = document.querySelector(".resetgame");
resetgame.addEventListener('click', () => {
    clicksound.play();
    resetBoard();
    turn = "X";
    isgameover = false;
    Xpoint = 0;
    Opoint = 0;
    document.getElementsByClassName("info")[0].innerText = "Turn : " + turn;
    document.querySelector(".Xpoints").innerText = "X Point: " + 0;
    document.querySelector(".Opoints").innerText = "O Point: " + 0;
});