var expandableSetions;
var contentMenu;

function initialiseExpandableSection() {
	if (topBarLoaded != true) {
		setTimeout(initialiseExpandableSection, 100);
		return;
	}
	expandableSetions = document.getElementsByClassName("expandableSection");
	contentMenu = document.getElementsByClassName("contentMenu")[0];
	var tempHeader;
	var tempListItem;
	var tempLink;
	for (var e = 0; e < expandableSetions.length; ++e) {
		//Get the header used in the expandable section
		tempHeader = expandableSetions[e].getElementsByClassName("expandableHeader")[0];
		//Add the event listener to expand the section when clicked
		tempHeader.addEventListener("click", toggleSection);
		//Set the ID of the expandable section to the header text, with some parsing
		expandableSetions[e].id = parseInternalLink(tempHeader.innerText);
		//Create the list item for the content menu
		tempListItem = document.createElement("li");
		//Create the link used in said list item
		tempLink = document.createElement("a");
		//Set the link text to the header text, for consistency
		tempLink.innerHTML = expandableSetions[e].innerText;
		
		tempLink.href = "#" + expandableSetions[e].id;
		tempLink.addEventListener("click", openContent);
		tempListItem.appendChild(tempLink);
		contentMenu.appendChild(tempListItem);
	}
}

function openContent () {
	var idToFind = parseInternalLink(this.innerText);
	console.log(idToFind);
	var expandableSection = document.getElementById(idToFind);
	var sectionContent = expandableSection.getElementsByClassName("expandableContent")[0];
	sectionContent.style.display ="unset";
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

function parseInternalLink(internalLinkToParse) {
	var returnString = internalLinkToParse.replaceAll(" ", "");
	return returnString;
}

window.addEventListener("load", initialiseExpandableSection);