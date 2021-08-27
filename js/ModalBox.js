let modal;
let closeSpan;
let modalButton;
let modalYes;
let modalNo;
let modalInput;
let modalInputLabel;
let modalOverlay;
let modalTextContent;
let modalTitle;
let modalVisible = false;
let modalCallback;
let yesCallback;
let noCallback;
function setupModal () {
	if (topBarLoaded != true || typeof isInternetExplorer == "undefined") {
		setTimeout(setupModal, 10);
		return;
	}
	//Modal Div 
	modal = document.getElementById("modalBox");
	//Modal button closes the modal popup and performs a follow-up function
	modalButton = document.getElementsByClassName("modalButton")[0];	
	//Modal button closes the modal popup and performs a follow-up function
	modalYes = document.getElementsByClassName("modalYes")[0];	
	//Modal button closes the modal popup and performs a follow-up function
	modalNo = document.getElementsByClassName("modalNo")[0];
	//Input box for when the modal is in prompt mode
	modalInput = document.getElementById("modalInput");
	//Label for the input box
	modalInputLabel = document.getElementById("modalInputLabel");
	//Overlay to prevent interactions with the page
	modalOverlay =  document.getElementById("modalOverlay");
	//Get the text content so we can edit it later
	modalTextContent =  document.getElementById("modalTextContent");
	//Title for the Modal box
	modalTitle = document.getElementById("modalTitle");
	try {
		//Clicking the Span or Submit button should close the modal popup
		addEvent("click", modalButton, function() {
			modalOverlay.style.display = "none";
			modal.style.display = "none";
			modalVisible = false;
		});
		//Clicking the Yes button should close the modal popup
		addEvent("click", modalYes, function() {
			modalOverlay.style.display = "none";
			modal.style.display = "none";
			modalVisible = false;
		});
		//Clicking the No button should close the modal popup
		addEvent("click", modalNo, function() {
			modalOverlay.style.display = "none";
			modal.style.display = "none";
			modalVisible = false;
		});
	}
	catch (err) {
		console.log(err);
		setTimeout(setupModal, 10);
	}
}

function startPromptModal(modalTitleText, displayText, labelText, defaultInputText, modalCallbackParam) {
	modalVisible = true;
	modalCallback = modalCallbackParam;
	modalOverlay.style.display = "block";
	modal.style.display = "block";
	modalButton.style.display = "block";
	modalButton.textContent = "Submit";
	modalYes.style.display = "none";	
	modalNo.style.display = "none";
	modalInput.style.display = "block";
	modalInput.value = defaultInputText;
	modalInputLabel.style.display = "block";
	modalInputLabel.innerHTML = labelText;
	modalTextContent.innerHTML = displayText;
	modalTitle.innerHTML = modalTitleText;
	addEvent("click", modalButton, modalCallbackFunction);
}

function startAlertModal(modalTitleText, displayText, modalCallbackParam) {
	modalVisible = true;
	modalCallback = modalCallbackParam;
	modalOverlay.style.display = "block";
	modal.style.display = "block";
	modalButton.style.display = "block";
	modalButton.textContent = "OK";
	modalYes.style.display = "none";	
	modalNo.style.display = "none";
	modalInput.style.display = "none";
	modalInputLabel.style.display = "none";
	modalTextContent.innerHTML = displayText;
	modalTitle.innerHTML = modalTitleText;
	addEvent("click", modalButton, modalCallbackFunction);
}

function startConfirmModal(modalTitleText, displayText, yesCallbackParam, noCallbackParam) {
	modalVisible = true;
	yesCallback = yesCallbackParam;
	noCallback = noCallbackParam;
	modalOverlay.style.display = "block";
	modal.style.display = "block";
	modalButton.style.display = "none";
	modalYes.style.display = "block";	
	modalNo.style.display = "block";
	modalInput.style.display = "none";
	modalInputLabel.style.display = "none";
	modalTextContent.innerHTML = displayText;
	modalTitle.innerHTML = modalTitleText;
	addEvent("click", modalYes, yesCallbackFunction);
	addEvent("click", modalNo, noCallbackFunction);
}

function modalCallbackFunction() {
	if (modalCallback) {
		modalCallback();
	}
}
function yesCallbackFunction() {
	if (yesCallback) {
		yesCallback();
	}
}
function noCallbackFunction() {
	if (noCallback) {
		noCallback();
	}
}

addEvent("load", window, setupModal);