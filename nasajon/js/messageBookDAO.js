function saveMessageBook(objFilters) {

	// console.warn(objFilters);
	Pace.restart();
	//Pace.track(function () { })


	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'messageBook': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBookSave',
		success: function (data) {

			console.log('saveMessageBook finished');
			// console.log(data);

			data = JSON.parse(data);

			if (data.message === undefined || data.message == null || data.message == "") {

				toastr.success('Mensagem enviada com sucesso', 'Enviado', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function () {
						/*if (objFilters.profileID == "0") {
							closeActiveTab("profile-new");
						} else {
							closeActiveTab("profile-" + objFilters.profileID);
						}*/
						location.href = "messageBookSelect";
					}
				});

			} else {
				toastr.error(data.message);
			}

			//$('#modalDelete').modal('hide');

		},
		error: OnError
	});

}

function updateFlagReadMessageBook(objFilters) {

	// console.warn(objFilters);

	// Pace.restart();
	//Pace.track(function () { })

	console.log('updateFlagReadMessageBook... run');
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'messageBook': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBookUpdateReadMessage',//messageBookSave
		success: function (data) {

			
			// console.log(data);

			data = JSON.parse(data);

			if (data.message === undefined || data.message == null || data.message == "") {

				toastr.success('Mensagem aberta', 'Visto', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function () {
						/*if (objFilters.profileID == "0") {
							closeActiveTab("profile-new");
						} else {
							closeActiveTab("profile-" + objFilters.profileID);
						}*/
						// location.href = "messageBookSelect";
					}
				});

			} else {
				toastr.error(data.message);
			}

			$('#modalDelete').modal('hide');
			console.log("messageBookUpdateReadMessage finished")
		},
		error: OnError
	});
	

}

// function getTeacherByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

// 	console.log(objFilters);
// 	Pace.restart();
// 	//Pace.track(function () { })

// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 'teacher': JSON.stringify(objFilters) },
// 		datatype: "JSON",
// 		url: 'ajax/teacherGetByFilter',
// 		global: false,
// 		success: function (data) {


// 			data = JSON.parse(data);
// 			console.log(data);	

// 			if(data.length == 0){
// 				toastr.warning('Resultado não encontrado','Atenção!');
// 			}

// 			var data2 = data.filter(function (element) {

// 				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
// 					//console.log("element.userID: " + element.userID);
// 					//console.log("$.inArray(element.userID, lstExclusion): " + $.inArray(element.userID, lstExclusion));				
// 					return $.inArray(element.userID, lstExclusion) == -1;
// 				} else
// 					return element;
// 			});


//             console.log(data2);
// 			objDataTable.clear();
// 			objDataTable.rows.add(data2).draw();

// 			// if (objModal != null) {
// 			// 	objModal.modal('show');
// 			// }


// 			console.log("getUserByFilterTable finished");
// 		}
// 	});

// }


// function getStaffByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {
		
// 	Pace.restart();
// 	//Pace.track(function () { })
// 	console.log(objFilters);
// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/	  
// 		data: {'staff' : JSON.stringify(objFilters) },
// 		datatype: "JSON",
// 		url: 'ajax/staffGetByFilter',
// 		global: false,
// 		success: function (data) {
		
// 			data = JSON.parse(data);
// 			console.log(data);		

// 		if(data.length == 0){
// 			toastr.warning('Resultado não encontrado','Atenção!');
// 		}
		
// 		var data2 = data.filter(function(element) {	

// 			if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {	
// 				//console.log("element.staffID: " + element.staffID);
// 				//console.log("$.inArray(element.staffID, lstExclusion): " + $.inArray(element.staffID, lstExclusion));				
// 				return $.inArray(element.staffID, lstExclusion) == -1; 
// 			} else 
// 				return element;
// 		 });


// 		objDataTable.clear();
// 		objDataTable.rows.add(data2).draw();

