
let medash = {
	init: function() {

	},

	// string
	string: function() {
		String.prototype.replaceAll = function(replaceFrom, replaceTo) {
			return this.replace(new RegExp(replaceFrom, 'gm'), replaceTo);
		}
	},

	// array
	array: function() {
		// unique
	},

	// url parameter
	url: function(url) {

	},

	// store
	store: {
		get: function(key, value) {},
		set: function(key, value) {},
	},

	// ajax
	ajax: {},

	validate: {
		// phone number
		phone: function(str) {
			return /^1[3-9]\d{9}$/.test(str);
		},

		// identity card number
		id: function(str) {
			return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(str);
		},

		// ip address
		ip: function(str) {
			return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/.test(str);
		},


	},

	// DOM
	// go to top
	gotop: function(config) {
		// to do
	},
	// detect surpport webp or not
	isWebpWork: function() {
		// to do
	},

	// CSS
	getStyle: function() {
		// to do
	},
	transition: function() {
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

