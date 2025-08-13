let modal = null
let modalContent = null
let openModalBtn = null
let closeModalBtn = null
let isModalOpen = false
let isDragging = false
let startX = 0
let startY = 0
let initialX = 0
let initialY = 0

export function initModal() {
	modal = document.getElementById("controlsModal")
	modalContent = document.querySelector(".modal-content")
	openModalBtn = document.getElementById("openModal")
	closeModalBtn = document.getElementById("closeModal")

	openModalBtn.addEventListener("click", openModal)
	closeModalBtn.addEventListener("click", closeModal)

	modalContent.addEventListener("mousedown", handleMouseDown)
	document.addEventListener("mousemove", handleMouseMove)
	document.addEventListener("mouseup", handleMouseUp)
}

export function showFloatingButton() {
	if (openModalBtn) {
		openModalBtn.style.display = "flex"
	}
}

export function hideFloatingButton() {
	if (openModalBtn) {
		openModalBtn.style.display = "none"
	}
}

export function openModal() {
	if (modal) {
		modal.style.display = "flex"
		isModalOpen = true
		positionModalAtBottom()
	}
}

export function closeModal() {
	if (modal) {
		modal.style.display = "none"
		isModalOpen = false
	}
}

function positionModalAtBottom() {
	if (modalContent) {
		modalContent.style.transform = "none"
		modalContent.style.left = "50%"
		modalContent.style.bottom = "30px"
		modalContent.style.top = "auto"
		modalContent.style.position = "fixed"
		modalContent.style.transform = "translateX(-50%)"
	}
}

function handleMouseDown(e) {
	if (e.target.closest(".modal-header") || e.target.closest(".modal-title")) {
		isDragging = true
		startX = e.clientX
		startY = e.clientY

		const rect = modalContent.getBoundingClientRect()
		initialX = rect.left
		initialY = rect.top

		modalContent.style.position = "fixed"
		modalContent.style.transform = "none"
		modalContent.style.left = initialX + "px"
		modalContent.style.top = initialY + "px"

		e.preventDefault()
	}
}

function handleMouseMove(e) {
	if (!isDragging) return

	e.preventDefault()

	const deltaX = e.clientX - startX
	const deltaY = e.clientY - startY

	const newX = initialX + deltaX
	const newY = initialY + deltaY

	const maxX = window.innerWidth - modalContent.offsetWidth
	const maxY = window.innerHeight - modalContent.offsetHeight

	const constrainedX = Math.max(0, Math.min(newX, maxX))
	const constrainedY = Math.max(0, Math.min(newY, maxY))

	modalContent.style.left = constrainedX + "px"
	modalContent.style.top = constrainedY + "px"
}

function handleMouseUp() {
	isDragging = false
}

export function isModalVisible() {
	return isModalOpen
}
