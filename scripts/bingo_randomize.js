/**
 * Name: bingo_randomize.js
 * Author: Nathan Wisla
 * Purpose: To create a randomized bingo card
 * Date: 2024-04-08 
 */

// =========== METHODS ==================================================================================================

/**
 * parse_csv: parses a fetch response's text body. This method assumes the text body an n-column CSV. Output is an object
 * with the column's name as the object property in the output.
 * @param {String} textBody the text that will be used to parse
 * @param {String} NEWLINE default "\r\n": Specify which character is a newline character
 * @param {String} DELIM default ",": Specify a CSV delimiter.
 * @returns {Object} An Object that contains arrays of column 1, grouped by column 2.
 */
export let parse_csv = (textBody, NEWLINE="\r\n", DELIM=",") => {
    let rows = textBody.split(NEWLINE);

    // Grab the column names of the sheet
    let cols = rows.shift().split(DELIM);
    const REGEX = /blue|green|yellow/;

    // Convert the column names to their containing color class, if a color was specified
    // If it was not, map the object to null and do not include it in the result
    cols = cols.map(col => {
        col = col.toLowerCase();
        return col.match(REGEX) && !!col? col.match(REGEX)[0] : null;    
    });

    // Save an object with the column names being the object name
    let obj = {};
    for(let row of rows) {            
        row = row.split(DELIM);
       
        for(let i in cols) {
            row[i] = !!row[i]? row[i].trim() : null ;
            // Ensure the column exists (it is not a blank entry in the csv)
            if (!!cols[i]) {
                if(!obj[cols[i]]) {   
                    obj[cols[i]] = [row[i]];
                
                } else if (!!row[i]) {
                    obj[cols[i]].push(row[i]);
                }
            }
        }
    }

    return obj;

}

/**
* insert_random_text(Array) takes a parsed CSV and inserts random text from the CSV into the HTML document body.
 * @param {Object} insert_list
 * @param {Array} exempt_cells
 * @param {Array} const_cells
 * @param {Array} const_defaults
 */
export let insert_random_text = (insert_list, exempt_cells=["cell-3-3"], const_cells=["cell-1-1","cell-5-1","cell-1-5","cell-5-5"], const_defaults=["Ask the presenter a question.","Participate in the presentation."]) => {
    let assorted_cells = {};
    const DEFAULT = "default"

    for (const color of ["yellow","green","blue"]) {
        assorted_cells[color] = document.getElementsByClassName(color);
        
        if (!Object.getOwnPropertyNames(insert_list).includes(color)) {
            insert_list[color] = DEFAULT;
        }
    }

    // Create a random picker for each list generated in the last step 
    // The format is [key,value] for [color,cells]
    let const_counter = 0
    for (const [color,cells] of Object.entries(assorted_cells)) {
        // pick randomly from the array based on its length

        for (const cell of cells) {
            //Check to see if the array still has at least one item; do not populate if the list is empty
            if (insert_list[color] === DEFAULT || !!insert_list[color].length) {

               // Populate constant (blue) cells with defaults if the csv is does not include a value
                if (const_cells.includes(cell.id) && insert_list[color] === DEFAULT) {
                    
                    // Use a bitwise operator on the 2-array to make it alternate in index: [0,1,1,0],0,1...
                    cell.innerHTML = const_defaults[(const_counter ^ const_counter >> 1) & 1];
                    const_counter++
                    }
                // Do not populate any exempt cells
                else if (!exempt_cells.includes(cell.id)) {
                    let rand = remove_random(insert_list[color]);
                    cell.innerHTML = rand;
                    }                    
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
    let popped_value = list.splice(RAND,1)[0]
    return popped_value;
}

// insert_random_text();