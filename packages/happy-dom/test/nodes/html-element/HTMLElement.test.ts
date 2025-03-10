import Document from '../../../src/nodes/document/Document';
import HTMLElement from '../../../src/nodes/html-element/HTMLElement';
import Window from '../../../src/window/Window';

describe('HTMLElement', () => {
	let window: Window = null;
	let document: Document = null;
	let element: HTMLElement = null;

	beforeEach(() => {
		window = new Window();
		document = window.document;
		element = <HTMLElement>document.createElement('div');
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	for (const property of ['accessKey', 'accessKeyLabel']) {
		describe(`${property}`, () => {
			it('Returns "".', () => {
				const div = document.createElement('div');
				expect(div[property]).toBe('');
			});
		});
	}

	for (const property of [
		'offsetHeight',
		'offsetWidth',
		'offsetLeft',
		'offsetTop',
		'clientHeight',
		'clientWidth'
	]) {
		describe(`${property}`, () => {
			it('Returns "0".', () => {
				const div = document.createElement('div');
				expect(div[property]).toBe(0);
			});
		});
	}

	describe('contentEditable', () => {
		it('Returns "inherit".', () => {
			const div = <HTMLElement>document.createElement('div');
			expect(div.contentEditable).toBe('inherit');
		});
	});

	describe('isContentEditable', () => {
		it('Returns "false".', () => {
			const div = <HTMLElement>document.createElement('div');
			expect(div.isContentEditable).toBe(false);
		});
	});

	describe('get tabIndex()', () => {
		it('Returns the attribute "tabindex" as a number.', () => {
			const div = <HTMLElement>document.createElement('div');
			div.setAttribute('tabindex', '5');
			expect(div.tabIndex).toBe(5);
		});
	});

	describe('set tabIndex()', () => {
		it('Sets the attribute "tabindex".', () => {
			const div = <HTMLElement>document.createElement('div');
			div.tabIndex = 5;
			expect(div.getAttribute('tabindex')).toBe('5');
		});

		it('Removes the attribute "tabindex" when set to "-1".', () => {
			const div = <HTMLElement>document.createElement('div');
			div.tabIndex = 5;
			div.tabIndex = -1;
			expect(div.getAttribute('tabindex')).toBe(null);
		});
	});

	describe('get innerText()', () => {
		it('Returns the as the textContent property.', () => {
			const div = document.createElement('div');
			const textNode1 = document.createTextNode('text1');
			const textNode2 = document.createTextNode('text2');
			element.appendChild(div);
			element.appendChild(textNode2);
			div.appendChild(textNode1);
			expect(element.innerText).toBe('text1text2');
			expect(element.innerText).toBe(element.textContent);
		});
	});

	describe('set innerText()', () => {
		it('Sets the value of the textContent property.', () => {
			const div = document.createElement('div');
			const textNode1 = document.createTextNode('text1');
			const textNode2 = document.createTextNode('text2');

			element.appendChild(div);
			element.appendChild(textNode1);
			element.appendChild(textNode2);

			element.textContent = 'new_text';

			expect(element.innerText).toBe('new_text');
			expect(element.innerText).toBe(element.textContent);
			expect(element.childNodes.length).toBe(1);
			expect(element.childNodes[0].textContent).toBe('new_text');
		});
	});

	describe('get style()', () => {
		it('Returns styles.', () => {
			element.setAttribute('style', 'border-radius: 2px; padding: 2px;');
			expect(element.style.length).toEqual(2);
			expect(element.style[0]).toEqual('border-radius');
			expect(element.style[1]).toEqual('padding');
			expect(element.style.borderRadius).toEqual('2px');
			expect(element.style.padding).toEqual('2px');
			expect(element.style.cssText).toEqual('border-radius: 2px; padding: 2px;');

			element.setAttribute('style', 'border-radius: 4px; padding: 4px;');
			expect(element.style.length).toEqual(2);
			expect(element.style[0]).toEqual('border-radius');
			expect(element.style[1]).toEqual('padding');
			expect(element.style.borderRadius).toEqual('4px');
			expect(element.style.padding).toEqual('4px');
			expect(element.style.cssText).toEqual('border-radius: 4px; padding: 4px;');
		});

		it('Setting a property changes the "style" attribute.', () => {
			element.setAttribute('style', 'border-radius: 2px; padding: 2px;');

			element.style.borderRadius = '4rem';
			element.style.backgroundColor = 'green';

			expect(element.style.length).toEqual(3);
			expect(element.style[0]).toEqual('border-radius');
			expect(element.style[1]).toEqual('padding');
			expect(element.style[2]).toEqual('background-color');

			expect(element.style.borderRadius).toEqual('4rem');
			expect(element.style.padding).toEqual('2px');
			expect(element.style.backgroundColor).toEqual('green');

			expect(element.style.cssText).toEqual(
				'border-radius: 4rem; padding: 2px; background-color: green;'
			);

			expect(element.getAttribute('style')).toEqual(
				'border-radius: 4rem; padding: 2px; background-color: green;'
			);
		});

		it('Settings a property to empty string also removes it.', () => {
			element.setAttribute('style', 'border-radius: 2px; padding: 2px;');

			element.style.borderRadius = '';
			element.style.backgroundColor = 'green';

			expect(element.style.length).toEqual(2);
			expect(element.style[0]).toEqual('padding');
			expect(element.style[1]).toEqual('background-color');
			expect(element.style[2]).toBe(undefined);

			expect(element.style.borderRadius).toEqual('');
			expect(element.style.padding).toEqual('2px');
			expect(element.style.backgroundColor).toEqual('green');

			expect(element.style.cssText).toEqual('padding: 2px; background-color: green;');

			expect(element.getAttribute('style')).toEqual('padding: 2px; background-color: green;');
		});
	});

	describe('get dataset()', () => {
		it('Returns attributes prefixed with "data-" as an object.', () => {
			element.setAttribute('test1', 'value1');
			element.setAttribute('data-test2', 'value2');
			element.setAttribute('test3', 'value3');
			element.setAttribute('data-test4', 'value4');
			expect(element.dataset).toEqual({
				test2: 'value2',
				test4: 'value4'
			});
		});
	});

	describe('get dir()', () => {
		it('Returns the attribute "dir".', () => {
			const div = <HTMLElement>document.createElement('div');
			div.setAttribute('dir', 'rtl');
			expect(div.dir).toBe('rtl');
		});
	});

	describe('set dir()', () => {
		it('Sets the attribute "tabindex".', () => {
			const div = <HTMLElement>document.createElement('div');
			div.dir = 'rtl';
			expect(div.getAttribute('dir')).toBe('rtl');
		});
	});

	describe('get hidden()', () => {
		it('Returns the attribute "hidden".', () => {
			const div = <HTMLElement>document.createElement('div');
			div.setAttribute('hidden', '');
			expect(div.hidden).toBe(true);
		});
	});

	describe('set hidden()', () => {
		it('Sets the attribute "hidden".', () => {
			const div = <HTMLElement>document.createElement('div');
			div.hidden = true;
			expect(div.getAttribute('hidden')).toBe('');
			div.hidden = false;
			expect(div.getAttribute('hidden')).toBe(null);
		});
	});

	for (const property of ['lang', 'title']) {
		describe(`get ${property}`, () => {
			it(`Returns the attribute "${property}".`, () => {
				const div = document.createElement('div');
				div.setAttribute(property, 'value');
				expect(div[property]).toBe('value');
			});
		});

		describe(`set ${property}()`, () => {
			it(`Sets the attribute "${property}".`, () => {
				const div = document.createElement('div');
				div[property] = 'value';
				expect(div.getAttribute(property)).toBe('value');
			});
		});
	}

	for (const eventType of ['click', 'blur', 'focus', 'focusin', 'focusout']) {
		describe(`${eventType}()`, () => {
			it(`Dispatches a "${eventType}" event.`, () => {
				let methodName = eventType;
				let triggeredEvent = null;

				if (eventType === 'focusin') {
					methodName = 'focus';
				} else if (eventType === 'focusout') {
					methodName = 'blur';
				}

				element.addEventListener(eventType, event => {
					triggeredEvent = event;
				});
				element[methodName]();
				expect(triggeredEvent).toEqual({
					_immediatePropagationStopped: false,
					_propagationStopped: false,
					bubbles: true,
					cancelable: false,
					composed: true,
					currentTarget: element,
					defaultPrevented: false,
					target: element,
					type: eventType
				});
			});
		});
	}

	describe('setAttributeNode()', () => {
		it('Sets css text of existing CSSStyleDeclaration.', () => {
			element.style.background = 'green';
			element.style.color = 'black';
			element.setAttribute('style', 'color: green');
			expect(element.style.length).toEqual(1);
			expect(element.style[0]).toEqual('color');
			expect(element.style.color).toEqual('green');
		});
	});

	describe('removeAttributeNode()', () => {
		it('Removes property from CSSStyleDeclaration.', () => {
			element.style.background = 'green';
			element.style.color = 'black';
			element.removeAttribute('style');
			expect(element.style.length).toEqual(0);
			expect(element.style.cssText).toEqual('');
		});
	});
});
