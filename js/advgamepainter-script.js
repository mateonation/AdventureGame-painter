let cells=[];
let gameGrid=document.querySelector('.game-grid');
const xinitial=-25;const yinitial=12;
let x;let y;
let playerisdead=false;

// ELEMENTS FROM EACH LEVEL
// COMMON VALUES AND ARRAYS
let level;
let spawnpoint=["0/0"];
let goal=["-10/7"];
let doorbutton=["-8/-6"];
// LEVEL 0
let wall0=[
    "8/9","9/9","10/9","11/9","12/9","13/9","14/9",
    "8/8","9/8","10/8","11/8","12/8","13/8","14/8",
    "8/7","9/7","10/7","11/7","12/7","13/7","14/7",
    "8/6","9/6","10/6","11/6","12/6","13/6","14/6",
    ];
let lava0=[
    "8/-9","9/-9","10/-9","11/-9","12/-9","13/-9","14/-9",
    "8/-8","9/-8","10/-8","11/-8","12/-8","13/-8","14/-8",
    "8/-7","9/-7","10/-7","11/-7","12/-7","13/-7","14/-7",
    "8/-6","9/-6","10/-6","11/-6","12/-6","13/-6","14/-6",
    ];
let door0=[
    "-16/9","-15/9","-14/9","-13/9","-12/9","-11/9","-10/9","-9/9","-8/9",
    "-16/8","-8/8",
    "-16/7","-8/7",
    "-16/6","-8/6",
    "-16/5","-8/5",
    "-16/4","-15/4","-14/4","-13/4","-12/4","-11/4","-10/4","-9/4","-8/4"
    ];

window.onload=function(){
    //TESTING
    // Set level number when page is loaded
    level=0;
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
        // Add a class to the div according to the level's number
        if(doorbutton[level]===div.id){
            div.classList.add('door-button');
        }else if(goal[level]===div.id){
            div.classList.add('goal');
        }else{
            div=modifyCell(div,level);
        }
        // Push it to the cells array
        cells.push(div);
        // Show cell on the screen
        gameGrid.append(cells[i]);
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
    // After generating all the cells, locate player's block with the level's spawnpoint
    locatePlayer(spawnpoint[level]);
    // Show level's number on the bottom section of the page
    let bottomsection=document.getElementsByClassName('bottom-screen')[0];
    bottomsection.textContent='LEVEL: '+level;
}

// Function to edit cells according to the actual level
function modifyCell(cell,levelnum){
    switch(levelnum){
        // Level 0
        case 0:
            // Add 'wall' class to the cell (if it's included on the walls' array associated to it's level)
            if(wall0.includes(cell.id)){
                cell.classList.add('wall');
            }
            // Add 'lava' class to the cell (if it's included on the lava's array associated to it's level)
            else if(lava0.includes(cell.id)){
                cell.classList.add('lava');
            }
            // Add 'door' class to the cell (if it's included on the door's array associated to it's level)
            else if(door0.includes(cell.id)){
                cell.classList.add('door');
            }
            // Add 'door-button' class to the cell (if it's id coincides with the one almacenated on the level number position of the door button's array)
            
            // Add 'goal' class to the cell (if it's id coincides with the one almacenated on the level number position of the goal's array)
            
            // Add 'cell' class to the cell if no other condition has been met
            else{
                cell.classList.add('cell');
            }
            return cell;
    }
}
// FUNCTION TO LOCATE PLAYER ON THE GRID
function locatePlayer(given){
    let playercell=document.getElementById(given);
    // If the next cell is a door button, it activates the door opening function
    if(playercell.classList.contains('door-button')){
        playercell.classList.remove('door-button');
        // Open the door according to it's level number
        openDoor(level);
    }else{
        // Remove 'cell' class from the cell the player is going to be
        playercell.classList.remove('cell');
    }
    // Placing 'player' class on the cell
    playercell.classList.add('player');
    // If the player reaches the goal, show alert (WIP - HERE IS WHERE THE NEXT LEVEL WOULD BE TRIGGERED)
    if(playercell.classList.contains('goal')){
        alert('!!you have succesfully completed level '+level+'!!');
    }
}

