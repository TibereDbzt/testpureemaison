import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const COLORS = {
    BLACK: '#1C1C1C',
    WHITE: '#ffffff',
    GREY: '#A6A6A6'
};

const EASES = {
    markedInOut: CustomEase.create("custom", "M0,0 C0.408,0.034 0.346,0.12 0.426,0.536 0.508,0.966 0.686,1 1,1 ")
};

export { COLORS, EASES };