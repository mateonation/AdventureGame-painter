# AdventureGame-painter
Made by Mateo Fernández Rivera (mateonation)
>[https://mateonation.github.io/AdventureGame-painter/](https://mateonation.github.io/AdventureGame-painter/)

## 📌 DESCRIPTION
"AdventureGame-painter" is a tool very useful to design levels for my ["AdventureGame"](https://github.com/mateonation/AdventureGame-WIP).
It shows the 51x25 grid used on that game. The user can paint the grid cells of each of the game elements by clicking on each of them. It even can position the spawn point where the player should spawn in the level and the goal to reach.

## 📜 CONTROLS
When the user moves the cursor, it paints the cells below the cursor if the user holds down the right mouse button.
Below the grid, there's a little bar with various options:

### 🖌️ Select element to paint on grid
First drop-down menu where the user chooses the element with which he wants to paint the cells.
These are:
- Walls
- Lava
- Door
- Bridge
- Door opener button
- Bridge deployer button
- Player's spawn point
- Goal point

>[!NOTE]
>These last three elements **<ins>must have one</ins>** position maximum each on the grid.

### ❌ Select element to delete on grid
Another drop-down menu where the user selects the element they want to delete from the grid. This removes all cells with the selected element when the 'RESET' button next to it gets pressed.
User can select the 'ALL' option in that menu and get a confirmation alert. If yes is selected, all cells that got edited resets to it's original state.

### 💾 Export all element's position
Finally, when the user is done designing it's level, they can press the 'EXPORT' button on the right side of the bar below the game grid.
This makes a 'pop-up' window appear at the center of the screen displaying a textbox that shows every position for any cell contained in an array. Ready to be copy-and-pasted into the script of the original "AdventureGame" on a new case in the switch of the _modifyCell();_ function!

>[!WARNING]
>Please, make sure that 'door opener', 'bridge button', 'spawn point' and 'goal' elements are painted **<ins>NOT PAINTED ON MULTIPLE CELLS</ins>** as the export text area will only show one position for each of them.