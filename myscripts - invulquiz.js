console.log("Into myscripts.js"); 
//window.alert("Loading myscripts.js"); 

function getBase64Image(img, type) {
	var canvas = document.createElement("canvas");

	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	var dataURL = canvas.toDataURL("image/"+type);
	return dataURL;
}

function copyImages(quiztype) {
	var images = document.querySelectorAll("img#ImgFrom"); 
	var j;
	var type;
	var sSearch = "www.quizarchief.be/prodgfx/";

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

function PrepareAnswers(quiz) {
        var x, y, z;
	var i, j, k;
	var t = "div.col-lg-8 > div.panel.panel-default > div.panel-body > center > img[src^='prodgfx/" + quiz + "']";

	// Toon Antwoorden
	x = document.querySelector("button#toonantw");
	if (x != null) {
		x.click();
	} else {
		j = 0;
		j++;
		y = document.querySelectorAll("span.antwdivke");
		for (k = 0; k < y.length; k++) {
			y[k].removeAttribute("style");
    		}; 
	};

        x = document.querySelectorAll(t);
        for (i = 0; i < x.length; i++) {
           x[i].setAttribute("id", "ImgFrom");
           console.log(x[i].id);
           x[i].removeAttribute("style");
        };

	j = 0;
	t = "div.col-lg-8 > div.panel.panel-default > div.panel-footer";
        x = document.querySelectorAll(t);
        for (i = 0; i < x.length; i++) {
		j++;
		
		y = x[i].querySelectorAll("span.glyphicon.glyphicon-info-sign.tiptip");
		for (k = 0; k < y.length; k++) {
        	    console.log(y[k].src);
	            $(y[k]).trigger("mouseenter");

        	    z = document.querySelector("div#tiptip_content");
	            // console.log(z.innerHTML);
        	    console.log(z.innerText);
	            var e = document.createElement("DIV");
        	    e.innerHTML = z.innerText;
	            e.setAttribute("class", "AntwoordInfo");
	            e.setAttribute("id", "AntwoordInfo_" + j);
	            y[k].parentNode.appendChild(e);
	        }; 
        };

}
