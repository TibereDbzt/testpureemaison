import gsap from 'gsap';
import backgroundImage from './../../assets/images/dark_clouds.jpeg';

import { EASES } from './../utils/CONSTANTS';

export class ClippedBackground {

    constructor (el) {
        this.DOM = {
            container: el,
            image: el.querySelector('[data-background-image]')
        };
        this.DOM.image.src = backgroundImage;
        this.timeline = gsap.timeline();
        this.createInAnimation();
    }

    createInAnimation () {
        this.timeline.fromTo(this.DOM.image, { opacity: 0, scale: 1 }, { scale: 0.45, opacity: 1, duration: 5, ease: EASES.markedInOut});
        this.timeline.to(this.DOM.container, { rotate: '-90deg', 'clipPath': 'inset(0% round 50%)', duration: 2, ease: EASES.markedInOut}, ">");
        this.timeline.to(this.DOM.image, { rotate: '90deg', duration: 2, ease: EASES.markedInOut}, "<");
    }
    
    getTimeline () {
        return this.timeline;
    }
    
}