let isInternetExplorer = false;

function runCompatibility() {
    const ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    const msie = ua.indexOf('MSIE '); // IE 10 or older
    const trident = ua.indexOf('Trident/'); //IE 11
    
    if (msie > 0 || trident > 0) {
		isInternetExplorer = true;
	}
	if (typeof document.getElementsByClassName!='function') {
		document.getElementsByClassName = function() {
			var elms = document.getElementsByTagName('*');
			var ei = [];
			for (i=0;i<elms.length;i++) {
				if (elms[i].getAttribute('class')) {
					ecl = elms[i].getAttribute('class').split(' ');
					for (j=0;j<ecl.length;j++) {
						if (ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
							ei.push(elms[i]);
						}
					}
				} else if (elms[i].className) {
					ecl = elms[i].className.split(' ');
					for (j=0;j<ecl.length;j++) {
						if (ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
							ei.push(elms[i]);
						}
					}
				}
			}
			return ei;
		};
	}
	//Polyfill for Array.indexOf
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) {
					return i; 
				}
			}
			return -1;
		};
	}
	//Polyfill for Function.bind (from Mozilla!)
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
		  // closest thing possible to the ECMAScript 5
		  // internal IsCallable function
		  throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs   = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP    = function() {},
			fBound  = function() {
			  return fToBind.apply(this instanceof fNOP && oThis
					 ? this
					 : oThis,
					 aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	  };
	}
	//Polyfill for trim
	if(typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	//Polyfill for replaceAll
	if (!String.prototype.replaceAll) {
		String.prototype.replaceAll = function(str, newStr){

			// If a regex pattern
			if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
				return this.replace(str, newStr);
			}

			// If a string
			return this.replace(new RegExp(str, 'g'), newStr);

		};
	}
}
function addEvent(evnt, elem, func) { //IE compatibility...
   if (elem.addEventListener)  // W3C DOM
      elem.addEventListener(evnt,func,false);
   else if (elem.attachEvent) { // IE DOM
      elem.attachEvent("on"+evnt, func);
   }
   else { // No much to do
      elem["on"+evnt] = func;
   }
}
function removeElement(target) { //IE compatibility...
	if (target.remove) {
		target.remove();
	} else {
		target.parentNode.removeChild(target);
	}
}
runCompatibility();