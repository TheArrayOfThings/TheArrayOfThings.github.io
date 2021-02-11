function startupFunction () {
	var menu;
	var visible = false;
	try {
		attachEvent();
	}
	catch (err) {
		setTimeout(attachEvent, 10);
	}
}

function attachEvent() {
	menu = document.getElementsByClassName("navContainer")[0];
	document.getElementsByClassName("topMenuRight")[0].onclick = function () {
		if (visible) {
			visible = false;
			menu.style.display = "none";
		} else {
			visible = true;
			menu.style.display = "unset";
		}
	};
}

startupFunction();