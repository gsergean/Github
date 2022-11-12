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

function PrepareAnswers() {
        var x, i, j;
	var z = "tr > td:nth-child(2) > center > img[src^='prodgfx/']";

        x = document.querySelectorAll(z);
        for (i = 0; i < x.length; i++) {
           x[i].setAttribute("id", "ImgFrom");
           console.log(x[i].id);
           x[i].removeAttribute("style");
        };

}
