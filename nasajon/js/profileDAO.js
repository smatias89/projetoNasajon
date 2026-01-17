var ajaxLoadListVewPermissionGetAll = false;

//saveProfile
function saveProfile(objProfile) {
	
	//console.log(objProfile);
	
	Pace.restart();
	//Pace.track(function () { })

	console.log(JSON.stringify(objProfile));
	return;
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'profile' : JSON.stringify(objProfile) },
		datatype: "JSON",
		url: 'ajax/profileSave',
		success: function (data) {
		
		console.log('profileSave finished');
		console.log(data);
		
		data = JSON.parse(data);
		
		if (data.message === undefined || data.message == null || data.message == "") {
			
			toastr.success('Profile was saved successfully', 'Profile', {
                timeOut: 2000,
                preventDuplicates: true,
                positionClass: 'toast-top-right',
                // Redirect 
                onHidden: function() {
                    /*if (objProfile.profileID == "0") {
						closeActiveTab("profile-new");
					} else {
						closeActiveTab("profile-" + objProfile.profileID);
					}*/
					location.href = "profile";
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

//deleteProfile
function deleteProfile(btnRefresh) {
	
	var objParameters = new Object();
	
	objParameters.profileID = parseInt($('#hidProfileID').val());
	objParameters.createdBy = "BIPESCOLADM";
	objParameters.actionType = $('#hidActionType').val();
	
	//console.log(objParameters);
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'profile' : JSON.stringify(objParameters) },
		datatype: "JSON",
		url: 'ajax/profileDelete',
		success: function (data) {
				
		console.log('profileDelete finished');
		data = JSON.parse(data);
		//console.log(data);
		
		if (data.message === undefined || data.message == "" || data.message == null) {
			if (btnRefresh != null) {
				toastr.success('Profile was deleted successfully');
				btnRefresh.click();
			} else {
				toastr.success('Profile was deleted successfully', 'Profile', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						if (objParameters.profileID == "0") {
							closeActiveTab("profile-new");
						} else {
							closeActiveTab("profile-" + objParameters.profileID);
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

//getProfileByFilterForm
function getProfileByFilterForm(objFilters) {
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'profile' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/profileGetByFilter',
		global: false,
		success: function (data) {
		
		//console.log(data);		
		data = JSON.parse(data);
		
		$.each(data, function(index, element) {
			
			//console.log(element);
			//console.log("profileID -> " + element.profileID + "; profileName -> " + element.profileName);

			if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy")
				$("#profileID").val(element.profileID);	
			
			$("#profileName").val(element.profileName).change();	
			
			(async() => {
				console.log("waiting for ajaxLoadListVewPermissionGetAll");
				while (ajaxLoadListVewPermissionGetAll) {
					console.log('Not yet, waiting more');
					await new Promise(resolveLoadListVewPermissionGetAll => setTimeout(resolveLoadListVewPermissionGetAll, 1000));					
				}		

				
				$.each(element.lstPermission, function(index, element) {
					// console.log("permissionID -> " + element.permissionID + "; permissionShdesc -> " + element.permissionShdesc);			
					//$.ui.fancytree.getTree("#profilePermissionTreeDiv").activateKey(element.permissionID);
					if ($.ui.fancytree.getTree("#profilePermissionTreeDiv").getNodeByKey(element.permissionID) != null) {
						//console.log('$.ui.fancytree.getTree("#profilePermissionTreeDiv").getNodeByKey(element.permissionID) -> ');
						//console.log($.ui.fancytree.getTree("#profilePermissionTreeDiv").getNodeByKey(element.permissionID));
						$.ui.fancytree.getTree("#profilePermissionTreeDiv").getNodeByKey(element.permissionID).setSelected(true);
					} else {
						console.log('Cant find permission -> ' + element.permissionID);
					}					
				});

				$("#profileName").focus();

				console.log("ajaxLoadListViewPermissionGetAll is defined");
			})();
			
			$("#profileCreatedBy").val((element.createdByFullName != null && element.createdByFullName != ""?element.createdByFullName:element.createdBy));
			$("#profileCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
			$("#profileModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != ""?element.modifiedByFullName:element.modifiedBy));
			$("#profileModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));
			
			$("#profileID").focus();
		});

		console.log("getProfileByFilter finished");
	  }
	});
			
}

//getProfileByFilterTable
function getProfileByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {
		
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'profile' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/profileGetByFilter',
		global: false,
		success: function (data) {
		
		// console.log(data);		
		data = JSON.parse(data);
		
		var data2 = data.filter(function(element) {	

			console.log(element);
			
			// if(element.profileID != '1')
				return element

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
						
						if (strTmp.profileName !== '')
							return strTmp.profileName;

						else if (strTmp.profileID !== '')
							return strTmp.profileID;

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
					objAction.id = "showModificationHistoryProfile" ;
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
					objAction.id = "deleteProfile";
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
					objAction.id = "copyProfile" ;
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
					objAction.id = "propertiesProfile";
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
		
		
		console.log("getProfileByFilterTable finished");
	  }
	});
			
}

// //getProfileModificationHistory
// function getProfileModificationHistory(objProfile) {

// 	$('#tblModificationHistory').html("");
	
// 	Pace.restart();
// 	//Pace.track(function () { })
	
// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: {'profile' : JSON.stringify(objProfile) },
// 		datatype: "JSON",
// 		url: 'ajax/profileGetModificationHistory',
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
// 					"<'row'<'col-sm-3'l><'offset-sm-2 col-sm-1 text-center divProfileModificationHistoryDropdown btn-group'><'col-sm-1 text-center divProfileModificationHistoryRefresh'><'col-sm-1 text-right divProfileModificationHistoryMaxRowsLabel'><'col-sm-1 text-left divProfileModificationHistoryMaxRowsInput'><'col-sm-3'f>>" +
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
// 				{ data: 'profileID', title: "ID", width: "5%" },
// 				{ data: 'profileName', title: "Name", width: "50%" },
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
			
// 			if (tblModificationHistory.rows('.selected').any() && $('#btnProfileModificationHistoryAction').hasClass('disabled')) {			
// 				$('#divProfileModificationHistoryActionOptions').html(
// 					  ' <a class="dropdown-item text-xs" href="#" id="showProfile"><i class="far fa-file-alt mr-1"></i> Show Profile</a>');	
					
// 					$("#showProfile").on( "click", function(event) {
// 						tableModificationHistoryActions(tblModificationHistory, this);
// 					});

// 				$('#btnProfileModificationHistoryAction').removeClass('disabled btn-default');
// 				$('#btnProfileModificationHistoryAction').addClass('btn-info');
// 			} else if (!tblModificationHistory.rows('.selected').any() && !$('#btnProfileModificationHistoryAction').hasClass('disabled')) {				
// 				$('#btnProfileModificationHistoryAction').removeClass('btn-info');
// 				$('#btnProfileModificationHistoryAction').addClass('disabled btn-default');
// 			};
// 		} );

// 		$('.divProfileModificationHistoryDropdown').html('<button class="btn btn-default btn-xs dropdown-toggle disabled" type="button" id="btnProfileModificationHistoryAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
// 			'Actions' +
// 		'</button>' +
// 		'<div class="dropdown-menu" aria-labelledby="btnProfileModificationHistoryAction" id="divProfileModificationHistoryActionOptions">' +							 					  
// 		'</div>');

// 		$('.divProfileModificationHistoryRefresh').html('<button type="button" class="btn btn-block btn-info btn-xs h-100" id="profileModificationHistoryRefresh">&nbsp;&nbsp;Refresh</button>');

// 		$('.divProfileModificationHistoryMaxRowsLabel').html('<label class="col-form-label text-xs">Max Rows:</label>');

// 		$('.divProfileModificationHistoryMaxRowsInput').html('<input type="text" class="form-control text-xs h-60" id="showModificationHistoryMaxRows" placeholder="100" value="' + objSchool.maxRows + '">');	
		
// 		$("#profileModificationHistoryRefresh").click(function () {

// 			objProfile.maxRows = $('#showModificationHistoryMaxRows').val();
		
// 			//console.log(objFilters);
// 			getProfileModificationHistory(objProfile);
// 		});

// 		$('#showModificationHistoryMaxRows').keypress(function(event) {
// 			if (event.key === "Enter") {
				
// 				objProfile.maxRows = $('#showModificationHistoryMaxRows').val();
		
// 				//console.log(objFilters);
// 				getProfileModificationHistory(objProfile);
// 			}
// 		});	

// 		$('.modal-title-modification-history').text('Profile - History Modification - ' + objProfile.profileName);
// 		$('#modalShowModificationHistory').modal('show');

// 		console.log("getProfileModificationHistory finished");
// 	  }
// 	});				

// }

function loadListViewPermissionGetAll(objPermissionTreeDiv, objPermissionTreeData) {
	
	ajaxLoadListVewPermissionGetAll = true;
	var objParameters = new Object();
	
	//console.log(objParameters);
	
	Pace.restart();
	//Pace.track(function () { })
	
	$.ajax({
	  type: "POST",
	  /*contentType: "application/json; charset=utf-8",*/
	  data: {'profile' : JSON.stringify(objParameters) },
	  datatype: "JSON",
      url: 'ajax/permissionGetAll',
	  success: function (data) {
		
		console.log(data);

		data = JSON.parse(data);
		var objProfilePermissionTreeData = "<li class=\"folder expanded\" id=\"1.0\">Permission(s)";

		var objProfilePermissionTreeDataSchool = "";
		var objProfilePermissionTreeDataMaster = "";
		var objProfilePermissionTreeDataProfile = "";
		var objProfilePermissionTreeDataUser = "";
		var objProfilePermissionTreeDataTeacher = "";
		var objProfilePermissionTreeDataDiscipline = "";
		var objProfilePermissionTreeDataClassroom = "";
		var objProfilePermissionTreeDataStudent = "";
		var objProfilePermissionTreeDataStaff = "";
		var objProfilePermissionTreeDataResponsible = "";
		var objProfilePermissionTreeDataVisitor = "";
		
		$.each(data, function(index, element) {

			console.log(element);
			if (element.shdesc.indexOf("_USER") > -1) {
				objProfilePermissionTreeDataUser += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_SCHOOL") > -1) {
				objProfilePermissionTreeDataSchool += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("MASTER_") > -1) {
				objProfilePermissionTreeDataMaster += "<li id=\"" + element.permissionID + "\"  data-icon=\"handScale/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_PROFILE") > -1) {
				objProfilePermissionTreeDataProfile += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_TEACHER") > -1) {
				objProfilePermissionTreeDataTeacher += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_CLASSROOM") > -1) {
				objProfilePermissionTreeDataClassroom += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_DISCIPLINE") > -1) {
				objProfilePermissionTreeDataDiscipline += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_CLASSROOM") > -1) {
				objProfilePermissionTreeDataClassroom += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_STUDENT") > -1) {
				objProfilePermissionTreeDataStudent += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_STAFF") > -1) {
				objProfilePermissionTreeDataStaff += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_RESPONSIBLE") > -1) {
				objProfilePermissionTreeDataResponsible += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			} else if (element.shdesc.indexOf("_VISITOR") > -1) {
				objProfilePermissionTreeDataVisitor += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
			}

		});

		objProfilePermissionTreeData += "<ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.1\">SCHOOL<ul>" + objProfilePermissionTreeDataSchool + "</ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.1\">MASTER<ul>" + objProfilePermissionTreeDataMaster + "</ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.2\">USER<ul>" + objProfilePermissionTreeDataUser + "</ul>";		
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.3\">PROFILE<ul>" + objProfilePermissionTreeDataProfile + "</ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.4\">TEACHER<ul>" + objProfilePermissionTreeDataTeacher + "</ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.5\">CLASSROOM<ul>" + objProfilePermissionTreeDataClassroom + "</ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.6\">STUDENT<ul>" + objProfilePermissionTreeDataStudent + "</ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.7\">STAFF<ul>" + objProfilePermissionTreeDataStaff + "</ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.8\">RESPONSIBLE<ul>" + objProfilePermissionTreeDataResponsible + "</ul>";
		objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.8\">VISITOR<ul>" + objProfilePermissionTreeDataVisitor + "</ul>";
		objProfilePermissionTreeData += "</ul>";

		//console.log('objProfilePermissionTreeData -> ' + objProfilePermissionTreeData);

		$(objPermissionTreeData).html(objProfilePermissionTreeData);

		$(objPermissionTreeDiv).fancytree({
			checkbox: true,
			selectMode: 3,
			activate: function(event, data){
				var node = data.node;
				//FT.debug("activate: event=", event, ", data=", data);
				if(!$.isEmptyObject(node.data)){
					alert("custom node data: " + JSON.stringify(node.data));
				}
			},
			lazyLoad: function(event, data){
				// we can't `return` values from an event handler, so we
				// pass the result as `data.result` attribute:
				data.result = {url: "ajax-sub2.json"};
			}
		// }).on("fancytreeactivate", function(event, data){
		// 	$.ui.fancytree.debug("fancytreeactivate: event=", event, ", data=", data);
		// 	return false;
		});		

		console.log("loadListViewPermissionGetAll finished");
		ajaxLoadListVewPermissionGetAll = false;
      }
    })
	
}