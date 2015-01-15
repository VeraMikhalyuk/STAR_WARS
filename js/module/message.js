(function(global) {
	global = global || window;
	var module = {
		node: {},
		set: function(message) {
			var self = this;
			self.node.info.innerHTML = message || "";
			self.show(message);
		},
		show: function(url) {
			utils.removeClass(this.node.table, "hidden");
		},
		hide: function() {
			utils.addClass(this.node.table, "hidden");
		},
		setNode: function() {
			var self = this;
			self.node.table = document.getElementById("message");
			self.node.container = document.getElementById("message_container");
			self.node.close = document.getElementById("message_close");
			self.node.info = document.getElementById("message_info");
		},
		setEvent: function() {
			var self = this;
			utils.addEvent(self.node.table, "click", function() {
				self.hide();
			});
			utils.addEvent(self.node.close, "click", function() {
				self.hide();
			});
			utils.addEvent(self.node.container, "click", function(event) {
				utils.stopevent(event);
			});
		},
		init: function() {
			var self = this;
			self.setNode();
			self.setEvent();
		}
	};

	global.message = {
		show: function(data) {
			module.set(data);
		}
	};

	utils.event.listen("message_show", function(message) {
		module.set(message);
	});

	utils.event.listen("message_hide", function(message) {
		module.hide();
	});

	utils.addEvent(document, "DOMContentLoaded", function() {
		module.init();
	}, false);
})(utils)