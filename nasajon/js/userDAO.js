// //saveUser
function saveUser(objUser) {

	console.log(objUser);

	Pace.restart();
	//Pace.track(function () { })

	//console.log(JSON.stringify(objUser));

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'user': JSON.stringify(objUser) },
		datatype: "json",
		url: 'ajax/userSave',
		success: function (data) {

			console.log('userSave finished');
			
			data = JSON.parse(data);
			// console.log(data);

			if (data.message === undefined || data.message == null || data.message == "") {

				toastr.success('User was saved successfully', 'User', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function () {
						/*if (objUser.userID == "0") {
							closeActiveTab("user-new");
						} else {
							closeActiveTab("user-" + objUser.userID);
						}*/
						location.href = "user";
					}
				});

			} else {
				toastr.error(data.message);
			}

			//$('#modalDelete').modal('hide');

		},error: function(xhr, status, error){
            // Função executada em caso de erro
            console.error("Ocorreu um erro: " + status + " - " + error);
        },
        complete: function(xhr, status){
            // Função executada sempre no final (independentemente do sucesso ou erro)
            console.log("A requisição foi concluída.");
        },

		// error: OnError
		
	});

}

// function linkUser(objUser, btnSave) {

// 	//console.log(objUser);

// 	Pace.restart();
// 	//Pace.track(function () { })

// 	//console.log(JSON.stringify(objUser));
// 	//return;

// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 'user': JSON.stringify(objUser) },
// 		datatype: "JSON",
// 		url: 'ajax/userLink',
// 		success: function (data) {

// 			console.log('userLink finished');
// 			//console.log(data);

// 			data = JSON.parse(data);




// 			if (data.message === undefined || data.message == null || data.message == "") {

// 				toastr.success('Link was saved successfully', 'Link for User...', {
// 					timeOut: 2000,
// 					preventDuplicates: true,
// 					positionClass: 'toast-top-right',
// 					// Redirect 
// 					onHidden: function () {
// 						/*if (objUser.userID == "0") {
// 							closeActiveTab("user-new");
// 						} else {
// 							closeActiveTab("user-" + objUser.userID);
// 						}*/
// 						// location.href = "user";
// 						btnSave.click();
// 					}
// 				});

// 			} else {
// 				toastr.error(data.message);
// 			}

// 			//$('#modalDelete').modal('hide');

// 		},
// 		error: OnError
// 	});

// }

function getUserByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {
		
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'user' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/userGetByFilter',
		global: false,
		success: function (data) {
		
			console.log(data);		
		data = JSON.parse(data);
		
		var data2 = data.filter(function(element) {	

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
		// 				// let tableID = objDataTable.table().node().id;
		// 				strTmp = objDataTable.row($("#" + tableID + " tr.selected")).data();
		// 				// console.log(strTmp);
		// 				var name = strTmp.fullName;
		// 				var liste = name.split(' ');
		// 				// console.log(liste);

		// 				if (strTmp.fullName !== '')
		// 					return 'Usuário: ' + liste[0] + ' ' + liste[1] + ' ' + liste[2];

		// 				else if (strTmp.teacherID !== '')
		// 					return strTmp.userID;

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
		// 	// 		objAction.id = "showModificationHistoryUser" ;
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
		// 		title: 'Delete',
		// 		iconClass: 'fas fa-trash-alt mr-1',
		// 		buttonClasses: ['btn', 'btn-outline-secondary'],
		// 		contextMenuClasses: ['text-xs', 'text-secondary'],
		// 		action: function (row) {
		// 			let objAction = new Object();
		// 			objAction.id = "deleteUser";
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
		// 		title: 'Copy',
		// 		iconClass: 'fas fa-copy mr-1',
		// 		buttonClasses: ['btn', 'btn-outline-secondary'],
		// 		contextMenuClasses: ['text-xs', 'text-secondary'],
		// 		action: function (row) {
		// 			let objAction = new Object();
		// 			objAction.id = "copyUser" ;
		// 			tableActions(objDataTable, objAction, false);
		// 			console.log('Copy Actions...');
		// 		},
		// 		// isHidden: function (row) {
		// 		// 	return !(row.objectName != "");
		// 		// },
		// 	},
		// 	{
		// 		type: 'option',
		// 		multi: false,
		// 		title: 'Properties',
		// 		iconClass: 'fas fa-tools mr-1',
		// 		buttonClasses: ['btn', 'btn-outline-secondary'],
		// 		contextMenuClasses: ['text-xs', 'text-secondary'],
		// 		action: function (row) {
		// 			let objAction = new Object();
		// 			objAction.id = "propertiesUser";
		// 			tableActions(objDataTable, objAction,false);
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

		if (objModal != null) {
			objModal.modal('show');
		}
		
		
		console.log("getUserByFilterTable finished");
	  },
	  error: OnError
	});
			
}

