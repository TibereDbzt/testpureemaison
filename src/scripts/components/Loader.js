import { gsap } from 'gsap';
import { getDistanceTo } from './../utils/getters';

export class Loader {

    constructor (el, target) {
        this.DOM = {
            container: el,
            target: target
        };
        this.translateX = this.calculateTranslateX();
        this.timeline = gsap.timeline();
        this.progress = 0;
    }

    calculateTranslateX () {
        const loaderBounds = this.DOM.container.getBoundingClientRect();
        const targetBounds = this.DOM.target.getBoundingClientRect();
        const translateX = {
            start: -(loaderBounds.x - targetBounds.x + loaderBounds.width + 170),
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
        if (this.progress >= 100) {
            clearInterval(this.loading);
        }
    }

    animateIn() {
        this.timeline.add(gsap.fromTo(this.DOM.container, { opacity: 0 }, { opacity: 1, delay: 0.4, duration: 1, ease: 'power2.inOut' }));
        this.timeline.call(this.startLoader.bind(this), [], '>');
        this.timeline.add(gsap.fromTo(this.DOM.container, { translateX: - getDistanceTo(this.DOM.container, 'left') + 100 }, { translateX: getDistanceTo(this.DOM.container, 'right') - 150, duration: 3, ease: 'power3.inOut' }, '>'));
        return this.timeline;
    }

}