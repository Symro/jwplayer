$( document ).ready(function() {

	// Récupération d'une vidéo en local et affichage
    jwplayer("video").setup({
        file: "../images/FunnyCatJumpFail.mp4",
        image: "../images/FunnyCatJumpFail.mp4",
    });

	// Récupération d'une vidéo youtube
	$.ajax({
		url:'http://gdata.youtube.com/feeds/api/videos/-/%7Bhttp%3A%2F%2Fgdata.youtube.com%2Fschemas%2F2007%2Fcategories.cat%7DMusic?alt=json&q=pinkfloyd&orderby=viewCount',
		dataType:'jsonp',
		success:function(data){

			videoUrl = data.feed.entry[0].link[0].href;
			videoImage = data.feed.entry[0].media$group.media$thumbnail[0].url;

			// Affichage de la vidéo
			jwplayer("video2").setup({
		        file: videoUrl,
		        image: videoImage,
		    });
		}
	});	

});