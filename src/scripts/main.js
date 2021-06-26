import gsap from 'gsap';

import '../styles/main.sass';

import { CircleCursor } from './components/Cursor';
import { ClippedBackground } from './components/ClippedBackground';

let cursor;
let clippedBackground;
let links;
let timeline;

const initElements = () => {
    timeline = gsap.timeline();
    cursor = new CircleCursor(document.querySelector('[data-cursor]'));
    clippedBackground = new ClippedBackground(document.querySelector('[data-clipped-background]'));
    links = document.querySelectorAll('[data-link], a');
}

const initEvents = () => {
    timeline.add(clippedBackground.getTimeline());
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
