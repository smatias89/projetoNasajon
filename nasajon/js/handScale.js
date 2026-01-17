var Toast;
var TO_PATTERN_DATETIME = "YYYY-MM-DD HH:mm:ss";
var TO_PATTERN_DATETIME_MILLISECONDS = "YYYY-MM-DD HH:mm:ss.SSS";
var TO_PATTERN_DATE = "YYYY-MM-DD";
var TO_PATTERN_HOUR_MINUTE = "HH:mm";
var TO_PATTERN_HOUR_MINUTE_SECONDS = "HH:mm:ss";
var TO_PATTERN_BRAZIL = "DD-MM-YYYY";
var TO_PATTERN_DATETIME_BRAZIL = "DD-MM-YYYY HH:mm:ss";
var TO_PATTERN_INBOX_DATETIME_BRAZIL = "ddd, DD-MM-YYYY HH:mm";

var ajaxLoadComboRestAPITypeGetAll = false;
var ajaxLoadComboSchoolBySession = false;
var ajaxLoadComboProfileGetAll = false;
var ajaxLoadComboSchoolGetAll = false;
var ajaxLoadComboGenderGetAll = false;
var ajaxLoadComboIncomeRangeGetAll = false;
var ajaxLoadCEP = false;

var ajaxLoadComboGraduationGetAll = false;
var ajaxloadComboDisciplineGetAll = false;
var ajaxloadComboSegmentGetAll = false;
var ajaxloadComboPeriodGetAll = false;
var ajaxloadComboResponsibleTypeGetAll = false;
var ajaxloadComboBaseYearGetAll = false;
var ajaxloadComboEventTypeAll = false;
var ajaxloadComboGroupGetAll = false;
var ajaxLoadComboAutocompleteGetAll = false;
var ajaxLoadComboClassGetAll = false;

var ajaxLoadComboTaskGetAll = false;

$('#searchIndex').click(function (e) { 
	console.log('clicado');
});
//----- buttons control general
// $('[id*="showModificationHist"]').hide();
$('.back-button').click(()=>{
	window.history.back();
})
$('.back-button').html('Voltar');
$('.new-button').html('<i class="fa fa-plus"></i> &nbsp;Novo');
$('.search-button').html('<i class="fa fa-search"></i>&nbsp;Buscar');
if($('.save-button').html() != '<i class="fas fa-link"></i>&nbsp;&nbsp;Link'){
	// console.log($('.save-button').html());
	$('.save-button').html('<i class="fa fa-save"></i>&nbsp;Salvar');
}
$('.delete-button').html('<i class="fa fa-trash-alt"></i>&nbsp;Apagar');
//---------------------------

// Pace Tracking
var activeRequests = 0;
$("#logout").on("click",function (e) { 
	e.preventDefault();
	e.stopImmediatePropagation();
    console.log('clicado');
	location.href = 'ajax/logoff';
    return false;
	
});

$(document).on("ajaxComplete", function(event, xhr, settings) {
	//console.log('end...');
	//console.log(settings.url);

	if ($.inArray(settings.url, Pace.options.ajax.ignoreURLs) == -1) {
		
		activeRequests--;
		if (activeRequests == 0) 
			Pace.restart();
	}  	

});

$(document).on("ajaxSend", function(event, xhr, settings) {
	//console.log('start...');
	//console.log(settings.url);

	if ($.inArray(settings.url, Pace.options.ajax.ignoreURLs) == -1) {
		if (activeRequests == 0) 
			Pace.stop(); // stop
		
		activeRequests++;
	}

});

$(document).ready(function(){

    $(".letterpic_left_panel").letterpic({
        fill: "color"
    });

    Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
    });

    //Fix for Multiple Modals
    $('.modal').on('show.bs.modal', function () {
        var $modal = $(this);
        var baseZIndex = 1050;
        var modalZIndex = baseZIndex + ($('.modal.show').length * 20);
        var backdropZIndex = modalZIndex - 10;
        $modal.css('z-index', modalZIndex).css('overflow', 'auto');
        $('.modal-backdrop.show:last').css('z-index', backdropZIndex);
    });
    $('.modal').on('shown.bs.modal', function () {
        var baseBackdropZIndex = 1040;
        $('.modal-backdrop.show').each(function (i) {
            $(this).css('z-index', baseBackdropZIndex + (i * 20));
        });
    });
    $('.modal').on('hide.bs.modal', function () {
        var $modal = $(this);
        $modal.css('z-index', '');
    });

    $('#logout').click(function () {
    logout();
    });

});

function getIndex(str, character, n) {
	
	var ret = str.split(character, n).join(character).length; 
	return ret >= str.length ? -1 : ret;
    //return str.split(character, n).join(character).length;
}

function reverseString(string){
    //-
    var regexSymbolWithCombiningMarks = /([\0-\u02FF\u0370-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uDC00-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF])([\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g;
    var regexSurrogatePair = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;
    //-

    //Step 1: deal with combining marks and astral symbols (surrogate pairs)
    string = string
        //Swap symbols with their combining marks so the combining marks go first
        .replace(regexSymbolWithCombiningMarks, function($0, $1, $2) {
            return reverse($2) + $1;
        })
        // Swap high and low surrogates so the low surrogates go first
        .replace(regexSurrogatePair, '$2$1');

    // Step 2: reverse the code units in the string
    var result = '';
    var index = string.length;
    while (index--) {
        result += string.charAt(index);
    }

    //Return value
    return result;
}

function compareValues(key, order = 'asc') {
	return function innerSort(a, b) {
	  if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
		// property doesn't exist on either object
		return 0;
	  }
  
	  const varA = (typeof a[key] === 'string')
		? a[key].toUpperCase() : a[key];
	  const varB = (typeof b[key] === 'string')
		? b[key].toUpperCase() : b[key];
  
	  let comparison = 0;
	  if (varA > varB) {
		comparison = 1;
	  } else if (varA < varB) {
		comparison = -1;
	  }
	  return (
		(order === 'desc') ? (comparison * -1) : comparison
	  );
	};
}

function copyToClipboard(elementId, blnDirectValue, objCodeMirror) {
	//console.log('copyToClipboard');
	if (blnDirectValue === undefined || blnDirectValue == false) {
		var copyText = document.getElementById(elementId);

		if(copyText.tagName === 'SELECT') {
			let text = $("#" + elementId + " option:selected").text();
			var copyText = document.createElement('input');
			copyText.setAttribute('value', text);
			document.body.appendChild(copyText);

		} else if(copyText.tagName === 'TEXTAREA' && objCodeMirror !== undefined) {
			// let text = $("#" + elementId + " option:selected").text();
			
			let text = objCodeMirror.getDoc().getValue("\n");
			var copyText = document.createElement('textarea');
			//copyText.setAttribute('value', text);
			copyText.value = text;
			document.body.appendChild(copyText);
		}

		// Select the text field
		copyText.select();
		copyText.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text inside the text field
		navigator.clipboard.writeText(copyText.value);

		// Alert the copied text
		//console.log("Copied the text: " + copyText.value);
	} else {
		navigator.clipboard.writeText(elementId);
	}
  
}

function findInArray(listOfObjects, predicate) {
	if (listOfObjects == null) {
	  throw new TypeError('listOfObjects is null or not defined');
	}

	var o = Object(listOfObjects);

	var len = o.length >>> 0;

	if (typeof predicate !== 'function') {
	  throw new TypeError('predicate must be a function');
	}

	var thisArg = arguments[1];

	var k = 0;

	while (k < len) {
	  var kValue = o[k];
	  if (predicate.call(thisArg, kValue, k, o)) {
		return kValue;
	  }
	  k++;
	}

	return undefined;
}

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function escapeHtml(string) {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

function decodeHtml(string) {
    var entityMap = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        '&quot;': '"',
        '&#39;': "'",
        '&#x2F;': "/"
    };
    return String(string).replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;/gi, function (s) {
        return entityMap[s];
    });
}

function getCurrentStartDate() {
	let analysisDateCurrentDate = new Date();
	let analysisDateCurrentMonth = analysisDateCurrentDate.getMonth();
	let analysisDateCurrentYear = analysisDateCurrentDate.getFullYear();
	let analysisDateStartDate = new Date(analysisDateCurrentYear, analysisDateCurrentMonth, 1);
	return analysisDateStartDate;
}
  
