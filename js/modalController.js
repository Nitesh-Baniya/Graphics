let modal = null
let modalContent = null
let openModalBtn = null
let closeModalBtn = null
let isModalOpen = false
let isDragging = false
let isResizing = false
let startX = 0
let startY = 0
let initialX = 0
let initialY = 0
let resizeDirection = null
let initialWidth = 0
let initialHeight = 0

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

	// Initialize resize handles
	initResizeHandles()
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
	// Check if we're clicking on a resize handle
	if (e.target.classList.contains('resize-handle')) {
		isResizing = true
		resizeDirection = e.target.classList[1] // get the direction class (resize-n, resize-s, etc.)
		startX = e.clientX
		startY = e.clientY
		
		const rect = modalContent.getBoundingClientRect()
		initialX = rect.left
		initialY = rect.top
		initialWidth = rect.width
		initialHeight = rect.height
		
		e.preventDefault()
		return
	}
	
	// Original drag functionality
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
	if (isResizing) {
		handleResize(e)
		return
	}
	
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
	isResizing = false
	resizeDirection = null
}

export function isModalVisible() {
	return isModalOpen
}

function initResizeHandles() {
	const resizeHandles = modalContent.querySelectorAll('.resize-handle')
	resizeHandles.forEach(handle => {
		handle.addEventListener('mousedown', handleMouseDown)
	})
}

function handleResize(e) {
	e.preventDefault()
	
	const deltaX = e.clientX - startX
	const deltaY = e.clientY - startY
	
	let newWidth = initialWidth
	let newHeight = initialHeight
	let newX = initialX
	let newY = initialY
	
	switch (resizeDirection) {
		case 'resize-n':
			newHeight = initialHeight - deltaY
			newY = initialY + deltaY
			break
		case 'resize-s':
			newHeight = initialHeight + deltaY
			break
		case 'resize-e':
			newWidth = initialWidth + deltaX
			break
		case 'resize-w':
			newWidth = initialWidth - deltaX
			newX = initialX + deltaX
			break
		case 'resize-ne':
			newWidth = initialWidth + deltaX
			newHeight = initialHeight - deltaY
			newY = initialY + deltaY
			break
		case 'resize-nw':
			newWidth = initialWidth - deltaX
			newHeight = initialHeight - deltaY
			newX = initialX + deltaX
			newY = initialY + deltaY
			break
		case 'resize-se':
			newWidth = initialWidth + deltaX
			newHeight = initialHeight + deltaY
			break
		case 'resize-sw':
			newWidth = initialWidth - deltaX
			newHeight = initialHeight + deltaY
			newX = initialX + deltaX
			break
	}
	
	// Apply minimum and maximum constraints
	const minWidth = 300
	const minHeight = 200
	const maxWidth = window.innerWidth * 0.9
	const maxHeight = window.innerHeight * 0.8
	
	newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth))
	newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight))
	
	// Adjust position if we hit size limits
	if (newWidth === minWidth && (resizeDirection.includes('w'))) {
		newX = initialX + initialWidth - minWidth
	}
	if (newHeight === minHeight && (resizeDirection.includes('n'))) {
		newY = initialY + initialHeight - minHeight
	}
	
	// Apply the new dimensions and position
	modalContent.style.width = newWidth + 'px'
	modalContent.style.height = newHeight + 'px'
	modalContent.style.left = newX + 'px'
	modalContent.style.top = newY + 'px'
	modalContent.style.position = 'fixed'
	modalContent.style.transform = 'none'
}
