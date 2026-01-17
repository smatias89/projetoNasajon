
function showPassword(objUser) {
	
	//console.log(objUser);
	
	Pace.restart();
	//Pace.track(function () { })

	//console.log(JSON.stringify(objUser));
	//return;
	
	$.ajax({
	  type: "POST",
	  contentType: "application/json; charset=utf-8",	  
	  data: JSON.stringify(objUser),
	  datatype: "json",
	  url: '/servlet/showPassword',
	  success: function (data) {
		
		//console.log('showPassword finished');
		//console.log(data);
		
		if (data.message === undefined || data.message == "") {
			
			//console.log('Password -> ' + data.password);
			$('#lblShowPassword').text(data.password);
			$('#modalShowPassword').modal('show');			
						
		} else {
			toastr.error(data.message);
		}

		//$('#modalDelete').modal('hide');
		
	  }
	});
			
}

function copyPasswordToClipboard(objUser, blnEncrypted) {
	
	//console.log('copyPasswordToClipboard -> Encrypted: ' + blnEncrypted);	
	if (blnEncrypted === undefined || blnEncrypted == false) {

		copyToClipboard(objUser.password, true);
		toastr.success("Password Copied!");

	} else {
		//console.log(objUser);
		
		Pace.restart();
		//Pace.track(function () { })

		//console.log(JSON.stringify(objUser));
		//return;
		
		$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",	  
		data: JSON.stringify(objUser),
		datatype: "json",
		url: '/servlet/showPassword',
		success: function (data) {
			
			//console.log('showPassword finished');
			//console.log(data);
			
			if (data.message === undefined || data.message == "") {
				
				copyToClipboard(data.password, true);
				toastr.success("Password Copied!");

			} else {
				toastr.error(data.message);
			}

			//$('#modalDelete').modal('hide');
			
		}
		});

	}
			
}