let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x;let y;
let mouseIsClicking;

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
        // Adding a function that activates when user moves it's cursor on the cell (WIP)
        div.addEventListener('mouseover', testClick);
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
// Change 'mouse is clicking' variable in order to the mouse clicking
gameGrid.addEventListener('mousedown', ()=>mouseIsClicking=true);
gameGrid.addEventListener('mouseup',   ()=>mouseIsClicking=false);
// Paint cells (WIP)
function testClick(){
    // Read clicked cell's id
    let clicked=document.getElementById(this.id);
    // Paint or remove cell class if the mouse is clicking the body of the page
    if(mouseIsClicking){
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
}