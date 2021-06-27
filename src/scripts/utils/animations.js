import { gsap } from 'gsap';
import each from 'lodash/each';

import { EASES } from './../utils/CONSTANTS';

const skewYOpactityReveal = (el) => {
    const letters = el.querySelectorAll('span');
    const timeline = gsap.timeline();
    each(letters, letter => {
        timeline.add(gsap.fromTo(letter, { translateY: 200, opacity: 0, scaleY: 2 }, { translateY: 0, opacity: 1, scaleY: 1, duration: 1.4, ease: EASES.markedInOut }), '<+=0.1');
    });
    return timeline;
};

export { skewYOpactityReveal };