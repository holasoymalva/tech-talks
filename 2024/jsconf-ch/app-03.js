let synth;
let notes = ["C4", "D4", "E4", "G4", "A4"];
let sequence;
let started = false;
let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Initialize Tone.js synth
    synth = new Tone.PolySynth().toDestination();

    // Create a sequence
    sequence = new Tone.Sequence(
        (time, note) => {
            synth.triggerAttackRelease(note, "8n", time);
            addCircle(note);
        },
        notes,
        "4n"
    );

    // Connect sequence to Tone.Transport
    Tone.Transport.bpm.value = 120;
}

function draw() {
    background(0, 20);

    // Update and display circles
    for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].update();
        circles[i].display();
        if (circles[i].isDead()) {
            circles.splice(i, 1);
        }
    }

    // Display instructions
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
        "Click to start/stop. Move mouse to change tempo and sound.",
        width / 2,
        height - 30
    );
}

function mousePressed() {
    if (!started) {
        Tone.start();
        Tone.Transport.start();
        sequence.start();
        started = true;
    } else {
        Tone.Transport.stop();
        sequence.stop();
        started = false;
    }
}

function mouseMoved() {
    if (started) {
        // Change tempo based on mouse X position
        let newTempo = map(mouseX, 0, width, 60, 180);
        Tone.Transport.bpm.rampTo(newTempo, 0.1);

        // Change synth settings based on mouse Y position
        let newRelease = map(mouseY, 0, height, 0.1, 2);
        synth.set({ envelope: { release: newRelease } });
    }
}

function addCircle(note) {
    let x = random(width);
    let y = random(height);
    let noteIndex = notes.indexOf(note);
    let size = map(noteIndex, 0, notes.length - 1, 20, 80);
    circles.push(new Circle(x, y, size));
}

class Circle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.life = 255;
    }

    update() {
        this.life -= 2;
    }

    display() {
        noFill();
        stroke(255, this.life);
        ellipse(this.x, this.y, this.size);
    }

    isDead() {
        return this.life < 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
