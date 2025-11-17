var pallet;
var paper;
var buttonBGChange;
var sliderSize;
var checkType;

function setup(){
    createCanvas(720,400);
    createDiv("Create. Whatever. Shit. You want.");

    pallet = createColorPicker("black");
    paper = createColorPicker("white");
    sliderSize = createSlider(1, 50, 10, 1)

    background(paper.color());
    buttonBGChange = createButton("Change background color");
    buttonBGChange.mousePressed(BGChange);
    checkType = createCheckbox("Seamless brush")
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