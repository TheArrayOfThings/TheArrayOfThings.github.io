function initialiseExpandableSection() {
	if (topBarLoaded != true || typeof isInternetExplorer == "undefined" || typeof internalURL == "undefined") {
		setTimeout(initialiseExpandableSection, 10);
		return;
	}
	let expandableSetions = document.getElementsByClassName("expandableSection");
	let contentMenu = document.getElementsByClassName("contentMenu")[0];
	let tempHeader;
	let tempListItem;
	let tempLink;
	for (let e = 0; e < expandableSetions.length; ++e) {
		//Get the header used in the expandable section
		tempHeader = expandableSetions[e].getElementsByClassName("expandableHeader")[0];
		//Add the event listener to expand the section when clicked
		addEvent("click", tempHeader, toggleSection);
		//Add a class to the expandable section, so we can easily find it later.
		expandableSetions[e].classList += " " + parseInternalLink(tempHeader.innerText);
		//Create the list item for the content menu
		tempListItem = document.createElement("li");
		//Create the link used in said list item
		//Add the custom bullet point replacement
		tempListItem.innerText = "»";
		tempLink = document.createElement("a");
		//Add the class to the link
		tempLink.classList += "contentLink";
		//Set the link text to the header text, for consistency
		tempLink.innerHTML = tempHeader.innerText;
		//I want the internal links to appear to append to the end of the url, even if I'm not really using the functionality as intended
		tempLink.href = "#" + parseInternalLink(tempHeader.innerText);
		//You might be asking yourself "why is he doing something so convoluted here with the anchor redirect? Shouldn't the browser redirect internally without needing all this?"
		//Well, to that I say that internal links are broken in the current version of FireFox mobile - so I'm overwriting the default behaviour.
		//Also, I guess this allows me to use smooth scrollIntoView? That's a more valid reason to do this I suppose!
		tempLink.onclick = function() {
			let expandableContent = expandableSetions[e].getElementsByClassName("expandableContent")[0];
			expandableContent.style.display ="block";
			expandableContent.scrollIntoView({behavior: "smooth"}); 
		};
		tempListItem.appendChild(tempLink);
		contentMenu.appendChild(tempListItem);
		//Now, we can try and open/navigate to the relevant section on page load, if the URL points to a particular section!
		if (baseURL != internalURL) {
			if (parseInternalLink(tempHeader.innerText) == internalURL) {
				//The internal URL in the link is one of our expandable sections! Now open and scroll to it
				let expandableContent = expandableSetions[e].getElementsByClassName("expandableContent")[0];
				expandableContent.style.display ="block";
				expandableContent.scrollIntoView({behavior: "smooth"}); 
			}
		}
	}
}

function openContent (classNameToFind) {
	let expandableSection = document.getElementsByClassName(classNameToFind)[0];
	let sectionContent = expandableSection.getElementsByClassName("expandableContent")[0];
	sectionContent.style.display ="block";
	sectionContent.scrollIntoView({behavior: "smooth"}); 
}

function toggleSection () {
	let sectionContent = this.parentElement.getElementsByClassName("expandableContent")[0];
	if (!!( sectionContent.offsetWidth || sectionContent.offsetHeight || sectionContent.getClientRects().length )) {
		//Hide the section
		sectionContent.style.display = "none";
		//Redirect to only the base URL
		window.location.href = baseURL;
	} else {
		sectionContent.style.display ="block";
		sectionContent.scrollIntoView({behavior: "smooth"}); 
	}
}

function parseInternalLink(internalLinkToParse) {
	let returnString = internalLinkToParse.replaceAll(" ", "");
	return returnString;
}

addEvent("load", window, initialiseExpandableSection);