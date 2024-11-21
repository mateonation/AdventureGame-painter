let cells=[];
let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x;let y;
let mouseIsClicking=false;
let iserasing=false;

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
        cells.push(div);
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
    let paintLike=selectElement();
    // Read first class of the cell
    let firstclass=clicked.classList.item(0);
    // If the cell has 'cell' class => replace it for the one that's assigned on select menu
    if(clicked.classList.contains('cell')){
        clicked.classList.remove('cell');
        clicked.classList.add(paintLike);
    // If the cell's first class it's not like the one that's selected
    }else if(clicked.classList.item(0)!=paintLike){
        clicked.classList.remove(firstclass);
        clicked.classList.add(paintLike);
    // If the cell has the class that's selected => turn it into 'cell' class
    }else if(clicked.classList.contains(paintLike)){
        clicked.classList.remove(paintLike);
        clicked.classList.add('cell');
    }
}

// Function to erase elements
function resetElement(){
    // Is erasing to true
    iserasing=true;
    let toerase=selectElement();
    // If an element is not selected in the reset menu, stop function
    if(toerase==='none'){
        alert('Please, select an element to erase');
        return;
    // If it's ALL elements, ask for confirmation
    // If 'no' is selected, stop function
    }else if(toerase==='all'){
        if(!confirm('This will erase all the elements on the grid.\nContinue?')){
            return;
        }
    }
    switch(toerase){
        case 'all':
            for(i=0;i<cells.length;i++){
                let cell=document.getElementById(cells[i].id);
                // Read first class of the cell
                let firstclass=cell.classList.item(0);
                // Replace first class of the cell for 'cell' if it has another class
                if(firstclass!='cell'){
                    cell.classList.remove(firstclass);
                    cell.classList.add('cell');
                }
            }
            break;
        default:
            for(i=0;i<cells.length;i++){
                let cell=document.getElementById(cells[i].id);
                // Read first class of the cell
                let firstclass=cell.classList.item(0);
                // Replace first class of the cell for 'cell' if it has the class that's being deleted
                if(firstclass===toerase){
                    cell.classList.remove(toerase);
                    cell.classList.add('cell');
                }
            }
            break;
    }
    iserasing=false;
}

// Function to select elements
function selectElement(){
    let sel;
    if(iserasing){
        sel=document.getElementById('erase_index');
    }else{
        sel=document.getElementById('elements_index');
    }
    let value=sel.options[sel.selectedIndex].value;
    return value;
}
// Change 'mouse is clicking' value to true if mouse is being clicked
window.addEventListener('mousedown', function(){
    mouseIsClicking=true
})
// Change 'mouse is clicking' value to false if when the mouse's clicking is released
window.addEventListener('mouseup', function(){
    mouseIsClicking=false
})