"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var More_Shoutbox_Tags = function () {
	function More_Shoutbox_Tags() {
		_classCallCheck(this, More_Shoutbox_Tags);
	}

	_createClass(More_Shoutbox_Tags, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "pd_more_shoutbox_tags";

			this.settings = {};
			this.images = {};

			this.$dialog = null;

			this.$shoutbox = null;
			this.$message = null;

			this.setup();

			$(this.ready.bind(this));
		}
	}, {
		key: "ready",
		value: function ready() {
			var $sb = $(".shoutbox");

			if ($sb.length == 1) {
				this.$shoutbox = $sb;

				this.$message = this.$shoutbox.find("textarea[name='message']");

				if (this.$message.length == 1) {
					this.create_extra_tags();
				}
			}
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.settings) {
				this.settings = plugin.settings;
				this.images = plugin.images;
			}
		}
	}, {
		key: "create_extra_tags",
		value: function create_extra_tags() {
			var $tools = this.$shoutbox.find(".tools");
			var tags = ["video", "image"];

			for (var i = 0; i < tags.length; ++i) {
				var t = tags[i];

				if (this["insert_" + t]) {
					var title = "Insert " + t;
					var $li = $("<li></li>");
					var $span = $("<span class='extra-shoutbox-tag shoutbox_" + t + "'><img src='" + this.images[t] + "' title='" + title + "' alt='" + title + "' /></span>");

					$span.on("click", this["insert_" + t].bind(this));
					$li.append($span);

					$tools.append($li);
				}
			}
		}
	}, {
		key: "replace_selection",
		value: function replace_selection(replacement) {
			this.$message.replaceSelection(replacement);
		}
	}, {
		key: "insert_video",
		value: function insert_video() {
			var _this = this;

			this.create_prompt({

				html: "Videl URL: <input id='extra-sb-tags-video' type='text' />",
				text: "Insert Video",
				click: function click() {

					var vid = $("#extra-sb-tags-video").val();

					if (vid.length > 3) {
						_this.replace_selection("[video]" + vid + "[/video]");
					}

					_this.$dialog.dialog("close");
				}

			});
		}
	}, {
		key: "insert_image",
		value: function insert_image() {
			var _this2 = this;

			this.create_prompt({

				html: "Image URL: <input id='extra-sb-tags-image' type='text' />",
				text: "Insert Image",
				click: function click() {

					var img = $("#extra-sb-tags-image").val();

					if (img.length > 8) {
						if (!/^(https?:\/\/)/.test(img)) {
							img = "http://" + img;
						}

						_this2.replace_selection("[img]" + img + "[/img]");
					}

					_this2.$dialog.dialog("close");
				}

			});
		}
	}, {
		key: "create_prompt",
		value: function create_prompt(opts) {
			if (!this.$dialog) {
				this.$dialog = $("<div></div>").hide().appendTo(document.body).dialog({

					autoOpen: false,
					height: "auto",
					width: "auto"

				});
			}

			this.$dialog.dialog("option", "buttons", [{

				text: opts.text,
				click: opts.click

			}]);

			this.$dialog.dialog("option", "title", opts.text);
			this.$dialog.html(opts.html);
			this.$dialog.dialog("open");
		}
	}]);

	return More_Shoutbox_Tags;
}();


More_Shoutbox_Tags.init();