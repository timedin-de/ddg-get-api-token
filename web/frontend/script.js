"use strict";
!function(w,d) {
	var apiPath = "https://api.example.com/ddg-api-token",
		stage1 = d.getElementById("duck-email-input"),
		stage2 = d.getElementById("duck-otp-input"),
		stage3 = d.getElementById("duck-token-output"),
		
		duckMail=d.getElementById("duck-email"),
		duckOtp = d.getElementById("duck-otp"),
		tokenOut = d.getElementById("out-token"),

		btnEmail = d.getElementById("requestEmailBtn"),
		btnSubmit = d.getElementById("submit-otpBtn");

	function postRequest(url,value,callback){
		var request=new XMLHttpRequest();
		request.open('POST',url,true);
		request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		request.onload=function() {
			callback(this);
		};
		request.send(value);
	}
	btnEmail.addEventListener("click",(e)=>{
		postRequest(apiPath, "username="+duckMail.value, (request)=>{
			var array = JSON.parse(request.responseText);
			if(array.state=="success"){
				stage1.style.display="none";
				stage2.style.display="inherit";
				alert("Bestätigungsmail wurde angefordert. Bitte Passphrase aus der EMail eingeben.");
			} else {
				alert("Fehler beim Anfordern der Bestätigungsmail: "+array.description);
			}
		});
	});
	btnSubmit.addEventListener("click",(e)=>{
		postRequest(apiPath, "username="+duckMail.value+"&otp="+duckOtp.value, (request)=>{
			var array = JSON.parse(request.responseText);
			if(array.state=="success"){
				stage2.style.display="none";
				stage3.style.display="inherit";
				tokenOut.value = array.token;
			} else {
				alert("Fehler beim Anfordern des Api-Tokens: "+array.description);
			}
		});
	});
}(window,document);
