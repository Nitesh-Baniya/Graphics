const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const pixelSize = 20;
const marginLeft = 40;
const marginTop = 40;
const cols = Math.floor((canvas.width - marginLeft) / pixelSize);
const rows = Math.floor((canvas.height - marginTop) / pixelSize);

let zoom = 1;
let panX = 0;
let panY = 0;

export function getGridSize() {
    return { cols, rows };
}

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawGrid() {
    clearCanvas();

    // Draw gray pixel background
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            ctx.fillStyle = '#eee';
            ctx.fillRect(marginLeft + c * pixelSize, marginTop + r * pixelSize, pixelSize, pixelSize);
        }
    }

    ctx.strokeStyle = '#ccc';
    // vertical lines
    for (let c = 0; c <= cols; c++) {
        const x = marginLeft + c * pixelSize;
        ctx.beginPath();
        ctx.moveTo(x, marginTop);
        ctx.lineTo(x, marginTop + rows * pixelSize);
        ctx.stroke();
    }
    // horizontal lines
    for (let r = 0; r <= rows; r++) {
        const y = marginTop + r * pixelSize;
        ctx.beginPath();
        ctx.moveTo(marginLeft, y);
        ctx.lineTo(marginLeft + cols * pixelSize, y);
        ctx.stroke();
    }

    // Axis coordinates
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '12px Arial';

    for (let c = 0; c < cols; c++) {
        ctx.fillText(c, marginLeft + c * pixelSize + pixelSize / 2, marginTop / 2);
    }

    ctx.textAlign = 'right';
    for (let r = 0; r < rows; r++) {
        ctx.fillText(r, marginLeft / 2, marginTop + r * pixelSize + pixelSize / 2);
    }
}

export function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(marginLeft + x * pixelSize, marginTop + y * pixelSize, pixelSize, pixelSize);
    ctx.strokeStyle = '#666';
    ctx.strokeRect(marginLeft + x * pixelSize, marginTop + y * pixelSize, pixelSize, pixelSize);
}

export function getCanvas() {
    return canvas;
}
