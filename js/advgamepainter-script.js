let cells=[];
let gameGrid=document.querySelector('.game-grid');
let popup=document.querySelector('.popup-overlay');
let textarea=document.getElementById('exportarea');
let clipboardbtn=document.getElementById('copytext');
let closebtn=document.getElementById('closepopup');
const xinitial=-25;const yinitial=12;
let x;let y;
let mouseIsClicking=false;
let iserasing=false;
let unique_el_sel=false;
const uniqueElements=['door-button','player-spawn','goal','bridge-button'];

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
            showPosition(this.id);
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
    // Read option from the select menu to paint cells
    let paintLike=selectElement();
    // Read first class of the cell
    let firstclass=clicked.classList.item(0);
    if(uniqueElements.includes(paintLike)){
        // If the element to paint is one included on the array of elements of unique position, alert the user for the first time only
        if(!unique_el_sel){
            alert('The next elements should only have one position:\n\n'+uniqueElements);
            unique_el_sel=true;
        }
    }
    // If the option to paint cells is the bridge, change only the text content
    if(paintLike==='B'){
        // If the button clicked was a bridge button, remove it's class and add cell class
        if(clicked.classList.contains('bridge-button')){
            clicked.classList.remove('bridge-button');
            clicked.classList.add('cell');
        }
        if(clicked.textContent==='B'){
            clicked.textContent='';
        }else{
            clicked.textContent='B';
        }
    }else{
        // IF THE OPTION TO PAINT IS THE BRIDGE BUTTON AND THE CONTENT OF THE CELL IS A BRIDGE, REMOVE BRIDGE
        if(paintLike==='bridge-button' && clicked.textContent==='B'){
            clicked.textContent='';
        }
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
        if(!confirm('This will erase all the elements on the grid.\n\nContinue?')){
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
        case 'B':
            for(i=0;i<cells.length;i++){
                let cell=document.getElementById(cells[i].id);
                if(cell.textContent===toerase){
                    cell.textContent='';
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

// Funtion that opens the export popup
function exportGrid(){
    clipboardbtn.removeAttribute('style');
    // ELEMENTS THAT CAN HAVE MULTIPLE IDs
    let wall=[];
    let lava=[];
    let door=[];
    let bridge=[];
    // ELEMENTS THAT ONLY HAVE ONE POSITION
    let spawnpoint;
    let door_button;
    let goal;
    let bridge_button;
    // Read all elements' position on grid
    for(i=0;i<cells.length;i++){
        let cell=document.getElementById(cells[i].id);
        // If cell's class is a cell => skip to next iteration
        if(!cell.classList.contains('cell')){
            if(cell.textContent==='B'){
                bridge.push(cell.id);
            }
            // If cell is a wall
            if(cell.classList.contains('wall')){
                wall.push(cell.id);
            }
            // If cell is lava
            if(cell.classList.contains('lava')){
                lava.push(cell.id);
            }
            // If cell is a door
            if(cell.classList.contains('door')){
                door.push(cell.id);
            }
            if(cell.classList.contains('bridge-button')){
                bridge_button=cell.id;
            }
            // If cell is a spawnpoint
            if(cell.classList.contains('player-spawn')){
                spawnpoint=cell.id;
            }
            // If cell is a door button
            if(cell.classList.contains('door-button')){
                door_button=cell.id;
            }
            // If cell is a door button
            if(cell.classList.contains('goal')){
                goal=cell.id;
            }
        }
    }
    let txtareastr='';
    // save all the positions in the string
    if(wall.length!=0){
        txtareastr='wall=[';
        for(i=0;i<wall.length;i++){
            if(i>0){
                txtareastr+=',';
            }
            txtareastr+='"'+wall[i]+'"'
        }
        txtareastr+='];\n';
    }
    if(lava.length!=0){
        txtareastr+='lava=[';
        for(i=0;i<lava.length;i++){
            if(i>0){
                txtareastr+=',';
            }
            txtareastr+='"'+lava[i]+'"'
        }
        txtareastr+='];\n';
    }
    if(door.length!=0){
        txtareastr+='door=[';
        for(i=0;i<door.length;i++){
            if(i>0){
                txtareastr+=',';
            }
            txtareastr+='"'+door[i]+'"'
        }
        txtareastr+='];\n';
    }
    if(bridge.length!=0){
        txtareastr+='bridge=[';
        for(i=0;i<bridge.length;i++){
            if(i>0){
                txtareastr+=',';
            }
            txtareastr+='"'+bridge[i]+'"'
        }
        txtareastr+='];\n';
    }
    // ELEMENTS THAT SHOULD ONLY HAVE ONE VALUE
    if(door_button!=undefined){
        txtareastr+='doorbutton="'+door_button+'";\n';
    }
    if(bridge_button!=undefined){
        txtareastr+='bridgebutton="'+bridge_button+'";\n';
    }
    if(spawnpoint!=undefined){
        txtareastr+='spawnpoint="'+spawnpoint+'";\n';
    }
    if(goal!=undefined){
        txtareastr+='goal="'+goal+'";\n';
    }
    textarea.textContent=txtareastr;
    // Copy to clipboard button won't show if the textarea is blank
    if(txtareastr===''){
        clipboardbtn.style.visibility='hidden';
        clipboardbtn.style.position='fixed';
    }else{
        clipboardbtn.textContent='COPY TO CLIPBOARD';
    }
    closebtn.textContent='CLOSE';
    popup.style.visibility='visible';
}

// Function that copies in clipboard all the text written on the textbox of the popup
function copytoClipboard(){
    navigator.clipboard.writeText(textarea.textContent);
    // Change text on the button
    clipboardbtn.textContent='COPIED!';
}

// Function that closes the export popup
function closePopup(){
    popup.removeAttribute('style');
}

// Show the position where the player is hovering their mouse
function showPosition(position){
    let bottomdis=document.getElementsByClassName('bottom-screen')[0];
    bottomdis.textContent=position;
}

// Change 'mouse is clicking' value to true if mouse is being clicked
window.addEventListener('mousedown', function(){
    mouseIsClicking=true
})
// Change 'mouse is clicking' value to false if when the mouse's clicking is released
window.addEventListener('mouseup', function(){
    mouseIsClicking=false
})