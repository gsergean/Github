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

function copyImages() {
	var images = document.querySelectorAll("img#ImgFrom"); 
	var j;
	var type;

	console.log("Executing CopyImages"); 

	for (j = 0; j < images.length; j++) {
		console.log("Copy Image"); 
		oImageFrom = images[j];
		var imgsrc = oImageFrom.src;
		type = "foto";

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

function PrepareImages(quiz) {
        var x, i;
	var z = "div.col-lg-8 > div.panel.panel-default > div.panel-body > center > img[src^='prodgfx/" + quiz + "']";

        x = document.querySelectorAll(z);
        for (i = 0; i < x.length; i++) {
           x[i].setAttribute("id", "ImgFrom");
           console.log(x[i].id);
           x[i].removeAttribute("style");
        };
}

function PrepareAnswers() {
        var x, i, j;

	j = 0;
        x = document.querySelectorAll("div.panel > div.panel-footer > span.tiptip");
	for (i = 0; i < x.length; i++) {
            console.log(x[i].src);
            $(x[i]).trigger("mouseenter");
            var y = document.querySelector("div#tiptip_content");
            // console.log(y.innerHTML);
            console.log(y.innerText);
            var e = document.createElement("DIV");
            // e.innerHTML = y.innerText;
            e.innerHTML = y.innerHTML;
            e.setAttribute("class", "AntwoordKeuzes");
	    j++;
            e.setAttribute("id", "KeuzeInfo_" + j);
            x[i].parentNode.appendChild(e);
        }; 

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


	j = 0;
        x = document.querySelectorAll("tr > td > img.tiptip[src$='img/icons/32x32/info.png']");
        for (i = 0; i < x.length; i++) {
            console.log(x[i].src);
            $(x[i]).trigger("mouseenter");
            var y = document.querySelector("div#tiptip_content");
            console.log(y.innerHTML);
            console.log(y.innerText);
            var e = document.createElement("DIV");
            e.innerHTML = y.innerText;
            e.setAttribute("class", "Info");
	    j++;
            e.setAttribute("id", "TipInfo_" + j);
            x[i].parentNode.appendChild(e);
        };


	x = document.querySelectorAll("tr > td > a > img.tiptip");
	for (i = 0; i < x.length; i++) {
		y = x[i].parentNode;
	   	console.log(y.href);
	};
}
