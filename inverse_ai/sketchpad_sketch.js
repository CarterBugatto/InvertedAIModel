var pallet;
var paper;
var buttonBGChange;
var sliderSize;
// var checkType;

// Saaim addition variables
let drawArea;          // Drawing area
let showDraw = false;  // Variable to activate second canvas
let drawDimX;
let drawDimY;
let btnDraw;

// Manuel vars
let canvas;
let canvasW;
let canvasH;
let drawW;
let drawH;
let generatedImages = [];
let messages = [];
let btnReset;

let promptArray= [
  "Generate an image of a curious cat",
  "Generate an image of a futuristic city of hope",
  "Generate a portrait of an artist",
  "Generate an image of a 1980's Diner",
  "Generate an image of a lonely flower",
  "Generate an image of happiness",
  "Generate an image of what you see right now",
  "Generate an image of the future",
  "Generate an image of the cycle of life",
  "Generate an image of something you have just seen"
];

let displayText = "";

function adjustCanvas() {
  canvasW = windowWidth; canvasH = windowHeight;
  drawW = canvasW/2; drawH = canvasH;
}

function eraseCanvas() {
  drawArea.background(220);
}

function windowResized() {
  adjustCanvas();
}
function setup(){
  adjustCanvas();
  canvas = createCanvas(canvasW, canvasH);
  
    //createCanvas(windowWidth,windowHeight-40);
  
    drawDimX = drawW;
    drawDimY = drawH;
    
    // drawing canvas function moved up since it will be visible at all times
    drawArea = createGraphics(drawDimX, drawDimY); // Drawing area size
    drawArea.background(220);
    showDraw = true;
    
    pallet = createColorPicker("black");
    paper = createColorPicker("white");
    sliderSize = createSlider(1, 50, 10, 1); // for brush size
  
    buttonBGChange = createButton("Change background color");
    buttonBGChange.mousePressed(BGChange);
    // checkType = createCheckbox("Seamless brush")
  
  // Saaim drawing canvas setup
  btnDraw = createButton("Click me");
  btnDraw.position(width - 70, height + 10);
  btnDraw.mousePressed(() => {
    if (!drawArea) {
    }
    if (drawArea) {
      drawArea.background(220);
    }
    promptDisplay();
  });
  
  //reset canvas
  btnReset = createButton("Reset");
  btnReset.mousePressed(() => {
    if (drawArea) {
      drawArea.background(220);
    }
  })
  promptDisplay();
}

function draw(){
  background(255);
  
  // Saaim drawing canvas
  // Makes the drawing area visible
  if (showDraw && drawArea) {
    if (
      mouseIsPressed && //if mouse is clicked or held...
      mouseX >= drawDimX && mouseX <= width && // ...is within bounds of the drawArea's width...
      mouseY >= 0 && mouseY <= height) // ...and is within bounds of the drawArea's height...
      { 
      // Draws lines when mouseIsPressed
      drawArea.stroke(0);
      drawArea.strokeWeight(sliderSize.value());
      drawArea.line(pmouseX - drawDimX, pmouseY - 0, mouseX - drawDimX,  mouseY - 0); // Replace 0 with drawDimY if moving position of drawing area
    }
    // Draw the drawArea onto the main canvas on the right
    image(drawArea, windowWidth/2, 0); // Replace 0 with drawDimY if moving position of drawing area
  } 
  
  push();
        textSize(32);
        rectMode(CENTER);
        text(messages[messages.length-1],(width/2)/2,height/2,((width/2)/2)-(width/8),height/2);
        pop();
}

function promptDisplay() {
  // gets number of prompt from a list
  let rand = int(random(0,promptArray.length-1));
  
  // pushes prompt to the array
  messages.push(promptArray[rand]);
}

function computerPromptsYou() {
  
}

function BGChange(){
    background(paper.color());
}

//logDiv = createDiv() for displaying chat history
//logDiv.style('overflow-y','auto') for scrollability;
//logs will be an array showing objects
