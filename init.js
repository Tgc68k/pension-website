/**
 * init.js
 */

(function($){

/* init
--------------------------------------------------*/
	kjlw.init = function(){
		$.htmlAddClass();
		$('img.ahover, .ahoverList img').rollover();
		$('.fhover').fadeover();
		$('a[href^=#]').smoothScroll();
		$('a.commonPop').commonPop();
	};

/* deviceType
--------------------------------------------------*/
	kjlw.breakpoint = 640;
	kjlw.deviceType = function(){
		return ( kjlw.WW() > kjlw.breakpoint )? 'PC' : 'SP';
	};

/* deviceChange
--------------------------------------------------*/
	kjlw.deviceChange = function(callback){
		var prevDeviceType = kjlw.deviceType();
		$.windowResize(function(){
			var type = kjlw.deviceType();
			if( type != prevDeviceType ) callback();
			prevDeviceType = type;
		});
	};

/* spNav
--------------------------------------------------*/
	kjlw.spNav = function(){
		$('#navMENU').on('click', function(){
			$('body').toggleClass('navOPEN');
			return false;
		});
		kjlw.deviceChange(function(){
			$('body').removeClass('navOPEN');
		});
	};

/* pagetop
--------------------------------------------------*/
	kjlw.pagetop = function(){
		var $pagetop = $('#pageTop');
		if( $pagetop.length > 0 ) {
			$(window).on('load resize scroll', function(){
				if( kjlw.WW() <= kjlw.breakpoint ) {
					$pagetop.removeAttr('style');
					return;
				}
				var
					end_pos = $('#wrapper').height()-kjlw.WH()-kjlw.SY(),
					end_offset = $('#copyright').outerHeight();
				if( kjlw.SY() > 100 ) $pagetop.fadeIn(200);
				else $pagetop.fadeOut(200);
				if(end_pos <= end_offset) $pagetop.css({'position':'absolute', 'margin-bottom':end_offset});
				else $pagetop.css({'position':'fixed', 'margin-bottom':0});
			});
		}
	};

/* tel
--------------------------------------------------*/
	kjlw.tel = function(){
		if( kjlw.touchDevice() ) {
			$('[data-tel]').on('click', function(){
				location.href = 'tel:'+$(this).data('tel');
				return false;
			});
		}
	};

/* dom ready
--------------------------------------------------*/
	$(function(){
		kjlw.init();
		kjlw.spNav();
		kjlw.pagetop();
		kjlw.tel();
	});

})(jQuery);