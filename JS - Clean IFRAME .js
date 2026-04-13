function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    /* build download link */
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

    if (window.MSBlobBuilder) { /* IE10 */
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */

    if ('download' in a) { /* FF20, CH19 */
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */

    /* do iframe dataURL download: (older W3) */
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
};

function Clean_IFRAME() {
	var ifrs = document.querySelectorAll("DIV > IFRAME");
	var i, j, parent, el, el1, el2, parts, params, yt_code, sHeight;
	var sSrc, sTxt, sFile, sStart, sEnd;

	/* debugger; */

	for (i = 0; i < ifrs.length; i++) {
		sTxt="";
		sStart="0";
		sEnd="0";
		console.log("-----------------------------------------------------------------------------------");
		console.log("i=" + i);
		console.log("Width=" + ifrs.item(i).width);
		sHeight = ifrs.item(i).height;
		console.log("Height=" + sHeight);
		sSrc = ifrs[i].src;
		console.log("src=" + sSrc);

		parts = ifrs.item(i).src.split("?");
		yt_code = parts[0].substr(parts[0].lastIndexOf("/") + 1);
		console.log("YT Code=" + yt_code);

		params = parts[1].split("&");
		for (j = 0; j < params.length; ++j) {
			if (params[j].includes("start=") || params[j].includes("end=")) {
				console.log(params[j]);
				if (params[j].includes("start=")) {
					sStart = params[j].replace("start=","");
				};
				if (params[j].includes("end=")) {
					sEnd = params[j].replace("end=","");
				};
			};
		};

		ifrs[i].width = 800;
		ifrs[i].height = 200;

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

		sFile = yt_code + '_H' + sHeight + '_S' + sStart + '_E' + sEnd + '.txt';
		sTxt = yt_code + '\n' + 'Height=' + sHeight + '\n' + 'Start=' + sStart + '\n' + 'End=' + sEnd + '\n' + sSrc;
		download(sTxt, sFile, 'text/plain');
	};

	var div = document.querySelectorAll("div.video-container");
	for (i = 0; i < div.length; i++) {
		console.log("i=" + i);
		divs = div[i].querySelectorAll("DIV");
		for (j = 0; j < divs.length; j++) {
			divs[j].remove();
		};
	};
};

Clean_IFRAME();