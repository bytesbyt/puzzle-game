const container = document.querySelector(".image-container")
const startButton = document.querySelector(".start-button")
const gameText = document.querySelector(".game-text")
const playTime = document.querySelector(".play-time")
//Number of tiles
const tileCount = 16;

let tiles = [];

//Sety to show puzzle image first and shuffle after 2secs
setGame();

function setGame(){
    tiles = createImageTiles();
    tiles.forEach(tile => container.appendChild(tile))
    setTimeout(() => {
        container.innerHTML = "";
        shuffle(tiles).forEach(tile => container.appendChild(tile))
    },2000)
}

function createImageTiles(){
    const tempArray = [];
    Array(tileCount).fill().forEach( (_, i) => {
        const li = document.createElement("li");
        li.setAttribute('data-index', i)
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
