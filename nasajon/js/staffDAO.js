//saveStaff
function saveStaff(objStaff) {

	//console.log(objStaff);

	Pace.restart();
	//Pace.track(function () { })

	//console.log(JSON.stringify(objStaff));
	//return;

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'staff': JSON.stringify(objStaff) },
		datatype: "JSON",
		url: 'ajax/staffSave',
		success: function (data) {

			console.log('staffSave finished');
			// console.log(data);

			data = JSON.parse(data);

			if (data.message === undefined || data.message == null || data.message == "") {

				toastr.success('Usuário salvo com sucesso', 'Usuário: ' + data.fullName, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function () {
						/*if (objStaff.staffID == "0") {
							closeActiveTab("staff-new");
						} else {
							closeActiveTab("staff-" + objStaff.staffID);
						}*/
						location.href = "staff";
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

//deleteStaff
function deleteStaff(btnRefresh,objDelete) {
	
	var objParameters = new Object();
	
	objParameters.staffID = parseInt($('#hidStaffID').val());
	objParameters.actionType = $('#hidActionType').val();

	console.log(objParameters);
	// return;
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'staff' : JSON.stringify(objParameters) },
		datatype: "JSON",
		url: 'ajax/staffDelete',
		success: function (data) {
				
		console.log('staffDelete finished');
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
			
}

//getStaffByFilterForm
function getStaffByFilterForm(objFilters) {
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'staff' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/staffGetByFilter',
		global: false,
		success: function (data) {
		
		//console.log(data);		
		data = JSON.parse(data);
		console.log('Loading data...');
		// console.log(data);
		$.each(data, function(index, element) {
			
			//console.log(element);
			//console.log("staffID -> " + element.staffID + "; staffName -> " + element.staffName);

			if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
				$("#staffID").val(element.staffID);	
				$("#userID").val(element.userID);	
			}
			
			$("#staffFullName").val(element.fullName).change();		
			$("#staffSegment").val(element.staffSegmentID).change();		
			$("#staffEmail").val(element.email);
			$("#staffCPF").val(maskCPF(element.cpf));
			$("#staffSocialName").val(element.socialName);
			$("#staffIncomeRange").val(element.incomeRangeID);

			if (element.birthDate != null && element.birthDate != "") {
				$('#staffBirthDate').data('daterangepicker').setStartDate(moment(element.birthDate).format(TO_PATTERN_DATE));
				$('#staffBirthDate').data('daterangepicker').setEndDate(moment(element.birthDate).format(TO_PATTERN_DATE));
			}

			$("#staffMotherName").val(element.motherName);
			$("#staffFatherName").val(element.fatherName);
			$("#staffGender").val(element.genderID);
			$("#staffPhone1").val(maskTel(element.phone1));
			$("#staffPhone2").val(maskTel(element.phone2));

			if (element.userAddress != null) {
				$("#endCEP").val(maskCEP(element.userAddress.cep));
				$("#endStreet").val(element.userAddress.street);
				$("#endStreetNumber").val(element.userAddress.streetNumber);
				$("#endStreetComplement").val(element.userAddress.streetComplement);
				$("#endDistrict").val(element.userAddress.district);
				$("#endCity").val(element.userAddress.city);
				$("#endUF").val(element.userAddress.uf);
				$("#endCodIBGE").val(element.userAddress.codIBGE);
			}			
			
			$("#staffCreatedBy").val((element.createdByFullName != null && element.createdByFullName != ""?element.createdByFullName:element.createdBy));
			$("#staffCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
			$("#staffModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != ""?element.modifiedByFullName:element.modifiedBy));
			$("#staffModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));
			
			$("#staffID").focus();
		});

		console.log("getStaffByFilter finished");
	  }
	});
			
}

//getStaffByFilterTable
function getStaffByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {
		
	Pace.restart();
	//Pace.track(function () { })
	// console.log(objFilters);
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'staff' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/staffGetByFilter',
		global: false,
		success: function (data) {
		
		//console.log(data);		
		console.log('Loading data...');		
		data = JSON.parse(data);

		if(data.length == 0){
			toastr.warning('Resultado não encontrado','Atenção!');
		}
		
		var data2 = data.filter(function(element) {	

			if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {	
				//console.log("element.staffID: " + element.staffID);
				//console.log("$.inArray(element.staffID, lstExclusion): " + $.inArray(element.staffID, lstExclusion));				
				return $.inArray(element.staffID, lstExclusion) == -1; 
			} else 
				return element;
		 });

		var actionOptions = {
			iconPrefix: 'fad fa-fw',
			classes: [],
			contextMenu: {
				enabled: true,
				isMulti: false,
				xoffset: -10,
				yoffset: -10,
				showSpeed: '0.50s',
				headerRenderer: function (row) {

					$('.dropdown-header').addClass('text-xs');
					
					let tableID = objDataTable.table().node().id;
					// console.log(objDataTable.rows().length);
					// console.log(objDataTable.row($("#" + tableID + " tr.selected")).data());
					if (objDataTable.rows().length > 1) {

						// For when we have contextMenu.isMulti enabled and have more than 1 row selected
						return objDataTable.rows().length + ' people selected';

					} else {

						// let tableID = objDataTable.table().node().id;
						strTmp = objDataTable.row($("#" + tableID + " tr.selected")).data();
						// console.log(strTmp);
						
						if (strTmp.login !== '')
							return strTmp.login;

						else if (strTmp.staffID !== '')
							return strTmp.staffID;

						// else 
						// 	return row.objectType;

						
					}
				},
				headerIsFollowedByDivider: true,
				showStaticOptions: false
			},
			buttonList: {
				enabled: false,
				iconOnly: true,
				containerSelector: '#my-button-container',
				groupClass: 'btn-group',
				disabledOpacity: 0.0,
				dividerSpacing: 10,
			},
			deselectAfterAction: false,
			items: [// A normally hidden option that only appears for even rows. Do not render as a button/menu option unless the selected items adhere
			{
				type: 'option',
				multi: false,
				title: 'Show Modification History',
				iconClass: 'fas fa-list-alt mr-1',
				buttonClasses: ['btn', 'btn-outline-secondary'],
				contextMenuClasses: ['text-xs', 'text-secondary'],
				action: function (row) {
					let objAction = new Object();
					objAction.id = "showModificationHistoryStaff" ;
					tableActions(objDataTable, objAction, false);
					console.log('Modification History Actions...');
				},
				// isHidden: function (row) {
				// 	return !(row.objectName != "");
				// },
			},
			{
				type: 'option',
				multi: false,
				title: 'Delete',
				iconClass: 'fas fa-trash-alt mr-1',
				buttonClasses: ['btn', 'btn-outline-secondary'],
				contextMenuClasses: ['text-xs', 'text-secondary'],
				action: function (row) {
					let objAction = new Object();
					objAction.id = "deleteStaff";
					tableActions(objDataTable, objAction, false);
					console.log('Delete Actions...');
				},
				// isHidden: function (row) {
				// 	return !(row.objectName != "");
				// },
			},
			{
				type: 'option',
				multi: false,
				title: 'Copy',
				iconClass: 'fas fa-copy mr-1',
				buttonClasses: ['btn', 'btn-outline-secondary'],
				contextMenuClasses: ['text-xs', 'text-secondary'],
				action: function (row) {
					let objAction = new Object();
					objAction.id = "copyStaff" ;
					tableActions(objDataTable, objAction, false,true);
					console.log('Copy Actions...');
				},
				// isHidden: function (row) {
				// 	return !(row.objectName != "");
				// },
			},
			{
				type: 'option',
				multi: false,
				title: 'Properties',
				iconClass: 'fas fa-tools mr-1',
				buttonClasses: ['btn', 'btn-outline-secondary'],
				contextMenuClasses: ['text-xs', 'text-secondary'],
				action: function (row) {
					let objAction = new Object();
					objAction.id = "propertiesStaff";
					tableActions(objDataTable, objAction,false,true);
					console.log('Properties Actions...');
				},
				// isHidden: function (row) {
				// 	return !(row.objectName != "");
				// },
			}]
		};

		// And initialize our plugin
		objDataTable.contextualActions(actionOptions);

		objDataTable.clear();
		objDataTable.rows.add(data2).draw();

		if (objModal != null) {
			objModal.modal('show');
		}
		
		
		console.log("getStaffByFilterTable finished");
	  }
	});
			
}

//getStaffModificationHistory
function getStaffModificationHistory(objStaff) {

	$('#tblModificationHistory').html("");
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: {'staff' : JSON.stringify(objStaff) },
		datatype: "JSON",
		url: 'ajax/staffGetModificationHistory',
		success: function (data) {
		
		console.log('result below');
		//console.log(data);
		
		tblModificationHistory = $('#tblModificationHistory').DataTable({
			destroy: true
			,scrollX: true
			,data: data,
			columnDefs: [{
					orderable: false,
					className: 'select-checkbox',
					targets:   0,
					data: null
				}, 
				{
				orderable: true,
				targets:   4,
				render: function (value) {
							 if (value === null) return "";
							return moment(value).format(TO_PATTERN_DATETIME);
						}
				}			
				,{
				orderable: true,
				targets:   6,
				render: function (value) {
							 if (value === null) return "";
							return moment(value).format(TO_PATTERN_DATETIME);
						}            
				}],
			rowId: 'modifiedDate',
			dom:
					"<'row'<'col-sm-3'l><'offset-sm-2 col-sm-1 text-center divStaffModificationHistoryDropdown btn-group'><'col-sm-1 text-center divStaffModificationHistoryRefresh'><'col-sm-1 text-right divStaffModificationHistoryMaxRowsLabel'><'col-sm-1 text-left divStaffModificationHistoryMaxRowsInput'><'col-sm-3'f>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>", 				      		
			select: {
				style:    'os',
				selector: 'td:first-child'
			},
			fixedHeader: true,	
			bAutoWidth: false,
			order: [[ 6, 'desc' ]],
			columns: [		
				{ data: null, defaultContent: '', width: "5%"},			
				{ data: 'staffID', title: "ID", width: "5%" },
				{ data: 'staffName', title: "Name", width: "50%" },
				{ data: 'createdByFullName', title: "Created By", width: "10%" },
				{ data: 'createdDate', title: "Created Date", width: "10%" },
				{ data: 'modifiedByFullName', title: "Modified By", width: "10%" },
				{ data: 'modifiedDate', title: "Modified Date", width: "10%" }									
				]
		});
		
		$('#tblModificationHistory tbody').on( 'click', 'tr', function () {
			if ( $(this).hasClass('selected') ) {
				$(this).removeClass('selected');
			}
			else {
				tblModificationHistory.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			};
			
			if (tblModificationHistory.rows('.selected').any() && $('#btnStaffModificationHistoryAction').hasClass('disabled')) {			
				$('#divStaffModificationHistoryActionOptions').html(
					  ' <a class="dropdown-item text-xs" href="#" id="showStaff"><i class="far fa-file-alt mr-1"></i> Show Staff</a>');	
					
					$("#showStaff").on( "click", function(event) {
						tableModificationHistoryActions(tblModificationHistory, this);
					});

				$('#btnStaffModificationHistoryAction').removeClass('disabled btn-default');
				$('#btnStaffModificationHistoryAction').addClass('btn-info');
			} else if (!tblModificationHistory.rows('.selected').any() && !$('#btnStaffModificationHistoryAction').hasClass('disabled')) {				
				$('#btnStaffModificationHistoryAction').removeClass('btn-info');
				$('#btnStaffModificationHistoryAction').addClass('disabled btn-default');
			};
		} );

		$('.divStaffModificationHistoryDropdown').html('<button class="btn btn-default btn-xs dropdown-toggle disabled" type="button" id="btnStaffModificationHistoryAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
			'Actions' +
		'</button>' +
		'<div class="dropdown-menu" aria-labelledby="btnStaffModificationHistoryAction" id="divStaffModificationHistoryActionOptions">' +							 					  
		'</div>');

		$('.divStaffModificationHistoryRefresh').html('<button type="button" class="btn btn-block btn-info btn-xs h-100" id="staffModificationHistoryRefresh">&nbsp;&nbsp;Refresh</button>');

		$('.divStaffModificationHistoryMaxRowsLabel').html('<label class="col-form-label text-xs">Max Rows:</label>');

		$('.divStaffModificationHistoryMaxRowsInput').html('<input type="text" class="form-control text-xs h-60" id="showModificationHistoryMaxRows" placeholder="100" value="' + objStaff.maxRows + '">');	
		
		$("#staffModificationHistoryRefresh").click(function () {

			objStaff.maxRows = $('#showModificationHistoryMaxRows').val();
		
			//console.log(objFilters);
			getStaffModificationHistory(objStaff);
		});

		$('#showModificationHistoryMaxRows').keypress(function(event) {
			if (event.key === "Enter") {
				
				objStaff.maxRows = $('#showModificationHistoryMaxRows').val();
		
				//console.log(objFilters);
				getStaffModificationHistory(objStaff);
			}
		});	

		$('.modal-title-modification-history').text('Staff - History Modification - ' + objStaff.staffName);
		$('#modalShowModificationHistory').modal('show');

		console.log("getStaffModificationHistory finished");
	  }
	});				

}











