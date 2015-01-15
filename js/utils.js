var utils = {
	create: function(tagName, attrs, parentNode) {
		var node = document.createElement(tagName);
		attrs = attrs || {};
		for (var name in attrs) {
			var value = attrs[name];
			if(name == "innerHTML") {
				node.innerHTML = value;
				continue;
			}
			if(name == "className") {
				utils.addClass(node, value);
				continue;
			}
			node.setAttribute(name, value);
		}
		if(parentNode) {
			parentNode.appendChild(node);
		}
		return (node);
	},
	removeClass: function(node, className) {
		var removedClass = node.className;
		var pattern = new RegExp("(^| )" + className + "( |$)");
		removedClass = removedClass.replace(pattern, "$1");
		removedClass = removedClass.replace(/ $/, "");
		node.className = removedClass;
		return (true);
	},
	addClass: function(node, className) {
		if(!utils.hasClass(node, className)) {
			if(node.className == "") {
				node.className = className;
			} else {
				node.className += " " + className;
			}
		}
		return (true);
	},
	toggleClass: function(node, className) {
		return (utils[utils.hasClass(node, className) ? "removeClass" : "addClass"](node, className));
	},
	hasClass: function(node, className) {
		var pattern = new RegExp("(^| )" + className + "( |$)");
		return (!!node.className.match(pattern));
	},
	addEvent: function(el, eventName, callback, useCapture) {
		if(el.addEventListener) {
			el.addEventListener(eventName, callback, useCapture);
		} else if(el.attachEvent) {
			el.attachEvent('on' + eventName, callback);
		}
	},
	stopevent: function(event) {
		if(event) {
			if(event.stopPropagation) event.stopPropagation(); else event.cancelBubble = true;
		}
	},
	"event": {
		"events": [],
		"getEvent": function(id) {
			for (var i = 0, l = this.events.length; i < l; i++) if(this.events[i].id == id) return i;
			return false;
		},
		"addEvent": function(id) {
			this.events.push({ "id": id, "handlers": [] });
		},
		"listen": function(eventName, callback) {
			if(!this.getEvent(eventName)) this.addEvent(eventName);
			var index = this.getEvent(eventName);
			if(index || index === 0) this.events[index].handlers.push(callback);
		},
		"trigger": function(eventName, data) {
			var index = this.getEvent(eventName);
			if(index || index === 0) for (var i = 0, m = this.events[index], l = m.handlers.length; i < l; i++) {
				var callback = (function(index, data) {
					return function() {
						try {
							m.handlers[index](data);
						} catch (e) {
						}
					}
				})(i, data)
				setTimeout(callback, 5);
			}
		}
	}
};

function resizeBoard() {
	var w = getwindowWidth() * 0.9;
	var h = getwindowHeight() * 0.9;
	var node = document.getElementById("board");
	if(w > h) {
		w = h;
	} else {
		h = w;
	}
	node.style.width = w + "px";
	node.style.height = h + "px";
	hideAddressBar();
}
function hideAddressBar() {
	document.body.style.minHeight = "1000px"; // to ensure enough height for scrollTo to work
	scrollTo(0, 1);
	setTimeout(function() {
		document.body.style.minHeight = getwindowHeight() + "px";
		document.body.style.height = getwindowHeight() + "px";
		scrollTo(0, 1);
	}, 1000);
}

function getwindowWidth() {
	if(window.innerWidth) {
		windowWidth = window.innerWidth;
	} else if(document.documentElement && document.documentElement.clientWidth) {
		windowWidth = document.documentElement.clientWidth;
	} else if(document.body.clientWidth) {
		windowWidth = document.body.clientWidth;
	}
	return windowWidth;
}
function getwindowHeight() {
	if(window.innerHeight) {
		windowHeight = window.innerHeight;
	} else if(document.documentElement && document.documentElement.clientHeight) {
		windowHeight = document.documentElement.clientHeight;
	} else if(document.body.clientHeight) {
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}