// //getUserByFilterForm
function getUserByFilterForm(objFilters) {

	Pace.restart();
	//Pace.track(function () { })
	// console.log(objFilters);

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'user': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/userGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			// console.log(data);
			
			$.each(data, function (index, element) {

				console.log('Loading element...');
				console.log(element);

				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy")
					$("#userID").val(element.userID);

				// $("#userLogin").val(element.login).change();
				$("#userCPF").val(maskCPF(element.cpf));
				$("#userFullName").val(element.fullName);
				$("#userEmail").val(element.email);
				$("#userFgAtv").val(element.fgAtv);

				(async () => {
					console.log("waiting for ajaxLoadComboProfileGetAll");
					while (ajaxLoadComboProfileGetAll) {
						console.log('Not yet, waiting more');
						await new Promise(resolveLoadComboProfileGetAll => setTimeout(resolveLoadComboProfileGetAll, 1000));
					}

					let lstProfileSelected = new Array();
					$.each(element.lstProfile, function (index, element2) {
						lstProfileSelected.push(element2.profileID);
					});
					$("#userProfile").val(lstProfileSelected).change();
					console.log("ajaxLoadComboProfileGetAll is defined");
				})();



				(async () => {
					console.log("waiting for ajaxLoadComboTaskGetAll");
					while (ajaxLoadComboTaskGetAll) {
						console.log('Not yet, waiting more');
						await new Promise(resolveLoadComboTaskGetAll => setTimeout(resolveLoadComboTaskGetAll, 1000));
					}

					let lstTaskSelected = new Array();
					$.each(element.lstTask, function (index, element2) {
						console.log('element2: ',element2);
						lstTaskSelected.push(element2.taskID);
					});
					$("#userTask").val(lstTaskSelected).change();
					console.log("ajaxLoadComboTaskGetAll is defined");
				})();


				
				$("#userPassword").val(element.password);
				$("#userPhone1").val(maskTel(element.phone1));
				$("#userPhone2").val(maskTel(element.phone2));
				
				// $("#userIntervalDaysToExpire").val(element.intervalDaysToExpire);
				// $("#userExpirationDate").val((element.expirationDate == null || element.expirationDate == "" ? "" : moment(element.expirationDate).format(TO_PATTERN_DATE)));
				// $("#userLastAccess").val((element.lastAccess == null || element.lastAccess == "" ? "" : moment(element.lastAccess).format(TO_PATTERN_DATETIME)));
				// $("#userFgChangePassword").val(element.fgChangePassword);
				// $("#userSocialName").val(element.socialName);
				// $("#userIncomeRange").val(element.incomeRangeID);

				if (element.birthDate != null && element.birthDate != "") {
					$('#userBirthDate').data('daterangepicker').setStartDate(moment(element.birthDate).format(TO_PATTERN_DATE));
					$('#userBirthDate').data('daterangepicker').setEndDate(moment(element.birthDate).format(TO_PATTERN_DATE));
				}

				$("#userGender").val(element.genderID);

				// if (element.userAddress != null) {
				// 	$("#endCEP").val(maskCEP(element.userAddress.cep));
				// 	$("#endStreet").val(element.userAddress.street);
				// 	$("#endStreetNumber").val(element.userAddress.streetNumber);
				// 	$("#endStreetComplement").val(element.userAddress.streetComplement);
				// 	$("#endDistrict").val(element.userAddress.district);
				// 	$("#endCity").val(element.userAddress.city);
				// 	$("#endUF").val(element.userAddress.uf);
				// 	$("#endCodIBGE").val(element.userAddress.codIBGE);
				// }

				$("#userCreatedBy").val((element.createdByFullName != null && element.createdByFullName != "" ? element.createdByFullName : element.createdBy));
				$("#userCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#userModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != "" ? element.modifiedByFullName : element.modifiedBy));
				$("#userModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));

				$("#userID").focus();
			});

			console.log("getUserByFilter finished");
		},
		error: OnError
	});

}


