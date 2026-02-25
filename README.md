# Robot Wars Visualiser

A React-based simulator for robot wars type battles, featuring multiple robot personalities competing in an arena.

## Overview

This project simulates battles between different types of robots, each with unique strategies and behaviors. Watch as robots with different personalities (Bully, Compassionate, Lazy, Stupid, etc.) compete in an arena, and track statistics across multiple battles.

## Features

- **Multiple Robot Types**: Including Bully, Compassionate, Lazy, Stupid, Very Stupid, Luke, and Cheating robots
- **Visual Battle Arena**: Real-time visualization of robot positions and battles
- **Adjustable Speed**: Control the simulation speed to watch battles unfold
- **Battle Statistics**: Track wins across multiple battles for each robot type
- **Automated Battles**: Run continuous battles to see which strategies perform best

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd RobotWarsVisualiser
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Usage

1. Start the development server (`npm run dev`)
2. Open your browser to the local development URL
3. Use the controls to:
   - Start/stop battles
   - Adjust simulation speed
   - Reset battles and statistics
   - Watch robots compete in real-time

## Project Structure

```
RobotWarsVisualiser/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Application entry point
│   ├── robots.js        # Robot class definitions and behaviors
│   └── robotWars.js     # Battle simulation logic and mediator
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **JavaScript/ES6+**: Core programming language

## Development

The project uses Vite for fast development and building. Hot Module Replacement (HMR) is enabled by default, so changes will be reflected immediately in the browser.

## License

This project is private and not licensed for public use.
