const tooltip = document.getElementById('tooltip');

export function showTooltip(x, y, content) {
    tooltip.style.left = x + 15 + 'px';
    tooltip.style.top = y + 15 + 'px';
    tooltip.style.display = 'block';
    tooltip.innerHTML = content;
}

export function hideTooltip() {
    tooltip.style.display = 'none';
}