// //deleteUser

// function deleteUser(btnRefresh, objDelete) {

// 	var objParameters = new Object();

// 	objParameters.userID = parseInt($('#hidUserID').val());
// 	objParameters.actionType = $('#hidActionType').val();


// 	//console.log(objParameters);

// 	Pace.restart();
// 	//Pace.track(function () { })

// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 'user': JSON.stringify(objParameters) },
// 		datatype: "JSON",
// 		url: 'ajax/userDelete',
// 		success: function (data) {

// 			console.log('userDelete finished');
// 			data = JSON.parse(data);
// 			console.log(data);

// 			if (data.message === undefined || data.message == "" || data.message == null) {
// 				if (btnRefresh != null) {
// 					toastr.success('Deletada com sucesso!', 'Usuário: ' + objDelete);
// 					btnRefresh.click();

// 				}
// 			} else {
// 				toastr.error(data.message);
// 			}

// 			$('#modalDelete').modal('hide');

// 		}
// 	});

// }

// //linkUser




//getUserByFilterTable


// //getUserModificationHistory
// function getUserModificationHistory(objUser) {

// 	$('#tblModificationHistory').html("");
	
// 	Pace.restart();
// 	//Pace.track(function () { })
	
// 	$.ajax({
// 		type: "POST",
// 		contentType: "application/json; charset=utf-8",	  
// 		data: JSON.stringify(objUser),
// 		datatype: "json",
// 		url: 'servlet/userGetModificationHistory',
// 		success: function (data) {
		
// 		console.log('result below');
// 		//console.log(data);
		
// 		tblModificationHistory = $('#tblModificationHistory').DataTable({
// 			destroy: true
// 			,scrollX: true
// 			,data: data,
// 			columnDefs: [{
// 					orderable: false,
// 					className: 'select-checkbox',
// 					targets:   0,
// 					data: null
// 				}, 
// 				{
// 				orderable: true,
// 				targets:   4,
// 				render: function (value) {
// 							 if (value === null) return "";
// 							return moment(value).format(TO_PATTERN_DATETIME);
// 						}
// 				}			
// 				,{
// 				orderable: true,
// 				targets:   6,
// 				render: function (value) {
// 							 if (value === null) return "";
// 							return moment(value).format(TO_PATTERN_DATETIME);
// 						}            
// 				}],
// 			rowId: 'modifiedDate',
// 			dom:
// 					"<'row'<'col-sm-3'l><'offset-sm-2 col-sm-1 text-center divUserModificationHistoryDropdown btn-group'><'col-sm-1 text-center divUserModificationHistoryRefresh'><'col-sm-1 text-right divUserModificationHistoryMaxRowsLabel'><'col-sm-1 text-left divUserModificationHistoryMaxRowsInput'><'col-sm-3'f>>" +
// 					"<'row'<'col-sm-12'tr>>" +
// 					"<'row'<'col-sm-5'i><'col-sm-7'p>>", 				      		
// 			select: {
// 				style:    'os',
// 				selector: 'td:first-child'
// 			},
// 			fixedHeader: true,	
// 			bAutoWidth: false,
// 			order: [[ 6, 'desc' ]],
// 			columns: [		
// 				{ data: null, defaultContent: '', width: "5%"},			
// 				{ data: 'userID', title: "ID", width: "5%" },
// 				{ data: 'login', title: "Name", width: "50%" },
// 				{ data: 'createdByFullName', title: "Created By", width: "10%" },
// 				{ data: 'createdDate', title: "Created Date", width: "10%" },
// 				{ data: 'modifiedByFullName', title: "Modified By", width: "10%" },
// 				{ data: 'modifiedDate', title: "Modified Date", width: "10%" }									
// 				]
// 		});
		
