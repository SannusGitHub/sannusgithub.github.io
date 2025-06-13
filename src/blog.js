const dstUrl = 'https://sannusgithub-private-vecrel.vercel.app';

async function fetchData(url, header, body, func, fetchErrorFunc = function() {}, method = "POST") {
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
            return data;
        } else {
            console.error("access denied:", data.error);
            return null;
        }
    } catch (error) {
        console.error("error during fetch:", error);
        fetchErrorFunc();
        return null;
    }
}

async function fetchAllEntries() {
    let entry = 1;
    let hasMore = true;

    const token = localStorage.getItem("token");

    while (hasMore) {
        const data = await fetchData(
            dstUrl + '/api/content',
            { authorization: `${token}` },
            { requestedEntryId: entry },
            (data) => {
                addEntry(data);
            },
            () => {
                console.log("failed to fetch entry");
            },
            "POST"
        );

        if (!data || Object.keys(data).length === 0) {
            console.log("finished fetching entries.");
            hasMore = false;
        } else {
            entry++;
        }
    }
}

async function addEntry(data) {
    const blogTitleButton = document.createElement("a");
    blogTitleButton.innerHTML = data.entry.title;

    const blogTitle = document.createElement("h1");
    blogTitle.innerHTML = data.entry.title;

    const blogContent = document.getElementById("blog-content");
    blogTitleButton.onclick = function() {
        blogContent.innerHTML = "";

        blogContent.appendChild(blogTitle);
        blogContent.innerHTML += data.entry.content;
    };

    const sidebar = document.getElementById("sidebar");
    sidebar.appendChild(blogTitleButton);
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
                console.log("success:", data)
                localStorage.setItem("token", data.token)

                fetchAllEntries();
            },
            () => {
                console.log("failed to fetch auth");
            },
            'POST'
        )
    } else {
        console.log("token already exists of " + token)

        fetchAllEntries();
    }
}

addEventListener("DOMContentLoaded", initializePage);