function openNewTab(strURL, strTabID, strTabTitle, blnClose) {
	/*Object.assign(document.createElement("a"), {
		target: "_blank",
		href: strURL
	}).click();
	*/	
	
	let Jq;
    if(top.location!==self.location){
        Jq = window.top.$; 
    } else {
        Jq = $;
    }

	if (strTabID === undefined) {
    	strTabID = strURL;
    	strTabID = strTabID.replace('./', '').replace(/["&'./:=?[\]]/gi, '-').replace(/(--)/gi, '');
		//console.log('strTabID -> ' + strTabID);
	}

	if (strTabTitle === undefined) {
		strTabTitle = strURL.substring(1);
	}

    if (existed = Jq('.iframe-mode .navbar-nav').find('#tab-' + strTabID).length > 0) {		
		window.top.iFrameInstance.switchTab('#tab-'+strTabID);
		if (blnClose !== undefined && blnClose == true) {			
			setTimeout(function () {
				//console.log('aqui');
				closeActiveTab();			
				setTimeout(function () {
					// console.log('aqui2');
					window.top.iFrameInstance.createTab(strTabTitle, strURL, strTabID, true);
				}, 200);
			}, 200);
		}
    } else {
        window.top.iFrameInstance.createTab(strTabTitle, strURL, strTabID, true);
		let iFrameDropDownOptions = Jq('.iframe-mode .dropdown-menu');
		iFrameDropDownOptions.append("<a class=\"dropdown-item\" href=\"#\" data-widget=\"iframe-close\" data-type=\"iframe-select-tab-" + strTabID + "\">" + strTabTitle + "</a>");
    }

}

function closeActiveTab(strTabID) {

	let Jq;
    if(top.location!==self.location){
        Jq = window.top.$; 
    } else {
        Jq = $;
    }

	if (strTabID === undefined) {
		window.top.iFrameInstance.removeActiveTab();
	} else {
		let objTmp = Jq('.iframe-mode .navbar-nav').find('#tab-' + strTabID);
		//console.log(objTmp);
		let navItem = objTmp.parent().find('.btn-iframe-close');
		navItem.click();
	}

}

function isOpenededTab(strTabID) {

	let Jq;
    if(top.location!==self.location){
        Jq = window.top.$; 
    } else {
        Jq = $;
    }

	let isOpenedTab = false;

	if (strTabID === undefined) {
		isOpenedTab = false;
	} else if (existed = Jq('.iframe-mode .navbar-nav').find('#tab-' + strTabID).length > 0) {	
		isOpenedTab = true;				
	} else {
		isOpenedTab = false;
	}

	return isOpenedTab;

}

function getActiveTab() {
	return window.top.iFrameInstance.getActiveTab();
}

function initCaps(str) {
    /*return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });*/
	
	//console.log('initCaps[start]: ' + str);

	let arrInitCaps = str.split(" ");

	for (let i = 0; i < arrInitCaps.length; i++) {
		arrInitCaps[i] = arrInitCaps[i][0].toUpperCase() + arrInitCaps[i].substr(1).toLowerCase();
	}

	return arrInitCaps.join(" ");
	
}

$('#sidebarSearchText').keyup(function(event) {
	if (event.key === "Enter") {
		let strURL = "/advancedSearch?objectName=" + $("#sidebarSearchText").val() + "&objectFilterType=NAME&objectViewType=TREETAB";
		let strTabID = "advancedSearch";
    	let strTabTitle = "Advanced Search";
    	openNewTab(strURL, strTabID, strTabTitle, true); 
	}
});

$('#sidebarSearchButton').click(function () {

    let strURL = "/advancedSearch?objectName=" + $("#sidebarSearchText").val() + "&objectFilterType=NAME&objectViewType=TREETAB";
	let strTabID = "advancedSearch";
	let strTabTitle = "Advanced Search";
	openNewTab(strURL, strTabID, strTabTitle, true); 

});

$('#leftMenuHome').click(function () {

	location.href = "index";

});

$('#logout').click(function () {

	location.href = "/login";

});

// function updateTitle(blnDefaultName, objSourceName, objCustomSourceName){
//     console.log('updateTitle...');
// 	console.log('blnDefaultName>>> ',blnDefaultName);
// 	console.log('objSourceName>>> ',objSourceName);
//     console.log('objSourceName.val()>>> ',objSourceName.val());
//     console.log('objSourceName.attr()>>> ',objSourceName.attr('id'));
	
//     if(objSourceName.val() == null || objSourceName.val() == ""){

// 		if (objCustomSourceName === undefined || objCustomSourceName == null || objCustomSourceName == "") {
//         	$('.title-' + objSourceName.attr('id').replace("Name","").replace("Shdesc","") + '-form').text(initCaps(objSourceName.attr('id').replace("Name","").replace("Shdesc","")) + ' - New ' + initCaps(objSourceName.attr('id').replace("Name","").replace("Shdesc","")) + (blnDefaultName?'':'*'));
// 		} else {
// 			$('.title-' + objSourceName.attr('id').replace("Name","").replace("Shdesc","") + '-form').text(objCustomSourceName + ' - New ' + objCustomSourceName + (blnDefaultName?'':'*'));
// 		}

//     } else {

// 		if (objCustomSourceName === undefined || objCustomSourceName == null || objCustomSourceName == "") {
//         	$('.title-' + objSourceName.attr('id').replace("Name","").replace("Shdesc","") + '-form').text(initCaps(objSourceName.attr('id').replace("Name","").replace("Shdesc","")) + " - " + objSourceName.val()+ (blnDefaultName?'':'*'));
// 		} else {
// 			$('.title-' + objSourceName.attr('id').replace("Name","").replace("Shdesc","") + '-form').text(objCustomSourceName + " - " + objSourceName.val()+ (blnDefaultName?'':'*'));
// 		}
//     }
	
// }

//TABLE ACTIONS

function tableActions(objDataTable, objAction, blnAdvancedSearch, blnOpenNewTab) {
	
	if (blnAdvancedSearch === undefined)
		blnAdvancedSearch = false;

	if (blnOpenNewTab === undefined)
	blnOpenNewTab = false;	

	// console.log('blnAdvancedSearch -> ' + blnAdvancedSearch);
	// console.log('objAction.id -> ' + objAction.id);

	// console.log(objDataTable);
	// console.log(objAction.id);
	
	let tableID = objDataTable.table().node().id;
	let selectedRows = $("#" + tableID + " tr.selected");

	//let rowsId = objDataTable.row(selectedRows).id();
	let rowsData = objDataTable.rows(selectedRows).data();

	
	//console.log(rowData);
	//console.log(rowId + ' - ' + rowData.jobName);
	//console.log('objAction: ' + objAction.id);
	/*if (objAction.id.includes("delete")) {
	
		rowsData[0].action = 'delete';
		console.log(rowsData);
	}
	if (objAction.id.includes("copy")) {
	
		rowsData[0].action = 'copy';
		console.log(rowsData);
	}
	*/

	if (objAction.id == 'propertiesUser') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		

			setTimeout(function () {

				// if (blnOpenNewTab) {
				// 	var strURL = "userEdit?userID=" + rowData.userID;

				// 	let strTabID = "user-" + rowData.userID ;
				// 	let strTabTitle = "User Edit - " + rowData.login;    	
				// 	openNewTab(strURL, strTabID, strTabTitle);
				
				// } else {
				// 	location.href = "userEdit?userID=" + rowData.userID;
				// }
				location.href = "userEdit?userID=" + rowData.userID;
			}, 500*objectIndexTmp);

		}			
		
	} else if (objAction.id == 'deleteUser') {
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log('rowData...');	
			setTimeout(function () {

				$('#hidUserID').val(rowData.userID);	
				$('#hidActionType').val("DELETE");
				let messageDelete = "Você confirma a exclusão do Usuário: " + rowData.fullName  + " - ID: " + rowData.userID + " ? ";
				$('.modal-title-delete').text("Deletar Usuário");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'deleteTask') {

		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {

				$('#hidTaskID').val(rowData.taskID);	
				$('#hidActionType').val("DELETE");
				let messageDelete = "Você confirma a exclusão da Task: " + rowData.shdesc  + " - ID: " + rowData.taskID + " ? ";
				$('.modal-title-delete').text("Deletar Função");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
		
	} else if (objAction.id == 'propertiesTask') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		

			setTimeout(function () {

				// if (blnOpenNewTab) {
				// 	var strURL = "taskEdit?schoolID=" + rowData.schoolID;

				// 	let strTabID = "school-" + rowData.schoolID ;
				// 	let strTabTitle = "School Edit - " + rowData.schoolName;    	
				// 	openNewTab(strURL, strTabID, strTabTitle);
				
				// } else {
				// 	location.href = "schoolEdit?schoolID=" + rowData.schoolID;
				// }
				location.href = "taskEdit?taskID=" + rowData.taskID;

			}, 500*objectIndexTmp);

		}			
		
	} else if (objAction.id == 'copyTask') {
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				// if (blnOpenNewTab) {
				// 	// var strURL = "disciplineEdit?deleteDisciplineID=" + rowData.disciplineID;

				// 	// let strTabID = "discipline-" + rowData.disciplineID ;
				// 	// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
				// 	// openNewTab(strURL, strTabID, strTabTitle);
				// 	location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID + "&copy=true";
				
				// } else {
				
				// 	location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID + "&copy=true";
				// }

				location.href = "taskEdit?taskID=" + rowData.taskID + "&copy=true";

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'deleteScaleType') {

		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {

				$('#hidScaleTypeID').val(rowData.scaleTypeID);	
				$('#hidActionType').val("DELETE");
				let messageDelete = "Você confirma a exclusão da Task: " + rowData.shdesc  + " - ID: " + rowData.scaleTypeID + " ? ";
				$('.modal-title-delete').text("Deletar Função");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
		
	} else if (objAction.id == 'copyScaleType') {
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				// if (blnOpenNewTab) {
				// 	// var strURL = "disciplineEdit?deleteDisciplineID=" + rowData.disciplineID;

				// 	// let strTabID = "discipline-" + rowData.disciplineID ;
				// 	// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
				// 	// openNewTab(strURL, strTabID, strTabTitle);
				// 	location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID + "&copy=true";
				
				// } else {
				
				// 	location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID + "&copy=true";
				// }

				location.href = "scaleTypeEdit?scaleTypeID=" + rowData.scaleTypeID + "&copy=true";

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'propertiesScaleType') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		
			// console.warn(rowData );
			setTimeout(function () {

				// if (blnOpenNewTab) {
				// 	var strURL = "ScaleTypeEdit?schoolID=" + rowData.schoolID;

				// 	let strTabID = "school-" + rowData.schoolID ;
				// 	let strTabTitle = "School Edit - " + rowData.schoolName;    	
				// 	openNewTab(strURL, strTabID, strTabTitle);
				
				// } else {
				// 	location.href = "schoolEdit?schoolID=" + rowData.schoolID;
				// }
				location.href = "ScaleTypeEdit?scaleTypeID=" + rowData.scaleTypeID;

			}, 500*objectIndexTmp);

		}			
		
	}  else if (objAction.id == 'deleteListMusic') {

		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				$('#hidListMusicID').val(rowData.listMusicID);	
				$('#hidActionType').val("DELETE");
				let messageDelete = "Você confirma a exclusão da Música: " + rowData.shdesc  + " - ID: " + rowData.listMusicID + " ? ";
				$('.modal-title-delete').text("Deletar Música");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
		
	} else if (objAction.id == 'copyScaleType') {
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				// if (blnOpenNewTab) {
				// 	// var strURL = "disciplineEdit?deleteDisciplineID=" + rowData.disciplineID;

				// 	// let strTabID = "discipline-" + rowData.disciplineID ;
				// 	// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
				// 	// openNewTab(strURL, strTabID, strTabTitle);
				// 	location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID + "&copy=true";
				
				// } else {
				
				// 	location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID + "&copy=true";
				// }

				location.href = "scaleTypeEdit?scaleTypeID=" + rowData.scaleTypeID + "&copy=true";

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'propertiesListMusic') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		
			// console.warn(rowData );
			setTimeout(function () {

				// if (blnOpenNewTab) {
				// 	var strURL = "ScaleTypeEdit?schoolID=" + rowData.schoolID;

				// 	let strTabID = "school-" + rowData.schoolID ;
				// 	let strTabTitle = "School Edit - " + rowData.schoolName;    	
				// 	openNewTab(strURL, strTabID, strTabTitle);
				
				// } else {
				// 	location.href = "schoolEdit?schoolID=" + rowData.schoolID;
				// }
				location.href = "listMusicEdit?listMusicID=" + rowData.listMusicID;

			}, 500*objectIndexTmp);

		}			
		
	}
	
	
	// OLD FOR SEARCH
	
	
	else if (objAction.id == 'propertiesSchool') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		

			setTimeout(function () {

				if (blnOpenNewTab) {
					var strURL = "schoolEdit?schoolID=" + rowData.schoolID;

					let strTabID = "school-" + rowData.schoolID ;
					let strTabTitle = "School Edit - " + rowData.schoolName;    	
					openNewTab(strURL, strTabID, strTabTitle);
				
				} else {
					location.href = "schoolEdit?schoolID=" + rowData.schoolID;
				}
			}, 500*objectIndexTmp);

		}			
		
	} else if (objAction.id == 'propertiesProfile') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		

			setTimeout(function () {

				if (blnOpenNewTab) {
					var strURL = "profileEdit?profileID=" + rowData.profileID;

					let strTabID = "profile-" + rowData.profileID ;
					let strTabTitle = "Profile Edit - " + rowData.profileName;    	
					openNewTab(strURL, strTabID, strTabTitle);
					
				
				} else {
					location.href = "profileEdit?profileID=" + rowData.profileID;
				}
			}, 500*objectIndexTmp);

		}			
		
	} else if (objAction.id == 'propertiesTeacher') {
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];	
			console.log(rowData);	

			setTimeout(function () {

				if (blnOpenNewTab) {
					// var strURL = "teacherEdit?teacherID=" + rowData.teacherID;

					// let strTabID = "teacher-" + rowData.teacherID ;
					// let strTabTitle = "teacher Edit - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "teacherEdit?teacherID=" + rowData.teacherID;
				
				} else {
				
					location.href = "teacherEdit?teacherID=" + rowData.teacherID;
				}
			}, 500*objectIndexTmp);

		}			

	} else if (objAction.id == 'showModificationHistoryTeacher') {
		toastr.warning('Em desenvolvimento','Atenção!');
		
	} else if (objAction.id == 'deleteTeacher') {
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				$('#hidTeacherID').val(rowData.teacherID);	
				$('#hidActionType').val("DELETE");
				let message = "Você confirma a exclusão do Docente: " + rowData.fullName  + " - ID: " + rowData.teacherID + " ? ";
				$('.modal-title-delete').text("Deletar Docente");
				$('.message-modal-delete').text(message);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'copyTeacher') {
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				if (blnOpenNewTab) {
					// var strURL = "disciplineEdit?deleteDisciplineID=" + rowData.disciplineID;

					// let strTabID = "discipline-" + rowData.disciplineID ;
					// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "teacherEdit?teacherID=" + rowData.teacherID + "&copy=true";
				
				} else {
				
					location.href = "teacherEdit?teacherID=" + rowData.teacherID + "&copy=true";
				}
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'infoTimeTeacher') {
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			// console.log('aqui');
			setTimeout(function () {

				var teacherTimes = new Object();
                teacherTimes.teacherID = rowsData[0].teacherID
                teacherTimes.teacherFullName = rowsData[0].fullName
                getTeacherTimeByFilterTable(tblTeacherInfoTime, teacherTimes, null, null)

				let message = "Professor: " + rowData.fullName;
				$('#modalTitleTeacherTime').text(message);
				

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'showModificationHistoryDiscipline') {
		toastr.warning('Em desenvolvimento','Atenção!');
		
	} else if (objAction.id == 'deleteDiscipline') {

		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				$('#hidDisciplineID').val(rowData.disciplineID);	
				$('#hidActionType').val("DELETE");
				let messageDeleteDiscipline = "Você confirma a exclusão da Disciplina: " + rowData.shdesc  + " - ID: " + rowData.disciplineID + " ? ";
				$('.modal-title-delete').text("Deletar Disiciplana");
				$('.message-modal-delete').text(messageDeleteDiscipline);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
		
	} else if (objAction.id == 'copyDiscipline') {
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				if (blnOpenNewTab) {
					// var strURL = "disciplineEdit?deleteDisciplineID=" + rowData.disciplineID;

					// let strTabID = "discipline-" + rowData.disciplineID ;
					// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID + "&copy=true";
				
				} else {
				
					location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID + "&copy=true";
				}
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'propertiesDiscipline') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];	
			// console.log(rowData)
			if(rowData.hasOwnProperty('filterRuleDisciplineID')){
				console.log('object :>> ', rowData.hasOwnProperty('filterRuleDisciplineID'));
				rowData.disciplineID = rowData.filterRuleDisciplineID
			}
			 
			setTimeout(function () {

				if (blnOpenNewTab) {
				
					location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID;
				
				} else {
				
					location.href = "disciplineEdit?disciplineID=" + rowData.disciplineID;
				}
			}, 500*objectIndexTmp);

		}

	} else if (objAction.id == 'showModificationHistoryClassRoom') {
		toastr.warning('Em desenvolvimento','Atenção!');
		
	} else if (objAction.id == 'deleteClassRoom') {

		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				$('#hidClassRoomID').val(rowData.classRoomID);	
				$('#hidActionType').val("DELETE");
				let messageDeleteClassRoom = "Você confirma a exclusão da Turma: " + rowData.shdesc  + " - ID: " + rowData.classRoomID + " ? ";
				$('.modal-title-delete').text("Deletar Turma");
				$('.message-modal-delete').text(messageDeleteClassRoom);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'copyClassRoom') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {

				if (blnOpenNewTab) {
					// var strURL = "classRoomEdit?deleteClassRoomID=" + rowData.classRoomID;

					// let strTabID = "discipline-" + rowData.disciplineID ;
					// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "classRoomEdit?classRoomID=" + rowData.classRoomID + "&copy=true";
				
				} else {
				
					location.href = "classRoomEdit?classRoomID=" + rowData.classRoomID + "&copy=true";
				}
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'propertiesClassRoom') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];	
			console.log(rowData);	
			setTimeout(function () {

				if (blnOpenNewTab) {
					// var strURL = "disciplineEdit?disciplineID=" + rowData.disciplineID;

					// let strTabID = "discipline-" + rowData.disciplineID ;
					// let strTabTitle = "discipline Edit - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "classRoomEdit?classRoomID=" + rowData.classRoomID;
				
				} else {
				
					location.href = "classRoomEdit?classRoomID=" + rowData.classRoomID;
				}
			}, 500*objectIndexTmp);

		}

	} else if (objAction.id == 'showModificationHistoryStudent') {
		toastr.warning('Em desenvolvimento','Atenção!');
		
	} else if (objAction.id == 'deleteStudent') {


		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				$('#hidStudentID').val(rowData.studentID);	
				$('#hidActionType').val("DELETE");
				let messageDelete = "Você confirma a exclusão do Aluno(a): " + rowData.fullName  + " - ID: " + rowData.studentID + " ? ";
				$('.modal-title-delete').text("Deletar Aluno");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'copyStudent') {
		toastr.warning('Em desenvolvimento','Atenção!');
		return

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {

				if (blnOpenNewTab) {
					// var strURL = "classRoomEdit?deleteClassRoomID=" + rowData.classRoomID;

					// let strTabID = "discipline-" + rowData.disciplineID ;
					// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "classRoomEdit?classRoomID=" + rowData.classRoomID + "&copy=true";
				
				} else {
				
					location.href = "classRoomEdit?classRoomID=" + rowData.classRoomID + "&copy=true";
				}
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'propertiesStudent') {

		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {
			
			let rowData = rowsData[objectIndexTmp];	
			// console.log(rowData);	
			
			setTimeout(function () {

				if (blnOpenNewTab) {
					// var strURL = "disciplineEdit?disciplineID=" + rowData.disciplineID;

					// let strTabID = "discipline-" + rowData.disciplineID ;
					// let strTabTitle = "discipline Edit - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "studentEdit?studentID=" + rowData.studentID;
				
				} else {
				
					location.href = "studentEdit?studentID=" + rowData.studentID;
				}
			}, 500*objectIndexTmp);

		}

	} else if (objAction.id == 'infoStudent') {

		toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {
			
			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {
				
				$('#hidClassRoomID').val(rowData.studentID);	
				$('#hidActionType').val();
				if ($('#hidActionType').val()) 
					console.log('hideaction true');
				let message = "Aluno: " + rowData.fullName  + " - ID: " + rowData.studentID;
				$('.modal-title-delete').text("Deletar Turma");
				$('.modal-title-info').text(message);
				$('#modalInfo').modal('show');
				
			}, 500*objectIndexTmp);
			
		}
		return
		
	} else if (objAction.id == 'propertiesStaff') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		

			setTimeout(function () {

				if (blnOpenNewTab) {
					var strURL = "staffEdit?staffID=" + rowData.staffID;

					let strTabID = "staff-" + rowData.staffID ;
					let strTabTitle = "Staff Edit - " + rowData.fullName;    	
					openNewTab(strURL, strTabID, strTabTitle);
				
				} else {
					location.href = "staffEdit?staffID=" + rowData.staffID;
				}
			}, 500*objectIndexTmp);

		}			
	} else if (objAction.id == 'deleteStaff') {


		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	
			setTimeout(function () {

				$('#hidStaffID').val(rowData.staffID);	
				$('#hidActionType').val("DELETE");
				let messageDelete = "Você confirma a exclusão do Usuário: " + rowData.fullName  + " - ID: " + rowData.staffID + " ? ";
				$('.modal-title-delete').text("Deletar Usuário");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'copyStaff') {
		toastr.warning('Em desenvolvimento','Atenção!');
		
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {

				if (blnOpenNewTab) {
					
					// let strTabID = "discipline-" + rowData.disciplineID ;
					// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "staffEdit?staffID=" + rowData.staffID + "&copy=true";
				
				} else {
				
					location.href = "staffEdit?staffID=" + rowData.staffID + "&copy=true";
				}
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'removeTeacherTable') {
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {


				$('.deleteConfirmation').attr('id','deleteRowTeacher');
				let messageDelete = "Você deseja remover: " + rowData.fullName +" ? ";
				$('.modal-title-delete').text("Remover Professor(a)");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show')

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'deleteClassRoomTableStudent') {

		setTimeout(function () {


			$('.deleteConfirmation').attr('id','deleteTableClassRoomStudent');
			let messageDelete = "Você deseja apagar todos os alunos? ";
			$('.modal-title-delete').text("Remover Todos os Alunos");
			$('.message-modal-delete').text(messageDelete);
			$('#modalDelete').modal('show')

		}, 700);


	} else if (objAction.id == 'deleteClassRoomOnlyStudent') {

		setTimeout(function () {
			$('.deleteConfirmation').attr('id','deleteTableClassRoomOnlyStudent');
			let messageDelete = "Você deseja remover o Aluno? ";
			$('.modal-title-delete').text("Remover estudante");
			$('.message-modal-delete').text(messageDelete);
			$('#modalDelete').modal('show')

		}, 500);

		
	} else if (objAction.id == 'deleteClassRoomSelectedStudent') {

		setTimeout(function () {
			$('.deleteConfirmation').attr('id','deleteTableClassRoomSelectedStudent');
			let messageDelete = "Você deseja remover os Alunos Selecionados? ";
			$('.modal-title-delete').text("Remover estudantes");
			$('.message-modal-delete').text(messageDelete);
			$('#modalDelete').modal('show')

		}, 500);

		
	} else if (objAction.id == 'deleteWeekCalendar') {

		setTimeout(function () {


			$('.deleteConfirmation').attr('id','deleteTableWeekCalendar');
			let messageDelete = "Você deseja remover TODOS os horários ? ";
			$('.modal-title-delete').text("Remover horário");
			$('.message-modal-delete').text(messageDelete);
			$('#modalDelete').modal('show')

		}, 700);

		
	} else if (objAction.id == 'deleteOnlyRowWeekCalendar') {

		setTimeout(function () {


			$('.deleteConfirmation').attr('id','deleteTableRowWeekCalendar');
			let messageDelete = "Você deseja remover o horário ? ";
			$('.modal-title-delete').text("Remover horário");
			$('.message-modal-delete').text(messageDelete);
			$('#modalDelete').modal('show')

		}, 700);

		
	} else if (objAction.id == 'deleteRowsSelectedWeekCalendar') {

		setTimeout(function () {


			$('.deleteConfirmation').attr('id','deleteTableRowsSelectedWeekCalendar');
			let messageDelete = "Você deseja remover os horários Selecionados ? ";
			$('.modal-title-delete').text("Remover horário");
			$('.message-modal-delete').text(messageDelete);
			$('#modalDelete').modal('show')

		}, 700);

		
	} else if (objAction.id == 'propertiesGroupMessage') { 

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		

			setTimeout(function () {

				// if (blnOpenNewTab) {
				// 	var strURL = "staffEdit?staffID=" + rowData.staffID;

				// 	let strTabID = "staff-" + rowData.staffID ;
				// 	let strTabTitle = "Staff Edit - " + rowData.fullName;    	
				// 	openNewTab(strURL, strTabID, strTabTitle);
				
				// } else {
				// 	location.href = "staffEdit?staffID=" + rowData.staffID;
				// }
				location.href = "groupMessageEdit?groupMessageID=" + rowData.groupMessageID;
			}, 500*objectIndexTmp);

		}			

	} else if (objAction.id == 'deleteGroupMessage') { 


		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {
	
			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData.groupMessageID);	
			setTimeout(function () {
	
				$('#hidGroupMessageID').val(rowData.groupMessageID);	
				$('#hidActionType').val("DELETE");
				let messageDelete = "Você confirma a exclusão do Grupo(a): " + rowData.shdesc  + " - ID: " + rowData.groupMessageID + " ? ";
				$('.modal-title-delete').text("Deletar Grupo");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show');
	
			}, 500*objectIndexTmp);
	
		}
		
	} else if (objAction.id == 'deleteMessageBip') { 


		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {
	
			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {
	
				$('#hidMessageBipID').val(rowData.messageBipID);	console.log($('#messageBipID').val());
				$('#hidActionType').val("DELETE");
				let messageDelete = "Você confirma a exclusão da Mensagem: " + rowData.subject  + " - ID: " + rowData.messageBipID + " ? ";
				$('.modal-title-delete').text("Deletar Mensagem");
				$('.message-modal-delete').text(messageDelete);
				$('#modalDelete').modal('show');
	
			}, 500*objectIndexTmp);
	
		}
		
	} else if (objAction.id == 'propertiesMessageBip' || objAction.id == 'openMessageBip') {

		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];		

			setTimeout(function () {

				location.href = "messageBipEdit?messageBipID=" + rowData.messageBipID;

			}, 500*objectIndexTmp);

		}			

	} else if (objAction.id == 'copyMessageBip') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {

				if (blnOpenNewTab) {
					// var strURL = "classRoomEdit?deleteClassRoomID=" + rowData.classRoomID;

					// let strTabID = "discipline-" + rowData.disciplineID ;
					// let strTabTitle = "discipline Delete - " + rowData.fullName;    	
					// openNewTab(strURL, strTabID, strTabTitle);
					location.href = "messageBipEdit?messageBipID=" + rowData.messageBipID + "&copy=true";
				
				} else {
				
					location.href = "messageBipEdit?messageBipID=" + rowData.messageBipID + "&copy=true";
				}
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'openMessageBook') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);
			var isResponsible = $('#hidIsResponsible').val();
			var isStaff = $('#hidIsStaff').val();
			var isTeacher = $('#hidIsTeacher').val();
			var sendType = '';


			console.log('isResponsible: ',isResponsible);
			console.log('isStaff: ',isStaff);
			console.log('isTeacher: ',isTeacher);

			if(isResponsible != '' || isResponsible == null){
				sendType = isResponsible;
				console.log('set sender type 1... ');
				
			}else if(isStaff != '' || isStaff == null){
				sendType = isStaff;
				console.log('set sender type 2... ');
				
			}else if(isTeacher != '' || isTeacher == null){
				sendType = isTeacher;
				console.log('set sender type 3... ');
				
			}
			console.log('sendType: ',sendType);
			
			setTimeout(function () {

				location.href = "messageBook?messageBookFrom=" + rowData.userFromID+"&type="+sendType ;
				
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'gradeClassRoom') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];

			var objFilters = new Object();
    		objFilters.classRoomID = rowData.classRoomID
			loadComboDisciplieGrade(objFilters,$('#classRoomDisciplineGrade'));
			$('#modalSelectDisplineGrade').modal('show')
			return
			setTimeout(function () {
				
				location.href = "classRoomGrade?gradeClassRoomID=" + rowData.classRoomID +"&disciplineID="+rowData.disciplineID+"&from="+pageFrom ;
				
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'editGrade') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {
				
				location.href = "classRoomGrade?gradeClassRoomID=" + rowData.classRoomID +"&disciplineID="+rowData.disciplineID ;
				
			}, 500*objectIndexTmp);

		}
		
	
	} else if (objAction.id == 'editGradeControl') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	return
			setTimeout(function () {

				location.href = "gradeControlEdit?gradeControlEditID=" + rowData.gradeControlID ;
				
			}, 500*objectIndexTmp);

		}

	} else if (objAction.id == 'viewSchoolReport') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	return
			setTimeout(function () {

				location.href = "schoolReportView?schoolReportID=" + rowData.userID ;
				
			}, 500*objectIndexTmp);

		}

	} else if (objAction.id == 'printSchoolReport') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	return
			setTimeout(function () {

				location.href = "schoolReportStaffEdit?schoolReportID=" + rowData.classRoomID ;
				
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'propertiesEnterExit') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	return
			setTimeout(function () {

				rowData.view = true ? location.href = "enterExitViewEdit?enterExitID=" + rowData.enterExitID : location.href = "enterExitStaffEdit?enterExitID=" + rowData.enterExitID ;
				
				
			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'deleteEnterExit') {
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			// console.log(rowData);	return;
			setTimeout(function () {

				$('#hidEnterExitID').val(rowData.enterExitID);	
				$('#hidBaseYearID').val(rowData.baseYearID);	
				$('#hidActionType').val("DELETE");
				let message = "Você confirma a exclusão de: " + rowData.personName  + " ? ";
				$('.modal-title-delete').text("Deletar Pessoa");
				$('.message-modal-delete').text(message);
				$('#modalDelete').modal('show');

			}, 500*objectIndexTmp);

		}
		
	} else if (objAction.id == 'editClassDiary') { 
		// toastr.warning('Em desenvolvimento','Atenção!');
		for (let objectIndexTmp = 0; objectIndexTmp < rowsData.length; objectIndexTmp++) {

			let rowData = rowsData[objectIndexTmp];
			console.log(rowData);	
			setTimeout(function () {
				
				location.href = "classDiaryEdit?classRoomID=" + rowData.classRoomID +"&disciplineID="+rowData.disciplineID ;
				
			}, 500*objectIndexTmp);

		}
	}
	
	
} 

