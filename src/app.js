import {
    mapListToDOMElements,
    createDOMElement
} from "./domInteractions.js";
import {
    getShowsByKey,
    getShowsById
} from "./requests.js";
class TVapp {
    constructor() {
        this.viewElems = {};
        this.showNamesButtons = {};
        this.selectedName = "";            
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

        this.viewElems = mapListToDOMElements(listOfIds, 'id');
        this.showNamesButtons = mapListToDOMElements(listOfShowNames, 'data-show-name');
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        Object.keys(this.showNamesButtons).forEach(showName => {
            this.showNamesButtons[showName].addEventListener("click", this.setCurrentNameFilter);
        })
    }

    handleSubmit = () => {
        if (event.type === 'click' || event.key === 'Enter') {
          let query = this.viewElems.searchInput.value;
          getShowsByKey(query).then(shows => {
            this.renderCardsOnList(shows);
            this.viewElems.searchInput.value = "";
          })
        }
      }

    setCurrentNameFilter = () => {
        this.selectedName = event.target.dataset.showName;
        this.fetchAndDisplayShows();
    }

    fetchAndDisplayShows = () => {
        getShowsByKey(this.selectedName).then(shows => this.renderCardsOnList(shows));
    }

    renderCardsOnList = shows => {
        Array.from(
            document.querySelectorAll("[data-show-id]")
        ).forEach(btn => {
            btn.removeEventListener('click', this.openDetailsView);
        })
        this.viewElems.showsWrapper.innerHTML = "";

        for (const { show } of shows) {
            const card = this.createShowCard(show);
            this.viewElems.showsWrapper.appendChild(card);
        }
    }

    closeDetailsView = () =>{
        const closeBtn = document.querySelector(`[id="showPreview"] [data-show-id]`);
        closeBtn.removeEventListener('click', this.closeDetailsView);
        this.viewElems.showPreview.style.display = "none";
        this.viewElems.showPreview.innerHTML = "";
        document.body.style.overflow = "initial";
    }

    openDetailsView = (event) => {
        const { showId } = event.target.dataset;
        getShowsById(showId).then(show =>{
            console.log(show, showId);
            const card = this.createShowCard(show, true);
            this.viewElems.showPreview.appendChild(card);
            this.viewElems.showPreview.style.display='block';
        })
    }
   
    createShowCard = (show, isDetailed) => {
        const divCard = createDOMElement('div', 'card');
        const divCardBody = createDOMElement('div', 'card-body');
        const h5 = createDOMElement('h5', 'card-title', show.name);
        const btn = createDOMElement('button', 'btn btn-primary', 'Show more');
        const xBtn = createDOMElement('button', 'closeButton');
        const xIcon = createDOMElement('img', 'closeImage', null, "img/cancel.svg");
        const genres = createDOMElement('ul'); 

        let img, p;

        if (show.image) {
            if (isDetailed) {
                img = createDOMElement('div', 'card-preview-bg');
                img.style.backgroundImage = `url('${show.image.original}')`;
            }else {
                img = createDOMElement('img', 'card-img-top', null, show.image.medium);
            }
        } else {
            if (isDetailed) {
                img = createDOMElement('img', 'card-img-top', null, 'https://via.placeholder.com/210x295');
                img.style.height = "fit-content";

            }else{
                img = createDOMElement('img', 'card-img-top', null, 'https://via.placeholder.com/210x295');
            }
        }

        if (show.summary) {
            let showSummary = show.summary;
            showSummary = showSummary.replace(/<[^>]*>/g,''); //Delete HTML tags

            if (isDetailed) {
                p = createDOMElement('p', 'card-text', showSummary);
            } else {
                p = createDOMElement('p', 'card-text', `${showSummary.slice(0, 80)}...`);
            }
        } else {
            p = createDOMElement('p', 'card-text', 'There is no any description for that show yet.');
        }

        if (show.genres) {
            if (isDetailed) {                      
                show.genres.forEach(entry =>{
                   const genresType = createDOMElement('li', 'genres-type', entry);
                   genres.appendChild(genresType);
                })
            }
        } 

        xBtn.dataset.showId = show.id;        
        btn.dataset.showId = show.id;    

        if (isDetailed) {
            document.body.style.overflow = "hidden";
            xBtn.appendChild(xIcon);
            divCard.appendChild(xBtn);     
           
            btn.innerText = 'Close';
            btn.classList.remove("btn", "btn-primary");
            btn.classList.add("btn", "btn-danger");

            xBtn.addEventListener('click', this.closeDetailsView);
            btn.addEventListener('click', this.closeDetailsView);

        }else {
            btn.addEventListener('click', this.openDetailsView);
        }

        divCard.appendChild(divCardBody);
        divCardBody.appendChild(img);
        divCardBody.appendChild(h5);
        divCardBody.appendChild(p);
        divCardBody.appendChild(genres);     
        divCardBody.appendChild(btn);

        return divCard;
    }


}
document.addEventListener("DOMContentLoaded", new TVapp());
