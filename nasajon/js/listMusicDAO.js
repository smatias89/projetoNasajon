const keys = [
    { value: 'original',   label: 'Original' },
    { value: 'medley',   label: 'Medley' },

    { value: 'c',   label: 'C' },
    { value: 'cm',  label: 'Cm' },

    { value: 'cs',  label: 'C#' },
    { value: 'csm', label: 'C#m' },
    { value: 'db',  label: 'Db' },
    { value: 'dbm', label: 'Dbm' },

    { value: 'd',   label: 'D' },
    { value: 'dm',  label: 'Dm' },

    { value: 'ds',  label: 'D#' },
    { value: 'dsm', label: 'D#m' },
    { value: 'eb',  label: 'Eb' },
    { value: 'ebm', label: 'Ebm' },

    { value: 'e',   label: 'E' },
    { value: 'em',  label: 'Em' },

    { value: 'f',   label: 'F' },
    { value: 'fm',  label: 'Fm' },

    { value: 'fs',  label: 'F#' },
    { value: 'fsm', label: 'F#m' },
    { value: 'gb',  label: 'Gb' },
    { value: 'gbm', label: 'Gbm' },

    { value: 'g',   label: 'G' },
    { value: 'gm',  label: 'Gm' },

    { value: 'gs',  label: 'G#' },
    { value: 'gsm', label: 'G#m' },
    { value: 'ab',  label: 'Ab' },
    { value: 'abm', label: 'Abm' },

    { value: 'a',   label: 'A' },
    { value: 'am',  label: 'Am' },

    { value: 'as',  label: 'A#' },
    { value: 'asm', label: 'A#m' },
    { value: 'bb',  label: 'Bb' },
    { value: 'bbm', label: 'Bbm' },

    { value: 'b',   label: 'B' },
    { value: 'bm',  label: 'Bm' }
];

var $select = $('#listMusicKey');

$.each(keys, function (_, element) {
    $select.append(
        $('<option>', {
            value: element.value,
            text: element.label
        })
    );
});



