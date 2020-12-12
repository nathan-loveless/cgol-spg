// Solution 1 - This uses a 2D array as a matrix

/* 
Any live cell with fewer than two live neighbours dies - under population
Any live cell with two or three live neighbours lives - unchanged
Any live cell with more than three live neighbours dies - over population
Any dead cell with exactly three live neighbours will come to life.
*/

// Constants would normally go in their own file if they are used in multiple places
// to prevent file bloat.
const TOP_LEFT = { row: -1, col: -1 }
const TOP = { row: -1, col: 0 }
const TOP_RIGHT = {row: -1, col: 1 }
const LEFT = { row: 0, col: -1 }
const RIGHT = { row: 0, col: 1 }
const BOTTOM_LEFT = { row: 1, col: -1 }
const BOTTOM = { row: 1, col: 0 }
const BOTTOM_RIGHT = { row: 1, col: 1 }

function generateNeighbors(row, col, rowWidth, colWidth, arr) {
    // We need to make sure we have valid neighbors, if not then skip it
    // If row or col is less than 0 we have a negative index
    // If row or col is greater than its widths we overstepped our array
    // not because it would be an if else and would do nothing on one of the conditions
    if(!((row < 0 || col < 0) || (row >= rowWidth || col >= colWidth))) {
        // We need to check to see if the neighbor is alive or dead
        if(arr[row][col] === 1) {
            return 1;
        }

        return 0
    }

    // Not valid neighbor
    return 0;
}

function gameOfLife(arr, steps) { 
    // We have nothing
    if(arr.length == 0) {
        console.log("Not a valid grid for Conway's Game of Life!");
    }

    // The buffer keeps track of the state on next render
    // We swap it at the end.
    let buffer = [] 

    for(let s = 0; s < steps; s++) {
        for(let i = 0; i < arr.length; i++) {
            let rowWidth = arr.length
            let colWidth = arr[i].length
            let alive = 0;

            for(let j = 0; j < arr[i].length; j++) {
                // Find all neighbors that are alive to determine the fate of the cell
                alive += generateNeighbors(i + TOP_LEFT.row, j + TOP_LEFT.col, rowWidth, colWidth, arr);
                alive += generateNeighbors(i + TOP.row, j + TOP.col, rowWidth, colWidth, arr);
                alive += generateNeighbors(i + TOP_RIGHT.row, j + TOP_RIGHT.col, rowWidth, colWidth, arr);
                alive += generateNeighbors(i + LEFT.row, j + LEFT.col, rowWidth, colWidth, arr);
                alive += generateNeighbors(i + RIGHT.row, j + RIGHT.col, rowWidth, colWidth, arr);
                alive += generateNeighbors(i + BOTTOM_LEFT.row, j + BOTTOM_LEFT.col, rowWidth, colWidth, arr);
                alive += generateNeighbors(i + BOTTOM.row, j + BOTTOM.col, rowWidth, colWidth, arr);
                alive += generateNeighbors(i + BOTTOM_RIGHT.row, j + BOTTOM_RIGHT.col, rowWidth, colWidth, arr);

                // Determine whether the cell becomes alive again, dies or is unchanged.
                // Under population
                if(alive < 2) {
                    buffer.push({currState: arr[i][j], newState: 0, row: i, col: j })
                }

                // Stays the same, this check may not be necessary depending on the other checks
                if(alive >= 2 && alive <= 3 && arr[i][j] === 1) {
                    buffer.push({currState: arr[i][j], newState: 1, row: i, col: j})
                }
    
                // Over populated
                if(alive > 3 && arr[i][j] == 1) {
                    buffer.push({currState: arr[i][j], newState: 0, row: i, col: j})
                }
    
                // Dead cell comes back to life
                if(alive === 3 && arr[i][j] === 0) {
                    buffer.push({currState: arr[i][j], newState: 1, row: i, col: j})
                }

                alive = 0;
            }

            // Render the current step in the array
            console.log(arr[i],);
        }

        console.log('\n\n');

        // Swap the buffer and the array to prepare for next step
        buffer.map(item => {
            arr[item.row][item.col] = item.newState;
        })

        // Clear the buffer
        buffer = [];
        
    }
}

// These below are know variations that have known outcomes to 
// test properly.
gameOfLife([[1,1,1],[0,0,0],[1,1,1]], 3); // Default from test
gameOfLife([[1,1,0,0],[1,1,0,0],[0,0,1,1], [0,0,1,1]], 6); // Beacon alternating 2 periods
gameOfLife([[0,0,0,0],[0,1,1,1],[1,1,1,0],[0,0,0,0]], 3);// Blinker alternating 2 periods
gameOfLife([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
[0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],16); // Penta-decathlon 15 periods

gameOfLife([], 4); // This should return null