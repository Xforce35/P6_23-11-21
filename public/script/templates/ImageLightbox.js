export default class ImageLightBox {
    constructor({title, src}) {
        const content = `
            <img class="works-lightbox-media" src="public/assets/media/${src}" alt="${title}">
            <h4 class="works-lightbox-media-name">${title}</h4>
        `
        return document.createRange().createContextualFragment(content);
    }
}