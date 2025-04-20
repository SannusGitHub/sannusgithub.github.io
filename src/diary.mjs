async function fetchData(url, header, func) {
    const response = await fetch(url, {
        headers: header
    });

    const data = await response.json();
    if (response.ok) {
        func();
    } else {
        console.error("Access denied:", data.error);
    }
}

async function populateDiaryEntries(params = {}) {
    const defaultOptions = {
        url: "",
    }
    const options = {...defaultOptions, ...params};
}

function initializePage() {
    const token = localStorage.getItem("token");

    if (token === null || token.length === 0) {
        console.log("token not found")
    } else {
        console.log("attempting data fetch since token already exists");

        const token = localStorage.getItem("token");
        fetchData('http://localhost:3000/api/content', { Authorization: `Bearer ${token}`, Entry: "1" });
    }
}

addEventListener("DOMContentLoaded", initializePage);