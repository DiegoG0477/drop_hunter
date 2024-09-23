self.onmessage = (e) => {
    const { deltaX, maxSpeed, deltaTime } = e.data;

    if (Math.abs(deltaX) > maxSpeed * deltaTime / 1000) {
        const newPos = Math.sign(deltaX) * maxSpeed * deltaTime / 1000;
        postMessage({ newPos });
    } else {
        postMessage({ newPos: deltaX });
    }
};