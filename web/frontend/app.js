(function (w, d) {
    "use strict";
    var apiPath = "https://api.example.com/duck-api-token", stage1 = d.querySelector("div#duck-email-input"), duckMail = d.querySelector("input#duck-email"), btnEmail = d.querySelector("button#requestEmailBtn"), stage2 = d.querySelector("div#duck-otp-input"), duckOtp = d.querySelector("input#duck-otp"), btnSubmit = d.querySelector("button#submit-otpBtn"), stage3 = d.querySelector("div#duck-token-output"), tokenOut = d.querySelector("input#out-token");
    function jsonRequest(url, value, callback) {
        var req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader('Content-type', 'application/json');
        req.onload = function () {
            callback(this);
        };
        req.send(value);
    }
    btnEmail.addEventListener("click", function (e) {
        checkDOM();
        w["prJ"](apiPath, JSON.stringify({ username: duckMail.value }), function (r) {
            var array = JSON.parse(r.responseText);
            if (array.state == "success") {
                stage1.style.display = "none";
                stage2.style.display = "inherit";
                alert("Bestätigungsmail wurde angefordert. Bitte Passphrase aus der E-Mail eingeben.");
            }
            else {
                alert("Fehler beim Anfordern der Bestätigungsmail: " + array.description);
            }
        });
    });
    btnSubmit.addEventListener("click", function (e) {
        checkDOM();
        w["pR"](apiPath, JSON.stringify({ username: duckMail.value, otp: duckOtp.value }), function (r) {
            var array = JSON.parse(r.responseText);
            if (array.state == "success") {
                stage2.style.display = "none";
                stage3.style.display = "inherit";
                tokenOut.value = array.token;
            }
            else {
                alert("Fehler beim Anfordern des Api-Tokens: " + array.description);
            }
        });
    });
    function checkDOM() { if (stage1 == null || stage2 == null || stage3 == null || duckMail == null || duckOtp == null || tokenOut == null || btnEmail == null || btnSubmit == null) {
        alert("Critical: Invalid DOM detected, missing Elements.");
        throw new Error("Critical: Invalid DOM detected, missing Elements.");
    } }
})(window, document);
