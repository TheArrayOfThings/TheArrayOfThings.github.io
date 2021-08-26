function setSelected() {
	let interalLinkRegex = /#\w*$/g;
	let windowURL = window.location.href;
	if (windowURL.search(interalLinkRegex) != -1) {
		windowURL = windowURL.split(interalLinkRegex)[0];
	}
	let navigation = document.getElementsByClassName('navigate');
	for (let i = 0; i < navigation.length; ++i) {
		if (navigation[i].href == windowURL) {
			navigation[i].className = 'current';
		} else if (navigation[i].href == "https://thearrayofthings.github.io/index.html" && windowURL == "https://thearrayofthings.github.io/") {
			navigation[i].className = 'current';
		}
	}
	let topMenu = document.getElementsByClassName('topMenuLink');
	for (let i = 0; i < topMenu.length; ++i) {
		if (topMenu[i].href == windowURL) {
			topMenu[i].className = 'topMenuCurrent';
		}
	}
}