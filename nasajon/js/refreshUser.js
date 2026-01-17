
console.log('refreshUser ...');

var userNewID;
var objFilters = {};
objFilters.userID = $('#hidUserHeadID').val() 
objFilters.userLink = $('#hidUserLink').val(); 
objFilters.userName =  $('.info .d-block').eq(0).text(); 
objFilters.student =  $('.info .d-block').eq(1).text(); 

// console.log(objFilters);



// function informationGetByFilter(objFilters) {

// 	// console.log(objFilters);
// 	Pace.restart();
	
// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 'information': JSON.stringify(objFilters) },
// 		datatype: "JSON",
// 		url: 'ajax/informationGetByFilter.php',
// 		global: false,
// 		success: function (data) {

// 			data = JSON.parse(data);
// 			// console.log('information');
// 			console.log(data);
// 			// console.log(data[0].userLink);
// 			userNewID = data[0].userID;

//             selectBookSessionUpdate(null,userNewID)
// 			console.log("informationGetByFilter finished");
// 		}
// 	});


	
// }
// informationGetByFilter(objFilters)

// function getUserLinkByFilter(cmbclass, objFilters) { // antigo getStudentByFilterResponsible

// 	// console.log(objFilters);
// 	// Pace.restart();
// 	console.log('getUserLinkByFilter ... run ');
// 	//Pace.track(function () { })
// 	//return;

// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 'information': JSON.stringify(objFilters) },
// 		datatype: "JSON",
// 		url: 'ajax/informationGetByFilter',
// 		global: false,
// 		success: function (data) {

// 			console.log('get user for external ...');
// 			data = JSON.parse(data);
// 			userNewID = data[0].userID
// 			// console.log(data);
// 			console.log('data loading... ');
							
// 			if(data[0].staffID == null || data[0].staffID == ''){
// 				// console.warn('staffSegmentID == null... ');
// 				console.log('is a teacher or responsible...  ');
// 				newSessionUpdate(objFilters,data[0].userID,null); 
				
// 			}else{
// 				// console.warn('staffSegmentID != null... ');
// 				console.log('is a staff...  ');
// 				newSessionUpdate(objFilters,data[0].userID,data[0].staffSegmentID)
// 			}
			
// 			console.log('getUserLinkByFilter ... finished ');
// 		}
// 	});

// }



// function newSessionUpdate(objFilters,userNewID,staffSegmentID) { //antigo selectBookSessionUpdate

	
// 	// console.log(objFilters);
// 	// console.log('userNewID: ',userNewID);
// 	// console.log('staffSegmentID: ',staffSegmentID);
// 	console.log('newSessionUpdate ... run');
// 	// Pace.restart();

// 	//return
// 	// console.log('aqui');return
// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/
// 		data: { 
// 			// 'information': JSON.stringify(objFilters),
// 				'userNewID': userNewID,
// 				'staffSegmentID': staffSegmentID
// 		},
// 		datatype: "JSON",
// 		url: 'ajax/selectSessionUpdate.php',
// 		success: function (data) {
// 			if(objFilters.student == null || objFilters.student == ''){

// 				// console.log(objFilters.student);
				
// 				var messageLogin =`${objFilters.userName}`
// 			}else{
// 				var messageLogin =`${objFilters.userName}<br> Aluno: ${objFilters.student}`
// 			}
// 			toastr.success(messageLogin,'Bem-Vindo:',{
// 				timeOut: 1000,
// 				preventDuplicates: true,
// 				escapeHtml : false,
// 				positionClass: 'toast-top-right',
				
// 			});
// 			//console.log(data);
// 			// console.log('Session Relesed userID:', data);
// 			console.log('newSessionUpdate finished \nuser relesed...');
// 		},
// 		error: function () {
// 			console.error('Erro ao atualizar sessão');
// 		}
// 	});

// }

// getUserLinkByFilter(null, objFilters) //antigo getStudentByFilterResponsible

// getMessageBookTotalByFilterForm()

