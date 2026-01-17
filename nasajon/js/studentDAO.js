//saveTeacher

function saveStudent(objStudent) {

	// console.log(objStudent);
	// return

	Pace.restart();
	//Pace.track(function () { })

	//console.log(JSON.stringify(objUser));
	//return;

	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: { 'student': JSON.stringify(objStudent) },
		datatype: "JSON",
		url: 'ajax/studentSave',
		success: function (data) {

			console.log('student Save finished');

			data = JSON.parse(data);
			// console.log(data);return
			if (data.message === undefined || data.message == "" || data.message == null) {

				// return
				toastr.success('Cadastrado com sucesso!', 'Aluno: ' + data.fullName, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function () {

						location.href = "student";
					}
				});

			} else if (data.message != undefined || data.message != "" || data.message != null) {
				toastr.error(data.message);
			}
			else {

				toastr.error(data.message);
			}

			//$('#modalDelete').modal('hide');
			return;
		}
	});

}

//deleteStudent
function deleteStudent(btnRefresh, objDelete) {

	var objStudent = new Object();

	// console.log($('#hidStudentID').val());
	objStudent.studentID = parseInt($('#hidStudentID').val());
	objStudent.actionType = $('#hidActionType').val();

	// console.log(objStudent);

	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		data: { 'student': JSON.stringify(objStudent) },
		datatype: "JSON",
		url: 'ajax/studentDelete',
		success: function (data) {

			console.log('Student Delete finished');
			// data = JSON.parse(data);
			console.log(data);

			if (data.message === undefined || data.message == "" || data.message == null) {
				if (btnRefresh != null) {
					toastr.success('Deletada com sucesso!', 'Aluno(a): ' + objDelete);
					btnRefresh.click();

				}

			} else {
				toastr.error(data.message);
			}

			$('#modalDelete').modal('hide');// neste caso não pega $('#modalDelete').hide()


		}
	});

}

//getStudentByFilterTable incial
function getStudentByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	// console.log(objFilters);
	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'student': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/studentGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log('Loading data... ');
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
							var list = name.split(' ');

							if (strTmp.fullName !== '')
								return 'Aluno: ' + list[0] + ' ' + (list[1] == undefined ? '' : list[1]) + ' ' + (list[2] == undefined ? '' : list[2])

							else if (strTmp.studentID !== '')
								return strTmp.studentID;

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
							objAction.id = "deleteStudent";
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
							objAction.id = "copyStudent";
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
						title: 'Propriedades',
						iconClass: 'fas fa-tools mr-1',
						buttonClasses: ['btn', 'btn-outline-secondary'],
						contextMenuClasses: ['text-xs', 'text-secondary'],
						action: function (row) {
							let objAction = new Object();
							objAction.id = "propertiesStudent";
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


			console.log("getStudentByFilterTable finished");
		}
	});

}


