export function setupControls(handlers) {
	const playBtn = document.getElementById("playBtn")
	const pauseBtn = document.getElementById("pauseBtn")
	const nextBtn = document.getElementById("nextBtn")
	const prevBtn = document.getElementById("prevBtn")
	const resetBtn = document.getElementById("resetBtn")
	const speedRange = document.getElementById("speedRange")
	const speedIncrease = document.getElementById("speedIncrease")
	const speedDecrease = document.getElementById("speedDecrease")
	const playPauseBtn = document.getElementById("playPauseBtn")

	let isPlaying = false

	playPauseBtn.onclick = () => {
		if (isPlaying) {
			playBtn.style.opacity = "1"
			playBtn.style.height = "100%"
			playPauseBtn.style.backgroundColor = ""
			pauseBtn.style.opacity = "0"
			pauseBtn.style.zIndex = "-1"
			handlers.onPlay()
			isPlaying = false
		} else {
			playBtn.style.opacity = "0"
			playBtn.style.height = "0"
			playPauseBtn.style.backgroundColor = "rgb(63, 63, 63)"
			pauseBtn.style.opacity = "1"
			pauseBtn.style.zIndex = "1"
			handlers.onPause()
			isPlaying = true
		}
	}

	nextBtn.onclick = handlers.onNext
	prevBtn.onclick = handlers.onPrev
	resetBtn.onclick = handlers.onReset

	speedIncrease.onclick = () => {
		const currentSpeed = parseInt(speedRange.textContent, 10)
		handlers.onSpeedChange(currentSpeed + 50)
	}

	speedDecrease.onclick = () => {
		const currentSpeed = parseInt(speedRange.textContent, 10)
		if (currentSpeed > 50) {
			handlers.onSpeedChange(currentSpeed - 50)
		}
	}
}
