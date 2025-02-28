class CampfireGame {
    constructor() {
        this.startValue = 100;
        this.currentValue = this.startValue;
        this.decayRate = 1;
        this.interval = 1000;

        this.isLit = false;
        this.timer = null;

        this.displayElement = document.getElementById("interaction-text");

        this.campfireInteractButton = document.getElementById("campfire-interact-button");
        this.campfireInteractButton.addEventListener("click", () => this.kindle());
    }

    tick() {
        this.currentValue -= this.decayRate;
        if (this.currentValue < 0) {
            this.currentValue = 0;
        }

        this.updateDisplay();
    }

    updateDisplay() {
        let flameStatusString;

        if (this.currentValue > 60) {
            flameStatusString = "The flame burns high and mighty.";
        } else if (this.currentValue > 30) {
            flameStatusString = "The flame crackles.";
        } else if (this.currentValue > 1) {
            flameStatusString = "The flame is getting dimmer...";
        } else {
            flameStatusString = "The flame has extinguished.";
        }

        this.displayElement.textContent = flameStatusString;
        console.log("flame status is: " + this.currentValue);
    }

    kindle() {
        if (!this.isLit) {
            this.timer = setInterval(() => this.tick(), this.interval);
            this.isLit = true;
        }

        this.currentValue = this.startValue;
        this.updateDisplay();
    }
}

let typingTimeouts = [];

function typeWriter() {
    typingTimeouts.forEach(timeout => clearTimeout(timeout));
    typingTimeouts = [];

    const textArray = storyText.innerHTML.split('');
    storyText.innerHTML = '';

    textArray.forEach((letter, i) => {
        const timeout = setTimeout(() => {
            storyText.innerHTML += letter;
        }, 95 * i);
        typingTimeouts.push(timeout);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    new CampfireGame();
});