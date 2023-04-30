/**
 * util.js
 * author: kojilow (http://www.kojilow.com)
 */


var kjlw =　kjlw || {};

kjlw = {

/* rootPath
--------------------------------------------------*/
	rootPath: function(){
		return $('script#libJS')[0].src.split('common/js')[0];
	},

/* UA
--------------------------------------------------*/
	UA: function(){
		var ua = window.navigator.userAgent.toLowerCase();
		var ver = window.navigator.appVersion.toLowerCase();
		if( ua.indexOf('msie') != -1 && ver.indexOf('msie 6.') != -1 ) return 'IE6';
		else if( ua.indexOf('msie') != -1 && ver.indexOf('msie 7.') != -1 ) return 'IE7';
		else if( ua.indexOf('msie') != -1 && ver.indexOf('msie 8.') != -1 ) return 'IE8';
		else return 'MDN';
	},

/* devicePixelRatio
--------------------------------------------------*/
	devicePixelRatio: function(){
		return ( window.devicePixelRatio == 2 ) ? true : false;
	},

/* drawSVG
--------------------------------------------------*/
	drawSVG: function(){
		return ( document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect ) ? true : false;
	},

/* touchDevice
--------------------------------------------------*/
	touchDevice: function(){
		var checkTouch = ('ontouchstart' in window);
		return ( checkTouch ) ? true : false;
	},

/* SY
--------------------------------------------------*/
	SY: function(){
		return document.documentElement.scrollTop || document.body.scrollTop;
	},

/* WW
--------------------------------------------------*/
	WW: function(){
		return document.documentElement.clientWidth;
	},

/* WH
--------------------------------------------------*/
	WH: function(){
		return document.documentElement.clientHeight;
	}

}


kjlw.util = $.extend({

/* htmlAddClass
--------------------------------------------------*/
	htmlAddClass: function(){
		var $html = $('html');
		$html.addClass(kjlw.UA());
		if( kjlw.devicePixelRatio() ) $html.addClass('retina');
		if( kjlw.drawSVG() ) $html.addClass('drawSVG');
		if( kjlw.touchDevice() ) $html.addClass('touchDevice');
	},

/* windowResize
--------------------------------------------------*/
	windowResize: function(callback, id){
		var
			timer,
			eventID = ( id )? id : '';
		$(window).on('resize'+eventID, function(){
			clearTimeout(timer);
			timer = setTimeout(function(){
				callback();
			}, 100);
		});
	},

/* smoothScroller
--------------------------------------------------*/
	smoothScroller: function(anc, options){
		var wheel = function(){ clearInterval(scrollInt); };
		if( window.addEventListener ) window.addEventListener('DOMMouseScroll', wheel, false);
		window.onmousewheel = document.onmousewheel = wheel;
		var
			actX,
			actY,
			tarX = 0,
			tarY = 0,
			scrollInt,
			offsetX = $(anc).offset().left,
			offsetY = $(anc).offset().top+options.offset;
		var setScroll = function(tarX, tarY){
			actY += (tarY-actY)/6;
			actX += (tarX-actX)/6;
			if( Math.abs(tarX-actX) < 2 && Math.abs(tarY-actY) < 2 ) {
				clearInterval(scrollInt);
				setTimeout(function(){ window.scrollTo(offsetX, offsetY); }, options.speed);
			}
			scrollTo(Math.round(actX), Math.round(actY));
		};
		tarX = ( $(document).width() > offsetX + kjlw.WW() )? offsetX : $(document).width() - kjlw.WW();
		tarY = ( $(document).height() > offsetY + kjlw.WH() )? offsetY : $(document).height() - kjlw.WH();
		actX = $(document).scrollLeft();
		actY = $(document).scrollTop();
		clearInterval(scrollInt);
		scrollInt = setInterval(function(){ setScroll(tarX,tarY); }, options.speed);
	}

});


kjlw.util = $.fn.extend({

/* rollover
--------------------------------------------------*/
	rollover: function(){
		var preImgArr = new Array();
		this.each(function(){
			var src = $(this).attr('src');
			var isov = src.substring(0,src.lastIndexOf('.'));
			if( isov.substring(isov.length-3, isov.length) != '_ov'
				 && isov.substring(isov.length-3, isov.length) != '_on'
				 && isov.substring(isov.length-4, isov.length) != '_off'
			) {
				var ftype = src.substring(src.lastIndexOf('.'), src.length);
				var hsrc = src.replace(ftype, '_ov'+ftype);
				var dsrc = src;
				$(this).attr('hsrc', hsrc);
				$(this).attr('dsrc', dsrc);
				preImgArr.push(new Image());
				preImgArr[preImgArr.length-1].src = hsrc;
				$(this).on({
					'mouseover' : function(){
						$(this).attr('src', $(this).attr('hsrc'));
					},
					'mouseout' : function(){
						$(this).attr('src', $(this).attr('dsrc'));
					}
				});
			}
		});
	},

/* fadeover
--------------------------------------------------*/
	fadeover: function(options){
		var options = $.extend({
			opacity: 0.7,
			time: 500
		}, options);
		$(this).on({
			'mouseover': function(){
				$(this).stop().animate({'opacity':options.opacity}, options.time);
			},
			'mouseout': function(){
				$(this).stop().animate({'opacity':1}, options.time);
			}
		});
	},

/* smoothScroll
--------------------------------------------------*/
	smoothScroll: function(options){
		var options = $.extend({
			offset: 0,
			speed: 20
		}, options);
		$(this).on('click', function(){
			var anc = $(this).attr('href');
			if( $(anc).length ) {
				$.smoothScroller(anc, options);
				return false;
			}
		});
	},

/* commonPop
--------------------------------------------------*/
	commonPop: function(){
		var url = $(this).attr('href');
		var rel = {width:'700', height:'600', name:''};
		if( $(this).attr('rel') ) {
			rel['width'] = $(this).attr('rel').split(',')[0];
			rel['height'] = $(this).attr('rel').split(',')[1];
		}
		var features = 'menubar=no,scrollbars=yes,resizable=yes,width='+rel['width']+',height='+rel['height'];
		$(this).on('click', function(){
			window.open(url, rel['name'], features)
			return false;
		});
	}

});
