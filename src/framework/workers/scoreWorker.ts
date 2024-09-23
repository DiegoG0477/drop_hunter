self.onmessage = (e: MessageEvent) => {
    const { catcher, increment } = e.data;

    let newScore = 0;

    const randomNumber = Math.random() * 100;

    if (randomNumber === 1){
        const randomIncrement = Math.floor(Math.random() * 61) + 10;

        newScore = catcher.score + randomIncrement;
    } 

    newScore = catcher.score + increment;

    self.postMessage({ newScore });
};