(function () {
    "use strict";

    const attemptContent = document.querySelector("#attempt-content");
    const correctPebbleList = document.querySelector("#correct-list");
    const optionPebbles = document.querySelectorAll(".option-pebble");
    const optionList = document.querySelector("#option-list");
    const clearButton = document.querySelector("#clear-button");
    const newGameButton = document.querySelector("#newgame-button");


    //Create an HTML element, with attribute
    const newElement = function (elName, attrType, attrName) {
        const creatElement = document.createElement(elName);
        creatElement[attrType] = attrName;
        return creatElement;
    };

    const GameBoard = {
        currentRow: null,
        pebbleNr: 4,
        gameColors: ["red", "green", "blue", "yellow", "brown", "orange", "black", "white"],
        codeToGuess: ["red", "green", "black", "white"],
        clickedColors: [],
        validationResult: [],
        gameActive: false,

        //Apply correct pebbles, to correct pebble list
        applyCorrectPebbles: function () {
            for (let i = 0; i < this.pebbleNr; i++) {
                const correctList = createDivEl("correct-pebble");
                correctList.textContent = "?";
                correctPebbleList.appendChild(correctList);
            };
        },

        //Apply attempt rows to the game board
        applyGameRows: function () {
            for (let i = 0; i < 10; i++) {
                attemptContent.appendChild(wrapRowElements());
            };
        }
    };


    initializeGame();//Game starting point
    applyColors(optionPebbles, GameBoard.gameColors);


    //Initialize the game board with default state
    function initializeGame() {
        GameBoard.gameActive = true;
        GameBoard.applyCorrectPebbles();
        GameBoard.applyGameRows();
        GameBoard.currentRow = document.querySelectorAll(".attempt-el-wrapper")[9];
        selectCheckButton(GameBoard.currentRow).style.visibility = "visible";
        GameBoard.currentRow.style.backgroundColor = "grey";
    };



    //Apply an array of colors, to a list of game elements
    function applyColors(elements, color) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = color[i];
        }
    };


    //Create div element with a class name
    function createDivEl(className) {
        return newElement("div", "className", className);
    };

    //Create a list of div elements
    function createPebbleList(listName, pebbleName, pebbleNr) {
        const pebbleList = newElement("div", "className", listName);
        for (let i = 0; i < pebbleNr; i++) {
            pebbleList.appendChild(createDivEl(pebbleName));
        };
        return pebbleList;
    };

    //Create a submit button
    function confirmButton() {
        const button = newElement("button", "className", "submitButton");
        button.textContent = "Check";
        button.style.visibility = "hidden";
        return button;
    };


    //Create a list that wraps all row elements together
    function wrapRowElements() {
        const wrapper = createDivEl("attempt-el-wrapper");
        wrapper.appendChild(
            createPebbleList("attempt-list", "attempt-pebble", GameBoard.pebbleNr)
        );
        wrapper.appendChild(
            createPebbleList("result-list", "result-pebble", GameBoard.pebbleNr)
        );
        wrapper.appendChild(
            confirmButton()
        );
        return wrapper;
    };

    //-----Code above creates the boards-----//





    //----Code below creates functionality-----//

    //Select last element of parent div
    function selectCheckButton(parentElement) {
        return parentElement.lastElementChild;
    };

    //Select all attempt-pebbles, from their parent div
    function selectAttemptPebbles(parentElement) {
        const selectList = parentElement.firstElementChild;
        return selectList.querySelectorAll(".attempt-pebble");
    };

    //Select result pebbles from current row
    function selectResultPebbles(currentRow) {
        const selectList = selectCheckButton(currentRow).previousElementSibling;
        return selectList.querySelectorAll(".result-pebble");
    }

    //Check if arrays are identical
    function arraysEqual(clickedCol, generatedCol) {
        for (let i = clickedCol.length; i--;) {
            if (clickedCol[i] !== generatedCol[i])
                return false;
        }
        return true;
    }

    //Validate the input that is provided by user
    function validateUserGuess(clickedColors, generatedColors) {
        if (arraysEqual(clickedColors, generatedColors) === false) {
            for (let i = 0; i < clickedColors.length; i++) {
                produceValidationResult(clickedColors, generatedColors, i);
            };
            fillWithBlanks(clickedColors);
        }
        else {
            alert("You won!");

            for (let i = 0; i < clickedColors.length; i++) {
                GameBoard.validationResult[i] = "red";
            };

            GameBoard.gameActive = false;
            revealCorrectColors();
            removeCurrentFocus(selectCheckButton(GameBoard.currentRow));

        }
    };


    function revealCorrectColors() {
        let selectPebbles = correctPebbleList.querySelectorAll(".correct-pebble");
        applyColors(selectPebbles, GameBoard.codeToGuess);
    }

    //Produce validation result list, displaying which colors were guessed
    function produceValidationResult(clickedCol, generatedCol, index) {
        if (clickedCol.indexOf(generatedCol[index]) > -1 && generatedCol[index] != clickedCol[index]) {
            GameBoard.validationResult.push("grey");
        }
        else if (generatedCol[index] === clickedCol[index]) {
            GameBoard.validationResult.unshift("red");
        }

    }

    //Fill the remaing user guess with blanks, if user didn't guess anything
    function fillWithBlanks(clickedCol) {
        for (let x = 0; x < clickedCol.length; x++) {
            if (GameBoard.validationResult[x] == null) {
                GameBoard.validationResult.push("white");
            }
        }
    };

    function removeCurrentFocus(currentButton) {
        currentButton.style.visibility = "hidden";
        GameBoard.currentRow.style.backgroundColor = "";
    }

    //Move focus of the row to the row above
    function moveRowFocus(currentButton, nextRow) {
        removeCurrentFocus(currentButton);
        selectCheckButton(nextRow).style.visibility = "visible";
        nextRow.style.backgroundColor = "grey";
        GameBoard.currentRow = nextRow;
    };

    //Apply "select", click event to all option pebbles
    optionList.addEventListener("click", function (el) {
        const selectedEl = el.target;
        const selectPebbles = selectAttemptPebbles(GameBoard.currentRow);

        if (selectedEl.className === "option-pebble"
            && GameBoard.clickedColors.length < GameBoard.pebbleNr
            && GameBoard.gameActive === true) {
            GameBoard.clickedColors.push(selectedEl.style.backgroundColor);
        }

        applyColors(selectPebbles, GameBoard.clickedColors);
    });

    //Check, if player has any remaining attempts to play game
    function selectNextRow(currentRow, rowAbove) {
        if (rowAbove != null) {
            moveRowFocus(currentRow, rowAbove);
            GameBoard.clickedColors = [];
            GameBoard.validationResult = [];
        }

        else {
            alert("Game Over you lost!");
            GameBoard.gameActive = false;
            revealCorrectColors();
            removeCurrentFocus(currentRow);
        }
    }


    //Validate user choice
    attemptContent.addEventListener("click", function (el) {
        const clickedEl = el.target;


        if (clickedEl.className === "submitButton" && GameBoard.gameActive === true) {
            if (GameBoard.clickedColors.length === GameBoard.pebbleNr) {
                const rowAbove = GameBoard.currentRow.previousElementSibling;

                validateUserGuess(GameBoard.clickedColors, GameBoard.codeToGuess);
                applyColors(selectResultPebbles(GameBoard.currentRow), GameBoard.validationResult);

                if (GameBoard.gameActive === true) {
                    selectNextRow(clickedEl, rowAbove);
                };
            }
            else {
                alert("You need to select " + GameBoard.pebbleNr + " pebbles to proceed!");
            };
        }
    });

    //Clear currently selected choice
    clearButton.addEventListener("click", function () {
        if (GameBoard.gameActive === true) {
            GameBoard.clickedColors = [];
            const attemptPebbles = selectAttemptPebbles(GameBoard.currentRow);

            for (let i = 0; i < attemptPebbles.length; i++) {
                attemptPebbles[i].style.backgroundColor = "";
            }
        }
    });


    //Remove elements from the parent element
    function removeElements(parentEl, childEl) {
        for (let i = 0; i < childEl.length; i++) {
            parentEl.removeChild(childEl[i]);
        }
    };


    //Reset the game
    newGameButton.addEventListener("click", function () {
        const attempLists = document.querySelectorAll(".attempt-el-wrapper");
        const correctPebbles = correctPebbleList.querySelectorAll(".correct-pebble");
        removeElements(correctPebbleList, correctPebbles);
        removeElements(attemptContent, attempLists);
        initializeGame();
    });


}());