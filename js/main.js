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

function sum() {
	var len = $('#ticket .price').length
	, sum = 0
	, detail;
	for(var i = 0; i < len; i++) {
		detail = $('#ticket .price')[i].getElementsByClassName('tempTotal')[0].childNodes[0].nodeValue;
		console.log("detail" + i + ':' + detail);
		sum = sum + parseInt(detail);
	}
	$('#ticket .totalwrap .sum')[0].childNodes[0].nodeValue = sum;
}

//ticket
$('#ticket .price .amount a').click(function(e) {
	e = e || window.event;
	var tar = e.target || e.srcElement
	, attrClass = tar.className
	, tarInput = tar.parentNode.getElementsByTagName("input")[0]
	, amount = parseInt(tarInput.value)
	, price = parseFloat(tar.parentNode.parentNode.parentNode.getElementsByClassName('ticketCatg')[0].dataset.price)
	, total = tar.parentNode.parentNode.getElementsByClassName('tempTotal')[0].childNodes[0];
	if(attrClass == "plus") {
		amount += 1;
	}
	if(attrClass == "minus") {
		if(amount > 0) {
			amount -= 1;
		}
	}
	tarInput.value = amount;
	total.nodeValue = amount * price;
	sum();
	e.preventDefault();
});

$('#ticket .price .amount input').bind('input',function(e) {
	e = e || window.event;
	var tar = e.target || e.srcElement
	, tarValue = tar.value
	, total = tar.parentNode.parentNode.getElementsByClassName('tempTotal')[0].childNodes[0]
	, price = parseFloat(tar.parentNode.parentNode.parentNode.getElementsByClassName('ticketCatg')[0].dataset.price);
	total.nodeValue = tarValue * price;
	sum();
});

/*
onchange = function(e) {
	console.log('in');
	e = e || window.event;
	var tar = e.target || e.srcElement
	, tarValue = tar.value
	, total = tar.parentNode.parentNode.getElementsByClassName('tempTotal')[0].childNodes[0]
	, price = parseFloat(tar.parentNode.parentNode.parentNode.getElementsByClassName('ticketCatg')[0].dataset.price);
	total.nodeValue = tarValue * price;
	sum();
};
*/

//scrollTo
(function(){
	$('#nav .alignright a, #header .but-wrap a, #header .scrollToFlower a').click(function(e){
		e.preventDefault();
		$('html, body').scrollTo(this.hash, this.hash);
	});
})();