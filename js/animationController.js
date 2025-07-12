let pixels = [];
let delay = 200;
let currentStep = 1;
let isPlaying = false;
let stepCallback = null;

let curStep = document.getElementById('current-step');
let finalStep = document.getElementById('final-step');
let progressFill = document.getElementById('progress-fill');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');

export function setPixels(newPixels, callback) {
	pixels = newPixels;
	currentStep = 1;
	stepCallback = callback;
}

export function setDelay(ms) {
	delay = ms;
}

export async function play() {
	if (isPlaying) return;
	isPlaying = true;
	while (currentStep < pixels.length && isPlaying) {
		prevBtn.disabled = false;
		nextBtn.disabled = false;
		finalStep.textContent = pixels.length;
		if (stepCallback) stepCallback(currentStep, pixels[currentStep]);
		await new Promise((r) => setTimeout(r, delay));
		currentStep++;
		curStep.textContent = currentStep;
		progressFill.style.width = `${(currentStep / pixels.length) * 100}%`;
		if (currentStep === pixels.length) {
			nextBtn.disabled = true;
		} else {
			nextBtn.disabled = false;
		}
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
		curStep.textContent = currentStep;
		progressFill.style.width = `${(currentStep / pixels.length) * 100}%`;
		if (currentStep === pixels.length) {
			nextBtn.disabled = true;
		} else {
			nextBtn.disabled = false;
		}
		prevBtn.disabled = false;
	}
}

export function prevStep() {
	if (currentStep > 0) {
		currentStep--;
		if (stepCallback) stepCallback(currentStep - 1, pixels[currentStep - 1]);
		curStep.textContent = currentStep;
		progressFill.style.width = `${(currentStep / pixels.length) * 100}%`;
		if (currentStep == 0) {
			prevBtn.disabled = true;
		} else {
			prevBtn.disabled = false;
		}
		nextBtn.disabled = false;
	}
}

export function reset() {
	isPlaying = false;
	currentStep = 0;
	pixels = [];
	if (stepCallback) stepCallback(null, null);
	curStep.textContent = '0';
	finalStep.textContent = '0';
	progressFill.style.width = '0%';
	prevBtn.disabled = true;
	nextBtn.disabled = true;
}
