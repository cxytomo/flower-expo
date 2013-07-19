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

var viewportWidth = -1 * parseInt($('#flower-lightbox .sliderwrap').css('width'))- 2*parseInt($('#flower-lightbox .sliderwrap').css('padding-left'))
, leftBdry = viewportWidth + getViewportSize(window).w;

console.log(leftBdry);

$('#flower-lightbox .sliderwrap').mousewheel(function(e, delta){
	console.log(e.type);
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
	, attrClass;
	attrClass = tar.parentNode.parentNode.className;
	console.log();
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