export function getMidpointCirclePixels(cx, cy, radius) {
	const pixels = []
	let x = 0
	let y = radius
	let d = 1 - radius

	function plotCirclePoints(cx, cy, x, y) {
		pixels.push([cx + x, cy + y])
		pixels.push([cx - x, cy + y])
		pixels.push([cx + x, cy - y])
		pixels.push([cx - x, cy - y])
		pixels.push([cx + y, cy + x])
		pixels.push([cx - y, cy + x])
		pixels.push([cx + y, cy - x])
		pixels.push([cx - y, cy - x])
	}

	plotCirclePoints(cx, cy, x, y)

	while (x < y) {
		x++
		if (d < 0) {
			d += 2 * x + 1
		} else {
			y--
			d += 2 * (x - y) + 1
		}
		plotCirclePoints(cx, cy, x, y)
	}

	const uniquePixels = []
	const set = new Set()
	for (const p of pixels) {
		const key = `${p[0]},${p[1]}`
		if (!set.has(key)) {
			set.add(key)
			uniquePixels.push(p)
		}
	}

	return uniquePixels
}
