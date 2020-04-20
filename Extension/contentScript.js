var buttonTemplate = `<svg id="arrow" width="14px" height="20px" viewBox="17 14 14 20">
    <path d="M24,15 L24,32"></path>
    <polyline points="30 27 24 33 18 27"></polyline>
  </svg>
  <svg id="check" width="21px" height="15px" viewBox="13 17 21 15">
    <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
  </svg>
  <svg  id="border" width="48px" height="48px" viewBox="0 0 48 48">
    <path d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"></path>
  </svg>`

var serverUrl = "http://127.0.0.1:5000/give_me"
var rowsSelector = "ytd-comment-thread-renderer" //"p"
var placementSelector = "#toolbar" //"a"

function getLogs(data) {

    return fetch(serverUrl, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            "ids": [{
                "id": data //data
            }]
        })
    })
}

function insertButton(element, index) {
    try {
        targetElement = element.querySelector(placementSelector);
        let button = document.createElement("div");
        button.classList.add("btn-circle-download");
        button.innerHTML = buttonTemplate;
        button.addEventListener("click", handleClick);
        targetElement.appendChild(button);
    } catch (e) {
        console.log(e);
    }
}

function handleClick(event) {
    event.preventDefault();
    this.classList.add('load');

    /*
    	Here should get some params from the row like id, date, and ect.
    */
    getLogs("test").then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = 'test.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }).then(() => {
            this.classList.add('done')
        })
        .catch(() => {
            this.classList.remove("load");
            alert("Maybe not today..")
        });

}

function insertAllButtons() {
    rows = document.querySelectorAll(rowsSelector);
    if (rows) {
        rows.forEach(insertButton);
    }
}

// Basic way to trigger the extension to begin adding buttons
// Probably on the real website it will not work
// window.addEventListener("load", insertAllButtons)

setTimeout(insertAllButtons, 10000)