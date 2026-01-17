// console.log('enterExitDAO');
function saveEnterExit(objSave) {
	
	// console.log(objSave);
	
	Pace.restart();
	//Pace.track(function () { })
	
	//console.log(JSON.stringify(objUser));
	//return;
	
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'enterExit' : JSON.stringify(objSave) },
		datatype: "JSON",
		url: 'ajax/enterExitSave',
		success: function (data) {
			
			console.log('enterExitSave finished');
			// console.log(data);
			
			data = JSON.parse(data);

            console.log('data...');
            // console.log(data);
			
			// toastr.success('Professor Cadastrado'+data.fullName+' com sucesso', 'Professor');
			if (data.message === undefined || data.message == "" || data.message == null) {
				// console.log(data.fullName,'>>>>');
				toastr.success('Salvo com sucesso', 'Entrada e Sáida: ', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						
						location.href = 'enterExitStaff';
						return

					}
				});
			
			} else {
				toastr.error(data.message);
			}
			return
		

		//$('#modalDelete').modal('hide');
		
		}
	});
			
}

function saveEnterExitView(objSave) {
	
	// console.log(objSave);
	
	Pace.restart();
	//Pace.track(function () { })
	
	//console.log(JSON.stringify(objUser));
	//return;
	
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'enterExit' : JSON.stringify(objSave) },
		datatype: "JSON",
		url: 'ajax/enterExitSave',
		success: function (data) {
			
			console.log('enterExitSave finished');
			// console.log(data);
			
			data = JSON.parse(data);

            // console.log(data);return
			
			// toastr.success('Professor Cadastrado'+data.fullName+' com sucesso', 'Professor');
			if (data.message === undefined || data.message == "" || data.message == null) {
				// console.log(data.fullName,'>>>>');
				toastr.success('Salvo com sucesso', 'Entrada e Sáida: ', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						if(!$('#hiPermissionOnlyStaff').val()){
							location.href = 'enterExitView';
							return
						}else{
							location.href = 'enterExitStaff';
							return
						}
						
						

					}
				});
			
			} else {
				toastr.error(data.message);
			}
			return
		

		//$('#modalDelete').modal('hide');
		
		}
	});
			
}

function getEnterExitStudentLoaderByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	// console.log(objFilters);
	Pace.restart();
	//Pace.track(function () { })
	console.log('getStudentLoaderByFilterTable ...running');
	// console.log('list Elementes');

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'student': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/studentGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			// console.log(data);	

			var data2 = data.filter(function (element) {

				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
					//console.log("element.userID: " + element.userID);
					//console.log("$.inArray(element.userID, lstExclusion): " + $.inArray(element.userID, lstExclusion));				
					return $.inArray(element.userID, lstExclusion) == -1;
				} else
					return element;
			});



			objDataTable.clear();
			objDataTable.rows.add(data2).draw();

			// if (objModal != null) {
			// 	objModal.modal('show');
			// }
            


			console.log("getStudentLoaderByFilterTable finished");
		}


	});


}


