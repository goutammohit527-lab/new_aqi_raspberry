/* ============================================================
   AQI MONITOR FRONTEND
============================================================ */


/* ============================================================
   CURRENT SENSOR DATA
   --------------------------------
   Temporary dummy data.
   Later this will come from Raspberry Pi backend.
============================================================ */

let sensorData = {

    aqi: 119,

    co2: 453,

    so2: 0.02,

    no2: 0.69,

    co: 0.50,

    pm15: 35,

    pm25: 43,

    pm10: 48,

    temperature: 31.6,

    humidity: 74.8
};


/* ============================================================
   UPDATE CLOCK
============================================================ */

function updateClock() {

    const now = new Date();


    /* Date */

    const dateOptions = {

        weekday: "short",

        day: "2-digit",

        month: "short",

        year: "numeric"
    };

    const dateString =
        now.toLocaleDateString(
            "en-IN",
            dateOptions
        );


    /* Time */

    const timeString =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        );


    document.getElementById("date")
        .textContent = dateString;


    document.getElementById("time")
        .textContent = timeString;


    document.getElementById("lastUpdated")
        .textContent =
        `${dateString} ${timeString}`;
}


/* ============================================================
   UPDATE SENSOR DISPLAY
============================================================ */

function updateDashboard() {

    document.getElementById("aqiValue")
        .textContent = sensorData.aqi;


    document.getElementById("co2")
        .textContent = sensorData.co2;


    document.getElementById("so2")
        .textContent =
        Number(sensorData.so2).toFixed(2);


    document.getElementById("no2")
        .textContent =
        Number(sensorData.no2).toFixed(2);


    document.getElementById("co")
        .textContent =
        Number(sensorData.co).toFixed(2);


    document.getElementById("pm15")
        .textContent = sensorData.pm15;


    document.getElementById("pm25")
        .textContent = sensorData.pm25;


    document.getElementById("pm10")
        .textContent = sensorData.pm10;


    document.getElementById("temperature")
        .textContent =
        Number(sensorData.temperature).toFixed(1);


    document.getElementById("humidity")
        .textContent =
        Number(sensorData.humidity).toFixed(1);


    updateAQIStatus(sensorData.aqi);
}


/* ============================================================
   AQI STATUS
============================================================ */

function updateAQIStatus(aqi) {

    const statusElement =
        document.getElementById("aqiStatus");


    let status = "";
    let statusColor = "";


    if (aqi <= 50) {

        status = "Good";

        statusColor = "#27ef78";

    }

    else if (aqi <= 100) {

        status = "Moderate";

        statusColor = "#ffd42a";

    }

    else if (aqi <= 150) {

        status = "Unhealthy for Sensitive Groups";

        statusColor = "#ffad21";

    }

    else if (aqi <= 200) {

        status = "Unhealthy";

        statusColor = "#ff5b45";

    }

    else if (aqi <= 300) {

        status = "Very Unhealthy";

        statusColor = "#c85cff";

    }

    else {

        status = "Hazardous";

        statusColor = "#b00020";
    }


    statusElement.textContent = status;

    statusElement.style.color =
        statusColor;
}


/* ============================================================
   SIMULATE LIVE SENSOR DATA
   --------------------------------
   ONLY FOR TESTING THE FRONTEND.
============================================================ */

function simulateSensorData() {

    /*
       Small random changes so we can see
       the dashboard updating.
    */

    sensorData.co2 =
        453 +
        Math.round((Math.random() - 0.5) * 10);


    sensorData.so2 =
        0.02 +
        (Math.random() - 0.5) * 0.005;


    sensorData.no2 =
        0.69 +
        (Math.random() - 0.5) * 0.05;


    sensorData.co =
        0.50 +
        (Math.random() - 0.5) * 0.04;


    sensorData.pm15 =
        35 +
        Math.round((Math.random() - 0.5) * 4);


    sensorData.pm25 =
        43 +
        Math.round((Math.random() - 0.5) * 4);


    sensorData.pm10 =
        48 +
        Math.round((Math.random() - 0.5) * 4);


    sensorData.temperature =
        31.6 +
        (Math.random() - 0.5) * 0.5;


    sensorData.humidity =
        74.8 +
        (Math.random() - 0.5) * 1;


    updateDashboard();
}


/* ============================================================
   INITIALIZE
============================================================ */

function initializeDashboard() {

    updateClock();

    updateDashboard();
}


/* ============================================================
   CLOCK UPDATE
============================================================ */

setInterval(
    updateClock,
    1000
);


/* ============================================================
   TEMPORARY SENSOR UPDATE
   --------------------------------
   Remove this later when backend
   connection is implemented.
============================================================ */

setInterval(
    simulateSensorData,
    3000
);


/* ============================================================
   START
============================================================ */

initializeDashboard();
