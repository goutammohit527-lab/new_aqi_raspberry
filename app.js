/* ============================================================
   AIR QUALITY MONITORING DEVICE
   RAILWAY PLATFORM DISPLAY
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
   LAST 6 HOURS
============================================================ */

let aqiHistory = [

    82,
    91,
    86,
    103,
    97,
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


    document.getElementById("aqiValue")
        .textContent =
        Math.round(sensorData.aqi);


    document.getElementById("co2")
        .textContent =
        Math.round(sensorData.co2);


    document.getElementById("so2")
        .textContent =
        Number(sensorData.so2)
            .toFixed(2);


    document.getElementById("no2")
        .textContent =
        Number(sensorData.no2)
            .toFixed(2);


    document.getElementById("co")
        .textContent =
        Number(sensorData.co)
            .toFixed(2);


    document.getElementById("pm15")
        .textContent =
        Math.round(sensorData.pm15);


    document.getElementById("pm25")
        .textContent =
        Math.round(sensorData.pm25);


    document.getElementById("pm10")
        .textContent =
        Math.round(sensorData.pm10);


    document.getElementById("temperature")
        .textContent =
        Number(sensorData.temperature)
            .toFixed(1);


    document.getElementById("humidity")
        .textContent =
        Number(sensorData.humidity)
            .toFixed(1);


    updateAQIGraph();

}



/* ============================================================
   AQI GRAPH
============================================================ */

function updateAQIGraph() {


    const graphLine =
        document.getElementById(
            "aqiGraphLine"
        );


    const graphArea =
        document.getElementById(
            "aqiGraphArea"
        );


    const graphPoint =
        document.getElementById(
            "aqiGraphPoint"
        );


    const graphLabel =
        document.getElementById(
            "currentGraphLabel"
        );


    if (
        !graphLine ||
        !graphArea ||
        !graphPoint
    ) {

        return;

    }



    /* --------------------------------------------------------
       GRAPH DIMENSIONS
    -------------------------------------------------------- */

    const graphWidth = 600;

    const graphHeight = 220;

    const topPadding = 5;

    const bottomPadding = 5;


    const usableHeight =
        graphHeight -
        topPadding -
        bottomPadding;



    /* --------------------------------------------------------
       AQI SCALE
       0 TO 200
    -------------------------------------------------------- */

    const minAQI = 0;

    const maxAQI = 200;



    /* --------------------------------------------------------
       CREATE GRAPH POINTS
    -------------------------------------------------------- */

    const points = [];

    const totalPoints =
        aqiHistory.length;


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


            let x;


            if (totalPoints === 1) {

                x =
                    graphWidth / 2;

            }
            else {

                x =
                    (
                        index /
                        (totalPoints - 1)
                    ) *
                    graphWidth;

            }



            const y =
                graphHeight -
                bottomPadding -
                (
                    (
                        safeValue -
                        minAQI
                    ) /
                    (
                        maxAQI -
                        minAQI
                    )
                ) *
                usableHeight;



            points.push({

                x: x,

                y: y,

                value: safeValue

            });

        }
    );



    /* --------------------------------------------------------
       DRAW LINE
    -------------------------------------------------------- */

    const pointString =
        points
            .map(
                point =>
                    `${point.x},${point.y}`
            )
            .join(" ");


    graphLine.setAttribute(
        "points",
        pointString
    );



    /* --------------------------------------------------------
       DRAW AREA
    -------------------------------------------------------- */

    if (points.length > 0) {


        const first =
            points[0];


        const last =
            points[
                points.length - 1
            ];


        let areaPath =
            `M ${first.x} ${first.y}`;


        for (
            let i = 1;
            i < points.length;
            i++
        ) {

            areaPath +=
                ` L ${points[i].x} ${points[i].y}`;

        }


        areaPath +=
            ` L ${last.x} ${graphHeight}`;


        areaPath +=
            ` L ${first.x} ${graphHeight}`;


        areaPath +=
            ` Z`;


        graphArea.setAttribute(
            "d",
            areaPath
        );



        /* ----------------------------------------------------
           CURRENT POINT
        ---------------------------------------------------- */

        graphPoint.setAttribute(
            "cx",
            last.x
        );


        graphPoint.setAttribute(
            "cy",
            last.y
        );



        /* ----------------------------------------------------
           CURRENT GRAPH LABEL
        ---------------------------------------------------- */

        if (graphLabel) {

            graphLabel.textContent =
                `AQI ${Math.round(last.value)}`;

        }

    }

}



/* ============================================================
   TEMPORARY SENSOR SIMULATION
   REMOVE WHEN REAL ESP32 DATA IS CONNECTED
============================================================ */

function simulateSensorData() {


    /* CO2 */

    sensorData.co2 =
        453 +
        Math.round(
            (Math.random() - 0.5) * 12
        );



    /* SO2 */

    sensorData.so2 =
        Math.max(
            0,
            0.02 +
            (Math.random() - 0.5) *
            0.006
        );



    /* NO2 */

    sensorData.no2 =
        Math.max(
            0,
            0.69 +
            (Math.random() - 0.5) *
            0.06
        );



    /* CO */

    sensorData.co =
        Math.max(
            0,
            0.50 +
            (Math.random() - 0.5) *
            0.05
        );



    /* PM1.5 */

    sensorData.pm15 =
        Math.max(
            0,
            35 +
            Math.round(
                (Math.random() - 0.5) * 5
            )
        );



    /* PM2.5 */

    sensorData.pm25 =
        Math.max(
            0,
            43 +
            Math.round(
                (Math.random() - 0.5) * 5
            )
        );



    /* PM10 */

    sensorData.pm10 =
        Math.max(
            0,
            48 +
            Math.round(
                (Math.random() - 0.5) * 5
            )
        );



    /* TEMPERATURE */

    sensorData.temperature =
        31.6 +
        (Math.random() - 0.5) *
        0.5;



    /* HUMIDITY */

    sensorData.humidity =
        74.8 +
        (Math.random() - 0.5) *
        1.2;



    /* AQI */

    const change =
        Math.round(
            (Math.random() - 0.5) *
            12
        );


    let newAQI =
        sensorData.aqi +
        change;


    newAQI =
        Math.max(
            10,
            Math.min(
                190,
                newAQI
            )
        );


    sensorData.aqi =
        newAQI;



    /* ADD NEW AQI READING */

    aqiHistory.push(
        sensorData.aqi
    );



    /* KEEP ONLY LAST 7 READINGS */

    if (
        aqiHistory.length > 7
    ) {

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
   SENSOR UPDATE
============================================================ */

setInterval(

    simulateSensorData,

    3000

);



/* ============================================================
   START
============================================================ */

initializeDashboard();
