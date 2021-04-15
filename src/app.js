import { mapListToDOMElements } from "./domInteractions.js";
class TVapp {
    constructor() {
        this.viewElems = {};
        this.showNamesButtons = {};
        this.selectedName = "harry";
        this.initializeApp();
    }
    initializeApp = () => {
        this.connectDOMElements();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName);

        console.log(listOfIds);
        console.log(listOfShowNames);

        this.viewElems = mapListToDOMElements(listOfIds);
        this.showNamesButtons = mapListToDOMElements(listOfShowNames);

        console.log(this.viewElems);
        console.log(this.showNamesButtons);
    }
}
document.addEventListener("DOMContentLoaded", new TVapp());