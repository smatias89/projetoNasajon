const BASE_URL = window.location.origin +"/handScale";
console.log('BASE_URL: ',BASE_URL);
function login(strUsername, strPassword, strSessionId, strRequestTime, strLoginForce) {

	var objParameters = new Object();

	objParameters.login = strUsername;
	objParameters.password = strPassword;
	objParameters.sessionId = strSessionId;
	objParameters.requestTime = strRequestTime;
	objParameters.loginForce = strLoginForce;

	console.log('objParameters: ',objParameters);

	// Pace.restart();
	// Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'user' : JSON.stringify(objParameters) },
		dataType: "JSON",
		url: "./ajax/login.php",
		global: false,
		success: function (data) {
			console.log(data);
			//console.log("userID -> " + data.userID + "; message -> " + data.message);

			if (data.message === undefined || data.message == null) {
				console.log("login ok");

				if (
					data.daysToExpire != null &&
					data.daysToExpire != "" &&
					data.daysToExpire > -1
				) {
					toastr.warning(
						"Your login will expire in " + data.daysToExpire + " day(s).",
						"Login",
						{
							timeOut: 3000,
							preventDuplicates: true,
							positionClass: "toast-top-right",
							// Redirect
							onHidden: function () {
								if (data.lstSchool.length > 1) {
									console.log("Select school");
									location.href = "/selectSchool";
								} else {
									if (data.lstSchool !== undefined && data.lstSchool != null) {
										console.log(
											"data.lstSchool[0].schoolSitePrefix -> " +
											data.lstSchool[0].schoolSitePrefix
										);

										if (
											data.lstSchool.length == 1 &&
											data.lstSchool[0].schoolSitePrefix != null &&
											data.lstSchool[0].schoolSitePrefix != ""
										) {
											//location.href = "/" + data.lstSchool[0].schoolSitePrefix;
										} else {
											console.log("Open modal to select school");
										}
									} else {
										location.href = "/";
									}
								}
							},
						}
					);
				} else {
					toastr.success("Login successfully", "Login", {
						timeOut: 1000,
						preventDuplicates: true,
						positionClass: "toast-top-right",
						// Redirect
						onHidden: function () {
							/*if (data.lstSchool.length > 1) {
											console.log('Select school');
											location.href = "/selectSchool";
										} else {
											if (data.lstSchool !== undefined && data.lstSchool != null) {
												if (data.lstSchool.length == 1) {*/
							location.href = "/" + data.lstSchool[0].schoolSitePrefix;
							/*} else {
													console.log('Open modal to select school');
												}
											} else {
												location.href = "/";
											}
										}*/
						},
					});
				}
			} else {
				toastr.error(data.message);
			}
		},
		error:  function(xhr, status, error) { 
			console.log('AJAX Error:', xhr.responseText); 
		}
	});	  

}

$('#code').keypress(function (event) {

	if (event.key === "Enter") {

		const ans = captcha.valid($('input[name="code"]').val());

		if (ans) {
			login($('#login').val(), $('#password').val(), $("#hidSessionId").val(''), $("#hidRequestTime").val(''), $("#hidLoginForce").val(''));
		} else {
			toastr.error('Invalid captcha');
			captcha.refresh();
		}

	}

});

$('.btn-login-sign-in').click(function () {
console.log('Login');
	const ans = captcha.valid($('input[name="code"]').val());

	if (ans) {
		login($('#login').val(), $('#password').val(), $("#hidSessionId").val(), $("#hidRequestTime").val(), $("#hidLoginForce").val());
	} else {
		toastr.error('Invalid captcha');
		captcha.refresh();
	}

});

const captcha = new Captcha($('#canvas'), {
	width: 250,
	height: 120,
	font: 'bold 46px Arial',
	resourceType: 'aA0', // a-lowercase letters, A-uppercase letter, 0-numbers
	resourceExtra: [],
	autoRefresh: false,
	length: 6,
	clickRefresh: true
});

if ($("#login").val() != null && $("#login").val() != "") {
	$('.btn-login-sign-in').hide();
	$('#canvas').hide();
	$('#password').hide();
	$('#divCaptchaCode').hide();
	login($('#login').val(), $('#password').val(), $('#password').val(), $("#hidRequestTime").val(), $("#hidLoginForce").val());
}