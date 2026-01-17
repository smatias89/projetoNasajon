function saveGradeControl(objGradeControl) {
	
	console.log(objGradeControl);
	
	Pace.restart();
	//Pace.track(function () { })
	
	//console.log(JSON.stringify(objUser));
	//return;
	
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'gradeControl' : JSON.stringify(objGradeControl) },
		datatype: "JSON",
		url: 'ajax/gradeControlSave',
		success: function (data) {
			
			console.log('gradeSave finished');
			
			data = JSON.parse(data);
			console.log(data);
			
			
			// toastr.success('Professor Cadastrado'+data.fullName+' com sucesso', 'Professor');
			if (data.message === undefined || data.message == "" || data.message == null) {
				// console.log(data.fullName,'>>>>');
				toastr.success('Salvo com sucesso', 'Bimestres Atualizados ', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						
						location.href = 'gradeControl';
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

//getGradeControlFilterTable incial
function getGradeControlByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	// console.log(objFilters);
	Pace.restart();
	//Pace.track(function () { })
	console.log('getGradeControlByFilterTable... ');

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'gradeControl': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/gradeControlGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
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


			console.log("getGradeControlByFilterTable finished");
		}
	});

}


function getGradeControlbyFilterForm(objFilters) {
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'gradeControl' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/gradeControlGetByFilter',
		global: false,
		success: function (data) {
		
			data = JSON.parse(data);
			// console.log(data);		
			
			$.each(data, function(index, element) {
				
				console.log('Loading element...');
				// if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
				// 	$("#disciplineID").val(element.disciplineID);					
				// }
					
				// $("#disciplineID").val(element.disciplineID);
				// console.log('PROPRETIES');	
				// $('#baseYearID').removeAttr('disabled');
				$("#gradeControlID").val(element.gradeControlID);	
				if(element.flgBim1 == 'Y'){
					$('#gradeControlBim1').prop('checked', true)
				}else if(element.flgBim1 == 'N'){
					$('#gradeControlBim1').prop('checked', false)
				}

				if(element.flgBim2 == 'Y'){
					$('#gradeControlBim2').prop('checked', true)
				}else if(element.flgBim2 == 'N'){
					$('#gradeControlBim2').prop('checked', false)
				}

				if(element.flgBim3 == 'Y'){
					$('#gradeControlBim3').prop('checked', true)
				}else if(element.flgBim3 == 'N'){
					$('#gradeControlBim3').prop('checked', false)
				}

				if(element.flgBim4 == 'Y'){
					$('#gradeControlBim4').prop('checked', true)
				}else if(element.flgBim4 == 'N'){
					$('#gradeControlBim4').prop('checked', false)
				}

				
				$("#gradeControlCreatedBy").val((element.createdByFullName != null && element.createdByFullName != ""?element.createdByFullName:element.createdBy));
				$("#gradeControlCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#gradeControlModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != ""?element.modifiedByFullName:element.modifiedBy));
				$("#gradeControlModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));
			
				$("#gradeControlID").focus();

			});

		console.log("getGradeControlForm finished");
	  }
	});
			
}

