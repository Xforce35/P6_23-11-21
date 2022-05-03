class Media {
    constructor(data) {
        this._photographerId = data.photographerId
		this._id = data.id
        this._title = data.title
        this._likes = data.likes
		this._date = data.date
		this._price = data.price
        this.hasBeenLiked = false;
    }

    get id() {
        return this._id
    }

    get title() {
        return this._title
    }

    get name() {
        return this._title
    }

    get photograpgerId() {
        return this._photographerId
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
    
    // fonction pour verifier si un média a deja etait liker
    toggle(){
        let heartDom = document.querySelector(`.displayMediaSection__mediaCard__desc__likes[data-id="${this._id}"]`)

            if (this.hasBeenLiked)
            {
                this.dislike();
            } else {
                this.like();
            }

            this.hasBeenLiked = ! this.hasBeenLiked
            heartDom.innerText = this._likes;
        
    }

    // fonction pour rajouter un like
    like(){
        this._likes++;
    }

    // fonction pour supprimer un like
    dislike() {
        this._likes--;
    }
}

export default Media