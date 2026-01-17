

//getDisciplineByFilterTable 
function getScaleByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	console.log("getScaleByFilterTable... start 🔵");
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'scale': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/scaleGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log(data);
			// console.log(data);	
			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
			}
			var data2 = data.filter(function (element) {

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

			// 				if (strTmp.shdesc !== '')
			// 					return 'Disciplina: '+strTmp.shdesc;

			// 				else if (strTmp.disciplineID !== '')
			// 					return strTmp.disciplineID;

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
			// 	// {
			// 	// 	type: 'option',
			// 	// 	multi: false,
			// 	// 	title: 'Show Modification History',
			// 	// 	iconClass: 'fas fa-list-alt mr-1',
			// 	// 	buttonClasses: ['btn', 'btn-outline-secondary'],
			// 	// 	contextMenuClasses: ['text-xs', 'text-secondary'],
			// 	// 	action: function (row) {
			// 	// 		let objAction = new Object();
			// 	// 		objAction.id = "showModificationHistoryTeacher" ;
			// 	// 		tableActions(objDataTable, objAction, false);
			// 	// 		console.log('Modification History Actions...');
			// 	// 	},
			// 	// 	// isHidden: function (row) {
			// 	// 	// 	return !(row.objectName != "");
			// 	// 	// },
			// 	// },
			// 	{
			// 		type: 'option',
			// 		multi: false,
			// 		title: 'Deletar',
			// 		iconClass: 'fas fa-trash-alt mr-1',
			// 		buttonClasses: ['btn', 'btn-outline-secondary'],
			// 		contextMenuClasses: ['text-xs', 'text-secondary'],
			// 		action: function (row) {
			// 			let objAction = new Object();
			// 			objAction.id = "deleteDiscipline";
			// 			tableActions(objDataTable, objAction, false);
			// 			console.log('Delete Actions...');
			// 		},
			// 		// isHidden: function (row) {
			// 		// 	return !(row.objectName != "");
			// 		// },
			// 	},
			// 	{
			// 		type: 'option',
			// 		multi: false,
			// 		title: 'Copiar',
			// 		iconClass: 'fas fa-copy mr-1',
			// 		buttonClasses: ['btn', 'btn-outline-secondary'],
			// 		contextMenuClasses: ['text-xs', 'text-secondary'],
			// 		action: function (row) {
			// 			let objAction = new Object();
			// 			objAction.id = "copyDiscipline" ;
			// 			tableActions(objDataTable, objAction, false,true);
			// 			console.log('Copy Actions...');
			// 		},
			// 		// isHidden: function (row) {
			// 		// 	return !(row.objectName != "");
			// 		// },
			// 	},
			// 	{
			// 		type: 'option',
			// 		multi: false,
			// 		title: 'Propriedades',
			// 		iconClass: 'fas fa-tools mr-1',
			// 		buttonClasses: ['btn', 'btn-outline-secondary'],
			// 		contextMenuClasses: ['text-xs', 'text-secondary'],
			// 		action: function (row) {
			// 			let objAction = new Object();
			// 			objAction.id = "propertiesDiscipline";
			// 			tableActions(objDataTable, objAction,false,true);
			// 			console.log('Properties Actions...');
			// 		},
			// 		// isHidden: function (row) {
			// 		// 	return !(row.objectName != "");
			// 		// },
			// 	}]
			// };

			// // And initialize our plugin
			// objDataTable.contextualActions(actionOptions);


			objDataTable.clear();
			objDataTable.rows.add(data2).draw();


			// if (objModal != null) {
			// 	objModal.modal('show');
			// }


			console.log("getScaleByFilterTable... finish 🔴");
			return
		},error: function(xhr, status, error){
            // Função executada em caso de erro
            console.error("Ocorreu um erro: " + status + " - " + error);
		}
	});

}

function saveScale(obj) {
	
	// console.log(obj);
	
	Pace.restart();
	//Pace.track(function () { })
	
	
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'scale' : JSON.stringify(obj) },
		datatype: "JSON",
		url: 'ajax/scaleSave',
		success: function (data) {
			
			console.log('saveScale finished 🔵');
			// console.log(data);
			
			data = JSON.parse(data);
			
			if (data.message === undefined || data.message == "" || data.message == null) {
				toastr.success('Salvo com sucesso', 'Escala: '+data.shdesc, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						
						location.href = 'scale';
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

//deleteTask
function deleteTask(btnRefresh, objDelete) {

	var objTask = new Object();

	objTask.taskID = parseInt($('#hidTaskID').val());
	objTask.actionType = $('#hidActionType').val();

	// console.log(objTask);return

	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		data: { 'task': JSON.stringify(objTask) },
		datatype: "JSON",
		url: 'ajax/taskDelete',
		success: function (data) {

			console.log("deleteTask... start 🔵");
			data = JSON.parse(data);
			console.log(data);

			if (data.message === undefined || data.message == "" || data.message == null) {
				if (btnRefresh != null) {
					toastr.success('Deletada com sucesso!', 'Function: ' + objDelete);
					btnRefresh.click();

				}

			} else {
				toastr.error(data.message);
			}
			console.log("deleteTask... finish 🔴");
			$('#modalDelete').modal('hide');


		}
	});

}

// getTaskByFilterForm propreties
function getTaskByFilterForm(objFilters) {

	Pace.restart();
	//Pace.track(function () { })
	// console.warn(objFilters);
	console.log("getTaskByFilterForm... start 🔵");
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'task': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/taskGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log(data, 'retorno');

			$.each(data, function (index, element) {

				// console.log(element);
				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
					$("#taskID").val(element.taskID);
				}

				// $("#taskID").val(element.taskID);
				// $('#baseYearID').removeAttr('disabled');
				// $("#taskID").val(element.taskID);
				$("#taskFullName").val(element.shdesc);
				$("#taskFgAtv").val(element.fgAtv);

				$("#taskCreatedBy").val((element.createdByFullName != null && element.createdByFullName != "" ? element.createdByFullName : element.createdBy));
				$("#taskCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#taskModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != "" ? element.modifiedByFullName : element.modifiedBy));
				$("#taskModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));

				$("#taskID").focus();

			});

			console.log("getTaskByFilterForm ... finish 🔴");
		}
	});

}

function getScaleByFilterAddUserModal(objFilters,objDataTable) {

	Pace.restart();
	console.log(objFilters);
	//Pace.track(function () { })
	console.log("getScaleByFilterAddModal... start 🔵");
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'user': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/userGetByFilterModal',
		global: false,
		success: function (data) {

			data = JSON.parse(data);

			console.log(data);	

			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
			}
			var data2 = data.filter(function (element) {

				return element;
			});

			objDataTable.clear();
			objDataTable.rows.add(data2).draw();


			console.log("getScaleByFilterAddModal... finish 🔴");

			return
		},error: function(xhr, status, error){
            // Função executada em caso de erro
            console.error("Ocorreu um erro: " + status + " - " + error);
		}
	});

}



function getScaleByFilterAddMusicModal(objFilters,objDataTable) {

	Pace.restart();
	console.log(objFilters);
	//Pace.track(function () { })
	console.log("getScaleByFilterAddMusicModal... start 🔵");
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'listMusic': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/listMusicGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);

			console.log(data);	

			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
			}
			var data2 = data.filter(function (element) {

				return element;
			});

			objDataTable.clear();
			objDataTable.rows.add(data2).draw();


			console.log("getScaleByFilterAddMusicModal... finish 🔴");

			return
		},error: function(xhr, status, error){
            // Função executada em caso de erro
            console.error("Ocorreu um erro: " + status + " - " + error);
		}
	});

}


