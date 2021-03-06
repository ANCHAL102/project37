//Create variables here

var dog, normalDog,happyDog, database, foodS, foodStock;

var feed,addFood,fedTime,lastFed,foodObject,bath,bathroom,napy,player,living;

var dogState = "awake";

function preload()
{
  //load images here
  
  happyDog = loadImage("dogImg.png");

  normalDog = loadImage("dogImg1.png");

  sleepyDog = loadImage("Bed Room.png");

  bathroom = loadImage("Wash Room.png");

  living = loadImage("Living Room.png");

}

function setup() {
  createCanvas(900,500);
  
  //foodS = 20;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,showError);
  
  dog = createSprite(180,200,20,20);
  dog.addImage(normalDog);

  dog.scale = 0.55;

  feed = createButton("add dog food");
  feed.position(670,95);
  feed.mousePressed(feedDog);

  addFood = createButton("feed the dog");
  addFood.position(790,95);
  addFood.mousePressed(addFoods);

  bath = createButton("take a Bath")
  bath.position(890,95);
  bath.mousePressed(giveBath);

  napy = createButton("sleeping time")
  napy.position(990,95);
  napy.mousePressed(nap);

  player = createButton("Playing time")
  player.position(1090,95);
  player.mousePressed(play);

  

  foodObject = new Food();
}


function draw() {  
  background(246,255,0);

  //console.log(lastFed);

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }*/

  foodObject.display();

  drawSprites();
  //add styles here


  //lastFed = foodObject.lastFed;
  fill(255,255,254);
  textSize(15);
  if(foodObject.lastFed >= 12){
    text("Last Feed : " + foodObject.lastFed%12 + " PM", 350,30);
  }else if(foodObject.lastFed == 0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :" + foodObject.lastFed + " AM",350,30);
  }

  fill("white");
  //text("Note: Press the up arrow to feed the dog milk!",130,20)
  text("Food Remaining: " + foodObject.foodStock,550,130);


  if(foodObject.currentTime > foodObject.lastFed){
    //console.log("YAY");
    if(foodObject.lastFed + 2 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.livingRoom,180,200,200,300);
        console.log("YAY");
    }else if(foodObject.lastFed + 1 == foodObject.currentTime){
        imageMode(CENTER);
        image(foodObject.garden,180,200,200,300);
        console.log("YAY1");
    }else{

    }

}

}




function feedDog(){
  dog.addImage(happyDog);
  foodObject.deductFood();
}

function addFoods(){
  foodObject.foodStock++;
  dog.addImage(normalDog);
  foodObject.updateFoodStock();
}


function showError(){
  console.log("ERROR");
}

function readStock(){
  foodObject.updateFoodStock();
}

function giveBath(){
  dog.addImage(bathroom);
}

function nap(){
  if(dogState === "awake"){
      dog.addImage(sleepyDog);
  }
}

function play(){
  dog.addImage(living);
}