// loadCombo
function OnError(xhr, errorType, exception) {

    console.log("OnError...");

    var responseText;

    try {
        responseText = jQuery.parseJSON(xhr.responseText);

        //strMessage = "<div><b>" + errorType + " " + exception + "</b></div>";
        strMessage = "<div><u>Exception</u>:" + responseText.ExceptionType + "</div>";
        //strMessage += "<div><u>StackTrace</u>:<br /><br />" + responseText.StackTrace + "</div>";
        strMessage += "<div>" + responseText.Message + "</div>";

        //console.log('OnError: ' + strMessage);
        console.log('OnError: ' + responseText.StackTrace);

        /*stack: stack_center*/
		toastr.error(strMessage);


    } catch (e) {
        responseText = xhr.responseText;

        console.log('OnError: ' + responseText);

		toastr.error(responseText);
		        
    }

}


function loadComboSchoolBySession(cmbSchool) {
	
	console.log("loadComboSchoolBySession...");
	
	ajaxLoadComboSchoolBySession = true;
	
	let objParameters = new Object();
	//console.log(objParameters);
	
	//Pace.restart();
	
	Pace.track(function () { })
	
	$.ajax({
	  type: "POST",
	  /*contentType: "application/json; charset=utf-8",*/	  
	  data: JSON.stringify(objParameters),
	  dataType: "JSON",
      url: 'ajax/schoolBySession',
	  success: function (data) {
		
		//console.log(data);
		
		$(cmbSchool).empty();
		$(cmbSchool).append('<option value="0">--</option>');   
		$.each(data, function(index, element) {
			console.log(element);
           $(cmbSchool).append('<option value="' + (element.schoolSitePrefix == null?"":element.schoolSitePrefix) + '">' + element.schoolName + '</option>');   
        });

		lstConnectionTypeMap = data;

		console.log("loadComboConnectionTypeGetAll finished");
		ajaxLoadComboSchoolBySession = false;
      }
    })
		
}

