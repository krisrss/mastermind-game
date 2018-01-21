(function () {
    "use strict";

    const attemptContent = document.querySelector("#attempt-content");
    const correctPebbleList = document.querySelector("#correct-list");
    const optionPebbles = document.querySelectorAll(".option-pebble");


    //Create an HTML element, with attribute
    const newElement = function (elName, attrType, attrName) {
        const creatElement = document.createElement(elName);
        creatElement[attrType] = attrName;
        return creatElement;
    };

    const GameBoard = {
        pebbleNr: 4,
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

    //Initialize the game board
    applyColors(optionPebbles, GameBoard.gameColors);
    GameBoard.applyCorrectPebbles();
    GameBoard.applyGameRows();


}());