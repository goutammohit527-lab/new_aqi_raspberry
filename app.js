/* =========================================================
   API
   ========================================================= */

const API_URL = "/api/data";


/* =========================================================
   ELEMENTS
   ========================================================= */

const connectionDot =
    document.getElementById("connectionDot");

const connectionText =
    document.getElementById("connectionText");

const aqiValue =
    document.getElementById("aqiValue");

const aqiStatus =
    document.getElementById("aqiStatus");

const currentGraphLabel =
    document.getElementById("currentGraphLabel");

const aqiGraphLine =
    document.getElementById("aqiGraphLine");

const aqiGraphDots =
    document.getElementById("aqiGraphDots");

const aqiGraphPoint =
    document.getElementById("aqiGraphPoint");

const aqiGraphPointPulse =
    document.getElementById("aqiGraphPointPulse");

const dateDisplay =
    document.getElementById("dateDisplay");

const clockDisplay =
    document.getElementById("clockDisplay");


/* =========================================================
   SENSOR ELEMENTS
   ========================================================= */

const sensorElements = {

    co2: document.getElementById("co2"),

    tvoc: document.getElementById("tvoc"),

    no2: document.getElementById("no2"),

    co: document.getElementById("co"),

    pm1_0: document.getElementById("pm1_0"),

    pm2_5: document.getElementById("pm2_5"),

    pm10: document.getElementById("pm10"),

    ch2o: document.getElementById("ch2o"),

    o3: document.getElementById("o3"),

    temperature:
        document.getElementById("temperature"),

    humidity:
        document.getElementById("humidity")
};


/* =========================================================
   AQI HISTORY
   ========================================================= */

const aqiHistory = [];

const MAX_HISTORY = 30;


/* =========================================================
   CONNECTION STATUS
   ========================================================= */

function setConnectionStatus(connected) {

    if (connected) {

        connectionDot.classList.remove(
            "disconnected"
        );

        connectionDot.classList.add(
            "connected"
        );

        connectionText.textContent =
            "SENSOR CONNECTED";

    } else {

        connectionDot.classList.remove(
            "connected"
        );

        connectionDot.classList.add(
            "disconnected"
        );

        connectionText.textContent =
            "SENSOR DISCONNECTED";
    }
}


/* =========================================================
   DISPLAY VALUE
   ========================================================= */

function displayValue(element, value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        element.textContent = "--";

        return;
    }

    element.textContent = value;
}


/* =========================================================
   UPDATE SENSOR VALUES
   ========================================================= */

function updateSensors(data) {

    displayValue(
        sensorElements.co2,
        data.co2
    );

    displayValue(
        sensorElements.tvoc,
        data.tvoc
    );

    displayValue(
        sensorElements.no2,
        data.no2
    );

    displayValue(
        sensorElements.co,
        data.co
    );

    displayValue(
        sensorElements.pm1_0,
        data.pm1_0
    );

    displayValue(
        sensorElements.pm2_5,
        data.pm2_5
    );

    displayValue(
        sensorElements.pm10,
        data.pm10
    );

    displayValue(
        sensorElements.ch2o,
        data.ch2o
    );

    displayValue(
        sensorElements.o3,
        data.o3
    );

    displayValue(
        sensorElements.temperature,
        data.temperature
    );

    displayValue(
        sensorElements.humidity,
        data.humidity
    );
}


/* =========================================================
   AQI STATUS
   ========================================================= */

function getAQIStatus(aqi) {

    if (
        aqi === undefined ||
        aqi === null ||
        isNaN(aqi)
    ) {

        return "WAITING FOR SENSOR";
    }


    if (aqi <= 50) {
        return "GOOD";
    }

    if (aqi <= 100) {
        return "MODERATE";
    }

    if (aqi <= 150) {
        return "UNHEALTHY FOR SENSITIVE GROUPS";
    }

    if (aqi <= 200) {
        return "UNHEALTHY";
    }

    if (aqi <= 300) {
        return "VERY UNHEALTHY";
    }

    return "HAZARDOUS";
}


/* =========================================================
   UPDATE AQI
   ========================================================= */

function updateAQI(value) {

    if (
        value === undefined ||
        value === null ||
        isNaN(value)
    ) {

        aqiValue.textContent = "--";

        aqiStatus.textContent =
            "WAITING FOR SENSOR";

        currentGraphLabel.textContent =
            "--";

        return;
    }


    const numericValue =
        Number(value);


    aqiValue.textContent =
        Math.round(numericValue);


    aqiStatus.textContent =
        getAQIStatus(numericValue);


    currentGraphLabel.textContent =
        Math.round(numericValue);


    addAQIHistory(numericValue);
}


