const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

let pixelSize = 40
const marginLeft = 40
const marginTop = 40
let cols = Math.floor((canvas.width - marginLeft) / pixelSize)
let rows = Math.floor((canvas.height - marginTop) / pixelSize)

let cellIncrease = document.getElementById("cellIncrease")
let cellDecrease = document.getElementById("cellDecrease")
let cellSize = document.getElementById("cellSize")

// Callback function to be called when cell size changes
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

	// Call the callback to redraw current state if it exists
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

	// Draw gray pixel background
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
	// vertical lines
	for (let c = 0; c <= cols; c++) {
		const x = marginLeft + c * pixelSize
		ctx.beginPath()
		ctx.moveTo(x, marginTop)
		ctx.lineTo(x, marginTop + rows * pixelSize)
		ctx.stroke()
	}
	// horizontal lines
	for (let r = 0; r <= rows; r++) {
		const y = marginTop + r * pixelSize
		ctx.beginPath()
		ctx.moveTo(marginLeft, y)
		ctx.lineTo(marginLeft + cols * pixelSize, y)
		ctx.stroke()
	}

	// Axis coordinates
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
