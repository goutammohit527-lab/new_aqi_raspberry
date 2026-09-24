```javascript
/* ============================================================
   ZPHS01B AIR QUALITY DASHBOARD
   RASPBERRY PI FRONTEND
   REAL SENSOR DATA ONLY
============================================================ */


/* ============================================================
   SENSOR DATA
============================================================ */

let sensorData = {

    connected: false,

    aqi: null,

    pm1_0: null,
    pm2_5: null,
    pm10: null,

    co2: null,
    tvoc: null,

    temperature: null,
    humidity: null,

    ch2o: null,
    co: null,
    o3: null,
    no2: null,

    last_update: null

};


/* ============================================================
   AQI HISTORY
============================================================ */

let aqiHistory = [];

const MAX_HISTORY = 7;


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


    const dateElement =
        document.getElementById("date");


    const timeElement =
        document.getElementById("time");


    if (dateElement) {

        dateElement.textContent =
            dateString;

    }


    if (timeElement) {

        timeElement.textContent =
            timeString;

    }

}


/* ============================================================
   FORMAT VALUE
============================================================ */

function displayValue(
    value,
    decimals = 0
) {

    if (
        value === null ||
        value === undefined ||
        value === "" ||
        !Number.isFinite(
            Number(value)
        )
    ) {

        return "--";

    }


    return Number(value)
        .toFixed(decimals);

}


/* ============================================================
   CONNECTION STATUS
============================================================ */

function updateConnectionStatus() {

    const title =
        document.querySelector(
            ".connection-title"
        );


    const subtitle =
        document.querySelector(
            ".connection-subtitle"
        );


    const dot =
        document.querySelector(
            ".connection-dot"
        );


    if (
        !title ||
        !subtitle ||
        !dot
    ) {

        return;

    }


    if (sensorData.connected) {

        title.textContent =
            "Connected";


        subtitle.textContent =
            "ZPHS01B Online";


        dot.style.background =
            "#26f57a";


        dot.style.boxShadow =
            "0 0 15px #26f57a";

    }

    else {

        title.textContent =
            "Disconnected";


        subtitle.textContent =
            "ZPHS01B Offline";


        dot.style.background =
            "#ff4d4d";


        dot.style.boxShadow =
            "0 0 15px #ff4d4d";

    }

}


/* ============================================================
   UPDATE DASHBOARD
============================================================ */

function updateDashboard() {


    /* --------------------------------------------------------
       AQI
    -------------------------------------------------------- */

    const aqiElement =
        document.getElementById(
            "aqiValue"
        );


    if (aqiElement) {

        aqiElement.textContent =
            displayValue(
                sensorData.aqi,
                0
            );

    }


    /* --------------------------------------------------------
       PM1.0
    -------------------------------------------------------- */

    const pm1Element =
        document.getElementById(
            "pm1_0"
        );


    if (pm1Element) {

        pm1Element.textContent =
            displayValue(
                sensorData.pm1_0,
                0
            );

    }


    /* --------------------------------------------------------
       PM2.5
    -------------------------------------------------------- */

    const pm25Element =
        document.getElementById(
            "pm25"
        );


    if (pm25Element) {

        pm25Element.textContent =
            displayValue(
                sensorData.pm2_5,
                0
            );

    }


    /* --------------------------------------------------------
       PM10
    -------------------------------------------------------- */

    const pm10Element =
        document.getElementById(
            "pm10"
        );


    if (pm10Element) {

        pm10Element.textContent =
            displayValue(
                sensorData.pm10,
                0
            );

    }


    /* --------------------------------------------------------
       CO2
    -------------------------------------------------------- */

    const co2Element =
        document.getElementById(
            "co2"
        );


    if (co2Element) {

        co2Element.textContent =
            displayValue(
                sensorData.co2,
                0
            );

    }


    /* --------------------------------------------------------
       TVOC
    -------------------------------------------------------- */

    const tvocElement =
        document.getElementById(
            "tvoc"
        );


    if (tvocElement) {

        tvocElement.textContent =
            displayValue(
                sensorData.tvoc,
                0
            );

    }


    /* --------------------------------------------------------
       CO
    -------------------------------------------------------- */

    const coElement =
        document.getElementById(
            "co"
        );


    if (coElement) {

        coElement.textContent =
            displayValue(
                sensorData.co,
                1
            );

    }


    /* --------------------------------------------------------
       CH2O
    -------------------------------------------------------- */

    const ch2oElement =
        document.getElementById(
            "ch2o"
        );


    if (ch2oElement) {

        ch2oElement.textContent =
            displayValue(
                sensorData.ch2o,
                3
            );

    }


    /* --------------------------------------------------------
       O3
    -------------------------------------------------------- */

    const o3Element =
        document.getElementById(
            "o3"
        );


    if (o3Element) {

        o3Element.textContent =
            displayValue(
                sensorData.o3,
                2
            );

    }


    /* --------------------------------------------------------
       NO2
    -------------------------------------------------------- */

    const no2Element =
        document.getElementById(
            "no2"
        );


    if (no2Element) {

        no2Element.textContent =
            displayValue(
                sensorData.no2,
                2
            );

    }


    /* --------------------------------------------------------
       TEMPERATURE
    -------------------------------------------------------- */

    const temperatureElement =
        document.getElementById(
            "temperature"
        );


    if (temperatureElement) {

        temperatureElement.textContent =
            displayValue(
                sensorData.temperature,
                1
            );

    }


    /* --------------------------------------------------------
       HUMIDITY
    -------------------------------------------------------- */

    const humidityElement =
        document.getElementById(
            "humidity"
        );


    if (humidityElement) {

        humidityElement.textContent =
            displayValue(
                sensorData.humidity,
                1
            );

    }


    /* --------------------------------------------------------
       LAST UPDATE
    -------------------------------------------------------- */

    const lastUpdatedElement =
        document.getElementById(
            "lastUpdated"
        );


    if (lastUpdatedElement) {

        if (sensorData.last_update) {

            const date =
                new Date(
                    sensorData.last_update
                        .replace(" ", "T")
                );


            if (
                !Number.isNaN(
                    date.getTime()
                )
            ) {

                lastUpdatedElement.textContent =
                    date.toLocaleTimeString(
                        "en-IN",
                        {

                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false

                        }
                    );

            }

            else {

                lastUpdatedElement.textContent =
                    sensorData.last_update;

            }

        }

        else {

            lastUpdatedElement.textContent =
                "--";

        }

    }


    updateConnectionStatus();

    updateAQIGraph();

}


/* ============================================================
   AQI COLOR
============================================================ */

function aqiSeverityColor(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "#6f8ca5";

    }


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


/* ============================================================
   CREATE SMOOTH GRAPH PATH
============================================================ */

function buildSmoothPath(
    points
) {

    if (
        points.length === 0
    ) {

        return "";

    }


    if (
        points.length === 1
    ) {

        return (
            `M ${points[0].x} ` +
            `${points[0].y}`
        );

    }


    let d =
        `M ${points[0].x} ` +
        `${points[0].y}`;


    for (
        let i = 0;
        i < points.length - 1;
        i++
    ) {

        const p0 =
            points[i - 1] ||
            points[i];


        const p1 =
            points[i];


        const p2 =
            points[i + 1];


        const p3 =
            points[i + 2] ||
            p2;


        const cp1x =
            p1.x +
            (p2.x - p0.x) / 6;


        const cp1y =
            p1.y +
            (p2.y - p0.y) / 6;


        const cp2x =
            p2.x -
            (p3.x - p1.x) / 6;


        const cp2y =
            p2.y -
            (p3.y - p1.y) / 6;


        d +=
            ` C ${cp1x} ${cp1y}, ` +
            `${cp2x} ${cp2y}, ` +
            `${p2.x} ${p2.y}`;

    }


    return d;

}


/* ============================================================
   UPDATE AQI GRAPH
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


    if (
        aqiHistory.length === 0
    ) {

        graphLine.setAttribute(
            "d",
            ""
        );


        graphArea.setAttribute(
            "d",
            ""
        );


        if (graphDots) {

            graphDots.innerHTML =
                "";

        }


        return;

    }


    const graphWidth = 600;

    const graphHeight = 220;

    const topPadding = 5;

    const bottomPadding = 5;


    const usableHeight =
        graphHeight -
        topPadding -
        bottomPadding;


    const minAQI = 0;

    const maxAQI = 200;


    const points = [];


    const totalPoints =
        aqiHistory.length;


    aqiHistory.forEach(
        (
            value,
            index
        ) => {

            const safeValue =
                Math.max(
                    minAQI,
                    Math.min(
                        maxAQI,
                        Number(value)
                    )
                );


            let x;


            if (
                totalPoints === 1
            ) {

                x =
                    graphWidth / 2;

            }

            else {

                x =
                    (
                        index /
                        (
                            totalPoints -
                            1
                        )
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


    const linePath =
        buildSmoothPath(
            points
        );


    graphLine.setAttribute(
        "d",
        linePath
    );


    const first =
        points[0];


    const last =
        points[
            points.length - 1
        ];


    let areaPath =
        linePath;


    areaPath +=
        ` L ${last.x} ` +
        `${graphHeight}`;


    areaPath +=
        ` L ${first.x} ` +
        `${graphHeight}`;


    areaPath +=
        " Z";


    graphArea.setAttribute(
        "d",
        areaPath
    );


    /* --------------------------------------------------------
       GRAPH DOTS
    -------------------------------------------------------- */

    if (graphDots) {

        graphDots.innerHTML =
            "";


        points.forEach(
            (
                point,
                index
            ) => {

                if (
                    index ===
                    points.length - 1
                ) {

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
                    "0.8"
                );


                graphDots.appendChild(
                    dot
                );

            }
        );

    }


    /* --------------------------------------------------------
       CURRENT POINT
    -------------------------------------------------------- */

    const liveColor =
        aqiSeverityColor(
            last.value
        );


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


    if (graphLabel) {

        graphLabel.textContent =
            `AQI ${Math.round(
                last.value
            )}`;


        graphLabel.style.color =
            liveColor;


        graphLabel.style.borderColor =
            liveColor;

    }

}


/* ============================================================
   READ DATA FROM RASPBERRY PI
============================================================ */

async function readSensorData() {

    try {

        const response =
            await fetch(
                "/api/data",
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "API request failed"
            );

        }


        const data =
            await response.json();


        /* ----------------------------------------------------
           IMPORTANT:
           DATA COMES DIRECTLY FROM PYTHON BACKEND.
           NO RANDOM VALUES ARE CREATED HERE.
        ---------------------------------------------------- */

        sensorData =
            data;


        /* ----------------------------------------------------
           ADD ONLY REAL AQI VALUES
        ---------------------------------------------------- */

        if (
            sensorData.connected === true &&
            sensorData.aqi !== null &&
            sensorData.aqi !== undefined &&
            Number.isFinite(
                Number(
                    sensorData.aqi
                )
            )
        ) {

            aqiHistory.push(
                Number(
                    sensorData.aqi
                )
            );


            if (
                aqiHistory.length >
                MAX_HISTORY
            ) {

                aqiHistory.shift();

            }

        }


        updateDashboard();

    }

    catch (error) {

        console.error(
            "Unable to read sensor data:",
            error
        );


        sensorData.connected =
            false;


        updateConnectionStatus();

    }

}


/* ============================================================
   STARTUP
============================================================ */

function initializeDashboard() {

    updateClock();

    updateDashboard();

    readSensorData();

}


/* ============================================================
   CLOCK UPDATE
============================================================ */

setInterval(
    updateClock,
    1000
);


/* ============================================================
   SENSOR UPDATE
   Every 2 seconds
============================================================ */

setInterval(
    readSensorData,
    2000
);


/* ============================================================
   START APPLICATION
============================================================ */

initializeDashboard();
```
