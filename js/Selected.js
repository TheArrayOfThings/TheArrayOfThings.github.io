let internalURL;
let baseURL;

function setSelected() {
	let internalLinkRegex = /#\w*$/g;
	baseURL = window.location.href;
	if (baseURL.search(internalLinkRegex) != -1) {
		internalURL = baseURL.substring(baseURL.search(internalLinkRegex) + 1);
		baseURL = baseURL.split(internalLinkRegex)[0];
	} else {
		internalURL = baseURL;
	}
	let navigation = document.getElementsByClassName('navigate');
	for (let i = 0; i < navigation.length; ++i) {
		if (navigation[i].href == baseURL) {
			navigation[i].className = 'current';
		} else if (navigation[i].href == "https://thearrayofthings.github.io/index.html" && baseURL == "https://thearrayofthings.github.io/") {
			navigation[i].className = 'current';
		}
	}
	let topMenu = document.getElementsByClassName('topMenuLink');
	for (let i = 0; i < topMenu.length; ++i) {
		if (topMenu[i].href == baseURL) {
			topMenu[i].className = 'topMenuCurrent';
		}
	}
}