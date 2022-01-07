var dog,sadDog,happyDog;

var feed,add,foodObj
//declared variable  food stock
var foodS,foodStock



function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database()
  
  foodObj = new Food()
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog"); 
  feed.position(700,95); 
  feed.mousePressed(feedDog); 

  add =createButton("Add Food"); 
  add.position(800,95);
  add.mousePressed(addFood);

  console.log(foodObj.foodStock)
}

function draw() {
  
  background(46,139,87);
  foodObj.display()


  drawSprites();
  
}


function readStock(data){
  foodS= data.val()
  //added foodS as parameter
  foodObj.updateFoodStock(foodS)

}



function feedDog(){ 
  dog.addImage(happyDog); 
  if(foodObj.getFoodStock()<= 0){ 
    foodObj.updateFoodStock(foodObj.getFoodStock()*0); 

  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
   } 
    database.ref('/').update({ 
      Food:foodObj.getFoodStock(),
      FeedTime:hour() 
    }) 
  
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
