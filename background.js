chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file: "third-party/jquery-3.3.1.min.js"});
	chrome.tabs.executeScript(null, {file: "third-party/clipboard.min.js"});
	chrome.tabs.executeScript(null, {file: "poe.js"});
});