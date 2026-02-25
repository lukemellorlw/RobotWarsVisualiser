// Base Robot Interface
class IRobot {
  myTurn(competitors) {
    throw new Error('myTurn must be implemented');
  }

  getName() {
    throw new Error('getName must be implemented');
  }

  updateHealth(health) {
    this.health = health;
  }
}

// Bully Robot - attacks the weakest
export class BullyRobot extends IRobot {
  constructor() {
    super();
    this.health = 100;
  }

  getName() {
    return 'Bully Robot';
  }

  myTurn(competitors) {
    const victim = competitors.sort((a, b) => a.health - b.health)[0];
    if (victim) {
      victim.attacks = 10;
    }
    return competitors;
  }
}

// Compassionate Robot - attacks the strongest
export class CompassionateRobot extends IRobot {
  constructor() {
    super();
    this.health = 100;
  }

  getName() {
    return 'Compassionate Robot';
  }

  myTurn(competitors) {
    const victim = competitors.sort((a, b) => b.health - a.health)[0];
    if (victim) {
      victim.attacks = 10;
    }
    return competitors;
  }
}

// Lazy Robot - attacks randomly with full power
export class LazyRobot extends IRobot {
  constructor() {
    super();
    this.health = 100;
  }

  getName() {
    return 'Lazy Robot';
  }

  myTurn(competitors) {
    if (competitors.length > 0) {
      const index = Math.floor(Math.random() * competitors.length);
      competitors[index].attacks = 10;
    }
    return competitors;
  }
}

// Stupid Robot - attacks randomly with 6 points
export class StupidRobot extends IRobot {
  constructor() {
    super();
    this.health = 100;
  }

  getName() {
    return 'Stupid Robot';
  }

  myTurn(competitors) {
    if (competitors.length > 0) {
      const index = Math.floor(Math.random() * competitors.length);
      competitors[index].attacks = 6;
    }
    return competitors;
  }
}

// Very Stupid Robot - attacks randomly with 3 points
export class VeryStupidRobot extends IRobot {
  constructor() {
    super();
    this.health = 100;
  }

  getName() {
    return 'Very Stupid Robot';
  }

  myTurn(competitors) {
    if (competitors.length > 0) {
      const index = Math.floor(Math.random() * competitors.length);
      competitors[index].attacks = 3;
    }
    return competitors;
  }
}

// Luke Robot - distributes attacks evenly, prioritizing strongest
export class Luke extends IRobot {
  constructor() {
    super();
    this.health = 100;
  }

  getName() {
    return 'Luke';
  }

  myTurn(competitors) {
    let pointsRemaining = 10;
    const sorted = competitors.sort((a, b) => b.health - a.health);
    
    while (pointsRemaining > 0) {
      sorted.forEach(c => {
        if (pointsRemaining > 0) {
          c.attacks++;
          pointsRemaining--;
        }
      });
    }
    
    return competitors;
  }
}

// Cheating Robot - tries to attack with way too many points (will forfeit)
export class CheatingRobot extends IRobot {
  constructor() {
    super();
    this.health = 100;
  }

  getName() {
    return 'Cheating Robot';
  }

  myTurn(competitors) {
    competitors.forEach(c => {
      c.attacks = 1000000;
    });
    return competitors;
  }
}
