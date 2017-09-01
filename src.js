
;(function(factory) {
	let isRegistedInModule = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		isRegistedInModule = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		isRegistedInModule = true;
	}
	if (!isRegistedInModule) {
		let oldFN = window.FN;
		let api = window.FN = factory();
		api.noConflict = () => {
			window.FN = oldFN;
			return api;
		};
	}
})(function() {
	return {
		init() {
			this.string();

			this.number();

			this.array();

			this.prefix();

			// requestAnimationFrame
			window.requestAnimationFrame = () => {
				return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(e, t) {
					return setTimeout(e, 1e3 / 60);
				};
			};

			// detect surpport webp or not
			(() => {
				let webp = new Image();
				webp.onload = () => {
					this.isSupportWebp = !!(webp.width === 1 && webp.height === 1);
				}
				webp.onerror = () => {
					this.isSupportWebp = false;
				}
				webp.src = 'data:image/webp;base64,UklGRiYAAABXRUJQVlA4IBoAAAAwAQCdASoBAAEAAAAMJaQAA3AA/v89WAAAAA==';
			})();
		},

		// detect surpport webp or not
		isSupportWebp: false,
	
		// detect browser support touch event
		isSupportTouch: ('ontouchstart' in document.documentElement),

		// detect surpport localStorage or not
		isSupportStorage: typeof(localStorage) !== 'undefined',

		cssPre: '',
		jsPre: '',
	
		// string
		string() {
			!''.replaceAll && (String.prototype.replaceAll = function(replaceFrom, replaceTo) {
				return this.replace(new RegExp(replaceFrom, 'gm'), replaceTo);
			})
			!''.trim && (String.prototype.trim = function() {
				return this.replace(/(^\s*)|(\s*)$/g, '');
			})
			// has Chinese character
			!''.hasChinese && (String.prototype.hasChinese = function() {
				return /.*[\u4e00-\u9fa5]+.*$/.test(this);
			})
			!''.isURL && (String.prototype.isURL = function() {
				return /^(https?):\/\/((?:[a-z0-9.-]|%[0-9A-F]{2}){3,})(?::(\d+))?((?:\/(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i.test(this);
			})
			// thousands separate with commas
			!''.separate && (String.prototype.separate = function() {
				return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			})
			// convert camel case to underline HelloWorld => hello_world
			!''.camelCaseToLine && (String.prototype.camelCaseToLine = function() {
				return this.replace(/[A-Z]/g, (match, index) => {
					return (index === 0 ? '' : '_') + match.toLowerCase();
				});
			})
		},
	
		// number
		number() {
			// thousands separate with commas
			!Number.separate && (Number.prototype.separate = function() {
				return String.prototype.separate.call(this);
			})
		},
	
		// array
		array() {
			// isArray
			if (!Array.isArray) {
				Array.isArray = (arg) => Object.prototype.toString.call(arg) === '[object Array]';
			}
			// min
			![].min && (Array.prototype.min = function() {
				return Math.min.apply(null, this);
			})
			// max
			![].max && (Array.prototype.max = function() {
				return Math.max.apply(null, this);
			})
			// unique
			![].unique && (Array.prototype.unique = function() {
				let obj = {};
				let arr = [];
				for (let i = 0, len = this.length; i < len; i++) {
					if (!obj[this[i]]) {
						obj[this[i]] = 1;
						arr.push(this[i]);
					}
				}
				obj = null;
				return arr.slice(0);
			})
	
		},
		
		// store
		store: {
			get(key) {
				if (!isSupportStorage) {
					return this.getCookie(key);
				}
				return localStorage.getItem(key);
			},
			set(key, value, opts) {
				if (!isSupportStorage) {	
					return this.setCookie(key, value, opts);
				}
				localStorage.setItem(key, value);
			},
			remove(key) {
				if (!isSupportStorage) {
					return this.removeCookie(key);
				}
				localStorage.removeItem(key);
			},
			getCookie(key) {
				let keyValue;
				if (!key) {
					return null;
				}
				keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
				return keyValue ? decodeURIComponent(keyValue[2]) : null;
			},
			setCookie(key, value, opts) {
				let expires = '';
				let path = opts.path || '/';
				if (arguments.length < 2) {
					return;
				}
				if (opts.days) {
					let date = new Date();
					date.setTime(date.getTime() + (opts.days * 24 * 60 * 60 * 1000));
					expires = ';expires=' + date.toGMTString();
				}
				document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + ';path=' + path;
			},
			removeCookie(key) {
				this.setCookie(key, '', { days: -1 });
			},
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
	
			// url link
			url(str) {
				return /^(https?):\/\/((?:[a-z0-9.-]|%[0-9A-F]{2}){3,})(?::(\d+))?((?:\/(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i.test(str);
			},
	
	
		},
	
		// DOM
		// go to top
		gotop(config) {
			// to do
		},
	
		// BOM
		/**
		* @desc 获取url参数
		* @param {String} key [要获取的参数名]
		* @param [String] inUrl [url地址，如果为空则使用location.search]
		* @return {String}
		*/
		getUrlParam(key, inUrl) {
			let url = inUrl ? inUrl : location.search;
			return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)', 'ig').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || '';
		},
		/**
		* @desc 获取所有url参数
		* @param [String] inUrl [url地址，如果为空则使用location.search]
		* @return {Object} e.g. { a: 'aaa', b: 'bbb' }
		*/
		getUrlParams(inUrl) {
			let url = inUrl ? inUrl : location.search;
			let arr = [];
			let obj = {};
			url = url.substring(1);
			arr = url.split('&');
			for (let i = 0, len = arr.length; i < len; i++) {
				let tmp = arr[i].split('=');
				obj[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
			}
			arr = [];
			return obj;
		},
	
		/**
		* @desc 获取元素计算后的样式
		* @param {Element} obj [Dom元素]
		* @param {String} attr [样式名]
		* @return {String}
		*/
		getStyle(obj, attr) {
			return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr];
		},
	
		/**
		* @desc 获取浏览器css和js前缀
		* @return {Object}，e.g. { css: '-webkit-', pre: 'webkit' }
		*/
		prefix() {
			let styles = window.getComputedStyle(document.documentElement, '');
			let pre = Array.prototype.slice.call(styles).join('');
			pre = pre.match(/-(webkit|moz|ms)-/) || (styles.OLink === '' && ['', 'o']);
			this.cssPre = '-' + pre[1] + '-';
			this.jsPre = pre[1];
			// return { pre: pre[1], css: '-' + pre[1] + '-' };
		},
	
		/**
		* @desc 函数去抖 （只执行一次）
		* @param {Function} func [要节流执行的函数]
		* @param {Number} delay [延时，单位：ms]
		* function ajax(value) {
		*   console.log('ajax request ' + value)
		* }
		* let debounceAjax = debounce(ajax, 1000)
		* input.addEventListener('keyup', function(e) {
		*   debounceAjax(e.target.value)
		* })
		*/
		debounce(func, delay) {
			return (args) => {
				clearTimeout(func.timer);
				func.timer = setTimeout(() => {
					func.call(this, args);
				}, delay);
			};
		},
	
		/**
		* @desc 简单函数节流 （每达到间隔的时间执行一次） 用法同debounce
		* @param {Function} func [要节流执行的函数]
		* @param {Number} delay [延时，单位：ms]
		*/
		throttle(func, delay) {
			let last;
			let deferTimer;
			return function() {
				let now = +new Date();
				if (last && now < last + delay) {
					clearTimeout(deferTimer);
					deferTimer = setTimeout(() => {
						last = now;
						func.apply(this, arguments);
					}, delay);
				} else {
					last = now;
					func.apply(this, arguments);
				}
			}
		},
	
		/** 
		* @desc 桥接模式实现的 简单单例模式
		* @param {Function} func [创建实例对象的函数]
		* @return [Closure]
		*/
		singleton(func) {
			let instance;
			return function() {
				return instance || (instance = func.apply(this, arguments));
			}
		},
	
		/**
		* @desc 简单观察者模式, a.k.a. 发布订阅模式
		* @return {Object} observer [观察者对象]
		* let tv = createObserver();
		* tv.listen('play', (data) => {
		*   console.log('Playing [' + data.name + ']');
		* });
		* tv.trigger('play', { name: 'Game Of Thrones' });
		*/ 
		createObserver() {
			let observer = {
				handlers: {},
				listen(event, handler) {
					if (typeof this.handlers[event] === 'undefined' || !this.handlers[event]) {
						this.handlers[event] = [];
					}
					this.handlers[event].push(handler);
				},
				trigger(event, data = null) {
					if (typeof this.handlers[event] === 'undefined' || !this.handlers[event]) {
						this.warn('[Observer Module] No such event to be triggered: ' + event);
					} else {
						for (let i = 0; i < this.handlers[event].length; i++) {
							let foo = this.handlers[event][i];
							foo(data);
						}
					}
				},
				remove(event, handler) {
					let handlers = this.handlers[event];
					if (this.typeOf(handlers) == 'array') {
						handlers.forEach((item, index) => {
							if (item == handler) {
								handlers.splice(index, 1);
								return;
							}
						});
					} else {
						this.warn('[Observer Module] No such event to be removed: ' + event);
					}
				}
			}
			return observer;
		},
	
	}
});


