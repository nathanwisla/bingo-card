/**
 * Name: events.js
 * Author: Nathan Wisla
 * Purpose: To listen to events on the main HTML's inputs for bingo card customization.
 * Date: 2024-04-09 
 */

import { parse_csv, insert_random_text } from "./bingo_randomize.js";

// =========== INITIALIZATIONS ==========================================================================================
// Initalize objects to categorize the various DOM elements:
// button for button
// input for text input
// text for text output
// file for file inputs

let button= {};
let file = {};
let input = {}
let text = {};

button.text = document.getElementById("text-submit");
button.random = document.getElementById("randomize");

file.csv = document.getElementById("csv-input");
file.img = document.getElementById("img-input");
file.csv_body = null;
file.img_dom = document.getElementById("img");
file.csv_uploaded = false;
file.img_uploaded = false;

input.title = document.getElementById("title-input");
input._1_1 = document.getElementById("input-1-1");
input._1_5 = document.getElementById("input-1-5");
input._5_1 = document.getElementById("input-5-1");
input._5_5 = document.getElementById("input-5-5");

text.title = document.getElementById("title");
text._1_1 = document.getElementById("cell-1-1");
text._1_5 = document.getElementById("cell-1-5");
text._3_3 = document.getElementById("cell-3-3");
text._5_1 = document.getElementById("cell-5-1");
text._5_5 = document.getElementById("cell-5-5");

// =========== EVENT LISTENERS ==========================================================================================

file.csv.onchange = () => {
    let reader = new FileReader();
    reader.readAsText(file.csv.files[0]);
    button.random.disabled= false;

    reader.onload = (evt) => {
        file.csv_body = parse_csv(evt.target.result);
        file.csv_uploaded = true;
        console.log(file.csv_body, file.csv_uploaded);
    }
}

file.img.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(file.img.files[0]);

    reader.onload = (evt) => {
        file.img_dom.src = evt.target.result;
        file.img_dom.style.display = "block";
        text._3_3.lastChild.style.display = "none";

    }
}

button.random.onclick = () => {

    if(file.csv_uploaded){
        // Since insert_random_text() pops the array, create a copy and randomize the copy
        // JavaScript '=' operator assigns a reference to an object, it doesn't create a copy.
        // Since arrays are also objects, the copy will have to be made recursively. 
        // Credit to ChatGPT for the algorithm
        let csv_copy = (function deepCopy(obj) {
            if (obj === null || typeof obj !== "object") {
                return obj;
            }

            let copy = Array.isArray(obj) ? [] : {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {

                    copy[key] = deepCopy(obj[key]);
                }
            }
            return copy;
        })(file.csv_body);

        console.log("inserting random text from file!")
        
        insert_random_text(csv_copy)
    } else {
        console.log("no .csv supplied")
    }
}

button.text.onclick = () => {
    // check to see if each thing exists
    for (const key of Object.getOwnPropertyNames(input)) {
        
        if (!!input[key].value) {
            console.log(`Setting ${text[key]} to ${input[key].value}`)
            text[key].innerHTML = input[key].value
        }
    }    
}