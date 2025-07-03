let p = document.getElementById("output");
let pcmd = document.getElementById("cmd");

const commands = {
    "clear": {
        func: function() {
            p.innerText = "";
        }
    },
    "help": {
        func: function() {
            p.innerText += "you are not permitted to use this command\n";
        }
    }
}

addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        const input = pcmd.innerHTML.trim();

        for (const [cmd, params] of Object.entries(commands)) {
            if (input === cmd) {
                params.func();
                pcmd.innerHTML = "";
                return;
            }
        }
        
        p.innerText += "unknown command: " + input + "\n";
        pcmd.innerHTML = "";
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