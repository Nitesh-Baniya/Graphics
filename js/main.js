import * as CanvasMgr from './canvasManager.js';
import * as AnimationCtrl from './animationController.js';
import * as Tooltip from './tooltip.js';
import * as UIControls from './uiControls.js';
import * as Sidebar from './sidebar.js';
import { getDDAPixels } from './algorithms/dda.js';
import { getBresenhamPixels } from './algorithms/bresenham.js';
import { getMidpointCirclePixels } from './algorithms/midpoint_circle.js';
import { getMidpointEllipsePixels } from './algorithms/midpoint_ellipse.js';

const canvas = CanvasMgr.getCanvas();
const { cols, rows } = CanvasMgr.getGridSize();

let startPoint = null;
let endPoint = null;
let currentPixels = [];
let currentAlgo = 'dda';

function redraw(step = 0, currentPixel = null) {
    CanvasMgr.drawGrid();

    // Draw start/end points
    if (startPoint) CanvasMgr.drawPixel(startPoint.x, startPoint.y, 'green');
    if (endPoint) CanvasMgr.drawPixel(endPoint.x, endPoint.y, 'blue');

    // Draw drawn pixels
    for (let i = 0; i < step; i++) {
        const [x, y] = currentPixels[i];
        CanvasMgr.drawPixel(x, y, 'black');
    }

    // Draw current processing pixel
    if (currentPixel) {
        const [x, y] = currentPixel;
        CanvasMgr.drawPixel(x, y, 'red');
    }
}

function runAlgorithm() {
    if (!startPoint || !endPoint) return;

    currentAlgo = document.getElementById('algorithm').value;
    Sidebar.updateAlgorithmInfo(currentAlgo);

    if (currentAlgo === 'dda') {
        currentPixels = getDDAPixels(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    } else if (currentAlgo === 'bresenham') {
        currentPixels = getBresenhamPixels(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    } else if (currentAlgo === 'circle') {
        // for circle: startPoint = center, endPoint.x = radius, ignore endPoint.y
        if (startPoint && endPoint) {
            const radius = Math.abs(endPoint.x - startPoint.x);
            currentPixels = getMidpointCirclePixels(startPoint.x, startPoint.y, radius);
        } else {
            currentPixels = [];
        }
    } else if (currentAlgo === 'ellipse') {
        // for ellipse: startPoint=center, endPoint.x=rx, endPoint.y=ry
        if (startPoint && endPoint) {
            currentPixels = getMidpointEllipsePixels(startPoint.x, startPoint.y, Math.abs(endPoint.x - startPoint.x), Math.abs(endPoint.y - startPoint.y));
        } else {
            currentPixels = [];
        }
    }

    AnimationCtrl.setPixels(currentPixels, (step, pixel) => {
        redraw(step, pixel);
        Sidebar.updateStepInfo(`Step: ${step + 1} / ${currentPixels.length} <br> Pixel: (${pixel ? pixel[0] : '-'}, ${pixel ? pixel[1] : '-'})`);
    });

    AnimationCtrl.play();
}

function reset() {
    startPoint = null;
    endPoint = null;
    currentPixels = [];
    AnimationCtrl.reset();
    CanvasMgr.drawGrid();
    Sidebar.updateStepInfo('');
}

UIControls.setupControls({
    onPlay: () => AnimationCtrl.play(),
    onPause: () => AnimationCtrl.pause(),
    onNext: () => AnimationCtrl.nextStep(),
    onPrev: () => AnimationCtrl.prevStep(),
    onReset: () => reset(),
    onSpeedChange: (val) => AnimationCtrl.setDelay(val),
});

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left - 40) / 20);
    const y = Math.floor((e.clientY - rect.top - 40) / 20);

    if (x < 0 || y < 0 || x >= cols || y >= rows) return;

    if (!startPoint) {
        startPoint = { x, y };
    } else if (!endPoint) {
        endPoint = { x, y };
        runAlgorithm();
    } else {
        startPoint = { x, y };
        endPoint = null;
        currentPixels = [];
        AnimationCtrl.reset();
        redraw();
    }
});

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left - 40) / 20);
    const y = Math.floor((e.clientY - rect.top - 40) / 20);

    if (x < 0 || y < 0 || x >= cols || y >= rows) {
        Tooltip.hideTooltip();
    } else {
        // Tooltip position relative to canvas rect
        const tooltipX = e.clientX;
        const tooltipY = e.clientY;
        Tooltip.showTooltip(tooltipX, tooltipY, `(${x}, ${y})`);
    }
});


canvas.addEventListener('mouseleave', () => {
    Tooltip.hideTooltip();
});

// Initial draw
CanvasMgr.drawGrid();
Sidebar.updateAlgorithmInfo('dda');
