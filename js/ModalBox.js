var modal;
var closeSpan;
var modalSubmit;
var modalInput;
var modalInputLabel;
var modalOverlay;
var modalTextContent;
var modalTitle;
var modalVisible = false;
var modalCallback;
var callbackEventListener;
function setupModal () {
	//Modal Div 
	modal = document.getElementById("modalBox");
	//Span closes the modal popup
	closeSpan = document.getElementsByClassName("closeSpan")[0];
	//Modal submit closes the modal popup too, but is a button!
	modalSubmit = document.getElementsByClassName("modalSubmit")[0];
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
		closeSpan.onclick = function() {
			modalOverlay.style.display = "none";
			modal.style.display = "none";
			modalVisible = false;
		}
		modalSubmit.addEventListener("click", function() {
			modalOverlay.style.display = "none";
			modal.style.display = "none";
			modalVisible = false;
		});
		//Clicking anywhere on the page should also close the modal popup
		/*window.onclick = function(event) {
		  if (event.target == modal) {
			modal.style.display = "none";
		  }
		}*/
	  //Finally, open the modal popup
	  //modal.style.display = "block";
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
	closeSpan.style.display = "none";
	modalSubmit.style.display = "unset";
	modalInput.style.display = "unset";
	modalInput.value = defaultInputText;
	modalInputLabel.style.display = "unset";
	modalInputLabel.innerHTML = labelText;
	modalTextContent.innerHTML = displayText;
	modalTitle.innerHTML = modalTitleText;
	callbackEventListener = modalSubmit.addEventListener("click", modalCallbackFunction);
}

function modalCallbackFunction() {
	console.log("Modal callback: " + modalCallback);
	if (modalCallback) {
		console.log("removing event listener");
		//modalSubmit.removeEventListener("click", callbackEventListener);
		modalCallback();
		//modalCallback = null;
	}
	//callbackEventListener = null;
}

setupModal();