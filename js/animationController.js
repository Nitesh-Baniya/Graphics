let pixels = [];
let delay = 200;
let currentStep = 0;
let isPlaying = false;
let stepCallback = null;

export function setPixels(newPixels, callback) {
    pixels = newPixels;
    currentStep = 0;
    stepCallback = callback;
}

export function setDelay(ms) {
    delay = ms;
}

export async function play() {
    if (isPlaying) return;
    isPlaying = true;
    while (currentStep < pixels.length && isPlaying) {
        if (stepCallback) stepCallback(currentStep, pixels[currentStep]);
        await new Promise(r => setTimeout(r, delay));
        currentStep++;
    }
    isPlaying = false;
}

export function pause() {
    isPlaying = false;
}

export function nextStep() {
    if (currentStep < pixels.length) {
        if (stepCallback) stepCallback(currentStep, pixels[currentStep]);
        currentStep++;
    }
}

export function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        if (stepCallback) stepCallback(currentStep, pixels[currentStep]);
    }
}

export function reset() {
    isPlaying = false;
    currentStep = 0;
    pixels = [];
    if (stepCallback) stepCallback(null, null);
}
