/**
 * Name: bingo_randomize.js
 * Author: Nathan Wisla
 * Purpose: To create a randomized bingo card
 * Date: 2024-04-08 
 */

// =========== METHODS ==================================================================================================

/**
 * parse_csv: parses a fetch response's text body. This method assumes the text body a two-column CSV. Column 2 is assumed to be a category 
 * and will become an object property in the output.
 * @param {String} textBody the text that will be used to parse
 * @param {String} NEWLINE default "\r\n": Specify which character is a newline character
 * @param {String} DELIM default ",": Specify a CSV delimiter.
 * @returns {Object} An Object that contains arrays of column 1, grouped by column 2.
 */
export let parse_csv = (textBody, NEWLINE="\r\n", DELIM=",") => {
    // const text = await fetch_text();
    
    // Split the text into rows
    let rows = textBody.split(NEWLINE);

    rows.shift();
    
    
    let obj = {};
    for (let row of rows) {
        
        row = row.split(DELIM);
        
        if (!obj[row[1]]) {
            obj[row[1]] = [row[0]]
        } else {
            obj[row[1]].push(row[0])
        }
    }
    
    return obj;
}

/**
* insert_random_text(Array) takes a parsed CSV and inserts random text from the CSV into the HTML document body.
 * @param {Object} insert_list
 * @param {Array} exempt_cells 
 */
export let insert_random_text = (insert_list, exempt_cells=["cell-3-3", "cell-1-1", "cell-1-5", "cell-5-1","cell-1-5","cell-5-5"]) => {
    let assorted_cells = {}
    for (const color of Object.getOwnPropertyNames(insert_list)) {
        assorted_cells[color] = document.getElementsByClassName(color)
    }

    // Create a random picker for each list generated in the last step 
    // The format is [key,value] for [color,cells]
    for (const [color,cells] of Object.entries(assorted_cells)) {
        // pick randomly from the array based on its length
        for (const cell of cells) {
            //Check to see if the array still has at least one item
            // Do not populate any exempt cells, and do not populate if the list is empty
            if (!exempt_cells.includes(cell.id) && !!insert_list[color].length) {
                let rand = remove_random(insert_list[color]);
                cell.innerHTML = rand;
                }            
        }
    }
}

// ============ SYNC FUNCTIONS ==========================================================================================

/**
 * random_from_list(Array) takes an input array and "pops" exactly one random element from the input.
 * @param {Array} list an Array to be pulled from random.
 * @returns The value of the popped array element
 */
let remove_random = (list) => {
    
    if (!Array.isArray(list)){
        return;
    } 
    let randomize = (lower, upper) => {
        return Math.floor(Math.random() * upper) + lower
    }
    const RAND = randomize(0,list.length)
    let drop = list.splice(RAND,1)[0]
    return drop;
}

// insert_random_text();