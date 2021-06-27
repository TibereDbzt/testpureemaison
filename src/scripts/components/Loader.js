import { gsap } from 'gsap';

export class Loader {

    constructor (el, target) {
        this.DOM = {
            container: el,
            target: target
        };
        this.timeline = gsap.timeline();
        this.progress = 0;
        this.createSlideAnimation();
    }

    calculateTranslate () {
        const loaderBounds = this.DOM.container.getBoundingClientRect();
        const targetBounds = this.DOM.target.getBoundingClientRect();
        const translateX = {
            start: - (loaderBounds.x - targetBounds.x + loaderBounds.width + 170),
            end: targetBounds.x + targetBounds.width + 170 - loaderBounds.x
        };
        return translateX;
    }

    startLoader () {
        this.loading = setInterval(() => {
            this.incrementLoader();
        }, 25);
    }

    incrementLoader () {
        this.progress += 1;
        this.DOM.container.innerHTML = this.progress;
        if (this.progress >= 100) clearInterval(this.loading);
    }

    createSlideAnimation () {
        this.timeline.fromTo(this.DOM.container, { opacity: 0 }, { opacity: 1, delay: 0.4, duration: 1, ease: 'power2.inOut', onComplete: () => this.startLoader()});
        this.timeline.fromTo(this.DOM.container, { translateX: this.calculateTranslate().start }, { translateX: this.calculateTranslate().end, duration: 3, ease: 'power3.inOut' });
    }
    
    getTimeline () {
        return this.timeline;
    }
    
}