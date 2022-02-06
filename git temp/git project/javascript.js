function init()
{
    canvas = document.getElementById("myCanvas");
    H = canvas.height = 550;
    W = canvas.width = 1000;
    //Now we need an object pen to draw something on canva

    pen = canvas.getContext('2d');
    cs = 66;

    //food object
    food = getRandomFood();
    gameover = false;
    score =5;

    //Create an image object

    food_img = new Image();
    food_img.src = "apple.jpg";

    trophy = new Image();
    trophy.src = "trophy.jpg";

    //Now need an snake object

    snake ={
        init_len : 5,
        color : "white",
        cells:[],
        direction : "right",

        createSnake: function(){

            for(var i=this.init_len ; i>=0 ; i--){
                this.cells.push({x:i , y:0});
            }
        },

        drawSnake : function(){

            pen.fillStyle = this.color;
            for(var i=0 ; i<this.cells.length ; i++)
            {
                pen.fillRect(this.cells[i].x*cs , this.cells[i].y*cs , cs-2,cs-2);
            }
        },

        updateSnake: function(){

        //check if the snake has eaten food , increased length of the snake and generate new food object.   

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY==food.y){
                score++;
                food = getRandomFood();
            }
            else{
                this.cells.pop();
            }


            var nextX , nextY;

            if(this.direction == "right")
            {
                nextX = headX+1;
                nextY = headY;
            }

            else if(this.direction == "left")
            {
                nextX = headX-1;
                nextY = headY;
            }

            else if(this.direction == "down")
            {
                nextX = headX;
                nextY = headY+1;
            }

            else 
            {
                nextX = headX;
                nextY = headY-1;
            }

            this.cells.unshift({x:nextX , y:nextY});


             //Boundary condition so snake can't go outside

            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].y < 0 || this.cells[0].x <0  || this.cells[0].x >last_x || this.cells[0].y > last_y)
            {
                gameover = true;
            }
        }
    };

    snake.createSnake();

    function keyPressed(e){
        if(e.key == "ArrowRight")
             snake.direction = "right";
        
        else if(e.key=="ArrowLeft")
              snake.direction = "left";
        
        else if(e.key=="ArrowUp")
              snake.direction = "up";   
              
        else if(e.key=="ArrowDown")
              snake.direction = "down";
    }

    document.addEventListener('keydown',keyPressed);

}


function getRandomFood()
{
    var foodX = Math.round(Math.random() * (W-cs)/cs );
    var foodY = Math.round(Math.random() * (H-cs)/cs );

    var food = {
        x: foodX ,
        y: foodY ,
        color: "red",
    }

    return food;
}


function draw()
{
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    /*pen.fillRect(food.x *cs , food.y*cs , cs,cs);
    this is replaced with image*/

    pen.drawImage(food_img , food.x*cs , food.y*cs , cs,cs);

    //Trophy draw

    pen.drawImage(trophy , 18 ,20 , cs,cs);
    pen.fillStyle ="black";
    pen.font = "20px Roboto";
    pen.fillText(score , 46 , 50);
}

function update(){
	snake.updateSnake();
}

function gameloop(){
    if(gameover == true)
    {
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    snake.updateSnake();
}

init();
var f = setInterval(gameloop,150);