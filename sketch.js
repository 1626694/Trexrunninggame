var trex,trex_running;
var ground,ground_running;
var cloud_running;
var count;
var Obstacle1,Obstacle2,Obstacle3,Obstacle4,Obstacle5,Obstacle6;
var Invisbleground;
var PLAY=0,END=1;
var Obstaclegroup,cloudgroup;
var gameState=PLAY;
var gameOver,gameOverimage;
var Restart,RestartImage;
var CollideImage;
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png"); 
ground_running=loadImage("ground2.png"); 
  cloud_running=loadImage("cloud.png");
  Obstacle1=loadImage("obstacle1.png");
  Obstacle2=loadImage("obstacle2.png");
  Obstacle3=loadImage("obstacle3.png");
  Obstacle4=loadImage("obstacle4.png");
  Obstacle5=loadImage("obstacle5.png");
  Obstacle6=loadImage("obstacle6.png");
  gameOverimage=loadImage("gameOver.png");
  RestartImage=loadImage("restart.png");
  CollideImage=loadImage("trex_collided.png");
}
function setup() {
  
  createCanvas(400, 400);
  trex=createSprite(24,360,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  ground=createSprite(0,380,400,10)
  Invisbleground=createSprite(0,390,400,5);
  ground.x=ground.width/2;
  Invisbleground.visible=false;
 ground.addImage(ground_running);
  ground.velocityX=-3;
count=0 
  Obstaclegroup=new Group();
  cloudgroup=new Group();
  gameOver=createSprite(200,262,20,20)
gameOver.addImage(gameOverimage);       
gameOver.scale=0.6;
gameOver.visible=false;  
Restart=createSprite(200,300,20,20);
Restart.addImage(RestartImage);
Restart.scale=0.6;
Restart.visible=false;  
}

function draw() {
  background(100);
  fill("white");
  textSize(18);
  text("score:"+count,285,302);
  if(gameState===PLAY){
   count=count+Math.round(frameRate()/20);
  if(keyDown("space")&&trex.y>=300){
 trex.velocityY=-5;
     }
  if(ground.x<0){
 ground.x=ground.width/2;   
  }
  trex.velocityY=trex.velocityY+0.7; 
    spawnclouds();
  spawnobstacles();
    if(Obstaclegroup.isTouching(trex)){
 gameState=END;      
    }      
     }else if(gameState===END){
ground.velocityX=0;
Obstaclegroup.setVelocityXEach(0);
Obstaclegroup.setLifetimeEach(-1);
cloudgroup.setVelocityXEach(0);
cloudgroup.setLifetimeEach(-1);
gameOver.visible=true;
Restart.visible=true;
trex.changeAnimation("running",CollideImage);
trex.addAnimation("running",CollideImage);       
 }
if(mousePressedOver(Restart)){ 
reset();  
}
   createEdgeSprites();
  trex.collide(Invisbleground);
  
  drawSprites();
}
function spawnclouds(){
if(frameCount%60===0) { 
var clouds=createSprite(400,300,10,10);
clouds.addImage(cloud_running);
  clouds.velocityX=-3;
  clouds.scale=0.5;
  clouds.lifetime=134;
  clouds.y=random(300,340);
  clouds.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloudgroup.add(clouds);
}  
  //frameCount
}
function spawnobstacles(){
  if(frameCount%60===0) {
  var Obstacles=createSprite(400,370,10,10);
  Obstacles.velocityX=-6;
    Obstacles.scale=0.5;
    Obstacles.lifetime=70;
  var rand=Math.round(random(1,6));
  switch(rand){
    case 1:Obstacles.addImage(Obstacle1);
      break;
      
     case 2:Obstacles.addImage(Obstacle2);
      break;
      
      case 3:Obstacles.addImage(Obstacle3);
      break;
      
      case 4:Obstacles.addImage(Obstacle4);
      break;
      
      case 5:Obstacles.addImage(Obstacle5);
      break;
      
      case 6:Obstacles.addImage(Obstacle6);
      break;
      default:
      break;
  }
    Obstaclegroup.add(Obstacles);
  } 

}
function reset(){
gameState=PLAY;
  trex.changeAnimation("running",trex_running);
  trex.addAnimation("running",trex_running);
 Obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  gameOver.visible = false;
  Restart.visible = false;
  count=0;
}