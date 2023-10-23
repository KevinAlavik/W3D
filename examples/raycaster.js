class Boundary {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  show() {
    w3d.line(this.x1, this.y1, this.x2, this.y2, "white", 1);
  }
}

class Ray {
  constructor(x, y, angle) {
    this.pos = w3d.createVector(x, y);
    this.dir = w3d.createVector(Math.cos(angle), Math.sin(angle));
  }

  update(x, y) {
    this.pos = w3d.createVector(x, y);
  }

  show() {
//w3d.line(this.pos.x, this.pos.y, this.pos.x + this.dir.x * 10, this.pos.y + this.dir.y * 10, "white");
  }

  cast(wall) {
    const x1 = wall.x1;
    const y1 = wall.y1;
    const x2 = wall.x2;
    const y2 = wall.y2;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
      const ptX = x1 + t * (x2 - x1);
      const ptY = y1 + t * (y2 - y1);
      return w3d.createVector(ptX, ptY);
    } else {
      return;
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rays = [];

    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.x, this.y, (a * Math.PI) / 180));
    }
  }

  update(x, y) {
    this.x = x;
    this.y = y;

    for (let ray of this.rays) {
      ray.update(this.x, this.y);
    }
  }

  show() {
    //w3d.circle(9, 9, this.x, this.y, "white");
    for (let ray of this.rays) {
      ray.show();
    }
  }

  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;

      for (let wall of walls) {
        const pt = ray.cast(wall);

        if (pt) {
          const d = Math.sqrt((this.x - pt.x) ** 2 + (this.y - pt.y) ** 2);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
        w3d.line(this.x, this.y, closest.x, closest.y, "white", 0.5);
      }
    }
  }
}

let w3d;
let walls = [];
let particle;

function setup() {
  w3d = new W3D("sketch", window.innerWidth, window.innerHeight, customUpdate);
  w3d.background(0, 0, 0);

  walls.push(new Boundary(0, 0, w3d.width, 0));
  walls.push(new Boundary(w3d.width, 0, w3d.width, w3d.height));
  walls.push(new Boundary(w3d.width, w3d.height, 0, w3d.height));
  walls.push(new Boundary(0, w3d.height, 0, 0));

  for (let i = 0; i < 5; i++) {
    let x1 = Math.random() * w3d.width;
    let y1 = Math.random() * w3d.height;
    let x2 = Math.random() * w3d.width;
    let y2 = Math.random() * w3d.height;
    wall = new Boundary(x1, y1, x2, y2);
    walls.push(wall);
  }

  particle = new Particle(100, 200);

  w3d.update();
}

function customUpdate() {
  w3d.clear();
  w3d.background(0, 0, 0);

  particle.update(w3d.mouseX, w3d.mouseY);
  particle.show();
  particle.look(walls);

  for (let wall of walls) {
    wall.show();
  }
}

setup();
