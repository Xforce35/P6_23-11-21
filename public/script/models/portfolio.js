import BoxLikesPrice from "../templates/BoxLikesPrice.js";
import LightBox from "./LightBox.js";

class Portfolio {
    constructor (price) {
        this.medias = [];
        this.totalLikes = 0;
        this.$mediasWrapper = document.querySelector(".displayMediaSection");
        this.$boxWrapper = document.querySelector(".boxLikesPrice");
        this.price = price;
        this.currentIndex = 0;
    }

    //fonction qui ajoute les  medias
    add(media) {
        this.medias.push(media)
    }

    //fonction qui affiche les  medias
    display() {
        this.medias.forEach(media => {
            this.$mediasWrapper.appendChild(media.render());
        })
    }

    //fonction quand quelqu'un va cliqué pour aimer
    listenForLikes() {
        this.medias.forEach(media => {
            let heartDom = document.querySelector(`.displayMediaSection__mediaCard__desc__likes[data-id="${media.id}"]`)
            heartDom.addEventListener('click', () => {
                media.toggle();
                this.countTotal();
                this.updateTotal();
            })
        })
    }

    // fonction pour rajouter un like avec la touche "entrer" pour les nons voyants
    keyboardLikes() {
        this.medias.forEach(media => {
            let heartDom = document.querySelector(`.displayMediaSection__mediaCard__desc__likes[data-id="${media.id}"]`)
            heartDom.addEventListener('keydown', (key) => {
                if (key.code == "Enter") {
                    // console.log("123");
                    media.toggle();
                    this.countTotal();
                    this.updateTotal();
                }
            });
        })
    }

    // fonction ou on initie toutes fonctions
    start() {
        this.display();
        this.countTotal();
        this.displayBox();
        this.listenForLikes();
        this.listenDropdown();
        this.LightBox();
        this.keyboardLikes();
    }

    // fonction pour afficher la zone ou j'affiche le prix et nombre total de like d'un photographe
    displayBox() {
        let el = new BoxLikesPrice (this.price, this.totalLikes)
        this.$boxWrapper.appendChild(el)
    }

    // fonction pour afficher le nombre de likes d'un photographe
    countTotal() {
        this.totalLikes = this.medias.reduce((total , media) => total + media.likes, 0);
    }
    
    // fonction pour ecouter le menu de tri par filtre
    listenDropdown() {
        this.openButton = document.querySelector('.sort-btn');
        this.closeButton = document.getElementsByClassName('arrow-up-close');
        // let hiddenSort = document.getElementsByClassName('hidden-sort');

        this.openButton.addEventListener('click', (e) => {
            this.openDropdown();
            this.keyboardDropdown();
            e.stopPropagation();
            // hiddenSort[0].style.display = 'block';
        });

        if (this.closeButton) {
            document.querySelector(`body:not(.sort-btn):not(.hidden-sort)`).addEventListener('click', (e) => {
                e.stopPropagation();
                // console.log('on essaye de fermer', e.target.classList)
                if(!e.target.classList.contains('style')) {
                   this.closeDropdown(); 
                } else {
                    let filter = e.target.getAttribute('data-filter')  ;
                    // console.log('on veut filtrer par', filter)
                    this.filter(filter);
                    // document.querySelector('.sort-btn').innerText = filter;
                    this.updateMedia();                    
                    this.closeDropdown();
                    this.listenForLikes();
                    this.LightBox();
                }
            });
        }
    }

    //fonction qui permets de filtrer les médias par filtre losqu'on clique sur l'un d'eux
    filter(filter) {
        switch(filter) {
            case 'popularity':
                this.filterByPopularity();
                break;
                case 'date':
                    this.filterByDate();
                    break;
                case 'title':
                    this.filterByTitle();
                    break;
        }
    }

    //fonction pour filtrer les medias par popularité
    filterByPopularity() {
        let btnSort = document.querySelector('.sort-btn');

        btnSort.innerHTML = `Popularité <span class="fas fa-chevron-down arrow-down" role="button"></span>`;
        this.medias = this.medias.sort((a, b) => {
            return b.likes - a.likes
        })
    }

    //fonction pour filtrer les medias par date
    filterByDate() {
        let btnSort = document.querySelector('.sort-btn');

        btnSort.innerHTML = `Date <span class="fas fa-chevron-down arrow-down" role="button"></span>`;
        this.medias = this.medias.sort ((a, b) => {
            return new Date(a.date).valueOf() - new Date (b.date).valueOf();
        })
    }

    //fonction pour filtrer les medias par titre
    filterByTitle() {  
        let btnSort = document.querySelector('.sort-btn');

        btnSort.innerHTML = `Titre <span class="fas fa-chevron-down arrow-down" role="button"></span>`;
        this.medias = this.medias.sort((a, b) => a.title.localeCompare(b.title))
    }

    //fonction pour fermer le menu de tri par filtre
    closeDropdown() {
        let hiddenSort = document.getElementsByClassName('hidden-sort');
        hiddenSort[0].style.display = "none";
    }

    //fonction pour ouvrir le menu de tri par filtre
    openDropdown() {
        let hiddenSort = document.getElementsByClassName('hidden-sort');
        hiddenSort[0].style.display = 'block';
    }

    //fonction pour fermer avec la touche escape le menu de tri par filtre
    keyboardDropdown() {
        document.addEventListener('keydown', (key) => {
            if (key.code == "Escape") {
                let hiddenSort = document.getElementsByClassName('hidden-sort');
                hiddenSort[0].style.display = "none";
                this.openButton.focus();
            }
        })
    }   

    //fonction pour mettre a jour les likes du photographe
    updateTotal() {
       document.querySelector('.boxLikesPrice__likes').innerText = this.totalLikes;
    }

    //fonction pour mettre a jour les medias lorsqu'ils ont etait filtré
    updateMedia() {
        document.querySelector(".displayMediaSection").innerHTML = "";
        this.display();
    }
    
    //fonction pour ouvrir la lightbox lorsqu'on clique sur un média
    LightBox(){
        let lightBox = new LightBox(this.medias)
        
            document.querySelectorAll(`.displayMediaSection__mediaCard__link`).forEach(item =>
                {
                    item.addEventListener("click", (e) =>
                    {
                        let mediaId = e.target.closest('article').getAttribute('data-id');
                        // console.log(e.target.closest('article').getAttribute('data-id'));
                        lightBox.start(mediaId);
                    })
                })
    }
}

export default Portfolio