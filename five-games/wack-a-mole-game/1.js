// The score
var score = 0;

// How long moles wait at a location
var waitTime = 1200;

// The image of the mole
var mole = getImage("creatures/Hopper-Jumping");

// The coordinates of our holes
var holes = [
    [60, 120],
    [200, 120],
    [340, 120],
    [60, 230],
    [200, 230],
    [340, 230],
    [60, 340],
    [200, 340],
    [340, 340]
];

// Function to pick a random hole
var randomHole = function() {
    return floor(random(0,9));
};

// Function to draw a hole
var drawHole = function(hole) {
    var pos = holes[hole];
    fill(69, 24, 24);
    stroke(196, 101, 29);
    ellipse(pos[0], pos[1], 100, 100);
};

// Function to draw the background and holes
var drawBackgroundAndHoles = function() {
    fill(44, 235, 44);
    rect(0, 0, 399, 399);
    fill(255, 0, 0);
    textSize(38);
    text("Whack-a-Mole", 10, 50);
    textSize(24);
    text(score, 335, 50);
    
    for (var i = 0; i < holes.length; i++) {
        drawHole(i);
    }
};

// Function to draw a mole
var drawMole = function(hole) {
    var pos = holes[hole];
    fill(204, 179, 57);
    stroke(196, 101, 29);
    image(mole, pos[0] - 30, pos[1] - 30, 60, 60);
};

// Function to tell which hole is clicked
var holeClicked = function() {
    for (var i = 0; i < holes.length; i++) {
        var xDistance = abs(mouseX - holes[i][0]);
        var yDistance = abs(mouseY - holes[i][1]);
        
        if (xDistance < 30 && yDistance < 30) {
            return i;
        }
    }
    
    return -1;
};

// Where the moles start out
var mole1 = randomHole();
var mole2 = randomHole();

// When they click the mouse...
var mouseClicked = function() {
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, 50, 50);
    
    // What hole did they click in?
    var hole = holeClicked();
    
    // Did they get Mole #1?
    if (hole === mole1) {
        mole1 = -1;
        score++;
    }
    
    // Did they get Mole #2?
    if (hole === mole2) {
        mole2 = -1;
        score++;
    }
};

// The draw loop
var draw = function() {
    drawBackgroundAndHoles();
    
    // Draw Mole #1 unless he's dead
    if (mole1 !== -1) {
        drawMole(mole1);
    }
    
    // Draw Mole #2 unless he's dead
    if (mole2 !== -1) {
        drawMole(mole2);
    }
    
    // Is it time to move the moles?
    if (millis() % waitTime < 30) {
        mole1 = randomHole();
        mole2 = randomHole();
    }
};
