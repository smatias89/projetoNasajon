// console.log('classDAO');2802

function saveClassRoom(objClassRoom) {

	// console.log(objClassRoom);


	Pace.restart();
	//Pace.track(function () { })

	//console.log(JSON.stringify(objUser));
	//return;

	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: { 'classRoom': JSON.stringify(objClassRoom) },
		datatype: "JSON",
		url: 'ajax/classRoomSave',
		success: function (data) {

			console.log('classRoom finished');
			// console.log(data);
			data = JSON.parse(data);

			// toastr.success('Professor Cadastrado'+data.fullName+' com sucesso', 'Professor');
			if (data.message === undefined || data.message == "" || data.message == null) {
				// console.log(data.fullName,'>>>>');
				toastr.success('Salvo com sucesso', 'Turma: ' + data.shdesc, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function () {
						// if (objTeacher.userID == "0") {
						// 	closeActiveTab("user-new");
						// } else {
						// 	closeActiveTab("user-" + objTeacher.userID);
						// }
						location.href = 'classRoom'

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

//getDisciplineByFilterTable
function getClassByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	console.log("getClassByFilterTable running")

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'classRoom': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/classRoomGetByFilter',
		global: false,
		success: function (data) {


			// console.log('Sucesso');
			data = JSON.parse(data);
			// console.log(data);
			console.log('data... ');

			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
				
			}

			// console.log(data);	
			var data2 = data.filter(function (element) {

				// if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {	
				// 	//console.log("element.userID: " + element.userID);
				// 	//console.log("$.inArray(element.userID, lstExclusion): " + $.inArray(element.userID, lstExclusion));	

				// 	return $.inArray(element.userID, lstExclusion) == -1; 
				// } else 
				//New
				// if(element.lstTblClassRoomStudent.length == 0 && element.lstTblClassRoomTeacher.length == 0 && element.lstTblClassRoomTime.length == 0 ){

				// 	console.log(element);
				// 	return element;
				// }else{
				// 	return;
				// }

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

							if (strTmp.shdesc !== '')
								return 'Turma: ' + strTmp.shdesc;

							else if (strTmp.classRoomID !== '')
								return strTmp.classRoomID;

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
							objAction.id = "deleteClassRoom";
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
							objAction.id = "copyClassRoom";
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
							objAction.id = "propertiesClassRoom";
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


			console.log("getClassByFilterTable finished");
			return
		}
	});

}

//deleteClassRoom
function deleteClassRoom(btnRefresh, objDelete) {

	var objParameters = new Object();

	objParameters.classRoomID = parseInt($('#hidClassRoomID').val());
	objParameters.actionType = $('#hidActionType').val();

	// console.log(objParameters);


	Pace.restart();
	//Pace.track(function () { }) ok

	$.ajax({
		type: "POST",
		data: { 'classRoom': JSON.stringify(objParameters) },
		datatype: "json",
		url: 'ajax/classRoomDelete',
		success: function (data) {

			console.log('classRoom Delete finished');
			console.log(data);


			if (data.message === undefined || data.message == "" || data.message == null) {
				if (btnRefresh != null) {
					toastr.success('Deletada com sucesso!', 'Turma ' + objDelete);
					btnRefresh.click();
				}

			} else {
				toastr.error(data.message);
			}

			$('#modalDelete').modal('hide');// neste caso não pega $('#modalDelete').hide()

		}
	});

}

function loadComboDisciplineGetAllFilterSelect(cmbDiscipline, filterSelect) {

	console.log("loadComboDisciplineGetAllFilterSelect...");

	ajaxloadComboDisciplineGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/disciplineGetAll',
		success: function (data) {

			// console.log(data);

			// data = JSON.parse(data);

			// $(cmbDiscipline).empty();
			// $(cmbDiscipline).append('<option value="">--</option>');


			// $.each(data, function(index, element) {
			// 	console.log('filterSelect');  
			// 	console.log(filterSelect);
			// 	console.log('element.disciplineID :'+element.disciplineID);
			// 	if (filterSelect.includes(element.disciplineID)) {
			// 		lstDisciplinasFiltradas.push({
			// 			disciplineID: element.disciplineID,
			// 			shdesc: element.shdesc
			// 		});
			// 	}
			// });

			// console.log('element');

			var lstDisciplinasFiltradas = [];

			$.each(data, function (index, element) {
				// console.log(element);
				var blnCheckElement = false;

				for (var i = 0; i < filterSelect.length; i++) {
					if (Number(element.disciplineID) === Number(filterSelect[i])) { //Number for garantia
						blnCheckElement = true; //atenão
						break;
					}
				}

				if (blnCheckElement) {
					lstDisciplinasFiltradas.push({ //insert only foud true
						disciplineID: element.disciplineID,
						shdesc: element.shdesc
					});
				}
			});



			//insert only vago, intervalo dinamicamente
			lstDisciplinasFiltradas.push({
				disciplineID: '-1',
				shdesc: 'Vago'
			});

			lstDisciplinasFiltradas.push({
				disciplineID: '-2',
				shdesc: 'Intervalo'
			});


			// console.log('lstDisciplinasFiltradas: ',lstDisciplinasFiltradas);

			$('#classTableWeekCalendar tbody td').each(function () {
				// var select = $(this).find('select');
				// select.empty();
				// select.append('<option value="">--</option>');

				// lstDisciplinasFiltradas.forEach(function(lstItem) {

				// 	select.append('<option value="' + lstItem.disciplineID + '">' + lstItem.shdesc + '</option>');
				// });

				var select = $(this).find('select');
				if (select.length === 0) { // caso seja a celula selecionada
					return
				};

				var selectedValue = select.val(); // guarda o valor atual selecionado

				select.empty(); // limpa o select
				select.append('<option value="">--</option>');

				lstDisciplinasFiltradas.forEach(function (lstItem) {
					var option = $('<option>', {  //pega os options
						value: lstItem.disciplineID,
						text: lstItem.shdesc
					});

					// valor anteriormente selecionado, marca como selecionado
					if (lstItem.disciplineID == selectedValue) {
						option.prop('selected', true);
					}

					select.append(option);
				});


			});

			return

			// lstDisciplinasFiltradas.forEach(function(lstItem) {

			// 	$(cmbDiscipline).append('<option value="' + lstItem.disciplineID + '">' + lstItem.shdesc + '</option>');
			// });

			// console.log("loadComboDisciplineGetAllFilterSelect finished");
			// ajaxloadComboDisciplineGetAll = false;

		},
		error: OnError
	})

}

// getTeacherByFilterForm propreties
function getClassRoomByFilterForm(objFilters) {

	Pace.restart();
	//Pace.track(function () { })
	console.log('getClassRoomByFilterForm... run');
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'classRoom': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/classRoomGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log('data..');
				
			var blnCheckToolTableTeacher = false
			var blnCheckToolTableStudent = false
			var blnCheckToolTableWeekCalendar = false


			$.each(data, function (index, element) {

				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
					$("#classRoomID").val(element.classRoomID);
					// console.log('propreties');	
				}
				// console.log('copy');			

				// function getParamURL(parm) {
				// 	return new URLSearchParams(window.location.search).get(parm);
				// }

				var ajaxloadComboPeriodGetAll = true;
				var ajaxLoadComboClassGetAll = true;
				var ajaxloadComboBaseYearGetAll = true;

				(async () => {
					console.log("waiting for ajaxloadComboPeriodGetAll");
					while (ajaxloadComboPeriodGetAll) {
						console.log('period loading...');
						await new Promise(resolveloadComboPeriodGetAll => setTimeout(resolveloadComboPeriodGetAll, 1000));
					}
					$("#classRoomPeriod").val(element.classRoomPeriodID);
					console.log('period load...');
				})();

				(async () => {
					console.log("waiting for ajaxLoadComboClassGetAll");
					while (ajaxLoadComboClassGetAll) {
						console.log('segment loading...');
						await new Promise(resolveloadComboClassRoomGetAll => setTimeout(resolveloadComboClassRoomGetAll, 1000));
					}

					$("#classRoomSegment").val(element.classRoomSegmentID);
					console.log('segment load...');
				})();

				(async () => {
					console.log("waiting for ajaxloadComboBaseYearGetAll");
					while (ajaxloadComboBaseYearGetAll) {
						console.log('baseYear loading...');
						// console.log('ajaxloadComboBaseYearGetAll: ',ajaxloadComboBaseYearGetAll);
						await new Promise(resolveloadajaxloadComboBaseYearGetAll => setTimeout(resolveloadajaxloadComboBaseYearGetAll, 1000));
					}

					$("#classRoomBaseYear").val(element.classRoomBaseYearID);
					console.log('baseYear load...');
				})();

				var ajaxloadComboPeriodGetAll = false;
				var ajaxLoadComboClassGetAll = false;
				var ajaxloadComboBaseYearGetAll = false;

				// obriga colocar novo nome
				function getParamURL(parm) {
					return new URLSearchParams(window.location.search).get(parm);
				}

				if (getParamURL('copy')) {
					$("#classRoomNumber").val('');
					console.log('copy true');
				} else {

					$("#classRoomNumber").val(element.shdesc);
				}

				$("#classRoomID").val(element.classRoomID);
				$("#classRoomFgAtv").val(element.fgAtv);


				//inclusion tbl filterRuleDisciplineID = id da disciplina tableTeacherDiscipline
				//Incluindo na #classTableTeacher e tbm o filterRuleDisciplineID
				var tableTeacher = $('#classTableTeacher').DataTable();
				var dataRowsTeacher = element.lstTblClassRoomTeacher
				// console.log(dataRowsTeacher.length);
				if(dataRowsTeacher.length > 0) {
					console.log('list teacher loading..');
					var arrayTratament = dataRowsTeacher.map(element => { //add studentID no obj dentro do array
						// console.log(element);
						return {
							...element,
							filterRuleDisciplineID: element.tableTeacherDiscipline,
							teacherID: element.tableTeacherID,
							fullName: element.tableTeacherName
						};
					});

					tableTeacher.rows.add(arrayTratament).draw();
					blnCheckToolTableTeacher = true;

				}else{
					console.log('not teacher listed');
				}
				

				//Incluindo na #classTableStudent e tbm o studentID, fullName para não dar conflito na tbl
				var tableStudent = $('#classTableStudent').DataTable();
				var dataRowsStudent = element.lstTblClassRoomStudent
				if(dataRowsStudent.length > 0){
					console.log('list student loadin...');
					// console.log(dataRowsStudent);
					var arrayTratament = dataRowsStudent.map(element => { //add studentID no obj dentro do array
						return {
							...element,
							studentID: element.tableStudentID,
							fullName: element.tableStudentName,
							userID: element.tableStudentUserID,
							tableStudentID: '',
							tableStudentName: ''
						};
					});
					// console.log(arrayTratament);
					tableStudent.rows.add(arrayTratament).draw();
					blnCheckToolTableStudent = true;

				}else{

					console.log('not studet listed');

				}
				


				//Incluindo na #classTableTeacher, trecho original em classRoomEdit, vira função?
				var table = $('#classTableTeacher').DataTable();
				var dataTblArray = table.rows().data().toArray();
				var allValuesLst = [];

				allValuesLst.push(-1); //inserindo vago
				allValuesLst.push(-2); //inserindo Intervalo

				dataTblArray.forEach(function (row) {
					// console.log(row);
					allValuesLst.push(row.filterRuleDisciplineID);

				});
				// console.log(allValuesLst); //values para o select
				loadComboDisciplineGetAllFilterSelect(null, allValuesLst); //inserindo os selects

				$.each(data, function (index, element) {
					// console.log('element: ', element.lstTblClassRoomTime);

					var arrayOk = element.lstTblClassRoomTime;

					if(arrayOk.length > 0){
						console.log('list discipline loading...');
						blnCheckToolTableWeekCalendar = true;
					
						// each para andar cada objeto dentro do array lstTblClassRoomTime
						$.each(arrayOk, function (i, elementDiscipline) {
							// console.log('arrayOk: ',arrayOk);
							var checkbox = ' ';
							var beginHour = elementDiscipline.tableTimeStart || '';
							var beginHour = beginHour.slice(0, -3);
							var endHour = elementDiscipline.tableTimeEnd || '';
							var endHour = endHour.slice(0, -3);

							// daysWeek array de acordo com que vem do DB
							// Original
							// var daysWeek = ['tableTimeWK_1', 'tableTimeWK_2', 'tableTimeWK_3','tableTimeWK_4', 'tableTimeWK_5', 'tableTimeWK_6', 'tableTimeWK_7'];
							// removido 'tableTimeWK_1', pois estava empurrando para esquerda a tbl
							var daysWeek = [
								'tableTimeWK_2', 'tableTimeWK_3',
								'tableTimeWK_4', 'tableTimeWK_5', 'tableTimeWK_6', 'tableTimeWK_7'
							];

							var buttons = daysWeek.map(function (element) {
								var val = elementDiscipline[element];
								// console.log(val);
								// montagem do select mancando o val selecionado
								var optionsBtn = allValuesLst.map(function (element) {
									// console.log('element: ',element);
									var selected;
									if (element === val) {
										selected = 'selected';
										// console.log('igual element === val ');

									} else {
										selected = '';
									}
									// console.log(`value="${element}" ${selected}>${element}`);
									return `<option value="${element}" ${selected}>${element}</option>`;
								}).join('');

								return `<select class="form-control text-xs select-table-bip-combo">${optionsBtn}</select>`;
							});

							var row = [checkbox, beginHour, endHour, ...buttons];

							// console.log(row);

							tblClassTableWeekCalendar.row.add(row); // adiciona linha


						});

					}else{
						console.log('not discipline listed');
					}
				});




				tblClassTableWeekCalendar.draw();

				$('#baseYearID').removeAttr('disabled');
				$("#classRoomCreatedBy").val((element.createdByFullName != null && element.createdByFullName != "" ? element.createdByFullName : element.createdBy));
				$("#classRoomCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#classRoomModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != "" ? element.modifiedByFullName : element.modifiedBy));
				$("#classRoomModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));

				if(blnCheckToolTableTeacher == true){

					$('#btnToolTableTeacher').click();

				}

				if(blnCheckToolTableStudent == true){

					$('#btnToolTableStudent').click();

				}

				if(blnCheckToolTableWeekCalendar == true){

					$('#btnToolTableWeekCalendar').click();
					
				}

				$("#classRoomID").focus();


			});

			console.log("getClassRoomByFilterForm finished");
		}
	});

}

