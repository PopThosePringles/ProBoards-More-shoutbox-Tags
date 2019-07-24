class More_Shoutbox_Tags {

	static init(){
		this.PLUGIN_ID = "pd_more_shoutbox_tags";

		this.settings = {};
		this.images = {};

		this.$dialog = null;

		this.$shoutbox = null;
		this.$message = null;

		this.setup();

		$(this.ready.bind(this));
	}

	static ready(){
		let $sb = $(".shoutbox");

		if($sb.length == 1){
			this.$shoutbox = $sb;

			this.$message = this.$shoutbox.find("textarea[name='message']");

			if(this.$message.length == 1){
				this.create_extra_tags();
			}
		}
	}

	static setup(){
		let plugin = pb.plugin.get(this.PLUGIN_ID);

		if(plugin && plugin.settings){
			this.settings = plugin.settings;
			this.images = plugin.images;
		}
	}

	static create_extra_tags(){
		let $tools = this.$shoutbox.find(".tools");
		let tags = ["video", "image"];

		for(let i = 0; i < tags.length; ++ i){
			let t = tags[i];

			if(this["insert_" + t]){
				let title = "Insert " + t;
				let $li = $("<li></li>");
				let $span = $("<span class='extra-shoutbox-tag shoutbox_" + t + "'><img src='" + this.images[t] + "' title='" + title + "' alt='" + title + "' /></span>");

				$span.on("click", this["insert_" + t].bind(this));
				$li.append($span);

				$tools.append($li);
			}
		}
	}

	static replace_selection(replacement){
		this.$message.replaceSelection(replacement);
	}

	static insert_video(){
		this.create_prompt({

			html: "Videl URL: <input id='extra-sb-tags-video' type='text' />",
			text: "Insert Video",
			click: () => {

				let vid = $("#extra-sb-tags-video").val();

				if(vid.length > 3){
					this.replace_selection("[video]" + vid + "[/video]");
				}

				this.$dialog.dialog("close");
			}

		});
	}

	static insert_image(){
		this.create_prompt({

			html: "Image URL: <input id='extra-sb-tags-image' type='text' />",
			text: "Insert Image",
			click: () => {

				let img = $("#extra-sb-tags-image").val();

				if(img.length > 8){
					if(!/^(https?:\/\/)/.test(img)){
						img = "http://" + img;
					}

					this.replace_selection("[img]" + img + "[/img]");
				}

				this.$dialog.dialog("close");
			}

		});
	}

	static create_prompt(opts){
		if(!this.$dialog){
			this.$dialog = $("<div></div>").hide().appendTo(document.body).dialog({

				autoOpen: false,
				height: "auto",
				width: "auto"

			});
		}

		this.$dialog.dialog("option", "buttons", [

			{

				text: opts.text,
				click: opts.click

			}

		]);

		this.$dialog.dialog("option", "title", opts.text);
		this.$dialog.html(opts.html);
		this.$dialog.dialog("open");
	}

}