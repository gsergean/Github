console.log("Into myscripts.js"); 
//window.alert("Loading myscripts.js"); 

function myFunction() {
	console.log("Execute MyFunction()"); 
	window.alert("Execute MyFunction()"); 
  	//document.getElementById("demo").innerHTML = "Paragraph changed.";
}

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
		type = "Quiz";

		var n = imgsrc.search("www.quizarchief.be/prodgfx/invulquiz/");
		if (n > 0) type = "Vraag";

		var n = imgsrc.search("www.quizarchief.be/prodgfx/onlinequiz/");
		if (n > 0) type = "Vraag";

		var n = imgsrc.search("www.quizarchief.be/prodgfx/vragen/q/");
		if (n > 0) type = "Vraag";

		var n = imgsrc.search("www.quizarchief.be/prodgfx/vragen/a/");
		if (n > 0) type = "Antwoord";

		var n = imgsrc.search("www.quizarchief.be/prodgfx/ronden/");
		if (n > 0) type = "Ronde";

		oImageFrom.removeAttribute("style");

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

function PrepareTips() {
        var x, y, z;
	var i, j, k;

	j = 0;
	t = "div.col-lg-8 > div.panel.panel-default > div.panel-body";
        x = document.querySelectorAll(t);
        for (i = 0; i < x.length; i++) {
		j++;
		
		y = x[i].querySelectorAll("span.badge.tiptip");
		for (k = 0; k < y.length; k++) {
        	    console.log(y[k].src);
	            $(y[k]).trigger("mouseenter");

        	    z = document.querySelector("div#tiptip_content");
	            // console.log(z.innerHTML);
        	    console.log(z.innerText);
	            var e = document.createElement("DIV");
        	    e.innerHTML = z.innerText;
	            e.setAttribute("class", "AntwoordTip");
	            e.setAttribute("id", "AntwoordTip_" + j);
		    // Add directly after the current <span> element
		    y[k].parentNode.insertBefore(e, y[k].nextSibling);
	        }; 
        };
}