# BINGO
Author: Nathan Wisla

This repository contains a light web app that will spin up a customized random bingo card.

## How it works

The board is riddled with 3 different categories:

| Color  | Meaning                            | Quantity |
| ------ | ---------------------------------- | -------- |
| blue   | Participation prompts (static)     | 4        |
| yellow | General information   (randomized) | 12       |
| green  | Community information (randomized) | 8        |

To fill out the card, supply the web app with a CSV with two columns (with headers)
column 1: info<br>
column 2: color (between yellow and green)

**Tips:**

**Printing:**
* To print the card, press `ctrl+P` and select `Microsoft Print to PDF`.
* The inputs at the top of the app will not appear when printing.
* Margins _should_ be at 1 inch. If it is less than that, you can set custom margins in the printing options.
* You can remove headers and footers from the printout by setting the option.

**Inputs:**
* The script works by parsing a CSV file and randomly selecting from blue and yellow categories. If you supply anything other than `blue` or `yellow` in the categories column, **they will not appear on the bingo card**.
* The four corners of the card (`blue`) are left for your input.
* For the bingo card to randomize, it will require you to supply the CSV. You can create a CSV by starting an Excel file and saving the output as a CSV.
* Once you select your CSV, you may click _randomize_ as many times as you wish.
* You may select a picture to be set in the middle FREE SPACE. **_please ensure that your image is square_**. _optional_ 

