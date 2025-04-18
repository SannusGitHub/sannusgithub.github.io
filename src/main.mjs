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

function timestampWidget(params = {}) {
    const defaultOptions = {

    };
    const options = {...defaultOptions, params};
}

window.onload = function() {
    clockWidget();
    setInterval(() => clockWidget(), 60000);
}