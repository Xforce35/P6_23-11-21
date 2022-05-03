export default class VideoTemplate {
    constructor({ id, title, src, likes, date }) {
        const content = `
        <article data-date=${date} class="displayMediaSection__mediaCard" data-id="${id}">
            <a href="#" class="displayMediaSection__mediaCard__link" aria-label="${title}">
                <video class="displayMediaSection__mediaCard__picture">
                    <source src="public/assets/media/${src}" type="video/mp4" alt="${title}">
                </video>
            </a>
            <div class="displayMediaSection__mediaCard__desc">
                <p class="displayMediaSection__mediaCard__desc__title">${title}</p>
                <p tabindex="0"  class="displayMediaSection__mediaCard__desc__likes" aria-label="Nombre de likes sur ce média" data-id=${id}>${likes}</p>
            </div>
        </article>
        `;

        return document.createRange().createContextualFragment(content);
    }
}


// export default VideoTemplate