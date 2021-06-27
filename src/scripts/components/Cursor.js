import gsap from 'gsap';
import { mousePos as mouse } from './../utils/getters';
import { COLORS, EASES } from './../utils/CONSTANTS';
import { getCircleLength } from './../utils/maths';

export class CircleCursor {

    constructor (el) {
        this.DOM = {
            container: el,
            circle: el.querySelector('[data-cursor-shape]'),
            circleLength: getCircleLength(el.querySelector('[data-cursor-shape]'))
        };
        this.setCircleAttribute();
        this.size = this.getSize();
        this.render();
    }

    setCircleAttribute () {
        this.DOM.circle.style.strokeDasharray = this.DOM.circleLength + ' ' + this.DOM.circleLength;
        this.DOM.circle.style.strokeDashoffset = this.DOM.circleLength;
    }
    
    onEnterLink (target) {
        gsap.to(this.DOM.circle, { attr: { stroke: COLORS.GREY }, duration: 0.6, ease: "power3.out"});
        gsap.to(this.DOM.container, { scale: 1.42, duration: 0.6, ease: "power3.out"});
        if (target.dataset.linkReact !== undefined) {
            const circle = target.querySelector('[data-link-shape]');
            const text = target.querySelector('[data-link-text]');
            const icon = target.querySelector('[data-link-icon]');
            gsap.to(text, { translateY: 15, delay: 0.1, opacity: 1, duration: 0.9, ease: "power4.out"});
            gsap.to(icon, { translateY: 8, delay: 0.1, opacity: 0, duration: 0.8, ease: "power4.out"});
            gsap.to(circle, { scale: 0.93, delay: 0.1, duration: 0.8, ease: "power3.inOut"});
        }
    }
    
    onLeaveLink (target) {
        gsap.to(this.DOM.circle, { attr: { stroke: COLORS.WHITE }, duration: 0.6, ease: "power3.out"});
        gsap.to(this.DOM.container, { scale: 1, duration: 0.6, ease: "power3.out"});
        if (target.dataset.linkReact !== undefined) {
            const circle = target.querySelector('[data-link-shape]');
            const text = target.querySelector('[data-link-text]');
            const icon = target.querySelector('[data-link-icon]');
            gsap.to(text, { translateY: 0, opacity: 0, duration: 0.9, ease: "power2.inOut"});
            gsap.to(icon, { translateY: 0, opacity: 1, duration: 0.9, ease: "power2.inOut"});
            gsap.to(circle, { scale: 1, delay: 0.1, duration: 0.6, ease: "power2.inOut"});
        }
    }

    onEnterScreen () {
        gsap.to(this.DOM.circle, { strokeDashoffset: 0, duration: 2, ease: EASES.markedInOut });
    }
    
    onLeaveScreen () {
        gsap.to(this.DOM.circle, { strokeDashoffset: this.DOM.circleLength, duration: 2, ease: 'power4.out' });
    }

    getSize () {
        const bounds = this.DOM.container.getBoundingClientRect();
        return { width: bounds.width, height: bounds.height };
    }

    render () {
        gsap.set(this.DOM.container, { translateX: (mouse.x - (this.size.width / 2)), translateY: (mouse.y - (this.size.height / 2)) });
        requestAnimationFrame(() => this.render());
    }

}