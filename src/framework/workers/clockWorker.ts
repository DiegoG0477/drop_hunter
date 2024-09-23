let timeElapsed = 0; // in seconds
let interval: number | undefined;

self.onmessage = (e: MessageEvent) => {
    const { action } = e.data;

    if (action === "start") {
        startClock();
    } else if (action === "stop") {
        stopClock();
    } else if (action === "reset") {
        resetClock();
    }
};

function startClock() {
    if (!interval) {
        interval = setInterval(() => {
            timeElapsed++;
            const minutes = Math.floor(timeElapsed / 60);
            const seconds = timeElapsed % 60;
            postMessage({ minutes, seconds });
        }, 1000);
    }
}

function stopClock() {
    if (interval) {
        clearInterval(interval);
        interval = undefined;
    }
}

function resetClock() {
    stopClock();
    timeElapsed = 0;
    postMessage({ minutes: 0, seconds: 0 });
}
