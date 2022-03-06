class LightBox {
    constructor(medias) {
        this.currentIndex = 0;
        this.medias = medias
        // console.log(this.medias)
    }

    // initialiser la lightbox lors d'un clic sur un média, appeler les fonctions permettant de naviguer dans la lightbox
    start(mediaId) {
        let lightBox = document.querySelector('.works-lightbox');
        const main =document.getElementById("main");
        lightBox.setAttribute("aria-hidden", "false");
        main.setAttribute("aria-hidden", "true");
        lightBox.style.display = 'block';
        this.currentIndex = this.medias.findIndex(media => media.id == mediaId);
        // console.log('on lance la lightbox')
        this.show();
        this.listen();
        this.close();
        this.keyboard()
    }
    // afficher le media cliquer
    show() {
        let media = this.medias[this.currentIndex];
        
        document.querySelector('.works-lightbox-contain').innerHTML = "";
        document.querySelector('.works-lightbox-contain').appendChild(media.displayLightBox());
    }
    // écouter pour changer de média
    listen() {
        document.querySelector('.right-arrow-lightbox').addEventListener('click', () => {
            this.next()
        });
        document.querySelector('.left-arrow-lightbox').addEventListener('click', () => {
            this.previous()
        });
    }
    // passer au média suivant
    next() {
            // console.log('on avance')
            this.currentIndex++;
                if (this.currentIndex > (this.medias.length -1)) {
                    this.currentIndex = 0;
                }
            this.show()
        }
    // passer au media précédent
    previous() {
        // console.log('on recule')
        this.currentIndex--; 
        if (this.currentIndex < 0) {
            this.currentIndex = this.medias.length - 1;
        } 
        this.show()
    }
    // fermer la lightbox
    close() {
        document.querySelector('.close-lightbox-icon').addEventListener('click', () => {
            let lightBox = document.querySelector('.works-lightbox');
            const main =document.getElementById("main");
            lightBox.setAttribute("aria-hidden", "true");
            main.setAttribute("aria-hidden", "false");
            lightBox.style.display = 'none';
        })
    }
    // naviguer au clavier dans la lightbox
    keyboard() {
        document.addEventListener('keydown', (key) => {
            if (key.code == "Escape") {
                let lightBox = document.querySelector('.works-lightbox');
                lightBox.style.display = 'none';
            }
            else if (key.code == "ArrowRight") {
                this.next()
                // console.log('on avance')
            }
            else if (key.code == "ArrowLeft") {
                this.previous()
                // console.log('on recule')
            }
            // console.log('123');
        })
    }   
}

export default LightBox