// console.log('disciplineEdit...') 0807;

function bindScaleTitleLive(input,change) {

    $(input).on('input keyup change', function () {

        let value = $(this).val().trim();

        if (value === '') {
            $(change).text('Nova Escala');
        } else {
            $(change).text(value);
        }

    });

}

bindScaleTitleLive($('#scaleFullName'),$('#scaleTitle'))

//loadCombos
loadComboTaskGetAll($("#addUserTask"));

$('#scaleDate').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: true,
    autoApply: true,
    locale: {
        format: 'YYYY-MM-DD'
    }
}).val('');

if (!$("#leftMenuScale").hasClass("active")) {
    $("#leftMenuScale").addClass("active");
}	

$('#scaleBackButton').click(function () {

    location.href = 'scale';

});




 
if ($("#hidTaskID").val() != null && $("#hidTaskID").val() != "" && $("#hidActionType").val() == 'copy') {

    console.log('copy task...');
    $('.card-title').text("Copiar - Função");
    $("#divTaskID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));

}  

if ($("#hidTaskID").val() != null && $("#hidTaskID").val() != "") {

    console.log('edit task...');
    var objFilters = new Object();
    objFilters.taskID = $("#hidTaskID").val();
    objFilters.modifiedDate = $("#hidTaskModifiedDate").val();
    getTaskByFilterForm(objFilters);

} else {

    console.log('new task...');
    // $('.card-title').text("Nova Função");
    $("#divScaleID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

// $('#disciplineDelete').click(function () {
    
//     console.log('delete discipline...');

//     $('#hidUserID').val($('#disciplineID').val());	
//     $('#hidActionType').val("DELETE_USER");
//     var messageDeleteUser = "Deseja realmente deletar a disciplina " + $('#disciplineFullName').val() + " ? ";
//     $('.modal-title-delete').text("Delete User");
//     $('.deleteConfirmation').attr("id",'deleteDisciplineEdit');
//     $('.message-modal-delete').text(messageDeleteUser);
//     $('#modalDelete').modal('show');
// });

$('#modalDelete').on('click', '#deleteDisciplineEdit', function () {

    var objDelete = $('#disciplineFullName').val();
    var btnRefresh = $('#disciplinebackButton')
    deleteDiscipline(btnRefresh,objDelete) 


});

// console.log(arrayDate);
tblScaleAdd = $('#scaleTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    { targets: [0, 1], visible: false }, // hide column
    {
		orderable: false,
		targets:   4,
		render: function (data) {

            // console.log(data);
            // console.log(data[0].shdesc);

            var arrList = [];
  
            data.forEach(function(element){
                arrList.push(element.shdesc);
            })

            var tasks =  arrList.toString();
            return tasks;
        }
	},
        {
		orderable: false,
		targets:   3,
		render: function (data) {

            // console.log(data);
            // console.log(data[0].shdesc);

            var arrList = [];
  
            data.forEach(function(element){
                arrList.push(element.taskID);
            })

            var tasks =  arrList.toString();
            return tasks;
        }
	},
    // {
	// 	orderable: false,
	// 	targets:   4,
	// 	render: function (data) {
    //         // console.log(data);
    //         var arrayDate = controlBaseYear()
    //         // console.log(arrayDate);
    //         return arrayDate[data-1]
    //     }
	// },
    // {
    // orderable: true,
    // targets:   6,
    // render: function (value) {
    //                 if (value === null) return "";
    //             return moment(value).format(TO_PATTERN_DATETIME);
    //         }
    // } 
    ],
    rowId: 'scaleAddID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdown btn-group dropdown'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        'copy',
        {
            extend: 'csvHtml5',
            title: 'BIP_Export_Table'
        },
        {
            extend: 'excelHtml5',
            title: 'BIP_Export_Table'
        }
    ],
    order: [[ 1, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: ''},			
        { data: 'userID' /*,width:'70px'*/ },
        { data: 'fullName' },        
        { data: 'lstTask'/*,width:'28px'*/ },
        { data: 'lstTask'/*,width:'28px'*/ }
    ]
});
    
// $('#scaleTable tbody').on( 'click', 'tr', function () {
//     if ( $(this).hasClass('selected') ) {
//         $(this).removeClass('selected');
//     }
//     else {
//         tblScaleAdd.$('tr.selected').removeClass('selected');
//         $(this).addClass('selected');
//     };

