/*
 * modelBox
 * https://github.com/rcbpro/jQuery-model-box/
 *
 * Copyright (c) 2012 rcbpro
 * Licensed under the FREE licenses.
 */

(function($) {

	var modelBox = {
		init: function(selector, fadeInFadeOutMap = null, config = null, cssClasses = null, exHandller = null){
			this.sl = selector;
			this.maskId = this.sl + 'Mask';
			this.boxId = this.sl + 'Box';
			this.config = $.extend({}, $.fn.modelBox.defaults);
			this.fadeInFadeOut = $.extend({}, $.fn.modelBox.fadeInFadeOutDefault);
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
			$('<a id="' + this.sl + 'Link" class="close"></a>').appendTo('#' + this.sl).css(this.cssClasses[3]);
			$('#' + this.sl + 'Link').live("click", function(){
				var orgMaskName = $(this).attr('id').replace('Link', 'Mask');
				var orgBoxName = $(this).attr('id').replace('Link', 'Box');				
				$(this).remove();				
				$('#' + orgMaskName).hide();
				$('#' + orgBoxName).hide();
			});
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
			$('#' + this.boxId).fadeIn(this.fadeInFadeOut[0]);
        	$('#' + this.maskId).css({'width': maskWidth, 'height': maskHeight}).fadeIn(this.fadeInFadeOut[0]).fadeTo(this.fadeInFadeOut[1], 0.7);   
			$('#' + this.sl).css({'top':  winH / 2 - $('#' + this.sl).height() / 2, 'left' : winW / 2 - $('#' + this.sl).width() / 2}).fadeIn(this.fadeInFadeOut[0]);
		},
		unPopulateModelBoxFromFront: function(){
			$('#' + this.sl + 'Link').remove();
			$('#' + this.maskId).hide();
			$('#' + this.boxId).hide();
		}
	};
	$.fn.modelBox = function(selector, fadeInFadeOutMap, cssProperties, classes, exHandller){
		var obj = Object.create(modelBox);
		this.each(function(){
			obj.init(selector, fadeInFadeOutMap, cssProperties, classes, exHandller);			  
		});
		return [obj.maskId, obj.boxId];		
	};
	
	$.fn.modelBox.defaults = 
		[
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
			  'background':'url(images/titlebg.jpg) repeat-x top'
		  },
		  {
			  'position': 'absolute',
			  'left' :'0',
			  'top': '0',
			  'z-index': '9000',
			  'background-color': '#000',
			  'display': 'none'			
		  },
		  {
			  'background':'url(images/close.png) no-repeat right', 
			  'float': 'right', 
			  'height': '32px', 
			  'width': '32px',
			  'cursor': 'pointer'
		  }		  
	  ];
	$.fn.modelBox.fadeInFadeOutDefault = ['500', '500'];
}(jQuery));