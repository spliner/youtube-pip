var flashPlayerId = 'movie_player';

chrome.extension.onMessage.addListener(onExtensionMessage);

function onExtensionMessage(request, sender, sendResponse) {
    var playParameters = [];

    if (window.location.hostname.indexOf('twitch.tv') > -1) {
        var twitchParameters = getTwitchParameters_();
         playParameters = playParameters.concat(twitchParameters);
    } else {
        var youtubeParameters = getYoutubeParameters_();
        playParameters = playParameters.concat(youtubeParameters);
    }
    
    sendResponse({ parameters: playParameters.join('&') });
}

function getTwitchParameters_() {
    var playParameters = ['type=twitch'];
    playParameters.push('video=' + window.location.pathname.replace('/', ''));
    document.getElementsByClassName('player-button--playpause')[0].click();
    return playParameters;
}

function getYoutubeParameters_() {
    var playParameters = ['type=youtube'];
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

    return playParameters;
}

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
