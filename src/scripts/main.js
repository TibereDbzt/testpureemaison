import gsap from 'gsap';

import '../styles/main.sass';

import { CircleCursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { HeroSection } from './sections/HeroSection';

let loader;
let cursor;
let heroSection;
let links;
let timeline;

const initElements = () => {
    timeline = gsap.timeline();
    loader = new Loader(document.querySelector('[data-loader]'), document.querySelector('[data-loader-target]'));
    cursor = new CircleCursor(document.querySelector('[data-cursor]'));
    heroSection = new HeroSection(document.querySelector('[data-hero-section]'));
    links = document.querySelectorAll('[data-link], a');
}

const initEvents = () => {
    timeline.add(loader.animateIn());
    timeline.add(heroSection.animateIn(), '=');
    links.forEach(link => {
        link.addEventListener('mouseenter', (e) => cursor.onEnterLink(e.target));
        link.addEventListener('mouseleave', (e) => cursor.onLeaveLink(e.target));
    });
    document.addEventListener('mouseenter', e => cursor.onEnterScreen());
    document.addEventListener('mouseleave', e => cursor.onLeaveScreen());
}

const onLoad = () => {
    initElements();
    initEvents();
}

document.addEventListener('load', onLoad());
