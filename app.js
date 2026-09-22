/* ============================================================
   AIR QUALITY MONITORING DEVICE
   FRONTEND JAVASCRIPT
============================================================ */


/* ============================================================
   SENSOR DATA
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
   AQI HISTORY
============================================================ */

/*
   Temporary AQI history for frontend testing.

   Later this will come from:

   ESP32
      ↓
   UART
      ↓
   Raspberry Pi
      ↓
   Python
      ↓
   JavaScript
*/

let aqiHistory = [

    82,
    86,
    91,
    88,
    95,
    101,
    98,
    104,
    108,
    105,
    112,
    115,
    111,
    119

];



/* ============================================================
   CLOCK
============================================================ */

function updateClock() {

    const now = new Date();


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



    /* CARBON DIOXIDE */

    document.getElementById("co2")
        .textContent =
        sensorData.co2;



    /* SULFUR DIOXIDE */

    document.getElementById("so2")
        .textContent =
        Number(sensorData.so2)
            .toFixed(2);



    /* NITROGEN DIOXIDE */

    document.getElementById("no2")
        .textContent =
        Number(sensorData.no2)
            .toFixed(2);



    /* CARBON MONOXIDE */

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



    /* UPDATE AQI GRAPH */

    updateAQIGraph();

}



/* ============================================================
   AQI GRAPH
============================================================ */

function updateAQIGraph() {

    const graphLine =
        document.getElementById("aqiGraphLine");

    const graphArea =
        document.getElementById("aqiGraphArea");

    const graphPoint =
        document.getElementById("aqiGraphPoint");


    if (!graphLine || !graphArea || !graphPoint) {

        return;

    }


    /*
       SVG graph dimensions.
    */

    const graphWidth = 500;

    const graphHeight = 180;


    const topPadding = 12;

    const bottomPadding = 12;


    const usableHeight =
        graphHeight -
        topPadding -
        bottomPadding;


    /*
       Fixed AQI display range.

       0 → 200
    */

    const minAQI = 0;

    const maxAQI = 200;


    /*
       Create graph points.
    */

    const points = [];


    const totalPoints =
        aqiHistory.length;


    if (totalPoints === 1) {

        const value =
            Math.max(
                minAQI,
                Math.min(
                    maxAQI,
                    aqiHistory[0]
                )
            );


        const x = graphWidth / 2;


        const y =
            graphHeight -
            bottomPadding -
            (
                (
                    value - minAQI
                ) /
                (
                    maxAQI - minAQI
                )
            ) *
            usableHeight;


        points.push(`${x},${y}`);

    }
    else {

        aqiHistory.forEach(
            (value, index) => {

                const safeValue =
                    Math.max(
                        minAQI,
                        Math.min(
                            maxAQI,
                            Number(value)
                        )
                    );


                const x =
                    (
                        index /
                        (totalPoints - 1)
                    ) *
                    graphWidth;


                const y =
                    graphHeight -
                    bottomPadding -
                    (
                        (
                            safeValue - minAQI
                        ) /
                        (
                            maxAQI - minAQI
                        )
                    ) *
                    usableHeight;


                points.push(`${x},${y}`);

            }
        );

    }


    /*
       Draw line.
    */

    const pointsString =
        points.join(" ");


    graphLine.setAttribute(
        "points",
        pointsString
    );


    /*
       Draw filled area underneath
       the line.
    */

    const lastPoint =
        points[points.length - 1]
            .split(",");


    const firstPoint =
        points[0]
            .split(",");


    const areaPath =

        `M ${firstPoint[0]} ${firstPoint[1]} ` +

        points
            .slice(1)
            .map(
                point => {

                    const [x, y] =
                        point.split(",");

                    return `L ${x} ${y}`;

                }
            )
            .join(" ") +

        ` L ${lastPoint[0]} ${graphHeight - bottomPadding}` +

        ` L ${firstPoint[0]} ${graphHeight - bottomPadding}` +

        ` Z`;


    graphArea.setAttribute(
        "d",
        areaPath
    );


    /*
       Move current point.
    */

    graphPoint.setAttribute(
        "cx",
        lastPoint[0]
    );


    graphPoint.setAttribute(
        "cy",
        lastPoint[1]
    );

}



/* ============================================================
   TEMPORARY SENSOR SIMULATION
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



    /*
       Simulate AQI movement.
    */

    const change =
        Math.round(
            (Math.random() - 0.5) * 10
        );


    let newAQI =
        sensorData.aqi +
        change;


    /*
       Keep the temporary AQI
       between 20 and 180.
    */

    newAQI =
        Math.max(
            20,
            Math.min(
                180,
                newAQI
            )
        );


    sensorData.aqi =
        newAQI;


    /*
       Add current AQI to history.
    */

    aqiHistory.push(
        sensorData.aqi
    );


    /*
       Keep the graph at
       20 recent readings.
    */

    if (aqiHistory.length > 20) {

        aqiHistory.shift();

    }


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
   CLOCK
============================================================ */

setInterval(

    updateClock,

    1000

);



/* ============================================================
   SENSOR + AQI UPDATE
============================================================ */

setInterval(

    simulateSensorData,

    3000

);



/* ============================================================
   START
============================================================ */

initializeDashboard();
