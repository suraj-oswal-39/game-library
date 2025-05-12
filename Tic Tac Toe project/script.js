let bgsound = new Audio("/game-library/Tic Tac Toe project/audios/motivational-background-corporate-city-273359.mp3");
let clicksound = new Audio("/game-library/Tic Tac Toe project/audios/pen-click-99025.mp3");

bgsound.volume = 0.3;
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