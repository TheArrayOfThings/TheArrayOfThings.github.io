function attachEvent () {
	var menu;
	var visible = false;
	try {
		menu = document.getElementsByClassName("navContainer")[0];
		document.getElementsByClassName("topMenuRight")[0].onclick = function () {
			if (visible) {
				visible = false;
				menu.style.display = "none";
			} else {
				visible = true;
				menu.style.display = "unset";
			}
		}
		setSelected();
	}
	catch (err) {
		setTimeout(attachEvent, 10);
	}
}

attachEvent();