/* =========================================================
   AQI HISTORY
   ========================================================= */

function addAQIHistory(value) {

    if (
        value === undefined ||
        value === null ||
        isNaN(value)
    ) {

        return;
    }


    aqiHistory.push(Number(value));


    if (aqiHistory.length > MAX_HISTORY) {

        aqiHistory.shift();
    }


    drawAQIGraph();
}


/* =========================================================
   DRAW AQI GRAPH
   ========================================================= */

function drawAQIGraph() {

    if (aqiHistory.length === 0) {

        return;
    }


    const width = 500;

    const height = 180;


    const maxValue =
        Math.max(
            100,
            ...aqiHistory
        );


    const minValue = 0;


    const points = [];


    aqiHistory.forEach(
        (value, index) => {

            let x;


            if (aqiHistory.length === 1) {

                x = width / 2;

            } else {

                x =
                    (index /
                        (aqiHistory.length - 1)
                    ) * width;
            }


            const normalized =
                (value - minValue) /
                (maxValue - minValue);


            const y =
                height -
                (
                    normalized *
                    height
                );


            points.push(
                `${x},${y}`
            );
        }
    );


    aqiGraphLine.setAttribute(
        "points",
        points.join(" ")
    );


    drawGraphDots(
        aqiHistory,
        width,
        height,
        maxValue
    );


    const lastIndex =
        aqiHistory.length - 1;

    const lastValue =
        aqiHistory[lastIndex];


    let lastX;

    if (aqiHistory.length === 1) {

        lastX = width / 2;

    } else {

        lastX =
            (
                lastIndex /
                (aqiHistory.length - 1)
            ) * width;
    }


    const normalizedLast =
        lastValue / maxValue;


    const lastY =
        height -
        (
            normalizedLast *
            height
        );


    aqiGraphPoint.setAttribute(
        "cx",
        lastX
    );

    aqiGraphPoint.setAttribute(
        "cy",
        lastY
    );

    aqiGraphPoint.setAttribute(
        "opacity",
        "1"
    );


    aqiGraphPointPulse.setAttribute(
        "cx",
        lastX
    );

    aqiGraphPointPulse.setAttribute(
        "cy",
        lastY
    );

    aqiGraphPointPulse.setAttribute(
        "opacity",
        "0.5"
    );
}


/* =========================================================
   GRAPH DOTS
   ========================================================= */

function drawGraphDots(
    values,
    width,
    height,
    maxValue
) {

    aqiGraphDots.innerHTML = "";


    values.forEach(
        (value, index) => {

            let x;


            if (values.length === 1) {

                x = width / 2;

            } else {

                x =
                    (
                        index /
                        (values.length - 1)
                    ) * width;
            }


            const y =
                height -
                (
                    (value / maxValue) *
                    height
                );


            const circle =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            circle.setAttribute(
                "cx",
                x
            );

            circle.setAttribute(
                "cy",
                y
            );

            circle.setAttribute(
                "r",
                "2.5"
            );

            circle.setAttribute(
                "fill",
                "currentColor"
            );

            circle.setAttribute(
                "opacity",
                "0.75"
            );


            aqiGraphDots.appendChild(
                circle
            );
        }
    );
}


/* =========================================================
   GET SENSOR DATA
   ========================================================= */

async function getSensorData() {

    try {

        const response =
            await fetch(
                API_URL,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const data =
            await response.json();


        setConnectionStatus(true);


        updateSensors(data);


        updateAQI(data.aqi);


    } catch (error) {

        console.error(
            "Sensor API error:",
            error
        );


        setConnectionStatus(false);


        Object.values(sensorElements)
            .forEach(
                element => {

                    element.textContent =
                        "--";
                }
            );


        aqiValue.textContent =
            "--";

        aqiStatus.textContent =
            "SENSOR DISCONNECTED";

        currentGraphLabel.textContent =
            "--";
    }
}


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const now =
        new Date();


    const day =
        String(
            now.getDate()
        ).padStart(2, "0");


    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");


    const year =
        now.getFullYear();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    dateDisplay.textContent =
        `${day}/${month}/${year}`;


    clockDisplay.textContent =
        `${hours}:${minutes}:${seconds}`;
}


/* =========================================================
   START CLOCK
   ========================================================= */

updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================================================
   START SENSOR UPDATES
   ========================================================= */

getSensorData();

setInterval(
    getSensorData,
    2000
);
