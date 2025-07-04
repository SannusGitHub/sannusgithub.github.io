let p = document.getElementById("output");
let pcmd = document.getElementById("input");

let dir = {}
let currentDirectory = {}

const commands = {
    "exit": {
        func: function() {
            history.back()
        }
    },
    "clear": {
        func: function() {
            p.innerText = "";
        }
    },
    "help": {
        func: function() {
            let string = "Available commands: \n";

            for (const [cmd, _] of Object.entries(commands)) {
                string += cmd + "\n";
            }

            p.innerText += string + "\n";
        }
    },
    "wai": { // Who Am I
        func: function(args) {
            let string = "intermeddle";

            if (args.includes("-p") || args.includes("--perms")) {
                string += " user/0";
            }

            if (args.includes("-d") || args.includes("--date")) {
                string += " 2025-07-04";
            }

            p.innerText += string + "\n";
        }
    },
    "wa": { // Where At
        func: function() {
            p.innerText += getFullPathFromCurrentDir() + "\n";
        }
    },
    "mt": { // Move To
        func: function(args) {
            if (currentDirectory.parent && args[0] == "..") {
                currentDirectory = currentDirectory.parent;
                return;
            }

            if (args[0] == "") {
                p.innerText += "Cannot backtrack: no valid path" + "\n";
                return;
            }

            if (currentDirectory[args[0]] == null) {
                p.innerText += "Cannot backtrack: no valid path" + "\n";
                return;
            }
            
            currentDirectory = currentDirectory[args[0]];
        }
    },
    "lf": { // List Files
        func: function() {
            let string = "";
            let targetFolder = currentDirectory;

            if (targetFolder.parent && typeof targetFolder.parent === "object") {
                string += "/.. ";
            }

            let contents = Object.keys(targetFolder).filter(
                key => key !== "parent" && targetFolder[key] instanceof Folder
            );
            
            contents.forEach(name => string += "/" + name + " ");
            p.innerText += string + "\n";
        }
    },
    "cd": { // Create Directory
        func: function(args) {
            let nameString = args[0] || "newFolder";
            new Folder(nameString, currentDirectory);
        }
    },
    "cf": { // Create Fle
        func: function() {
            p.innerText += "User does not have permission\n";
        }
    }
}

function Folder(name, parent) {
    this.name = name;
    this.parent = parent;
    this.hidden = false;

    if (parent && typeof parent === 'object') {
        parent[name] = this;
    }
}

// basic template setup
new Folder("root", dir);
new Folder("user", dir.root);
new Folder("intermeddle", dir.root.user);
new Folder("telliskivi", dir.root.user);
currentDirectory = dir.root.user.intermeddle;

function getFullPathFromCurrentDir(directory) {
    let parts = [];
    let current = directory || currentDirectory;

    while (current && current.name) {
        parts.unshift(current.name);
        current = current.parent;
    }

    return '/' + parts.join('/');
}

function parseCommand(content) {
    const strings = content.split(" ");
    for (const [cmd, params] of Object.entries(commands)) {
        // check root cmd with strings[0]
        if (strings[0] === cmd) {
            params.func(strings.slice(1));
            pcmd.innerHTML = "";
            return;
        }
    }

    p.innerText += "unknown command\n";
    pcmd.innerHTML = "";
}

addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        const input = pcmd.innerHTML.trim();

        parseCommand(input);
        return;
    }

    if (event.key == "Backspace") {
        event.preventDefault();

        pcmd.innerHTML = pcmd.innerHTML.slice(0, -1);
        return;
    }

    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        pcmd.innerHTML += event.key;
    }
});

let cursorBlink = false;
const cursorSpan = document.getElementById("underline");

setInterval(() => {
    cursorSpan.innerHTML = cursorBlink ? "" : " ▒";
    cursorBlink = !cursorBlink;
    p.scrollTop = p.scrollHeight;
}, 500);