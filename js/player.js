window.onload = playVideo;

function playVideo() {
	var options = getUrlVars();
	var type = options['type'];

	var embedUrl;

	if (type === 'twitch') {
		embedUrl = getTwitchUrl_(options);
	} else {
		 embedUrl = getYoutubeUrl_(options)
	}

	var playerContainer = document.getElementById('player-container');
	var frame = document.createElement('iframe');
	frame.setAttribute('id', 'player-frame');
	frame.setAttribute('src', embedUrl);
	frame.setAttribute('frameborder', '0');
	frame.setAttribute('allowfullscreen', 'allowfullscreen');
	playerContainer.appendChild(frame);	
}

function getTwitchUrl_(options) {
	return 'http://player.twitch.tv/' + '?channel=' + options['video'];
}

function getYoutubeUrl_(options) {
	var embedUrl = 'http://www.youtube.com/embed/';
	var videoId = options['video'];
	var time = options['time'];
	var playlistId = options['list'];
	var height = options['height'];
	var width = options['width'];
	var autoplay = options['autoplay'];

	embedUrl += videoId;
	embedUrl += '?autoplay=' + autoplay;
	embedUrl += '&autohide=1';
    
	if (playlistId) {
        embedUrl += '&list=' + playlistId;
	}
	if (time) {
        embedUrl += '&start=' + time;
    }

	return embedUrl;
}

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}