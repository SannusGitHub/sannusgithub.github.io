const dstUrl = 'http://localhost:3000'

async function fetchData(url, header, body, func, method = "POST") {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...header
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            func(data);
        } else {
            console.error("Access denied:", data.error);
        }
    } catch (error) {
        console.error("Error during fetch:", error);
    }
}

async function populateDiaryEntries(params = {}) {
    fetchData(dstUrl + '/api/content',
        {},
        { payload: '' },
    )
}

async function fetchDiaryData(lowerCurrentEntry = 0) {
    const currentEntry = localStorage.getItem("currentEntry") + lowerCurrentEntry;
    console.log(currentEntry);
    const token = localStorage.getItem("token");

    fetchData(
        dstUrl + '/api/content',
        { authorization: `${token}` },
        { entryId: currentEntry },
        (data) => {
            updateDiaryContent(data);
        },
        "POST"
    )
}

async function updateDiaryContent(data) {
    const diaryTitle = document.getElementById("diary-title");
    diaryTitle.innerText = data.entry.title;

    const diaryDate = document.getElementById("diary-date");
    diaryDate.innerText = data.entry.date;

    const diaryContent = document.getElementById("diary-content");
    diaryContent.innerHTML = data.entry.content;

    localStorage.setItem("max_entries", data.entryAmount);
}

function initializePage() {
    const token = localStorage.getItem("token");
    const key = "dummytoken"

    if (token === null || token.length === 0) {
        console.log("token not found, fetching...")
        
        fetchData(
            dstUrl + '/api/auth',
            {},
            { payload: key },
            (data) => {
                console.log("Success:", data)
                localStorage.setItem("token", data.token)
                localStorage.setItem("current_entry", data.entryAmount)
                localStorage.setItem("max_entries", data.entryAmount)

                fetchDiaryData();
            },
            'POST'
        )
    } else {
        console.log("token already exists of " + token)

        fetchDiaryData();
    }
}

addEventListener("DOMContentLoaded", initializePage);