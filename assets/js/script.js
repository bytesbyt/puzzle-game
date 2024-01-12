/**
 * Declare constants for DOM elements
 */

const container = document.querySelector(".image-container");
const startButton = document.querySelector(".start-button");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

//Number of tiles
const tileCount = 16;

let tiles = [];
//Variable to store data for dragged tiles
const dragged = {
    el: null,
    class: null,
    index: null,
};

//Variable to stop dragstart when the game is finished
let isPlaying = false;
//Variable for time count
let timeInterval = null;
let time = 0;

//Function to check status (li and index) of dropped tile to complete the game
function checkStatus(){
    const currentList = [...container.children];
    //returns number of unmatched li and index
    const unMatchedList = currentList.filter((child, index) => Number(child.getAttribute("data-index")) !== index);
     //Finish the game when there is 0 unmatched list
    if (unMatchedList.length === 0){
       gameText.style.display = "block";
       isPlaying = false;
       //Stop time count when complete
       clearInterval(timeInterval);
    }
}
/**
 * Functions
 */
//Function to start the game
function setGame(){
    isPlaying = true;
    time = 0 ;
    container.innerHTML = "";
    gameText.style.display = 'none';
    clearInterval(timeInterval);
    
    tiles = createImageTiles();
    tiles.forEach(tile => container.appendChild(tile));
    setTimeout(() => {
        container.innerHTML = "";
        shuffle(tiles).forEach(tile => container.appendChild(tile));
        // Time count
        timeInterval = setInterval(() => {
            playTime.innerText = time;
            time++;
        }, 1000);
    }, 3000);
}
 
//Function to create image tiles
function createImageTiles(){
    const tempArray = [];
    Array(tileCount).fill().forEach( (_, i) => {
        const li = document.createElement("li");
        li.setAttribute('data-index', i);
        // Dragevent
        li.setAttribute('draggable', 'true');
        li.classList.add(`list${i}`);
        tempArray.push(li);
    });
    return tempArray;
}

// Shuffle puzzle tiles
function shuffle(array){
    let index = array.length -1;
    while(index > 0){
        const randomIndex = Math.floor(Math.random()*(index+1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
        index--;
    }
    return array;
}
/**
 * Add event listener for 
 * drag and drop
 */
// Drag event to ul to drag tiles
container.addEventListener('dragstart', e => {
    if(!isPlaying) return;
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    //Get dragged index number of the tile
    dragged.index = [...obj.parentNode.children].indexOf(obj);
});
// Dragover event to ul to overlay tiles
container.addEventListener('dragover', e => {
    //Stop dragover when dropped
    e.preventDefault();
});
// Drop event to ul to drop tiles
container.addEventListener('drop', e => {
    if(!isPlaying) return;
    const obj = e.target;

    //Get dropped index number of the tile if object's class name is different from the start
    if (obj.className !== dragged.class){
        let originPlace;
        let isLast = false;

        if(dragged.el.nextSibling){
            originPlace = dragged.el.nextSibling;
        } else {
            originPlace = dragged.el.previousSibling;
            isLast = true;
        }
        const droppedIndex = [...obj.parentNode.children].indexOf(obj);
        dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el);
        isLast ? originPlace.after(obj) : originPlace.before(obj);
    }
    //checks status every time the tile dropped
    checkStatus();

});

// Add event to start the game when start button is clicked
startButton.addEventListener('click', () => {
    setGame();
});