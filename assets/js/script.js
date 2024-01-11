
const container = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText = document.querySelector(".game-text")
const playTime = document.querySelector(".play-time")
//Number of tiles
const tileCount = 16;

let tiles = [];
//Variable to store data for dragged tiles
const dragged = {
    el: null,
    class: null,
    index: null,
}

setGame();

//Function to show puzzle image and shuffle after 2 seconds
function setGame(){
    tiles = createImageTiles();
    tiles.forEach(tile => container.appendChild(tile))
    setTimeout(() => {
        container.innerHTML = "";
        shuffle(tiles).forEach(tile => container.appendChild(tile))
    },2000)
}
 
//Function to create image tiles
function createImageTiles(){
    const tempArray = [];
    Array(tileCount).fill().forEach( (_, i) => {
        const li = document.createElement("li");
        li.setAttribute('data-index', i)
        // Dragevent
        li.setAttribute('draggable', 'true');
        li.classList.add(`list${i}`);
        tempArray.push(li)
    })
    return tempArray;
}

// Shuffle puzzle tiles
function shuffle(array){
    let index = array.length -1;
    while(index > 0){
        const randomIndex = Math.floor(Math.random()*(index+1));
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
        index--;
    }
    return array;
}
//Function to check status (li and index) of dropped tile to complete the game

function checkStatus(){
    const currentList = [...container.children];
    //returns number of unmatched li and index
    const unMatchedList = currentList.filter((child, index) => Number(child.getAttribute("data-index")) !== index)
    if(unMatchedList.length === 0){
        // game finish
        
    }
}

// Drag event to ul to drag tiles
container.addEventListener('dragstart', e => {
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    //Get dragged index number of the tile
    dragged.index = [...obj.parentNode.children].indexOf(obj);
})
// Dragover event to ul to overlay tiles
container.addEventListener('dragover', e => {
    //Stop dragover when dropped
    e.preventDefault()
})
// Drop event to ul to drop tiles
container.addEventListener('drop', e => {
    const obj = e.target;

    //Get dropped index number of the tile if object's class name is different from the start
    if (obj.className !== dragged.class){
        let originPlace;
        let isLast = false;

        if(dragged.el.nextSibling){
            originPlace = dragged.el.nextSibling
        } else {
            originPlace = dragged.el.previousSibling
            isLast = true;
        }
        const droppedIndex = [...obj.parentNode.children].indexOf(obj);
        dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el)
        isLast ? originPlace.after(obj) : originPlace.before(obj)
    }
    //checks status every time the tile dropped
    checkStatus();

})

