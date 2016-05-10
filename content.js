var vimClickIframe = document.createElement('iframe');
var hiddenStyle = 'display:none;'
var displayedStyle = 'display:block;'

vimClickIframe.setAttribute('src', 'chrome-extension://ghgpkhnkmggacmkokplofpcnbaldjloh/cmdline/cmdline.html');
vimClickIframe.setAttribute('style', hiddenStyle);
vimClickIframe.setAttribute('id', 'vim-click');

document.body.appendChild(vimClickIframe);

var activateCmdline = function () {
	vimClickIframe.setAttribute('style', displayedStyle);
	vimClickIframe.focus();
}

var hideCmdline = function () {
	vimClickIframe.setAttribute('style', hiddenStyle);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'Yo') {
		if (vimClickIframe.getAttribute('style') === hiddenStyle) {
			activateCmdline();
		} else {
			hideCmdline();
		}
	}
});
