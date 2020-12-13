// Solution 2 - uses a single array with rows, cols added as parameters

/* 
Any live cell with fewer than two live neighbours dies - under population
Any live cell with two or three live neighbours lives - unchanged
Any live cell with more than three live neighbours dies - over population
Any dead cell with exactly three live neighbours will come to life.
*/

function generateNeighbors(i, index, length, row, neighbor, arr) {
        // We need to make sure we have valid neighbors, if not then skip it
        // If index is less than 0 we have a negative index
        // If index greater than arr.length we are out of bounds on the array

        // Special Cases:
        // First indexes of every row need to have special cases
        // applied to the BOTTOM_LEFT, LEFT, TOP_LEFT
        //
        // Last indexes of every row need to have special cases
        // applied to the TOP_RIGHT, RIGHT

        // First element in row
        if(i === length * row && (neighbor === 3 || 
           neighbor == -1 || neighbor === -5)) {
            index = -1;
        }

        // last element in row
        if(i === length * row - 1 && (neighbor === -3 || 
           neighbor === 1 || neighbor === 5)) {
            index = -1
        }

        //console.log(index);

        if(!((index < 0) || (index > 16))) {
                // We need to check to see if the neighbor is alive or dead
                if(arr[index] === 1) {
                    return 1;
                }
    
            return 0
        }
    
        // Not valid neighbor
        return 0;
    }

function generateConsts(cols) {
    return {
        TOP_LEFT: -cols - 1,
        TOP: -cols,
        TOP_RIGHT: -cols + 1,
        LEFT: -1,
        RIGHT: 1,
        BOTTOM_LEFT: cols - 1,
        BOTTOM: cols,
        BOTTOM_RIGHT: cols + 1
    }
}

function gameOfLife(arr, cols, steps) { 
    // We have nothing
    if(arr.length == 0) {
        console.log("Not a valid grid for Conway's Game of Life!");
    }

    // The buffer keeps track of the state on next render
    // We swap it at the end.
    let buffer = []
    let alive = 0; // count of alive neighbors

    const OFFSETS = generateConsts(cols);

    for(s = 0; s < steps; s++) {
        for(let i = 0; i < arr.length; i++) {
            // Find all neighbors that are alive to determine the fate of the cell
            alive += generateNeighbors(i, i + OFFSETS.TOP_LEFT, cols, Math.ceil(i/cols), OFFSETS.TOP_LEFT, arr); 
            alive += generateNeighbors(i, i + OFFSETS.TOP, cols, Math.ceil(i/cols), OFFSETS.TOP, arr);
            alive += generateNeighbors(i, i + OFFSETS.TOP_RIGHT, cols, Math.ceil(i/cols), OFFSETS.TOP_RIGHT, arr);
            alive += generateNeighbors(i, i + OFFSETS.LEFT, cols, Math.ceil(i/cols), OFFSETS.LEFT, arr);
            alive += generateNeighbors(i, i + OFFSETS.RIGHT, cols, Math.ceil(i/cols), OFFSETS.RIGHT, arr);
            alive += generateNeighbors(i, i + OFFSETS.BOTTOM_LEFT, cols, Math.ceil(i/cols), OFFSETS.BOTTOM_LEFT, arr);
            alive += generateNeighbors(i, i + OFFSETS.BOTTOM, cols, Math.ceil(i/cols), OFFSETS.BOTTOM, arr);
            alive += generateNeighbors(i, i + OFFSETS.BOTTOM_RIGHT, cols, Math.ceil(i/cols), OFFSETS.BOTTOM_RIGHT, arr);

            // Determine whether the cell becomes alive again, dies or is unchanged.
            // Under population
            if(alive < 2) {
                buffer.push({currState: arr[i], newState: 0, index: i })
            }

            // Stays the same, this check may not be necessary depending on the other checks
           else if(alive >= 2 && alive <= 3 && arr[i]=== 1) {
                buffer.push({currState: arr[i], newState: 1, index: i })
            }

            // Over populated
           else if(alive > 3 && arr[i] == 1) {
                buffer.push({currState: arr[i], newState: 0,  index: i })
            }

            // Dead cell comes back to life
            else if(alive === 3 && arr[i] === 0) {
                buffer.push({currState: arr[i], newState: 1, index: i})
            }

            else {
                buffer.push({currState: arr[i], newState: 0, index: i})
            }

            alive = 0;
        }

            // Render the current step in the array
            console.log(arr);            

            // Swap the buffer and the array to prepare for next step
            buffer.map(item => {
                arr[item.index] = item.newState;
            })

        // Clear the buffer
        buffer = [];

    }

}

// These below are know variations that have known outcomes to 
// test properly.
gameOfLife([[1,1,1],[0,0,0],[1,1,1]], 3, 3); // Default from test
gameOfLife([1,1,0,0,1,1,0,0,0,0,1,1,0,0,1,1], 4, 3); // Beacon alternating 2 periods
gameOfLife([0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0], 4, 3);// Toad alternating 2 periods
gameOfLife([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 16, 1); // Penta-decathlon 15 periods
gameOfLife([], 4); // This should return null