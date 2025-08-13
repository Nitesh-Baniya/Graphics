import * as CanvasMgr from "./canvasManager.js"
import * as AnimationCtrl from "./animationController.js"
import * as Tooltip from "./tooltip.js"
import * as UIControls from "./uiControls.js"
import { getDDAPixels } from "./algorithms/dda.js"
import { getBresenhamPixels } from "./algorithms/bresenham.js"
import { getMidpointCirclePixels } from "./algorithms/midpoint_circle.js"
import { getMidpointEllipsePixels } from "./algorithms/midpoint_ellipse.js"

let algoElement = document.querySelector(".current-algo")

algoElement.addEventListener("change", (e) => {
	currentAlgo = e.target.value
	Sidebar.updateAlgorithmInfo(currentAlgo)
	reset()
})

const canvas = CanvasMgr.getCanvas()
const { cols, rows } = CanvasMgr.getGridSize()

let startPoint = null
let endPoint = null
let currentPixels = []
let currentAlgo = "dda"

function redraw(step = 0, currentPixel = null) {
	CanvasMgr.drawGrid()

	// Draw start/end points
	if (startPoint) CanvasMgr.drawPixel(startPoint.x, startPoint.y, "green")
	if (endPoint) CanvasMgr.drawPixel(endPoint.x, endPoint.y, "blue")

	// Draw drawn pixels
	for (let i = 0; i < step; i++) {
		const [x, y] = currentPixels[i]
		CanvasMgr.drawPixel(x, y, "black")
	}

	// Draw current processing pixel
	if (currentPixel) {
		const [x, y] = currentPixel
		CanvasMgr.drawPixel(x, y, "red")
	}
}

function redrawCurrentState() {
	// Get current animation step from animation controller
	const currentAnimationStep = AnimationCtrl.getCurrentStep()

	// Get current grid size to validate coordinates
	const { cols, rows } = CanvasMgr.getGridSize()

	// Validate start and end points against new grid size
	if (startPoint && (startPoint.x >= cols || startPoint.y >= rows)) {
		// If start point is outside new grid, reset
		reset()
		return
	}

	if (endPoint && (endPoint.x >= cols || endPoint.y >= rows)) {
		// If end point is outside new grid, reset end point and pixels
		endPoint = null
		currentPixels = []
		AnimationCtrl.reset()
		redraw()
		return
	}

	// If we have pixels and animation is in progress, redraw with current step
	if (currentPixels.length > 0) {
		// Filter out any pixels that are outside the new grid bounds
		const validPixels = currentPixels.filter(([x, y]) => x < cols && y < rows)

		// If some pixels are now invalid, we need to recalculate
		if (validPixels.length !== currentPixels.length && startPoint && endPoint) {
			// Recalculate the algorithm with current start and end points
			runAlgorithm()
		} else {
			redraw(currentAnimationStep || currentPixels.length)
		}
	} else {
		// Just redraw the grid and any start/end points
		redraw()
	}
}

function runAlgorithm() {
	if (!startPoint || !endPoint) return

	currentAlgo = algoElement.textContent
	console.log(`Running algorithm: ${currentAlgo}`)

	if (currentAlgo === "DDA Line") {
		currentPixels = getDDAPixels(
			startPoint.x,
			startPoint.y,
			endPoint.x,
			endPoint.y
		)
		console.log(`DDA pixels: ${JSON.stringify(currentPixels)}`)
	} else if (currentAlgo === "Bresenham Line") {
		currentPixels = getBresenhamPixels(
			startPoint.x,
			startPoint.y,
			endPoint.x,
			endPoint.y
		)
		console.log(`Bresenham pixels: ${JSON.stringify(currentPixels)}`)
	} else if (currentAlgo === "Midpoint Circle") {
		// for circle: startPoint = center, endPoint.x = radius, ignore endPoint.y
		const radius = Math.abs(endPoint.x - startPoint.x)
		currentPixels = getMidpointCirclePixels(startPoint.x, startPoint.y, radius)
		console.log(`Midpoint Circle pixels: ${JSON.stringify(currentPixels)}`)
	} else if (currentAlgo === "Midpoint Ellipse") {
		// for ellipse: startPoint=center, endPoint.x=rx, endPoint.y=ry
		currentPixels = getMidpointEllipsePixels(
			startPoint.x,
			startPoint.y,
			Math.abs(endPoint.x - startPoint.x),
			Math.abs(endPoint.y - startPoint.y)
		)
		console.log(`Midpoint Ellipse pixels: ${JSON.stringify(currentPixels)}`)
	}

	AnimationCtrl.setPixels(currentPixels, (step, pixel) => {
		redraw(step, pixel)
	})

	AnimationCtrl.play()
}

function reset() {
	startPoint = null
	endPoint = null
	currentPixels = []
	AnimationCtrl.reset()
	CanvasMgr.drawGrid()
}

UIControls.setupControls({
	onPlay: () => AnimationCtrl.play(),
	onPause: () => AnimationCtrl.pause(),
	onNext: () => AnimationCtrl.nextStep(),
	onPrev: () => AnimationCtrl.prevStep(),
	onReset: () => reset(),
	onSpeedChange: (val) => AnimationCtrl.setDelay(val),
})

canvas.addEventListener("click", (e) => {
	const rect = canvas.getBoundingClientRect()
	const x = Math.floor((e.clientX - rect.left - 40) / CanvasMgr.getCellSize())
	const y = Math.floor((e.clientY - rect.top - 40) / CanvasMgr.getCellSize())

	if (
		x < 0 ||
		y < 0 ||
		x >= CanvasMgr.getGridSize().cols ||
		y >= CanvasMgr.getGridSize().rows
	) {
		console.log("Clicked outside grid area")
		return
	}

	if (!startPoint) {
		startPoint = { x, y }
		CanvasMgr.drawPixel(x, y, "green")
		console.log(`Start point set to (${x}, ${y})`)
	} else if (!endPoint) {
		endPoint = { x, y }
		console.log(`End point set to (${x}, ${y})`)
		runAlgorithm()
	} else {
		startPoint = { x, y }
		endPoint = null
		currentPixels = []
		AnimationCtrl.reset()
		redraw()
	}
})

canvas.addEventListener("mousemove", (e) => {
	const rect = canvas.getBoundingClientRect()
	const x = Math.floor((e.clientX - rect.left - 40) / CanvasMgr.getCellSize())
	const y = Math.floor((e.clientY - rect.top - 40) / CanvasMgr.getCellSize())
	if (
		x < 0 ||
		y < 0 ||
		x >= CanvasMgr.getGridSize().cols ||
		y >= CanvasMgr.getGridSize().rows
	) {
		Tooltip.hideTooltip()
		canvas.style.cursor = "default"
	} else {
		const tooltipX = e.pageX
		const tooltipY = e.pageY
		canvas.style.cursor = "pointer"
		Tooltip.showTooltip(tooltipX, tooltipY, `(${x}, ${y})`)
	}
})

canvas.addEventListener("mouseleave", () => {
	Tooltip.hideTooltip()
})

// Set up callback for when cell size changes
CanvasMgr.setOnCellSizeChangeCallback(redrawCurrentState)

CanvasMgr.drawGrid()
