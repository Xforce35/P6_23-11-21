export default class VideoLightBox {
    constructor({title, src}) {
        const content = `            
            <video controls class="works-lightbox-video">
                <source  src="public/assets/media/${src}" aria-label="${title}" type="video/mp4">
            </video>
            <h4 class="works-lightbox-video-name">${title}</h4>
        `

        return document.createRange().createContextualFragment(content);
    }
}