//getDisciplineByFilterTable 
function getListMusicByFilterTable (objDataTable, objFilters, objModal, lstExclusion) {

	Pace.restart();
	//Pace.track(function () { })
	console.log("getListMusicByFilterTable... start 🔵");
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'listMusic': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/listMusicGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);

			console.log(data);	
			if (data.length == 0) {
				toastr.warning('Resultado não encontrado', 'Atenção!');
			}
			var data2 = data.filter(function (element) {

				return element;
			});

			// var actionOptions = {
			// 	iconPrefix: 'fad fa-fw',
			// 	classes: [],
			// 	contextMenu: {
			// 		enabled: true,
			// 		isMulti: false,
			// 		xoffset: -10,
			// 		yoffset: -10,
			// 		showSpeed: '0.50s',
			// 		headerRenderer: function (row) {

			// 			$('.dropdown-header').addClass('text-xs');

			// 			let tableID = objDataTable.table().node().id;
			// 			// console.log(objDataTable.rows().length);
			// 			// console.log(objDataTable.row($("#" + tableID + " tr.selected")).data());
			// 			if (objDataTable.rows().length > 1) {

			// 				// For when we have contextMenu.isMulti enabled and have more than 1 row selected
			// 				return objDataTable.rows().length + ' people selected';

			// 			} else {

			// 				// let tableID = objDataTable.table().node().id;
			// 				strTmp = objDataTable.row($("#" + tableID + " tr.selected")).data();
			// 				// console.log(strTmp);

			// 				if (strTmp.shdesc !== '')
			// 					return 'Disciplina: '+strTmp.shdesc;

			// 				else if (strTmp.disciplineID !== '')
			// 					return strTmp.disciplineID;

			// 				// else 
			// 				// 	return row.objectType;


			// 			}
			// 		},
			// 		headerIsFollowedByDivider: true,
			// 		showStaticOptions: false
			// 	},
			// 	buttonList: {
			// 		enabled: false,
			// 		iconOnly: true,
			// 		containerSelector: '#my-button-container',
			// 		groupClass: 'btn-group',
			// 		disabledOpacity: 0.0,
			// 		dividerSpacing: 10,
			// 	},
			// 	deselectAfterAction: false,
			// 	items: [// A normally hidden option that only appears for even rows. Do not render as a button/menu option unless the selected items adhere
			// 	// {
			// 	// 	type: 'option',
			// 	// 	multi: false,
			// 	// 	title: 'Show Modification History',
			// 	// 	iconClass: 'fas fa-list-alt mr-1',
			// 	// 	buttonClasses: ['btn', 'btn-outline-secondary'],
			// 	// 	contextMenuClasses: ['text-xs', 'text-secondary'],
			// 	// 	action: function (row) {
			// 	// 		let objAction = new Object();
			// 	// 		objAction.id = "showModificationHistoryTeacher" ;
			// 	// 		tableActions(objDataTable, objAction, false);
			// 	// 		console.log('Modification History Actions...');
			// 	// 	},
			// 	// 	// isHidden: function (row) {
			// 	// 	// 	return !(row.objectName != "");
			// 	// 	// },
			// 	// },
			// 	{
			// 		type: 'option',
			// 		multi: false,
			// 		title: 'Deletar',
			// 		iconClass: 'fas fa-trash-alt mr-1',
			// 		buttonClasses: ['btn', 'btn-outline-secondary'],
			// 		contextMenuClasses: ['text-xs', 'text-secondary'],
			// 		action: function (row) {
			// 			let objAction = new Object();
			// 			objAction.id = "deleteDiscipline";
			// 			tableActions(objDataTable, objAction, false);
			// 			console.log('Delete Actions...');
			// 		},
			// 		// isHidden: function (row) {
			// 		// 	return !(row.objectName != "");
			// 		// },
			// 	},
			// 	{
			// 		type: 'option',
			// 		multi: false,
			// 		title: 'Copiar',
			// 		iconClass: 'fas fa-copy mr-1',
			// 		buttonClasses: ['btn', 'btn-outline-secondary'],
			// 		contextMenuClasses: ['text-xs', 'text-secondary'],
			// 		action: function (row) {
			// 			let objAction = new Object();
			// 			objAction.id = "copyDiscipline" ;
			// 			tableActions(objDataTable, objAction, false,true);
			// 			console.log('Copy Actions...');
			// 		},
			// 		// isHidden: function (row) {
			// 		// 	return !(row.objectName != "");
			// 		// },
			// 	},
			// 	{
			// 		type: 'option',
			// 		multi: false,
			// 		title: 'Propriedades',
			// 		iconClass: 'fas fa-tools mr-1',
			// 		buttonClasses: ['btn', 'btn-outline-secondary'],
			// 		contextMenuClasses: ['text-xs', 'text-secondary'],
			// 		action: function (row) {
			// 			let objAction = new Object();
			// 			objAction.id = "propertiesDiscipline";
			// 			tableActions(objDataTable, objAction,false,true);
			// 			console.log('Properties Actions...');
			// 		},
			// 		// isHidden: function (row) {
			// 		// 	return !(row.objectName != "");
			// 		// },
			// 	}]
			// };

			// // And initialize our plugin
			// objDataTable.contextualActions(actionOptions);


			objDataTable.clear();
			objDataTable.rows.add(data2).draw();


			// if (objModal != null) {
			// 	objModal.modal('show');
			// }


			console.log("getListMusicByFilterTable... finish 🔴");
			return
		},error: function(xhr, status, error){
            // Função executada em caso de erro
            console.error("Ocorreu um erro: " + status + " - " + error);
		}
	});

}

