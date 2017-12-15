$(function() {
	
	$('.left-menu .title').on('click', function(e) {
		var me = this;
		var $ul = $(me).parent().next();
		
		if($ul.is(':visible')){
			$ul.slideUp();
		}else{
			$ul.slideDown();
		}
	});
	
	$(".menuson li").on('click', function(e){
		$(".menuson li.active").removeClass("active");
		
		$(this).addClass("active");
	});
			
	
	$('.left-menu').slimscroll({
		height: $(document.body).height() - 40
	});
	var timer;
	$(window).on('resize', function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			$('.left-menu').slimscroll({
				height: $(document.body).height() - 40
			});
		}, 500);
	});
	$('.left-top').on('click', function() {
		if ($('.left-top').hasClass('collapse')) {
			$('.left-menu').find('ul').each(function(index, item) {
				$(item).slideDown();
			});
		} else {
			$('.left-menu').find('ul').each(function(index, item) {
				$(item).slideUp();
			});
		}
		$('.left-top').toggleClass('collapse');
	});
});