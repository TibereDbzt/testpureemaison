import { gsap } from 'gsap';
import each from 'lodash/each';

import { EASES } from './../utils/CONSTANTS';

// require inline-block display on each span
const skewYOpactityReveal = (el) => {
    const letters = el.querySelectorAll('span');
    console.log(letters);
    const timeline = gsap.timeline();
    each(letters, letter => {
        timeline.add(gsap.fromTo(letter, { translateY: 200, opacity: 0, scaleY: 2 }, { translateY: 0, opacity: 1, scaleY: 1, duration: 1.6, ease: EASES.markedOut }), '<+=0.1');
    });
    return timeline;
};

export { skewYOpactityReveal };