//     if (tblScaleAdd.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
//         $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
//             let rowsData = tblScaleAdd.rows($("#" + tblScaleAdd.table().node().id + " tr.selected")).data();
//             objDelete = rowsData[0].shdesc;
//             $('.dropdown-item').click(function () { 
//                 tableActions(tblScaleAdd, this);  
//             });
           
//         $('#btnSearchAction').removeClass('disabled btn-default');
//         $('#btnSearchAction').addClass('btn-info');
//     } else if (!tblScaleAdd.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
//         $('#btnSearchAction').removeClass('btn-info');
//         $('#btnSearchAction').addClass('disabled btn-default');
//     };
// } );

// $('#functionTable tbody').on( 'dblclick', 'tr', function () {
//     // console.log('double click');
//     tblScaleAdd.$('tr.selected').removeClass('selected');
//     $(this).addClass('selected');
//     $('#btnSearchAction').removeClass('disabled btn-default');
//     $('#btnSearchAction').addClass('btn-info');
//     $('#propertiesDiscipline').trigger("click");
// });



/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-info new-button dropdown-toggle " type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
'</div>');

var divSearchActionOptionsParm = "";

divSearchActionOptionsParm =' <a class="dropdown-item" href="#" id="addScaleUser"><i class="fas fa-user-plus mr-1"></i> Adicionar Usuario </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleOnlyUser"><i class="fas fa-eraser mr-1"></i> Remover Usuario </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleSelectedUser"><i class="fas fa-trash-alt mr-1"></i> Remover Seleção </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleTableUser"><i class="fas fa-exclamation-triangle"></i> Apagar Todos </a>'

$('#btnSearchAction').on('click', function () {
    console.log('clicado');

    $("#divSearchActionOptions").html(divSearchActionOptionsParm);

    $('#addScaleUser').click(function (e) { 
        e.preventDefault();
        console.log('Clicado USer');
        $('#modalAddUser').modal('show');
        
    });

    
});



$('#scaleSave').click(function () {
    
    console.log('scaleSave...');
    var blnCheckForm = true;

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objScale = new Object();
    var objMusic = new Object();


    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidTaskID").val() != null && $("#hidTaskID").val() != "")
        objScale.scaleID = $("#scaleID").val();
    else
        objScale.scaleID = "0";

    var date = $("#scaleDate").val();
    var time = $("#scaleHourBeginInput").val();
    
    objScale.scaleFullName = $("#scaleFullName").val();			
    objScale.scaleFgAtv = $("#scaleFgAtv").val();
    objScale.scaleDate = $("#scaleDate").val();
    objScale.scaleDateTime = date+' '+time+':00'

    
    var lstTblScaleAdd = new Array();

    tblScaleAdd.rows( function ( idx, data, node ) {
        
        var objScaleAdd = new Object();
        // console.log(data);
        objScaleAdd.userID = (data.userID != undefined? data.userID:null);
        objScaleAdd.fullName = data.fullName;
        objScaleAdd.lstTask = data.lstTask;

        // // console.log(objScaleAdd);

        
        lstTblScaleAdd.push(objScaleAdd);

    });

    objScale.tblScaleAddRows = lstTblScaleAdd

    
    var lstTblMusicAdd = new Array();

    tblScaleAddMusic.rows( function ( idx, data, node ) {
        
        var objMusicAdd = new Object();
        // console.log(data);
        objMusicAdd.listMusicID = (data.listMusicID != undefined? data.listMusicID:null);
        objMusicAdd.shdesc = data.shdesc;
        objMusicAdd.singer = data.singer;

        // // console.log(objMusicAdd);

        
        lstTblMusicAdd.push(objMusicAdd);

    });

    objScale.tblMusicAddRows = lstTblMusicAdd
    
    // console.log(objDiscipline);
    // var regex = /[^a-zA-Z0-9 âãõêôûáéíóúç-]/;
    // for (let key in objDiscipline) {

    //     if (objDiscipline.hasOwnProperty(key) && (objDiscipline[key] == null || objDiscipline[key] == "")) {
    //         // console.log(`O elemento ${key} é null, undefined ou vazio`);

    //         var htmlText = $('label[for="' + key + '"]').text();
    //         toastr.warning('O campo está vazio!',htmlText+'!');
    //         $('#'+key).focus();
    //         return

    //     }else if(regex.test(objDiscipline[key]) || objDiscipline[key].length <= 2 && key != 'disciplineID' &&  key != 'disciplineFgAtv'  ){
            
    //         console.log('key >> ',key);
    //         if(objDiscipline[key].length <= 2){
    //             console.log(key);
    //             var htmlText = $('label[for="' + key + '"]').text();
    //             toastr.warning('Mínimo 3 caracteres!',htmlText+'!');
    //             $('#'+key).focus();
    //             return
    //         }
    //         // console.log(key);
    //         var htmlText = $('label[for="' + key + '"]').text();
    //         toastr.warning('Caractere não permitido!',htmlText+'! '+objDiscipline[key]);
    //         $('#'+key).focus();
    //         return
    //     }

    // }
    // objDiscipline.baseYearID = $('#baseYearID').val();
    
    // console.log('objScale...1.2');
    console.log(objScale);
    saveScale(objScale);
    return
    
    
});