//getGradeControlFilterTable incial
function getEnterExitlByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	console.log('objFilters...');
	console.log('getEnterExitlByFilterTable ...');
	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'enterExit': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/enterExitGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log('data... ');
			// console.log(data);
			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
			}

			var data2 = data.filter(function (element) {

				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
					//console.log("element.userID: " + element.userID);
					//console.log("$.inArray(element.userID, lstExclusion): " + $.inArray(element.userID, lstExclusion));				
					return $.inArray(element.userID, lstExclusion) == -1;
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
			// 				var name = strTmp.fullName;
			// 				var list = name.split(' ');

			// 				if (strTmp.fullName !== '')
			// 					return 'Aluno: ' + list[0] + ' ' + (list[1] == undefined ? '' : list[1]) + ' ' + (list[2] == undefined ? '' : list[2])

			// 				else if (strTmp.studentID !== '')
			// 					return strTmp.studentID;

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
			// 		// {
			// 		// 	type: 'option',
			// 		// 	multi: false,
			// 		// 	title: 'Show Modification History',
			// 		// 	iconClass: 'fas fa-list-alt mr-1',
			// 		// 	buttonClasses: ['btn', 'btn-outline-secondary'],
			// 		// 	contextMenuClasses: ['text-xs', 'text-secondary'],
			// 		// 	action: function (row) {
			// 		// 		let objAction = new Object();
			// 		// 		objAction.id = "showModificationHistoryTeacher" ;
			// 		// 		tableActions(objDataTable, objAction, false);
			// 		// 		console.log('Modification History Actions...');
			// 		// 	},
			// 		// 	// isHidden: function (row) {
			// 		// 	// 	return !(row.objectName != "");
			// 		// 	// },
			// 		// },
			// 		{
			// 			type: 'option',
			// 			multi: false,
			// 			title: 'Deletar',
			// 			iconClass: 'fas fa-trash-alt mr-1',
			// 			buttonClasses: ['btn', 'btn-outline-secondary'],
			// 			contextMenuClasses: ['text-xs', 'text-secondary'],
			// 			action: function (row) {
			// 				let objAction = new Object();
			// 				objAction.id = "deleteStudent";
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
			// 			title: 'Copiar',
			// 			iconClass: 'fas fa-copy mr-1',
			// 			buttonClasses: ['btn', 'btn-outline-secondary'],
			// 			contextMenuClasses: ['text-xs', 'text-secondary'],
			// 			action: function (row) {
			// 				let objAction = new Object();
			// 				objAction.id = "copyStudent";
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
			// 			title: 'Propriedades',
			// 			iconClass: 'fas fa-tools mr-1',
			// 			buttonClasses: ['btn', 'btn-outline-secondary'],
			// 			contextMenuClasses: ['text-xs', 'text-secondary'],
			// 			action: function (row) {
			// 				let objAction = new Object();
			// 				objAction.id = "propertiesStudent";
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

			// if (objModal != null) {
			// 	objModal.modal('show');
			// }


			console.log('getEnterExitlByFilterTable finished...');
		}
	});

}

