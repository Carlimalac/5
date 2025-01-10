let lines = [];  // Store all lines
let waveStrength = 150;
let rotationAngle = 0;
let popupVisible = true;  // Flag to control popup visibility
let musicPlayed = false;  // Flag to control when the music should start

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeWeight(2);
    noFill();

    // Create the popup element dynamically
    const popup = createDiv('Tap anywhere and move around.');
    popup.id('popup');
}

function draw() {
    background(0);

    // Draw each wavy line stored in the lines array
    for (let i = 0; i < lines.length; i++) {
        drawWavyLine(lines[i].y);
    }
}

function drawWavyLine(y) {
    let numPoints = 5;
    let amplitude = 50;
    let offsetX = waveStrength * cos(rotationAngle);  // Dynamic offset for wave
    let offsetY = waveStrength * sin(rotationAngle);  // Dynamic offset for wave
    
    // Create the wavy bezier curve
    for (let i = 0; i < numPoints - 1; i++) {
        let x1 = map(i, 0, numPoints - 1, -width / 4, width + width / 4) + offsetX;
        let y1 = y + sin(i + frameCount * 0.05) * amplitude;

        let x2 = map(i + 1, 0, numPoints - 1, -width / 4, width + width / 4) + offsetX;
        let y2 = y + sin(i + 1 + frameCount * 0.05) * amplitude;

        let cx1 = x1 + offsetX;
        let cy1 = y1 + offsetY;

        let cx2 = x2 - offsetX;
        let cy2 = y2 - offsetY;

        bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
    }
}

function mouseMoved() {
    // Rotate based on mouse movement
    rotationAngle += (mouseX - pmouseX) * 0.005;
    waveStrength = map(mouseY, 0, height, 100, 300);  // Control wave strength based on vertical mouse movement
}

function touchMoved() {
    // Rotate based on touch movement
    rotationAngle += (touches[0].x - pmouseX) * 0.005;
    waveStrength = map(touches[0].y, 0, height, 100, 300);  // Control wave strength based on touch movement
}

function mousePressed() {
    // Add new lines on mouse press
    lines.push({y: mouseY});

    // Hide the popup when the user taps for the first time
    if (popupVisible) {
        const popup = select('#popup');
        popup.hide();  // Hide the popup
        popupVisible = false;  // Update the flag
    }

    // Play the background music if not already played
    if (!musicPlayed) {
        let music = select('#background-music').elt;
        music.play();  // Play the background music
        musicPlayed = true;  // Update the flag to prevent multiple plays
    }
}

function touchStarted() {
    // Add new lines on touch press
    lines.push({y: touches[0].y});

    // Hide the popup when the user taps for the first time
    if (popupVisible) {
        const popup = select('#popup');
        popup.hide();  // Hide the popup
        popupVisible = false;  // Update the flag
    }

    // Play the background music if not already played
    if (!musicPlayed) {
        let music = select('#background-music').elt;
        music.play();  // Play the background music
        musicPlayed = true;  // Update the flag to prevent multiple plays
    }

    return false;  // Prevent default touch behavior
}
