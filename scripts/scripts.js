(function () {
    "use strict";

    const attemptContent = document.querySelector("#attempt-content");
    const correctPebbleList = document.querySelector("#correct-list");
    const optionPebbles = document.querySelectorAll(".option-pebble");
    const optionList = document.querySelector("#option-list");
    const clearButton = document.querySelector("#clear-button");
    const newGameButton = document.querySelector("#newgame-button");
    const checkBox = document.querySelector("#duplicates");


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
        codeToGuess: [],
        clickedColors: [],
        validationResult: [],
        gameActive: false,
        clickedPebbleIndex: null,

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
        generateRandomColors(checkBox.checked);
        GameBoard.applyCorrectPebbles();
        GameBoard.applyGameRows();
        GameBoard.currentRow = document.querySelectorAll(".attempt-el-wrapper")[9];
        selectCheckButton(GameBoard.currentRow).style.visibility = "visible";
        GameBoard.currentRow.style.backgroundColor = "#9c7248";
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

    //Generate a random list of colors
    function generateRandomColors(checkBoxStatus) {
        let codeToGuess = GameBoard.codeToGuess;
        for (let i = 0; i <= GameBoard.pebbleNr - 1; i++) {
            let randomColor = Math.floor(Math.random() * GameBoard.gameColors.length);
            codeToGuess[i] = GameBoard.gameColors[randomColor];

            if (checkBoxStatus === false) {
                for (let x = 0; x <= i - 1; x++) {
                    if (codeToGuess[x] == codeToGuess[i]) {
                        i--;
                    }
                }
            }

        }
    };

    //Validate the input that is provided by user
    function validateUserGuess(clickedColors, generatedColors) {
        if (arraysEqual(clickedColors, generatedColors) === false) {
            produceValidationResult(clickedColors, generatedColors);
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


    //Removes duplicated colors from color code
    function removeArrayDuplicates(arrayName){
        let colorList = [];
        for (var i = 0; i < arrayName.length; i++) {
            catchElements(arrayName[i]);
        };

        function catchElements (color){
            if (colorList.indexOf(color) !== -1) {
                colorList.push(null);
            }
            else{
                colorList.push(color);
            };
        };
        return colorList;
    };



    //Produce validation result list, displaying which colors were guessed
    function produceValidationResult(clickedCol, generatedCol) {

        let validatedChoice = [];
        let arrayNoDuplicates = removeArrayDuplicates(generatedCol);
        let selectColorArray = (checkBox.checked === true) ? arrayNoDuplicates : generatedCol;

        for (let i = 0; i < clickedCol.length; i++) {
            if (clickedCol.indexOf(selectColorArray[i]) > -1 && selectColorArray[i] != clickedCol[i]) {
                validatedChoice.push("grey");
            }
            else if (generatedCol[i] === clickedCol[i]) {
                validatedChoice.unshift("red");
            }
            else{
                validatedChoice.push("#fff");
            };
        };

        //Sorts and reverses the output array
        //This is needed in order to make colors appear in importance order
        // Order beign red - grey - white(#fff)
        validatedChoice.sort();
        validatedChoice.reverse()

        GameBoard.validationResult = validatedChoice;
    };


    function removeCurrentFocus(currentButton) {
        currentButton.style.visibility = "hidden";
        GameBoard.currentRow.style.backgroundColor = "";
    };

    //Move focus of the row to the row above
    function moveRowFocus(currentButton, nextRow) {
        removeCurrentFocus(currentButton);
        selectCheckButton(nextRow).style.visibility = "visible";
        nextRow.style.backgroundColor = "#9c7248";
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
        else if (selectedEl.className === "option-pebble"
            && GameBoard.clickedColors.length >= GameBoard.pebbleNr) {
            GameBoard.clickedColors[GameBoard.clickedPebbleIndex] = selectedEl.style.backgroundColor;
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
    };

    //Validate user choice
    attemptContent.addEventListener("click", function (el) {
        const clickedEl = el.target;
        GameBoard.clickedPebbleIndex = null;

        if (clickedEl.className === "submitButton" && GameBoard.gameActive === true) {
            if (GameBoard.clickedColors.length === GameBoard.pebbleNr) {
                const rowAbove = GameBoard.currentRow.previousElementSibling;

                validateUserGuess(GameBoard.clickedColors, GameBoard.codeToGuess);
                applyColors(selectResultPebbles(GameBoard.currentRow), GameBoard.validationResult);
                resetSelectedPebble(selectAttemptPebbles(GameBoard.currentRow))

                if (GameBoard.gameActive === true) {
                    selectNextRow(clickedEl, rowAbove);
                };
            }
            else {
                alert("You need to select " + GameBoard.pebbleNr + " pebbles to proceed!");
            };
        };
        readPebbleIndex(clickedEl);

    });

    function resetSelectedPebble(pebbleList) {
        for (let i = 0; i < pebbleList.length; i++) {
            pebbleList[i].classList.remove("selected-pebble");
        }
    };

    //Read the index of clicked color pebble, that user wants to replace
    function readPebbleIndex(clickedEl) {
        let currentPebbles = selectAttemptPebbles(GameBoard.currentRow);
        resetSelectedPebble(currentPebbles)

        for (let i = 0; i < currentPebbles.length; i++) {
            if (clickedEl === currentPebbles[i]) {
                clickedEl.classList.toggle("selected-pebble");
                GameBoard.clickedPebbleIndex = i;
            }

        }
    };


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


    //Reset the board to initial state
    function resetBoard(screenWidth, difficulty) {
        const attempLists = document.querySelectorAll(".attempt-el-wrapper");
        const correctPebbles = correctPebbleList.querySelectorAll(".correct-pebble");
        const gameContent = document.querySelector("#game-content");

        GameBoard.clickedColors = [];
        GameBoard.codeToGuess = [];
        GameBoard.pebbleNr = difficulty;
        gameContent.style.width = screenWidth;

        removeElements(correctPebbleList, correctPebbles);
        removeElements(attemptContent, attempLists);
        initializeGame();
    };

    function setResultBlocSize(size) {
        const validationLists = document.querySelectorAll(".result-list");
        for (let i = 0; i < validationLists.length; i++) {
            validationLists[i].style.width = size;
        }
    };


    //Reset the game
    newGameButton.addEventListener("click", function () {
        const diffSetting = document.querySelector("#difficulty");
        const difficulty = diffSetting.value;

        if (difficulty == 4) {
            resetBoard("298px", 4);
        }
        else if (difficulty == 6) {
            resetBoard("388px", 6);
            setResultBlocSize("53px")
        }
        else if (difficulty == 8) {
            resetBoard("488px", 8);
            setResultBlocSize("69px")
        }
    });
}());