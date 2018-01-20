(function () {
    "use strict";

    const attemptContent = document.querySelector("#attempt-content");
    const correctPebbleList = document.querySelector("#correct-list");

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
    function createPebbleList(listName, pebbleName) {
        const pebbleList = newElement("div", "className", listName);
        for (let i = 0; i < 4; i++) {
            pebbleList.appendChild(createDivEl(pebbleName));
        };
        return pebbleList;
    };

    //Create a list that wrapts all row elements together
    function wrapRowElements() {
        const wrapper = createDivEl("attempt-el-wrapper");
        wrapper.appendChild(
            createPebbleList("attempt-list", "attempt-pebble")
        );
        wrapper.appendChild(
            createPebbleList("result-list", "result-pebble")
        );
        return wrapper;
    };


    //Apply attempt rows to the game board
    for (let i = 0; i < 10; i++) {
        attemptContent.appendChild(wrapRowElements());
    };


    //Apply correct pebbles, to correct pebble list
    for (let i = 0; i < 4; i++) {
        const correctList = createDivEl("correct-pebble");
        correctList.textContent = "?";
        correctPebbleList.appendChild(correctList);
    };
    
}());