function getModalTeacherByFilterForm(objFilters, cmbclass) {

	Pace.restart();
	//Pace.track(function () { })

	// console.log(objFilters);
	console.log('getModalTeacherByFilterForm ... begin');
	console.log('list Elementes');

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

				$(cmbclass).empty();
				$(cmbclass).append('<option value="">--</option>');
				$.each(data, function (index, element) {
					// console.log(element);
					if (element.fgAtv != 'N') {

						$(cmbclass).append('<option value="' + element.teacherID + '">' + element.fullName + '</option>');
					}
				});
				$(cmbclass).addClass('is-valid');

			});

			console.log("getModalTeacherByFilterForm finished");
		}
	});

}


function getTeacherEventChangeByFilterTable(objDataTable, objFilters, lstExclusion) {

	// console.log(objFilters);
	console.log('getTeacherEventChangeByFilterTable... begin');
	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'teacher': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/teacherGetByFilter',
		global: false,
		success: function (data) {


			data = JSON.parse(data);

			var data2 = data.filter(function (element) {

				if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {
					//console.log("element.userID: " + element.userID);
					//console.log("$.inArray(element.userID, lstExclusion): " + $.inArray(element.userID, lstExclusion));				
					return $.inArray(element.userID, lstExclusion) == -1;
				} else
					return element;
			});

			// console.log(data2[0]);
			data2[0]['filterRuleDisciplineID'] = objFilters.teacherDiscipline;
			// console.log(data2);

			var blnDuplicate = false;
			var dataArrayDestiny = objDataTable.rows().data().toArray();
			outerLoop: //Forma interessante para sair do loop pois o return não estava funcionando
			for (let i = 0; i < dataArrayDestiny.length; i++) {
				const element = dataArrayDestiny[i];
				// console.log('element: ',element);
				if (objFilters.teacherDiscipline == dataArrayDestiny[i].filterRuleDisciplineID) {
					console.log('macth element');
					toastr.warning('Não é possível adicionar a disciplina.', 'Disciplina Duplicada');
					console.log('alert duplicated');
					$('#modalAddTeacher').attr('aria-hidden', 'false');
					$('#modalAddTeacher').modal('hide');
					blnDuplicate = true;
					break outerLoop;
				}
			}

			if (!blnDuplicate) {
				// $('#modalAddTeacher').attr('aria-hidden', 'false');
				objDataTable.rows.add(data2).draw();
				insertClassTableTeacher()
				$('#modalAddTeacher').modal('hide');

			}


			// if (objModal != null) {
			// 	objModal.modal('show');
			// }

			console.log("getTeacherEventChangeByFilterTable finished");
		}
	});

}

function getStudentLoaderByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	// console.log(objFilters);
	Pace.restart();
	//Pace.track(function () { })
	console.log('getStudentLoaderByFilterTable ...running');
	// console.log('list Elementes');

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'student': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/studentGetByFilter',
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



			objDataTable.clear();
			objDataTable.rows.add(data2).draw();

			// if (objModal != null) {
			// 	objModal.modal('show');
			// }


			console.log("getStudentLoaderByFilterTable finished");
		}
	});

}

function img64() {

	$.ajax({
		type: "GET",
		url: "ajax/imageBase64",
		success: function (data) {
			// console.log("Base64 da imagem:", data.base64);
			parm1 = data;
			$("#hidBase64").val(data.base64);
			// console.log('$("#hidBase64").val: ',$("#hidBase64").val());
		},
		error: function (xhr, status, error) {
			console.error("Erro ao obter imagem:", error);
		}
	});




}


// $.ajax({
//     type: "GET",
//     url: "ajax/a", // URL do servidor que retorna a base64
//     success: function (data) {
//         const logoBase64 = data.base64;

//         // Cria o PDF com a base64 recebida
//         const docDefinition = {
//             header: {
//                 columns: [
//                     { text: 'Logo Teste' },
//                     {
//                         image: logoBase64,  // Aqui você passa a base64
//                         width: 120,
// 						height: 60
//                     }
//                 ]
//             },
//             content: [
//                 { text: 'Logo vinda do servidor' }
//             ]
//         };

//         // Gerar o PDF
//         pdfMake.createPdf(docDefinition).open();
//     },
//     error: function (xhr, status, error) {
//         console.error("Erro ao obter imagem:", error);
//     }
// });









