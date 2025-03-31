let synth;
let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
let drawing = [];
let isDrawing = false;
let lastPoint;
let started = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.set({
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.2,
            release: 0.5
        }
    });

    // Create a loop that will play notes based on the drawing
    Tone.Transport.scheduleRepeat((time) => {
        if (drawing.length > 0) {
            let index = floor(random(drawing.length));
            let point = drawing[index];
            let note = notes[floor(map(point.y, height, 0, 0, notes.length))];
            let velocity = map(point.speed, 0, 10, 0.1, 1);
            synth.triggerAttackRelease(note, "8n", time, velocity);
        }
    }, "8n");
}

function draw() {
    if (isDrawing) {
        let point = createVector(mouseX, mouseY);
        let speed = 0;
        if (lastPoint) {
            let d = dist(lastPoint.x, lastPoint.y, point.x, point.y);
            speed = d / (1 / frameRate());
            stroke(255);
            line(lastPoint.x, lastPoint.y, point.x, point.y);
        }
        drawing.push({ x: point.x, y: point.y, speed: speed });
        lastPoint = point;

        // Modulate synth based on drawing
        let filterFreq = map(mouseY, 0, height, 5000, 100);
        synth.set({
            filterEnvelope: {
                baseFrequency: filterFreq
            }
        });
    }

    // Display instructions
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
        "Click and drag to draw. Press SPACE to clear. Press ENTER to start/stop music.",
        width / 2,
        height - 30
    );
}

function mousePressed() {
    isDrawing = true;
    lastPoint = null;
}

function mouseReleased() {
    isDrawing = false;
}

function keyPressed() {
    if (key === " ") {
        // Clear the canvas and reset the drawing
        background(0);
        drawing = [];
    } else if (keyCode === ENTER) {
        togglePlay();
    }
}

function togglePlay() {
    if (!started) {
        Tone.start();
        Tone.Transport.start();
        started = true;
    } else {
        Tone.Transport.stop();
        started = false;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
