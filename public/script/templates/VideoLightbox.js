export default class VideoLightBox {
    constructor({title, src}) {
        const content = `            
            <video controls class="works-lightbox-video" src="../public/assets/media/${src}" alt="${title}" type="video/mp4"></video>
            <div class="works-lightbox-video-name">${title}</div>
        `

        return document.createRange().createContextualFragment(content);
    }
}