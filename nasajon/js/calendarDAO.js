// console.log('classDAO');2802

function saveCalendar(objCalendar, calendar) {
	
	// console.log(objCalendar);
	
	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'calendar' : JSON.stringify(objCalendar) },
		datatype: "JSON",
		url: 'ajax/calendarSave',
		success: function (data) {
		
			// console.log('calendar finished');
			data = JSON.parse(data);
			// console.log(data);
				
			if (data.message === undefined || data.message == "" || data.message == null) {
				console.log('dentro message');
				toastr.success('Evento Salvo com Sucesso', 'Título: '+data.shdesc, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						// if (objTeacher.userID == "0") {
						// 	closeActiveTab("user-new");
						// } else {
						// 	closeActiveTab("user-" + objTeacher.userID);
						// }
						// location.href = 'calendar'

						
					}
				});

				// toastr.success('Evento Salvo com Sucesso', 'Título: '+data.shdesc)
				
			} else {
				toastr.error(data.message);
			}

			// limpa todos os eventos atuais
			calendar.removeAllEvents(); 

            // gambi... chama a função novamente para carregar e evita dar loader na página
            getCalendarLoaderEvent(calendar, {});

			calendar.refetchEvents();
			calendar.updateSize();
			calendar.render();
			
			return
			

			//$('#modalDelete').modal('hide');
		
		}
	});
	console.log('saveCalendar end... ');
}

function dropCalendar(objCalendar) {
	
	// console.log(objCalendar);
	console.log('calendar drop begin... ');

	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'calendar' : JSON.stringify(objCalendar) },
		datatype: "JSON",
		// url: 'ajax/calendarSave',
		url: 'ajax/calendarDrop',
		success: function (data) {
		
			console.log('calendar finished');
			data = JSON.parse(data);
			console.log(data);

			console.log('calendar drop finish... ')
			calendar.refetchEvents();
			calendar.updateSize();
			$('#modalDelete').modal('hide');
			return
			

			//$('#modalDelete').modal('hide');

			
		
		}
	});
			
}

//loader event in day of the calendar
function getCalendarLoaderEvent(objCalendar, objFilters) { //getCalendarByFilter

	Pace.restart();
	console.log('getCalendarLoaderEvent start... ');
	//Pace.track(function () { })
	// console.log(objFilters);
	// console.log('objCalendar: ', objCalendar);

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'scale': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/scaleGetByFilter',
		global: false,
		success: function (data) {


			// console.log('Sucesso');
			data = JSON.parse(data);
			// console.log(data);
			console.log('loader data...');
			
			data.forEach(element => {
				
				// console.log('element :>> ', element);
				objCalendar.addEvent({
					id: element.scaleID,
					title: element.shdesc,
					start: element.scaleDate,
					// end: element.endTime, /*new Date(element.startTime.replace(' ', 'T')),*/
					// url: element.linkUrl,
					backgroundColor: '#0913DB ' ,
					borderColor: '#0f0f10 ',
					allDay: true
				});

				// if(element.flgRecurrence == 'N' || element.flgRecurrence == '' || element.flgRecurrence == null){
				// 	// console.log('recorence Not');
				// 	objCalendar.addEvent({
				// 		id: element.eventID,
				// 		title: element.shdesc,
				// 		// groupId: element.parentEventID,
				// 		start: element.startTime,
				// 		end: element.endTime, /*new Date(element.startTime.replace(' ', 'T')),*/
				// 		url: element.linkUrl,
				// 		allDay: element.eventTypeID == 1 ? true : false,
				// 		backgroundColor: element.colorBG == null ? ' #0913DB' : element.colorBG ,
				// 		borderColor: element.colorBorder
				// 	});

				// }else if(element.flgRecurrence == 'Y'){
				// 	// console.log('recorence yes');
				// 	// console.log('element :>> ', element);
					
				// 	objCalendar.addEvent({
				// 		id: element.eventID,
				// 		title: element.shdesc,
				// 		groupId: element.parentEventID,
				// 		start: element.startTime,
				// 		end: element.endTime, /*new Date(element.startTime.replace(' ', 'T')),*/
				// 		url: element.linkUrl,
				// 		allDay: element.eventTypeID == 1 ? true : false,
				// 		backgroundColor: element.colorBG == null ? ' #0913DB' : element.colorBG ,
				// 		borderColor: element.colorBorder
				// 	});

				// }
				
				
				

			})
			

			// console.log(data);	

			// if (objModal != null) {
			// 	objModal.modal('show');
			// }


			console.log("getCalendarByFilter finished");
			return
		}
	});

}

