let spawnCounter = 0;
let spawnTime = 2000;
let spawnTimeout: number | undefined;

self.onmessage = (e: MessageEvent) => {
    const { action } = e.data;

    if (action === "start") {
        startSpawning();
    } else if (action === "stop") {
        stopSpawning();
    }
};

function startSpawning() {
    spawnTimeout = setTimeout(() => {
        const x = 70 + Math.random() * 600;
        const y = -50;

        // Decidir si es un target o poison (cada 6 targets, un poison)
        const type =
            spawnCounter % 6 === 0 && spawnCounter !== 0 ? "poison" : "target";

        postMessage({ type, x, y });

        spawnCounter++;

        spawnTime = Math.max(500, spawnTime - 80);

        startSpawning();
    }, spawnTime);
}

function stopSpawning() {
    if (spawnTimeout) {
        clearTimeout(spawnTimeout);
        spawnTimeout = undefined;
    }
}