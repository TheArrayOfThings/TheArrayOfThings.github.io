function setTitle () {
	if (topBarLoaded != true) {
		setTimeout(setTitle, 100);
		return;
	}
	let topTitle = document.getElementsByClassName("topTitle")[0];
	topTitle.innerText = document.title;
}

window.addEventListener("load", setTitle);