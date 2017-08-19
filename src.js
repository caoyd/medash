
let medash = {
	init() {
		// requestAnimationFrame
		window.requestAnimationFrame = () => {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || (e, t) => {
				return setTimeout(e, 1e3 / 60);
			};
		};
	},

	// string
	string() {
		String.prototype.replaceAll = (replaceFrom, replaceTo) => {
			return this.replace(new RegExp(replaceFrom, 'gm'), replaceTo);
		}
		String.prototype.trim = () => {
			return this.replace(/(^\s*)|(\s*)$/g, '');
		}
	},

	// array
	array() {
		// unique
		Array.prototype.unique = () => {

		}
	},

	// url parameter
	url(url) {

	},

	// store
	store: {
		get: (key, value) => {},
		set: (key, value) => {},
	},

	// ajax
	ajax: {},

	validate: {
		// phone number
		phone(str) {
			return /^1[3-9]\d{9}$/.test(str);
		},

		// email
		email(str) {
			return /^(?:\w+\.)*\w+@\w+(?:\.\w+)+$/i.test(str);
		},

		// identity card number
		id(str) {
			return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(str);
		},

		// ip address
		ip(str) {
			return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/.test(str);
		},


	},

	// DOM
	// go to top
	gotop(config) {
		// to do
	},
	// detect surpport webp or not
	isWebpWork() {
		// to do
	},

	// CSS
	getStyle(obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr];
	},
	transition() {
		let arr = ['transition', 'WebkitTransition', 'MozTransition', 'msTransition', 'OTransition'];
		let el = document.createElement('div').style;
		let res = '';
		arr.some(item => {
			if (item in el) {
				res = item;
				return true;
			}
		});
		el = null;
		return res;
	},
}

