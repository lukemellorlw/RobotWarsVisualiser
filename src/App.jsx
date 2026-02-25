import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Mediator } from './robotWars';
import {
  BullyRobot,
  CompassionateRobot,
  LazyRobot,
  StupidRobot,
  VeryStupidRobot,
  Luke,
  CheatingRobot
} from './robots';

// Robot configuration - add new robots here
const ROBOT_CONFIGS = [
  { Class: BullyRobot, name: 'Bully Robot', color: '#ef4444' },
  { Class: CheatingRobot, name: 'Cheating Robot', color: '#8b5cf6' },
  { Class: CompassionateRobot, name: 'Compassionate Robot', color: '#06b6d4' },
  { Class: LazyRobot, name: 'Lazy Robot', color: '#f59e0b' },
  { Class: Luke, name: 'Luke', color: '#10b981' },
  { Class: StupidRobot, name: 'Stupid Robot', color: '#ec4899' },
  { Class: VeryStupidRobot, name: 'Very Stupid Robot', color: '#6366f1' }
];

function App() {
  const [mediator, setMediator] = useState(null);
  const [robots, setRobots] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [battleNumber, setBattleNumber] = useState(0);
  const [stats, setStats] = useState(
    ROBOT_CONFIGS.reduce((acc, { name }) => ({ ...acc, [name]: 0 }), {})
  );
  const [totalBattles, setTotalBattles] = useState(0);
  const intervalRef = useRef(null);

  const initializeBattle = () => {
    const newMediator = new Mediator(
      ROBOT_CONFIGS.map(({ Class }) => new Class())
    );
    setMediator(newMediator);
    setRobots([...newMediator.robots]);
  };

  useEffect(() => {
    initializeBattle();
  }, []);

  useEffect(() => {
    if (isRunning && mediator) {
      intervalRef.current = setInterval(() => {
        if (mediator.getAliveCount() > 1) {
          mediator.nextTurn();
          setRobots([...mediator.robots]);
        } else {
          const winner = mediator.getWinner();
          if (winner) {
            setStats(prev => ({
              ...prev,
              [winner.name]: prev[winner.name] + 1
            }));
            setTotalBattles(prev => prev + 1);
          }
          setIsRunning(false);
          clearInterval(intervalRef.current);
        }
      }, speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mediator, speed]);

  const startBattle = () => {
    if (mediator && mediator.getAliveCount() <= 1) {
      initializeBattle();
      setTimeout(() => setIsRunning(true), 100);
    } else {
      setIsRunning(true);
    }
  };

  const pauseBattle = () => {
    setIsRunning(false);
  };

  const resetBattle = () => {
    setIsRunning(false);
    initializeBattle();
  };

  const resetStats = () => {
    setStats(
      ROBOT_CONFIGS.reduce((acc, { name }) => ({ ...acc, [name]: 0 }), {})
    );
    setTotalBattles(0);
  };

  const runMultipleBattles = async (count) => {
    setIsRunning(false);
    for (let i = 0; i < count; i++) {
      const testMediator = new Mediator(
        ROBOT_CONFIGS.map(({ Class }) => new Class())
      );

      while (testMediator.getAliveCount() > 1) {
        testMediator.nextTurn();
      }

      const winner = testMediator.getWinner();
      if (winner) {
        setStats(prev => ({
          ...prev,
          [winner.name]: prev[winner.name] + 1
        }));
        setTotalBattles(prev => prev + 1);
        setBattleNumber(i + 1);
      }

      // Small delay to update UI
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    setBattleNumber(0);
    initializeBattle();
  };

  const getHealthColor = (health) => {
    if (health > 66) return '#4ade80';
    if (health > 33) return '#fbbf24';
    if (health > 0) return '#f87171';
    return '#6b7280';
  };

  const getRobotColor = (name) => {
    const config = ROBOT_CONFIGS.find(c => c.name === name);
    return config ? config.color : '#6b7280';
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🤖 Robot Wars Visualizer</h1>
      </header>

      <div className="controls">
        <div className="control-group">
          <button onClick={startBattle} disabled={isRunning}>
            ▶️ Start
          </button>
          <button onClick={pauseBattle} disabled={!isRunning}>
            ⏸️ Pause
          </button>
          <button onClick={resetBattle} disabled={isRunning}>
            🔄 Reset Battle
          </button>
        </div>

        <div className="control-group">
          <label>
            Speed:
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isRunning}
            />
            <span>{speed}ms</span>
          </label>
        </div>

        <div className="control-group">
          <button onClick={() => runMultipleBattles(100)} disabled={isRunning}>
            Run 100 Battles
          </button>
          <button onClick={() => runMultipleBattles(1000)} disabled={isRunning}>
            Run 1000 Battles
          </button>
        </div>
      </div>

      {battleNumber > 0 && (
        <div className="running-battles">
          Running battle {battleNumber}...
        </div>
      )}

      <div className="arena">
        <h2>Battle Arena</h2>
        <div className="robots-grid">
          {robots.map((robot) => (
            <div
              key={robot.id}
              className={`robot-card ${robot.health <= 0 ? 'dead' : ''}`}
              style={{ borderColor: getRobotColor(robot.name) }}
            >
              <div className="robot-header">
                <h3>{robot.name}</h3>
                <span className="health-value">{Math.max(0, robot.health)} HP</span>
              </div>
              <div className="health-bar-container">
                <div
                  className="health-bar"
                  style={{
                    width: `${Math.max(0, robot.health)}%`,
                    backgroundColor: getHealthColor(robot.health)
                  }}
                />
              </div>
              {robot.health <= 0 && <div className="dead-overlay">💀 ELIMINATED</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="statistics">
        <div className="stats-header">
          <h2>Battle Statistics</h2>
          <button onClick={resetStats} className="reset-stats-btn">
            Clear Stats
          </button>
        </div>
        <p className="total-battles">Total Battles: {totalBattles}</p>
        <div className="stats-grid">
          {Object.entries(stats)
            .sort((a, b) => b[1] - a[1])
            .map(([name, wins]) => (
              <div key={name} className="stat-card">
                <div className="stat-header">
                  <span
                    className="stat-color"
                    style={{ backgroundColor: getRobotColor(name) }}
                  />
                  <span className="stat-name">{name}</span>
                </div>
                <div className="stat-wins">{wins} wins</div>
                {totalBattles > 0 && (
                  <div className="stat-percentage">
                    {((wins / totalBattles) * 100).toFixed(1)}%
                  </div>
                )}
                <div className="stat-bar-container">
                  <div
                    className="stat-bar"
                    style={{
                      width: totalBattles > 0 ? `${(wins / totalBattles) * 100}%` : '0%',
                      backgroundColor: getRobotColor(name)
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
