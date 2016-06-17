chrome.commands.onCommand.addListener(function(command) {
	chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			message: 'Yo'
		});
	});
})

chrome.runtime.onMessage.addListener(function (request) {
	if (request.query) {
		console.log(request.query);
	}
})
