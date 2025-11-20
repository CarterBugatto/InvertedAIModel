var pallet;
var paper;
var buttonBGChange;
var sliderSize;
var checkType;

// Saaim addition variables
let drawArea;          // Drawing area
let showDraw = false;  // Variable to activate second canvas
let drawDimX = 720;
let drawDimY = 400;
let btnDraw;

let promptArray= [
  
]

function setup(){
    createCanvas(1020,400);
    createDiv("Create. Whatever. Shit. You want.");

    pallet = createColorPicker("black");
    paper = createColorPicker("white");
    sliderSize = createSlider(1, 50, 10, 1)

    background(paper.color());
    buttonBGChange = createButton("Change background color");
    buttonBGChange.mousePressed(BGChange);
    checkType = createCheckbox("Seamless brush")
  
  // Saaim drawing canvas setup
  btnDraw = createButton("Click me");
  btnDraw.position(width - 70, height + 10);
  btnDraw.mousePressed(() => {
    // Button to activate drawing area
    if (!drawArea) {
      drawArea = createGraphics(300, 400); // Drawing area size
      drawArea.background(220);
    }
    showDraw = true;
  });
  
  promptDisplay();
}

function draw(){
    if(mouseIsPressed === true){
        if (checkType.checked()) {
            stroke(pallet.color());
            strokeWeight(sliderSize.value());
            line(pmouseX,pmouseY,mouseX,mouseY);
        }  else {
            fill(pallet.color());
            strokeWeight(0);
            ellipse(mouseX,mouseY,sliderSize.value(),sliderSize.value());
        }
        
    }
  
  // Saaim drawing canvas
  // Makes the drawing area visible
  if (showDraw && drawArea) {
    if ( // Checks mouse position to see if it is on the canvas
      mouseIsPressed && 
      mouseX >= drawDimX && mouseX <= width &&
      mouseY >= 0 && mouseY <= height) {
      
      // Draws lines when mouseIsPressed
      drawArea.stroke(0);
      drawArea.strokeWeight(3);
      drawArea.line(pmouseX - drawDimX, pmouseY - 0, mouseX - drawDimX,  mouseY - 0); // Replace 0 with drawDimY if moving position of drawing area
    }
    // Draw the drawArea onto the main canvas on the right
    image(drawArea, drawDimX, 0); // Replace 0 with drawDimY if moving position of drawing area
  } 
  
}

function promptDisplay() {
  
}
function BGChange(){
    background(paper.color());
}

function keyPressed(){
    if (keyCode === 32) {
        background(paper.color());
    }
}

// function draw(){
    //if(mouseIsPressed === true){
        //fill(0,0,0);
        //noStroke();
        //ellipse(mouseX,mouseY,5,5);
    //}
    //else{
        //background(200,200,200,8);
    //}
//}