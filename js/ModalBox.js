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
		modalButton.addEventListener("click", function() {
			modalOverlay.style.display = "none";
			modal.style.display = "none";
			modalVisible = false;
		});
		//Clicking the Yes button should close the modal popup
		modalYes.addEventListener("click", function() {
			modalOverlay.style.display = "none";
			modal.style.display = "none";
			modalVisible = false;
		});
		//Clicking the Yes button should close the modal popup
		modalNo.addEventListener("click", function() {
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
	modalOverlay.style.display = "unset";
	modal.style.display = "block";
	modalButton.style.display = "unset";
	modalButton.textContent = "Submit";
	modalYes.style.display = "none";	
	modalNo.style.display = "none";
	modalInput.style.display = "unset";
	modalInput.value = defaultInputText;
	modalInputLabel.style.display = "unset";
	modalInputLabel.innerHTML = labelText;
	modalTextContent.innerHTML = displayText;
	modalTitle.innerHTML = modalTitleText;
	modalButton.addEventListener("click", modalCallbackFunction);
}

function startAlertModal(modalTitleText, displayText, modalCallbackParam) {
	modalVisible = true;
	modalCallback = modalCallbackParam;
	modalOverlay.style.display = "unset";
	modal.style.display = "block";
	modalButton.style.display = "unset";
	modalButton.textContent = "OK";
	modalYes.style.display = "none";	
	modalNo.style.display = "none";
	modalInput.style.display = "none";
	modalInputLabel.style.display = "none";
	modalTextContent.innerHTML = displayText;
	modalTitle.innerHTML = modalTitleText;
	modalButton.addEventListener("click", modalCallbackFunction);
}

function startConfirmModal(modalTitleText, displayText, yesCallbackParam, noCallbackParam) {
	modalVisible = true;
	yesCallback = yesCallbackParam;
	noCallback = noCallbackParam;
	modalOverlay.style.display = "unset";
	modal.style.display = "block";
	modalButton.style.display = "none";
	modalYes.style.display = "unset";	
	modalNo.style.display = "unset";
	modalInput.style.display = "none";
	modalInputLabel.style.display = "none";
	modalTextContent.innerHTML = displayText;
	modalTitle.innerHTML = modalTitleText;
	modalYes.addEventListener("click", yesCallbackFunction);
	modalNo.addEventListener("click", noCallbackFunction);
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

setupModal();