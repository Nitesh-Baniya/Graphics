const tooltip = document.getElementById('tooltip');

export function showTooltip(x, y, content) {
	tooltip.style.left = `${x - 38}px`;
	tooltip.style.top = `${y - 38}px`;
	tooltip.innerHTML = content;
	tooltip.style.display = 'block';
}

export function hideTooltip() {
	tooltip.style.display = 'none';
}
