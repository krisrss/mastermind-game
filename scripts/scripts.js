(function () {
    "use strict";

    const attemptContent = document.querySelector("#attempt-content");
    const correctPebbleList = document.querySelector("#correct-list");
    const optionPebbles = document.querySelectorAll(".option-pebble");
    const optionList = document.querySelector("#option-list");


    //Create an HTML element, with attribute
    const newElement = function (elName, attrType, attrName) {
        const creatElement = document.createElement(elName);
        creatElement[attrType] = attrName;
        return creatElement;
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

    //Create a list that wraps all row elements together
    function wrapRowElements() {
        const wrapper = createDivEl("attempt-el-wrapper");
        wrapper.appendChild(
            createPebbleList("attempt-list", "attempt-pebble", GameBoard.pebbleNr)
        );
        wrapper.appendChild(
            createPebbleList("result-list", "result-pebble", GameBoard.pebbleNr)
        );
        return wrapper;
    };

    //Apply an array of colors, to a list of game elements
    function applyColors(elements, color) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = color[i];
        }
    };


    //Select all attempt-pebbles, from their parent div
    function selectAttempPebbles(parentElement) {
        const selectList = parentElement.firstElementChild;
        return selectList.querySelectorAll(".attempt-pebble");
    };


    const GameBoard = {
        pebbleNr: 4,
        currentRow: null,
        clickedColors : [],
        gameColors: ["red", "green", "blue", "yellow", "brown", "orange", "black", "white"],

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

    //Initialize the game board
    applyColors(optionPebbles, GameBoard.gameColors);
    GameBoard.applyCorrectPebbles();
    GameBoard.applyGameRows();
    GameBoard.currentRow = document.querySelectorAll(".attempt-el-wrapper")[9];


    //Apply "select", click event to all option pebbles
    optionList.addEventListener("click", function (el) {
        const selectedEl = el.target;
        const selectPebbles = selectAttempPebbles(GameBoard.currentRow);

        if (selectedEl.className === "option-pebble" && GameBoard.clickedColors.length < GameBoard.pebbleNr) {
            GameBoard.clickedColors.push(selectedEl.style.backgroundColor);
        }

        applyColors(selectPebbles, GameBoard.clickedColors);
    });

}());