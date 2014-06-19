/*!

Name: Vimy
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: June 19, 2014
Last Updated: June 19, 2014
Licensed under the MIT license

*/

;(function($) {

    $.fn.vimy = function(options) {
    
    	//return if no element was bound
		//so chained events can continue
		if(!this.length) { 
			return this; 
		}

		//define default parameters
        var defaults = {
            username: null,
            gallery: false,
            imgFormat: 'bg',
            limit: 9,
            title: true,
            duration: true,
            date: true,
            description: true,
            tags: true,
            error: function(message) {},
            success: function() {}
        }
        
        //define plugin
        var plugin = this;

        //define settings
        plugin.settings = {}
 
        //merge defaults and options
        plugin.settings = $.extend({}, defaults, options);
        
        var s = plugin.settings;

        //define element
        var el = $(this);
        
        function constructVideo(o) {
        
        	var video = '<li>';

    		if(s.title) {
    		
    			video += '<h2 class="vimy-title">'+o.title;
    			
    			if(s.duration) {
    			
    				var min = Math.floor(o.duration / 60);
    				
    				var sec = Math.round(o.duration % 60);
    				
    				sec = sec.toString();
    				
    				if(sec.length < 2) {
        				
        				sec = '0' + sec;
    				}
    				
    				var duration = min+':'+sec;
        			
        			video += ' <span>('+duration+')</span>';
    			}
    			
    			video += '</h2>';
    		
    		}

    		if(s.date && o.date !== '') {
    		
    			var date = new Date(o.date.replace(/-/g, "/"));
    			
    			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    			
    			var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    			
    			var dayNum = date.getDay();
    			
    			var monthNum = date.getMonth();
    			
    			date = days[dayNum] + ' ' + months[monthNum] + ' ' + date.getDate() + ', ' + date.getFullYear();
        		
        		video += '<div class="vimy-date">'+date+'</div>';
    		}
    		
    		video += '<iframe src="//player.vimeo.com/video/'+o.id+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    		
    		if(s.description && o.description !== '') {
        		
        		video += '<p>'+o.description.replace(/(<([^>]+)>)/ig, "")+'</p>';
    		}
    		
    		if(s.tags && o.tags !== '') {
    		
    			video += '<ul class="vimy-tags">';
        		
        		var tags = o.tags.split(', ');
        		
        		for(var y = 0; y < tags.length; y++) {

        			var tag = '<li><a href="http://vimeo.com/search?q='+tags[y]+'" target="_blank">'+tags[y]+'</a></li>';
        			
        			video += tag;
	        		
        		}

        		video += '</ul>';
        		
    		}

    		video += '</li>';

    		return video;
	        
        }
        
        function constructVideoImage(o) {
        
        	var video;
			
			video = '<li data-id="'+o.id+'" data-title="'+o.title+'" data-duration="'+o.duration+'" data-date="'+o.date+'"';
			
			if(o.description !== '') {
			
				video += ' data-description="'+o.description.replace(/(<([^>]+)>)/ig, "")+'"';
				
			}
			
			if(o.tags !== '') {
			
				video += ' data-tags="'+o.tags+'"';
				
			}
			
			if(s.imgFormat === 'element') {
			
				video += '><img src="'+o.img+'" alt="'+o.title+'" /></li>';
				
			} else {
				
				video += ' style="background: url('+o.img+') center center; background-size: cover;"></li>';
			}
			
			return video;
	        
        }
        
        //for each element
        el.each(function() {
  
	        var thisEl = $(this);
	        
	        if(s.username !== '') {
        
	        	$.ajax({
		        	method: 'GET',
		        	url: 'http://vimeo.com/api/v2/'+s.username+'/videos.json',
		        	success: function(r) {
		        	
		        		var total = (r.length < s.limit) ? r.length : s.limit;
		        		
		        		for(var i = 0; i < total; i++) {
		        		
		        			if(r[i].embed_privacy === 'anywhere') {
		        			
		        				if(s.gallery === true) {
		        				
		        					if(i === 0) {
			        					
			        					firstVideo = constructVideo({
				        					id: r[i].id,
					        				title: r[i].title,
					        				duration: r[i].duration,
					        				date: r[i].upload_date,
					        				description: r[i].description,
					        				tags: r[i].tags 
				        				});
				        				
				        				thisEl.append(firstVideo);
			        				
		        					}
		        					
		        					video = constructVideoImage({
						        		id: r[i].id,
				        				title: r[i].title,
				        				duration: r[i].duration,
				        				date: r[i].upload_date,
				        				description: r[i].description,
				        				tags: r[i].tags,
				        				img: r[i].thumbnail_large,
				        				index: s.limit
					        		});
			        				
			        				
		        				} else {
		        				
		        					video = constructVideo({
			        					id: r[i].id,
				        				title: r[i].title,
				        				duration: r[i].duration,
				        				date: r[i].upload_date,
				        				description: r[i].description,
				        				tags: r[i].tags 
			        				});
			        				
		        				}
				        		
				        		thisEl.append(video);
			
				        	} else {
					        	
					        	//increment limit because video was skipped due to it's privacy settings
					        	
					        	s.limit++;
				        	}
			        		
		        		}//for
		        		
		        		el.children().eq(1).addClass('active');
		        		
		        		//run success callback function
			        	plugin.settings.success.call(this);
			        	
		        	},
		        	error: function() {
			        	
		        	}
	        	});
	        	
	        } else {
		        
		        console.log('A valid Vimeo username is required.');
		        
			    plugin.settings.error.call(this);
	        }
        
        });
        
        if(s.gallery === true) {
        
        	el.addClass('gallery');
        	
        	el.on('click', '.vimy-tags a', function(e) {
		        e.stopPropagation();
		    });

	        el.on('click', 'li', function(e) {
	        
	        	e.preventDefault();
	        	
	        	$(this).addClass('active').siblings().removeClass('active');
	        
	        	video = constructVideo({
					id: $(this).attr('data-id'),
    				title: $(this).attr('data-title'),
    				duration: $(this).attr('data-duration'),
    				date: $(this).attr('data-date'),
    				description: ($(this).attr('data-description')) ? $(this).attr('data-description') : '',
    				tags: ($(this).attr('data-tags')) ? $(this).attr('data-tags') : '', 
				});
				
				el.children('li').eq(0).remove();
				
				el.prepend(video);
		        
	        });
	        
        }

    }

})(jQuery);