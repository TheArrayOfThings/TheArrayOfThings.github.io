"use strict";

var isScrolling;

function populatePageContents() {
	let contentHeaders = $("h1, h2, h3, h4, h5, h6");
	let contentsList = document.getElementById("contentsList");
	let newAnchor;
	let newDiv;
	let parsedHeaderText;
	for (let e = 0; e < contentHeaders.length; ++e) {
		if (contentHeaders[e].id == "modalTitle") {
			continue;
		}
		//Parse the header text
		parsedHeaderText = parseInternalLink(contentHeaders[e].innerText);
		//Add an id with the header name to the h2 tag
		contentHeaders[e].id = parsedHeaderText;
		//Create a div to contain the anchor
		newDiv = document.createElement("div");
		newDiv.id = contentHeaders[e].tagName;
		//Create an anchor tag for the header
		newAnchor = document.createElement("a");
		newAnchor.innerText = contentHeaders[e].innerText;
		newAnchor.href = "#" + parsedHeaderText;
		newAnchor.id = "#" + parsedHeaderText;
		//Add the new anchor tag to the sidebarRight
		newDiv.appendChild(newAnchor);
		contentsList.appendChild(newDiv);
		//contentsList.appendChild(document.createElement("br"));
	}
}

function parseInternalLink(internalLinkToParse) {
	let badChars = "?! ";
	let returnString = internalLinkToParse;
	for (let i = 0; i < badChars.length; ++i) {
		returnString = returnString.replaceAll(badChars[i], "");
	}
	return returnString;
}

function changeAnchorBehaviour() {
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();

		let target = this.hash,
			$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function () {
			window.location.hash = target;
		});
	});
}

function clearClass(toClear) {
	let selectedAnchors = document.getElementsByClassName(toClear);
	for (let i = 0; i < selectedAnchors.length; ++i) {
		selectedAnchors[i].classList.remove(toClear);
	}
}
function selectHeader() {

	clearClass("selectedHeader");

	// Get current scroll position
	let scrollY = window.pageYOffset;

	//Get the headers
	let headers = $("h1, h2, h3, h4, h5, h6");

	var closest = null;

	// Now we loop through headers determining closest to scroll
	for (let i = 0; i < headers.length; ++i) {
		let sectionId = headers[i].id;
		if (sectionId == "modalTitle" || sectionId == "") {
			continue;
		}

		//Is this one closer than the closest?
		if (closest == null) {
			closest = headers[i];
		}
		else {
			if (Math.abs(Math.round(scrollY) - headers[i].offsetTop) <= Math.abs(Math.round(scrollY) - closest.offsetTop)) {
				closest = headers[i];
			}
		}
	}
	if (closest != null) {
		document.getElementById("#" + closest.id).parentElement.classList.add("selectedHeader");
	}
}

function portraitOrLandscapeCheck() {
	let rootElement = document.querySelector(":root");
	let clientHeight = window.innerHeight;
	let clientWidth = window.innerWidth;
	if (clientWidth > clientHeight) {
		document.documentElement.dataset.isPortrait = 0;
		document.querySelector(":root").style.setProperty("--sidebarLeftWidth", "15vw");
		document.documentElement.dataset.showSidebarLeft = "1";

	} else {
		document.documentElement.dataset.isPortrait = 1;
		document.querySelector(":root").style.setProperty("--sidebarLeftWidth", "30vw");
		document.documentElement.dataset.showSidebarLeft = "0";
	}
	console.log(document.documentElement.dataset.isPortrait);
}

//Load the LeftSideBar.html
addEvent("load", window, () => {
	$("#sidebarLeftContainer").load("/html/LeftSideBar.html");
})

//Setup the header show/hide javascript
addEvent("load", window, () => {
	document.documentElement.dataset.showHeader = 1;
	document.addEventListener('scroll', () => {
		if (window.scrollY < 50) {
			document.documentElement.dataset.showHeader = 1;
		} else {
			document.documentElement.dataset.showHeader = 0;
		}
	});
});

//Populate page contents
addEvent("load", window, populatePageContents);
//Override default anchor behaviour
addEvent("load", window, changeAnchorBehaviour);
//Setup scrolling bahaviour to select headers
addEvent("scroll", window, () => {
	// Clear our timeout throughout the scroll
	window.clearTimeout(isScrolling);

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function () {

		// Run the callback
		selectHeader()

	}, 66);
});
//Select an initial header to highlight
addEvent("load", window, selectHeader);
//Add script highlighting
addEvent("load", window, () => {
	//Check for IE and load only if not IE
	if (!isInternetExplorer) {
		$(function () {
			$.ajax({
				url: "/Highlight/highlight.min.js",
				dataType: "script",
				contentType: "text/javascript",
				beforeSend: function (xhr) { xhr.overrideMimeType("text/javascript; charset=x-user-defined"); },
				success: function () {
					hljs.highlightAll();
				}
			});
		});
	}
});
//Check if site is landscape or portrait
addEvent("load", window, portraitOrLandscapeCheck);
//Add an event to update this when window is resized
addEvent("resize", window, portraitOrLandscapeCheck);
//Add an event handler to the showSidebarLeftButton to show/hide left menu
addEvent("click", document.getElementById("showSidebarLeftButton"), () => {
	if (document.documentElement.dataset.showSidebarLeft != "0") {
		document.documentElement.dataset.showSidebarLeft = "0";
	} else {
		document.documentElement.dataset.showSidebarLeft = "1";
	}
});
//Add an event to sidebarLeftOverlay to hide the sidebar if clicked
addEvent("click", document.getElementById("sidebarLeftOverlay"), () => {
	document.documentElement.dataset.showSidebarLeft = "0";
});