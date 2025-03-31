let textParticles = [];
let font;
let fontSize = 100;
let message = "JS CONF CHILE";

function preload() {
    font = loadFont(
        "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf"
    );
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(font);
    textSize(fontSize);
    textAlign(CENTER, CENTER);

    // Create initial text particles
    let points = font.textToPoints(message, 0, 0, fontSize, {
        sampleFactor: 0.1,
        simplifyThreshold: 0
    });

    for (let p of points) {
        textParticles.push(
            new TextParticle(
                p.x + width / 2 - textWidth(message) / 2,
                p.y + height / 2
            )
        );
    }
}

function draw() {
    background(0, 20);

    // Update and display text particles
    for (let particle of textParticles) {
        particle.update();
        particle.display();
    }
}

class TextParticle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.originalPos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.maxSpeed = 5;
        this.maxForce = 1;
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.pos);
        let d = dir.mag();

        if (d < 100) {
            dir.setMag(this.maxSpeed);
            let steer = p5.Vector.sub(dir, this.vel);
            steer.limit(this.maxForce);
            this.acc.add(steer);
        } else {
            let target = p5.Vector.sub(this.originalPos, this.pos);
            target.setMag(this.maxSpeed);
            let steer = p5.Vector.sub(target, this.vel);
            steer.limit(this.maxForce);
            this.acc.add(steer);
        }

        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    display() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 4);
    }
}

function mouseMoved() {
    // Distort text on mouse movement
    for (let particle of textParticles) {
        let force = p5.Vector.sub(createVector(mouseX, mouseY), particle.pos);
        force.setMag(0.5);
        particle.acc.add(force);
    }
}

function mousePressed() {
    // Change text on mouse press
    message = random([
        "CODE",
        "CREATE",
        "DESIGN",
        "INSPIRE",
        "INNOVATE",
        "JS CONF CHILE"
    ]);
    resetTextParticles();
}

function resetTextParticles() {
    textParticles = [];
    let points = font.textToPoints(message, 0, 0, fontSize, {
        sampleFactor: 0.1,
        simplifyThreshold: 0
    });

    for (let p of points) {
        textParticles.push(
            new TextParticle(
                p.x + width / 2 - textWidth(message) / 2,
                p.y + height / 2
            )
        );
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    resetTextParticles();
}
