$( document ).ready(function() {

	// Récupération d'une vidéo en local
    var playerInstance = jwplayer("video").setup({
    	flashplayer: '../app/bower_components/jwplayer-mirror/jwplayer.flash.swf',
        file: "../images/FunnyCatJumpFail.mp4",
        image: "../images/FunnyCatJumpFail.mp4",
        width: "100%",
        aspectratio: "16:9",
        skin: "../images/six/six.xml",
    });

    // Controler la vidéo avec la barre d'espace
    $(document).keydown(function(evt) {
	    if (evt.keyCode == 32 && playerInstance.getState() == "PLAYING") {
			playerInstance.pause();
	    }else if(evt.keyCode == 32 && playerInstance.getState() == "PAUSED" || playerInstance.getState() == "IDLE"){
	    	playerInstance.play();
	    }
  	});

    // Callbacks de la vidéo
    playerInstance.onReady(function(){

        console.log(playerInstance.getBuffer());

    	console.log('ready');

    	var video = document.querySelector('video');
    	var canvas = document.querySelector('canvas');
    	var context = canvas.getContext('2d');
    	var w = 480;
    	var h = 270;
    	var ratio;
        var duration;

    	// calcul du ratio
		ratio = w / h;
		// Taille canvas en respectant le ratio
		w = w - 300;
		h = parseInt(w / ratio, 10);
		canvas.width = w;
		canvas.height = h;

    	playerInstance.onPlay(function(){
    		console.log('playing');
            duration = playerInstance.getDuration();

            // Mise à jour de la position de la vidéo sur la custom progress bar
            playerInstance.durationProcessor = setInterval(function(){

                if (playerInstance.getState() == "PLAYING" && playerInstance.getDuration != -1) {

                    clearTimeout(playerInstance.durationProcessor);
                    currentTime = (playerInstance.getPosition() / playerInstance.getDuration())*100;
                    $('.progressBar > div').width(currentTime+"%");
                    
                }

            }, 150);

    	});

    	playerInstance.onPause(function(){
    		console.log('paused');
    	});

    	// Capture d'écran
    	function snapShot(){

	    	context.fillRect(0,0,w,h);
	    	context.drawImage(video, 0, 0, w, h);

    	}

    	// Evenement pour lancer la capture
    	$( ".capture" ).click(function() {
			snapShot();
		});

    });

	// Récupération d'une vidéo youtube
	$.ajax({
		url:'http://gdata.youtube.com/feeds/api/videos/-/%7Bhttp%3A%2F%2Fgdata.youtube.com%2Fschemas%2F2007%2Fcategories.cat%7DMusic?alt=json&q=pinkfloyd&orderby=viewCount',
		dataType:'jsonp',
		success:function(data){

			// récupration du lien et de l'image
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