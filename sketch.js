const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;
let slingshot1, ground1, ground2, polygon, polygon_IMG;
let score, drag, canDrag, backgroundC;
let box1, box2, box3, box4, box5, box6, box7, box8, box9;

function preload() {
    polygon_IMG = loadImage('Hexagon.png');
}

function setup() {
    createCanvas(1200,400);
    imageMode(CENTER);
    fill(255, 255, 255);
    backgroundC = 0;
    getBackground();
    score = 0;
    canDrag = true;
    drag = false;
    engine = Engine.create();
    world = engine.world;
    ground1 = new Ground(600, height, 1200 ,20)
    ground2 = new Ground(900, height*7/8, 600, height/4);
    polygon = Bodies.circle(150, 200, 20, {'density' : 2.5});
    World.add(world, polygon);
    slingshot1 = new Slingshot(polygon, {'x' : 150, 'y' : 150});
    box1 = new Box(650, height*3/4 - 25, 50, 50);
    box2 = new Box(700, height*3/4 - 25, 50, 50);
    box3 = new Box(750, height*3/4 - 25, 50, 50);
    box4 = new Box(800, height*3/4 - 25, 50, 50);
    box5 = new Box(850, height*3/4 - 25, 50, 50);
    box6 = new Box(700, height*3/4 - 75, 50, 50);
    box7 = new Box(750, height*3/4 - 75, 50, 50);
    box8 = new Box(800, height*3/4 - 75, 50, 50);
    box9 = new Box(750, height*3/4 - 125, 50, 50);
}

function mouseDragged() {
    if (mouseX - polygon.position.x < 20 && mouseX - polygon.position.x > -20 && mouseY - polygon.position.y < 20 && mouseY - polygon.position.y > -20) {
        drag = true;
    }
}

function mouseReleased() {
    if (drag) {
        slingshot1.fly();
        drag = false
        canDrag = false;
    }
}

function draw() {
    background(0, 0, backgroundC);
    Engine.update(engine);
    text("Score = " + score, 0, 15);
    image(polygon_IMG, polygon.position.x, polygon.position.y, 40, 40);
    displayAllBoxes();
    displayAllGrounds();
    slingshot1.display();
    if (drag && canDrag) {
        Body.setPosition(polygon, {x : mouseX, y : mouseY});
    }
    if (keyCode === 32) {
        reset();
        keyCode = 0;
    }
}

function reset() {
    canDrag = true;
    slingshot1.flown = false;
    slingshot1.chain.bodyA = polygon;
    Body.setPosition(polygon, {'x' : 150, 'y' : 200});
    Body.setVelocity(polygon, {'x' : 0, 'y' : 0});
}

async function getBackground() {
    let Time = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
    let Response = await Time.json();
    if (Response.datetime.slice(11, 13) >= 7 && Response.datetime.slice(11, 13) <= 19) {
        backgroundC = 100;
    } else {
        backgroundC = 0;
    }
}