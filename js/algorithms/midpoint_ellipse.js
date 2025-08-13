export function getMidpointEllipsePixels(cx, cy, rx, ry) {
	const pixels = []

	let x = 0
	let y = ry

	let rxSq = rx * rx
	let rySq = ry * ry

	let dx = 2 * rySq * x
	let dy = 2 * rxSq * y

	let d1 = rySq - rxSq * ry + 0.25 * rxSq
	while (dx < dy) {
		pixels.push([cx + x, cy + y])
		pixels.push([cx - x, cy + y])
		pixels.push([cx + x, cy - y])
		pixels.push([cx - x, cy - y])

		if (d1 < 0) {
			x++
			dx = dx + 2 * rySq
			d1 = d1 + dx + rySq
		} else {
			x++
			y--
			dx = dx + 2 * rySq
			dy = dy - 2 * rxSq
			d1 = d1 + dx - dy + rySq
		}
	}

	let d2 = rySq * (x + 0.5) * (x + 0.5) + rxSq * (y - 1) * (y - 1) - rxSq * rySq
	while (y >= 0) {
		pixels.push([cx + x, cy + y])
		pixels.push([cx - x, cy + y])
		pixels.push([cx + x, cy - y])
		pixels.push([cx - x, cy - y])

		if (d2 > 0) {
			y--
			dy = dy - 2 * rxSq
			d2 = d2 + rxSq - dy
		} else {
			y--
			x++
			dx = dx + 2 * rySq
			dy = dy - 2 * rxSq
			d2 = d2 + dx - dy + rxSq
		}
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
