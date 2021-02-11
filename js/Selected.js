function setSelected() {
	var navigation = document.getElementsByClassName('navigate');
	for (var i = 0; i < navigation.length; ++i) {
		if (navigation[i].href == window.location.href) {
			navigation[i].className = 'current';
		} else if (navigation[i].href == "https://thearrayofthings.github.io/index.html" && window.location.href == "https://thearrayofthings.github.io/") {
			navigation[i].className = 'current';
		}
	}
	var topMenu = document.getElementsByClassName('topMenuLink');
	for (var i = 0; i < topMenu.length; ++i) {
		if (topMenu[i].href == window.location.href) {
			topMenu[i].className = 'topMenuCurrent';
		}
	}
}