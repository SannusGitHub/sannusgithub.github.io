function initializePage() {
    generateFooter();
    // applyTheming();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateFooter() {
    const nineDigitsFlavor = getRandomInt(999) + "-" + getRandomInt(999) + "-" + getRandomInt(999);
    const currYear = new Date().getFullYear();
    const instanceText = "INSTANCE #" + getRandomInt(10000);
    document.querySelector('.footer-flair-label').textContent = currYear + " // " + instanceText + " // " + nineDigitsFlavor;
}

function applyTheming() {
    var now = new Date();
    var hour = now.getHours();

    console.log("Current Hour:", hour);

    var body = document.querySelector(".tiled-background");

    if (hour >= 9 && hour < 15) {
        body.style.webkitFilter = "none"; 
        body.style.filter = "none"; 
        body.style.background = 'url("img/backgroundtiling.png") repeat';
    } else {
        body.style.webkitFilter = "invert(100%)"; 
        body.style.filter = "invert(100%)"; 
        body.style.background = 'url("img/backgroundtiling-dark.png") repeat';
    }
}

addEventListener("DOMContentLoaded", initializePage);