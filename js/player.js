window.onload = playVideo;

//TODO: How to get video quality?
function playVideo() {
	var embedUrl = 'http://www.youtube.com/embed/';
	var videoId = getUrlVars()['video'];
	var time = getUrlVars()['time'];
	var playlistId = getUrlVars()['list'];
	var height = getUrlVars()['height'];
	var width = getUrlVars()['width'];
	var autoplay = getUrlVars()['autoplay'];

	embedUrl += videoId;
	embedUrl += '?autoplay=' + autoplay;
	embedUrl += '&autohide=1';
    
	if (playlistId) {
        embedUrl += '&list=' + playlistId;
	}
	if (time) {
        embedUrl += '&start=' + time;
    }
	
	var playerContainer = document.getElementById('player-container');
	var frame = document.createElement('iframe');
	frame.setAttribute('id', 'player-frame');
	frame.setAttribute('src', embedUrl);
	frame.setAttribute('frameborder', '0');
	frame.setAttribute('allowfullscreen', 'allowfullscreen');
	playerContainer.appendChild(frame);	
}

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}