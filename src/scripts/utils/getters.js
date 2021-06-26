let mousePos = {x: -10, y: -10};
let windowSize = {width: window.innnerWidth, height: window.innerHeight};

const getMousePos = e => {
    return {x: e.clientX, y: e.clientY};
};

const getClientSize = () => {
    return {width: window.innnerWidth, height: window.innerHeight};
};

window.addEventListener('resize', () => windowSize = getClientSize());
window.addEventListener('mousemove', e => mousePos = getMousePos(e));

export { mousePos, windowSize };