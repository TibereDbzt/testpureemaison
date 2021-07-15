import { gsap } from 'gsap';
import { EASES } from '../utils/CONSTANTS';
import { getDistanceTo } from './../utils/getters';

export class Loader {

    constructor(el, target) {
        this.DOM = {
            container: el,
            mask: el.querySelector('[data-loader-mask]'),
            roller: el.querySelector('[data-loader-roller]'),
            percent: el.querySelector('[data-loader-percent]'),
            content: el.querySelector('[data-loader-content]'),
            target: target
        };
        this.initElements();
        this.timeline = gsap.timeline();
        this.progress = 0;
    }

    initElements() {
        gsap.set(this.DOM.roller, { translateY: getDistanceTo(this.DOM.roller, 'bottom', this.DOM.mask, 'top') });
    }

    startLoader() {
        this.loading = setInterval(() => {
            this.incrementLoader();
        }, 25);
    }

    calculateTranslateX() {
        this.translateX = getDistanceTo(this.DOM.content, 'left', this.DOM.target, 'right');
    }

    animateRoll() {
        console.log(this.translateX);
        const timeline = gsap.timeline();
        timeline.to(this.DOM.roller, { translateY: 0, duration: 3, ease: EASES.markedInOut });
        timeline.to(this.DOM.container, { translateX: getDistanceTo(this.DOM.content, 'left', this.DOM.target, 'right') + 30, duration: 3, ease: EASES.markedInOut }, '<');
        return timeline;
    }

    incrementLoader() {
        this.progress += 1;
        this.DOM.percent.innerHTML = this.progress;
        if (this.progress >= 100) {
            clearInterval(this.loading);
        }
    }

    setPosition() {
        console.log(getDistanceTo(this.DOM.container, 'right'));
        // gsap.set(this.DOM.container, { translateX: getDistanceTo(this.DOM.container, 'right') - 150 });
        // this.timeline.add(gsap.set(this.DOM.container, { left: 0, right:  { left: 'unset', right: '100%', duration: 3, ease: 'power3.inOut' }, '>'));
    }

    animateIn() {
        this.timeline.add(gsap.fromTo(this.DOM.container, { opacity: 0 }, { opacity: 1, delay: 0.4, duration: 1, ease: 'power2.inOut' }));
        this.timeline.call(this.startLoader.bind(this), [], '>');
        this.timeline.add(gsap.to(this.DOM.container, { left: 'unset', right: '30', duration: 3, ease: 'power3.inOut' }, '>')).then(() => {
            this.timeline.add(this.animateRoll(), '>+=1');
        });
        return this.timeline;
    }

}