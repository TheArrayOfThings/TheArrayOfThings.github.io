function setTitle () {
	if (topBarLoaded != true || typeof isInternetExplorer == "undefined") {
		setTimeout(setTitle, 10);
		return;
	}
	let topTitle = document.getElementsByClassName("topTitle")[0];
	topTitle.innerText = document.title;
}

addEvent("load", window, setTitle);