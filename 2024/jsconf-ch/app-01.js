let particles = [];
let attractors = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(0, 20);

    // Update and display particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }

    // Update and display attractors
    for (let i = attractors.length - 1; i >= 0; i--) {
        attractors[i].update();
        attractors[i].display();
        if (attractors[i].isDead()) {
            attractors.splice(i, 1);
        }
    }
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector();
        this.acc = createVector();
        this.maxSpeed = 4;
        this.size = random(2, 6);
    }

    update() {
        // Apply attraction to all attractors
        for (let attractor of attractors) {
            let force = p5.Vector.sub(attractor.pos, this.pos);
            let distanceSq = force.magSq();
            distanceSq = constrain(distanceSq, 25, 500);
            let strength = 50 / distanceSq;
            force.setMag(strength);
            this.acc.add(force);
        }

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // Wrap around edges
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    display() {
        noStroke();
        fill(255, 150);
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}

class Attractor {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.lifespan = 255;
    }

    update() {
        this.lifespan -= 2;
    }

    display() {
        noFill();
        stroke(255, this.lifespan);
        ellipse(this.pos.x, this.pos.y, 20);
    }

    isDead() {
        return this.lifespan < 0;
    }
}

function mouseMoved() {
    // Add new particles on mouse movement
    if (frameCount % 5 === 0) {
        particles.push(new Particle());
    }
}

function mousePressed() {
    // Add a new attractor on mouse press
    attractors.push(new Attractor(mouseX, mouseY));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}
