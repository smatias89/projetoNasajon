// console.log('disciplineDAO') 2802;

function saveMessageBip(objMessageBip) {
	
	// console.log(objMessageBip);
	
	Pace.restart();
	//Pace.track(function () { })
	
	//console.log(JSON.stringify(objUser));
	//return;
	
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'messageBip' : JSON.stringify(objMessageBip) },
		datatype: "JSON",
		url: 'ajax/messageBipSave',
		success: function (data) {
			
			console.log('messageBipSave finished');
			// console.log(data);
			
			data = JSON.parse(data); //toastr.warning('edit'); return
			
			// toastr.success('Professor Cadastrado'+data.fullName+' com sucesso', 'Professor');
			if (data.message === undefined || data.message == "" || data.message == null) {
				// console.log(data.fullName,'>>>>');
				toastr.success('Salvo com sucesso', 'Mensagem: '+data.subject, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						
						location.href = 'messageBip';
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

//getMessageBipByFilterTable 
function getMessageBipByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {
		
	Pace.restart();
	//Pace.track(function () { })
	// console.log(objFilters);
	console.log('getMessageBipByFilterTable run...');
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'messageBip' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBipGetByFilter',
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
				
				
			console.log("getMessageBipByFilterTable finished");
			return
	  }
	});
			
}


//deleteDiscipline
function deleteMessageBip(btnRefresh,objDelete) {
	
	var objMessageBip = new Object();
	
	objMessageBip.messageBipID = parseInt($('#hidMessageBipID').val());
	objMessageBip.actionType = $('#hidActionType').val();
	
	console.log(objMessageBip);

	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		data: {'messageBip' : JSON.stringify(objMessageBip) },
		datatype: "JSON",
		url: 'ajax/messageBipDelete',
		success: function (data) {
		
			// console.log('Mensagem Delete begin');
			data = JSON.parse(data);
			console.log(data);
			
			if (data.message === undefined || data.message == "" || data.message == null) {
				if (btnRefresh != null) {
					toastr.success('Deletada com sucesso!','Mensagem: '+objDelete);
					btnRefresh.click();
					
				} 

			} else {
				toastr.error(data.message);
			}
			console.log('Mensagem Delete finished');
			$('#modalDelete').modal('hide');// neste caso não pega $('#modalDelete').hide()
			
		
	  	}
	});
			
}

// getMessageBipByFilterForm propreties
function getMessageBipByFilterForm(objFilters) {
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'messageBip' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/messageBipGetByFilter',
		global: false,
		success: function (data) {
		
			data = JSON.parse(data);
			console.log(data);		
		
			
			$.each(data, function(index, element) {
				
				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
					$("#messageBipID").val(element.messageBipID);
					$('#divMessageBipID').show();	
					// console.log('set ID != Copy ... ');	
					console.log('propreties');				
				}else{
					$('#divMessageBipID').hide();
				}
					
				console.log('loader elements');	
				// $("#messageBipID").val(element.messageBipID);
				
				// console.log(element.recipient);
				$('#messageBipSender').show();
				$('#messageBipSender').val('De: '+element.createdByFullName)
				
				ajaxLoadComboAutocompleteGetAll = true;
				
				(async () => {

					console.log("waiting for ajaxLoadComboAutocompleteGetAll");
					while (ajaxLoadComboAutocompleteGetAll) {
						console.log('Not yet, waiting more');
						await new Promise(resolveLoadComboDisciplineGetAll => setTimeout(resolveLoadComboDisciplineGetAll, 1000));
					}
					let lstRecipientSelected = new Array();
					//seleciona os elementos do ajax e insere no obj
					$.each(element.lstRecipient, function (index, element2) {

						// console.log('element2 :>> ', element2);
						// lstRecipientSelected.push(element2.elementID);
						var objOption = {
							elementID : element2.elementID,
							shdesc : element2.shdesc
						}
						lstRecipientSelected.push(objOption);
					});
					// $("#messageBipRecipient").val(lstRecipientSelected).change();
					
					// $('#messageBipRecipient').empty().trigger('change');

					//limpa o caregameto completo do ajax
					$('#messageBipRecipient').empty().trigger('change');

					//lista os objetos ja selecionados no select
					$.each(lstRecipientSelected, function(index, element) {
						// console.log('element :>> ', element);
						
						// $('#messageBipRecipient').append('<option value="' + element.elementID + '">' + element.shdesc + '</option>'); 
						$('#messageBipRecipient').append(new Option(element.shdesc,element.elementID)); //new Option(text,value)
					});
					var lstRecipientValue =[]

					$.each(lstRecipientSelected, function(index, element) {
						// console.log('element :>> ', element);
						lstRecipientValue.push(element.elementID);
						
					});
					$("#messageBipRecipient").val(lstRecipientValue).change();

					console.log("ajaxLoadComboAutocompleteGetAll is defined");


				})();

				var ajaxLoadComboAutocompleteGetAll = false

				
				$('#messageBipSalvar').hide();
				$('#messageBipRecipient,#messageBipSubject').prop('disabled', true);
				$("#messageBipSubject").val(element.subject);	
				// $("#messageBipSubject").val(element.importance);
				if(element.importance == '1'){
					$('#customCheckbox1').prop('checked', true);
				} else if(element.importance == '2'){
					$('#customCheckbox2').prop('checked', true);
				} else if(element.importance == '3'){
					$('#customCheckbox3').prop('checked', true);
				}

				$('#messageBipShdesc').val(element.shdesc);
				$('#messageBipShdesc').summernote('code', element.shdesc + '<br><br><br><br>'); // campo de texto da mensagem
				$('#messageBipFgAtv').val(element.fgAtv);
				$('#messageBipFgDraft').val(element.flgDraft);
				
				$("#messageBipCreatedBy").val((element.createdByFullName != null && element.createdByFullName != ""?element.createdByFullName:element.createdBy));
				$("#messageBipCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#messageBipModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != ""?element.modifiedByFullName:element.modifiedBy));
				$("#messageBipModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));
			
				$("#messageBipID").focus();

			});

		console.log("getUserByFilter finished");
	  }
	});
			
}