// 		if (objModal != null) {
// 			objModal.modal('show');
// 		}
		
		
// 		console.log("getStaffByFilterTable finished");
// 	  }
// 	});
			
// }



// getDisciplineByFilterForm propreties

function getMessageBookByFilterForm(objFilters) {
	
	Pace.restart();
	//Pace.track(function () { })
	console.log('objFilters... ');
	console.log('getMessageBookByFilterForm... run ');
	
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'messageBook' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBookGetByFilterForMe',
		global: false,
		success: function (data) {
		
			data = JSON.parse(data);
			// console.log(data);	
			
			var messageBookTypeResponsible = 0
			var messageBookTypeStaff = 0
			var messageBookTypeTeacher = 0
			
			$.each(data, function(index, element) {
				
				console.log('Element Selected for me... ');
				if(element.messageBookType == '1' && element.fgAtv == 'N'){
					messageBookTypeResponsible++
				}else if(element.messageBookType == '2' && element.fgAtv == 'N'){
					messageBookTypeStaff++
				}else if(element.messageBookType == '3' && element.fgAtv == 'N'){
					messageBookTypeTeacher++
				}
				

			});

			$('#countMessageBookResponsible').text(messageBookTypeResponsible);
			$('#countMessageBookStaff').text(messageBookTypeStaff);
			$('#countMessageBookTeacher').text(messageBookTypeTeacher);

			if(messageBookTypeResponsible == '0'){

				$('#countMessageBookResponsible').removeClass('bg-danger');
				$('#countMessageBookResponsible').addClass('bg-success');

			}
			if(messageBookTypeStaff == '0'){

				$('#countMessageBookStaff').removeClass('bg-danger');
				$('#countMessageBookStaff').addClass('bg-success');
				
			}
			if(messageBookTypeTeacher == '0'){

				$('#countMessageBookTeacher').removeClass('bg-danger');
				$('#countMessageBookTeacher').addClass('bg-success');

			}

			console.log("getMessageBookByFilterForm finished");
	  	}
	});
			
}

