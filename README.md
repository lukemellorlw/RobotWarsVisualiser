# Robot Wars Visualiser

A React-based simulator for robot wars type battles, featuring multiple robot personalities competing in an arena.

## Overview

This project simulates battles between different types of robots, each with unique strategies and behaviors. Watch as robots with different personalities (Bully, Compassionate, Lazy, Stupid, etc.) compete in an arena, and track statistics across multiple battles.

## Game Rules

### Battle Mechanics

- Each robot starts with **100 health points**
- Robots take turns in a randomized order
- On each turn, a robot can distribute **up to 10 attack points** among its competitors
- Attack points directly reduce the target robot's health
- A robot is **eliminated** when its health reaches 0
- The **last robot standing** wins the battle

### Turn System

- Robots are given information about all living competitors (ID, name, and current health)
- Each robot implements a strategy in its `myTurn()` method to decide how to distribute attacks
- Robots can attack multiple opponents or focus on a single target
- **Anti-cheat**: If a robot attempts to distribute more than 10 total attack points, it forfeits its turn
- If a robot's code throws an error, it forfeits that turn

### Strategy Tips

Different robots use different strategies:
- **Bully**: Attacks the weakest robot (finish off wounded opponents)
- **Compassionate**: Attacks the strongest robot (level the playing field)
- **Lazy**: Randomly attacks one robot with full power
- **Stupid**: Randomly attacks with reduced power (6 points)
- **Cheating**: Attempts to exceed attack limits (often forfeits turns)

The best strategy depends on the mix of opponents and battle dynamics!

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

## Adding a New Robot

To add a new robot to the battle arena:

1. **Create your robot class** in [src/robots.js](src/robots.js):
   ```javascript
   export class MyNewRobot extends Robot {
     constructor() {
       super('My New Robot');
       // Add any custom initialization here
     }

     // Implement your robot's strategy
     // Override methods like attack(), defend(), etc.
   }
   ```

2. **Import the robot** in [src/App.jsx](src/App.jsx):
   ```javascript
   import {
     BullyRobot,
     // ... other robots
     MyNewRobot  // Add your robot here
   } from './robots';
   ```

3. **Add to ROBOT_CONFIGS** array in [src/App.jsx](src/App.jsx):
   ```javascript
   const ROBOT_CONFIGS = [
     // ... existing robots
     { Class: MyNewRobot, name: 'My New Robot', color: '#yourColor' }
   ];
   ```

That's it! Your robot will automatically appear in battles, statistics, and the arena. The ROBOT_CONFIGS array handles all the initialization, so you only need to add your robot in one place.

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

MIT License - feel free to use this project for learning and experimentation.
