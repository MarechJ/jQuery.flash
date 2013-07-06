jQuery.fn.flash = function(settings) {
    settings = jQuery.extend({
	duration: 1000,
	image: "./images/tiny_flash.jpg",
	event: "mouseover",
	callback: function() {}
    }, settings);
    return this.each(function(){
	if (settings.duration < 0)
	    return;
	var t_offset = $(this).offset();	
	var t_height = $(this).outerHeight();
	var t_width = $(this).outerWidth();
	$(this).html('<img class="flash" src="'+ settings.image +'">' + $(this).html())
	    .children(".flash").css({
		display : "block", 
		position : "fixed", 
		top : t_offset.top - $(window).scrollTop(), 
		left : t_offset.left - $(window).scrollLeft(),
		height : t_height, 
		width : t_width, 
		
		opacity : 0
	    });
	$(this).on(settings.event, function(){
	    var t_offset = $(this).offset();
	    $(this).children("img.flash")
		.stop()
		.css({
		    display : "block",
		    top : t_offset.top - $(window).scrollTop(),
		    left : t_offset.left - $(window).scrollLeft(),
		    opacity : 1
		})
		.animate({"opacity" : 0}, settings.duration, function(){
		    $(this).css({
			opacity : 0
		    });
		    settings.callback(this);
		});
	});	    
	return $(this);
    });
}