function loadComboProfileGetAll(cmbProfile) {
	
	console.log("loadComboProfileGetAll... start 🔵");
	
	ajaxLoadComboProfileGetAll = true;
	
	let objParameters = new Object();
	//console.log(objParameters);
	
	//Pace.restart();
	
	Pace.track(function () { })
	
	$.ajax({
	  type: "POST",
	  /*contentType: "application/json; charset=utf-8",*/	  
	  data: JSON.stringify(objParameters),
	  dataType: "JSON",
      url: 'ajax/profileGetAll',
	  success: function (data) {
		
		// console.log(data);
		//data = JSON.parse(data);

		$(cmbProfile).empty();
		$(cmbProfile).append('<option value="">--</option>');   
		$.each(data, function(index, element) {
			if(element.profileID != '1'){

				$(cmbProfile).append('<option value="' + element.profileID + '">' + element.profileName + '</option>');   
			}
        });
		
		console.log("loadComboProfileGetAll... finish 🔴");
		ajaxLoadComboProfileGetAll = false;
      },
	  error: OnError
    })
		
}

function loadComboTaskGetAll(cmbTask) {

	console.log("loadComboTaskGetAll... start 🔵");

	ajaxLoadComboTaskGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/taskGetAll',
		success: function (data) {

			// console.log(data);
			//data = JSON.parse(data);

			$(cmbTask).empty();
			$(cmbTask).append('<option value="">--</option>');
			$.each(data, function (index, element) {

				$(cmbTask).append('<option value="' + element.taskID + '">' + element.shdesc + '</option>');

			});

			console.log("loadComboTaskGetAll... finish 🔴");
			ajaxLoadComboTaskGetAll = false;
		},
		error: OnError
	})

}

