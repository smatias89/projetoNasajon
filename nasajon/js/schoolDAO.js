//saveSchool
function saveSchool(objSchool) {
	
	//console.log(objSchool);
	
	Pace.restart();
	//Pace.track(function () { })

	//console.log(JSON.stringify(objSchool));
	//return;
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'school' : JSON.stringify(objSchool) },
		datatype: "JSON",
		url: 'ajax/schoolSave',
		success: function (data) {
		
		console.log('schoolSave finished');
		//console.log(data);
		
		data = JSON.parse(data);
		
		if (data.message === undefined || data.message == null || data.message == "") {
			
			toastr.success('School was saved successfully', 'School', {
                timeOut: 2000,
                preventDuplicates: true,
                positionClass: 'toast-top-right',
                // Redirect 
                onHidden: function() {
                    /*if (objSchool.schoolID == "0") {
						closeActiveTab("school-new");
					} else {
						closeActiveTab("school-" + objSchool.schoolID);
					}*/
					location.href = "school";
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

//deleteSchool
function deleteSchool(btnRefresh) {
	
	var objParameters = new Object();
	
	objParameters.schoolID = parseInt($('#hidSchoolID').val());
	objParameters.createdBy = "BIPESCOLADM";
	objParameters.actionType = $('#hidActionType').val();
	
	//console.log(objParameters);
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'school' : JSON.stringify(objParameters) },
		datatype: "JSON",
		url: 'ajax/schoolDelete',
		success: function (data) {
				
		console.log('schoolDelete finished');
		data = JSON.parse(data);
		//console.log(data);
		
		if (data.message === undefined || data.message == "" || data.message == null) {
			if (btnRefresh != null) {
				toastr.success('School was deleted successfully');
				btnRefresh.click();
			} else {
				toastr.success('School was deleted successfully', 'School', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						if (objParameters.schoolID == "0") {
							closeActiveTab("school-new");
						} else {
							closeActiveTab("school-" + objParameters.schoolID);
						}
					}
				});
			}
		} else {
			toastr.error(data.message);
		}

		$('#modalDelete').modal('hide');
		
	  }
	});
			
}

//getSchoolByFilterForm
function getSchoolByFilterForm(objFilters) {
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'school' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/schoolGetByFilter',
		global: false,
		success: function (data) {
		
		//console.log(data);		
		data = JSON.parse(data);
		
		$.each(data, function(index, element) {
			
			//console.log(element);
			//console.log("schoolID -> " + element.schoolID + "; schoolName -> " + element.schoolName);

			if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy")
				$("#schoolID").val(element.schoolID);	
			
			$("#schoolName").val(element.schoolName).change();		
			$("#schoolDBName").val(element.schoolDBName);
			$("#schoolSitePrefix").val(element.schoolSitePrefix);
			$("#schoolFgAtv").val(element.fgAtv);
			
			$("#schoolCreatedBy").val((element.createdByFullName != null && element.createdByFullName != ""?element.createdByFullName:element.createdBy));
			$("#schoolCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
			$("#schoolModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != ""?element.modifiedByFullName:element.modifiedBy));
			$("#schoolModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));
			
			$("#schoolID").focus();
		});

		console.log("getSchoolByFilter finished");
	  }
	});
			
}

//getSchoolByFilterTable
function getSchoolByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {
		
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'school' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/schoolGetByFilter',
		global: false,
		success: function (data) {
		
		//console.log(data);		
		data = JSON.parse(data);
		
		var data2 = data.filter(function(element) {	

			if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {	
				//console.log("element.schoolID: " + element.schoolID);
				//console.log("$.inArray(element.schoolID, lstExclusion): " + $.inArray(element.schoolID, lstExclusion));				
				return $.inArray(element.schoolID, lstExclusion) == -1; 
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

						else if (strTmp.schoolID !== '')
							return strTmp.schoolID;

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
					objAction.id = "showModificationHistorySchool" ;
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
					objAction.id = "deleteSchool";
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
					objAction.id = "copySchool" ;
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
					objAction.id = "propertiesSchool";
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
		
		
		console.log("getSchoolByFilterTable finished");
	  	}
	});
			
}

//getSchoolModificationHistory
function getSchoolModificationHistory(objSchool) {

	$('#tblModificationHistory').html("");
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: {'school' : JSON.stringify(objSchool) },
		datatype: "JSON",
		url: 'ajax/schoolGetModificationHistory',
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
					"<'row'<'col-sm-3'l><'offset-sm-2 col-sm-1 text-center divSchoolModificationHistoryDropdown btn-group'><'col-sm-1 text-center divSchoolModificationHistoryRefresh'><'col-sm-1 text-right divSchoolModificationHistoryMaxRowsLabel'><'col-sm-1 text-left divSchoolModificationHistoryMaxRowsInput'><'col-sm-3'f>>" +
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
				{ data: 'schoolID', title: "ID", width: "5%" },
				{ data: 'schoolName', title: "Name", width: "50%" },
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
			
			if (tblModificationHistory.rows('.selected').any() && $('#btnSchoolModificationHistoryAction').hasClass('disabled')) {			
				$('#divSchoolModificationHistoryActionOptions').html(
					  ' <a class="dropdown-item text-xs" href="#" id="showSchool"><i class="far fa-file-alt mr-1"></i> Show School</a>');	
					
					$("#showSchool").on( "click", function(event) {
						tableModificationHistoryActions(tblModificationHistory, this);
					});

				$('#btnSchoolModificationHistoryAction').removeClass('disabled btn-default');
				$('#btnSchoolModificationHistoryAction').addClass('btn-info');
			} else if (!tblModificationHistory.rows('.selected').any() && !$('#btnSchoolModificationHistoryAction').hasClass('disabled')) {				
				$('#btnSchoolModificationHistoryAction').removeClass('btn-info');
				$('#btnSchoolModificationHistoryAction').addClass('disabled btn-default');
			};
		} );

		$('.divSchoolModificationHistoryDropdown').html('<button class="btn btn-default btn-xs dropdown-toggle disabled" type="button" id="btnSchoolModificationHistoryAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
			'Actions' +
		'</button>' +
		'<div class="dropdown-menu" aria-labelledby="btnSchoolModificationHistoryAction" id="divSchoolModificationHistoryActionOptions">' +							 					  
		'</div>');

		$('.divSchoolModificationHistoryRefresh').html('<button type="button" class="btn btn-block btn-info btn-xs h-100" id="schoolModificationHistoryRefresh">&nbsp;&nbsp;Refresh</button>');

		$('.divSchoolModificationHistoryMaxRowsLabel').html('<label class="col-form-label text-xs">Max Rows:</label>');

		$('.divSchoolModificationHistoryMaxRowsInput').html('<input type="text" class="form-control text-xs h-60" id="showModificationHistoryMaxRows" placeholder="100" value="' + objSchool.maxRows + '">');	
		
		$("#schoolModificationHistoryRefresh").click(function () {

			objSchool.maxRows = $('#showModificationHistoryMaxRows').val();
		
			//console.log(objFilters);
			getSchoolModificationHistory(objSchool);
		});

		$('#showModificationHistoryMaxRows').keypress(function(event) {
			if (event.key === "Enter") {
				
				objSchool.maxRows = $('#showModificationHistoryMaxRows').val();
		
				//console.log(objFilters);
				getSchoolModificationHistory(objSchool);
			}
		});	

		$('.modal-title-modification-history').text('School - History Modification - ' + objSchool.schoolName);
		$('#modalShowModificationHistory').modal('show');

		console.log("getSchoolModificationHistory finished");
	  }
	});				

}











