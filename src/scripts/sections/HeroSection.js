import gsap from 'gsap';
import { ClippedBackground } from '../components/ClippedBackground';
import { EASES } from '../utils/CONSTANTS';
import { split } from '../utils/text';
import { skewYOpactityReveal } from './../utils/animations';
import { getDistanceTo } from './../utils/getters';

export class HeroSection {

    constructor(el) {
        this.DOM = {
            container: el,
            title: {
                content: el.querySelector('[data-hero-title-content]'),
                border: el.querySelector('[data-hero-title-border]')
            },
            texts: el.querySelectorAll('[data-hero-text]'),
            scrollButton: {
                container: el.querySelector('[data-hero-scroll-button]'),
                icon: el.querySelector('[data-hero-scroll-button-icon]')
            }
        };
        this.background = new ClippedBackground(this.DOM.container.querySelector('[data-clipped-background]'));
        this.initContent();
    }

    initContent() {
        split(this.DOM.title.content, '');
    }

    animateTitle() {
        const timeline = gsap.timeline();
        timeline.add(skewYOpactityReveal(this.DOM.title.content));
        timeline.from(this.DOM.title.border, { width: 0, duration: 3, ease: EASES.markedOut }, '<+=1');
        return timeline;
    }

    animateScrollButton() {
        const timeline = gsap.timeline();
        timeline.fromTo(this.DOM.scrollButton.container, { translateY: getDistanceTo(this.DOM.scrollButton.container, 'top') + 40, scaleY: 1.6, scaleX: 0.8 }, { translateY: 0, scaleX: 1.2, scaleY: 1.2, duration: 1.6, ease: EASES.markedOut });
        timeline.from(this.DOM.scrollButton.icon, { scale: 0, duration: 1.5, ease: EASES.markedOut }, '<+=0.6');
        timeline.to(this.DOM.scrollButton.container, { scaleX: 1, scaleY: 1, duration: 2.5, ease: 'power2.inOut' }, '>-=1.3');
        return timeline;
    }

    animateTexts() {
        const timeline = gsap.timeline();
        this.DOM.texts.forEach(text => {
            const innerText = text.querySelector('[data-hero-text-inner]');
            timeline.from(text, { translateY: 40, duration: 3, ease: EASES.markedOut }, '<+=0.1');
            timeline.from(innerText, { translateY: 15, duration: 3, ease: EASES.markedOut }, '<+=0.1');
        });
        return timeline;
    }

    animateUntilLoaded() {
        return this.background.animateOpacity();
    }

    animateAfterLoaded() {
        const timeline = gsap.timeline();
        timeline.add(this.background.animateClipPath(), '');
        timeline.add(this.animateTitle(), '<+=0.5');
        timeline.add(this.animateTexts(), '<+=0.5');
        // timeline.add(this.animateScrollButton(), '<');
        return timeline;
    }

}