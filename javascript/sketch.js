let canvas;
let button;

let food = [];
let foodLimit = 2;

let hungry = 0;
let full = 1;
let pup = 1;
let tamaState = hungry;

let tamaX;
let tamaY;
let tamaDiam;

function setup() {

  canvas = createCanvas(600, 600);
  canvas.parent("sketch-container"); 

  tamaX = width/2;
  tamaY = height/2;
  tamaDiam = width/6;

  addGUI();
}

function draw() {
  background(220,100,100);
  noStroke();
  eyes(width/1.6, height/2.0-height/4.0,100);
  eyes(width/2.7, height/2.0-height/4.0,100);


  if(tamaState == hungry){
    fill(255);
    if(tamaDiam > width/4){
      tamaState = full;
      
    }
  }else if(tamaState == full){
    fill(0,255,0);
   
    if(tamaDiam > width/6){
      if(frameCount % 2 == 0) tamaDiam--;
      eyes(width/1.6, height/2.0-height/4.0,0);
      eyes(width/2.7, height/2.0-height/4.0,0);
    }else{
      tamaState = hungry;
    }
  }
  // push();
  // eyes(width/1.6, height/2.0-height/4.0,100);
  // eyes(width/2.7, height/2.0-height/4.0,100);
  // pop();
  circle(tamaX,tamaY,tamaDiam);
  fill(0);
  let mouthOffset = tamaDiam/2;
  rect(tamaX-mouthOffset/2,tamaY,mouthOffset,3);

  updateFood();

  if(food.length > 0 && tamaState == hungry){
    eatFood();
  } 
  
  if(food.length <= foodLimit-1){
    button.html("FEED");
    button.removeClass("inactive");
  }
}

function updateFood(){
  for(let i = food.length-1; i >= 0 ; i--){
    fill(100);
    circle(food[i].x,food[i].y,food[i].d);
    food[i].y -= 1;
    if(food[i].y < 0){
      food.splice(i,1);
    }
  }
}

function eatFood(){

  for(let i = food.length-1; i >= 0 ; i--){
    let distanceY =  tamaY - food[i].y;

    if(food[i].y > tamaX){
      fill(0);
      circle(tamaX,tamaY,tamaDiam/2);
    }

    if(abs(distanceY) < 10){
      tamaDiam += food[food.length-1].d;
      food.splice(i,1);
    }
  }
}

function addGUI()
{
  button = createButton("FEED");

  button.addClass("button");

  button.parent("gui-container");

  button.mousePressed(handleButtonPress); 

}

function handleButtonPress()
{
    
    if(food.length <= foodLimit-1){
      food.push({
          x:width/2,
          y:height,
          d:random(10,40)
        });
    }
    
    if(food.length > foodLimit-1){
      button.html("FEEDING");
      button.addClass("inactive");
    }
  
}
function eyes (x,y,z) {
  fill(255);
  strokeWeight(5);
  stroke(0);

  //whites
  ellipse(x, y, width/5.6, height/7);

  //pupils
  fill(z);
  ellipse(x+map(mouseX, 0, width, -15, 14), y+map(mouseY, 0, height, -7, 10), width/7.5, height/8.5);

  //highlights
  fill(0);
  ellipse(x+map(mouseX+449, 0, width, -15, 15), y+map(mouseY-367, 0, height, -10, 10), width/28.0, height/28.0);
}


