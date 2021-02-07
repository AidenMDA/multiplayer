var ball, ballTwo;
var database, pos, posTwo;

function setup(){
    database = firebase.database();
    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    ballTwo = createSprite(250,250,10,10);
    ballTwo.shapeColor = "blue";

    var ballpos = database.ref('ball/position');
    ballpos.on("value", readPosition, showError);

    var ballTwopos = database.ref('ball/position');
    ballTwopos.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition("ball",-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition("ball",1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition("ball",0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition("ball",0,+1);
    }

    else if(keyDown("A")){
        writePosition("ballTwo",-1,0);
    }
    else if(keyDown("D")){
        writePosition("ballTwo",+1,0);
    }
    else if(keyDown("W")){
        writePosition("ballTwo",0,-1);
    }
    else if(keyDown("S")){
        writePosition("ballTwo",0,+1);
    }
    drawSprites();
}

function writePosition(ball,x,y){

    if (ball == "ball"){
    database.ref('ball/position').set(
        {
            'x': pos.x + x,
            'y': pos.y + y
        }
    )}
    else if (ball == "ballTwo") {
        database.ref('ballTwo/position').set(
            {
                'x': posTwo.x + x,
                'y': posTwo.y + y
            }
        )
    }
}

function readPosition(data)
{
    pos = data.val();
    ball.x = pos.x;
    ball.y = pos.y;

    posTwo = data.val();
    ballTwo.x = posTwo.x;
    ballTwo.y = posTwo.y;
}

function showError()
{
    console.log("Error in reading the database");
}