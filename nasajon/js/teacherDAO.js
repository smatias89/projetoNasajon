// console.log('teacherDAO...0605');
function saveTeacher(objTeacher) {

	// console.log(objTeacher);

	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: { 'teacher': JSON.stringify(objTeacher) },
		datatype: "JSON",
		url: 'ajax/teacherSave',
		success: function (data) {

			console.log('teacher Save finished');

			var errorEmail = $('#teacherEmail').val();
			// var errorCPF = $('#teacherCPF').val();
			// var errorCPF = errorCPF.slice(0, 3) + '.' + errorCPF.slice(3, 6) + '.' + errorCPF.slice(6, 9) + '-' + errorCPF.slice(9);
			var errorCPF = $('#teacherCPF').val()
			console.log(data);
			data = JSON.parse(data);

			if (data.message === undefined || data.message == "" || data.message == null) {

				toastr.success('Cadastrado com sucesso!', 'Professor: ' + data.fullName, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function () {

						location.href = "teacher";
					}
				});

			} else if (data.message != "" && (data.message).includes(errorEmail) && data.message != null) {

				toastr.error('Não foi possível cadastrar o professor, e-mail ' + errorEmail + ' já cadastrado', 'E-mal', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 

				});
				$('#teacherEmail').focus();
				return

			} else if (data.message != undefined || data.message != "" || data.message != null) {
				console.log(data.message);
				toastr.error('Não foi possível cadastrar o professor, CPF ' + errorCPF + ' já cadastrado', 'CPF', {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 

				});
				$('#teacherCPF').focus();
				return

			} else {
				toastr.error(data.message);
			}

			//$('#modalDelete').modal('hide');

		}
	});

}
//getTeacherByFilterForm
function getTeacherByFilterForm(objFilters) {

	Pace.restart();
	//Pace.track(function () { })

	// console.log(objFilters);

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'teacher': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/teacherGetByFilter',
		global: false,
		success: function (data) {

			// console.log("getTeacherByFilterForm ")

			data = JSON.parse(data);
			// console.log(data);	

			$.each(data, function (index, element) {

				//propreties
				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
					$("#teacherID").val(element.teacherID);
					// $('#teacherEmail').attr('readonly',true);		
					// $('#teacherCPF').attr('readonly',true);	
					$(".delete-button").show();
					console.log('propreties');
				}


				ajaxLoadComboDisciplineGetAll = true;

				console.log("ajaxLoadComboDisciplineGetAll: " + ajaxLoadComboDisciplineGetAll);
				(async () => {
					console.log("waiting for ajaxLoadComboDisciplineGetAll");
					while (ajaxLoadComboDisciplineGetAll) {
						console.log('Not yet, waiting more');
						await new Promise(resolveLoadComboDisciplineGetAll => setTimeout(resolveLoadComboDisciplineGetAll, 1000));
					}
					let lstDisciplineSelected = new Array();
					$.each(element.lstDiscipline, function (index, element2) {
						lstDisciplineSelected.push(element2.disciplineID);
					});
					$("#teacherDiscipline").val(lstDisciplineSelected).change();
					console.log("ajaxLoadComboDisciplineGetAll is defined");
				})();

				(async () => {
					console.log("waiting for ajaxLoadComboGraduationGetAll");
					while (ajaxLoadComboGraduationGetAll) {
						console.log('Not yet, waiting more');
						await new Promise(resolveLoadComboGraduationGetAll => setTimeout(resolveLoadComboGraduationGetAll, 1000));
					}

					$("#teacherGrad").val(element.graduationID).change();
					console.log("ajaxLoadComboGraduationGetAll is defined");
				})();

				(async () => {
					console.log("waiting for ajaxLoadComboGenderGetAll ");
					while (ajaxLoadComboGenderGetAll) {
						console.log('Not yet, waiting more');
						await new Promise(resolveLoadComboGraduationGetAll => setTimeout(resolveLoadComboGraduationGetAll, 1000));
					}

					$("#teacherGender").val(element.genderID).change();
					console.log("ajaxLoadComboGenderGetAll is defined");
				})();

				ajaxLoadComboDisciplineGetAll = false;


				//garantir copy
				// console.log('$("#hidActionType").val() : '+$("#hidActionType").val());

				if ($("#hidActionType").val() == 'copy') {

					$("#teacherCPF").val();
					$("#teacherEmail").val();

				} else {

					$("#teacherCPF").val(maskCPF(element.teacherCPF));
					$("#teacherEmail").val(element.email);
				}


				$("#userID").val(element.userID);
				$("#teacherID").val(element.teacherID);
				$("#teacherFullName").val(element.fullName);

				if (element.birthDate != null && element.birthDate != "") {
					$('#teacherBirthDate').data('daterangepicker').setStartDate(moment(element.birthDate).format(TO_PATTERN_DATE));
					$('#teacherBirthDate').data('daterangepicker').setEndDate(moment(element.birthDate).format(TO_PATTERN_DATE));
				}

				$("#teacherFgAtv").val(element.fgAtv);
				$("#teacherPhone1").val(maskTel(element.phone1));
				$("#teacherPhone2").val(maskTel(element.phone2));
				$("#endCEP").val(maskCEP(element.userAddress?.cep));
				$("#endStreet").val(element.userAddress?.street);
				$("#endStreetNumber").val(element.userAddress?.streetNumber);
				$("#endStreetComplement").val(element.userAddress?.streetComplement);
				$("#endDistrict").val(element.userAddress?.district);
				$("#endCity").val(element.userAddress?.city);
				$("#endUF").val(element.userAddress?.uf);
				$("#endCodIBGE").val(element.userAddress?.codIBGE);

				$("#teacherCreatedBy").val((element.createdByFullName != null && element.createdByFullName != "" ? element.createdByFullName : element.createdBy));
				$("#teacherCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#teacherModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != "" ? element.modifiedByFullName : element.modifiedBy));
				$("#teacherModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));

				$("#teacherID").focus();

			});

			console.log("getTeacherByFilterForm finished");
		}
	});

}

