let frameCount = 0;
let lastTime = performance.now();
const fpsHistory: number[] = [];
const historyLimit = 60;

function calculateFps() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;

    if (deltaTime > 0) {
        const fps = 1000 / deltaTime;

        fpsHistory.push(fps);
        if (fpsHistory.length > historyLimit) {
            fpsHistory.shift();
        }

        const averageFps = fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;

        postMessage({ averageFps: averageFps.toFixed(2) });
    }

    lastTime = currentTime;
    requestAnimationFrame(calculateFps);
}

requestAnimationFrame(calculateFps);

onmessage = () => {
    frameCount++;
};
