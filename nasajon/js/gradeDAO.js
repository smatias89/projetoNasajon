function saveGrade(objGrade) {
	
	console.log(objGrade);
	
	Pace.restart();
	//Pace.track(function () { })
	
	//console.log(JSON.stringify(objUser));
	//return;
	
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'grade' : JSON.stringify(objGrade) },
		datatype: "JSON",
		url: 'ajax/gradeSave',
		success: function (data) {
			
			console.log('gradeSave finished');
			
			data = JSON.parse(data);
			console.log(data);
			
			// toastr.success('Professor Cadastrado'+data.fullName+' com sucesso', 'Professor');
			if (data.message === undefined || data.message == "" || data.message == null) {
				// console.log(data.fullName,'>>>>');
				toastr.success('Salvo com sucesso', 'Disciplina: '+$('#gradeDisciplene option:selected').text(), {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						var httpLocation = $('#hidPageFrom').val(); 
						location.href = httpLocation;
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


//getGradeByFilterTable
function getGradeByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	console.log("getGradeByFilterTable running")
	// console.log(objFilters); 


	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'grade': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/gradeGetByFilter',
		global: false,
		success: function (data) {


			// console.log('Sucesso');
			data = JSON.parse(data);
			// console.log(data);
			console.log('load data...');

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
				// console.log(element);
				return element;
			});


			objDataTable.clear();
			objDataTable.rows.add(data2).draw();



			// if (objModal != null) {
			// 	objModal.modal('show');
			// }


			console.log("getGradeByFilterTable finished");
			return
		}
	});

}


function getGradeByFilterForm(objFilters,objDataTable) {

	Pace.restart();
	console.log(objFilters);
	
	$('#hidPageFrom').val();
	//Pace.track(function () { })
	console.log('getGradeByFilterForm...');
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'grade': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/gradeGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log(data);
			// console.log(data);


			$.each(data, function (indexInArray, element) { 

				console.log('Load element...');

				$('#gradeClassRoomID').val(element.classRoomID);
				$('#gradeTeacherName').val(element.teacherName).prop('disabled',true);
				
				$('#gradeClassRoom').append('<option value="' + element.classRoomID + '">' + element.shdesc + '</option>'); 
				var discipline = element.lstGradeDisciplineClass.filter(function(elemente2){
					// console.log(elemente2);
					return elemente2.disciplineID == $('#hidDisciplineID').val();
				})
				
				$('#gradeClassRoom').prop('disabled',true);
				$('#gradeDisciplene').val(element.disciplineID).change()
				$('#gradeDisciplene').prop('disabled',true);
				$('#gradeClassRoomNumber').val(element.tableTeacherName).prop('disabled',true);

				
				// var tableGradeStudent = $('#gradeStudentTable').DataTable();
				var dataRowsStudent = element.lstGradeDisciplineClass
				// console.log(dataRowsStudent.length);
				if(dataRowsStudent.length > 0) {
					console.log('List student... ');
					var arrayTratament = dataRowsStudent.map(element => { //add studentID no obj dentro do array
						// console.log(element);
						return{
							fullName: element.shdesc,
							userID:element.userID,
							// Bimestre 1
							b1Av1: element.bim1Av1 == null ? '' : element.bim1Av1,
							b1Av2: element.bim1Av2 == null ? '' : element.bim1Av2,
							b1Mdb: element.bim1Med == null ? '' : element.bim1Med,
					
							// Bimestre 2
							b2Av1: element.bim2Av1 == null ? '' : element.bim2Av1,
							b2Av2: element.bim2Av2 == null ? '' : element.bim2Av2,
							b2Mdb: element.bim2Med == null ? '' : element.bim2Med,
							b2Rs1: element.bim2RecSem1 == null ? '' : element.bim2RecSem1,
					
							// Bimestre 3
							b3Av1: element.bim3Av1 == null ? '' : element.bim3Av1,
							b3Av2: element.bim3Av2 == null ? '' : element.bim3Av2,
							b3Mdb: element.bim3Med == null ? '' : element.bim3Med,
					
							// Bimestre 4
							b4Av1: element.bim4Av1 == null ? '' : element.bim4Av1,
							b4Av2: element.bim4Av2 == null ? '' : element.bim4Av2,
							b4Mdb: element.bim4Med == null ? '' : element.bim4Med,
							b4Rs2: element.bim4RecSem2 == null ? '' : element.bim4RecSem2,
					
							// Média Final, Recuperação, Nota Final
							medF: element.medFinish == null ? '' : element.medFinish,
							recF: element.recFinish == null ? '' : element.recFinish,
							gradeFinish: element.gradeEnd == null ? '' : element.gradeEnd
						}
						
					});
					
					
					
					objDataTable.rows.add(arrayTratament).draw();
					$("#btnToolTableGrade").click();
					

				}else{
					console.log('not Student listed...');
					$('#cardBodyTableGrade').hide();
					toastr.warning('Nenhum estudante na turma', 'Atenção!');
				}

				var columnBlock = []
				var blockBimControl = element.lstGradeControl.filter(function(bimBlock){
					// console.log(bimBlock);
					if(bimBlock.flgBim1 == "N"){
						columnBlock.push('2');
						columnBlock.push('3');
						columnBlock.push('4');
					}else if(bimBlock.flgBim1 == "Y"){
						console.log('Bim1 not Block');
					}

					if(bimBlock.flgBim2 == "N"){
						columnBlock.push('5');
						columnBlock.push('6');
						columnBlock.push('7');
						columnBlock.push('8');

					}else if(bimBlock.flgBim2 == "Y"){
						console.log('Bim2 not Block');
					}

					if(bimBlock.flgBim3 == "N"){
						columnBlock.push('9');
						columnBlock.push('10');
						columnBlock.push('11');
						
					}else if(bimBlock.flgBim3 == "Y"){
						console.log('Bim3 not Block');
					}

					if(bimBlock.flgBim4 == "N"){
						columnBlock.push('12');
						columnBlock.push('13');
						columnBlock.push('14');
						columnBlock.push('15');
						columnBlock.push('16');
						columnBlock.push('17');
						columnBlock.push('18');
						
					}else if(bimBlock.flgBim4 == "Y"){
						console.log('Bim4 not Block');
					}




				})
				// bloqueador de notas
				
				// console.log(columnBlock);	


				$('#gradeStudentTable tbody tr').each(function () {
					var columnTable = $(this).find('td');
					columnBlock.forEach(colIdx => {
						$(columnTable[colIdx]).css({
							'pointer-events': 'none',
							'background-color': '#ffcccc'
						});
					});
				});


			});



			console.log("getGradeByFilterForm finished");
		}


	});

}

// function loadComboDisciplieGrade(objFilters,cmbAuto) {

// 	Pace.restart();
// 	console.log(objFilters);

// 	//Pace.track(function () { })
// 	console.log('loadComboDisciplieGrade...');
// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 'grade': JSON.stringify(objFilters) },
// 		datatype: "JSON",
// 		url: 'ajax/gradeGetByFilter',
// 		global: false,
// 		success: function (data) {

// 			data = JSON.parse(data);
// 			console.log(data);


// 			$(cmbAuto).append('<option value="">--</option>');   
// 			var option;
// 			$.each(data, function(index, element) {
// 				// console.log('element :>> ', element);
				
// 				$(cmbAuto).append('<option value="' + element.elementID + '">' + element.shdesc + '</option>');   
// 			});



// 			console.log("loadComboDisciplieGrade finished");
// 		}


// 	});

// }




