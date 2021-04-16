import {
    mapListToDOMElements,
    createDOMElement
} from "./domInteractions.js";
import {
    getShowsByKey
} from "./requests.js";
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
        this.fetchAndDisplayShows();
    }

    connectDOMElements = () => {
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(elem => elem.dataset.showName);

        console.log(listOfIds);
        console.log(listOfShowNames);

        this.viewElems = mapListToDOMElements(listOfIds, 'id');
        this.showNamesButtons = mapListToDOMElements(listOfShowNames, 'data-show-name');

        console.log(this.viewElems);
        console.log(this.showNamesButtons);
    }

    setupListeners = () => {
        Object.keys(this.showNamesButtons).forEach(showName => {
            this.showNamesButtons[showName].addEventListener("click", this.setCurrentNameFilter);
        })
    }

    setCurrentNameFilter = () => {
        this.selectedName = event.target.dataset.showName;
        this.fetchAndDisplayShows();
    }

    fetchAndDisplayShows = () => {
        getShowsByKey(this.selectedName).then(shows => this.renderCards(shows));
    }

    renderCards = shows => {
        for (const { show } of shows) {
            this.createShowCard(show);
        }
    }

    createShowCard = show => {

        const divCard = createDOMElement('div', 'card');
        const divCardBody = createDOMElement('div', 'card-body');
        const h5 = createDOMElement('h5', 'card-title', show.name);
        const p = createDOMElement('p', 'card-text', show.summary);
        const btn = createDOMElement('button', 'btn btn-primary', 'Show more');
        let img;
        if(show.image){
             img = createDOMElement('img', 'card-img-top', null, show.image.medium);
        }
        else{
             img = createDOMElement('img', 'card-img-top', null, 'https://via.placeholder.com/210x295');
        }

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(img);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(btn);
        this.viewElems.showsWrapper.appendChild(divCard);
    }


}
document.addEventListener("DOMContentLoaded", new TVapp());