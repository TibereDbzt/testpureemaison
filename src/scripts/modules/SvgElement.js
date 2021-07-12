import gsap from 'gsap';

export class SvgElement {

    constructor(svgElement) {
        this.DOM = {
            svg: svgElement,
            shapes: this.getShapes(svgElement)
        };
        this.setShapesAttributes();
    }

    drawShapes(duration, ease, offset) {
        const shapes = this.DOM.shapes;
        shapes.forEach((shape, i) => gsap.to(shape.el, { strokeDashoffset: 0, duration: duration, ease: ease, delay: i * offset }));
    }

    undrawShapes(duration, ease, offset) {
        const shapes = this.DOM.shapes;
        shapes.forEach((shape, i) => gsap.to(shape.el, { strokeDashoffset: shape.length, duration: duration, ease: ease, delay: i * offset  }));
    }

    setShapesAttributes() {
        const shapes = this.DOM.shapes;
        shapes.forEach(shape => {
            shape.el.style.strokeDasharray = shape.length + ' ' + shape.length;
            shape.el.style.strokeDashoffset = shape.length;
        });
    }

    getShapeLength(element) {
        if (!(element instanceof SVGGeometryElement)) return null;
        if (element instanceof SVGPolygonElement) return element.getTotalLength();
        if (element instanceof SVGPolylineElement) return element.getTotalLength();
        if (element instanceof SVGCircleElement) return Math.round(2 * Math.PI * parseInt(element.getAttribute('r'), 10));
        if (element instanceof SVGPathElement) return element.getTotalLength();
        if (element instanceof SVGRectElement) return Math.round(2 * parseInt(element.getAttribute('width')) + 2 * parseInt(element.getAttribute('height')));
        if (element instanceof SVGEllipseElement) {
            const rx = parseInt(element.getAttribute('rx'));
            const ry = parseInt(element.getAttribute('ry'));
            let h = Math.pow((rx-ry), 2) / Math.pow((rx+ry), 2);
            return (Math.PI * ( rx + ry )) * (1 + ( (3 * h) / ( 10 + Math.sqrt( 4 - (3 * h) )) ));
        }
        if (element instanceof SVGLineElement) {
            const x1 = parseInt(element.attr('x1'));
            const x2 = parseInt(element.attr('x2'));
            const y1 = parseInt(element.attr('y1'));
            const y2 = parseInt(element.attr('y2'));
            return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        }
    }

    getShapes(svgElement) {
        const svg = svgElement;
        const shapes = [];
        const trackShapes = element => {
            if (element.children.length > 0) [...element.children].forEach(subChildElement => trackShapes(subChildElement));
            const shapeLength = this.getShapeLength(element);
            if (shapeLength) shapes.push({
                el: element,
                length: shapeLength
            });
        };
        trackShapes(svg);
        return shapes;
    }

}