function getEnterExitByFilterForm(objFilters){

	// console.log(objFilters);
	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'enterExit': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/enterExitGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log('Loading data... ');
			// console.log(data);
			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
			}

			// var data2 = data.filter(function (element) {

			// 	if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
			// 		//console.log("element.userID: " + element.userID);
			// 		//console.log("$.inArray(element.userID, lstExclusion): " + $.inArray(element.userID, lstExclusion));				
			// 		return $.inArray(element.userID, lstExclusion) == -1;
			// 	} else
			// 		return element;
			// });
			

			$.each(data, function (indexInArray, element) { 

				console.log('Loading element... ');
				$("#enterExitID").val(element.enterExitID);
				$("#enterExitFullName").val(element.personName);
				$("#enterExitPhone").val(element.personPhone);
				$("#enterExitCPF").val(element.personCPF);
				$("#enterExitFgAtv").val(element.fgAtv);
				$("#enterExitObservation").val(element.reason);
				$("#enterExitDateInput").val(element.startDate);
				$("#enterExitDateEndInput").val(element.endDate);

				var time = moment(element.time).format(TO_PATTERN_HOUR_MINUTE);
				// console.log('time :>> ', time);
				time.split(":")
				var hour = moment(time[0]).format('HH');
				var minute = moment(time[1]).format('mm');
				var time = moment().hours(hour).minutes(minute);
				// console.log('time: ',time);
				$('#enterExitDateTime').datetimepicker('date', time);

				if(element.calendarWeekHour == 'Y'){
					$('#enterExitScheduleCalendarWeekHour').prop('checked',true);
					$('#divEnterExitDateTime').hide();
				}
				if(element.typeRecurrence == 'P'){
					$('#enterExitSchedulePunctual').prop('checked',true);

					$('#divEnterExitWeekDays').show();
					$('#divEnterExitDate').show();
					$('#divEnterExitHour').show();
			
					$('#divEnterExitDateEnd').hide();
					var data = `    Data: `
					$('label[for="enterExitDate"]').first().text(data);
				}
				if(element.typeRecurrence == 'D'){
					$('#enterExitScheduleDay').prop('checked',true);
				}
				if(element.typeRecurrence == 'W'){
					$('#enterExitScheduleWeek').prop('checked',true);

					$('#divEnterExitWeekDays').show();
					$('#divEnterExitDate').show();
					$('#divEnterExitHour').show();
					$('#divEnterExitDateEnd').show();
			
					$('label[for="enterExitDate"]').first().text('Data Inicio:');
				}
				if(element.typeRecurrence == 'M'){
					$('#enterExitScheduleMonth').prop('checked',true);

					$('#divEnterExitHour').show();
					$('#divEnterExitDateTime').show();
					// $('#enterExitHour').show();
			
					$('label[for="enterExitDate"]').first().text('Data Inicio:');
				}
				if(element.typeRecurrence == 'Y'){
					$('#enterExitScheduleYear').prop('checked',true);
				}
				

				var blnCheckSunday = element.dayWK_1;
				var blnCheckMonday = element.dayWK_2;
				var blnCheckTuesday = element.dayWK_3;
				var blnCheckWednesday = element.dayWK_4;
				var blnCheckThursday = element.dayWK_5;
				var blnCheckFriday = element.dayWK_6;
				var blnCheckSaturday = element.dayWK_7;

				if(blnCheckSunday == 'Y'){
					$('#enterExitSunday').prop('checked',true);
				}
				if(blnCheckMonday == 'Y'){
					$('#enterExitMonday').prop('checked',true);
				}
				if(blnCheckTuesday == 'Y'){
					$('#enterExitTuesday').prop('checked',true);
				}
				if(blnCheckWednesday == 'Y'){
					$('#enterExitWednesday').prop('checked',true);
				}
				if(blnCheckThursday == 'Y'){
					$('#enterExitThursday').prop('checked',true);
				}
				if(blnCheckFriday == 'Y'){
					$('#enterExitFriday').prop('checked',true);
				}
				if(blnCheckSaturday == 'Y'){
					$('#enterExitSaturday').prop('checked',true);
				}


				var tableStudent = $('#enterExitAddStudentTable').DataTable();
				var dataRowsStudent = element.lstTblStudent
				if(dataRowsStudent.length > 0){
					console.log('list student load');
					// console.log(dataRowsStudent);
					var arrayTratament = dataRowsStudent.map(element => { //add studentID no obj dentro do array
						// console.log(element);
						return {
							...element,
							fullName: element.tableStudentName,
							studentID: element.tableStudentID,
							lstClassRoom: element.studentClassRoom
						};
					});
					// console.log(arrayTratament);
					tableStudent.rows.add(arrayTratament).draw();
					blnCheckToolTableStudent = true;

				}else{

					console.log('not studet listed');

				}

				$("#enterExitCreatedBy").val((element.createdByFullName != null && element.createdByFullName != ""?element.createdByFullName:element.createdBy));
				$("#enterExitCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#enterExitModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != ""?element.modifiedByFullName:element.modifiedBy));
				$("#enterExitModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));
			
				$("#enterExitID").focus();
				$('#btnToolTableStudent').click();

				

			});






			console.log("getEnterExitByFilterForm finished");
		}
	});

}

function deleteEnterExit(btnRefresh,objDelete) {
	
	var objParameters = new Object();
	
	objParameters.enterExitID = parseInt($('#hidEnterExitID').val());
	objParameters.actionType = $('#hidActionType').val();
	objParameters.baseYearID = $('#hidBaseYearID').val();

	// console.log(objParameters); return;
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'enterExit' : JSON.stringify(objParameters) },
		datatype: "JSON",
		url: 'ajax/enterExitDelete',
		success: function (data) {
				
			data = JSON.parse(data);
			//console.log(data);
			
			if (data.message === undefined || data.message == "" || data.message == null) {
				// if (btnRefresh != null) {
					// 	toastr.success('Staff was deleted successfully');
					// 	btnRefresh.click();
					// } 
					if (btnRefresh != null) {
						toastr.success('Deletada com sucesso!','Usuário: '+objDelete);
						btnRefresh.click();
						
					} 
					
			} else {
				toastr.error(data.message);
			}
				
			$('#modalDelete').modal('hide');
				
		}

	});
	console.log('deleteEnterExit finished...');
			
}