//getTeacherByFilterTable
function getTeacherByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	// console.log(objFilters);
	Pace.restart();
	//Pace.track(function () { })
	console.log('getTeacherByFilterTable...');

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'teacher': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/teacherGetByFilter',
		global: false,
		success: function (data) {


			data = JSON.parse(data);
			// console.log(data);	

			if(data.length == 0){
				toastr.warning('Resultado não encontrado','Atenção!');
			}

			var data2 = data.filter(function (element) {

				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
					//console.log("element.userID: " + element.userID);
					//console.log("$.inArray(element.userID, lstExclusion): " + $.inArray(element.userID, lstExclusion));				
					return $.inArray(element.userID, lstExclusion) == -1;
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
							var name = strTmp.fullName;
							var liste = name.split(' ');
							// console.log(liste);

							if (strTmp.fullName !== '')
								return 'Docente: ' + liste[0] + ' ' + liste[1] + ' ' + liste[2];

							else if (strTmp.teacherID !== '')
								return strTmp.teacherID;

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
					// {
					// 	type: 'option',
					// 	multi: false,
					// 	title: 'Show Modification History',
					// 	iconClass: 'fas fa-list-alt mr-1',
					// 	buttonClasses: ['btn', 'btn-outline-secondary'],
					// 	contextMenuClasses: ['text-xs', 'text-secondary'],
					// 	action: function (row) {
					// 		let objAction = new Object();
					// 		objAction.id = "showModificationHistoryTeacher" ;
					// 		tableActions(objDataTable, objAction, false);
					// 		console.log('Modification History Actions...');
					// 	},
					// 	// isHidden: function (row) {
					// 	// 	return !(row.objectName != "");
					// 	// },
					// },
					{
						type: 'option',
						multi: false,
						title: 'Deletar',
						iconClass: 'fas fa-trash-alt mr-1',
						buttonClasses: ['btn', 'btn-outline-secondary'],
						contextMenuClasses: ['text-xs', 'text-secondary'],
						action: function (row) {
							let objAction = new Object();
							objAction.id = "deleteTeacher";
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
						title: 'Copiar',
						iconClass: 'fas fa-copy mr-1',
						buttonClasses: ['btn', 'btn-outline-secondary'],
						contextMenuClasses: ['text-xs', 'text-secondary'],
						action: function (row) {
							let objAction = new Object();
							objAction.id = "copyTeacher";
							tableActions(objDataTable, objAction, false, true);
							console.log('Copy Actions...');
						},
						// isHidden: function (row) {
						// 	return !(row.objectName != "");
						// },
					},
					{
						type: 'option',
						multi: false,
						title: 'Tempos',
						iconClass: 'far fa-calendar-alt mr-1',
						buttonClasses: ['btn', 'btn-outline-secondary'],
						contextMenuClasses: ['text-xs', 'text-secondary'],
						action: function (row) {
							let objAction = new Object();
							objAction.id = "infoTimeTeacher";
							tableActions(objDataTable, objAction, false, true);
							console.log('info Time Actions...');
						},
						// isHidden: function (row) {
						// 	return !(row.objectName != "");
						// },
					},
					{
						type: 'option',
						multi: false,
						title: 'Propriedades',
						iconClass: 'fas fa-tools mr-1',
						buttonClasses: ['btn', 'btn-outline-secondary'],
						contextMenuClasses: ['text-xs', 'text-secondary'],
						action: function (row) {
							let objAction = new Object();
							objAction.id = "propertiesTeacher";
							tableActions(objDataTable, objAction, false, true);
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

			// if (objModal != null) {
			// 	objModal.modal('show');
			// }


			console.log("getTeacherByFilterTable finished");
		}
	});

}

//getTeacherModificationHistory
function getTeacherModificationHistory(objFauclty) {

	$('#tblModificationHistory').html("");

	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(objFauclty),
		datatype: "json",
		url: '/servlet/userGetModificationHistory',
		success: function (data) {

			console.log('result below');
			//console.log(data);

			tblModificationHistory = $('#tblModificationHistory').DataTable({
				destroy: true
				, scrollX: true
				, data: data,
				columnDefs: [{
					orderable: false,
					className: 'select-checkbox',
					targets: 0,
					data: null
				},
				{
					orderable: true,
					targets: 4,
					render: function (value) {
						if (value === null) return "";
						return moment(value).format(TO_PATTERN_DATETIME);
					}
				}
					, {
					orderable: true,
					targets: 6,
					render: function (value) {
						if (value === null) return "";
						return moment(value).format(TO_PATTERN_DATETIME);
					}
				}],
				rowId: 'modifiedDate',
				dom:
					"<'row'<'col-sm-3'l><'offset-sm-2 col-sm-1 text-center divUserModificationHistoryDropdown btn-group'><'col-sm-1 text-center divUserModificationHistoryRefresh'><'col-sm-1 text-right divUserModificationHistoryMaxRowsLabel'><'col-sm-1 text-left divUserModificationHistoryMaxRowsInput'><'col-sm-3'f>>" +
					"<'row'<'col-sm-12'tr>>" +
					"<'row'<'col-sm-5'i><'col-sm-7'p>>",
				select: {
					style: 'os',
					selector: 'td:first-child'
				},
				fixedHeader: true,
				bAutoWidth: false,
				order: [[6, 'desc']],
				columns: [
					{ data: null, defaultContent: '', width: "5%" },
					{ data: 'userID', title: "ID", width: "5%" },
					{ data: 'login', title: "Name", width: "50%" },
					{ data: 'createdByFullName', title: "Created By", width: "10%" },
					{ data: 'createdDate', title: "Created Date", width: "10%" },
					{ data: 'modifiedByFullName', title: "Modified By", width: "10%" },
					{ data: 'modifiedDate', title: "Modified Date", width: "10%" }
				]
			});

			$('#tblModificationHistory tbody').on('click', 'tr', function () {
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
				}
				else {
					tblModificationHistory.$('tr.selected').removeClass('selected');
					$(this).addClass('selected');
				};

				if (tblModificationHistory.rows('.selected').any() && $('#btnUserModificationHistoryAction').hasClass('disabled')) {
					$('#divUserModificationHistoryActionOptions').html(
						' <a class="dropdown-item text-xs" href="#" id="showUser"><i class="far fa-file-alt mr-1"></i> Show User</a>');

					$("#showUser").on("click", function (event) {
						tableModificationHistoryActions(tblModificationHistory, this);
					});

					$('#btnUserModificationHistoryAction').removeClass('disabled btn-default');
					$('#btnUserModificationHistoryAction').addClass('btn-info');
				} else if (!tblModificationHistory.rows('.selected').any() && !$('#btnUserModificationHistoryAction').hasClass('disabled')) {
					$('#btnUserModificationHistoryAction').removeClass('btn-info');
					$('#btnUserModificationHistoryAction').addClass('disabled btn-default');
				};
			});

			$('.divUserModificationHistoryDropdown').html('<button class="btn btn-default btn-xs dropdown-toggle disabled" type="button" id="btnUserModificationHistoryAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
				'Actions' +
				'</button>' +
				'<div class="dropdown-menu" aria-labelledby="btnUserModificationHistoryAction" id="divUserModificationHistoryActionOptions">' +
				'</div>');

			$('.divUserModificationHistoryRefresh').html('<button type="button" class="btn btn-block btn-info btn-xs h-100" id="userModificationHistoryRefresh">&nbsp;&nbsp;Refresh</button>');

			$('.divUserModificationHistoryMaxRowsLabel').html('<label class="col-form-label text-xs">Max Rows:</label>');

			$('.divUserModificationHistoryMaxRowsInput').html('<input type="text" class="form-control text-xs h-60" id="showModificationHistoryMaxRows" placeholder="100" value="' + objUser.maxRows + '">');

			$("#userModificationHistoryRefresh").click(function () {

				objUser.maxRows = $('#showModificationHistoryMaxRows').val();

				//console.log(objFilters);
				getUserModificationHistory(objUser);
			});

			$('#showModificationHistoryMaxRows').keypress(function (event) {
				if (event.key === "Enter") {

					objUser.maxRows = $('#showModificationHistoryMaxRows').val();

					//console.log(objFilters);
					getUserModificationHistory(objUser);
				}
			});

			$('.modal-title-modification-history').text('User - History Modification - ' + objUser.login);
			$('#modalShowModificationHistory').modal('show');

			console.log("getUserModificationHistory finished");
		}
	});

}

