#Vimy

A simple, lightweight jQuery plugin used to display videos from a Vimeo account.

The plugin allows you to display videos independently or as a gallery. 

The gallery mode displays one featured video with image thumbnails of the other videos. Clicking on the image thumbnail will replace the featured video.

Videos are displayed as simple list items allowing you to style them as you wish.

<a href="http://michael-lynch.github.io/vimy/" target="_blank">See a demo</a>

<a href="http://michael-lynch.github.io/vimy/gallery.html" target="_blank">See a demo of the gallery</a>

##Instructions

Include jQuery and the plugin in the head or footer of your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    
<script src="/js/plugins/vimy.js"></script>
```
    
Create an unordered list where the videos will display.

```html
<ul class="vimy-videos"></ul>
```

    
Initialize the plugin targeting the class, ID or element you've created. 

```js
$('.vimy-videos').vimy();
```
	
####Options


username: string
<br /><em>A string that defines the username of the user you wish to retrieve videos from (default: null).</em>

gallery: boolean
<br /><em>A boolean that indicates whether you want the videos to display as a gallery (default: false).</em>

imgFormat: "bg / element"
<br /><em>A string that defines how the gallery images should display (default: 'bg'). 'bg' sets the image as a background image on the list item, while 'element' populates the list item with an img element.</em>

limit: integer
<br /><em>An integer that defines how many videos you want displayed (default: 9).</em>

title: boolean
<br /><em>A boolean that indicates whether you want the title of the videos to display (default: true).</em>

duration: boolean
<br /><em>A boolean that indicates whether you want the duration of the videos to display (default: true).</em>

date: boolean
<br /><em>A boolean that indicates whether you want the published date of the videos to display (default: true).</em>

description: boolean
<br /><em>A boolean that indicates whether you want the video description to display (default: true).</em>

tags: boolean
<br /><em>A boolean that indicates whether you want the video tags to display (default: true).</em>

success: function()
<br /><em>A callback function that is triggered after the request, if the request is sucessful.</em>

error: function()
<br /><em>A callback function that is triggered after the request, if the request is fails.</em>


#####Example:

```js
$(function() {
	
	$('.vimy-videos').vimy({
		username: 'brad',
		gallery: true,
		imgFormat: 'element',
		limit: 5,
		success: function() {
			console.log('Videos were retrieved successfully.');
		},
		error: function() {
			console.log('There was an error.');
			$('.vimy-videos').remove();
		}
	});
		
});
```			
		