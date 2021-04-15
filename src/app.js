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
        this.setupListeners();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName);

        console.log(listOfIds);
        console.log(listOfShowNames);

        this.viewElems = mapListToDOMElements(listOfIds, 'id');
        this.showNamesButtons = mapListToDOMElements(listOfShowNames,'data-show-name');

        console.log(this.viewElems);
        console.log(this.showNamesButtons);
    }

    setupListeners = () =>{
        Object.keys(this.showNamesButtons).forEach(showName => {
            this.showNamesButtons[showName].addEventListener("click", this.setCurrentNameFilter);
        })
    }
    setCurrentNameFilter = () =>{
        this.selectedName = event.target.dataset.showName;
    }
}
document.addEventListener("DOMContentLoaded", new TVapp());