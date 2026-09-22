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

function aqiSeverityColor(value) {

    if (value <= 50) {
        return "#26f57a";
    }

    if (value <= 100) {
        return "#ffd21e";
    }

    if (value <= 150) {
        return "#ff9f1e";
    }

    if (value <= 200) {
        return "#ff5f4d";
    }

    return "#ff2f6b";

}



function buildSmoothPath(points) {

    if (points.length === 0) {
        return "";
    }

    if (points.length === 1) {
        return `M ${points[0].x} ${points[0].y}`;
    }

    let d =
        `M ${points[0].x} ${points[0].y}`;

    for (
        let i = 0;
        i < points.length - 1;
        i++
    ) {

        const p0 =
            points[i - 1] || points[i];

        const p1 = points[i];

        const p2 = points[i + 1];

        const p3 =
            points[i + 2] || p2;

        const cp1x =
            p1.x + (p2.x - p0.x) / 6;

        const cp1y =
            p1.y + (p2.y - p0.y) / 6;

        const cp2x =
            p2.x - (p3.x - p1.x) / 6;

        const cp2y =
            p2.y - (p3.y - p1.y) / 6;

        d +=
            ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;

    }

    return d;

}



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


    const graphPointPulse =
        document.getElementById(
            "aqiGraphPointPulse"
        );


    const graphDots =
        document.getElementById(
            "aqiGraphDots"
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
       DRAW SMOOTH LINE
    -------------------------------------------------------- */

    const linePath =
        buildSmoothPath(points);


    graphLine.setAttribute(
        "d",
        linePath
    );



    /* --------------------------------------------------------
       DRAW SMOOTH AREA
    -------------------------------------------------------- */

    if (points.length > 0) {


        const first =
            points[0];


        const last =
            points[
                points.length - 1
            ];


        let areaPath =
            linePath;


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
           SEVERITY COLOR OF LATEST READING
        ---------------------------------------------------- */

        const liveColor =
            aqiSeverityColor(
                last.value
            );



        /* ----------------------------------------------------
           HISTORY DOTS
        ---------------------------------------------------- */

        if (graphDots) {

            graphDots.innerHTML = "";

            points.forEach(
                (point, index) => {


                    const isLast =
                        index ===
                        points.length - 1;

                    if (isLast) {
                        return;
                    }


                    const dot =
                        document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "circle"
                        );


                    dot.setAttribute(
                        "class",
                        "graph-point"
                    );

                    dot.setAttribute(
                        "cx",
                        point.x
                    );

                    dot.setAttribute(
                        "cy",
                        point.y
                    );

                    dot.setAttribute(
                        "r",
                        4.5
                    );

                    dot.setAttribute(
                        "stroke",
                        aqiSeverityColor(
                            point.value
                        )
                    );

                    dot.setAttribute(
                        "opacity",
                        0.55 +
                        (
                            0.35 *
                            (
                                index /
                                Math.max(
                                    1,
                                    points.length - 1
                                )
                            )
                        )
                    );


                    graphDots.appendChild(
                        dot
                    );

                }
            );

        }



        /* ----------------------------------------------------
           CURRENT POINT + PULSE
        ---------------------------------------------------- */

        graphPoint.setAttribute(
            "cx",
            last.x
        );


        graphPoint.setAttribute(
            "cy",
            last.y
        );


        graphPoint.setAttribute(
            "stroke",
            liveColor
        );


        graphPoint.style.filter =
            `drop-shadow(0 0 10px ${liveColor})`;


        if (graphPointPulse) {

            graphPointPulse.setAttribute(
                "cx",
                last.x
            );

            graphPointPulse.setAttribute(
                "cy",
                last.y
            );

            graphPointPulse.setAttribute(
                "stroke",
                liveColor
            );

        }



        /* ----------------------------------------------------
           CURRENT GRAPH LABEL
        ---------------------------------------------------- */

        if (graphLabel) {

            graphLabel.textContent =
                `AQI ${Math.round(last.value)}`;

            graphLabel.style.color =
                liveColor;

            graphLabel.style.borderColor =
                liveColor;

            graphLabel.style.boxShadow =
                `0 0 14px ${liveColor}66`;

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