//getTeacherByFilterForm
function getStudentByFilterForm(objFilters) {

	Pace.restart();
	//Pace.track(function () { })

	// console.log(objFilters);

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'student': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/studentGetByFilter',
		global: false,
		success: function (data) {


			console.log("getStudentByFilterForm begin")

			data = JSON.parse(data);
			console.log('Loading data...');
			console.log('data...');

			$.each(data, function (index, element) {

				// console.log(element);
				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
					$("#classRoomID").val(element.classRoomID);
				}
				//Student
				$('#divUserID').show();
				$("#studentID").focus();
				$("#userID").val(element.userID.userID);
				$("#studentID").val(element.studentID);
				$("#studentRegistrationDate").val(element.registrationDate);
				if (element.registrationDate != null && element.registrationDate != '') {
					$('#studentRegistrationDate').data('daterangepicker').setStartDate(moment(element.birthDate).format(TO_PATTERN_DATE));
					$('#studentRegistrationDate').data('daterangepicker').setEndDate(moment(element.birthDate).format(TO_PATTERN_DATE));
				}
				$("#studentCPF").val(maskCPF(element.studentCPF));
				$("#studentFullName").val(element.fullName);
				// $("#studentBirthDate").val(element.userID.birthDate);	
				if (element.userID.birthDate != null && element.userID.birthDate != '') {
					$('#studentBirthDate').data('daterangepicker').setStartDate(moment(element.birthDate).format(TO_PATTERN_DATE));
					$('#studentBirthDate').data('daterangepicker').setEndDate(moment(element.birthDate).format(TO_PATTERN_DATE));
				}
				$("#studentGender").val(element.userID.genderID);
				$("#studentEmail").val(element.userID.email);
				$("#studenteFgAtv").val(element.fgAtv);
				// $("#studentClassRoom").val(element.lstClassRoom[0]?.classRoomID);

				var ajaxLoadComboClassGetAll = true;
				(async () => {
					console.log("waiting for ajaxLoadComboClassGetAll");
					while (ajaxLoadComboClassGetAll) {
						console.log('classRoom loading...');
						// console.log('ajaxLoadComboClassGetAll: ',ajaxLoadComboClassGetAll);
						await new Promise(resolveloadajaxloadComboClassRoom => setTimeout(resolveloadajaxloadComboClassRoom, 1000));
					}

					$("#studentClassRoom").val(element.lstClassRoom[0]?.classRoomID);
					console.log('classRoom load...');
				})();
				var ajaxLoadComboClassGetAll = false;

				$("#studentPhone1").val(element.userID?.phone1);
				$("#studentTransport").val(element.schollCar);
				$("#studentPCD").val(element.pcd);
				$("#endCEP").val(element.userAddress.cep);
				$("#endStreet").val(element.userAddress.street);
				$("#endStreetNumber").val(element.userAddress.streetNumber);
				$("#endStreetComplement").val(element.userAddress.streetComplement);
				$("#endDistrict").val(element.userAddress.district);
				$("#endCity").val(element.userAddress.city);
				$("#endUF").val(element.userAddress.uf);
				$("#endCodIBGE").val(element.userAddress.codIBGE);

				$("#studentCreatedBy").val((element.createdByFullName != null && element.createdByFullName != "" ? element.createdByFullName : element.createdBy));
				$("#studentCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#studentModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != "" ? element.modifiedByFullName : element.modifiedBy));
				$("#studentModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));

				//Father

				$('#studentFatherCPF').val(maskCPF(element.lstFatherData?.cpf));
				$('#studentFatherFullName').val(element.lstFatherData?.fullName);
				$('#studentFatherEmail').val(element.lstFatherData?.email);
				$('#studentFatherPhone1').val(element.lstFatherData?.phone1);
				$('#studentFatherPhone2').val(element.lstFatherData?.phone2);
				$('#endCEPFather').val(element.lstFatherAdress?.cep);
				$('#endStreetFather').val(element.lstFatherAdress?.street);
				$('#endStreetNumberFather').val(element.lstFatherAdress?.streetNumber);
				$('#endStreetComplementFather').val(element.lstFatherAdress?.streetComplement);
				$('#endDistrictFather').val(element.lstFatherAdress?.district);
				$('#endCityFather').val(element.lstFatherAdress?.city);
				$('#endUFFather').val(element.lstFatherAdress?.uf);
				$('#endCodIBGEFather').val(element.lstFatherAdress?.codIBGE);

				//Mother

				$('#studentMotherCPF').val(maskCPF(element.lstMotherData?.cpf));
				$('#studentMotherFullName').val(element.lstMotherData?.fullName);
				$('#studentMotherEmail').val(element.lstMotherData?.email);
				$('#studentMotherPhone1').val(element.lstMotherData?.phone1);
				$('#studentMotherPhone2').val(element.lstMotherData?.phone2);
				$('#endCEPMother').val(element.lstMotherAdress?.cep);
				$('#endStreetMother').val(element.lstMotherAdress?.street);
				$('#endStreetNumberMother').val(element.lstMotherAdress?.streetNumber);
				$('#endStreetComplementMother').val(element.lstMotherAdress?.streetComplement);
				$('#endDistrictMother').val(element.lstMotherAdress?.district);
				$('#endCityMother').val(element.lstMotherAdress?.city);
				$('#endUFMother').val(element.lstMotherAdress?.uf);
				$('#endCodIBGEMother').val(element.lstMotherAdress?.codIBGE);

				//Other

				$('#studentOtherCPF').val(maskCPF(element.lstOtherData?.cpf));
				$('#studentOtherFullName').val(element.lstOtherData?.fullName);
				$('#studentOtherEmail').val(element.lstOtherData?.email);
				$('#studentOtherPhone1').val(element.lstOtherData?.phone1);
				$('#studentOtherPhone2').val(element.lstOtherData?.phone2);
				$('#endCEPOther').val(element.lstOtherAdress?.cep);
				$('#endStreetOther').val(element.lstOtherAdress?.street);
				$('#endStreetNumberOther').val(element.lstOtherAdress?.streetNumber);
				$('#endStreetComplementOther').val(element.lstOtherAdress?.streetComplement);
				$('#endDistrictOther').val(element.lstOtherAdress?.district);
				$('#endCityOther').val(element.lstOtherAdress?.city);
				$('#endUFOther').val(element.lstOtherAdress?.uf);
				$('#endCodIBGEOther').val(element.lstOtherAdress?.codIBGE);

				//Responsáveis

				if (element.responsiblePedagogical == element.lstFatherData?.userID) {
					$('#studentResponsiblePedagogical').val('3');
				} else if (element.responsiblePedagogical == element.lstMotherData?.userID) {
					$('#studentResponsiblePedagogical').val('4')
				} else {
					$('#studentResponsiblePedagogical').val('5')
				}

				if (element.responsibleFinancial == element.lstFatherData?.userID) {
					$('#studentResponsibleFinancial').val('3');
				} else if (element.responsibleFinancial == element.lstMotherData?.userID) {
					$('#studentResponsibleFinancial').val('4')
				} else {
					$('#studentResponsibleFinancial').val('5')
				}



			});

			console.log("getStudentByFilterForm finished");
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

function loadStudentCEP(strCEP, parm1) {

	console.log("loadCEP...");

	ajaxLoadCEP = true;

	let objParameters = new Object();
	//console.log(objParameters);

	let strURLTmp = "https://viacep.com.br/ws/" + strCEP + "/json/";

	//console.log(strURLTmp);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "GET",
		/*contentType: "application/json; charset=utf-8",*/
		crossDomain: true,
		dataType: 'jsonp',
		url: strURLTmp,
		success: function (data) {

			//console.log(data);
			var strSufix = parm1.slice("btnSearchCEP".length); //conta e retorna tudo que vem depois do prefixo
			// console.log('parm1: ',parm1);
			// console.log(strSufix);
			if (parm1 == 'btnSearchCEPStudent') {

				console.log('aqui');
				$("#endStreet").val(data.logradouro);
				$("#endDistrict").val(data.bairro);
				$("#endCity").val(data.localidade);
				$("#endUF").val(data.uf);
				$("#endCodIBGE").val(data.ibge);

			} else if (parm1 == 'btnSearchCEPFather') {

				$("#endStreet" + strSufix).val(data.logradouro);
				$("#endDistrict" + strSufix).val(data.bairro);
				$("#endCity" + strSufix).val(data.localidade);
				$("#endUF" + strSufix).val(data.uf);
				$("#endCodIBGE" + strSufix).val(data.ibge);

			} else if (parm1 == 'btnSearchCEPMother') {

				$("#endStreet" + strSufix).val(data.logradouro);
				$("#endDistrict" + strSufix).val(data.bairro);
				$("#endCity" + strSufix).val(data.localidade);
				$("#endUF" + strSufix).val(data.uf);
				$("#endCodIBGE" + strSufix).val(data.ibge);

			} else if (parm1 == 'btnSearchCEPOther') {

				$("#endStreet" + strSufix).val(data.logradouro);
				$("#endDistrict" + strSufix).val(data.bairro);
				$("#endCity" + strSufix).val(data.localidade);
				$("#endUF" + strSufix).val(data.uf);
				$("#endCodIBGE" + strSufix).val(data.ibge);

			}

			// $("#endStreet").val(data.logradouro);
			// $("#endDistrict").val(data.bairro);
			// $("#endCity").val(data.localidade);
			// $("#endUF").val(data.uf);
			// $("#endCodIBGE").val(data.ibge);

			console.log("loadCEP finished");
			ajaxLoadCEP = false;
		},
		error: OnError
	});

}

// function loadListViewDisciplineGetAll(objPermissionTreeDiv, objPermissionTreeData) {
	
// 	loadListViewDisciplineGetAll = true;
// 	var objParameters = new Object();
	
// 	//console.log(objParameters);
	
// 	Pace.restart();
// 	//Pace.track(function () { })
	
// 	$.ajax({
// 	  type: "POST",
// 	  /*contentType: "application/json; charset=utf-8",*/
// 	  data: {'profile' : JSON.stringify(objParameters) },
// 	  datatype: "JSON",
//       url: 'ajax/disciplineGetAll',
// 	  success: function (data) {
		
// 		//console.log(data);

// 		data = JSON.parse(data);
// 		var objProfilePermissionTreeData = "<li class=\"folder expanded\" id=\"1.0\">Permission(s)";
// 		$(objProfilePermissionTreeData).empty();
// 		// $(objProfilePermissionTreeData).append('<option value="">--</option>');   
// 		$.each(data, function(index, element) {

// 			$(objProfilePermissionTreeData).append("<li id=\"" + element.disciplineID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + "");   
// 		});

// 		console.log("loadComboDisciplineGetAll finished");
// 		ajaxloadCombodisciplineGetAll = false;

// 		// var objProfilePermissionTreeDataSchool = "";
// 		// var objProfilePermissionTreeDataProfile = "";
// 		// var objProfilePermissionTreeDataUser = "";
// 		// var objProfilePermissionTreeDataTeacher = "";
// 		// var objProfilePermissionTreeDataDiscipline = "";
// 		// var objProfilePermissionTreeDataClassroom = "";
// 		// var objProfilePermissionTreeDataStudent = "";
// 		// var objProfilePermissionTreeDataStaff = "";
		
// 		// $.each(data, function(index, element) {

// 		// 	console.log(element);
// 		// 	if (element.shdesc.indexOf("_USER") > -1) {
// 		// 		objProfilePermissionTreeDataUser += "<li id=\"" + element.disciplineID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	} else if (element.shdesc.indexOf("_SCHOOL") > -1) {
// 		// 		objProfilePermissionTreeDataSchool += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	} else if (element.shdesc.indexOf("_PROFILE") > -1) {
// 		// 		objProfilePermissionTreeDataProfile += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	} else if (element.shdesc.indexOf("_TEACHER") > -1) {
// 		// 		objProfilePermissionTreeDataTeacher += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	} else if (element.shdesc.indexOf("_CLASSROOM") > -1) {
// 		// 		objProfilePermissionTreeDataClassroom += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	} else if (element.shdesc.indexOf("_DISCIPLINE") > -1) {
// 		// 		objProfilePermissionTreeDataDiscipline += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	} else if (element.shdesc.indexOf("_CLASSROOM") > -1) {
// 		// 		objProfilePermissionTreeDataClassroom += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	} else if (element.shdesc.indexOf("_STUDENT") > -1) {
// 		// 		objProfilePermissionTreeDataStudent += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	} else if (element.shdesc.indexOf("_STAFF") > -1) {
// 		// 		objProfilePermissionTreeDataStaff += "<li id=\"" + element.permissionID + "\"  data-icon=\"bipescola/img/Key.png\">" + element.shdesc + ""; 
// 		// 	}

// 		// });

// 		// objProfilePermissionTreeData += "<ul>";
// 		// objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.1\">SCHOOL<ul>" + objProfilePermissionTreeDataSchool + "</ul>";
// 		// objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.2\">USER<ul>" + objProfilePermissionTreeDataUser + "</ul>";		
// 		// objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.3\">PROFILE<ul>" + objProfilePermissionTreeDataProfile + "</ul>";
// 		// objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.4\">TEACHER<ul>" + objProfilePermissionTreeDataTeacher + "</ul>";
// 		// objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.5\">CLASSROOM<ul>" + objProfilePermissionTreeDataClassroom + "</ul>";
// 		// objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.6\">STUDENT<ul>" + objProfilePermissionTreeDataStudent + "</ul>";
// 		// objProfilePermissionTreeData += "<li class=\"folder\" id=\"1.7\">STAFF<ul>" + objProfilePermissionTreeDataStaff + "</ul>";
// 		// objProfilePermissionTreeData += "</ul>";

// 		//console.log('objProfilePermissionTreeData -> ' + objProfilePermissionTreeData);

// 		$(objPermissionTreeData).html(objProfilePermissionTreeData);

// 		$(objPermissionTreeDiv).fancytree({
// 			checkbox: true,
// 			selectMode: 3,
// 			activate: function(event, data){
// 				var node = data.node;
// 				//FT.debug("activate: event=", event, ", data=", data);
// 				if(!$.isEmptyObject(node.data)){
// 					alert("custom node data: " + JSON.stringify(node.data));
// 				}
// 			},
// 			lazyLoad: function(event, data){
// 				// we can't `return` values from an event handler, so we
// 				// pass the result as `data.result` attribute:
// 				data.result = {url: "ajax-sub2.json"};
// 			}
// 		// }).on("fancytreeactivate", function(event, data){
// 		// 	$.ui.fancytree.debug("fancytreeactivate: event=", event, ", data=", data);
// 		// 	return false;
// 		});		

// 		console.log("loadListViewDisciplineGetAll finished");
// 		loadListViewDisciplineGetAll = false;
//       }
//     })
	
// }