function getCalendarLoaderEventMobile(objCalendar, objFilters) { //getCalendarByFilter

	Pace.restart();
	console.log('getCalendarLoaderEvent start... ');
	//Pace.track(function () { })
	// console.log(objFilters);
	// console.log('objCalendar: ', objCalendar);

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'scale': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/scaleGetByFilter',
		global: false,
		success: function (data) {


			// console.log('Sucesso');
			data = JSON.parse(data);
			console.log(data);
			console.log('loader data...');
			
			data.forEach(element => {
				
				// console.log('element :>> ', element);
				objCalendar.addEvent({
					id: element.scaleID,
					title: element.shdesc,
					start: element.dateTime,
					// end: element.endTime, /*new Date(element.startTime.replace(' ', 'T')),*/
					// url: element.linkUrl,
					backgroundColor: '#0913DB ' ,
					borderColor: '#2f2f37 ',
					allDay: false
				});

				

			})
			

			console.log("getCalendarByFilter finished");
			return
		}
	});

}

//deleteClassRoom
function deleteCalendar(btnRefresh,objDelete) {
	console.log('deleteCalendar start ... ');

	// console.log(objDelete);


	// console.log('objDelete :>> ', objDelete);
	//toastr.warning('no delete'); return
	Pace.restart();
	//Pace.track(function () { }) ok
	
	$.ajax({
		type: "POST",
		data: {'calendar' : JSON.stringify(objDelete) },
		datatype: "json",
		url: 'ajax/calendarDelete',
		success: function (data) {
		
			
			// console.log(data);
			
			if (data.message === undefined || data.message == "" || data.message == null) {

				// console.log('data.message == null');
				// console.log(data);
				if(objDelete.parentEventID == '' || objDelete.parentEventID == ' '){

					// remove único
					console.log('deletando unico');
					var eventId = objDelete.eventID;

					// pega filtrando a instância do evento pelo ID
					var evente = calendar.getEventById(eventId);
					evente.remove();
					// console.log("Evento removido com sucesso!");
					toastr.success('Deletada com sucesso!', 'Evento ' + objDelete.shdesc);

					
				}else if (objDelete.parentEventID != '') {
					// remove group

					var groupId = objDelete.parentEventID;
					// console.log('deletando grop');
					// console.log('groupId :>> ', groupId);

					//pegando tds eventos aqui
					var evente = calendar.getEvents();

					evente.forEach(function (evente) {
						// console.log(evente);
						// console.log('evente.groupId :>> ', evente.groupId);
						// console.log('groupId :>> ', groupId);
						if (evente.groupId == groupId) {
							// console.log('dentro - groupId');
							evente.remove();
						}
					});

					toastr.success('Deletada com sucesso todos eventos relacionados!', 'Evento ' + objDelete.shdesc);

				}

			} else {
				toastr.error(data.message);
			}

			// limpa todos os eventos atuais
			// calendar.removeAllEvents(); 

			// gambi... chama a função novamente para carregar e evita dar loader na página
			// getCalendarByFilter(calendar, {});

			calendar.refetchEvents();

			// $('#modalDelete').modal('hide');// neste caso não pega $('#modalDelete').hide()
			setTimeout(function() {
				$('#modalDeleteCalendar').modal('hide');
			}, 1500);
		
			console.log('calendar Delete finished');
	  	}
	});
			
}

