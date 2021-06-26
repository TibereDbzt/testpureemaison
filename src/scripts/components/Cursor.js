import gsap from 'gsap';
import { mousePos as mouse } from './../utils/getters';
import { COLORS, EASES } from './../utils/CONSTANTS';

export class CircleCursor {

    constructor (el) {
        this.DOM = {
            container: el,
            shape: el.querySelector('[data-cursor-shape]')
        };
        this.size = this.getSize();
        this.initEvents();
        this.render();
    }

    initEvents () {
        // document.addEventListener('mouseleave', e => this.onScreenLeave());
        // document.addEventListener('mouseenter', e => this.onScreenEnter());
    }

    onEnterLink (target) {
        if (target.dataset.linkReact !== undefined) {
            const shape = target.querySelector('[data-link-shape]');
            const text = target.querySelector('[data-link-text]');
            const icon = target.querySelector('[data-link-icon]');
            gsap.to(text, { translateY: 15, delay: 0.5, opacity: 1, duration: 0.9, ease: "power4.out"});
            gsap.to(icon, { translateY: 8, delay: 0.5, opacity: 0, duration: 0.8, ease: "power4.out"});
            gsap.to(shape, { scale: 0.93, delay: 0.1, duration: 0.8, ease: "power3.inOut"});
        }
        gsap.to(this.DOM.shape, { attr: {r: 62, stroke: COLORS.GREY }, delay: 0.1, duration: 0.8, ease: "power3.inOut"});
    }
    
    onLeaveLink (target) {
        if (target.dataset.linkReact !== undefined) {
            const shape = target.querySelector('[data-link-shape]');
            const text = target.querySelector('[data-link-text]');
            const icon = target.querySelector('[data-link-icon]');
            gsap.to(text, { translateY: 0, opacity: 0, duration: 1.2, ease: "power2.inOut"});
            gsap.to(icon, { translateY: 0, delay: 0.3, opacity: 1, duration: 0.9, ease: "power2.inOut"});
            gsap.to(shape, { scale: 1, delay: 0.5, duration: 0.6, ease: "power2.inOut"});
        }
        gsap.to(this.DOM.shape, { attr: {r: 45, stroke: COLORS.WHITE}, duration: 0.6, ease: "power3.out"});
    }

    onLeaveScreen () {
        gsap.to(this.DOM, {opacity: 0, duration: 0., ease: "power4.out"});
    }
    
    onEnterScreen () {
        gsap.to(this.DOM, {opacity: 1, duration: 0.5, ease: "power4.out"});
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