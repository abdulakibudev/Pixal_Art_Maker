"use strict";

/////////// CANVAS AREA ///////////

// Not sure if this needs to be global but it is for now
let selectedColor;

// This handles the changing of the grid size
const gridSize = document.getElementById("grid-size");
gridSize.addEventListener("change", (e) => {
    // If there is a change, run these lines
    const size = parseInt(e.target.value);
    createGrid(size);
});

// Function that runs once the grid size is changed
const createGrid = (size) => {
    // Grab the canvas element and clear it out
    const canvas = document.querySelector(".canvas");
    canvas.innerHTML = "";
    // Create a table element
    const table = document.createElement("TABLE");

    // Create a table with x height and x width that equals the size from the select (small = 25, large = 40)
    for (let i = 1; i <= size; i++) {
        // Creation or a table row
        const tableRow = document.createElement("TR");
        for (let j = 1; j <= size; j++) {
            // Creation of a table cell
            const tableCell = document.createElement("TD");

            // Alternate the background color (creates a checkered background)
            if ((i + j) % 2 === 0) {
                tableCell.classList.add("gray-bg");
            } else {
                tableCell.classList.add("white-bg")
            }

            // Add each cell to the row
            tableRow.appendChild(tableCell);
        }
        // Add the row to the table
        table.appendChild(tableRow);
    }
    //Once everything is complete, add the table to the canvas
    canvas.appendChild(table);

    // Run this function
    addCellEvents();
};

// This function adds click event listeners to each cell
const addCellEvents = () => {
    const tds = document.querySelectorAll("td");
    tds.forEach((td) => {
        td.addEventListener("click", (e) => {
            e.target.style.background = selectedColor;
        })
    });

    // Returns the NodeList of table cells
    return tds;
};

//This function is used to change the global selectedColor variable
const colorSelect = () => {
    const inputColor = document.querySelector("#color");
    // On change, update the selectedColor variable
    inputColor.addEventListener("change", (e) => {
        selectedColor = e.target.value;
        // console.log(selectedColor);
    })
}

// This function is used to control what happens on mouse hown and hold
const paintBrush = () => {
    // On mouse down
    document.body.addEventListener("mousedown", (e) => {
        // console.log("down", e.which);

        // If the button is the left button and we are in a table cell
        if (e.which === 1 && e.target.tagName === "TD") {
            // There was a problem when dragging that would cause the painted squares to follow the mouse cursor, preventDefault solves this
            e.preventDefault();
            // The current cell gets painted
            e.target.style.backgroundColor = selectedColor;
            // Run this function
            painter();
        }

        // If the button is the right button and we are in a table cell
        if (e.which === 3 && e.target.tagName === "TD") {
            // Remove the style attribute of the current cell
            e.target.removeAttribute("style");
            // Run this function
            painter();
        }

        
    });

    // When the mouse button is released
    document.body.addEventListener("mouseup", (e) => {
        // console.log("up", e.which);

        // Grab all the table cells and remove the mouseenter event listener
        const tds = addCellEvents();
        tds.forEach((td) => {
            td.removeEventListener("mouseenter", paint)
        })
    });  
}

// This function paints each cell depending on which button is clicked
const paint = (e) => {
    // console.log(e);

    // If the left button was clicked add the selected color to the background of the cell, otherwise the right button must have been clicked so remove the style attribute entirely
    if (e.buttons === 1) {
        e.target.style.backgroundColor = selectedColor;
    } else if (e.buttons === 2) {
        e.target.removeAttribute("style");
    }
};

// This function works with the paint function and used to add mouseenter events to each table cell
const painter = () => {
    // console.log("env", env);

    // Grab all the table cells
    const tds = addCellEvents();
    // Add a mouseenter event that changes the background color to the selected color, see: paint function
    tds.forEach((td) => {
        td.addEventListener("mouseenter", paint);
    })
};

// In order to use the right button to clear paint, the context menu default behavior must be disabled on the table element
const preventContextMenu = () => {
    document.querySelector("table").addEventListener("contextmenu", (e) => {
        e.preventDefault();
    })
}

/////////// TOOLS AREA ///////////

// This function is used to set the selected paint global variable
const getPaint = () => {
    // First starts out as the color of the default selected li
    selectedColor = document.querySelector(".selected").id;
    //Grab all the lis on the page
    const paintsLis = document.querySelectorAll("li");
    paintsLis.forEach((paintLi) => {
        // For each li, change the background color to the color of its ID
        paintLi.style.backgroundColor = paintLi.id;

        // Add a event click event to each li
        paintLi.addEventListener("click", (e) => {
            // If an li is clicked, remove the selcted class from all the li's
            paintsLis.forEach(paintLi => paintLi.classList.remove("selected"));
            // Add the selected class to the clicked li
            e.target.classList.add("selected");
            // Set the selectedColor global variable to that color
            selectedColor = e.target.id;
        });
    })
}


/////////// INIT AREA ///////////

// Reset button code, on click, run init()
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", init);

// Used to create the grid, and activate all the other functions
function init() {
    createGrid(Number(document.querySelector("#grid-size").value));
    paintBrush();
    preventContextMenu();
    getPaint();
    colorSelect();
}
init();

console.log("Thanks for checking out my Pixel Art Maker.")
console.log("For additional projects, check out my other GitHub repos @ https://github.com/thisfncodeio/");