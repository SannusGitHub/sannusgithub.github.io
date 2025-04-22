function isTodayInRange(start, end) {
    const today = new Date();
    const thisYear = today.getFullYear();
  
    const startDate = new Date(thisYear, start.month - 1, start.day);
    const endDate = new Date(thisYear, end.month - 1, end.day);
  
    return today >= startDate && today <= endDate;
}

function isTodayEqualTo(date) {
    const today = new Date();
    return today.getDate() === date.day && today.getMonth() === date.month - 1;
}

export const events = [
    {
        name: "Christmas",
        start: { month: 12, day: 24 },
        end: { month: 12, day: 26 },
        applyTheme: () => {
            console.log("christmas");
        }
    },
    {
        name: "Pride Month",
        start: { month: 6, day: 1 },
        end: { month: 6, day: 30 },
        applyTheme: () => {
            document.getElementById("header-title-flair").src = "src/img/rainbow.png";
        }
    },
    {
        name: "Birthday",
        start: { month: 3, day: 1 },
        applyTheme: () => {
            console.log("birfday")
        }
    },
    {
        name: "Independence",
        start: { month: 2, day: 24 },
        applyTheme: () => {
            document.getElementById("header-title-flair").src = "src/img/estonia.png";
        }
    }
];

export function applyMatchingEventTheme() {
    const today = new Date();
    for (const event of events) {
      if (event.end) {
        if (isTodayInRange(event.start, event.end)) {
          event.applyTheme();
          break;
        }
      } else {
        if (isTodayEqualTo(event.start)) {
          event.applyTheme();
          break;
        }
      }
    }
}