
var bob
var bob_Img
var El_Macho1,El_Macho2
var El_Macho1_Img,El_Macho2_Img
var moon_img
var gameState="wait";
var life = 4;
var lifeBar
var banana
var banana_Img
var score = 0;
var evil
var start;
var start_Img
var heals_Img
var healing
var move;
function preload(){
  bob_Img = loadImage('bear.png')
  El_Macho1_Img = loadImage('ElMachoMinions.png')
  El_Macho2_Img = loadImage('EvilMinions.png')
  moon_img = loadImage('good.jpg')
  banana_Img = loadImage('BANANANANNA.png');
  start_Img = loadImage('baannna.png');
  heals_Img = loadImage('heal.png');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  evil = new Group();
  healing = new Group();

  move = createSprite(width/2,height/2,width,height);
  move.addImage(moon_img);  
  move.scale = 5.3;
  move.velocityX = -10;

  bob = createSprite(80,height-50, 50, 50);
  bob.addImage(bob_Img);
  bob.scale = 0.2;

  ground = createSprite(width/2,height-10,1800,20)
  ground.visible = false;

  banana = createSprite(width/2,height/2+200);
  banana.addImage(banana_Img);
  banana.scale = 0.2;
  banana.visible = false;

  start = createSprite(width/2, height/2);
  start.addImage(start_Img);
  start.scale = 0.2;

  

}


function draw(){
background("white");


if(move.x<200){
  move.x = 900;
}
drawSprites()
if(gameState=="play"){

 

  banana.visible = false;
  textSize(30);
  
  fill('blue');
  
  text('score='+score,50,50);
  text('life = '+life,50,100);
  spawnObstacles();
 
  spawnHeals();
  score = score + Math.round(getFrameRate()/60);

  if(keyIsDown(UP_ARROW)&&bob.y>850){
    bob.velocityY=-14;
  }
  bob.velocityY+=1;
  
  if(evil.isTouching(bob)){
    life = life - 1;
    evil[0].destroy();
  }

  if(healing.isTouching(bob)&&life<4){
    life = life + 1;
    healing[0].destroy();
  }

  


  if (life <= 0){
    gameState="end";
  }
}

 if(gameState=="end"){
evil.setVelocityXEach(0)
healing.setVelocityXEach(0)
bob.velocityY=0;
score = 0;
banana.visible = true;
evil.setLifetimeEach(0);
healing.setLifetimeEach(0)
move.velocityX = 0;
if(mousePressedOver(banana)){
  restart();

}

textSize(50)
    fill('red')
    text('You Have Failed Your Mission, Gru Calls You Back',width/4-100,height/2)
    
   
}


bob.collide(ground);

if(gameState=="wait"){
  textSize(50);
  fill('blue')
  text('Gru has given you 4 lifes use them wisely',width/4,height/2-200)
  
  if(mousePressedOver(start)){
    starting();
  }

}

}
function spawnObstacles(){
  if (frameCount % 50 === 0){
    var evils
    evils = createSprite(width,height-50,10,50);
    evils.velocityX = -10;
    
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: evils.addImage(El_Macho1_Img);
               break;
       case 2: evils.addImage(El_Macho2_Img);
               break;
    
       default: break;
     }
        evils.scale=0.15;
        evils.lifetime = 300;
      evil.add(evils);
  }
}


function spawnHeals(){

  if(frameCount %120 === 0 ){
    var heals
    heals = createSprite(width,height - 50,30,50)
    heals.addImage(heals_Img);
    heals.scale = 0.2;

    heals.velocityX = -10;

    heals.lifetime = 500;
  
    healing.add(heals);
    
  }

  

}

function restart(){
  gameState = "play";
  banana.visible = false;
  life = 4;
}


function starting(){
  gameState ="play"
  start.destroy();
}
 



















