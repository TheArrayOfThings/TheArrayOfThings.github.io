function setSelected() {
	let navigation = document.getElementsByClassName('navigate');
	for (let i = 0; i < navigation.length; ++i) {
		if (navigation[i].href == window.location.href) {
			navigation[i].className = 'current';
		} else if (navigation[i].href == "https://thearrayofthings.github.io/index.html" && window.location.href == "https://thearrayofthings.github.io/") {
			navigation[i].className = 'current';
		}
	}
	let topMenu = document.getElementsByClassName('topMenuLink');
	for (let i = 0; i < topMenu.length; ++i) {
		if (topMenu[i].href == window.location.href) {
			topMenu[i].className = 'topMenuCurrent';
		}
	}
}