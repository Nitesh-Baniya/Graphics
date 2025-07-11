# 📢 **Graphics Algorithms Simulator**

A web-based tool to visualize step-by-step execution of computer graphics algorithms on an interactive grid canvas. Built for the 5th-semester Computer Graphics course at IOE, Pulchowk Campus using HTML, CSS, and JavaScript.

## 📌 **Table of Contents**

- [Preview](#preview)

- [Features](#features)

- [Prerequisites](#prerequisites)

- [Installation](#installation)

- [Usage](#usage)

- [How It Works](#how-it-works)

- [Dependencies](#dependencies)

- [License](#license)

- [Contributing](#contributing)

## 📸 **Preview**

<div align="center">
  <img src="./assets/preview.png?raw=true" height="700"/>
</div>

## 🚀 **Features**

- **Interactive Grid Canvas**: Click to set points for algorithm visualization.

- **Algorithm Selection**: Choose DDA, Bresenham’s Line, Midpoint Circle, or Midpoint Ellipse.

- **Playback Controls**: Play, pause, step forward/backward, or reset animation.

- **Speed Adjustment**: Adjust animation speed (50ms increments, min 50ms).

- **Grid Customization**: Adjust cell size (1px increments, min 1px).

- **Coordinate Tooltip**: Hover to view cell coordinates.

- **Algorithm Info**: Displays description and pseudocode for selected algorithm.

- **Supported Algorithms**:

  - DDA Line

  - Bresenham’s Line

  - Midpoint Circle

  - Midpoint Ellipse

## ⚙ **Prerequisites**

- Modern web browser (e.g., Chrome, Firefox, Edge)

## 🔧 **Installation**

### 1️⃣ Clone the repository

```sh
git clone https://github.com/rohityadav-sas/Graphics.git

cd Graphics
```

### 2️⃣ Serve the application

Open `index.html` in a browser or use a local server:

```sh
# Example with Python
python -m http.server 8000
```

## 🔍 How It Works

- **Select Algorithm**: Choose from dropdown (DDA, Bresenham, Circle, Ellipse).

- **Set Points**:

  - **Lines**: Click two points for start/end.

  - **Circle**: Click center, then radius point.

  - **Ellipse**: Click center, then point for rx/ry.

- **Visualize**: Algorithm plots pixels step-by-step.

- **Control Animation**: Play, pause, step, or reset; adjust speed/cell size.

- **View Info**: Algorithm description and pseudocode displayed.

- **Tooltip**: Hover over grid for coordinates.

## Dependencies

- None (Pure HTML, CSS, JavaScript)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
