let lines = [];  
let waveStrength = 150;
let rotationAngle = 0;
let popupVisible = true;  
let musicPlayed = false;  

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    strokeWeight(2);
    noFill();

    
    const popup = createDiv('Press anywhere to start.');
    popup.id('popup');
}

function draw() {
    background(0);

    
    for (let i = 0; i < lines.length; i++) {
        drawWavyLine(lines[i].y);
    }
}

function drawWavyLine(y) {
    let numPoints = 5;
    let amplitude = 50;
    let offsetX = waveStrength * cos(rotationAngle);  
    let offsetY = waveStrength * sin(rotationAngle);  
    
    
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
    
    rotationAngle += (mouseX - pmouseX) * 0.005;
    waveStrength = map(mouseY, 0, height, 100, 300);  
}

function touchMoved() {
    
    rotationAngle += (touches[0].x - pmouseX) * 0.005;
    waveStrength = map(touches[0].y, 0, height, 100, 300);  
}

function mousePressed() {
    
    lines.push({y: mouseY});

    
    if (popupVisible) {
        const popup = select('#popup');
        popup.hide();  
        popupVisible = false;  
    }

    
    if (!musicPlayed) {
        let music = select('#background-music').elt;
        music.play();  
        musicPlayed = true;  
    }
}

function touchStarted() {
    
    lines.push({y: touches[0].y});

    
    if (popupVisible) {
        const popup = select('#popup');
        popup.hide();  
        popupVisible = false;  
    }

    
    if (!musicPlayed) {
        let music = select('#background-music').elt;
        music.play();  
        musicPlayed = true;  
    }

    return false;  
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
