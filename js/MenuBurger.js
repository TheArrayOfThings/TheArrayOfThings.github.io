let menu;
let visible = false;
let htmlTag;

function attachEvent () {
	if (topBarLoaded != true || typeof isInternetExplorer == "undefined") {
		setTimeout(attachEvent, 10);
		return;
	}
	htmlTag = document.getElementsByTagName("html")[0];
	menu = document.getElementsByClassName("navContainer")[0];
	addEvent("click", document.getElementsByClassName("topMenuRight")[0], function () {
		if (visible) {
			hideNavMenu();
		} else {
			showNavMenu();
		}
	});
	setSelected();
}
function showNavMenu() {
	visible = true;
	menu.style.display = "block";
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

addEvent("load", window, attachEvent);