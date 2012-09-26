/*
 * modelBox
 * https://github.com/rcbpro/modelBox
 *
 * Copyright (c) 2012 rcbpro
 * Licensed under the MIT, FREE licenses.
 */

(function($) {

	var modelBox = {
		init: function(selector, config = null, cssClasses = null, exHandller = null){
			this.sl = selector;
			this.maskId = this.sl + 'Mask';
			this.boxId = this.sl + 'Box';
			this.config = $.extend({}, $.fn.modelBox.defaults);
			if ((exHandller == null) || (exHandller == "")){
				this.cssClasses = ((cssClasses != null) && (cssClasses != '')) ? cssClasses : this.config;
				this.classNotCssMap = ((cssClasses != null) && (cssClasses != '')) ? true : false;
				this.createOuterWrapperAndMapCss(this.cssClasses, this.classNotCssMap);
				this.createMaskWrapper(this.cssClasses, this.classNotCssMap);
				this.populateModelBoxToFront();
			}else{
				this.unPopulateModelBoxFromFront();
			}
		},
		createOuterWrapperAndMapCss: function(cssMap, classNotCssMap){
			if (classNotCssMap){
				$('#' + this.sl).wrap('<div id="' + this.boxId + '" />').addClass(cssMap);
				$('#' + this.boxId).addClass(cssMap);
			}else{
				$('#' + this.sl).wrap('<div id="' + this.boxId + '" />').css(cssMap[1]);				
				$('#' + this.boxId).css(cssMap[0])
			}
		},
		createMaskWrapper: function(cssMap, classNotCssMap){
			$('#' + this.boxId).append('<div id="' + this.maskId + '"></div>');
			(!classNotCssMap) ? $('#' + this.maskId).css(cssMap[2]) : $('#' + this.maskId).addClass(cssMap);
		},
		populateModelBoxToFront: function(){
			var maskHeight = $(document).height();
			var maskWidth = $(window).width();
			var winH = $(window).height();
			var winW = $(window).width();
			$('#' + this.boxId).fadeIn(500);
        	$('#' + this.maskId).css({'width': maskWidth, 'height': maskHeight}).fadeIn(1000).fadeTo("slow", 0.8);   
			$('#' + this.sl).css({'top':  winH / 2 - $('#' + this.sl).height() / 2, 'left' : winW / 2 - $('#' + this.sl).width() / 2}).fadeIn(2000);
		},
		unPopulateModelBoxFromFront: function(){
			$('#' + this.maskId).hide();
			$('#' + this.boxId).hide();
		}
	};
	$.fn.modelBox = function(selector, cssProperties, classes, exHandller){
		var obj = Object.create(modelBox);
		this.each(function(){
			obj.init(selector, cssProperties, classes, exHandller);			  
		});
		return [obj.maskId, obj.boxId];		
	};
	
	$.fn.modelBox.defaults = [
		{ 
			'position': 'absolute',
			'left': '0',
			'top':'0',
			'z-index':'9999',
			'background-color':'#000',
			'display':'none'
		},
		{ 
			'position': 'fixed',
			'left': '0',
			'top':'0',
			'z-index':'9998',
			'padding':'20px',
			'display':'none',
			'width': '260px',
			'border-radius': '2px',
			'background':'url(images/titlebg.jpg) repeat-x top #000'
		},
		{
			'position': 'absolute',
			'left' :'0',
			'top': '0',
			'z-index': '9000',
			'background-color': '#000',
			'display': 'none'			
		}				
	];
}(jQuery));