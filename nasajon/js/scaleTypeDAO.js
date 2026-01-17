

//getScaleTypeByFilterTable 
function getScaleTypeByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	console.log("getScaleTypeByFilterTable... start 🔵");
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'scaleType': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/scaleTypeGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);

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


			console.log("getScaleTypeByFilterTable... finish 🔴");
			return
		},error: function(xhr, status, error){
            // Função executada em caso de erro
            console.error("Ocorreu um erro: " + status + " - " + error);
		}
	});

}

function saveScaleType(obj) {
	
	// console.log(obj);return
	
	Pace.restart();
	//Pace.track(function () { })
	
	console.log("saveScaleType... start 🔵");
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'scaleType' : JSON.stringify(obj) },
		datatype: "JSON",
		url: 'ajax/scaleTypeSave',
		success: function (data) {
			
			
			// console.log(data);
			
			data = JSON.parse(data);
			
			if (data.message === undefined || data.message == "" || data.message == null) {
				toastr.success('Salvo com sucesso', 'Função: '+data.shdesc, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						
						location.href = 'scaleType';
						return

					}
				});
			
			} else {
				toastr.error(data.message);
			}
			console.log("saveScaleType... finish 🔴");
			return
		

			//$('#modalDelete').modal('hide');
		
		}
	});
			
}

//deleteScaleType
function deleteScaleType(btnRefresh, objDelete) {

	var objScaleType = new Object();

	objScaleType.scaleTypeID = parseInt($('#hidScaleTypeID').val());
	objScaleType.actionType = $('#hidActionType').val();

	// console.log(objScaleType);return

	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		data: { 'scaleType': JSON.stringify(objScaleType) },
		datatype: "JSON",
		url: 'ajax/scaleTypeDelete',
		success: function (data) {

			console.log("deletescaleType... start 🔵");
			data = JSON.parse(data);
			console.log(data);

			if (data.message === undefined || data.message == "" || data.message == null) {
				if (btnRefresh != null) {
					toastr.success('Deletada com sucesso!', 'Evento: ' + objDelete);
					btnRefresh.click();

				}

			} else {
				toastr.error(data.message);
			}
			console.log("deletescaleType... finish 🔴");
			$('#modalDelete').modal('hide');


		},error: function(xhr, status, error){
            // Função executada em caso de erro
            console.error("Ocorreu um erro: " + status + " - " + error);
		}
	});

}

// getTaskByFilterForm propreties
function getScaleTypeByFilterForm(objFilters) {

	Pace.restart();
	//Pace.track(function () { })
	// console.warn(objFilters);
	console.log("getScaleTypeByFilterForm... start 🔵");
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'scaleType': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/scaleTypeGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			// console.log(data, 'retorno');

			$.each(data, function (index, element) {

				// console.log(element);
				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
					$("#scaleTypeID").val(element.scaleTypeID);
				}

				// $("#scaleTypeID").val(element.scaleTypeID);
				// $('#baseYearID').removeAttr('disabled');
				// $("#scaleTypeID").val(element.scaleTypeID);
				$("#scaleTypeFullName").val(element.shdesc);
				$("#scaleTypeFgAtv").val(element.fgAtv);

				$("#scaleTypeCreatedBy").val((element.createdByFullName != null && element.createdByFullName != "" ? element.createdByFullName : element.createdBy));
				$("#scaleTypeCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#scaleTypeModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != "" ? element.modifiedByFullName : element.modifiedBy));
				$("#scaleTypeModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));

				$("#scaleTypeID").focus();

			});

			console.log("getScaleTypeByFilterForm ... finish 🔴");
		}
	});

}








