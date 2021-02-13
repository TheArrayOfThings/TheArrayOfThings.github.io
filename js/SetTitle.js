function setTitle () {
	var topTitle;
	try {
		topTitle = topTitle = document.getElementsByClassName("topTitle")[0];
		topTitle.innerText = document.title;
	}
	catch (err) {
		setTimeout(setTitle, 10);
	}
}

setTitle();