//deleteTeacher
function deleteTeacher(btnRefresh, objDelete) {

	var objTeacher = new Object();

	objTeacher.teacherID = parseInt($('#hidTeacherID').val());
	objTeacher.actionType = $('#hidActionType').val();

	// console.log(objTeacher);

	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		data: { 'teacher': JSON.stringify(objTeacher) },
		datatype: "JSON",
		url: 'ajax/teacherDelete',
		success: function (data) {

			console.log('Teacher Delete finished');

			if (data.message === undefined || data.message == "" || data.message == null) {
				if (btnRefresh != null) {
					toastr.success('Deletada com sucesso!', 'Professor: ' + objDelete);
					btnRefresh.click();

				}

			} else {
				toastr.error(data.message);
			}

			$('#modalDelete').modal('hide');// neste caso não pega $('#modalDelete').hide()
			$('#teacherbackButton').click();


		}
	});

}

function getTeacherTimeByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	console.log("getTeacherTimeByFilterTable begin");
	// console.log(objFilters);
	Pace.restart();
	//Pace.track(function () { })


	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'teacher': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/teacherGetByTimesFilter',
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

			if (data.length == 0) {

				toastr.warning('Professor sem Tempos cadastrados', objFilters.teacherFullName);
				// console.log('dentro');
				return
			}

			objDataTable.clear();
			objDataTable.rows.add(data2).draw();
			$('#teacherTotalTime').show();
			$('#modalInfoTimeTeacher').modal('show');

			console.log("getTeacherTimeByFilterTable finished");
		}
	});

}











