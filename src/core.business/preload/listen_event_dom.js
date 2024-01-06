(function startListen() {
	const elementValueCLick = new Map();
	const elementValueInput = new Map();
	const { ipcRenderer } = require("electron");
	document.addEventListener("click", (ev) => {
		const targetElement = ev.target;
		ipcRenderer.send("dom_click", {
			id: targetElement.id,
			innerText: targetElement.innerText,
			title: targetElement.title,
			name: targetElement.name,
			placeholder: targetElement.placeholder,
			tagName: targetElement.tagName,
		});
	});

	document.addEventListener("input", (ev) => {
		const targetElement = ev.target;
		ipcRenderer.send("dom_input", {
			id: targetElement.id,
			innerText: targetElement.innerText,
			title: targetElement.title,
			name: targetElement.name,
			placeholder: targetElement.placeholder,
			tagName: targetElement.tagName,
		});
	});

	ipcRenderer.on("action_click", (event, payload) => {
		document.querySelector(payload).click();
	});
	ipcRenderer.on("action_scroll", (event, payload) => {
		document.querySelector(payload).scrollIntoView(true);
	});
	ipcRenderer.on("action_input", (event, payload) => {
		document.querySelector(payload).value = payload;
	});
})();
