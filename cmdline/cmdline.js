chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'Yo') {
		// WTF?
		setTimeout(function () {
			document.getElementById('query').focus();
		}, 0);
	}
})
