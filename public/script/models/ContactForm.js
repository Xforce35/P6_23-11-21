class ContactForm {
  constructor (namePhotographer) {
      this.namePhotographer = namePhotographer
  }
  
  //fonction pour ouvrir le modal
  openModal() {
    const modal = document.getElementById("contact_modal");
    const main =document.getElementById("main");
    const nameHeader = document.getElementById("contact-me-name");
    modal.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    modal.style.display = "block";
    nameHeader.innerText = `${this.namePhotographer}`;
    this.startModal();
  }

  //fonction pour lançer plusieurs fonctions
  startModal() {
    const fisrtElement = document.getElementById("first");
    this.keyboard();
    this.listenForm();
    this.closeModal;
    fisrtElement.focus();
  }

  //fonction pour fermer le modal
  closeModal() {
    const modal = document.getElementById("contact_modal");
    const main =document.getElementById("main");
    const contactBtn = document.querySelector(".photographer__profileCard__contactButton");
    modal.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
    modal.style.display = 'none';
    contactBtn.focus(); 
  }

  //fonction pour fermer le modal avec la touche escape
  keyboard() {
    document.addEventListener('keydown', (key) => {
      if (key.code == "Escape") {
        this.closeModal ();
        }            
      });
  }

  //fonction pour ecouter les changements des différents input de notre modal
  listenForm() {
    document.getElementById('first').addEventListener('input', () => {
      this.validateFirstName();
    })

    document.getElementById('last').addEventListener('input', () => {
      this.validateLastName();
    })

    document.getElementById('email').addEventListener('input', () => {
      this.validateEmail();
    })

    document.getElementById('message').addEventListener('input', () => {
      this.validateMessage();
    })

    document.querySelector('.form-modal').addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.validateFirstName() && this.validateLastName() && this.validateEmail () && this.validateMessage ())
        {
        this.payLoad();
        return
        }
        else 
         {alert('Merci de corriger les erreurs afficher')}
        })

    document.querySelector('.modal_cross').addEventListener('click', () => {
      this.closeModal();
    })
  }

  //fonction pour afficher les données que l'utilisateur a entré avec le console.log
  payLoad () {
    let first = document.getElementById('first').value;
    let last = document.getElementById('last').value;
    let email = document.getElementById('email').value
    let message = document.getElementById('message').value
    const inputs = document.querySelectorAll(".text-control");
    const payLoad = {
      first,
      last,
      email,
      message,
      };

      console.log(payLoad);
      inputs.forEach((input) => {
        // Exception ici, car on veut justement reset input (donc "reassign du vide")
        // eslint-disable-next-line no-param-reassign
        input.value = "";
        });
      this.closeModal();
  }

  //fonction qui permets de valider le prénom
  validateFirstName () {
    let el = document.getElementById('first')
    let name = el.value;

    if (name.length > 0 && name.length < 2) {
      this.ShowError (el, "Veuillez entrer 2 caractères ou plus pour le nom.");
      return false
      }
    if (
      !name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
      this.ShowError (el, "Le nom doit contenir des lettres uniquement.");
      return false
      }
    this.hideError (el);
    return true
  }

  //fonction qui permets de valider le nom
  validateLastName () {
    let el = document.getElementById('last')
    let name = el.value;

    if (name.length > 0 && name.length < 2) {
      this.ShowError (el, "Veuillez entrer 2 caractères ou plus pour le nom.");
      return false
      }
    if (
      !name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
      this.ShowError (el, "Le nom doit contenir des lettres uniquement.");
      return false
      }
    this.hideError (el);
    return true
  }

  //fonction qui permets de valider l'email
  validateEmail () {
    let el = document.getElementById('email')
    let name = el.value

    if (!name.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      this.ShowError (el, "Le Mail n'est pas valide.");
      return false
      }
    this.hideError (el);
    return true
  }

  //fonction qui permets de valider le message
  validateMessage () {
    let el = document.getElementById('message')
    let name = el.value;

    if (name.length > 0 && name.length < 2) {
      this.ShowError(el, "Veuillez entrer 2 caractères ou plus pour votre message." );
      return false
      }
    else if (!name.match(/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð !?,.'-]+$/u)) {
      this.ShowError (el, "Le message ne doit pas contenir de caractères spéciaux.");
      return false
      } 
    this.hideError(el);
    return true
  }

  //fonction pour afficher les messages et changer le style
  ShowError(el, message) {
    let name = el.getAttribute('id');
    el.classList.add("error");
    document.querySelector(`#error-${name}`).innerText = message;
    document.querySelector(`#error-${name}`).classList.add("error-message");
  }

  //fonction pour cacher les messages et retirer le style
  hideError(el) {
    let name = el.getAttribute('id');
    el.classList.remove("error");
    document.querySelector(`#error-${name}`).innerText = '';
  }
}

export default ContactForm
