function getGradeReportByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	console.log('objFilters'); 
	// console.log(objFilters); 
	console.log("getGradeReportByFilterTable... ")


	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'gradeTable': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/gradeTableGetByFilter',
		global: false,
		success: function (data) {


			// console.log('Sucesso');
			data = JSON.parse(data);
			// console.log(data);
			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!',{
					timeOut: 1000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					
				});
				return;
			}
			console.log('data Load...');

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


			console.log("getGradeReportByFilterTable finished");
			return
		}

	});

}

function getGradeReportStudentByFilterTable(objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	console.log("getGradeByFilterTable running")
	console.log(objFilters); 


	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'gradeTable': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/gradeTableGetByFilter',
		global: false,
		success: function (data) {


			// console.log('Sucesso');
			data = JSON.parse(data);
			// console.log(data);

			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
			}

			

			// console.log(data);	
			// var data2 = data.filter(function (element) {

			// 	// if (lstExclusion !== undefined && lstExclusion != null && lstExclusion.length > 0) {	
			// 	// 	//console.log("element.userID: " + element.userID);
			// 	// 	//console.log("$.inArray(element.userID, lstExclusion): " + $.inArray(element.userID, lstExclusion));	

			// 	// 	return $.inArray(element.userID, lstExclusion) == -1; 
			// 	// } else 
			// 	// console.log(element);
			// 	return element;
			// });

			$.each(data,function (index,element) { 
				console.log('Load Element');
				$('#schoolReportID').val(element.userID)
				$('#schoolReportName').val(element.shdesc).prop('disabled',true);
				$('#schoolReportClassRoom').val(element.classRoomName).prop('disabled',true);
			})




			objDataTable.clear();
			objDataTable.rows.add(data).draw();
			blnClick = true;


			// if (objModal != null) {
			// 	objModal.modal('show');
			// }


			console.log("getGradeReportStudentByFilterTable finished");
			$('#btnToolTableGradeView').click();
			
			return
		}
	});

}
// 

