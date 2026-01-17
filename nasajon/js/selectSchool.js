console.log('select internal school... ');
$('.btn-selectSchool').click(function () {
	
	if ($("#selectSchool").val() != null && $("#selectSchool").val() != "0") {
		
		if ($("#selectSchool").val() == "")
			location.href = "/index";
		else
		location.href = "/" + $("#selectSchool").val();
	}

});

loadComboSchoolBySession($("#selectSchool"));
