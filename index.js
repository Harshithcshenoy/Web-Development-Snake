 // Game Constants and Variables

 let inputDir = {x: 0, y: 0}; // Initially snake is at rest (0)
 const foodSound = new Audio('music/food.mp3'); // Sound for various purposes
 const gameOverSound = new Audio('music/gameover.mp3');
 const moveSound = new Audio('music/move.mp3');
 const musicSound = new Audio('music/music.mp3');
 let speed = 10;
 let score = 0;
 let lastPaintTime = 0;
 let snakeArr = [
     {x: 13, y: 15} // Intial position of snake head
 ];
 
 food = {x: 6, y: 7}; //Intial position of food
 
 // Game Functions
 function main(ctime) {
     window.requestAnimationFrame(main);
     console.log(ctime)
     if((ctime - lastPaintTime)/1000 < 1/speed){  // To lower the fps, to reduce rendering
         return; 
     }
     lastPaintTime = ctime;
     gameEngine();
 }
 
 function isCollide(snake) {
     // If you bump into yourself 
     for (let i = 1; i < snakeArr.length; i++) {
         if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){ // if head == snake array (body segements)
             return true;
         }
     }
     // If you bump into the wall
     if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){ // grid starts from 0 to 18,  .x >= 18 from left side and .x <=0 for right side
         return true;
     }
         
     return false;
 }
 
 function gameEngine(){
     // Part 1: Updating the snake array and Food
     if(isCollide(snakeArr)){ // if hit , out
         gameOverSound.play();
         musicSound.pause();
         inputDir =  {x: 0, y: 0}; 
         alert("Game Over. Press any key to play again!");
         snakeArr = [{x: 13, y: 15}]; // Snake head and body
         musicSound.play(); 
         score = 0; 
     }
 
     // If you have eaten the food, increment the score and regenerate the food
     if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){  //if food is eaten
         foodSound.play();
         score += 1;
         if(score>hiscoreval){
             hiscoreval = score;
             localStorage.setItem("hiscore", JSON.stringify(hiscoreval)); // to store the value
             hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
         }
         scoreBox.innerHTML = "Score: " + score;
         snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y}); // to add snake new segment to body, when food is eaten, above
         let a = 4; // grid starts from 0 t0 18 , we had made grid
         let b = 12;
         food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())} // To generate random places for food
     }
 
     // Moving the snake
     for (let i = snakeArr.length - 2; i>=0; i--) { // 2nd last element to 0 = i
         snakeArr[i+1] = {...snakeArr[i]}; // i + 1 = last element, ... means new object
     }
 
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;
 
     // Part 2: Display the snake and Food
 
     // Display the snake
     board.innerHTML = "";
     snakeArr.forEach((e, index)=>{
         snakeElement = document.createElement('div'); // To create div in HTML from JS
         snakeElement.style.gridRowStart = e.y; // y is row, to place the position of first snake head
         snakeElement.style.gridColumnStart = e.x; // x is column
 
         if(index === 0){
             snakeElement.classList.add('head');
         }
         else{
             snakeElement.classList.add('snake');
         }
         board.appendChild(snakeElement);
     });
     // Display the food
     foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food')
     board.appendChild(foodElement);
 
 
 }
 
 
 // Main logic starts here
 musicSound.play();
 let hiscore = localStorage.getItem("hiscore");
 if(hiscore === null){
     hiscoreval = 0;
     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
 }
 else{
     hiscoreval = JSON.parse(hiscore);
     hiscoreBox.innerHTML = "High Score: " + hiscore;
 }
 
 window.requestAnimationFrame(main); //  Use this animation, because efficent, no flickering, high fps than set interval timeout
 
 // If anyone presses the key , then function fires 
 window.addEventListener('keydown', e =>{
     inputDir = {x: 0, y: 1} // Start the game, if any key is pressed
     moveSound.play(); // play the sound
 
     // To find which key is pressed , e is event 
     switch (e.key) {
         // Snake velocity, input dir
         case "ArrowUp":
             console.log("ArrowUp");
             inputDir.x = 0; // moves either in x-axis or y-axis
             inputDir.y = -1;
             break;
 
         case "ArrowDown":
             console.log("ArrowDown");
             inputDir.x = 0;
             inputDir.y = 1;
             break;
 
         case "ArrowLeft":
             console.log("ArrowLeft");
             inputDir.x = -1;
             inputDir.y = 0;
             break;
 
         case "ArrowRight":
             console.log("ArrowRight");
             inputDir.x = 1;
             inputDir.y = 0;
             break;
         default:
             break;
     }
 
 });