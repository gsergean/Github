(function(){
var pathArray = window.location.pathname.split('/');

SavePage();

function SavePage() {
	debugger;

	let el = document.querySelector("button#createfile");
	if (el != null) {
		console.log("1 - removing button#createfile");
		el.remove();
	};

	var btn = document.createElement('button');
	btn.setAttribute('id', 'createfile');
	btn.innerText = 'Create File';
	document.body.appendChild(btn);

	(function () {
		var textFile = null,

		makeTextFile = function (text) {
			var data = new Blob([text], {type: 'text/plain'});

			/* 
			If we are replacing a previously generated file we need to
			manually revoke the object URL to avoid memory leaks.
			*/
			if (textFile !== null) {
				window.URL.revokeObjectURL(textFile);
			}
			textFile = window.URL.createObjectURL(data);
			return textFile;
		};

		var crfile = document.getElementById('createfile');

		crfile.addEventListener('click', function () {
			var link = document.createElement('a');
			var fn = 'Saved_' + pathArray[pathArray.length - 1];

			console.log("FileName=" + fn);
			link.setAttribute('download', fn);
			link.href = makeTextFile(document.firstChild.outerHTML);
			document.body.appendChild(link);

			/* wait for the link to be added to the document */
			window.requestAnimationFrame(function () {
			var event = new MouseEvent('click');
			link.dispatchEvent(event);
			document.body.removeChild(link);
			});
		}, false);
	})();

	console.log("Executing Button CreateFile");
	btn.click();
}

})();