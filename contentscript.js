var flashPlayerId = 'movie_player'

chrome.extension.onMessage.addListener(onExtensionMessage);

function onExtensionMessage(request, sender, sendResponse) {
	var response = '';
	if (request.greeting === 'PlayVideo') {
		var playParameters = new Array();
		var player = document.getElementById(flashPlayerId);
		if (player) { // Flash Video
			var time = Math.round(player.getCurrentTime());
			playParameters.push('time=' + time);
			player.stopVideo();
		} else {
			var videoTags = document.getElementsByTagName('video');
			if (videoTags.length > 0) { // HTML5 Video
				player = videoTags[0];
				var time = Math.round(player.currentTime);
				playParameters.push('time=' + time);
				player.pause();
			}
		}
		var videoId = getUrlVars()['v'];
		playParameters.push('video=' + videoId);
		if (window.location.search.indexOf('list=') > -1) {
			var playlistId = getUrlVars()['list'];
			playParameters.push('list=' + playlistId);
		}
		response = playParameters.join('&');
	} else {
		response = 'Error: invalid command';
	}
	sendResponse({ farewell: response });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
