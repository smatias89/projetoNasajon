console.log('preloader_in');

//  ##loadComboStudentBySession($("#selectSchool"));

var userLink = $('#hidUserKeyLink').val();
var userID = $('#hidUserID').val();

var objFilters = {};
objFilters.userID = userID 
objFilters.userLink = userLink; 

// console.log(objFilters);

function selectSessionUpdate(objFilters, userNewID) {

	console.log("selectSessionUpdate.. start 🔵 -> with userID and userLink");
	Pace.restart();

	// return;
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: {
			'information': JSON.stringify(objFilters),
			'userNewID': userNewID
		},
		datatype: "JSON",
		url: 'ajax/selectSessionUpdate',
		success: function (data) {

			// console.log(':', data);
			data = JSON.parse(data);
			console.log(data);
			toastr.success(data.fullName, 'Bem-vindo');
			// console.log(typeof data);


			if (data.message == 'login') {

				setTimeout(function () {
					console.log('login ok');
					// console.log($("#hidHandScalePrefix").val());
					location.href = 'index';
				}, 2000)
				// return

			} else if (data.message == 'error') {

				location.href = "/";
			}
		},
		error: function () {
			console.error('Erro ao atualizar sessão');
			location.href = '/'
		}
	});
	console.log("selectSessionUpdate...  finish 🔴");
}

selectSessionUpdate(objFilters, userID);

// objFilters.fullName = $('#hidUserID').val()
// getStudentByFilterResponsible($('#selectStudent'),objFilters)

// function getStudentByFilterResponsible(cmbclass, objFilters) {

// 	// console.log('selectStudent.js ...');
// 	console.log('filter studentes ...');
// 	Pace.restart();
// 	//Pace.track(function () { })
	

// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 'information': JSON.stringify(objFilters) },
// 		datatype: "JSON",
// 		url: 'ajax/informationGetByFilter',
// 		global: false,
// 		success: function (data) {

// 			data = JSON.parse(data);
// 			console.log('loader students...');
// 			console.log(data);
// 			userFullName = data[0].userFullName;
			
// 			// console.log(data[0].studentUserID);
// 			userNew = data[0].userID;
// 			// arrayStudentSelected.push(...data);
// 			if (data.length == 0) {
// 				toastr.warning('Resultado não encontrado', 'Atenção!');
// 				location.href = "/" + $("#hidHandScalePrefix").val();

// 			}

// 			$.each(data, function (indexInArray, element) { 
// 				console.log(element);
// 				if(element.studentFullName){
// 					blnCkeckStudent = true;
// 				}
// 			});

// 			var studentSelected = {};
// 			studentSelected.studentUserID = '-1';
// 			selectStudentSessionUpdate(studentSelected,userNew);
			
			

// 			console.log("getStudentByFilterResponsible finished");
// 		}
// 	});

// }


// function selectStudentSessionUpdate(objFilters,userNewID) {




// $('#selectStudentButton').click(function () {

// 	if(!$('#selectStudent').val() ){
// 		toastr.warning('Selecione um Estudante','Selecione:',{
// 			timeOut: 1000,
// 			preventDuplicates: true,
// 			positionClass: 'toast-top-right',
			
// 		});
// 		return
// 	}
	
// 	// console.log('arrayStudentSelected :>> ', arrayStudentSelected);
// 	var studentSelectedFind = arrayStudentSelected.find(function(element){
// 		return element.studentUserID == $('#selectStudent').val();
// 	})

// 	// console.log(studentSelectedFind);
	
// 	var studentSelected = {};
// 	studentSelected.studentUserID = studentSelectedFind.studentUserID;
// 	studentSelected.studentFullName = studentSelectedFind.studentFullName;
// 	studentSelected.studentClassID = studentSelectedFind.studentClassID 
// 	studentSelected.staffSegmentName = studentSelectedFind.staffSegmentName 
// 	studentSelected.staffSegmentUserID = studentSelectedFind.staffSegmentUserID 
// 	studentSelected.staffName = studentSelectedFind.staffName 
// 	studentSelected.staffSegmentID = studentSelectedFind.staffSegmentID 

// 	// console.log(studentSelected);
	
// 	selectStudentSessionUpdate(studentSelected,userNew);
// 	// console.log('rteturn'); return
	
	
// 	if ($("#hidHandScalePrefix").val() != null && $("#hidHandScalePrefix").val() != "0") {
		
// 		if ($("#hidHandScalePrefix").val() == "")
// 			location.href = "/index";
// 		else
// 			location.href = "/" + $("#hidHandScalePrefix").val();
// 	}

// });