//getTeacherByFilterForm edit event
function getCalendarByFilterEventType(objFilters) {

	Pace.restart();
	//Pace.track(function () { })

	// console.log(objFilters);
	console.log('getCalendarByFilterEventType Start... ');

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: {'calendar' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/calendarGetByFilter',
		global: false,
		success: function (data) {

			// console.log("getTeacherByFilterForm ")

			data = JSON.parse(data);
			// console.log(data);
			changeRecurrenceCalendar()
			$.each(data, function(index, element) {

				$('#eventAllDayStart,#eventAllDayEnd').val();//Input Data
				$('#eventStartInput,#eventEndInput').val(); //Input DataTime

				//campo hidden set zero para depois se for o caso setar parentEventIDElement
				$('#parentEventIDElement').val('0');
				
				console.log('Load Event for edit...');

				$('#eventID').val(element.eventID);
				$('#eventName').val(element.shdesc);
				$('#eventMeetURL').val(element.linkUrl);
				$('#eventType').val(element.eventTypeID);

				var flagOnlyDate = element.flgDate
				// console.log('flagOnlyDate :>> ', flagOnlyDate,);
				//cast startDate endDate
				var startDate = moment(element.startTime).format(TO_PATTERN_DATETIME)
				var endDate = moment(element.endTime).format(TO_PATTERN_DATETIME)


				if(element.eventTypeID == '1'){
					console.log('all day true && Only date ...');
					console.log('Dia todo, apenas data inicio ...');

					$('#eventTypeDay').prop('checked', true);
					$('#eventRecurrent').prop('checked', false);

					$("#divEventRecurrenceTime").hide();
					$("#divEventDataTime").hide();
					$('#divEventRecurring').hide();
					
        			$("#divEventData").show();
					// $("#divEventStart,#divEventEnd").hide();
        			$('#divEventAllDayStart').show();
					$('#divEventAllDayEnd').hide();

					

					$('#eventRecurringScheduleDay').prop('checked', false)
					$('#eventRecurringScheduleWeek').prop('checked', false)
					$('#eventRecurringScheduleMonth').prop('checked', false)

					// console.log('startDate :>> ', startDate);
					// console.log('dia inteiro sem data fim');
					$('#eventAllDayStart').datetimepicker('date', moment(startDate).set({ hour: 12 }));//Input Data
					

				}else{

					if(flagOnlyDate == "Y"){
						console.log('all day false && Only date ...');
						console.log('Dia todo, data inicio e data fim e data fim +1');

						$("#divEventRecurrenceTime").hide();

						$('#eventRecurringScheduleDay').prop('checked', false)
						$('#eventRecurringScheduleWeek').prop('checked', false)
						$('#eventRecurringScheduleMonth').prop('checked', false)
						// console.log('endDate :>> ', endDate);

						$('#eventTypeDay').prop('checked', true);
						$('#eventRecurrent').prop('checked', false);

        				// $('#divEventAllDayStart').show();
        				// $('#divEventAllDayEnd').show();
						$('#divEventAllDayEnd').show();

						// $('#divEventStart').hide();
						// $('#divEventEnd').hide();
						$('#divEventDateTime').hide();

						//recurring
						$('#divEventRecurring').hide();
						$('#divEventDataTime').hide();

						// console.log('startDate :>> ', startDate);
						// console.log('startDate :>> ', endDate);
						console.log('verification date...');
						if(startDate == endDate){

							console.log('start date = end date...');
							$('#divEventData').show();
							$('#eventAllDayStart').datetimepicker('date', moment(startDate).set({ hour: 12 }));//Input Data
							$('#eventAllDayEnd').datetimepicker('date', moment(endDate).set({ hour: 12 }));//Input Data

						}else if(startDate != endDate){
							// console.log('data inici e data fim diferente, tratar cast');
							console.log('start date != end date...');
							//cast para +1 dia
							console.log('execut cast -1 day..');
							$('#divEventData').show();
							var castDate = new Date(endDate);
							castDate.setDate(castDate.getDate() - 1);
			
							var endDateCast = castDate.toISOString(); //toISOString() converte para o formato padrão 
							// console.log(endDateCast);
							$('#eventAllDayStart').datetimepicker('date', moment(startDate).set({ hour: 12 }));//Input Data
							$('#eventAllDayEnd').datetimepicker('date', moment(endDateCast).set({ hour: 12 }));//Input Data
						}

						// $('#eventAllDayStart').datetimepicker('date', moment(startDate).set({ hour: 12 }));//Input Data
						// $('#eventAllDayEnd').datetimepicker('date', moment(endDate).set({ hour: 12 }));//Input Data

					}else if(flagOnlyDate == "N"){

						console.log('all day false && dateTime');
						console.log('Data Time inicio e fim');

						$('#eventTypeDay').prop('checked', false);
						$('#eventRecurrent').prop('checked', false);

						$('#divEventRecurring').hide();
						$("#divEventData").hide();
						$("#divEventRecurrenceTime").hide();

						$('#eventRecurringScheduleDay').prop('checked', false)
						$('#eventRecurringScheduleWeek').prop('checked', false)
						$('#eventRecurringScheduleMonth').prop('checked', false)

						$('#divEventDataTime').show();

						
						var startDate = moment(element.startTime).format(TO_PATTERN_DATETIME)
						var endDate = moment(element.endTime).format(TO_PATTERN_DATETIME)

						if(element.flgRecurrence == 'Y'){
							console.log('event recurrence');

							$('#saveEvent').text('Editar Todos');
							// console.log('parentEventIDElement: ',$('#parentEventIDElement').val());
							console.log('parentEventIDElement setted');
							$('#parentEventIDElement').val(element.parentEventID)

							//clear allDay
							$('#eventAllDayStartInput, #eventAllDayEndInput').val('');
							$('#eventStartInput, #eventEndtInput').val('');

							$('#eventRecurrent').prop('checked', true);

							$('#divEventRecurrenceTime').show();
							$('#saveEventEditOne').show();

							$('#divEventDataTime').hide();
							$('#divEventRecurrenceDayWeek').hide();

							var startDateRecurrence = moment(element.startRecurrence).format(TO_PATTERN_DATE)
							var endDateRecurrence = moment(element.endRecurrence).format(TO_PATTERN_DATE)

							// console.log('startDateRecurrence :>> ', startDateRecurrence);
							// console.log('endDateRecurrence :>> ', endDateRecurrence);

							$('#eventRecurrenceStart').datetimepicker('date', moment(startDateRecurrence)); 
							$('#eventRecurrenceEnd').datetimepicker('date', moment(endDateRecurrence));

							
							//set recurrence type
							if(element.recurrenceType == 'D'){

								console.log('event recurrence dally')
								$('#eventRecurringScheduleDay').prop('checked', true)
								$('#eventRecurringScheduleWeek').prop('checked', false)
								$('#eventRecurringScheduleMonth').prop('checked', false)
								$('#divEventRecurrenceDayWeek').hide();
								

							}else if(element.recurrenceType == 'W'){

								console.log('event recurrence week')
								$('#eventRecurringScheduleWeek').prop('checked', true)
								$('#eventRecurringScheduleDay').prop('checked', false)
								$('#eventRecurringScheduleMonth').prop('checked', false)
								$('#divEventRecurrenceDayWeek').show();

								
								// console.log(element.dayWeek);
								// console.log(Array.isArray(element.dayWeek));
								console.log('set day week...');
								$.each(element.dayWeek, function(index, element) {
									// console.log('element :>> ', element);
									console.log('set week day..');

									if(element == '0'){
										$('#eventRecurringSunday').prop('checked', true)
									}else if(element == '1'){
										$('#eventRecurringMonday').prop('checked', true)
									
									}else if(element == '2'){
										$('#eventRecurringTuesday').prop('checked', true)
									
									}else if(element == '3'){
										$('#eventRecurringWednesday').prop('checked', true)
									
									}else if(element == '4'){
										$('#eventRecurringThursday').prop('checked', true)
									
									}else if(element == '5'){
										$('#eventRecurringFriday').prop('checked', true)
									
									}else if(element == '6'){
										$('#eventRecurringSaturday').prop('checked', true)
									}

								})

							}else if(element.recurrenceType == 'M'){
								console.log('event recurrence Month')
								$('#eventRecurringScheduleMonth').prop('checked', true)
								$('#eventRecurringScheduleWeek').prop('checked', false)
								$('#eventRecurringScheduleDay').prop('checked', false)
								$('#divEventRecurrenceDayWeek').hide();
							}

							startDate = startDate.split(' ')
							endDate = endDate.split(' ')

							//old
							// $('#eventRecurrenceStart').datetimepicker('date', moment(startDate[0])); 
							// $('#eventRecurrenceEnd').datetimepicker('date', moment(endDate[0]));

							//construct startHour
							var hour = moment(startDate[1]).format('HH');
							var minute = moment(startDate[1]).format('mm');
							var startHour = moment().hours(hour).minutes(minute);

							$('#eventRecurrenceStartTime').datetimepicker('date', startHour); 

							//construct endtHour
							var hour = moment(endDate[1]).format('HH');
							var minute = moment(endDate[1]).format('mm');
							var endtHour = moment().hours(hour).minutes(minute);

							$('#eventRecurrenceEndTime').datetimepicker('date', endtHour);

						}

						// $('#divEventAllDayStart').hide();
        				// $('#divEventAllDayEnd').hide();
        				
						

						// $('#divEventStart').show();
						// $('#divEventEnd').show();
						

						//cast startDate endDate necessário permanecer caso o user troque na edição de tia todo para horário
						
						$('#eventStart').datetimepicker('date', moment(startDate)); //diferente do daterangepicker, tem que ter o cast antes para não dar erro
						$('#eventEnd').datetimepicker('date', moment(endDate));
						

					}

					// $("#divEventStart,#divEventEnd").show();
        			// $('#divEventAllDay').hide();

				}
		
				$('#colorSquare').css('color', (element.colorBorder));
				$('#eventColor').val(element.colorBG);

				//For DAO
				// $('#saveEventEditOne').hide();
				// $('#saveEvent').text('Salvar');
		
				
		

			})


			//check false para editar apenas 1 ou todos
			blnCheckEditOne = 'N';
			console.log("getCalendarByFilterEventType finished");
		}
	});

}

function getCalendarSearchByFilter(objFilters,objDataTable) {

	Pace.restart();
	//Pace.track(function () { })

	console.log(objFilters);
	console.log(objDataTable);

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: {'scale' : JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/scaleGetByFilter',
		global: false,
		success: function (data) {

			// console.log("getTeacherByFilterForm ")

			data = JSON.parse(data);
			console.log(data);
			// console.log(data.length);
			if(data.length == 0){
				toastr.warning('Evento não encontrado',$('#searchEventName').val(),{
					timeOut: 1500,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					
				});
				console.log('event not exist');
				return;
			}
			console.log('selected event...');
			
			console.log("getCalendarSearchByFilter finished");
			objDataTable.clear();
			objDataTable.rows.add(data).draw();
		},
		error: function () {
			toastr.error('Erro ao atualizar sessão','ERROR',{
				timeOut: 1500,
				preventDuplicates: true,
				positionClass: 'toast-top-right',
				
			});
			console.error('Erro ao atualizar sessão');
		}


	});

	

}