function getMessageBookByFilterTableForMe(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	// console.log(objFilters);
	console.log('getMessageBookByFilterTableForMe ... run');
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'messageBook': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBookGetByFilterForMe',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			// console.log(data);
			console.log('data...');

			var data2 = data.filter(function (element) {

				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
					//console.log("element.schoolID: " + element.schoolID);
					//console.log("$.inArray(element.schoolID, lstExclusion): " + $.inArray(element.schoolID, lstExclusion));				
					return $.inArray(element.schoolID, lstExclusion) == -1;
				} else
					return element;
			});

			// var actionOptions = {
			// 	iconPrefix: 'fad fa-fw',
			// 	classes: [],
			// 	contextMenu: {
			// 		enabled: true,
			// 		isMulti: false,
			// 		xoffset: -10,
			// 		yoffset: -10,
			// 		showSpeed: '0.50s',
			// 		headerRenderer: function (row) {

			// 			$('.dropdown-header').addClass('text-xs');

			// 			let tableID = objDataTable.table().node().id;
			// 			// console.log(objDataTable.rows().length);
			// 			// console.log(objDataTable.row($("#" + tableID + " tr.selected")).data());
			// 			if (objDataTable.rows().length > 1) {

			// 				// For when we have contextMenu.isMulti enabled and have more than 1 row selected
			// 				return objDataTable.rows().length + ' people selected';

			// 			} else {

			// 				// let tableID = objDataTable.table().node().id;
			// 				strTmp = objDataTable.row($("#" + tableID + " tr.selected")).data();
			// 				// console.log(strTmp);

			// 				if (strTmp.profileName !== '')
			// 					return strTmp.profileName;

			// 				else if (strTmp.profileID !== '')
			// 					return strTmp.profileID;

			// 				// else 
			// 				// 	return row.objectType;


			// 			}
			// 		},
			// 		headerIsFollowedByDivider: true,
			// 		showStaticOptions: false
			// 	},
			// 	buttonList: {
			// 		enabled: false,
			// 		iconOnly: true,
			// 		containerSelector: '#my-button-container',
			// 		groupClass: 'btn-group',
			// 		disabledOpacity: 0.0,
			// 		dividerSpacing: 10,
			// 	},
			// 	deselectAfterAction: false,
			// 	items: [// A normally hidden option that only appears for even rows. Do not render as a button/menu option unless the selected items adhere
			// 		{
			// 			type: 'option',
			// 			multi: false,
			// 			title: 'Show Modification History',
			// 			iconClass: 'fas fa-list-alt mr-1',
			// 			buttonClasses: ['btn', 'btn-outline-secondary'],
			// 			contextMenuClasses: ['text-xs', 'text-secondary'],
			// 			action: function (row) {
			// 				let objAction = new Object();
			// 				objAction.id = "showModificationHistoryProfile";
			// 				tableActions(objDataTable, objAction, false);
			// 				console.log('Modification History Actions...');
			// 			},
			// 			// isHidden: function (row) {
			// 			// 	return !(row.objectName != "");
			// 			// },
			// 		},
			// 		{
			// 			type: 'option',
			// 			multi: false,
			// 			title: 'Delete',
			// 			iconClass: 'fas fa-trash-alt mr-1',
			// 			buttonClasses: ['btn', 'btn-outline-secondary'],
			// 			contextMenuClasses: ['text-xs', 'text-secondary'],
			// 			action: function (row) {
			// 				let objAction = new Object();
			// 				objAction.id = "deleteProfile";
			// 				tableActions(objDataTable, objAction, false);
			// 				console.log('Delete Actions...');
			// 			},
			// 			// isHidden: function (row) {
			// 			// 	return !(row.objectName != "");
			// 			// },
			// 		},
			// 		{
			// 			type: 'option',
			// 			multi: false,
			// 			title: 'Copy',
			// 			iconClass: 'fas fa-copy mr-1',
			// 			buttonClasses: ['btn', 'btn-outline-secondary'],
			// 			contextMenuClasses: ['text-xs', 'text-secondary'],
			// 			action: function (row) {
			// 				let objAction = new Object();
			// 				objAction.id = "copyProfile";
			// 				tableActions(objDataTable, objAction, false, true);
			// 				console.log('Copy Actions...');
			// 			},
			// 			// isHidden: function (row) {
			// 			// 	return !(row.objectName != "");
			// 			// },
			// 		},
			// 		{
			// 			type: 'option',
			// 			multi: false,
			// 			title: 'Properties',
			// 			iconClass: 'fas fa-tools mr-1',
			// 			buttonClasses: ['btn', 'btn-outline-secondary'],
			// 			contextMenuClasses: ['text-xs', 'text-secondary'],
			// 			action: function (row) {
			// 				let objAction = new Object();
			// 				objAction.id = "propertiesProfile";
			// 				tableActions(objDataTable, objAction, false, true);
			// 				console.log('Properties Actions...');
			// 			},
			// 			// isHidden: function (row) {
			// 			// 	return !(row.objectName != "");
			// 			// },
			// 		}]
			// };

			// // And initialize our plugin
			// objDataTable.contextualActions(actionOptions);

			objDataTable.clear();
			objDataTable.rows.add(data2).draw();

			if (objModal != null) {
				objModal.modal('show');
			}


			console.log("getMessageBookByFilterTableForMe finished");
		}
	});

}

//getMessageBookStaffByFilter in Dystiny PHP 
// function getMessageBookStaffByFilter(objFilters) {

// 	Pace.restart();
// 	//Pace.track(function () { })
// 	// console.log('objFilters');
// 	console.log('messageBookSelectToStaffStudentByFilter... ');
// 	// return
// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 'messageBook': JSON.stringify(objFilters) },
// 		datatype: "JSON",
// 		url: 'ajax/messageBookSelectToStaffStudentByFilter',// old messageBookSelectStaffByFilter
// 		global: false,
// 		success: function (data) {

