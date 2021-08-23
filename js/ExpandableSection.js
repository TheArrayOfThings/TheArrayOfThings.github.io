function initialiseExpandableSection() {
	if (topBarLoaded != true) {
		setTimeout(initialiseExpandableSection, 100);
		return;
	}
	var expandableSetions = document.getElementsByClassName("expandableSection");
	for (var e = 0; e < expandableSetions.length; ++e) {
		//Get the h1 element and add the event
		expandableSetions[e].getElementsByClassName("expandableHeader")[0].addEventListener("click", toggleSection);
	}
}

function toggleSection () {
	var sectionContent = this.parentElement.getElementsByClassName("expandableContent")[0];
	if (!!( sectionContent.offsetWidth || sectionContent.offsetHeight || sectionContent.getClientRects().length )) {
		sectionContent.style.display = "none";
	} else {
		sectionContent.style.display ="unset";
		sectionContent.scrollIntoView(); 
	}
}

window.addEventListener("load", initialiseExpandableSection);