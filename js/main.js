function getViewportSize(w) {
		w = w || window;
		var size = {};
		if(w.innerWidth != null) {
			size.w = window.innerWidth;
			size.h = window.innerHeight;
		}
		var	d = w.document;
		if(document.compatMode == 'CSS1Compat') {
			size.w = d.documentElement.clientWidth;
			size.h = d.documentElement.clientHeight;
		}
		else {
			size.w = d.body.clientWidth;
			size.h = d.body.clientHeight;
		}
		return size;
}

function closeLightbox() {
	$('#flower-lightbox').css('display','none');
	//remove node
	$('#flower-lightbox header span')[0].childNodes[0].parentNode.removeChild($('#flower-lightbox header span')[0].childNodes[0]);
}

var viewportWidth = -1 * parseInt($('#flower-lightbox .sliderwrap').css('width'))- 2*parseInt($('#flower-lightbox .sliderwrap').css('padding-left'))
, leftBdry = viewportWidth + getViewportSize(window).w;

$('#flower-lightbox .sliderwrap').mousewheel(function(e, delta){
	var left = parseInt($('#flower-lightbox .sliderwrap').css('left'));
		left = left+(delta * 100);
	if(left <= 0 && left >= leftBdry) {
		console.log(left);
		$('#flower-lightbox .sliderwrap').css('left',left + 'px');
	}
	e.preventDefault();
});

$('#flower-lightbox').mousewheel(function(e, delta) {
	e.preventDefault();
});

$('#showFlower .archive a').click(function(e) {
	e = e || window.event;
	var tar = e.target || e.srcElement
	, attrClass
	,txtnode;
	attrClass = tar.parentNode.nextElementSibling.getElementsByTagName('span')[0].childNodes[0].nodeValue;
	console.log(tar.parentNode.nextElementSibling.getElementsByTagName('span')[0].childNodes[0].nodeValue);//not work in IE
	txtnode = document.createTextNode(attrClass);
	$('#flower-lightbox header span')[0].appendChild(txtnode);
	$('#flower-lightbox').css('display','block');
	e.preventDefault();
});

$('#nav ul li a').click(function(e) {
	e = e || window.event;
	var tar = e.target || e.srcElement
	, attrClass = tar.className;
	if(attrClass !== 'active') {
		$('#nav .active')[0].className = "";
		tar.className = "active";
	}
});

$('#flower-lightbox .closeBox').click(function(e){
	e = e || window.event;
	closeLightbox();
	e.preventDefault();
});

$('.jump').click(function(e) {
	e = e || windwo.event;
	var tar = e.target || e.srcElement
	, tarHref = tar.href
	, attrHref = $('#nav .active')[0].href;
	console.log(tar.href);
	if(tarHref !== attrHref) {
		$('#nav .active')[0].className = "";
		$('#nav ul a[href="'+tarHref+'"]')[0].className = "active";
	}

});