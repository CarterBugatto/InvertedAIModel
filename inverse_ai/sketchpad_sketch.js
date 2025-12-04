let canvas;
let canvasW;
let canvasH;

let chatWindow;
let chatLog;

let drawArea;
let showDraw = true;

var palette;
var paper;
var sliderSize;
var btnBGChange;
let btnPrompt;
let btnReset;

let promptArray = [
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

let messages = [];

function setup() {
  // Collects both columns/sections
  const chatColumn = select("#chat-column");
  const canvasColumn = select("#canvas-column");

  const window = canvasColumn.elt.getBoundingClientRect(); // Gets the size of the actual canvas: chat and canvas windows (without the border)
  canvasW = window.width;
  canvasH = window.height;

  canvas = createCanvas(canvasW, canvasH);
  canvas.parent(canvasColumn); // Attaches canvas to its column/section on the right

  drawArea = createGraphics(canvasW, canvasH); // Drawing area
  drawArea.background(220);

  chatWindow = createDiv();
  chatWindow.addClass("chat-window");
  chatWindow.parent(chatColumn); // Attaches canvas to its column/section on the left

  chatLog = createDiv();
  chatLog.addClass("chat-log");
  chatLog.parent(chatWindow); // Attaches canvas to its column/section on the left (child of chatWindow)

  // Brush colour palette setup
  palette = createColorPicker("#000000");
  palette.parent(canvasColumn);
  palette.style("position", "absolute");
  palette.style("bottom", "65px");
  palette.style("right", "215px");

  // Canvas/drawing area colour setup
  paper = createColorPicker("#ffffff");
  paper.parent(canvasColumn);
  paper.style("position", "absolute");
  paper.style("bottom", "30px");
  paper.style("right", "215px");

  // Brush size slider setup
  sliderSize = createSlider(1, 50, 10, 1);
  sliderSize.parent(canvasColumn);
  sliderSize.style("position", "absolute");
  sliderSize.style("bottom", "70px");
  sliderSize.style("right", "50px");

  // Background colour switch button setup
  btnBGChange = createButton("Confirm background colour");
  btnBGChange.parent(canvasColumn);
  btnBGChange.style("position", "absolute");
  btnBGChange.style("bottom", "32.5px");
  btnBGChange.style("right", "30px");
  btnBGChange.mousePressed(BGChange);

  // New prompt button setup
  btnPrompt = createButton("New prompt");
  btnPrompt.parent(canvasColumn);
  btnPrompt.style("position", "absolute");
  btnPrompt.style("bottom", "30px");
  btnPrompt.style("left", "30px");
  btnPrompt.mousePressed(() => {
    drawArea.background(220);
    promptDisplay();
  });

  // Reset drawing button setup
  btnReset = createButton("Reset");
  btnReset.parent(canvasColumn);
  btnReset.style("position", "absolute");
  btnReset.style("bottom", "60px");
  btnReset.style("left", "30px");
  btnReset.mousePressed(() => {drawArea.background(220)});

  promptDisplay(); // Initial prompt
}

function draw() {
  background("#171717"); // Border around drawing canvas colour

  if (showDraw && drawArea) {
    const margin = 15; // Border around drawing canvas
    const r = 24;      // Border around drawing canvas corner

    if (mouseIsPressed && mouseX >= margin && mouseX <= width - margin && mouseY >= margin && mouseY <= height - margin) { // Only draw if inside drawing canvas
      drawArea.stroke(palette.color());
      drawArea.strokeWeight(sliderSize.value());
      drawArea.line(pmouseX, pmouseY, mouseX, mouseY);
    }

    // **ChatGPT was used to help understand how to functionally have a canvas with rounded corners below**
    push();
    drawingContext.save(); // Saves current canvas
    drawingContext.beginPath(); // Starts a new path
    drawingContext.roundRect(margin, margin, width - margin * 2, height - margin * 2, r); // Creates a rounded rect
    drawingContext.clip(); // Clips anything outside of the rounded rect above
    image(drawArea, 0, 0); // Shows only the drawing inside the rounded rect
    drawingContext.restore(); // Resets clipping region
    pop();
  }
}

function promptDisplay() {
  let rand = int(random(0, promptArray.length));
  let msg = promptArray[rand];

  messages.push(msg);
  addMessage(msg, "bot");
}

function addMessage(text, sender) {
  let msg = createDiv(text);
  
  msg.parent(chatLog);
  msg.addClass("message");
  
  if (sender === "user") {
    msg.addClass("user");
  } else {
    msg.addClass("bot");
  }

  const logElt = chatLog.elt;
  logElt.scrollTop = logElt.scrollHeight;
}

function BGChange() {
  drawArea.background(paper.color());
}