let deckStats = [
    {
        name: "Red Deck",
        icon: "./src/img/balatro/decks/red_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Blue Deck",
        icon: "./src/img/balatro/decks/blue_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Yellow Deck",
        icon: "./src/img/balatro/decks/yellow_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Green Deck",
        icon: "./src/img/balatro/decks/green_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Black Deck",
        icon: "./src/img/balatro/decks/black_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Magic Deck",
        icon: "./src/img/balatro/decks/magic_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Nebula Deck",
        icon: "./src/img/balatro/decks/nebula_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Ghost Deck",
        icon: "./src/img/balatro/decks/ghost_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Abandoned Deck",
        icon: "./src/img/balatro/decks/abandoned_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Checkered Deck",
        icon: "./src/img/balatro/decks/checkered_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Zodiac Deck",
        icon: "./src/img/balatro/decks/zodiac_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Painted Deck",
        icon: "./src/img/balatro/decks/painted_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Anaglyph Deck",
        icon: "./src/img/balatro/decks/anaglyph_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: true
        }
    },
    {
        name: "Plasma Deck",
        icon: "./src/img/balatro/decks/plasma_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: false,
            gold: false
        }
    },
    {
        name: "Erratic Deck",
        icon: "./src/img/balatro/decks/erratic_deck.png",
        stakes: {
            white: true,
            red: true,
            green: true,
            black: true,
            blue: true,
            purple: true,
            orange: true,
            gold: false
        }
    }
]

function initTable() {
    for (let i = 0; i <= deckStats.length; i++) {
        createBalatroContainer(deckStats[i])
    }
}

function darkenHexColor(hex, factor) {
    hex = hex.replace('#', '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.max(0, r - factor);
    g = Math.max(0, g - factor);
    b = Math.max(0, b - factor);

    let darkenedHex = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
    return darkenedHex;
}

function createBalatroContainer(deckStat) {
    let doneCount = Object.values(deckStat.stakes).filter(Boolean).length;
    let allCount = Object.keys(deckStat.stakes).length;

    let container = document.createElement("div");
    container.className = "balatro-container";

    let nameParagraph = document.createElement("p");
    nameParagraph.textContent = deckStat.name;
    container.appendChild(nameParagraph);

    let imgWrapper = document.createElement("div");
    imgWrapper.className = "image-wrapper";
    container.appendChild(imgWrapper);

    let mainImg = document.createElement("img");
    mainImg.className="main-img";
    mainImg.src = deckStat.icon;
    mainImg.alt = deckStat.name;
    imgWrapper.appendChild(mainImg);

    let highestStake = null;
    let rarityColor = null;
    const stakesOrder = ['white', 'red', 'green', 'black', 'blue', 'purple', 'orange', 'gold'];
    const stakesHex = { white: '#FDFDFD', red: '#FD5F55', green: '#55A383', black: '#4F6367', blue: '#009CFD', purple: '#8A71E1', orange: '#E47C4C', gold: '#F2C255'
    };

    for (let i = stakesOrder.length - 1; i >= 0; i--) {
        if (deckStat.stakes[stakesOrder[i]]) {
            highestStake = stakesOrder[i];
            rarityColor = stakesHex[highestStake];
            break;
        }
    }

    let stakeImg = document.createElement("img");
    stakeImg.className="stake-img";
    stakeImg.src = `./src/img/balatro/stakes/${highestStake}_stake_overlay.png`;;
    stakeImg.alt = deckStat.name;
    imgWrapper.appendChild(stakeImg);

    let rarityParagraph = document.createElement("p");
    rarityParagraph.className = "balatro-rarity";
    rarityParagraph.style.backgroundColor = rarityColor;
    rarityParagraph.style.filter = `drop-shadow(0px 5px ${darkenHexColor(rarityColor, 30)})`;
    rarityParagraph.textContent = `${doneCount} / ${allCount}`;
    container.appendChild(rarityParagraph);

    document.getElementById("deck-grid").appendChild(container);
}

addEventListener("DOMContentLoaded", initTable)