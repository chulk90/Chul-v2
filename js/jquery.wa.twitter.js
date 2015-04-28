(function($){  
	
	// Plugin defaults – added as a property on our plugin function.
	var defaults = {
		url:'twitter/ajax/getFromTwitter.php',
		max_tweet: 5,
		img: '',
		isformatBuilder: false,
		formatBuilder: function(src_url,twitter_name,twitter_screen_name,time,text) {},
		onTwiterDone: function(txt) {}
	}
	$.fn.wTwitter =  function(options) {
		if (this.length>0) {
			var settings = $.extend( {}, defaults, options );
			$.fn.wTwitter.get_twitter(settings,this);
		}
	};
	
	$.fn.wTwitter.get_twitter = function(settings,this_it) {
		$.getJSON(settings.url,{})
		.done(function( json ) {
			$i = 0;
			temp = '<ul class="ul_twitter">';
			$.each(json,function(){
				text = this.text;
				if (settings.img==='')
					src_url = this.user.profile_image_url;
				else
					src_url = settings.img;
				twitter_name = this.user.name;
				twitter_screen_name = this.user.screen_name;
				time = this.created_at;
				time = $.fn.wTwitter.twitter_date(time);
				text = $.fn.wTwitter.twitter_text(text);
				if (settings.isformatBuilder) {
					temp = temp + settings.formatBuilder(src_url,twitter_name,twitter_screen_name,time,text);
				} else {
				temp = temp + '<li><div class="twitter_header">' 
												+ '<a href="http://twitter.com/'+ twitter_screen_name +'" title="">' + 
												'<img alt ="" src="'+ src_url +'">' + 
												'<span class="twitter_name">' + twitter_name + "</span>" +
												'<span class="twitter_screen_name">@' + twitter_screen_name + "</span>" + "</a>" +
											'</div>'+
											'<div class="twitter_content">'
												  + text + 
												'<div class="twitter_time">' 
												  + time +
												'</div>' +
											'</div>' +
											'</li>';
				}
				$i++;
				if ($i>=settings.max_tweet) return false;
			});
			temp = temp + '</ul>';
			this_it.html(temp);
			settings.onTwitterDone.call( this,temp );
			return false
		})
	}
	
	// set twitter text
	$.fn.wTwitter.twitter_text = function(text) {
	//function twitter_text(text) {
		text = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function (m) {
			return '<a href="' + m + '" target="_blank">' + m + '</a>';
		});
		// Usernames
		text = text.replace(/@[A-Za-z0-9_]+/g, function (u) {
			return '<a href="http://twitter.com/#!/' + u.replace(/^@/, '') + '" target="_blank">' + u + '</a>';
		});
		// Hashtags
		text = text.replace(/#[A-Za-z0-9_\-]+/g, function (u) {
			return '<a class="hashtags" href="http://twitter.com/#!/search?q=' + u.replace(/^#/, '%23') + '" target="_blank">' + u + '</a>';
		});
		
		return text;
	}
	
	$.fn.wTwitter.K = function() {
	//var K = function () {
		var a = navigator.userAgent;
		return {
			ie: a.match(/MSIE\s([^;]*)/)
		}
	};
	 
	 $.fn.wTwitter.twitter_date = function(a) {
	//var twitter_date = function (a) {
		var b = new Date();
		var c = new Date(a);
		if ($.fn.wTwitter.K.ie) {
			c = Date.parse(a.replace(/( \+)/, ' UTC$1'))
		}
		var d = b - c;
		var e = 1000,
			minute = e * 60,
			hour = minute * 60,
			day = hour * 24,
			week = day * 7;
		if (isNaN(d) || d < 0) {
			return ""
		}
		if (d < e * 7) {
			return "right now"
		}
		if (d < minute) {
			return Math.floor(d / e) + " seconds ago"
		}
		if (d < minute * 2) {
			return "about 1 minute ago"
		}
		if (d < hour) {
			return Math.floor(d / minute) + " minutes ago"
		}
		if (d < hour * 2) {
			return "about 1 hour ago"
		}
		if (d < day) {
			return Math.floor(d / hour) + " hours ago"
		}
		if (d > day && d < day * 2) {
			return "yesterday"
		}
		if (d < day * 365) {
			return Math.floor(d / day) + " days ago"
		} else {
			return "over a year ago"
		}
	};

}( jQuery ));