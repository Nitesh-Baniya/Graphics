# Graphics Algorithms Simulator

This is a web-based interactive tool designed to visualize the step-by-step execution of fundamental computer graphics algorithms. It was developed as a 5th-semester project for the Computer Graphics course at IOE, Pulchowk Campus.

The application provides a grid-based canvas where users can see how algorithms like DDA, Bresenham's, Midpoint Circle, and Midpoint Ellipse plot pixels to form shapes.

## Features

*   **Interactive Visualization:** Click on the grid to define points and see the algorithms in action.
*   **Algorithm Selection:** Choose from a list of implemented graphics algorithms.
*   **Playback Controls:**
    *   Play/Pause the animation.
    *   Step through the algorithm one step at a time (Next/Previous).
    *   Reset the canvas.
*   **Speed Control:** Adjust the animation speed to better understand the process.
*   **Grid Customization:** Change the cell size of the grid for better viewing.
*   **Coordinate Tooltip:** Hover over the grid to see the coordinates of each cell.
*   **Algorithm Information:** View a description and pseudocode for the currently selected algorithm.

## Algorithms Implemented

The simulator currently supports the following algorithms:

1.  **DDA Line Algorithm**
2.  **Bresenham's Line Algorithm**
3.  **Midpoint Circle Algorithm**
4.  **Midpoint Ellipse Algorithm**

## How to Use

1.  Open the `index.html` file in a modern web browser.
2.  Select an algorithm from the "Algorithm" dropdown menu.
3.  Follow the on-screen prompts to select points on the grid:
    *   **For Lines (DDA, Bresenham):** Click two points on the grid to define the start and end of the line.
    *   **For Midpoint Circle:** Click to set the center, then click a second point to determine the radius.
    *   **For Midpoint Ellipse:** Click to set the center, then click a second point to define the radii (rx and ry).
4.  The algorithm will automatically run and visualize the drawing process.
5.  Use the playback controls to play, pause, step through, or reset the animation.
6.  Adjust the speed and cell size using the controls at the top.

## Project Structure

The project is organized into the following files and directories:

```
.
├── css/
│   └── style.css           # All styles for the application
├── js/
│   ├── algorithms/
│   │   ├── bresenham.js      # Bresenham's Line algorithm logic
│   │   ├── dda.js            # DDA Line algorithm logic
│   │   ├── midpoint_circle.js # Midpoint Circle algorithm logic
│   │   └── midpoint_ellipse.js# Midpoint Ellipse algorithm logic
│   ├── algorithm.json        # Descriptions and pseudocode for algorithms
│   ├── animationController.js# Handles playback (play, pause, step)
│   ├── canvasManager.js      # Manages the canvas, grid, and drawing
│   ├── main.js               # Main script, event handling, and app logic
│   ├── tooltip.js            # Manages the coordinate tooltip
│   └── uiControls.js         # Connects UI buttons to their actions
├── index.html                # The main HTML file
└── README.md                 # This file
```

## Author

*   [Your Name] - [Your Email/GitHub Profile]
