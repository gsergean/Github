console.log("Into myscripts.js"); 
//window.alert("Loading myscripts.js"); 

function getBase64Image(img, type) {
	var canvas = document.createElement("canvas");
	console.log("Image width="+img.width);
	console.log("Image height="+img.height);
	canvas.width = img.width;
	canvas.height = img.height;
	console.log("Canvas width="+canvas.width);
	console.log("Canvas height="+canvas.height);
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	var dataURL = canvas.toDataURL("image/"+type);
	return dataURL;
}

function copyImages(weekquiztype) {
	var images = document.querySelectorAll("img#ImgFrom"); 
	var j;
	var type;
	var sSearch = "www.quizarchief.be/prodgfx/" + weekquiztype + "/";

	console.log("Executing CopyImages"); 

	for (j = 0; j < images.length; j++) {
		console.log("Copy Image"); 
		oImageFrom = images[j];
		var imgsrc = oImageFrom.src;
		type = "foto";

		var n = imgsrc.search(sSearch);
		if (n > 0) type = "foto";

		var imgType = imgsrc.split('.').pop();
		if (imgType == "jpg") imgType = "jpeg";
		imgData = getBase64Image(oImageFrom, imgType);
		console.log("After getBase64Image");
	
		var oImageTo = document.createElement("IMG");
		oImageTo.setAttribute("id", "ImgTo");
		console.log("Type="+type);
		oImageTo.setAttribute("class", type);
		oImageTo.src = imgData;
		//document.body.appendChild(oImageTo);
		oImageFrom.parentNode.insertBefore(oImageTo, oImageFrom);
		console.log("End Copy Image");
	};
}

function PrepareAnswers(weekquiz) {
        var x, i, j;
	var z = "tr > td > a > img[src^='prodgfx/" + weekquiz + "']";

        x = document.querySelectorAll(z);
        for (i = 0; i < x.length; i++) {
           x[i].setAttribute("id", "ImgFrom");
           console.log(x[i].id);
           x[i].removeAttribute("style");
           x[i].removeAttribute("class");
        };

	// x = document.querySelectorAll("tr > td.toonantwoord");
	// for (i = 0; i < x.length; i++) {
        //   x[i].setAttribute("class", "_toonantwoord");
        //   console.log(x[i].class);
	// };

	j = 0;
        x = document.querySelectorAll("tr > td > img.tiptip[src$='img/icons/64x64/light_bulb.png']");
        for (i = 0; i < x.length; i++) {
            console.log(x[i].src);
            $(x[i]).trigger("mouseenter");
            var y = document.querySelector("div#tiptip_content");
            console.log(y.innerHTML);
            console.log(y.innerText);
            var e = document.createElement("DIV");
            e.innerHTML = y.innerText;
            e.setAttribute("class", "Antwoord");
	    j++;
            e.setAttribute("id", "TipAntwoord_" + j);
            x[i].parentNode.appendChild(e);
        };

	// Get Info from the Third Column (=Antwoordkeuzes)
	j = 0;
        x = document.querySelectorAll("tr > td:nth-child(3) > img.tiptip[src$='img/icons/32x32/info.png']");
        for (i = 0; i < x.length; i++) {
            console.log(x[i].src);
            $(x[i]).trigger("mouseenter");
            var y = document.querySelector("div#tiptip_content");
            console.log(y.innerHTML);
            console.log(y.innerText);
            var e = document.createElement("DIV");
            e.innerHTML = y.innerHTML;
            //e.innerHTML = y.innerText;
            e.setAttribute("class", "AntwoordKeuzes");
	    j++;
            e.setAttribute("id", "KeuzeInfo_" + j);
            x[i].parentNode.appendChild(e);
        };

	// Get Info from the Eight Column (=Info)
	j = 0;
        x = document.querySelectorAll("tr > td:nth-child(8)");
        for (i = 0; i < x.length; i++) {
		j++;
            	console.log("Row " + j);
		var z = x[i].querySelector("img.tiptip[src$='img/icons/32x32/info.png']");
		if (z !== null) {
			//console.log(z.src);
			$(z).trigger("mouseenter");
			var y = document.querySelector("div#tiptip_content");
			//console.log(y.innerHTML);
			console.log(y.innerText);
			var e = document.createElement("DIV");
			e.innerHTML = y.innerText;
			e.setAttribute("class", "Info");
			e.setAttribute("id", "TipInfo_" + j);
			z.parentNode.appendChild(e);
		}
		else {
			//console.log("Undefined (Null)");
		};
        };


	// x = document.querySelectorAll("tr > td > a > img.tiptip");
	// for (i = 0; i < x.length; i++) {
	//	y = x[i].parentNode;
	//   	console.log(y.href);
	// };
}
