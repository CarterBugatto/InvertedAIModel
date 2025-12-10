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
let btnSave;

let promptArray = [
"a street photographer adjusting a camera in a neon-lit Tokyo alley, energetic and curious mood, centre of screen with lights behind",
"an elderly woman painter brushing a large canvas in a sunlit attic studio, nostalgic, side profile",
"a circus performer on an empty grand theatre stage, dramatic and dark, wide shot",
"an evil scientist examining a glowing vial in a futuristic lab with holographic displays, mysterious, focus on face and hands",
"a firefighter breaking through a doorway in a burning apartment, intense, low angle",
"a musician performing passionately in the streets, cartoonish, close-up",
"a monster reaching a snowy peak at sunrise, serene, silhouette in the lower right of canvas",
"a fashion model walking a shiny runway at a futuristic show, stylish and high energy, centred with reflections",
"a chef tossing vegetables in a sizzling pan in a modern kitchen, realistic, cinematic shot",
"a surfer crossing a breaking wave as a storm approaches, adventurous, with the wave curling overhead",
"an answer to the meaning of existence in a giant cube, inquisitive, isometric and translucent",
"a robot and a human together, filled with tension, human not touching robot",
"a human doing programmed actions, simplistic, in civilian clothes",
"a robot doing human actions, simplistic, with exposed wires",
"a hypothesis on how robots and humans would be a decade from now, nebulous and interpretitive",
"a human contemplating, staring at a computer screen",
"a robot attempting to follow a footpath left behind, natural vs urban",
"a robot attempting to entertain a crowd, large stage",
"a human recording a video of another human, secretive",
"an unexpected break in an algorithm, repetitive objects"
];

let introArray = [
  "Welcome to our human-based console. As queries are being made by our servers, please do your best to generate an image for them. Thank you for your participation.",
  "Welcome to our human-based console. All queries made are up to human interpretation and can vary from person to person. Thank you for your participation.",
  "Welcome to our human-based console. Brush size can be adjusted using the slider for detailing if you so wish. Thank you for your participation.",
  "Welcome to our human-based console. All entries are temporarily made and will not be collected once the project is over. Thank you for your participation."
]

let messages = [];
let drawingAmount;

