export function getDDAPixels(x1, y1, x2, y2) {
    const pixels = [];

    const dx = x2 - x1;
    const dy = y2 - y1;

    const steps = Math.max(Math.abs(dx), Math.abs(dy));

    const xInc = dx / steps;
    const yInc = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        pixels.push([Math.round(x), Math.round(y)]);
        x += xInc;
        y += yInc;
    }

    return pixels;
}