function loadComboSchoolGetAll(cmbSchool) {

	console.log("loadComboSchoolGetAll...");

	ajaxLoadComboSchoolGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	var schoolSitePrefix = $('#hidSchoolSitePrefix').val();
	// console.log(schoolSitePrefix);

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/schoolGetAll',
		success: function (data) {

			// console.log(data);
			// data = JSON.parse(data);

			$(cmbSchool).empty();
			//$(cmbSchool).append('<option value="0">--</option>');   
			$.each(data, function (index, element) {
				var selected = element.schoolSitePrefix == schoolSitePrefix ? ' selected' : '';
				$(cmbSchool).append('<option value="' + element.schoolID + '"' + selected + '>' + element.schoolName + '</option>');
			});

			console.log("loadComboSchoolGetAll finished");
			ajaxLoadComboSchoolGetAll = false;
		},
		error: OnError
	})

}

function loadComboGenderGetAll(cmbGender) {
	
	console.log("loadComboGenderGetAll...");
	
	ajaxLoadComboGenderGetAll = true;
	
	let objParameters = new Object();
	//console.log(objParameters);
	
	//Pace.restart();
	
	Pace.track(function () { })
	
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/genderGetAll',
		success: function (data) {

			//console.log(data);
			//data = JSON.parse(data);

			$(cmbGender).empty();
			$(cmbGender).append('<option value="">--</option>');
			$.each(data, function (index, element) {
				$(cmbGender).append('<option value="' + element.genderID + '">' + element.shdesc + '</option>');
			});

			setTimeout(() => {
				console.log("loadComboGenderGetAll finished");
				ajaxLoadComboGenderGetAll = false;
			}, 1000);
			
		},
		error: OnError
	})
		
}

function loadComboIncomeRangeGetAll(cmbIncomeRange) {
	
	console.log("loadComboIncomeRangeGetAll...");
	
	ajaxLoadComboIncomeRangeGetAll = true;
	
	let objParameters = new Object();
	//console.log(objParameters);
	
	//Pace.restart();
	
	Pace.track(function () { })
	
	$.ajax({
	  type: "POST",
	  /*contentType: "application/json; charset=utf-8",*/	  
	  data: JSON.stringify(objParameters),
	  dataType: "JSON",
      url: 'ajax/incomeRangeGetAll',
	  success: function (data) {
		
		//console.log(data);
		//data = JSON.parse(data);

		$(cmbIncomeRange).empty();
		$(cmbIncomeRange).append('<option value="0">--</option>');
		$.each(data, function(index, element) {
           $(cmbIncomeRange).append('<option value="' + element.incomeRangeID + '">' + element.shdesc + '</option>');   
        });

		console.log("loadComboIncomeRangeGetAll finished");
		ajaxLoadComboIncomeRangeGetAll = false;
      },
	  error: OnError
    })
		
}

function loadComboGraduationGetAll(cmbGraduation) {
	
	console.log("loadComboGraduationGetAll...");

	ajaxLoadComboGraduationGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/graduationGetAll',
		success: function (data) {

			// console.log(data);

			// data = JSON.parse(data);

			$(cmbGraduation).empty();
			$(cmbGraduation).append('<option value="">--</option>');
			$.each(data, function (index, element) {
				$(cmbGraduation).append('<option value="' + element.graduationID + '">' + element.shdesc + '</option>');
			});

			console.log("loadComboGraduationGetAll finished");
			ajaxLoadComboGraduationGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboDisciplineGetAll(cmbDiscipline) {
	
	console.log("loadComboDisciplineGetAll...");

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

			$(cmbDiscipline).empty();
			$(cmbDiscipline).append('<option value="">--</option>');  
			$.each(data, function(index, element) {
				// console.log(element);
				if(element.fgAtv == 'S'){
					$(cmbDiscipline).append('<option value="' + element.disciplineID + '">' + element.shdesc + '</option>');   
				}

				
			});

			console.log("loadComboDisciplineGetAll finished");
			ajaxloadComboDisciplineGetAll = false;

		},
		error: OnError
	})
		
}

