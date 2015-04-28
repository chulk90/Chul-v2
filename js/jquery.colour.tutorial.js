/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */
(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
			                                Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
			                                Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
			                                Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			                                ].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}

	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};

	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/

	var colors = {
			aqua:[0,255,255],
			azure:[240,255,255],
			beige:[245,245,220],
			black:[0,0,0],
			blue:[0,0,255],
			brown:[165,42,42],
			cyan:[0,255,255],
			darkblue:[0,0,139],
			darkcyan:[0,139,139],
			darkgrey:[169,169,169],
			darkgreen:[0,100,0],
			darkkhaki:[189,183,107],
			darkmagenta:[139,0,139],
			darkolivegreen:[85,107,47],
			darkorange:[255,140,0],
			darkorchid:[153,50,204],
			darkred:[139,0,0],
			darksalmon:[233,150,122],
			darkviolet:[148,0,211],
			fuchsia:[255,0,255],
			gold:[255,215,0],
			green:[0,128,0],
			indigo:[75,0,130],
			khaki:[240,230,140],
			lightblue:[173,216,230],
			lightcyan:[224,255,255],
			lightgreen:[144,238,144],
			lightgrey:[211,211,211],
			lightpink:[255,182,193],
			lightyellow:[255,255,224],
			lime:[0,255,0],
			magenta:[255,0,255],
			maroon:[128,0,0],
			navy:[0,0,128],
			olive:[128,128,0],
			orange:[255,165,0],
			pink:[255,192,203],
			purple:[128,0,128],
			violet:[128,0,128],
			red:[255,0,0],
			silver:[192,192,192],
			white:[255,255,255],
			yellow:[255,255,0]
	};

})(jQuery);

var vt = "#tags", vb = "#tags-button";
//change the data being displayed in the sidebar tab
function showTab(t){

	t = "#" + t;
	var b = t + "-button";
	jQuery(vb).css("font-style","normal");
	jQuery(b).css("font-style","italic");

	vb = b;

	jQuery(vt).fadeOut("fast", function(){ jQuery(t).fadeIn("fast"); });

	vt = t;

	return false;
}
//http://www.experts-exchange.com/Programming/Languages/Scripting/JavaScript/Q_21632591.html
function LightenColor(h, d) {

	var r, g, b, txt;
	
	h = (h.charAt(0) == "#") ? h.substring(1,7) : h;
	
	r = parseInt(h.substring(0,2),16);
	g = parseInt(h.substring(2,4),16);
	b = parseInt(h.substring(4,6),16);
	
	r = (r+d > 255) ? 255 : (r+d < 0) ? 0 : r+d;
	g = (g+d > 255) ? 255 : (g+d < 0) ? 0 : g+d;
	b = (b+d > 255) ? 255 : (b+d < 0) ? 0 : b+d;
	
	txt = b.toString(16);        if (txt.length< 2) txt = "0"+ txt;
	txt = g.toString(16) + txt;  if (txt.length< 4) txt = "0"+ txt;
	txt = r.toString(16) + txt;  if (txt.length< 6) txt = "0"+ txt;
	
	return "#"+ txt;
}
function DarkenColor(h, d) {
	return LightenColor(h, d* -1);
}

/* generate random colour http://www.therustybarrel.com/david/experiments/randhex.html */
function genHex(){
	colors = new Array(14);
	colors[0]="0";
	colors[1]="1";
	colors[2]="2";
	colors[3]="3";
	colors[4]="4";
	colors[5]="5";
	colors[5]="6";
	colors[6]="7";
	colors[7]="8";
	colors[8]="9";
	colors[9]="A";
	colors[10]="B";
	colors[11]="C";
	colors[12]="D";
	colors[13]="E";
	colors[14]="F";

	digit = new Array(5);
	color="";
	for (i=0;i<6;i++){
		digit[i]=colors[Math.round(Math.random()*14)];
		color = color+digit[i];
	}
	return "#"+color;
}
jQuery(document).ready(function(){

//FOR TUTORIAL: http://pagesofinterest.net/blog/2009/06/using-png-transparency-the-jquery-colour-change-plugin/
	jQuery(".colour-change").hover(function(){
		var parent = jQuery(this).parent().attr("id");
		if(parent.match(/^vanilla.*/)){
			jQuery("#"+parent).css("background-color", genHex());
			return false;
		}
		else if(parent.match(/^animation.*/)){
			jQuery("#"+parent).animate({backgroundColor: genHex()},500);
			return false;
		}
		else if(parent.match(/^bright-dark.*/)){	
			if(parent.match(/dark$/)){
				jQuery("#"+parent).css("background-color", LightenColor(genHex(), 100));
				return false;
			}
			else if(parent.match(/bright$/)){			
				jQuery("#"+parent).css("background-color", DarkenColor(genHex(), 100));
				return false;
			}
			else{			
				jQuery("#"+parent).css("background-color", DarkenColor(genHex(), 100));
				return false;
			}
		}
	});
	//FOR TUTORIAL: http://pagesofinterest.net/blog/2009/06/using-png-transparency-the-jquery-colour-change-plugin/
	
	
});