// 			data = JSON.parse(data);
// 			console.log(data);
// 			console.error('double function.....');
			
			
// 			$.each(data, function(index, element) {
				
// 				console.log(element.staffSegmentID);
// 				location.href = "messageBook?messageBookFrom=" + element.staffSegmentID+"&type=2" ;

// 			});
			

// 			console.log("messageBookSelectToStaffStudentByFilter finished");
// 		}
// 	});

// }

function getMessageBookTeacherByFilter(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	// console.log(objFilters);
	console.log('getMessageBookTeacherByFilter... ');

	// return
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'messageBook': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBookSelectTeacherByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log(data);		
			console.log('data... ');		
			//enviar o id do prof para filtrar sua turma e seus alunos

			var data2 = data.filter(function (element) {

				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
					//console.log("element.schoolID: " + element.schoolID);
					//console.log("$.inArray(element.schoolID, lstExclusion): " + $.inArray(element.schoolID, lstExclusion));				
					return $.inArray(element.schoolID, lstExclusion) == -1;
				} else
					return element;
			});



			objDataTable.clear();
			objDataTable.rows.add(data2).draw();

			if (objModal != null) {
				objModal.modal('show');
			}


			console.log("getMessageBookTeacherByFilter finished");
		}
	});

}

function getMessageBookResponsibleByFilter(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	// console.log('objFilters');
	console.log(objFilters);
	console.log('getMessageBookResponsibleByFilter... ');

	// return
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'messageBook': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBookSelectResponsibleByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log(data);		
			console.log('data... ');		
			//enviar o id do prof para filtrar sua turma e seus alunos

			var data2 = data.filter(function (element) {

				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
					//console.log("element.schoolID: " + element.schoolID);
					//console.log("$.inArray(element.schoolID, lstExclusion): " + $.inArray(element.schoolID, lstExclusion));				
					return $.inArray(element.schoolID, lstExclusion) == -1;
				} else
					return element;
			});



			objDataTable.clear();
			objDataTable.rows.add(data2).draw();

			if (objModal != null) {
				objModal.modal('show');
			}


			console.log("getMessageBookResponsibleByFilter finished");
		}
	});

}

function getMessageBookResponsibleWhereTeacherByFilter(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	// console.log('objFilters');
	console.log(objFilters);
	console.log('getMessageBookResponsibleByFilter... run ');

	// return
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'messageBook': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBookSelectResponsibleWhereTeacherByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log(data);		
			console.log('data... ');		
			//enviar o id do prof para filtrar sua turma e seus alunos

			var data2 = data.filter(function (element) {

				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
					//console.log("element.schoolID: " + element.schoolID);
					//console.log("$.inArray(element.schoolID, lstExclusion): " + $.inArray(element.schoolID, lstExclusion));				
					return $.inArray(element.schoolID, lstExclusion) == -1;
				} else
					return element;
			});



			objDataTable.clear();
			objDataTable.rows.add(data2).draw();

			if (objModal != null) {
				objModal.modal('show');
			}


			console.log("getMessageBookResponsibleByFilter finished");
		}
	});

}

function getMessageBookStaffByFilter(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	// console.log('objFilters');
	console.log(objFilters);
	console.log('getMessageBookStaffByFilter... run ');

	// return
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'messageBook': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBookSelectStaffByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log(data);		
			console.log('data... ');		

			$('#addResponsible').empty();
			$.each(data,function(idex,element){
				console.log(element);
				$('#addResponsible').append(`
					<option value="${element.staffUserID}">${element.segmentName+' : '+element.staffName}</option>
				`);
			})
			$('#speakResponsibleSelectedSend').attr('id', 'speakStaffSelectedSend');
			$('#modalSpeakResponsible').modal('show');


			console.log("getMessageBookStaffByFilter finished");
			return
			objDataTable.clear();
			objDataTable.rows.add(data2).draw();

			if (objModal != null) {
				objModal.modal('show');
			}


		}
	});

}