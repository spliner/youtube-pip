chrome.tabs.onUpdated.addListener(onTabUpdated);
chrome.pageAction.onClicked.addListener(onPageActionClicked);
chrome.contextMenus.create({
	title: 'Open in PIP',
    contexts: ['video', 'link'],
    targetUrlPatterns: ['*://*.youtube.com/watch*', '*://*.youtube.com/embed*'],
    onclick: onContextMenuClick
});

var defaultPanelHeight = 360;
var defaultPanelWidth = 480;

function onTabUpdated(tabId, changeInfo, tab) {
	if (tab.url.indexOf('youtube.com') > -1 && tab.url.indexOf('watch?') > -1) {
		chrome.pageAction.show(tab.id);
		chrome.tabs.executeScript(tab.id, { file: '/js/contentscript.js' });
	} else {
		chrome.pageAction.hide(tab.id);
	}
}

function onPageActionClicked(tab) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, { greeting: 'PlayVideo' }, handleContentScriptResponse);
	});
}

function handleContentScriptResponse(response) {
	if (!!response) {
		createVideoPanel(response.parameters);
	} else {
		console.log('Error handling content script response: empty response');
	}
}

function onContextMenuClick(clickInfo) {
	var url = clickInfo.linkUrl;
	var playParameters = [];
	if (url.indexOf('youtube.com') > -1 && (url.indexOf('/watch') > -1 || url.indexOf('/embed') >-1)) {
		var videoId = '';
		var listId = '';
		if (url.indexOf('/embed/') > -1) {
			videoId = url.split('/embed/')[1];
			var parametersPosition = videoId.indexOf('?');
			if (parametersPosition > -1)
				videoId = videoId.substring(0, parametersPosition);
			listId = getUrlVars(url)['list'];
		} else {
			videoId = getUrlVars(url)['v'];
			listId = getUrlVars(url)['list'];
		}
		playParameters.push('video=' + videoId);
		if (listId)
			playParameters.push('list=' + listId);
		createVideoPanel(playParameters.join('&'));
	}
}

function createVideoPanel(parameters) {
	var videoParameters = [];
	videoParameters.push('height=240');
	videoParameters.push('width=320');
	videoParameters.push('autoplay=1');
	chrome.windows.create({ url: '/app/player.html?' + parameters + '&' + videoParameters.join('&'), type: 'panel', height: defaultPanelHeight, width: defaultPanelWidth }, function(window) { window.alwaysOnTop = true; });
}

function getUrlVars(url) {
    var vars = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
