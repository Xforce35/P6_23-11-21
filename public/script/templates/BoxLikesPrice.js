class BoxLikesPrice {
    constructor(price, totalLike){
        const content = `
        <p class="boxLikesPrice__likes" aria-label="nombre de likes de tout les médias">${totalLike} </p>
            <svg role="img" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="likes">
                <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#000"></path>
            </svg>
        <p class="boxLikesPrice__price" aria-label="prix du photographe par jour">${price}€ / jour</p>
        `;

            return document.createRange().createContextualFragment(content);
    }
}

export default BoxLikesPrice