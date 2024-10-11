// Select the buttons

const dailyButton = document.getElementById("dailyBtn");
const weeklyButton = document.getElementById("weeklyBtn");
const monthlyButton = document.getElementById("monthlyBtn");

// Add event listener to the buttons

dailyButton.addEventListener("click", () => updateData("daily"));
weeklyButton.addEventListener("click", () => updateData("weekly"));
monthlyButton.addEventListener("click", () => updateData("monthly"));

//create fetch function

function updateData(timeframe) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((activity) => {
        const activityName = activity.title.toLowerCase();
        const currentHours = activity.timeframes[timeframe].current;
        const previousHours = activity.timeframes[timeframe].previous;

        // construct id name
        const currentElement = document.getElementById(`${activityName}Time`);
        const previousElement = document.getElementById(
          `previous-${activityName}Time`
        );

        // change current time in the dom
        if (currentElement) currentElement.innerHTML = `${currentHours}hrs`;

        // function to know what to write into previous time section
        let previousText = "";
        if (timeframe === "daily") {
          previousText = `Yesterday - ${previousHours}hrs`;
        } else if (timeframe === "weekly") {
          previousText = `Last Week - ${previousHours}hrs`;
        } else if (timeframe === "monthly") {
          previousText = `Last Month - ${previousHours}hrs`;
        }

        // write previous time in the dom
        if (previousElement) previousElement.innerHTML = previousText;
      });
    })
    .catch((error) => console.error("Error searching data:", error));
}
