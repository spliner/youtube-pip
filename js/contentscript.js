var flashPlayerId = 'movie_player';

chrome.extension.onMessage.addListener(onExtensionMessage);

function onExtensionMessage(request, sender, sendResponse) {
    var playParameters = [];
    var player;
    var time;

    var videoTags = document.getElementsByTagName('video');
    if (videoTags.length > 0) { // HTML5 Video
        player = videoTags[0];
        time = Math.round(player.currentTime);
        playParameters.push('time=' + time);
        player.pause();
    } else {
        player = document.getElementById(flashPlayerId);
        if (!!player) { // Flash video
            time = Math.round(player.getCurrentTime());
            playParameters.push('time=' + time);
            player.stopVideo();
        }
    }

    var videoId = getUrlVars()['v'];
    playParameters.push('video=' + videoId);

    if (window.location.search.indexOf('list=') > -1) {
        var playlistId = getUrlVars()['list'];
        playParameters.push('list=' + playlistId);
    }
    sendResponse({ parameters: playParameters.join('&') });
}

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
