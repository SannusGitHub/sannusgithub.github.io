async function login(payload) {
    // https://sannusgithub-private-vecrel.vercel.app/api/auth
    const response = await fetch("https://sannusgithub-private-vecrel.vercel.app/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload })
    });

    const data = await response.json();
    if (data.success) {
        localStorage.setItem("token", data.token);
        fetchData();
    } else {
        document.getElementById('input-box').value = "";
    }
}

async function fetchData() {
    const token = localStorage.getItem("token");

    const response = await fetch("https://sannusgithub-private-vecrel.vercel.app/api/content", {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    const contentDiv = document.getElementById("content");

    if (response.ok) {
        contentDiv.innerHTML = data.indexHtml;
        document.head.insertAdjacentHTML("beforeend", `<style>${data.styleCss}</style>`);

        const script = document.createElement("script");
        script.innerHTML = data.javascriptJs + "\nsetTimeout(init, 0);";
        document.body.appendChild(script);
    } else {
        console.error("Access denied:", data.error);
    }
}

function initializePage() {
    const input = document.getElementById('input-box');
    const token = localStorage.getItem("token");

    if (token === null || token.length === 0) {
        console.log("token not found, request input")
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                login(input.value);
            }
        })
    } else {
        console.log("attempting data fetch since token already exists");
        fetchData();
    }
}

addEventListener("DOMContentLoaded", initializePage);