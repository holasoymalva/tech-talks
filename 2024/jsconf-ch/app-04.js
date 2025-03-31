let synth;
let textInput = "";
let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
let pattern = [];
let index = 0;
let started = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(CENTER, CENTER);
    textSize(42);

    synth = new Tone.PolySynth(Tone.Synth).toDestination();

    // Create an empty pattern
    for (let i = 0; i < 16; i++) {
        pattern.push(null);
    }
}

function draw() {
    background(0);

    // Display the text input
    fill(255);
    text(textInput, width / 2, height / 2 - 40);

    // Display the pattern
    for (let i = 0; i < pattern.length; i++) {
        let x = map(i, 0, pattern.length, 50, width - 50);
        let y = height / 2 + 40;
        stroke(100);
        line(x, y - 20, x, y + 20);
        if (pattern[i] !== null) {
            fill(255);
            noStroke();
            ellipse(x, y, 10, 10);
        }
        if (i === index) {
            noFill();
            stroke(255);
            ellipse(x, y, 20, 20);
        }
    }

    // Display instructions
    fill(255);
    text(
        "Type to generate music. Press ENTER to start/stop.",
        width / 2,
        height - 30
    );
}

function keyTyped() {
    if (key !== "Enter") {
        textInput += key;
        updatePattern(key);
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
        togglePlay();
    } else if (keyCode === BACKSPACE) {
        textInput = textInput.slice(0, -1);
        pattern[pattern.length - 1] = null;
    }
}

function updatePattern(char) {
    let noteIndex = char.charCodeAt(0) % notes.length;
    pattern[pattern.length - 1] = notes[noteIndex];
    pattern.push(null);
    if (pattern.length > 16) {
        pattern.shift();
    }
}

function togglePlay() {
    if (!started) {
        Tone.start();
        Tone.Transport.scheduleRepeat((time) => {
            let note = pattern[index];
            if (note !== null) {
                synth.triggerAttackRelease(note, "8n", time);
            }
            index = (index + 1) % pattern.length;
        }, "8n");
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
