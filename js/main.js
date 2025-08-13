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

	if (startPoint) CanvasMgr.drawPixel(startPoint.x, startPoint.y, "green")
	if (endPoint) CanvasMgr.drawPixel(endPoint.x, endPoint.y, "blue")

	for (let i = 0; i < step; i++) {
		const [x, y] = currentPixels[i]
		CanvasMgr.drawPixel(x, y, "black")
	}

	if (currentPixel) {
		const [x, y] = currentPixel
		CanvasMgr.drawPixel(x, y, "red")
	}
}

function redrawCurrentState() {
	const currentAnimationStep = AnimationCtrl.getCurrentStep()

	const { cols, rows } = CanvasMgr.getGridSize()

	if (startPoint && (startPoint.x >= cols || startPoint.y >= rows)) {
		reset()
		return
	}

	if (endPoint && (endPoint.x >= cols || endPoint.y >= rows)) {
		endPoint = null
		currentPixels = []
		AnimationCtrl.reset()
		redraw()
		return
	}

	if (currentPixels.length > 0) {
		const validPixels = currentPixels.filter(([x, y]) => x < cols && y < rows)

		if (validPixels.length !== currentPixels.length && startPoint && endPoint) {
			runAlgorithm()
		} else {
			redraw(currentAnimationStep || currentPixels.length)
		}
	} else {
		redraw()
	}
}

function runAlgorithm() {
	if (!startPoint || !endPoint) return

	currentAlgo = algoElement.textContent

	if (currentAlgo === "DDA Line") {
		currentPixels = getDDAPixels(
			startPoint.x,
			startPoint.y,
			endPoint.x,
			endPoint.y
		)
	} else if (currentAlgo === "Bresenham Line") {
		currentPixels = getBresenhamPixels(
			startPoint.x,
			startPoint.y,
			endPoint.x,
			endPoint.y
		)
	} else if (currentAlgo === "Midpoint Circle") {
		const radius = Math.abs(endPoint.x - startPoint.x)
		currentPixels = getMidpointCirclePixels(startPoint.x, startPoint.y, radius)
	} else if (currentAlgo === "Midpoint Ellipse") {
		currentPixels = getMidpointEllipsePixels(
			startPoint.x,
			startPoint.y,
			Math.abs(endPoint.x - startPoint.x),
			Math.abs(endPoint.y - startPoint.y)
		)
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
		return
	}

	if (!startPoint) {
		startPoint = { x, y }
		CanvasMgr.drawPixel(x, y, "green")
	} else if (!endPoint) {
		endPoint = { x, y }
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

CanvasMgr.setOnCellSizeChangeCallback(redrawCurrentState)

CanvasMgr.drawGrid()
