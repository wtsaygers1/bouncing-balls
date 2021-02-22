//establishes the variable count to start at 0 and links the <p> element with the
//querySelectorww
const para = document.querySelector('p');
let count = 0;

// setup canvas
//references the <canvas> element
const canvas = document.querySelector('canvas');
//this object directly represents the drawing area of the canvas and allows
//us to draw 2D shapes on it
const ctx = canvas.getContext('2d');

//sets up canvas to be the width and height of the browser viewport
//chaining multiple assignments is fine and is quicker
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
//takes two numbers as arguments and outputs a random number in the range btwn the
//two
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//creates an object to represent the balls bouncing in our screen
function Ball(x, y, velX, velY, color, size) {
//the x and y coordinates where the ball starts on the screen
//ranges from 0(top left hand corner) to width and height of browser viewport(bottom
//right hand corner)
    this.x = x;
    this.y = y;
//horizontal and vertical velocity that are regularly added to the x/y coordinate
//values when we animate balls, to move them this much on each frame
    this.velX = velX;
    this.velY = velY;
    this.color = color;
//radius in pixels
    this.size = size;
}

//this creates the ball on the screen
Ball.prototype.draw = function() {
//states we want to draw a shape on canvas/browser
    ctx.beginPath();
//define what color ball will be and equals ball's color property
    ctx.fillStyle = this.color;
//arc method traces an arc shape on paper
//x and y position of arc's center
//the last two parameters specify start and end number of degrees around the circle
//that the arc is drawn between
//here specify 0 degrees and must multiply Math.PI by 2 to get the 360 degrees
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//completes filling the path of the circle with its color    
    ctx.fill();
}

/* let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

testBall.x
testBall.size
testBall.color
testBall.draw() */

//the first four parts of this function check if the ball has reached the edge
//of the canvas
//it is switching the path of the ball if it crosses the canvas

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

//these two lines essentially move the ball each time this method is called
//by adding the respective x/y coordinate with the velX/velY speed
    
    this.x += this.velX;
    this.y += this.velY;
}

//detects collisions when they happen

Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                //balls[j].size = this.size = random(64, 17);
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                //create a function that counts each time a selected ball 
                //in array collides with another
                count++;
                para.textContent = 'Collision Count: ' + count;
            }
        }
    }
}

//this will continue to create a ball and push() it to the array as long as the 
//array is under 25 with the current length of the array

let balls = [];



while (balls.length < 25) {
    let size = random(10,20);
    let ball = new Ball (
        //ball position always atleast one ball width
        //away from edge of the canvas to avoid drawing erros
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(255,255) + ',' + random(0,0) + ',' + random(255,255) +')',
    size
    );

    balls.push(ball);
    
}

//continues to fill rectangle on canvas as the balls update and move
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

//loops through each ball to draw it to the screen and then perform necessary
//updates to position and velocity
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    
    //uses the requestAnimationFrame API to run our loop function
    requestAnimationFrame(loop);
}

//initiates function and then requestAnimationFrame function will keep the loop
//going
loop();