function setup() {
  // Collects both columns/sections
  const chatColumn = select("#chat-column");
  const canvasColumn = select("#canvas-column");

  const window = canvasColumn.elt.getBoundingClientRect(); // Gets the size of the actual canvas: chat and canvas windows (without the border)
  canvasW = window.width;
  canvasH = window.height;

  let newcanvas = createCanvas(canvasW, canvasH);
  newcanvas.parent(canvasColumn);
  canvas = newcanvas.canvas;

  drawingAmount = 0;

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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  palette.style("bottom", "65px");
  palette.style("right", "215px");
  palette.style("height", "4rem");
  palette.style("width", "4rem");
=======
=======
>>>>>>> Stashed changes
  palette.style("bottom", "70px");
  palette.style("right", "260px");
  palette.style("height", "7rem");
  palette.style("width", "7rem");
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  // drawing area commented out due to vestigial use
  /*
  // Canvas/drawing area colour setup
  paper = createColorPicker("#ffffff");
  paper.parent(canvasColumn);
  paper.style("position", "absolute");
  paper.style("bottom", "30px");
  paper.style("right", "215px");
  */

  // Brush size slider setup
  sliderSize = createSlider(1, 50, 10, 1);
  sliderSize.parent(canvasColumn);
  sliderSize.style("position", "absolute");
  sliderSize.style("bottom", "2rem");
  sliderSize.style("right", "4rem");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  sliderSize.style("width", "15rem");
  sliderSize.style("height", "1rem");
=======
  sliderSize.style("width", "20rem");
  sliderSize.style("height", "2rem");
>>>>>>> Stashed changes
=======
  sliderSize.style("width", "20rem");
  sliderSize.style("height", "2rem");
>>>>>>> Stashed changes

  sliderValue = createDiv("Brush size");
  sliderValue.addClass("value-indicator");
  sliderValue.parent(canvasColumn);
  sliderValue.style("position", "absolute");
  sliderValue.style("font-size", "1.5rem");
  sliderValue.style("text-align","center");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  sliderValue.style("bottom"," 4rem");
  sliderValue.style("right", "2rem");
=======
  sliderValue.style("bottom"," 5rem");
  sliderValue.style("right", "5rem");
>>>>>>> Stashed changes
=======
  sliderValue.style("bottom"," 5rem");
  sliderValue.style("right", "5rem");
>>>>>>> Stashed changes
  sliderValue.style("width", "10rem");

  sliderSize.mousePressed(() => {
    sliderValue.innerHTML = "<p>Brush size: " + sliderSize.value() + "</p>";
  })

  /*
  // Background colour switch button setup
  btnBGChange = createButton("Confirm background colour");
  btnBGChange.parent(canvasColumn);
  btnBGChange.style("position", "absolute");
  btnBGChange.style("bottom", "32.5px");
  btnBGChange.style("right", "30px");
  btnBGChange.mousePressed(BGChange);
  */

  // New prompt button setup
  btnPrompt = createButton("New prompt");
  btnPrompt.parent(canvasColumn);
  btnPrompt.style("user-select", "none")
  btnPrompt.style("position", "absolute");
  btnPrompt.style("bottom", "2rem");
  btnPrompt.style("left", "2rem");
  btnPrompt.style("font-size", "3rem");
  btnPrompt.style("padding", "1rem");
  btnPrompt.mousePressed(() => {
    addMessage("", "user");
    drawArea.background(220);
    promptDisplay();
  });

  // Reset drawing button setup
  btnReset = createButton("Reset");
  btnReset.parent(canvasColumn);
  btnPrompt.style("user-select", "none")
  btnReset.style("position", "absolute");
  btnReset.style("bottom", "8rem");
  btnReset.style("left", "2rem");
  btnReset.style("font-size", "3rem");
  btnReset.style("padding", "1rem");
  btnReset.mousePressed(() => {drawArea.background(220)});
  
  /*
  btnSave = createButton("Save");
  btnSave.parent(canvasColumn);
  btnSave.style("position", "absolute");
  btnSave.style("bottom", "90px");
  btnSave.style("left", "30px");
  btnSave.mousePressed(saveImage);
  */

  promptDisplay(); 
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
  let rand2 = int(random(0, introArray.length));
  let intro = introArray[rand2];

  addMessage(intro, "bot");
  messages.push(msg);
  addMessage('<p><b>New query: Generate ' + msg + '</b></p>', "bot");
}

function addMessage(text, sender) {
  let msg;
  if (sender === "user") {
    msg = createDiv('<canvas id="drawing'+drawingAmount+'" width="'+canvasW+'" height="'+canvasH+'"></canvas>');
    let tabula = document.getElementById("drawing"+drawingAmount);
    let margin = 10;
    let brush = tabula.getContext("2d");
    brush.fillRect(0,0,canvasW,canvasH);
    if (drawArea && drawArea.canvas) {
      brush.drawImage(drawArea.canvas, margin, margin, canvasW - margin * 2, canvasH - margin * 2);

    drawingAmount += 1;
    }
  }
  else {
    msg = createDiv(text);
  }
  
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


function saveImage() {
  let margin = 10;
  let screenshot = document.createElement("canvas");
  screenshot.width = canvasW;
  screenshot.height = canvasH;
  
  let imgdraw = screenshot.getContext("2d");
  imgdraw.fillRect(0, 0, canvasW, canvasH);
  if (drawArea && drawArea.canvas) {
    imgdraw.drawImage(drawArea.canvas, margin, margin, canvasW - margin * 2, canvasH - margin * 2);
  }
  
  let link = document.createElement("a");
  link.download = "/images/myDrawing.png";
  link.href = screenshot.toDataURL("image/png");
  
  document.body.appendChild(link);
  link.click();
  link.remove();
  
}
