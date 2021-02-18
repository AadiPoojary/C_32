// //different types of data that can be stored in a variable

// //number
// var a = 3+2;
// console.log(a);//5

// //string
// var b = "3+2";
// console.log(b);//3+2;

// //boolean
// var c = true;
// console.log(c);//true

// //undefined
// var d;
// console.log(d);

// //null
// var d = null;
// console.log(d);

// //arrays storing same data type
// var arr1 = [0,1,2]
// console.log(arr1);
// console.log(arr1.length);//3
// console.log(arr1[2]);//2


// //arrays storing diff data types
// var arr3 = [ "apple", true, 23, null, false];
// console.log(arr3);
// console.log(arr3.length);//5
// console.log(arr3[2]);//23

// //array storing multiple arrays inside it
// var arr4 = [ [1,3], [true, null, false], ["apple","mango"]];
// console.log(arr4);
// console.log(arr4.length);
// console.log(arr4[1]);//[true, null, false]
// console.log(arr4[1][2]);//false

// arr4.push("and");
// console.log(arr4);

// arr4.pop();
// console.log(arr4);

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;

var gameState = "On Sling";

var bg = ("sprites/bg2.jpg");

var score = 0;


function preload() {
   getBgImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(100,100);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:190, y:40});
    
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);

    //removes the outline from the text
    noStroke();
    textSize(35);
    fill(255);
    text("Score: " + score,width-300,50);

    Engine.update(engine);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
    
}


function mouseDragged(){
    if(gameState !== "Launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
    
}



function mouseReleased(){
    slingshot.fly();
    gameState = "Launched";
}

function keyPressed(){
    if(keyCode === 32){
        //slingshot.attach(bird.body);
       // Matter.Body.setPosition(bird.body,{x:100,y:100});
    }
}

//asynchronous function - a function which waits for some lines to be completed before jumping to the next line.

async function getBgImg(){
    //fetch() sends a request to the API service and collects the response.
    //await : to wait till a particular line is executed
    var response =await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    console.log(responseJSON);

    //calling the datetime property of the response
    var dateTime = responseJSON.datetime;
    console.log(dateTime);

    //showing only the hour from the datetime property between 11 and 13 characters
    var hour = dateTime.slice(11,13);
    console.log(hour);

    //if the hour is greater than or equal to 06 & less than or equal to 19 than it keeps the day background
    if(hour >= 06 && hour <= 19){
        //day image
        bg = ("sprites/bg.png");
    }
    else{
        //night image
        bg = ("sprites/bg2.jpg");
    }
    
    backgroundImg = loadImage(bg);
}