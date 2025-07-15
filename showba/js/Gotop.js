const mybutton = document.getElementById("scrollBtn");
window.onscroll = function(){
	scrollFuction()
};

function scrollFuction(){
	if(document.body.scrollTop > 20 || document.documentElement.scrollTop>20 ){
		mybutton.style.display = "block";
	}
	else{
		mybutton.style.display = "none";
	}
}

function topFunction(){
	document.documentElement.scrollTop = 0;
}
mybutton.addEventListener("click", topFunction);