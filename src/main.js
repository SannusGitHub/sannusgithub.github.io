import { applyMatchingEventTheme } from "./events.mjs";

function typeWriter(elementId, textContent, speed, pauseMod = 1) {
    var index = 0;

    function type() {
        if (index < textContent.length) {
            document.getElementById(elementId).innerHTML += textContent.charAt(index);
            index++;
            
            if (textContent.charAt(index - 1) == "." || textContent.charAt(index - 1) == "!" || textContent.charAt(index - 1) == "?") {
                setTimeout(type, speed * pauseMod);
            } else {
                setTimeout(type, speed);
            }
        }
    }

    type();
}

function clockWidget(params = {}) {
    const defaultOptions = {
        timeZone: 'Europe/Tallinn',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const options = {...defaultOptions, ...params};
    
    const formatter = new Intl.DateTimeFormat([], options);
    const timeString = formatter.format(new Date());

    const elementId = params.id || 'currentTime';
    const elementObject = document.getElementById(elementId);
    if (elementObject) {
        elementObject.textContent = timeString;
    };
}

function lastUpdatedGitHubWidget(params = {}) {
    const defaultOptions = {
        repositoryApi: 'https://api.github.com/repos/SannusGitHub/sannusgithub.github.io',
        cacheDuration: 1000 * 60 * 60 * 24, // 24 hrs
    };
    const options = {...defaultOptions, ...params};
    
    const CACHE_KEY = "last_updated_github";
    const CACHE_TIME = "last_updated_github_cached_time";
    const now = new Date().getTime();

    const cachedTime = localStorage.getItem(CACHE_TIME);
    const isCacheExpired = !cachedTime || (now - parseInt(cachedTime)) > options.cacheDuration;

    const displayDate = (dateObj) => {
        const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
        const formatted = dateObj.toLocaleDateString('en-US', options).replace(',', '');
        const parts = formatted.split(' ');
        document.getElementById("lastUpdated").textContent = `${parts[0]}, ${parts[1]} ${parts[2]} ${parts[3]}`;
    };

    if (isCacheExpired) {
        fetch(options.repositoryApi)
            .then(res => res.json())
            .then(data => {
                const lastUpdated = new Date(data.updated_at);
                localStorage.setItem(CACHE_KEY, lastUpdated);
                localStorage.setItem(CACHE_TIME, now);
                console.log("Fetched new GitHub update:", lastUpdated);
            })
            .catch(err => {
                console.error("Failed to fetch GitHub repo info:", err);
            });
    } else {
        const cachedDate = new Date(localStorage.getItem(CACHE_KEY));
        console.log("Using cached GitHub update:", cachedDate);

        displayDate(cachedDate);
    }
}

function setupImageClickReveal() {
    const img = document.querySelector('.bg-image');
    const p = document.querySelector('.hidden-text');
  
    if (!img || !p) return;
  
    let clickCount = 0;
  
    img.addEventListener('click', function () {
        clickCount++;
        if (clickCount === 3) {
            p.classList.remove('slide-right');
            p.classList.add('slide-left');
    
            setTimeout(() => {
                p.classList.remove('slide-left');
                p.classList.add('slide-right');
                clickCount = 0;
            }, 1500);
        }
    });
}

window.onload = function() {
    applyMatchingEventTheme();

    setupImageClickReveal();

    clockWidget();
    setInterval(() => clockWidget(), 60000);

    lastUpdatedGitHubWidget();
}