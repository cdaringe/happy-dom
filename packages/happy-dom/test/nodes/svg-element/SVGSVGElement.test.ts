import Window from '../../../src/window/Window';
import Document from '../../../src/nodes/document/Document';
import SVGSVGElement from '../../../src/nodes/svg-element/SVGSVGElement';
import NamespaceURI from '../../../src/config/NamespaceURI';
import SVGRect from '../../../src/nodes/svg-element/SVGRect';
import SVGPoint from '../../../src/nodes/svg-element/SVGPoint';
import SVGAnimatedRect from '../../../src/nodes/svg-element/SVGAnimatedRect';
import SVGNumber from '../../../src/nodes/svg-element/SVGNumber';
import SVGLength from '../../../src/nodes/svg-element/SVGLength';
import SVGAngle from '../../../src/nodes/svg-element/SVGAngle';
import SVGTransform from '../../../src/nodes/svg-element/SVGTransform';

describe('SVGSVGElement', () => {
	let window: Window;
	let document: Document;
	let element: SVGSVGElement;

	beforeEach(() => {
		window = new Window();
		document = window.document;
		element = <SVGSVGElement>document.createElementNS(NamespaceURI.svg, 'svg');
	});

	for (const property of ['width', 'height', 'x', 'y', 'contentScriptType']) {
		describe(`get ${property}()`, () => {
			it('Returns attribute value.', () => {
				expect(element[property]).toBe('');
				element.setAttribute(property, 'value');
				expect(element[property]).toBe('value');
			});
		});

		describe(`set ${property}()`, () => {
			it('Sets attribute value.', () => {
				element[property] = 'value';
				expect(element.getAttribute(property)).toBe('value');
			});
		});
	}

	describe('get preserveAspectRatio()', () => {
		it('Returns attribute value.', () => {
			expect(element.preserveAspectRatio).toBe('xMidYMid meet');
			element.setAttribute('preserveAspectRatio', 'xMidYMin');
			expect(element.preserveAspectRatio).toBe('xMidYMin');
		});
	});

	describe('set preserveAspectRatio()', () => {
		it('Sets attribute value.', () => {
			element.preserveAspectRatio = 'xMidYMin';
			expect(element.getAttribute('preserveAspectRatio')).toBe('xMidYMin');
		});
	});

	describe('get currentScale()', () => {
		it('Returns attribute value.', () => {
			expect(element.currentScale).toBe(1);
			element.currentScale = 2;
			expect(element.currentScale).toBe(2);
		});
	});

	describe('set currentScale()', () => {
		it('Sets attribute value.', () => {
			element.setAttribute('currentScale', '2');
			expect(element.currentScale).toBe(2);
			element.currentScale = 3;
			expect(element.currentScale).toBe(3);
			expect(element.getAttribute('currentScale')).toBe('3');
		});
	});

	describe('get viewport()', () => {
		it('Returns an instanceof SVGRect.', () => {
			expect(element.viewport instanceof SVGRect).toBe(true);
		});
	});

	describe('get currentTranslate()', () => {
		it('Returns an instanceof SVGPoint.', () => {
			expect(element.currentTranslate instanceof SVGPoint).toBe(true);
		});
	});

	describe('get viewBox()', () => {
		it('Returns an instanceof SVGAnimatedRect with values from the attribute "viewBox".', () => {
			element.setAttribute('viewBox', '0 0 100 100');
			expect(element.viewBox instanceof SVGAnimatedRect).toBe(true);
			expect(element.viewBox.baseVal).toEqual({
				x: 0,
				y: 0,
				width: 100,
				height: 100
			});
		});
	});

	describe('pauseAnimations()', () => {
		it('Exists and does nothing.', () => {
			expect(typeof element.pauseAnimations).toBe('function');
			element.pauseAnimations();
		});
	});

	describe('unpauseAnimations()', () => {
		it('Exists and does nothing.', () => {
			expect(typeof element.unpauseAnimations).toBe('function');
			element.unpauseAnimations();
		});
	});

	describe('getCurrentTime()', () => {
		it('Returns "0".', () => {
			expect(element.getCurrentTime()).toBe(0);
		});
	});

	describe('setCurrentTime()', () => {
		it('Exists and does nothing.', () => {
			expect(typeof element.setCurrentTime).toBe('function');
			element.setCurrentTime();
		});
	});

	describe('getIntersectionList()', () => {
		it('Returns an empty Array.', () => {
			expect(element.getIntersectionList()).toEqual([]);
		});
	});

	describe('getEnclosureList()', () => {
		it('Returns an empty Array.', () => {
			expect(element.getEnclosureList()).toEqual([]);
		});
	});

	describe('checkIntersection()', () => {
		it('Returns "false".', () => {
			expect(element.checkIntersection()).toBe(false);
		});
	});

	describe('checkEnclosure()', () => {
		it('Returns "false".', () => {
			expect(element.checkEnclosure()).toBe(false);
		});
	});

	describe('deselectAll()', () => {
		it('Exists and does nothing.', () => {
			expect(typeof element.deselectAll).toBe('function');
			element.deselectAll();
		});
	});

	describe('createSVGNumber()', () => {
		it('Returns an instance of SVGNumber.', () => {
			expect(element.createSVGNumber() instanceof SVGNumber).toBe(true);
		});
	});

	describe('createSVGLength()', () => {
		it('Returns an instance of SVGLength.', () => {
			expect(element.createSVGLength() instanceof SVGLength).toBe(true);
		});
	});

	describe('createSVGAngle()', () => {
		it('Returns an instance of SVGAngle.', () => {
			expect(element.createSVGAngle() instanceof SVGAngle).toBe(true);
		});
	});

	describe('createSVGPoint()', () => {
		it('Returns an instance of SVGPoint.', () => {
			expect(element.createSVGPoint() instanceof SVGPoint).toBe(true);
		});
	});

	describe('createSVGRect()', () => {
		it('Returns an instance of SVGRect.', () => {
			expect(element.createSVGRect() instanceof SVGRect).toBe(true);
		});
	});

	describe('createSVGTransform()', () => {
		it('Returns an instance of SVGTransform.', () => {
			expect(element.createSVGTransform() instanceof SVGTransform).toBe(true);
		});
	});
});
