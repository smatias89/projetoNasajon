console.log('selectStudent internal school');

//  ##loadComboStudentBySession($("#selectSchool"));

var userLink = $('#hidUserLink').val();
var userID = $('#hidUserID').val();
var classRoomStudentID;
var staffSegmentName;
var staffSegmentUserID;
var staffSegmentStudentID;
var arrayStudentSelected = []
var userNew;

function getStudentByFilterResponsible(cmbclass, objFilters) {

	// console.log('selectStudent.js ...');
	console.log('getStudentByFilterResponsible -> filter studentes ...');
	Pace.restart();
	//Pace.track(function () { })
	

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'information': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/informationGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			// console.log('loader students...');
			// console.log(data);
			userNew = data[0].userID;
			// arrayStudentSelected.push(...data);
			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
				location.href = "/" + $("#hidSchollPrefix").val();

			}

			if(data[0].studentUserID == null || data[0].studentUserID == '' || data[0].studentUserID == undefined){

				var studentSelected = {};
				studentSelected.studentUserID = '-1';
				selectStudentSessionUpdate(studentSelected,userNew);
				location.href = "/" + $("#hidSchollPrefix").val();
			}

			$(cmbclass).empty();
			//$(cmbclass).append('<option value="0">--</option>');   
			$(cmbclass).append('<option value="">--</option>');
			console.log('element loading.... ');
			$.each(data, function(index, element) {
				
				$(cmbclass).append('<option value="' + element.studentUserID + '">' + element.studentFullName + '</option>');   

				arrayStudentSelected.push(element);

			});

			console.log('getStudentByFilterResponsible -> filter studentes finished...');
		}
	});

}

var objFilters = {};
objFilters.userID = userID 
objFilters.userLink = userLink; 

// objFilters.fullName = $('#hidUserID').val()
getStudentByFilterResponsible($('#selectStudent'),objFilters)


function selectStudentSessionUpdate(objFilters,userNewID) {

	// console.log(objFilters);
	// console.log('userNewID: ',userNewID);
	console.log('selectStudentSessionUpdate... with userNewID');
	Pace.restart();

	// return;
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'information': JSON.stringify(objFilters),
				'userNewID': userNewID
		},
		datatype: "JSON",
		url: 'ajax/selectSessionUpdate.php',
		success: function (data) {

			toastr.success('Aluno Selecionado')
			console.log('Sessão atualizada:', 'data');

		},
		error: function () {
			console.error('Erro ao atualizar sessão');
		}
	});
	console.log('selectStudentSessionUpdate finished...');
}


$('#selectStudentButton').click(function () {

	if(!$('#selectStudent').val() ){
		toastr.warning('Selecione um Estudante','Selecione:',{
			timeOut: 1000,
			preventDuplicates: true,
			positionClass: 'toast-top-right',
			
		});
		return
	}
	
	// console.log('arrayStudentSelected :>> ', arrayStudentSelected);
	var studentSelectedFind = arrayStudentSelected.find(function(element){
		return element.studentUserID == $('#selectStudent').val();
	})

	// console.log(studentSelectedFind);
	
	var studentSelected = {};
	studentSelected.studentUserID = studentSelectedFind.studentUserID;
	studentSelected.studentFullName = studentSelectedFind.studentFullName;
	studentSelected.studentClassID = studentSelectedFind.studentClassID 
	studentSelected.staffSegmentName = studentSelectedFind.staffSegmentName 
	studentSelected.staffSegmentUserID = studentSelectedFind.staffSegmentUserID 
	studentSelected.staffName = studentSelectedFind.staffName 
	studentSelected.staffSegmentID = studentSelectedFind.staffSegmentID 

	// console.log(studentSelected);
	
	selectStudentSessionUpdate(studentSelected,userNew);
	// console.log('rteturn'); return
	
	
	if ($("#hidSchollPrefix").val() != null && $("#hidSchollPrefix").val() != "0") {
		
		if ($("#hidSchollPrefix").val() == "")
			location.href = "/index";
		else
			location.href = "/" + $("#hidSchollPrefix").val();
	}

});

