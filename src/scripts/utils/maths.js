
const getCircleLength = (circle) => {
    return Math.round(2 * Math.PI * parseInt(circle.getAttribute('r'), 10)) + 3;
}

const getPathLength = (path) => {
    return path.getTotalLength();
}

const getRectLength = (rect) => {
    return Math.round(parseInt(rect.getAttribute('width')) * parseInt(rect.getAttribute('height')));
}

export { getCircleLength, getPathLength };