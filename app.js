/* ============================================================
   AIR QUALITY MONITOR
   FRONTEND JAVASCRIPT
============================================================ */


/* ============================================================
   SENSOR DATA

   These are temporary values.

   Later they will come from:

   ESP32
      ↓
   UART
      ↓
   Raspberry Pi
      ↓
   Python
      ↓
   JavaScript
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
   CLOCK
============================================================ */

function updateClock() {

    const now = new Date();


    /* DATE */

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


    /* TIME */

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
   UPDATE DASHBOARD
============================================================ */

function updateDashboard() {


    /* AQI */

    document.getElementById("aqiValue")
        .textContent =
        sensorData.aqi;



    /* CO2 */

    document.getElementById("co2")
        .textContent =
        sensorData.co2;



    /* SO2 */

    document.getElementById("so2")
        .textContent =
        Number(sensorData.so2)
            .toFixed(2);



    /* NO2 */

    document.getElementById("no2")
        .textContent =
        Number(sensorData.no2)
            .toFixed(2);



    /* CO */

    document.getElementById("co")
        .textContent =
        Number(sensorData.co)
            .toFixed(2);



    /* PM1.5 */

    document.getElementById("pm15")
        .textContent =
        sensorData.pm15;



    /* PM2.5 */

    document.getElementById("pm25")
        .textContent =
        sensorData.pm25;



    /* PM10 */

    document.getElementById("pm10")
        .textContent =
        sensorData.pm10;



    /* TEMPERATURE */

    document.getElementById("temperature")
        .textContent =
        Number(sensorData.temperature)
            .toFixed(1);



    /* HUMIDITY */

    document.getElementById("humidity")
        .textContent =
        Number(sensorData.humidity)
            .toFixed(1);

}



/* ============================================================
   TEMPORARY SENSOR SIMULATION

   This is ONLY for testing the frontend.

   It randomly changes sensor values every 3 seconds.

   Once ESP32 + Raspberry Pi backend is connected,
   this function will be removed.
============================================================ */

function simulateSensorData() {


    sensorData.co2 =
        453 +
        Math.round(
            (Math.random() - 0.5) * 10
        );


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
        Math.round(
            (Math.random() - 0.5) * 4
        );


    sensorData.pm25 =
        43 +
        Math.round(
            (Math.random() - 0.5) * 4
        );


    sensorData.pm10 =
        48 +
        Math.round(
            (Math.random() - 0.5) * 4
        );


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
   CLOCK UPDATE EVERY SECOND
============================================================ */

setInterval(

    updateClock,

    1000

);



/* ============================================================
   TEMPORARY SENSOR UPDATE EVERY 3 SECONDS
============================================================ */

setInterval(

    simulateSensorData,

    3000

);



/* ============================================================
   START DASHBOARD
============================================================ */

initializeDashboard();
