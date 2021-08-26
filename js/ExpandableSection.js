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
		expandableSetions[e].classList += " " + parseInternalLink(tempHeader.innerText);
		//Create the list item for the content menu
		tempListItem = document.createElement("li");
		//Create the link used in said list item
		tempLink = document.createElement("a");
		//Add the class to the link
		tempLink.classList += "contentLink";
		//Set the link text to the header text, for consistency
		tempLink.innerHTML = expandableSetions[e].innerText;
		
		tempLink.href = "#" + parseInternalLink(tempHeader.innerText);
		//You might be asking yourself "why is he doing something so convoluted here with the anchor redirect? Shouldn't the browser redirect internally without needing all this?"
		//Well, to that I say that internal links are broken in the current version of FireFox mobile - so I'm overwriting the default behaviour.
		//Also, I guess this allows me to use smooth scrollIntoView? That's a more valid reason to do this I suppose!
		tempLink.onclick = openContent;
		tempListItem.appendChild(tempLink);
		contentMenu.appendChild(tempListItem);
	}
}

function openContent () {
	var classNameToFind = parseInternalLink(this.innerText);
	var expandableSection = document.getElementsByClassName(classNameToFind)[0];
	var sectionContent = expandableSection.getElementsByClassName("expandableContent")[0];
	sectionContent.style.display ="unset";
	expandableSection.style.display ="unset";
	expandableSection.scrollIntoView({behavior: "smooth"}); 
}

function toggleSection () {
	var sectionContent = this.parentElement.getElementsByClassName("expandableContent")[0];
	if (!!( sectionContent.offsetWidth || sectionContent.offsetHeight || sectionContent.getClientRects().length )) {
		sectionContent.style.display = "none";
	} else {
		sectionContent.style.display ="unset";
		sectionContent.scrollIntoView({behavior: "smooth"}); 
	}
}

function parseInternalLink(internalLinkToParse) {
	var returnString = internalLinkToParse.replaceAll(" ", "");
	return returnString;
}

window.addEventListener("load", initialiseExpandableSection);