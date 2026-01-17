// console.log('disciplineDAO') 2802;

//getGroupMessageByFilterTable 
function getGroupMessageByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {
		
	Pace.restart();
	//Pace.track(function () { })
	console.log("getGroupMessageByFilterTable run... ");
	// console.log(objFilters);
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'groupMessage' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/groupMessageGetByFilter',
		global: false,
		success: function (data) {
		
			data = JSON.parse(data);
			
			// console.log(data);	
			if(data.length == 0){
				toastr.warning('Resultado não encontrado','Atenção!');
			}
			var data2 = data.filter(function(element) {	
				
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
				
				
			console.log("getGroupMessageByFilterTable finished");
			return
	  }
	});
			
}

function saveGroupMessage(objGroupMessage) {
	
	// console.log(objDiscipline);
	
	Pace.restart();
	//Pace.track(function () { })
	
	//console.log(JSON.stringify(objUser));
	//return;
	
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'groupMessage' : JSON.stringify(objGroupMessage) },
		datatype: "JSON",
		url: 'ajax/groupMessageSave',
		success: function (data) {
			
			console.log('groupMessage finished');
			// console.log(data);
			
			data = JSON.parse(data); 
			
			// toastr.success('Professor Cadastrado'+data.fullName+' com sucesso', 'Professor');
			if (data.message === undefined || data.message == "" || data.message == null) {
				// console.log(data.fullName,'>>>>');
				toastr.success('Salvo com sucesso', 'Grupo: '+data.shdesc, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						
						location.href = 'groupMessage';
						return

					}
				});
			
			} else {
				toastr.error(data.message);
			}
			return //toastr.warning('editando...'); return;
		

		//$('#modalDelete').modal('hide');
		
		}
	});
			
}


//modal
function getGroupMemberByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {
		
	Pace.restart();
	//Pace.track(function () { })
	// console.log('objDataTable :>> ', objDataTable);
	// console.log('objFilters :>> ', objFilters);
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'groupMember' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/groupMemberGetByFilter',
		global: false,
		success: function (data) {
		
			var data = JSON.parse(data);

			console.log('Loading data... ');
			// console.log(data);
			
				
			objDataTable.clear();
			objDataTable.rows.add(data).draw();
			
			
			// if (objModal != null) {
				// 	objModal.modal('show');
				// }
				
				
			console.log("getGroupMemberByFilterTable finished");
			return
	  }
	});
			
}

//deleteGroupMessage
function deleteGroupMessage(btnRefresh,objDelete) {
	
	var objGroupMessage = new Object();
	
	objGroupMessage.groupMessageID = parseInt($('#hidGroupMessageID').val());
	objGroupMessage.actionType = $('#hidActionType').val();
	
	// console.log(objGroupMessage);

	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		data: {'groupMessage' : JSON.stringify(objGroupMessage) },
		datatype: "JSON",
		url: 'ajax/groupMessageDelete',
		success: function (data) {
		
			
			// data = JSON.parse(data);
			// console.log(data);
			
			if (data.message === undefined || data.message == "" || data.message == null) {
				if (btnRefresh != null) {
					toastr.success('Deletada com sucesso!','Grupo: '+objDelete);
					btnRefresh.click();
					
				} 

			} else {
				toastr.error(data.message);
			}
			console.log('GroupMessage Delete finished');
			$('#modalDelete').modal('hide');// neste caso não pega $('#modalDelete').hide()
			
		
	  	}
	});
			
}

// getGroupMessageByFilterForm propreties
function getGroupMessageByFilterForm(objFilters) {
	
	Pace.restart();
	//Pace.track(function () { })
	// console.log('objFilters :>> ', objFilters);
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'groupMessage' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/groupMessageGetByFilter',
		global: false,
		success: function (data) {
		
			data = JSON.parse(data);
			// console.log(data,'retorno');		
			
			$.each(data, function(index, element) {
				
				console.log('Loading element... ');
				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
					$("#groupMessageID").val(element.groupMessageID);					
				}
					
				// console.log('PROPRETIES');	
				$("#groupMessageID").val(element.groupMessageID);	
				$("#groupMessageName").val(element.shdesc);	
				$("#groupMessageFgAtv").val(element.fgAtv);	
				
				$("#groupMessageCreatedBy").val((element.createdByFullName != null && element.createdByFullName != ""?element.createdByFullName:element.createdBy));
				$("#groupMessageCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#groupMessageModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != ""?element.modifiedByFullName:element.modifiedBy));
				$("#groupMessageModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));

				
				var tableGroupMember= $('#groupMemberTable').DataTable();
				var dataRows = element.lstGroupMember
				var arrayTratament = dataRows.map(element => { 
					console.log('add rows... ');
					return {
						userID:element.userID,
						fullName:element.fullName,
						cpf:element.cpf,
						email:element.email
					};
				});
				// console.log(arrayTratament);
				tableGroupMember.rows.add(arrayTratament).draw();
			
				$("#getGroupMessageByFilterForm").focus();
				
				$('#btnToolTableGroupMember').click();

			});

		console.log("getGroupMessageByFilterForm finished");
	  }
	});
			
}