function loadComboSegmentGetAll(cmbclass, staff) {
	
	console.log("loadComboSegmentGetAll...");

	ajaxloadComboSegmentGetAll = true;

	let objParameters = new Object();
	

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/segmentGetAll',
		success: function (data) {
		
			// data = JSON.parse(data);
			// console.log(data);

			if(staff != true){
				// console.log(staff);
				// console.log('no staff');
				$(cmbclass).empty();
				//$(cmbclass).append('<option value="0">--</option>');   
				$(cmbclass).append('<option value="">--</option>');
				$.each(data, function(index, element) {
					// console.log(element);
					$(cmbclass).append('<option value="' + element.segmentID + '">' + element.shdesc + '</option>');   
				});

			}else {

				$(cmbclass).empty();
				//$(cmbclass).append('<option value="0">--</option>');   
				$(cmbclass).append('<option value="">--</option>');
				$.each(data, function(index, element) {
					// console.log(element);
					$(cmbclass).append('<option value="' + element.segmentID + '">' +'Cood '+ element.shdesc + '</option>');   
				});
			}
		

			console.log("loadComboSegmentGetAll finished");
			ajaxLoadComboGraduationGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboClassRoomWithStudentGetAll(cmbclass) {
	
	console.log("loadComboClassRoomWithStudentGetAll...");

	var ajaxLoadClassRoomWithStudentGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/classRoomGetAll',
		success: function (data) {
		
			// data = JSON.parse(data);
			// console.log(data);

			$(cmbclass).empty();
			$(cmbclass).append('<option value="">--</option>');   
			$.each(data, function(index, element) {
				// console.log(element.lstTblClassRoomStudent.length);
				if(element.lstTblClassRoomStudent.length > 0)
					$(cmbclass).append('<option value="' + element.classRoomID + '">' + element.shdesc + '</option>');
				else
					return;   
			});

			console.log("loadComboClassRoomWithStudentGetAll finished");
			ajaxLoadClassRoomWithStudentGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboClassRoomGetAll(cmbclass) {
	
	console.log("loadComboClassGetAll...");

	ajaxLoadComboClassGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/classRoomGetAll',
		success: function (data) {
		
			// data = JSON.parse(data);
			// console.log(data);

			$(cmbclass).empty();
			$(cmbclass).append('<option value="">--</option>');   
			$.each(data, function(index, element) {
				// console.log(element);
				// console.log(element.lstTblClassRoomStudent.length);
				$(cmbclass).append('<option value="' + element.classRoomID + '">' + element.shdesc + '</option>');   
			});

			console.log("loadComboClassGetAll finished");
			ajaxLoadComboClassGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboPeriodGetAll(cmbPeriod) {
	
	console.log("loadComboPeriodGetAll...");

	ajaxloadComboPeriodGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/periodGetAll',
		success: function (data) {
		
			// console.log(data); 
			// data = JSON.parse(data);

			$(cmbPeriod).empty();
			$(cmbPeriod).append('<option value="">--</option>');   
			$.each(data, function(index, element) {
				$(cmbPeriod).append('<option value="' + element.periodeID + '">' + element.shdesc + '</option>');   
			});

			console.log("loadComboPeriodGetAll finished");
			ajaxloadComboPeriodGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboGroupGetAll(cmbGroup) {
	
	console.log("loadComboGroupGetAll...");

	ajaxloadComboGroupGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/groupGetAll',
		success: function (data) {
		
			// console.log(data); 
			// data = JSON.parse(data);

			$(cmbGroup).empty();
			$(cmbGroup).append('<option value="">--</option>');   
			$.each(data, function(index, element) {
				$(cmbGroup).append('<option value="' + element.groupID + '">' + element.shdesc + '</option>');   
			});

			console.log("loadComboGroupGetAll finished");
			ajaxloadComboGroupGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboResponsibleTypeGetAll(cmbResponsibleType) {
	
	console.log("loadComboResponsibleTypeGetAll...");

	ajaxloadComboResponsibleTypeGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/responsibleTypeGetAll',
		success: function (data) {
		
			// console.log(data); 
			// data = JSON.parse(data);

			$(cmbResponsibleType).empty();
			$(cmbResponsibleType).append('<option value="">--</option>');   
			$.each(data, function(index, element) {
				if(element.fgInternalUse != 'S')
					$(cmbResponsibleType).append('<option value="' + element.responsibleTypeID + '">' + element.shdesc + '</option>');   
			});

			console.log("loadComboResponsibleTypeGetAll finished");
			ajaxloadComboResponsibleTypeGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboBaseYearGetAll(cmbBaseYear) {
	
	console.log("loadComboBaseYearGetAll...");

	var ajaxloadComboBaseYearGetAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/baseYearGetAll',
		success: function (data) {
		
			// console.log(data); 
			// data = JSON.parse(data);

			$(cmbBaseYear).empty();
			// $(cmbBaseYear).append('<option value="">--</option>');

			let maxBaseYearID = -Infinity; // para pegar o numero real maior

			$.each(data, function(index, element) {
				$(cmbBaseYear).append('<option value="' + element.baseYearID + '">' + element.shdesc + '</option>');

				if (element.baseYearID > maxBaseYearID) {
					maxBaseYearID = element.baseYearID;
				}
			});

			
			$(cmbBaseYear).val(maxBaseYearID);

			console.log("loadComboBaseYearGetAll finished");
			ajaxloadComboBaseYearGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboUF(objUF) {


	$(objUF).empty();	
	$(objUF).append('<option value="">--</option>'); 
	$(objUF).append('<option value="AC">AC</option>');
	$(objUF).append('<option value="AL">AL</option>');
    $(objUF).append('<option value="AP">AP</option>');
    $(objUF).append('<option value="AM">AM</option>');
    $(objUF).append('<option value="BA">BA</option>');
    $(objUF).append('<option value="CE">CE</option>');
    $(objUF).append('<option value="DF">DF</option>');
    $(objUF).append('<option value="ES">ES</option>');
    $(objUF).append('<option value="GO">GO</option>');
    $(objUF).append('<option value="MA">MA</option>');
    $(objUF).append('<option value="MS">MS</option>');
    $(objUF).append('<option value="MT">MT</option>');
    $(objUF).append('<option value="MG">MG</option>');
    $(objUF).append('<option value="PA">PA</option>');
    $(objUF).append('<option value="PB">PB</option>');
    $(objUF).append('<option value="PR">PR</option>');
    $(objUF).append('<option value="PE">PE</option>');
    $(objUF).append('<option value="PI">PI</option>');
    $(objUF).append('<option value="RJ">RJ</option>');
    $(objUF).append('<option value="RN">RN</option>');
    $(objUF).append('<option value="RS">RS</option>');
    $(objUF).append('<option value="RO">RO</option>');
    $(objUF).append('<option value="RR">RR</option>');
    $(objUF).append('<option value="SC">SC</option>');
    $(objUF).append('<option value="SP">SP</option>');
    $(objUF).append('<option value="SE">SE</option>');
    $(objUF).append('<option value="TO">TO</option>');  
	/*
    $(objUF).append('<option value="AC">Acre</option>');
	$(objUF).append('<option value="AL">Alagoas</option>');
    $(objUF).append('<option value="AP">Amapá</option>');
    $(objUF).append('<option value="AM">Amazonas</option>');
    $(objUF).append('<option value="BA">Bahia</option>');
    $(objUF).append('<option value="CE">Ceará</option>');
    $(objUF).append('<option value="DF">Distrito Federal</option>');
    $(objUF).append('<option value="ES">Espirito Santo</option>');
    $(objUF).append('<option value="GO">Goiás</option>');
    $(objUF).append('<option value="MA">Maranhão</option>');
    $(objUF).append('<option value="MS">Mato Grosso do Sul</option>');
    $(objUF).append('<option value="MT">Mato Grosso</option>');
    $(objUF).append('<option value="MG">Minas Gerais</option>');
    $(objUF).append('<option value="PA">Pará</option>');
    $(objUF).append('<option value="PB">Paraíba</option>');
    $(objUF).append('<option value="PR">Paraná</option>');
    $(objUF).append('<option value="PE">Pernambuco</option>');
    $(objUF).append('<option value="PI">Piauí</option>');
    $(objUF).append('<option value="RJ">Rio de Janeiro</option>');
    $(objUF).append('<option value="RN">Rio Grande do Norte</option>');
    $(objUF).append('<option value="RS">Rio Grande do Sul</option>');
    $(objUF).append('<option value="RO">Rondônia</option>');
    $(objUF).append('<option value="RR">Roraima</option>');
    $(objUF).append('<option value="SC">Santa Catarina</option>');
    $(objUF).append('<option value="SP">São Paulo</option>');
    $(objUF).append('<option value="SE">Sergipe</option>');
    $(objUF).append('<option value="TO">Tocantins</option>');
    */

}

function loadCEP(strCEP) {
	
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
		
		$("#endStreet").val(data.logradouro);
		$("#endDistrict").val(data.bairro);
		$("#endCity").val(data.localidade);
		$("#endUF").val(data.uf);
		$("#endCodIBGE").val(data.ibge);

		console.log("loadCEP finished");
		ajaxLoadCEP = false;		
      },
	  error: OnError	
    });
		
}

function loadComboEventTypeAll(cmbPeriod) {
	
	console.log("loadComboEventTypeAll...STOP r");return

	ajaxloadComboEventTypeAll = true;

	let objParameters = new Object();
	//console.log(objParameters);

	//Pace.restart();
	// console.log('Parado ...');return;
	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: JSON.stringify(objParameters),
		dataType: "JSON",
		url: 'ajax/eventTypeGetAll',
		success: function (data) {
		
			// console.log(data); 
			// data = JSON.parse(data);

			$(cmbPeriod).empty();
			$(cmbPeriod).append('<option value="">--</option>');   
			var option;
			$.each(data, function(index, element) {
				
				if(element.shdesc == 'allDay'){
					option = 'Dia Inteiro'
				}else if (element.shdesc == 'time'){
					option = 'Pontual'
				}else if (element.shdesc == 'recurrent'){
					option = 'Vários Dias'
				}
				$(cmbPeriod).append('<option value="' + element.eventTypeID + '">' + option + '</option>');   
			});

			console.log("loadComboEventTypeAll finished");
			ajaxloadComboEventTypeAll = false;
		},
		error: OnError
	})
		
}

function loadComboAutocomplete(cmbAuto,shdesc) {
	
	console.log("loadComboAutocomplete...");

	// ajaxloadComboAutocomplete = true;

	let objParameters = new Object();
	objParameters.shdesc = shdesc;
	// console.log(objParameters);

	//Pace.restart();

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'autocomplete' : JSON.stringify(objParameters) },
		dataType: "JSON",
		url: 'ajax/autocompleteGetByFilter',
		success: function (data) {
		
			console.log('Loading autoclomplete...'); 
			// console.log(data); 
			// data = JSON.parse(data);

			// $(cmbAuto).empty();
			// $('.select2-results__options').empty();
			$(cmbAuto).append('<option value="">--</option>');   
			var option;
			$.each(data, function(index, element) {
				
				
				$(cmbAuto).append('<option value="' + element.elementID + '">' + element.shdesc + '</option>');   
			});

			console.log("loadComboAutocomplete finished");
			
			// ajaxloadComboAutocomplete = false;
		},
		error: OnError
	})
		
}

function loadComboAutocompleteGetAll(cmbAuto) {
	
	console.log("loadComboAutocompleteGetAll...");

	ajaxLoadComboAutocompleteGetAll = true;

	let objParameters = new Object();
	// objParameters.shdesc = shdesc;
	// console.log(objParameters);

	//Pace.restart();
	// if(blncheck == false){
	// 	console.log('check false');
	// 	return
	// }

	Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: {'autocomplete' : JSON.stringify(objParameters) },
		dataType: "JSON",
		url: 'ajax/autocompleteGetAll',
		success: function (data) {
		
			// console.log(data); 
			// data = JSON.parse(data);

			// $(cmbAuto).empty();
			// $('.select2-results__options').empty();
			
			$(cmbAuto).append('<option value="">--</option>');   
			var option;
			$.each(data, function(index, element) {
				// console.log('element :>> ', element);
				
				$(cmbAuto).append('<option value="' + element.elementID + '">' + element.shdesc + '</option>');   
			});

			console.log("loadComboAutocompleteGetAll finished");
			
			ajaxLoadComboAutocompleteGetAll = false;
		},
		error: OnError
	})
		
}

function loadComboDisciplineByClassRomm(cmbAuto,classRoomID) {
	
	var objFilters = new Object();
    objFilters.classRoomID = classRoomID
	Pace.restart();
	//Pace.track(function () { })

	// console.log(objFilters);
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/	  
		data: { 'grade': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/gradeGetByFilter',
		global: false,
		success: function (data) {
		
			data = JSON.parse(data);
			// console.log(data);		
			
			$(cmbAuto).append('<option value="">--</option>');   
			var option;
			$.each(data, function(index, element) {
				// console.log('element :>> ', element);
				
				$(cmbAuto).append('<option value="' + element.disciplineID + '">' + element.disciplineName + '</option>');   
			});

		
		}
	
	});
			
}

function loadComboDisciplieGrade(objFilters,cmbAuto) {

	Pace.restart();
	objFilters.selectDiscipline = true
	console.log(objFilters);

	//Pace.track(function () { })
	console.log('loadComboDisciplieGrade...');
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


			$(cmbAuto).empty();
			$(cmbAuto).append('<option value="">--</option>');   
			var option;
			$.each(data, function(index, element) {
				// console.log('element :>> ', element);
				
				$(cmbAuto).append('<option data-class="'+objFilters.classRoomID+'" value="' + element.disciplineID + '">' + element.disciplineName + '</option>');   
			});



			console.log("loadComboDisciplieGrade finished");
		}


	});

}

