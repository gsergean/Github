(function(){
if (window.location.hostname == "www.quizarchief.be")
	console.log("www.quizarchief.be");
else {
	window.alert("No QuizArchief Page");
	return;
}

var pathArray = window.location.pathname.split('/');

if (	   pathArray[1] == "mcquiz"
	|| pathArray[1] == "muziekquiz"
	|| pathArray[1] == "sportquiz"
	|| pathArray[1] == "wetenschapsquiz"
	|| pathArray[1] == "aardrijkskundequiz"
	|| pathArray[1] == "faunafloraquiz"
	|| pathArray[1] == "kunstquiz"
	|| pathArray[1] == "filmquiz"
	|| pathArray[1] == "geschiedenisquiz"
	|| pathArray[1] == "literatuurquiz"
	|| pathArray[1] == "themaquiz") {
	/* $.getScript("http://localhost/QATOOLS/myscripts - weekquiz.js"); */
	$.getScript("http://localhost/QATOOLS/myscripts - weekquiz - huidig seizoen.js");
} else if (pathArray[1] == "fotoquiz") {
	$.getScript("http://localhost/QATOOLS/myscripts - fotoquiz.js");
} else if (pathArray[1] == "invulquiz") {
	$.getScript("http://localhost/QATOOLS/myscripts - invulquiz.js");
} else if (pathArray[1] == "challengequiz") {
	$.getScript("http://localhost/QATOOLS/myscripts - challengequiz.js");
} else if (pathArray[1] == "shootoutquiz" || pathArray[1] == "knockoutquiz") {
	$.getScript("http://localhost/QATOOLS/myscripts - shootknockoutquiz.js");
} else if (pathArray[1] == "quiz") {
	console.log("Quiz=" + pathArray[2]);
	$.getScript("http://localhost/QATOOLS/myscripts.js");
} else {
	console.log("Unknown Page " + pathArray[1]);
};

setTimeout(function(){
	if (pathArray[1] == "quiz") {
		console.log("Save Quiz Page");
		SaveQuizPage();
	} else {
		console.log("Save WeekQuiz Page");
		SaveWeekQuizPage();
	}
}, 2000);

function SaveWeekQuizPage() {
	var i, j, iNbrofElements, iNr, str, VraagID, baseRef, sHStr;

	if (	   pathArray[1] == "mcquiz"
		|| pathArray[1] == "muziekquiz"
		|| pathArray[1] == "sportquiz"
		|| pathArray[1] == "wetenschapsquiz"
		|| pathArray[1] == "aardrijkskundequiz"
		|| pathArray[1] == "faunafloraquiz"
		|| pathArray[1] == "kunstquiz"
		|| pathArray[1] == "filmquiz"
		|| pathArray[1] == "geschiedenisquiz"
		|| pathArray[1] == "literatuurquiz"
		|| pathArray[1] == "themaquiz") {
		console.log("Step 1");
		console.log("Execute: PrepareAnswers(" + pathArray[1] + ")");
		PrepareAnswers(pathArray[1]);
		console.log("Execute: copyImages(" + pathArray[1] + ")");
		copyImages(pathArray[1]);
	} else if (pathArray[1] == "fotoquiz") {
		console.log("Step 1");
		console.log("Execute: PrepareAnswers()");
		PrepareAnswers();
		console.log("Execute: copyImages()");
		copyImages();
	} else if (pathArray[1] == "challengequiz") {
		console.log("Step 1");
		console.log("Execute: PrepareAnswers()");
		PrepareAnswers();
		console.log("Execute: copyImages()");
		copyImages();
	} else if (pathArray[1] == "invulquiz") {
		console.log("Step 1");
		console.log("Execute: PrepareAnswers(" + pathArray[1] + ")");
		PrepareAnswers(pathArray[1]);
		console.log("Execute: copyImages(" + pathArray[1] + ")");
		copyImages(pathArray[1]);
	} else if (pathArray[1] == "shootoutquiz" || pathArray[1] == "knockoutquiz") {
		console.log("Step 1");
		console.log("Execute: PrepareAnswers()");
		PrepareAnswers();
		console.log("Execute: PrepareImages(\"shootoutquiz\")");
		PrepareImages("shootoutquiz");
		console.log("Execute: PrepareImages(\"knockoutquiz\")");
		PrepareImages("knockoutquiz");
		console.log("Execute: copyImages()");
		copyImages();
	} else if (pathArray[1] == "quiz") {
		console.log("Error ==> Wrong Function call");
		return;
	}

	console.log("Step 2");
	let el = document.querySelector("nav.navbar");
	if (el == null) {
		console.log("Element nav.navbar does not exist");
	} else {
		console.log("Removing Element nav.navbar");
		el.remove();
	};

	console.log("Step 3");
	let ChildCol = document.querySelectorAll("SCRIPT");
	iNbrofElements = ChildCol.length;
	for (i = 0; i < iNbrofElements; i++) { 
		console.log("removing " + i + " " + ChildCol[i]);
		el = ChildCol[i];
		el.remove();
	};

	console.log("Step 4");
	ChildCol = document.querySelectorAll("LINK");
	iNbrofElements = ChildCol.length;
	for (i = 0; i < iNbrofElements; i++) { 
		console.log("removing " + i + " " + ChildCol[i]);
		el = ChildCol[i];
		el.remove();
	};

	console.log("Step 5");
	ChildCol = document.querySelectorAll("INS");
	iNbrofElements = ChildCol.length;
	for (i = 0; i < iNbrofElements; i++) { 
		console.log("removing " + i + " " + ChildCol[i]);
		el = ChildCol[i];
		el.remove();
	};

	console.log("Step 6");
	Clean_IFRAME();

	ChildCol = document.querySelectorAll("IFRAME");
	iNbrofElements = ChildCol.length;
	for (i = 0; i < iNbrofElements; i++) {
		debugger;
		console.log("i=" + i);

		fr = ChildCol[i];
		if (fr.src.includes("https://www.youtube.com/") 
			|| fr.src.includes("http://www.youtube.com/")) {
			let el = document.createElement("DIV");
			el.innerText = fr.src;
			if (fr.parentElement.className == "video-container"
				|| fr.parentElement.className == "embed-responsive-item"
				|| fr.parentElement.className == "embed-responsive embed-responsive-16by9") { 
				console.log("1 - ClassName=video-container");
				el.setAttribute("class", "youtube-movie-fullscreen");
				el.setAttribute("height", "2");
			} else if (fr.height == 300 && fr.width == 200) {
				console.log("2 - fr.height == 300 && fr.width == 200");
				el.setAttribute("class", "youtube-movie-smallscreen");
				el.setAttribute("height", "1");
				el.setAttribute("pixels", "300");
			} else if (fr.height >= 200) {
				console.log("3 - fr.height >= 200");
				el.setAttribute("class", "youtube-movie-fullscreen");
				el.setAttribute("height", "2");
			} else {
				console.log("4 - " + fr.height);
				el.setAttribute("class", "youtube-movie-smallscreen");
				el.setAttribute("height", "1");
				el.setAttribute("pixels", fr.height);
			};
			fr.parentElement.appendChild(el);
			fr.remove();
		} else {
			console.log("IFRAME.SRC=" + fr.src);
		};
	};

	var ifrs = document.querySelectorAll("div.youtube-movie-smallscreen");
	for (i = 0; i < ifrs.length; i++) {
		console.log("i=" + i);
		ifrs[i].parentElement.removeAttribute("style");
		ifrs[i].parentElement.parentElement.removeAttribute("style");
	};
	ifrs = document.querySelectorAll("div.video.container > div");
	for (i = 0; i < ifrs.length; i++) {
		console.log("i=" + i);
		ifrs[i].removeAttribute("style");
	};


	console.log("Step 7");
	ChildCol = document.querySelectorAll("OBJECT");
	iNbrofElements = ChildCol.length;
	for (i = 0; i < iNbrofElements; i++) {
		console.log("i=" + i);

		fr = ChildCol[i];
		if (fr.Data.includes("https://www.youtube.com/") 
			|| fr.Data.includes("http://www.youtube.com/")) {
			let el = document.createElement("DIV");
			el.innerText = fr.Data;
			if (fr.height > 40) {
				console.log("1 - fr.height > 40");
				el.setAttribute("class", "youtube-movie-fullscreen");
				el.setAttribute("height", "2");
			} else {
				console.log("2 - " + fr.height);
				el.setAttribute("class", "youtube-movie-smallscreen");
				el.setAttribute("height", "1");
				el.setAttribute("pixels", fr.height);
			};
			fr.parentElement.appendChild(el);
			fr.remove();
		} else {
			console.log("OBJECT.DATA=" + fr.Data);
		};
	};

	console.log("Step 8");
	el = document.querySelector("base");
	if (el == null) {
		console.log("Element BASE does not exist");
	} else {
		el.href = "file:///C:/TEMP/QA/CacheViewFiles/www.quizarchief.be/";
	};

	console.log("Step 9");
	ChildCol = document.getElementsByTagName("img");
	for (i = 0; i < ChildCol.length; i++) {
		console.log("i=" + i);
		el = ChildCol[i];
		console.log("el.src=" + el.src);
		if (el.src.includes("http://www.quizarchief.be/")) {
			console.log("Replacing http://www.quizarchief.be/");
			str = el.src;
			str = str.replace("http://www.quizarchief.be/", "");
			el.src = str;
		};
		if (el.src.includes("https://www.quizarchief.be/")) {
			console.log("Replacing https://www.quizarchief.be/");
			str = el.src;
			str = str.replace("https://www.quizarchief.be/", "");
			el.src = str;
    		};
	};

	console.log("Step 10");
	el = document.querySelector("div#cookie-bar-prompt");
	if (el == null) {
		console.log("Element div#cookie-bar-prompt does not exist");
	} else {
		console.log("Removing Element div#cookie-bar-prompt");
		el.remove();
	};

	console.log("Step 11");
	el = document.querySelector("div#cookie-bar");
	if (el == null) {
		console.log("Element div#cookie-bar does not exist");
	} else {
		console.log("Removing Element div#cookie-bar");
		el.remove();
	};

	console.log("Step 12");
	el = document.querySelector("div#jcScrollTop");
	if (el == null) {
		console.log("Element div#jcScrollTop does not exist");
	} else {
		console.log("Removing Element div#jcScrollTop");
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
			if (	   pathArray[1] == "mcquiz"
				|| pathArray[1] == "muziekquiz"
				|| pathArray[1] == "sportquiz"
				|| pathArray[1] == "wetenschapsquiz"
				|| pathArray[1] == "aardrijkskundequiz"
				|| pathArray[1] == "faunafloraquiz"
				|| pathArray[1] == "fotoquiz"
				|| pathArray[1] == "kunstquiz"
				|| pathArray[1] == "filmquiz"
				|| pathArray[1] == "geschiedenisquiz"
				|| pathArray[1] == "literatuurquiz"
				|| pathArray[1] == "themaquiz") {
				var hdr = document.querySelector("h1.page-header");
				var seizoen = hdr.innerText.split("'")[1].split(" ")[1];
				var fn = hdr.innerText.split("'")[1] + '_' + pathArray[2] + '.html';
			} else if (pathArray[1] == "invulquiz") {
				if (pathArray.length == 3) {
					var fn = pathArray[1] + '_' + pathArray[2] + '_R1' + '.html';
				} else if (pathArray.length == 4) {
					var fn = pathArray[1] + '_' + pathArray[2] + '_R' + pathArray[3] + '.html';
				} else if (pathArray.length > 4) {
					console.log("Error Splitting " + window.location.pathname);
				};
			} else {
				var fn = pathArray[1] + '_' + pathArray[2] + '.html';
			};
			console.log("FileName=" + fn);
			link.setAttribute('download', fn);
			link.href = makeTextFile(document.firstChild.nextSibling.outerHTML);
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

function SaveQuizPage() {
	var i, j, iNbrofElements, iNr, str, VraagID, baseRef, sHStr;
	
	if (pathArray[1] == "quiz") {
		console.log("Step 1");
		let ChildCol = document.getElementsByClassName("panel panel-default");
		iNbrofElements = ChildCol.length;
		for (i = 0; i < iNbrofElements; i++) { 
			let el = ChildCol[i];
			if (el.id.includes("vragenrij_")) {
				VraagID = el.id.replace("vragenrij_", "");
				el1 = el.querySelector("div#divdiv" + VraagID);
				if (el1 != null) {
					console.log("1 - removing div#divdiv" + VraagID);
					el1.remove();
				};
				el1 = el.querySelector("div#thanks" + VraagID);
				if (el1 != null) {
					console.log("2 - removing div#thanks" + VraagID);
					el1.remove();
				};
				el1 = el.querySelector("div#toonbron_" + VraagID);
				if (el1 != null) {
					console.log("3 - removing div#toonbron_" + VraagID);
					el1.remove();
				};
				el1 = el.querySelector("div#showedittag_" + VraagID);
				if (el1 != null) {
					console.log("4 - removing div#showedittag_" + VraagID);
					el1.remove();
				};
				el1 = el.querySelector("div#txtHintCarta" + VraagID);
				if (el1 != null) {
					console.log("5 - removing div#txtHintCarta" + VraagID);
					el1.remove();
				};
				el1 = el.querySelector("div#txtHintCart_" + VraagID);
				if (el1 != null) {
					console.log("6 - removing div#txtHintCart_" + VraagID);
					el1.remove();
				};
				el1 = el.querySelector("span#mainrating_" + VraagID);
				if (el1 != null) {
					console.log("7 - Append element DIV.RatingQuestion");
					el2 = document.createElement("DIV");
					el2.setAttribute("class", "RatingQuestion");
					el2.setAttribute("id", "RatingQuestion_" + VraagID);
					el2.innerText = "rating=" + el1.innerText;
					el2.setAttribute("value", el1.querySelector("strong").innerText);
					el1.appendChild(el2);
				};
				el1 = el.querySelectorAll("div.pull-left > div.dropup");
				iNr = el1.length;
				for (j = 0; j < iNr; j++) {
					el2 = el1.item(j);
					el3 = el2.parentElement;
					el3.remove();
					console.log("8 - removing " + el3);
				};
				el1 = el.querySelector("span#updatelikes_" + VraagID);
				if (el1 != null) {
					console.log("9 - removing span#updatelikes_" + VraagID);
					el1.remove();
				};
            			
				console.log("10 - Append element DIV.my_question_divider");
				el2 = document.createElement("DIV");
				el2.setAttribute("class", "my_question_divider");
				el2.setAttribute("style", "clear: both;");
				el.appendChild(el2);
    			};
		};

		console.log("Step 2");
		let el = document.querySelector(".col-lg-4");
		if (el == null) {
			console.log("No class .col-lg-4");
		} else {
			console.log("Removing Element with class .col-lg-4");
			el.remove();
		};

		console.log("Step 3");
		el = document.querySelector("NAV");
		if (el == null) {
			console.log("Element NAV does not exist");
		} else {
			console.log("Removing Element NAV");
			el.remove();
		};

		console.log("Step 4");
		ChildCol = document.querySelectorAll("SCRIPT");
		iNbrofElements = ChildCol.length;
		for (i = 0; i < iNbrofElements; i++) { 
			console.log("removing " + i + " " + ChildCol[i]);
			el = ChildCol[i];
			el.remove();
		};

		console.log("Step 5");
		ChildCol = document.querySelectorAll("LINK");
		iNbrofElements = ChildCol.length;
		for (i = 0; i < iNbrofElements; i++) { 
			console.log("removing " + i + " " + ChildCol[i]);
			el = ChildCol[i];
			el.remove();
		};

		console.log("Step 6");
		ChildCol = document.querySelectorAll("STYLE");
		iNbrofElements = ChildCol.length;
		for (i = 0; i < iNbrofElements; i++) { 
			console.log("removing " + i + " " + ChildCol[i]);
			el = ChildCol[i];
			el.remove();
		};

		console.log("Step 7");
		Clean_IFRAME();

		ChildCol = document.querySelectorAll("IFRAME");
		iNbrofElements = ChildCol.length;
		for (i = 0; i < iNbrofElements; i++) {
			debugger;
			console.log("i=" + i);

			fr = ChildCol[i];
			if (fr.src.includes("https://www.youtube.com/") 
				|| fr.src.includes("http://www.youtube.com/")) {
				let el = document.createElement("DIV");
				el.innerText = fr.src;
				if (fr.className == "embed-responsive-item") { 
					console.log("1 - ClassName=video-container");
					el.setAttribute("class", "youtube-movie-fullscreen");
					el.setAttribute("height", "2");
				} else {
					console.log("1 - " + fr.height);
					el.setAttribute("class", "youtube-movie-smallscreen");
					el.setAttribute("height", "1");
					el.setAttribute("pixels", fr.height);
				};
				fr.parentElement.appendChild(el);
				fr.remove();
			} else if (fr.src.includes("https://player.vimeo.com/") 
				|| fr.src.includes("http://player.vimeo.com/")) {
				let el = document.createElement("DIV");
				el.innerText = fr.src;
				el.setAttribute("class", "vimeo-movie-fullscreen");
				el.setAttribute("height", "2");
				fr.parentElement.appendChild(el);
				fr.remove();
			} else {
				console.log("IFRAME.SRC=" + fr.src);
			};
		};

		console.log("Step 8");
		ChildCol = document.querySelectorAll("OBJECT");
		iNbrofElements = ChildCol.length;
		for (i = 0; i < iNbrofElements; i++) {
			console.log("i=" + i);

			fr = ChildCol[i];
			if (fr.Data.includes("https://www.youtube.com/") 
				|| fr.Data.includes("http://www.youtube.com/")) {
				let el = document.createElement("DIV");
				el.innerText = fr.Data;
				if (fr.height > 40) {
					console.log("1 - fr.height > 40");
					el.setAttribute("class", "youtube-movie-fullscreen");
					el.setAttribute("height", "2");
				} else {
					console.log("2 - " + fr.height);
					el.setAttribute("class", "youtube-movie-smallscreen");
					el.setAttribute("height", "1");
					el.setAttribute("pixels", fr.height);
				};
				fr.parentElement.appendChild(el);
				fr.remove();
			} else {
				console.log("OBJECT.DATA=" + fr.Data);
			};
		};
	
		console.log("Step 9");
		el = document.querySelector("base");
		if (el == null) {
			console.log("Element BASE does not exist");
		} else {
			el.href = "file:///C:/TEMP/QA/CacheViewFiles/www.quizarchief.be/";
			baseRef = el.href;
		};

		console.log("Step 10");
		ChildCol = document.getElementsByTagName("img");
		for (i = 0; i < ChildCol.length; i++) {
			console.log("i=" + i);
			el = ChildCol[i];
			console.log("el.src=" + el.src);
			if (el.src.includes("http://www.quizarchief.be/")) {
				console.log("Replacing http://www.quizarchief.be/");
				str = el.src;
				str = str.replace("http://www.quizarchief.be/", "");
				el.src = str;
			};
			if (el.src.includes("https://www.quizarchief.be/")) {
				console.log("Replacing https://www.quizarchief.be/");
				str = el.src;
				str = str.replace("https://www.quizarchief.be/", "");
				el.src = str;
    			};
		};

		console.log("Step 11");
		ChildCol = document.querySelectorAll("div.col-lg-8 div.panel-body img");
		iNbrofElements = ChildCol.length;
		if (iNbrofElements == 0) {
			let ChildCol = document.querySelectorAll("div.panel-body img");
			iNbrofElements = ChildCol.length;
		};
		for (i = 0; i < iNbrofElements; i++) { 
			el = ChildCol[i];
			sHStr = el.src.replace(baseRef,"");
		        if (sHStr.includes("http://www.quizarchief.be/")) {
        		    sHStr.replace("http://www.quizarchief.be/", "");
			};
			if (sHStr.includes("prodgfx/ronden/")
				|| sHStr.includes("prodgfx/vragen/")
				|| sHStr.includes("prodgfx/onlinequiz/")
				|| sHStr.includes("prodgfx/invulquiz/")) {
				el.id = "ImgFrom";
			} else if (sHStr.includes("img/")) {
			} else if (sHStr.includes("data:image/")) {
			} else if (sHStr.includes("http://") || sHStr.includes("https://")) {
				el.id = "ImgFrom";
			} else {
				console.log("Unknown - " +  sHStr.substring(0, 50));
			};
		};

		console.log("Step 12");
		console.log("Execute: copyImages()");
		copyImages();

		console.log("Step 13");
		console.log("Execute: PrepareTips()");
		PrepareTips();

		console.log("Step 14");
		el = document.querySelector("div.tip_right#tiptip_holder");
		if (el == null) {
			console.log("Element div.tip_right#tiptip_holder does not exist");
		} else {
			console.log("Removing Element div.tip_right#tiptip_holder");
			el.remove();
		};
	}

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
			if (pathArray.length == 3) {
				var fn = 'QAQuiz_' + pathArray[2] + '_R1' + '.html';
			} else if (pathArray.length == 4) {
				var fn = 'QAQuiz_' + pathArray[2] + '_R' + pathArray[3] + '.html';
			} else if (pathArray.length > 4) {
				console.log("Error Splitting " + window.location.pathname);
			};

			console.log("FileName=" + fn);
			link.setAttribute('download', fn);
			link.href = makeTextFile(document.firstChild.nextSibling.outerHTML);
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

function Clean_IFRAME() {
	var ifrs = document.querySelectorAll("DIV > DIV > IFRAME");
	var i, j, parent, el, el1, el2;

	for (i = 0; i < ifrs.length; i++) {
		console.log("i=" + i);

		ifrs[i].parentElement.removeAttribute("style");
		ifrs[i].parentElement.parentElement.removeAttribute("style");

		parent = ifrs[i].parentElement.parentElement.parentElement;
		el = parent.querySelectorAll("DIV[style*='background-color:rgb(0, 0, 0)']");
		for (j = 0; j < el.length; j++) {
			el2 = el[j].parentElement;
			el2.removeChild(el[j]);
		};
		el = parent.querySelectorAll("DIV[style*='background-color:black']");
		for (j = 0; j < el.length; j++) {
			el2 = el[j].parentElement;
			el2.removeChild(el[j]);
		};
		el = parent.querySelectorAll("DIV[style*='background-color:#000']");
		for (j = 0; j < el.length; j++) {
			el2 = el[j].parentElement;
			el2.removeChild(el[j]);
		};
	};
}
})();