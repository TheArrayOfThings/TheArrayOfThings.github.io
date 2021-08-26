let menu;
let visible = false;
let htmlTag;

function attachEvent () {
	if (topBarLoaded != true) {
		setTimeout(attachEvent, 100);
		return;
	}
	htmlTag = document.getElementsByTagName("html")[0];
	menu = document.getElementsByClassName("navContainer")[0];
	document.getElementsByClassName("topMenuRight")[0].onclick = function () {
		if (visible) {
			hideNavMenu();
		} else {
			showNavMenu();
		}
	}
	setSelected();
}

function showNavMenu() {
	visible = true;
	menu.style.display = "unset";
	htmlTag.onclick = function(event) {
		if (event.target.className.indexOf("topMenuRight") == -1) {
			hideNavMenu();
		}
	}
}

function hideNavMenu() {
	visible = false;
	menu.style.display = "none";
	htmlTag.onclick = null;
}

window.addEventListener("load", attachEvent);