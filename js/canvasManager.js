const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let pixelSize = 40
const marginLeft = 40
const marginTop = 40
let cols, rows

// Function to resize canvas based on container
function resizeCanvas() {
	// Get the computed dimensions from CSS
	const rect = canvas.getBoundingClientRect()
	const width = rect.width || 800
	const height = rect.height || 600

	// Set canvas internal dimensions
	canvas.width = width
	canvas.height = height

	// Recalculate grid dimensions
	cols = Math.floor((width - marginLeft) / pixelSize)
	rows = Math.floor((height - marginTop) / pixelSize)
}

// Initialize canvas dimensions
function initCanvas() {
	resizeCanvas()
	// Initial grid draw
	if (cols && rows) {
		drawGrid()
	}
}

// Wait for DOM to be fully loaded
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initCanvas)
} else {
	initCanvas()
}

// Add resize event listener
window.addEventListener("resize", () => {
	setTimeout(() => {
		resizeCanvas()
		drawGrid()
	}, 100) // Small delay to ensure layout is complete
})

let cellIncrease = document.getElementById("cellIncrease")
let cellDecrease = document.getElementById("cellDecrease")
let cellSize = document.getElementById("cellSize")

let onCellSizeChangeCallback = null

cellIncrease.addEventListener("click", () => {
	let size = parseInt(cellSize.textContent)
	cellSize.textContent = size + 1
	pixelSize = size + 1
	setCellSize(pixelSize)
})

cellDecrease.addEventListener("click", () => {
	let size = parseInt(cellSize.textContent)
	if (size > 1) {
		cellSize.textContent = size - 1
	}
	pixelSize = size - 1
	setCellSize(pixelSize)
})

export function getCellSize() {
	return pixelSize
}

export function setCellSize(size) {
	pixelSize = size
	cols = Math.floor((canvas.width - marginLeft) / pixelSize)
	rows = Math.floor((canvas.height - marginTop) / pixelSize)
	drawGrid()

	if (onCellSizeChangeCallback) {
		onCellSizeChangeCallback()
	}
}

export function setOnCellSizeChangeCallback(callback) {
	onCellSizeChangeCallback = callback
}

export function getGridSize() {
	return { cols, rows }
}

export function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export function drawGrid() {
	clearCanvas()

	for (let c = 0; c < cols; c++) {
		for (let r = 0; r < rows; r++) {
			ctx.fillStyle = "#eee"
			ctx.fillRect(
				marginLeft + c * pixelSize,
				marginTop + r * pixelSize,
				pixelSize,
				pixelSize
			)
		}
	}

	ctx.strokeStyle = "#ccc"
	for (let c = 0; c <= cols; c++) {
		const x = marginLeft + c * pixelSize
		ctx.beginPath()
		ctx.moveTo(x, marginTop)
		ctx.lineTo(x, marginTop + rows * pixelSize)
		ctx.stroke()
	}
	for (let r = 0; r <= rows; r++) {
		const y = marginTop + r * pixelSize
		ctx.beginPath()
		ctx.moveTo(marginLeft, y)
		ctx.lineTo(marginLeft + cols * pixelSize, y)
		ctx.stroke()
	}

	ctx.fillStyle = "black"
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	ctx.font = "12px Arial"

	for (let c = 0; c < cols; c++) {
		ctx.fillText(c, marginLeft + c * pixelSize + pixelSize / 2, marginTop / 2)
	}

	ctx.textAlign = "center"
	for (let r = 0; r < rows; r++) {
		ctx.fillText(r, marginLeft / 2, marginTop + r * pixelSize + pixelSize / 2)
	}
}

export function drawPixel(x, y, color) {
	ctx.fillStyle = color
	ctx.fillRect(
		marginLeft + x * pixelSize,
		marginTop + y * pixelSize,
		pixelSize,
		pixelSize
	)
	ctx.strokeStyle = "#666"
	ctx.strokeRect(
		marginLeft + x * pixelSize,
		marginTop + y * pixelSize,
		pixelSize,
		pixelSize
	)
}

export function getCanvas() {
	return canvas
}
