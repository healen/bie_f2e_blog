function setCookie(name, value) {
	var Days = 7; //此   cookie   将被保存   30   天 
	var exp = new Date(); //new   Date( "December   31,   9998 "); 
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "= " + escape(value) + ";expires= " + exp.toGMTString();
}

function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^|   ) " + name + "=([^;]*)(;|$) "));
	if (arr != null) return unescape(arr[2]);
	return null;
}
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) document.cookie = name + "= " + cval + ";expires= " + exp.toGMTString();
}
