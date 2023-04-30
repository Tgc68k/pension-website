/**
 * room.js
 */

(function($){

	var slideInit = function(){
		var
			timer = 5000,
			duration = 1000,
			$wrap = $('#slideArea'),
			$slide = $wrap.find('#slider'),
			$nav = $('<ul class="pager" />'),
			timerID,
			slider = function(num){
				var
					index,
					next_num;
				clearTimeout(timerID);
				if( isNaN(num) ){
					index = $nav.find('li').index($nav.find('li.on'));
					next_num = ( $nav.find('li.on').is('.last') )? 0 : index+1;
				} else {
					next_num = num;
				}
				$slide.find('li')
					.fadeOut(duration)
					.removeClass('on')
					.eq(next_num).addClass('on').fadeIn(duration);
				$nav.find('li')
					.removeClass('on')
					.eq(next_num).addClass('on');
				timerID = setTimeout(slider, timer);
			};
		$slide.find('li').each(function(i){
			$nav.append('<li><a href="javascript:void(0);">'+i+'</a></li>');
		});
		$slide.find('li:first').addClass('on').fadeIn(duration);
		$nav.find('li:first').addClass('on');
		$nav.find('li:last').addClass('last');
		$wrap.append($nav);
		$nav.find('li').on('click', function(){
			if( !$(this).is('.on') ){
				var index = $nav.find('li').index(this);
				slider(index);
				return false;
			}
		});
		timerID = setTimeout(slider, timer);
	}

/* dom ready
--------------------------------------------------*/
	$(function(){
		slideInit();
	});

})(jQuery);