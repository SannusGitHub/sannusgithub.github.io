const creations = {
    1: {
        name: "Liminal Dominos",
        description: "(VRChat)",
        url: "https://vrchat.com/home/world/wrld_1949d7a3-80e4-4540-8d37-2dc9fe874853/info",
        image: "src/img/creations/liminal-dominos.png"
    },
    2: {
        name: "Sannu's Mod",
        description: "(Balatro)",
        url: "https://github.com/SannusGitHub/sannusmod",
        image: "src/img/creations/sannus-mod.png"
    },
    3: {
        name: "VRC Picture Archive",
        description: "(Locked)",
        url: "",
        image: "src/img/creations/locked.png"
    }
}

function addCreations() {
    for (const [_, creationParams] of Object.entries(creations)) {
        createCreationsEntry(creationParams);
    }
}

function createCreationsEntry(params) {
    const parentDiv = document.getElementById("creations-container");

    const creationSubDiv = document.createElement("div");
    creationSubDiv.classList = "content colored-container";
    parentDiv.appendChild(creationSubDiv);

    const creationImg = document.createElement("img");
    creationImg.classList = "center-content";
    creationImg.src = params.image;
    creationSubDiv.appendChild(creationImg);

    const creationTitle = document.createElement("h3");
    creationTitle.classList = "center-content";
    creationTitle.innerHTML = params.name;
    creationSubDiv.appendChild(creationTitle);

    const creationDescription = document.createElement("p");
    creationDescription.classList = "center-content";
    creationDescription.innerHTML = params.description;
    creationSubDiv.appendChild(creationDescription);

    parentDiv.style.cursor = 'pointer';
    creationSubDiv.onclick = function() {
        window.open(params.url);
    };
}

addEventListener("DOMContentLoaded", addCreations);