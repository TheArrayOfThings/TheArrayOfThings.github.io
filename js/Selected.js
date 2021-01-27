function setSelected() {
	var navigation = document.getElementsByClassName('navigate');
	for (var i = 0; i < navigation.length; ++i) {
		if (navigation[i].href == window.location.href) {
			navigation[i].className = 'current';
		}
	}
}
setSelected();