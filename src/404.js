/* 
    i won't stop you from looking at this (not like i can do a whole lot anyways)
    but remember that if you're looking 'round here you might get spoiled on stuff!
*/

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
                string += cmd + " ";
            }

            p.innerText += string + "\n";
        }
    },
    "wit": { // Who Is This
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
            if (args.length === 0) {
                p.innerText += "Cannot backtrack: missing path\n";
                return;
            }
            const path = args[0].split("/");

            for (let index = 0; index < path.length; index++) {
                const segment = path[index];
                
                if (segment === "..") {
                    if (currentDirectory.parent) {
                        console.log(currentDirectory.parent);
                        currentDirectory = currentDirectory.parent;
                    } else {
                        p.innerText += "Cannot backtrack: no valid path\n";
                        return;
                    }
                } else if (segment === "") {
                    p.innerText += "Cannot backtrack: no valid path\n";
                    return;
                } else {
                    if (currentDirectory[segment]) {
                        currentDirectory = currentDirectory[segment];
                    } else {
                        p.innerText += "Cannot backtrack: no valid path\n";
                        return;
                    }
                }
            }
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

            p.innerText += "Created new directory of '" + nameString + "'\n";
        }
    },
    "cf": { // Create File
        func: function() {
            p.innerText += "User does not have permission\n";
        }
    },
    "audio": { // audio stuff
        func: function(args) {
            const audio = document.getElementById("bg");
            if (args.length === 0) {
                p.innerText += "Audio Driver Kerosene ALC650 (AC'97 Audio Codec, Driver 3.0) volume @ " + audio.volume + "\n";
            }
            
            if (args.includes("-m") || args.includes("--mute")) {
                if (audio.paused) {
                    audio.play();
                    p.innerText += "Audio Driver Kerosene ALC650 (AC'97 Audio Codec, Driver 3.0) unmuted\n";
                } else {
                    audio.pause();
                    p.innerText += "Audio Driver Kerosene ALC650 (AC'97 Audio Codec, Driver 3.0) muted\n";
                }
            };

            if (args.includes("-v") || args.includes("--volume")) {
                const volume = getArgValue(args, "-v", "--volume");

                if (volume) {
                    if (!Number.isFinite(parseFloat(volume)) || volume < 0 || volume > 1) {
                        p.innerText += "Invalid volume setting (accepted signed float: 0 - 1)\n";
                        return;
                    }

                    p.innerText += "Audio Driver Kerosene ALC650 (AC'97 Audio Codec, Driver 3.0) volume @ " + volume + "\n";
                    audio.volume = volume;
                }
            };
        }
    },
    "hwl": {
        func: function() {
            p.innerText += `Kernel: 8.12-rev5-generic.shell x_86_32 (32-bit)
                            System: Kalmaar Peripherals GX270 SFF
                            BIOS: Angelton v6.00PG (04/09/2002)
                            CPU: Interesting Graphics (onboard, 64MB shared)
                            Memory: 1024MB DDR Non-ECC SDRAM, 333 Mhz (2 dimms)
                            Resolution: 320x240 (Safe Mode)
                            Audio: Audio Driver Kerosene ALC650 (AC'97 Audio Codec, Driver 3.0)\n`
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

function getArgValue(args, ...flags) {
    for (const flag of flags) {
        const index = args.indexOf(flag);
        if (index !== -1 && index + 1 < args.length) {
            return args[index + 1];
        }
    }
    return undefined;
}

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

    p.innerText += "unknown command: " + pcmd.innerHTML + "\n";
    pcmd.innerHTML = "";
    p.scrollTop = p.scrollHeight;
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