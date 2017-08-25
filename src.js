
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
		String.prototype.replaceAll = function(replaceFrom, replaceTo) {
			return this.replace(new RegExp(replaceFrom, 'gm'), replaceTo);
		}
		String.prototype.trim = function() {
			return this.replace(/(^\s*)|(\s*)$/g, '');
		}
		// has Chinese character
		String.prototype.hasChinese = function() {
			return /.*[\u4e00-\u9fa5]+.*$/.test(this);
		}
		String.prototype.isURL = function() {
		  return /^(https?):\/\/((?:[a-z0-9.-]|%[0-9A-F]{2}){3,})(?::(\d+))?((?:\/(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i.test(this);
		}
	},

	// array
	array() {
		// isArray
		if (!Array.isArray) {
			Array.isArray = function(arg) {
				return Object.prototype.toString.call(arg) === '[object Array]';
			}
		}
		// min
		Array.prototype.min = function() {
			return Math.min.apply(null, this);
		}
		// max
		Array.prototype.max = function() {
			return Math.max.apply(null, this);
		}
		// unique
		Array.prototype.unique = function() {
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
	getUrlParam(key, inUrl) {
		let url = inUrl;
		if (!url) {
			url = location.search;
		}
		return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)', 'ig').exec(url) || [, ''])[1].replace(/\+/g, '%20')) || null;
	},

	// detect surpport webp or not
	isWebpWork: false,

	// detect browser support touch event
	isTouchable: ('ontouchstart' in document.documentElement),

	// CSS
	getStyle(obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, null)[attr];
	},

	prefix() {
		let styles = window.getComputedStyle(document.documentElement, '');
		let pre = Array.prototype.slice.call(styles).join('');
		pre = pre.match(/-(webkit|moz|ms)-/) || (styles.OLink === '' && ['', 'o']);
		return { pre: pre[1], css: '-' + pre[1] + '-' };
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