// 		$('#tblModificationHistory tbody').on( 'click', 'tr', function () {
// 			if ( $(this).hasClass('selected') ) {
// 				$(this).removeClass('selected');
// 			}
// 			else {
// 				tblModificationHistory.$('tr.selected').removeClass('selected');
// 				$(this).addClass('selected');
// 			};
			
// 			if (tblModificationHistory.rows('.selected').any() && $('#btnUserModificationHistoryAction').hasClass('disabled')) {			
// 				$('#divUserModificationHistoryActionOptions').html(
// 					  ' <a class="dropdown-item text-xs" href="#" id="showUser"><i class="far fa-file-alt mr-1"></i> Show User</a>');	
					
// 					$("#showUser").on( "click", function(event) {
// 						tableModificationHistoryActions(tblModificationHistory, this);
// 					});

// 				$('#btnUserModificationHistoryAction').removeClass('disabled btn-default');
// 				$('#btnUserModificationHistoryAction').addClass('btn-info');
// 			} else if (!tblModificationHistory.rows('.selected').any() && !$('#btnUserModificationHistoryAction').hasClass('disabled')) {				
// 				$('#btnUserModificationHistoryAction').removeClass('btn-info');
// 				$('#btnUserModificationHistoryAction').addClass('disabled btn-default');
// 			};
// 		} );

// 		$('.divUserModificationHistoryDropdown').html('<button class="btn btn-default btn-xs dropdown-toggle disabled" type="button" id="btnUserModificationHistoryAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
// 			'Actions' +
// 		'</button>' +
// 		'<div class="dropdown-menu" aria-labelledby="btnUserModificationHistoryAction" id="divUserModificationHistoryActionOptions">' +							 					  
// 		'</div>');

// 		$('.divUserModificationHistoryRefresh').html('<button type="button" class="btn btn-block btn-info btn-xs h-100" id="userModificationHistoryRefresh">&nbsp;&nbsp;Refresh</button>');

// 		$('.divUserModificationHistoryMaxRowsLabel').html('<label class="col-form-label text-xs">Max Rows:</label>');

// 		$('.divUserModificationHistoryMaxRowsInput').html('<input type="text" class="form-control text-xs h-60" id="showModificationHistoryMaxRows" placeholder="100" value="' + objUser.maxRows + '">');	
		
// 		$("#userModificationHistoryRefresh").click(function () {

// 			objUser.maxRows = $('#showModificationHistoryMaxRows').val();
		
// 			//console.log(objFilters);
// 			getUserModificationHistory(objUser);
// 		});

// 		$('#showModificationHistoryMaxRows').keypress(function(event) {
// 			if (event.key === "Enter") {
				
// 				objUser.maxRows = $('#showModificationHistoryMaxRows').val();
		
// 				//console.log(objFilters);
// 				getUserModificationHistory(objUser);
// 			}
// 		});	

// 		$('.modal-title-modification-history').text('User - History Modification - ' + objUser.login);
// 		$('#modalShowModificationHistory').modal('show');

// 		console.log("getUserModificationHistory finished");
// 	  }
// 	});				

// }











