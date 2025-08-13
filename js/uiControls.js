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
		if (currentSpeed < 50) {
			// Below 50ms, increment by 10ms
			handlers.onSpeedChange(currentSpeed + 10)
		} else {
			// 50ms and above, increment by 50ms
			handlers.onSpeedChange(currentSpeed + 50)
		}

		// Re-enable decrease button if it was disabled
		if (speedDecrease.disabled) {
			speedDecrease.disabled = false
			speedDecrease.style.opacity = "1"
			speedDecrease.style.cursor = "pointer"
		}
	}

	speedDecrease.onclick = () => {
		const currentSpeed = parseInt(speedRange.textContent, 10)
		if (currentSpeed <= 10 && currentSpeed > 1) {
			// At 10ms or below, decrease by 2ms (minimum 1ms)
			const newSpeed = Math.max(1, currentSpeed - 2)
			handlers.onSpeedChange(newSpeed)

			// Disable button if we reach 1ms
			if (newSpeed === 1) {
				speedDecrease.disabled = true
				speedDecrease.style.opacity = "0.5"
				speedDecrease.style.cursor = "not-allowed"
			}
		} else if (currentSpeed <= 50 && currentSpeed > 10) {
			// Between 10ms and 50ms, decrease by 10ms
			handlers.onSpeedChange(currentSpeed - 10)
		} else if (currentSpeed > 50) {
			// Above 50ms, decrease by 50ms
			handlers.onSpeedChange(currentSpeed - 50)
		}
	}
}