function saveListMusic(obj) {
	
	// console.log(obj);
	
	Pace.restart();
	//Pace.track(function () { })
	
	
	$.ajax({
		type: "POST",
		// contentType: "application/json; charset=utf-8",	  
		data: {'listMusic' : JSON.stringify(obj) },
		datatype: "JSON",
		url: 'ajax/listMusicSave',
		success: function (data) {
			
			console.log('listMusic finished 🔵');
			// console.log(data);
			
			data = JSON.parse(data);
			
			if (data.message === undefined || data.message == "" || data.message == null) {
				toastr.success('Salvo com sucesso', 'Função: '+data.shdesc, {
					timeOut: 2000,
					preventDuplicates: true,
					positionClass: 'toast-top-right',
					// Redirect 
					onHidden: function() {
						
						location.href = 'listMusic';
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

//deleteListMusic
function deletListMusic(btnRefresh, objDelete) {

	var objListMusic = new Object();

	objListMusic.listMusicID = parseInt($('#hidListMusicID').val());
	objListMusic.actionType = $('#hidActionType').val();

	// console.log(objListMusic);return

	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		data: { 'listMusic': JSON.stringify(objListMusic) },
		datatype: "JSON",
		url: 'ajax/listMusicDelete',
		success: function (data) {

			console.log("deleteListMusic... start 🔵");
			data = JSON.parse(data);
			console.log(data);

			if (data.message === undefined || data.message == "" || data.message == null) {
				if (btnRefresh != null) {
					toastr.success('Deletada com sucesso!', 'Function: ' + objDelete);
					btnRefresh.click();

				}

			} else {
				toastr.error(data.message);
			}
			console.log("deleteListMusic... finish 🔴");
			$('#modalDelete').modal('hide');


		}
	});

}

// getTaskByFilterForm propreties
function getListMusicByFilterForm(objFilters) {

	Pace.restart();
	//Pace.track(function () { })
	// console.warn(objFilters);
	console.log("getListMusicByFilterForm... start 🔵");
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'listMusic': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/listMusicGetByFilter',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			// console.log(data, 'retorno');

			$.each(data, function (index, element) {

				// console.log(element);
				if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy") {
					$("#listMusicID").val(element.listMusicID);
				}


				$("#listMusicLink").val(element.link);
				$("#listMusicSinger").val(element.singer);
				$("#listMusicFullName").val(element.shdesc);
				$("#listMusicFgAtv").val(element.fgAtv);

				$('#listMusicKey').val(element.key).change();

				$("#listMusicCreatedBy").val((element.createdByFullName != null && element.createdByFullName != "" ? element.createdByFullName : element.createdBy));
				$("#listMusicCreatedDate").val(moment(element.createdDate).format(TO_PATTERN_DATETIME));
				$("#listMusicModifiedBy").val((element.modifiedByFullName != null && element.modifiedByFullName != "" ? element.modifiedByFullName : element.modifiedBy));
				$("#listMusicModifiedDate").val(moment(element.modifiedDate).format(TO_PATTERN_DATETIME));

				$("#listMusicID").focus();

			});

			console.log("getListMusicByFilterForm ... finish 🔴");
		}
	});

}


const MINHA_API_KEY_AQUI = 'AIzaSyARuUuBGB_JzmV1-6FLC4fFYeFSEfnnirc';

function extrairVideoId(url) {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getMusicByLinkYouTube(videoId){


	if (!videoId) {
        alert('Link inválido');
        return;
    }

	$.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos',
        method: 'GET',
        data: {
            part: 'snippet',
            id: videoId,
            key: MINHA_API_KEY_AQUI
        },
        success: function (data) {
            if (data.items.length === 0) {
                $('#resultado').html('Vídeo não encontrado');
                return;
            }

            const snippet = data.items[0].snippet;
            const titulo = snippet.title;
            const canal = snippet.channelTitle;

            // console.log('snippet: '+snippet+' titulo: '+ titulo +' canal: '+ canal);

			$('#listMusicSinger').val(canal);
			$('#listMusicFullName').val(titulo);

        },
        error: function (err) {
            console.error(err);
            alert('Erro ao consultar a API');
        }
    });
}







