
import PhotographerApi from './api/PhotographerApi.js';
import ProfileCard from './templates/ProfileCard.js';
import mediaFactory from './factories/mediaFactory.js';
import Portfolio from './models/portfolio.js';
import ContactForm from './models/ContactForm.js';

class App{
  constructor(){
    this.photographersApi = new PhotographerApi("data/photographers.json");
    this.$profileWrapper = document.querySelector(".photographe_header");
    this.$mediasWrapper = document.querySelector(".displayMediaSection");
  }
  //fonction afficher les données et
  async profile(){
    const id = this.getFromURL("id");
    // console.log(id);
    const photographerRaw = await this.photographersApi.getPhotographer(id);
    const namePhototgrapher = photographerRaw.name
    // console.log(namePhototgrapher);
    const Template = new ProfileCard(photographerRaw)
    this.$profileWrapper.appendChild(
      Template.createProfileCard()
    )
    //et les médias du photographe choisi
    const mediasRaw = await this.photographersApi.getMediaFrom(id);
    const portfolio = new Portfolio (photographerRaw.price);
    
    mediasRaw.forEach((e) => {
      let media = mediaFactory(e);
      // console.log(media);
      portfolio.add(media);
      // console.log(portfolio.medias);
    });
    portfolio.start();
  // console.log(photographerRaw, mediasRaw);

    //fonction pour ouvrir le modal de contact du photographe
    const contactForm = new ContactForm(namePhototgrapher);
    document.querySelector(".photographer__profileCard__contactButton").addEventListener("click", () =>{
      contactForm.openModal();
    })
  }
  
  // fonction pour retourner une page d'un photographe selon son Id
  getFromURL(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  }
}

const app = new App();
app.profile();
