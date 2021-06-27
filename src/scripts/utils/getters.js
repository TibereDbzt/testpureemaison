const getMousePos = e => {
    return {x: e.clientX, y: e.clientY};
};

const getClientSize = () => {
    return {width: window.innerWidth, height: window.innerHeight};
};

window.addEventListener('resize', () => windowSize = getClientSize());
window.addEventListener('mousemove', e => mousePos = getMousePos(e));

let mousePos = {x: -10, y: -10};
let windowSize = getClientSize();

export { mousePos, windowSize };