var serverUrl = "http://127.0.0.1/give_me"
var rowsSelector = "p"
var placementSelector = "p"

function getLogs(id){
	fetch(serverUrl,{
		method: 'POST',
		body: JSON.stringify()
	})
}

function insertButton(element, index) {
	targetElement = element.querySelector(placementSelector)
	let button = document.createElement("a");
	button.classList.add("ext_download_button");
	button.addEventListener("click",handleClick)
	button.href = "";
	var imgURL = chrome.extension.getURL("images/download.png");
	button.style.backgroundImage = imgURL;
	element.appendChild(button);
}

function handleClick(event){
	event.preventDefault();
	this.classList.add('loading');
	console.log(this);

	this.classList.remove('loading');
	this.classList.add('success');
}

function insertAllButtons(){
	rows = document.querySelectorAll(rowsSelector);
	if(rows){
		rows.forEach(insertButton);	
	}
}
setTimeout(insertAllButtons, 3000)