//SEARCH & MASK
function searchCPF(strCPF, strPrefix, parm1) {

	let objParameters = new Object();
	objParameters.cpf = strCPF;

	// console.log(strPrefix);
	Pace.restart();
	//Pace.track(function () { })

	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'externalCPF': JSON.stringify(objParameters) },
		datatype: "JSON",
		url: 'ajax/searchCPF',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			// console.log(data);		

			if (data.message === undefined || data.message == "" || data.message == null) {

				$('#' + strPrefix + 'FullName').val(data.fullName);
				$('#' + strPrefix + 'SocialNome').val(data.socialName);
				$("#" + strPrefix + "IncomeRange option:contains(" + data.incomeRange + ")").prop("selected", true);

				if ($('#' + strPrefix + 'BirthDate').length > 0 && data.birthDate != null) { // verifica se existe na tela e se não é nulo

					$('#' + strPrefix + 'BirthDate').data('daterangepicker').setStartDate(moment(data.birthDate).format(TO_PATTERN_DATE));
					$('#' + strPrefix + 'BirthDate').data('daterangepicker').setEndDate(moment(data.birthDate).format(TO_PATTERN_DATE));

				}
				$('#' + strPrefix + 'MotherName').val(data.motherName);

				if (data.gender != null || data.gender != '') {

					$("#" + strPrefix + "Gender option:contains(" + data.gender + ")").prop("selected", true);
				}

				$('#' + strPrefix + 'Email').val(data.email);

				//$('#' + strPrefix + 'BirthDate').trigger('apply.daterangepicker', this, $('#' + strPrefix + 'BirthDate').data('daterangepicker'));

				// validação 
				if ($('#' + parm1).hasClass('is-warning')) {
					$('#' + parm1).removeClass('is-warning')
				}
				if ($('#' + parm1).hasClass('is-invalid')) {
					$('#' + parm1).removeClass('is-invalid')
				}
				$('#' + parm1).addClass('is-valid');

			} else {

				// toastr.error(data.message);
				if ($('#' + parm1).attr('data-toastr') != 'active') {
					// toastr.warning(data.message);
					toastr.warning('CPF não encontrado na base.','CPF',{
						timeOut: 1000,
						preventDuplicates: true,
						positionClass: 'toast-top-right',
						
					});
				}

				if ($('#' + parm1).hasClass('is-warning')) {
					$('#' + parm1).removeClass('is-warning')
				}
				if ($('#' + parm1).hasClass('is-valid')) {
					$('#' + parm1).removeClass('is-valid')
				}
				$('#' + parm1).addClass('is-invalid');
				$('#' + parm1).attr('data-toastr', 'active')


			}


			//console.log("schoolID -> " + element.schoolID + "; schoolName -> " + element.schoolName);



			console.log("searchCPF finished");
		}
	});

}

function maskCPF(stgCPF){
	
	if(stgCPF != null)
		return `${stgCPF.slice(0, 3)}.${stgCPF.slice(3, 6)}.${stgCPF.slice(6, 9)}-${stgCPF.slice(9)}`;
	 // return stgCPF.slice(0, 3) + '.' + stgCPF.slice(3, 6) + '.' + stgCPF.slice(6, 9) + '-' + stgCPF.slice(9);
	else
		return
}

function maskTel(stgTel){
	if(stgTel != null)
		return `(${stgTel.slice(0, 2)})${stgTel.slice(2, 7)}-${stgTel.slice(7)}`;
	else
		return
}

function maskCEP(stgCEP){

	
	if(stgCEP != null)
		return `${stgCEP.slice(0, 5)}-${stgCEP.slice(5)}`;
	else
		return
}

function checkBirthDate(date) {
	const toDay = new Date();
	var YYYY = toDay.getFullYear();
	var MM = toDay.getMonth() + 1;
	var DD = toDay.getDate();
	MM = MM < 10 ? '0' + MM : MM;
	DD = DD < 10 ? '0' + DD : DD;

	const blnCheckBirthDate = `${YYYY}-${MM}-${DD}`;

	if(date > blnCheckBirthDate || date <= '1900-01-01')
		return {
			status: 'error',
			messange: 'Data inválida! '
		};
	else
		return true;

}

// function responsibleType(data) {
// 	// console.log(data);
// 	// console.log(data.responsibleFinancial);
// 	// console.log(data.responsiblePedagogical);
// 	// console.log(data.lstFatherData?.userID); // ? caso não tenha ele retorna undefine
// 	// console.log(data.lstMotherData?.userID); // ? caso não tenha ele retorna undefine
// 	// console.log(data.lstOtherData?.userID); // ? caso não tenha ele retorna undefine

// 	if (data.responsibleFinancial == data.lstFatherData?.userID) {

// 		return data.lstFatherData?.fullName + ' Pai';

// 	} else if (data.responsibleFinancial == data.lstMotherData?.userID) {

// 		return data.lstMotherData?.fullName + ' Mãe';

// 	} else if (data.responsibleFinancial == data.lstOtherData?.userID) {

// 		return data.lstOtherData?.fullName + ' Outro';

// 	}

// }

/**
 * @description this fuction valid CPF 
 * @param {str} parm1 this espcifical id for input
 */

function validationSearchCPF(parm1) {

	var varCPF = $('#' + parm1).val();
	if (varCPF == '' || varCPF == null || varCPF == undefined) {

		// toastr.warning('O campo está vazio!', 'CPF');
		// $('#studentCPF').focus();

		if ($('#' + parm1).hasClass('is-valid')) {
			$('#' + parm1).removeClass('is-valid')
		}
		if ($('#' + parm1).hasClass('is-invalid')) {
			$('#' + parm1).removeClass('is-invalid')
		}
		$('#' + parm1).addClass('is-warning');
		return
	}

	varCPF = varCPF.split(".").join("");
	varCPF = varCPF.split("-").join("");

	if (varCPF.length < 11) {
		// toastr.warning('Confira o campo!', 'CPF');
		// $('#'+parm1).focus();

		if ($('#' + parm1).hasClass('is-valid')) {
			$('#' + parm1).removeClass('is-valid')
		}
		if ($('#' + parm1).hasClass('is-invalid')) {
			$('#' + parm1).removeClass('is-invalid')
		}
		$('#' + parm1).addClass('is-warning');


		return
	}

	// console.log(varCPF); form-control is-valid
	// console.log('>>>>>>>>>>>>>>>>>>'+parm1.slice(0,-3)); 

	searchCPF(varCPF, parm1.slice(0, -3), parm1);

}

