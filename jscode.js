
let colorchoice = "black";

document.addEventListener("DOMContentLoaded", function(){
    createBoard(32);
    console.log("hi");
})

function getSize() {
    var bsize = prompt("How big do you want your board to be?");
    createBoard(bsize);
}


function createBoard(size) {
    let board = document.querySelector(".board");

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    let numDivs = size * size;

    for(let i = 0; i < numDivs; i++){
        let div = document.createElement("div");
        div.addEventListener("mouseover", colorDiv);
        board.insertAdjacentElement("beforeend", div);
    }
}

function randomColor() {
    let colorlst = ["black", "silver", "gray", "white", "maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua"]
    let length = colorlst.length

    let randnum = Math.floor(Math.random() * length);

    return colorlst[randnum]
}

function colorDiv() {
    if(colorchoice == "random"){
        this.style.backgroundColor = randomColor();
    }
    else {
        this.style.backgroundColor = 'black'
    }
}

function setColor(color) {
    colorchoice = color
}

function resetBoard() {
    let divs = document.querySelectorAll("div")
    divs.forEach((div) => div.style.backgroundColor = "white")
}