// FUNCTION FOR WHEN USER PRESSES A WASD KEY
document.body.addEventListener("keydown", (control)=>{
    if(playerisdead){
        return;
    }
    // Validator of next position to false
    let canmove=false;
    // Execute when one of these keys are pressed
    if(control.key=='w' || control.key=='a' || control.key=='s' || control.key=='d' || control.key=='W' || control.key=='A' || control.key=='S' || control.key=='D'){
        // Read current position of the player
        let player=document.getElementsByClassName('player')[0];
        position=player.id.split("/"); //["X","Y"]
        x=parseInt(position[0]);
        y=parseInt(position[1]);
        let futurepos;
        switch(control.key){
            // Move up
            case 'w': case 'W':
                // Get future position incrementing Y by one
                futurepos=document.getElementById(x+"/"+(y+1));
                // Player's block doesn't move if the future position is not valid
                if(verifyFuturePosition(futurepos)){
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false;
                }
                break;
            // Move down
            case 's':case 'S':
                // Get future position decreasing Y by one
                futurepos=document.getElementById(x+"/"+(y-1));
                // Player's block doesn't move if the future position is not valid
                if(verifyFuturePosition(futurepos)){
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false;
                }
                break;
            // Move left
            case 'a':case 'A':
                // Get future position decreasing X by one
                futurepos=document.getElementById((x-1)+"/"+y);
                // Player's block doesn't move if the future position is not valid
                if(verifyFuturePosition(futurepos)){
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false;
                }
                break;
            // Move right
            case 'd': case 'D':
                // Get future position incrementing X by one
                futurepos=document.getElementById((x+1)+"/"+y);
                // Player's block doesn't move if the future position is not valid
                if(verifyFuturePosition(futurepos)){
                    // Validator of the next position is true
                    canmove=true;
                }else{
                    canmove=false;
                }
                break;
        }
        if(!canmove){
            return;
        }
        // Remove player from current cell
        player.classList.remove('player');
        // Add cell to that cell
        player.classList.add('cell');
        // Locate player on it's future position
        locatePlayer(futurepos.id);
        // Locate player on spawn point if they're 'dead'
        playerDies(futurepos.id);
    }
});

//FUNCTION THAT VERIFIES NEXT POSITION
function verifyFuturePosition(futurepos){
    // Walk to the future position if it's not null, wall or a door
    if(futurepos!=null && !futurepos.classList.contains('wall') && !futurepos.classList.contains('door')){
        // Change state of player is dead to true if the cell they move to is not a walkable one
        if(!futurepos.classList.contains('cell') && !futurepos.classList.contains('door-button') && !futurepos.classList.contains('goal')){
            playerisdead=true;
        }
        return true;
    }else{
        return false;
    }
}

// FUNCTION THAT SPAWNS PLAYER ON IT'S SPAWN POINT EVERYTIME THEY WALK INTO A 'DEATH' CELL
function playerDies(given){
    // Execute if player is dead
    if(playerisdead){
        let player=document.getElementById(given);
        setTimeout(()=>{
            // Remove player from it's position
            player.classList.remove('player');
            // Relocate player on it's spawnpoint
            locatePlayer(spawnpoint);
            // Change it's state to false
            playerisdead=false;
        },400);
    }
}

// FUNCTION THAT OPEN DOORS
function openDoor(levelnum){
    switch(levelnum){
        // Open door from level 0
        case 0:
            // For every door removed, add a 'cell' class
            for(i=0;i<door0.length;i++){
                let openthisdoor=document.getElementById(door0[i]);
                openthisdoor.classList.remove('door');
                openthisdoor.classList.add('cell');
            }
            break;
    }
}