let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x;let y;
let mouseIsClicking=false;

window.onload=function(){
    //Generate game
    genGame();
}

// Function to generate the grid cells
function genGame(){
    cells=[];
    // Set initial variables for x and y before generating cells
    x=xinitial;
    y=yinitial;
    for(i=0;i<1275;i++){
        let div=document.createElement('div');
        // Add XY position
        div.id=x+"/"+y;
        // Add 'cell' class to the div
        div.classList.add('cell');
        // Cell does a function if the mouse is over it
        div.addEventListener('mouseover', function(){
            // Execute cell painting function if mouse is clicking
            if(mouseIsClicking){
                cellPainter(this.id);
            }
        });
        // Execute cell painting function when cell is being clicked
        div.addEventListener('mousedown', function(){
            cellPainter(this.id);
        });
        // Show cell on the screen
        gameGrid.append(div);
        // If X gets to the final element of the row
        if(x===25){
            // Reset X position
            x=xinitial;
            // Decrease Y position by 1
            y--;
        // If not
        }else{
            // Increment X position by 1
            x++;
        }
    }
}
// Paint cells (WIP)
function cellPainter(cell){
    // Read clicked cell's id
    let clicked=document.getElementById(cell);
    // If the cell has 'cell' class => replace it by other one (WIP)
    if(clicked.classList.contains('cell')){
        clicked.classList.remove('cell');
        clicked.classList.add('wall');
    // If not => replace other class for 'cell';
    }else{
        clicked.classList.remove('wall');
        clicked.classList.add('cell');
    }
}
// Change 'mouse is clicking' value to true if mouse is being clicked
window.addEventListener('mousedown', function(){
    mouseIsClicking=true
})
// Change 'mouse is clicking' value to false if when the mouse's clicking is released
window.addEventListener('mouseup', function(){
    mouseIsClicking=false
})