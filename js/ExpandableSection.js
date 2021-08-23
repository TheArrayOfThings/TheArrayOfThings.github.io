function initialiseExpandableSection() {
	var expandableSetions = document.getElementsByClassName("expandableSection");
	for (var e = 0; e < expandableSetions.length; ++e) {
		//Get the h1 element and add the event
		expandableSetions[e].getElementsByTagName("h1")[0].addEventListener("click", toggleSection);
	}
}

function toggleSection () {
	var sectionContent = this.parentElement.getElementsByClassName("expandableContent")[0];
	if (sectionContent.style.display == "none") {
		sectionContent.style.display = "unset";
	} else {
		sectionContent.style.display ="none";
	}
}

window.addEventListener("load", initialiseExpandableSection);