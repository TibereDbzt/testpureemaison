import { gsap } from 'gsap';
import { each, reverse } from 'lodash';
import { EASES } from '../utils/CONSTANTS';
import { split } from '../utils/text';
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
        gsap.set(this.DOM.roller, { translateY: getDistanceTo(this.DOM.percent, 'top', this.DOM.mask, 'top') });
    }

    startLoader() {
        this.loading = setInterval(() => {
            this.incrementLoader();
        }, 25);
    }

    animateRoll() {
        const timeline = gsap.timeline();
        const percentChars = Array.from(this.DOM.percent.querySelectorAll('span'));
        const contentChars = Array.from(this.DOM.content.querySelectorAll('span'));
        // timeline.to(this.DOM.roller, { translateY: 0, duration: 3, ease: EASES.markedInOut });
        timeline.addLabel('toTarget')
        timeline.to(this.DOM.container, { translateX: getDistanceTo(this.DOM.container, 'left', this.DOM.target, 'left'), duration: 3, ease: 'power2.inOut' }, 'toTarget');
        each(reverse(percentChars), (char, i) => {
            timeline.to(char, { translateY: -getDistanceTo(char, 'bottom', this.DOM.mask, 'top'), duration: 0.9, ease: EASES.markedIn, delay: 0.2 * i }, 'toTarget+=0.4');
        });
        each(reverse(contentChars), (char, i) => {
            timeline.to(char, { translateY: getDistanceTo(char, 'bottom', this.DOM.mask, 'bottom'), duration: 1, ease: EASES.markedOut, delay: 0.2 * i }, 'toTarget+=1.2');
        });
        timeline.set(this.DOM.target, { opacity: 1 }, '-=0.1');
        timeline.set(this.DOM.container, { opacity: 0 }, '<');
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
            split(this.DOM.percent, '');
            split(this.DOM.content, '');
            this.timeline.add(this.animateRoll(), '>+=0.5');
        });
        return this.timeline;
    }

}