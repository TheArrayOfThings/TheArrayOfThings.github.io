function initialiseExpandableSection() {
	if (typeof isInternetExplorer == "undefined") {
		console.log("Loading...");
		setTimeout(initialiseExpandableSection, 10);
		return;
	}
	let expandableSetions = document.getElementsByClassName("expandableSection");
	let tempHeader;
	for (let e = 0; e < expandableSetions.length; ++e) {
		console.log(`e: ${e}`);
		//Get the header used in the expandable section
		tempHeader = expandableSetions[e].getElementsByClassName("expandableHeader")[0];
		//Add the event listener to expand the section when clicked
		addEvent("click", tempHeader, () => {toggleSection(expandableSetions[e])});
		//Add a class to the expandable section, so we can easily find it later.
		expandableSetions[e].classList += " " + parseInternalLink(tempHeader.innerText);
		//Now, we can try and open/navigate to the relevant section on page load, if the URL points to a particular section!
		let internalURL = window.location.hash.substring(1);
		if (internalURL) {
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

function toggleSection (section) {
	console.log(`Toggling section for:`);
	console.log(section);
	let expandableSectionContent = section.getElementsByClassName("expandableContent");
	for (let i = 0; i < expandableSectionContent.length; ++i) {
		if(expandableSectionContent[i].style.display == "block") {
			expandableSectionContent[i].style.display = "none";
			this.href = "#";
		} else {
			expandableSectionContent[i].style.display = "block";
			expandableSectionContent[i].scrollIntoView({behavior: "smooth"}); 
			let internalLink = section.getElementsByClassName("expandableHeader")[0].id;
			this.href= `#${internalLink}`;
		}
	}
}


$(document).ready(() => {
	initialiseExpandableSection();
});
