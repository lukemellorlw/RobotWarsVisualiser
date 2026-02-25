// RobotAction class
export class RobotAction {
  constructor(id, name, health) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.attacks = 0;
  }
}

// Robot class
export class Robot {
  constructor(id, name, robotImplementation, health = 100) {
    this.id = id;
    this.name = name;
    this.robotImplementation = robotImplementation;
    this.health = health;
    this.lastTurn = Date.now();
  }
}

// Mediator class
export class Mediator {
  constructor(robots) {
    this.robots = [];
    const tempRobots = robots.map(r => new Robot(
      this.generateId(),
      r.getName(),
      r,
      100
    ));

    // Randomize order
    while (tempRobots.length > 0) {
      const index = Math.floor(Math.random() * tempRobots.length);
      this.robots.push(tempRobots[index]);
      tempRobots.splice(index, 1);
    }
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  nextTurn() {
    // Get the robot with the oldest turn that's still alive
    const aliveRobots = this.robots.filter(r => r.health > 0);
    if (aliveRobots.length <= 1) return;

    const robot = aliveRobots.sort((a, b) => a.lastTurn - b.lastTurn)[0];
    
    // Create competitor list
    const competitors = this.robots
      .filter(r => r.health > 0 && r.id !== robot.id)
      .map(r => new RobotAction(r.id, r.robotImplementation.getName(), r.health));

    let attacks = [];
    try {
      attacks = robot.robotImplementation.myTurn([...competitors]);
      
      // Check if robot tried to cheat
      const totalAttacks = attacks.reduce((sum, attack) => sum + attack.attacks, 0);
      if (totalAttacks > 10) {
        attacks = [];
      }
    } catch (error) {
      // Robot error - forfeit turn
      attacks = [];
    }

    // Apply attacks
    attacks.forEach(attack => {
      const robotToAttack = this.robots.find(r => r.id === attack.id);
      if (robotToAttack) {
        robotToAttack.health = Math.max(0, robotToAttack.health - attack.attacks);
      }
    });

    // Update all robots' health
    this.robots.forEach(r => {
      r.robotImplementation.updateHealth(r.health);
    });

    robot.lastTurn = Date.now();
  }

  getAliveCount() {
    return this.robots.filter(r => r.health > 0).length;
  }

  getWinner() {
    const alive = this.robots.filter(r => r.health > 0);
    return alive.length === 1 ? alive[0] : null;
  }
}