function getSchoolReportByFilterForm(objFilters) {

	Pace.restart();
	//Pace.track(function () { })

	// console.log(objFilters);
	console.log('getSchoolReportByFilterForm ...');

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'schoolReport': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/schoolReportGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			console.log(data);	
			console.log('data...');	

			var elementID = 0;
			$.each(data, function (index, element) {

				console.log('Loading element... ');
				var className = element.shdesc
				var segment;

				if(element.classRoomSegmentID == '1'){
					segment = 'INFANTIL'
				}else if(element.classRoomSegmentID == '2'){
					segment = 'FUNDAMENTAL 1'
				}else if(element.classRoomSegmentID == '3'){
					segment = 'FUNDAMENTAL 2'
				}else if(element.classRoomSegmentID == '4'){
					segment = 'ENSINO MÉDIO'
				}else if(element.classRoomSegmentID == '5'){
					segment = 'TÉCNICO'
				}
				
				var classBaseYear = element.baseYearID
				var arrayDate = controlBaseYear()
				var year = arrayDate[classBaseYear-1]
				
				var classPeriode = element.classRoomPeriod

				var date = getFormattedDateTime();
				date = date.split(' ');
				// console.log(date);
				$.each(element.lstTblClassRoomStudent, function(index,student){
					console.log('creat shool Report... ');

					var paiperPrint = `
				
					<div class="print-A4">

						<img src="bipescola/img/bipescola_logo_horizontal_transparent_login.png" class="logo-top-right">
						<form class="form-horizontal">

							<div class="card-body">

								<section class="content">
									<div class="container-fluid">
										<div class="row">
											<div class="col-12">

												<div class="card " >
													<!-- <div class="card-header title-table-bip"  >
														<h3 class="card-title " id="gradeViewTableTitle_${elementID}" > Aluno: ${student.tableStudentName} / Turma: ${className}</h3>

													</div> -->
													<div class="card-body" >
														<table id="gradeViewTable_${elementID}" class="table table-bordered table-hover">
															<thead>

																<tr>
																	<td colspan="20" align="left"><strong>Escola: </strong> CIEP 244 Oswaldo Aranha</td>
																</tr>

																<tr>
																	<td colspan="20" align="center"><strong>BOLETIM ESCOLAR</strong></td>
																	
																</tr>

																<tr>
																	<td colspan="15"><strong>Aluno:</strong> <span id="studentName_${elementID}">${student.tableStudentName}</span></td>
																	<td colspan="05" align=""><strong>Data de emissão:</strong> ${date[0]}-${date[1]}-${year}</td>
																</tr>

																<tr>
																	<td colspan="5"><strong>${segment}</strong></td>
																	<td colspan="5"><strong>Turno:</strong> ${classPeriode}</td>
																	<td colspan="5"><strong>Turma:</strong> ${className}</td>
																	<td colspan="6"><strong>Ano Letivo:</strong> ${year}</td>
																</tr>

																<tr>
																	<th rowspan="2">Disciplina</th>
																	<th colspan="3">BIMESTRE 1</th>
																	<th colspan="4">BIMESTRE 2</th>
																	<th colspan="3">BIMESTRE 3</th>
																	<th colspan="4">BIMESTRE 4</th>
																	<th rowspan="2">MF</th>
																	<th rowspan="2">REC</th>
																	<th rowspan="2">NF</th>
																	<th rowspan="2">Situação</th>
																</tr>
																<tr>
																	<th>AV1</th>
																	<th>AV2</th>
																	<th>MDB</th>
																	<th>AV1</th>
																	<th>AV2</th>
																	<th>MDB</th>
																	<th>RS1</th>
																	<th>AV1</th>
																	<th>AV2</th>
																	<th>MDB</th>
																	<th>AV1</th>
																	<th>AV2</th>
																	<th>MDB</th>
																	<th>RS2</th>
																</tr>
															</thead>

															<tbody id= 'bodyTable_${elementID}'>
																
															</tbody>             
														</table>

														<br>
														<br>
														<br>
														
														<div style="display: flex; align-items: center; margin-top: 20px;">
															
															<div style="border-top: 2px dashed black; flex: 1;"></div>
															<i class="far fa-hand-scissors style="margin-right: 8px;"></i>

														</div>
														<br>
														<br>
														<br>
														<br>
														<br>
														<br>

														<table width="100%" cellspacing="0" cellpadding="5">
															<tr style="border-bottom: none;">
																<td width="30%" style="padding-bottom: 30px;">
																	<strong>Pai (   ) | Mãe (   ) | Outro (   )</strong> 
																</td>
																<td width="10%" style="padding-bottom: 30px;">
																	 
																</td>
																
																<td width="20%" style="padding-bottom: 30px;">
																	 <strong>Outro:___________________________</strong> 
																</td>
																<td width="20%" style="padding-bottom: 30px;">
																	
																</td>
																<td width="20%" style="padding-bottom: 30px;">
																	
																</td>
															</tr>
															<tr style="border-bottom: none;">
																<td width="30%" style="padding-bottom: 100px;">
																	<strong>Aluno:</strong> ${student.tableStudentName} 
																</td>

																<td width="10%" style="padding-bottom: 100px;">
																	
																</td>
																
																<td width="20%" style="padding-bottom: 100px;">
																	<strong>Turma:</strong> ${className}
																</td>

																<td width="20%" style="padding-bottom: 100px;">
																	
																</td>

																<td width="20%" style="padding-bottom: 100px;">
																	
																</td>
															</tr>
															
															<tr>
																<td width="30%" style="border-top: 1px solid #000; text-align: center;">
																	Assinatura
																</td>

																<td width="10%" >
																	
																</td>

																<td width="20%" style="border-top: 1px solid #000; text-align: center;">
																	Doc. Identificação
																</td>

																<td width="20%" >
																	
																</td>
																
																<td width="20%" style="border-top: 1px solid #000; text-align: center;">
																	Data de entrega
																</td>
															</tr>
														</table>

														<div class="card-footer" style="display: none;">
															Footer
														</div>
													
													</div>
													
												
												</div>
												
											</div>
										</div>
									</div>
								</section>
							</div>

						</form>
						<footer class="main-footer" style="margin-left: 0px;">
							<strong>Copyright © 2025 - Viperzero Informática LTDA.</strong>
								Todos os direitos reservados.
								<div class="float-right d-none d-sm-inline-block">
								<b>Version</b> 1.0.0
							</div>
						</footer>
							
					</div>
					`
					// console.log(student.tableStudentName);
					// $('#studentName_'+elementID).text(student.tableStudentName);
					console.log('insert format paper...');
					$('#insertPageA4').append(paiperPrint);
					$('#gradeViewTable_'+elementID).wrap("<div class=\"gradeViewTableContainerTable\" style='overflow:auto; width:100%;position:relative;'></div>");
					
					
					$.each(student.lstGradeUserID, function(index,grade){
						console.log('Loading elemente grade...');
						// console.log(grade.disciplineName);
						
						// $('#discipline_397').text('TESTE');

						var rowsTable = `
						
							<tr>
								<!-- <td>7.0</td> -->
								<td>${grade.disciplineName}</td>
								<!-- <td>8.0</td> -->
								<td>${(grade.bim1Av1 == null || grade.bim1Av1 == '') ? '' : grade.bim1Av1 }</td>
								<td>${(grade.bim1Av2 == null || grade.bim1Av2 == '') ? '' : grade.bim1Av2 }</td>
								<td>${(grade.bim1Med == null || grade.bim1Med == '') ? '' : grade.bim1Med }</td>

								<td>${(grade.bim2Av1 == null || grade.bim2Av1 == '') ? '' : grade.bim2Av1 }</td>
								<td>${(grade.bim2Av2 == null || grade.bim2Av2 == '') ? '' : grade.bim2Av2 }</td>
								<td>${(grade.bim2Med == null || grade.bim2Med == '') ? '' : grade.bim2Med }</td>
								<td>${(grade.bim2RecSem1 == null || grade.bim2RecSem1 == '') ? '' : grade.bim2RecSem1 }</td>

								<td>${(grade.bim3Av1 == null || grade.bim3Av1 == '') ? '' : grade.bim3Av1 }</td>
								<td>${(grade.bim3Av2 == null || grade.bim3Av2 == '') ? '' : grade.bim3Av2 }</td>
								<td>${(grade.bim3Med == null || grade.bim3Med == '') ? '' : grade.bim3Med }</td>

								<td>${(grade.bim4Av1 == null || grade.bim4Av1 == '') ? '' : grade.bim4Av1 }</td>
								<td>${(grade.bim4Av2 == null || grade.bim4Av2 == '') ? '' : grade.bim4Av2 }</td>
								<td>${(grade.bim4Med == null || grade.bim4Med == '') ? '' : grade.bim4Med }</td>
								<td>${(grade.bim2RecSem2 == null || grade.bim2RecSem2 == '') ? '' : grade.bim2RecSem2 }</td>

								<td>${(grade.medFinish == null || grade.medFinish == '') ? '' : grade.medFinish }</td>
								<td>${(grade.recFinish == null || grade.recFinish == '') ? '' : grade.recFinish }</td>
								<td>${(grade.gradeEnd == null || grade.gradeEnd == '') ? '' : grade.gradeEnd }</td>
								<td>${(grade.status == null || grade.status == '') ? '' : grade.status }</td>
							</tr> 

						`

						
						
						$('#bodyTable_'+elementID).append(rowsTable);
						  
					})



					elementID++
				})

				
			});

			console.log("getSchoolReportByFilterForm finished");
		}


	});
	
	$('.gradeViewTableContainerTable').hide();

	
	// $('.card-body').click(function (e) { 
	// 	// e.preventDefault();
	// 	console.log('clicado');
	// 	$('.gradeViewTableContainerTable').toggle();
		
	// });

}