// TABLE MUSIC

tblScaleAddMusic = $('#musicTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    { targets: [0, 1], visible: false }, // hide column
    // {
	// 	orderable: false,
	// 	targets:   4,
	// 	render: function (data) {

    //         // console.log(data);
    //         // console.log(data[0].shdesc);

    //         var arrList = [];
  
    //         data.forEach(function(element){
    //             arrList.push(element.shdesc);
    //         })

    //         var tasks =  arrList.toString();
    //         return tasks;
    //     }
	// },
    //     {
	// 	orderable: false,
	// 	targets:   3,
	// 	render: function (data) {

    //         // console.log(data);
    //         // console.log(data[0].shdesc);

    //         var arrList = [];
  
    //         data.forEach(function(element){
    //             arrList.push(element.taskID);
    //         })

    //         var tasks =  arrList.toString();
    //         return tasks;
    //     }
	// },
    // {
	// 	orderable: false,
	// 	targets:   4,
	// 	render: function (data) {
    //         // console.log(data);
    //         var arrayDate = controlBaseYear()
    //         // console.log(arrayDate);
    //         return arrayDate[data-1]
    //     }
	// },
    // {
    // orderable: true,
    // targets:   6,
    // render: function (value) {
    //                 if (value === null) return "";
    //             return moment(value).format(TO_PATTERN_DATETIME);
    //         }
    // } 
    ],
    rowId: 'musicAddID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdownMusic btn-group dropdown'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        'copy',
        {
            extend: 'csvHtml5',
            title: 'BIP_Export_Table'
        },
        {
            extend: 'excelHtml5',
            title: 'BIP_Export_Table'
        }
    ],
    order: [[ 1, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: ''},			
        { data: 'listMusicID' /*,width:'70px'*/ },
        { data: 'shdesc', title:'Música',width:'2.8125rem' },        
        { data: 'singer', title:'Cantor',width:'2.8125rem' },        
        { data: 'key',title:'Tom',width:'0.625rem'/*,width:'28px'*/ }
    ]
});

/*  &#10247; vertical 3 dots */
$('.divDropdownMusic').html('<button class="btn btn-info new-button dropdown-toggle " type="button" id="btnSearchActionMusic" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchActionMusic" id="divSearchActionOptionsMusic">' +							 					  
'</div>');

var divSearchActionOptionsParmMusic = "";

divSearchActionOptionsParmMusic =' <a class="dropdown-item" href="#" id="addScaleMusic"><i class="fas fa-user-plus mr-1"></i> Adicionar Usuario </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleOnlyMusic"><i class="fas fa-eraser mr-1"></i> Remover Usuario </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleSelectedMusic"><i class="fas fa-trash-alt mr-1"></i> Remover Seleção </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleTableMusic"><i class="fas fa-exclamation-triangle"></i> Apagar Todos </a>'

$('#btnSearchActionMusic').on('click', function () {
    console.log('clicado');

    $("#divSearchActionOptionsMusic").html(divSearchActionOptionsParmMusic);

    $('#addScaleMusic').click(function (e) { 
        e.preventDefault();
        console.log('Clicado Music');
        $('#modalAddMusic').modal('show');
        
    });

    
});