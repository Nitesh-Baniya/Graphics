export function setupControls(handlers) {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const resetBtn = document.getElementById('resetBtn');
    const speedRange = document.getElementById('speedRange');
    const speedDisplay = document.getElementById('speedDisplay');

    playBtn.onclick = handlers.onPlay;
    pauseBtn.onclick = handlers.onPause;
    nextBtn.onclick = handlers.onNext;
    prevBtn.onclick = handlers.onPrev;
    resetBtn.onclick = handlers.onReset;

    speedRange.oninput = (e) => {
        const val = e.target.value;
        speedDisplay.textContent = val;
        handlers.onSpeedChange(val);
    };
}
