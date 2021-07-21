import { gsap } from 'gsap';
import backgroundImage from './../../assets/images/dark_clouds.jpeg';

import { EASES } from './../utils/CONSTANTS';

export class ClippedBackground {

    constructor (el) {
        this.DOM = {
            container: el,
            image: el.querySelector('[data-background-image]')
        };
        this.DOM.image.src = backgroundImage;
        this.opacityTimeline = gsap.timeline();
        this.clipPathTimeline = gsap.timeline();
    }

    animateOpacity () {
        this.opacityTimeline.fromTo(this.DOM.image, { opacity: 0 }, { opacity: 1, duration: 3, ease: 'power2.in'});
        this.opacityTimeline.fromTo(this.DOM.image, { scale: 0.6 }, { scale: 0.45, duration: 2.5, ease: EASES.markedIn}, '>-1.8');
        return this.opacityTimeline;
    }

    animateClipPath () {
        this.clipPathTimeline.to(this.DOM.container, { rotate: '-90deg', 'clipPath': 'inset(0% round 50%)', duration: 2, ease: EASES.markedInOut });
        this.clipPathTimeline.to(this.DOM.image, { rotate: '90deg', duration: 2, ease: EASES.markedInOut }, "<");
        this.clipPathTimeline.to(this.DOM.image, { scale: 0.6, duration: 1.7, ease: EASES.markedInOut }, "<");
        return this.clipPathTimeline;
    }
    
    getTimeline () {
        return this.timeline;
    }
    
}