/**
* @description validation form with regex
* @param {objJQ} input  $('#your id') ou $('#your class')
* @param {str} type 'EMAIL', 'NAME', 'PHONE', 'DATE', 'PHONE'
*/
function formValidation(inputs, type) {

	// var textTest = $(input).val();

	// console.log(textTest);
	// console.log($(input).attr('id'));

	if (!Array.isArray(inputs)) { //transforma se não for array em um único
        inputs = [inputs];
    }

    for (let element of inputs) {

        var textTest = $(element).val();
		var htmlText = $('label[for="' + $(element).attr('id') + '"]').text();

		// console.log('element: ',element);

		var returnEmpyt = {
			status: 'error',
			messange: 'Campo vazio !',
			title: htmlText + '!',
			input: element
		}

		var returnNotPermition = {
			status: 'error',
			messange: 'Caracter não permitido !',
			title: htmlText + '!',
			input: element,
			inputValue: textTest
		}

        if (type == 'DATE') {

            if (textTest == '' || textTest == null) { 
				return returnEmpyt
            }

			if(checkBirthDate(textTest).status == 'error'){
				return {
					status: 'error',
					messange: checkBirthDate(textTest).messange,
					title: htmlText + '!',
					input: element
				}
			}

        }

		if (type == 'NAME') {

			// var htmlText = $('label[for="' + $(element).attr('id') + '"]').text();
			if (textTest == '' || textTest == null) {
	
				return returnEmpyt;
	
			}

			var regex = /[^a-zA-Z âãõêôûáéíóúÃÃÕÔÛÁÉÍÓÚ]/;
			if (regex.test(textTest)) {

				return returnNotPermition;
			}

		}

		if (type == 'EMAIL') {

			if (textTest == '' || textTest == null) {

				// var htmlText = $('label[for="' + $(input).attr('id') + '"]').text();
				return returnEmpyt;
			}
	
			var regex = /[^a-zA-Z0-9 @._-]/;
			if (regex.test(textTest)) {
				
				return returnNotPermition;
			}
	
		}

		if (type == 'SELECT') {

			// var htmlText = $('label[for="' + $(element).attr('id') + '"]').text();
			if (textTest == '' || textTest == null) {

				return {
					status: 'error',
					messange: 'Selecione uma opção !',
					title: htmlText + '!',
					input: element
				}
			}
	
	
		}

		if (type == 'NUMBER') {

			var textTest = $(element).val().split(/[\(\)\.\-\s]+/).join("")

			// console.log(textTest);
			if (textTest == '' || textTest == null) {
				
				return returnEmpyt;
			}

			var regex = /[^0-9]/
			if (regex.test(textTest)) {
				// console.log('especial key >> ', textTest);

				return returnNotPermition
			}
	
		}




    }

	// if (type == 'EMAIL') {

	// 	if (textTest == '' || textTest == null) {
	// 		var htmlText = $('label[for="' + $(input).attr('id') + '"]').text();
	// 		toastr.warning('O campo está vazio!', htmlText + '!');
	// 		$(input).focus();
	// 		return
	// 	}

	// 	var regex = /[^a-zA-Z0-9 @._-]/;
	// 	if (regex.test(textTest)) {
	// 		// console.log('especial key >> ', textTest);
	// 		toastr.warning('Caractere não permitido!', ' Email ' + textTest);
	// 		$(input).focus();
	// 		return
	// 	}

	// }

	// if (type == 'NAME') {

	// 	if (textTest == '' || textTest == null) {

	// 		var htmlText = $('label[for="' + $(input).attr('id') + '"]').text();
	// 		return {
	// 			status: 'error',
	// 			message: 'Campo vazio',
	// 			title: htmlText + '!',
	// 			input: input
	// 		}

	// 	}

		// var regex = /[^a-zA-Z âãõêôûáéíóúÃÃÕÔÛÁÉÍÓÚ]/;
		// if (regex.test(textTest)) {
		// 	// console.log('especial key >> ', textTest);
		// 	toastr.warning('Caractere não permitido!', ' Nome ' + textTest);
		// 	$(input).focus();
		// 	return
		// }

	// }

	// if (type == 'DATE') {

	// 	var htmlText = $('label[for="' + $(input).attr('id') + '"]').text();
	// 	if (checkBirthDate(textTest)) {
	// 		return {
	// 			status: 'error',
	// 			message: 'Data invalida',
	// 			title: htmlText + '!',
	// 			input: input
	// 		}
	// 	}

	// }

	// if (type == 'PHONE') {

	// 	var textTest = $(input).val().split(/[\(\)\-\s]+/).join("")
	// 	console.log(textTest);
	// 	if (textTest == '' || textTest == null) {
	// 		var htmlText = $('label[for="' + $(input).attr('id') + '"]').text();
	// 		toastr.warning('O campo está vazio!', htmlText + '!');
	// 		$(input).focus();
	// 		console.log('aqui 1');
	// 		return
	// 	}

	// 	var regex = /[^0-9]/
	// 	if (regex.test(textTest)) {
	// 		// console.log('especial key >> ', textTest);
	// 		toastr.warning('Caractere não permitido ou campo incompleto', ' Contato ' + textTest);
	// 		$(input).focus();
	// 		console.log('aqui 2');
	// 		return
	// 	}

	// }

	// if (type == 'CEP') {

	// 	var textTest = $(input).val().split("-").join("")
	// 	if (textTest == '' || textTest == null) {
	// 		var htmlText = $('label[for="' + $(input).attr('id') + '"]').text();
	// 		toastr.warning('O campo está vazio!', htmlText + '!');
	// 		$(input).focus();
	// 		return
	// 	}

	// 	var regex = /[^0-9]/
	// 	if (regex.test(textTest)) {
	// 		// console.log('especial key >> ', textTest);
	// 		toastr.warning('Caractere não permitido ou campo incompleto', ' Contato ' + textTest);
	// 		$(input).focus();
	// 		return
	// 	}
	// }

	return {
		status: 'ok',
		menssage:'ok'
	}


}

function weekConvert(parmWDT){
	parmWDT = parmWDT.split(',')
	if( parmWDT[0] == 'Sun'){
		return 'Dom'+' '+parmWDT[1];

	}else if( parmWDT[0] == 'Mon'){
		return 'Seg'+' '+parmWDT[1];

	}else if( parmWDT[0] == 'Tue'){
		return 'Ter'+' '+parmWDT[1];

	}else if( parmWDT[0] == 'Wed'){
		return 'Qua'+' '+parmWDT[1];

	}else if( parmWDT[0] == 'Thu'){
		return 'Qui'+' '+parmWDT[1];

	}else if( parmWDT[0] == 'Fri'){
		return 'Sex'+' '+parmWDT[1];

	}else if( parmWDT[0] == 'Sat'){
		return 'Sab'+' '+parmWDT[1];

	}
}

function controlBaseYear(){
    var arrayDate = []
    for (let index = 0; index < 10; index++) {
        var yearPut = parseInt(2025+index)
        arrayDate.push(yearPut);
    
    }
    return arrayDate
}

function getFormattedDateTime() {
    const now = new Date();

    const day = now.getDate();
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                        "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
	
    const month = monthNames[now.getMonth()];
    const monthNumber = (now.getMonth()+1);

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; 

    return `${day < 10 ? '0'+day : day} ${monthNumber < 10 ? '0'+monthNumber : monthNumber } ${hours}:${minutes} ${ampm}`;
}


function controlFromMessageBook(){
    var arrayData = ['Responsável','Coordenação','Professor']
    
    return arrayData
}

function informationGetByFilterIndex(objFilters) {

	console.log(objFilters);
	// Pace.restart();
	console.log('bipEscola.js ...');
	console.log('informationGetByFilterIndex .. run');
	return
	$.ajax({
		type: "POST",
		/*contentType: "application/json; charset=utf-8",*/
		data: { 'information': JSON.stringify(objFilters) },
		datatype: "JSON",
		url: 'ajax/informationGetByFilter.php',
		global: false,
		success: function (data) {

			data = JSON.parse(data);
			// console.log('information');
			// console.log(data);
			// console.log(data[0].userLink);
			userNew = data[0].userLink;

			console.log("informationGetByFilter finished");
		}

	});



}
var userToID ;
// function getMessageBookTotalByFilterForm() {
// 	// console.log($('#hidUserHeadID').val(), 'USERRRR');

// 	console.log('getMessageBookTotalByFilterForm ... run');
// 	var objFilters = {}
// 	objFilters.flgRead = ''
// 	objFilters.userFromID = ''
// 	objFilters.userToID = $('#hidUserHeadID').val() == undefined || $('#hidUserHeadID').val() == null || $('#hidUserHeadID').val() == '' ? '0' : $('#hidUserHeadID').val()
// 	objFilters.messageBookType = ''
// 	// Pace.restart();
// 	//Pace.track(function () { })

// 	$.ajax({
// 		type: "POST",
// 		/*contentType: "application/json; charset=utf-8",*/	  
// 		data: {'messageBook' : JSON.stringify(objFilters) },
// 		datatype: "JSON",
// 		url: 'ajax/messageBookSelectTotalByFilter',
// 		global: false,
// 		success: function (data) {
		
// 			data = JSON.parse(data);
// 			// console.log(data);	
			
// 			var total;
// 			var totalMessageBook;
// 			var totalBip;
			
// 			$.each(data, function(index, element) {
				
// 				total = element.total
// 				totalMessageBook = element.messageBook
// 				totalBip = element.bips
				

// 			});

			
// 			$('#totalNotification').text(total);
// 			$('#totalNotificationText').text('Nova notificação '+total);
// 			$('#totalMessageBook').text('Novas mensagens na agenda '+totalMessageBook);
// 			$('#totalBip').text('Novos bips '+totalBip);
// 			// $('#countMessageBookStaff').text(messageBookTypeStaff);
// 			// $('#countMessageBookTeacher').text(messageBookTypeTeacher);

			

// 			console.log("getMessageBookTotalByFilterForm finished");
			
		
// 	  	}
// 	});
			
// }


// setInterval(()=>getMessageBookTotalByFilterForm(),10000)
$('#navItemCount').click(function (e) { 
	console.log('navItemCount');
	// $('#hidUserHeadID').val();

	getMessageBookTotalByFilterForm()

});
// getMessageBookTotalByFilterForm()

$('#selectStudentSession').click(function (e) { 
	e.preventDefault();
	location.href = 'selectStudent';
	
});

