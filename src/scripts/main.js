import gsap from 'gsap';

import '../styles/main.sass';

import { CircleCursor } from './components/Cursor';
import { ClippedBackground } from './components/ClippedBackground';
import { Loader } from './components/Loader';
import { skewYOpactityReveal } from './utils/animations';
import { split } from './utils/text';

let loader;
let cursor;
let clippedBackground;
let links;
let timeline;
let title;

const initElements = () => {
    timeline = gsap.timeline();
    loader = new Loader(document.querySelector('[data-loader]'), document.querySelector('[data-loader-target]'));
    cursor = new CircleCursor(document.querySelector('[data-cursor]'));
    clippedBackground = new ClippedBackground(document.querySelector('[data-clipped-background]'));
    links = document.querySelectorAll('[data-link], a');
    title = document.querySelector('[data-title]');
    split(title, '');
}

const initEvents = () => {
    timeline.add(loader.getTimeline());
    timeline.add(clippedBackground.animateOpacity(), '<');
    timeline.add(clippedBackground.animateClipPath(), '+=1');
    timeline.add(skewYOpactityReveal(title), '<');
    timeline.add(gsap.fromTo(title, { borderBottomWidth: 0 }, { borderBottomWidth: 100, duration: 1, ease: 'power4.inOut' }), '<');
    links.forEach(link => {
        link.addEventListener('mouseenter', (e) => cursor.onEnterLink(e.target));
        link.addEventListener('mouseleave', (e) => cursor.onLeaveLink(e.target));
    });
}

const onLoad = () => {
    initElements();
    initEvents();
}

document.addEventListener('load', onLoad());
