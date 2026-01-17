

console.log('messagebook search');
var userID = $('#hidUserID').val();
var hidSegmentID = $('#hidSegmentID').val();

var isResponsible = $('#hidIsResponsible').val();
var isStaff = $('#hidIsStaff').val();
var isTeacher = $('#hidIsTeacher').val();
var sendType = '';


// console.log('isResponsible: ',isResponsible);
// console.log('isStaff: ',isStaff);
// console.log('isTeacher: ',isTeacher);

if(isResponsible != '' || isResponsible == null){
    sendType = isResponsible;
    console.log('set sendtype 1... ');
    
}else if(isStaff != '' || isStaff == null){
    sendType = isStaff;
    console.log('set sendtype 2... ');
    
}else if(isTeacher != '' || isTeacher == null){
    sendType = isTeacher;
    console.log('set sendtype 3... ');
    
}
// console.log('sendType: ',sendType);


//getMessageBookByFilterForm(objFilters) messageBookSearchSearch
$('.search-button').click(function () {
    searchProfile();				
});

function searchProfile() {

    var objFilters = {}
    objFilters.flgRead = $('#messageBookSearchFgAtv').val();
    objFilters.userFromID = ''
    objFilters.userFromFullName = $('#messageBookSearchFullName').val();
    objFilters.userFromCPF = $('#messageBookSearchCPF').val().replace(/[.\-]/g, "")
    objFilters.userToID = $('#hidUserID').val();
    objFilters.messageBookType = $('#hidUserSenderType').val();
    
    
    tblMessageBookSearch.table().clear();
    // console.log(objFilters);return
        
    getMessageBookByFilterTableForMe(tblMessageBookSearch, objFilters, null, null);	
}

tblMessageBookSearch = $('#messageBookSearchTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    {
        targets: 1,      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
    },
    {
		orderable: false,
		targets:   2,
		render: function (data) {
            // console.log(data);
            return data.fullName
            
        }
	},
    {
		orderable: false,
		targets:   3,
		render: function (data) {
            // console.log(data);
            var arrayDate = controlFromMessageBook()
            // console.log(arrayDate);
            return arrayDate[data-1]
        }
	},
    {
		orderable: false,
		targets:   6,
		render: function (data) {
            // console.log(data);
            var arrayDate = controlBaseYear()
            // console.log(arrayDate);
            return arrayDate[data-1]
        }
	},
    {
		orderable: false,
		targets:   5,
		render: function (data) {
            // console.log(data);
            var dateTimeTMP = moment(data).format(TO_PATTERN_INBOX_DATETIME_BRAZIL)
                
                // console.log(dateTimeTMP);
                var weekDay = weekConvert(dateTimeTMP)
            return weekDay
        }
	},
    // {
    // orderable: true,
    // targets:   6,
    // render: function (value) {
    //                 if (value === null) return "";
    //             return moment(value).format(TO_PATTERN_DATETIME);
    //         }
    // } 
    ],
    rowId: 'messageBookSearchID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
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
    order: [[ 6, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: ''},			
        { data: 'userFromID' },// oculta
        { data: 'lstUser', title: 'Nome' },
        { data: 'messageBookType',title:'Remetente' },        
        { data: 'fgAtv',title:'Lidas/Não Lidas' },
        { data: 'createdDate',title:'Data de Envio' },
        { data: 'baseYearID',title:'Ano Acadêmico' }
    ]
});
    
if (!$("#leftMenuMessageBookSelect").hasClass("active")) {
    $("#leftMenuMessageBookSelect").addClass("active");
}

$('#messageBookSearchTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblMessageBookSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblMessageBookSearch.row($("#" + tblMessageBookSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblMessageBookSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblMessageBookSearch.rows($("#" + tblMessageBookSearch.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].shdesc;
            // console.log(rowsData[0]);
            $('.dropdown-item').click(function () { 
                tableActions(tblMessageBookSearch, this);  
            });
           
        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblMessageBookSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#messageBookSearchTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblMessageBookSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#openMessageBook').trigger("click");
});


/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-xs btn-block btn-default dropdown-toggle disabled" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
'</div>');

$('#messageBookSearchSearch').click();

$('#messageBookSearchFgAtv').change(function (e) { 
    $('#messageBookSearchSearch').click();
});


console.log('hidUserSenderType: ',$('#hidUserSenderType').val());
//set buttons... 
if( (sendType == 1 && $('#hidUserSenderType').val() == 2) || (sendType == 1 && $('#hidUserSenderType').val() == 3)  ){
    console.log('is a responsible... ');
    $('#messageBookNewMensageForTeacher').show();
    $('#messageBookNewMensageForResponsible').hide(); 

}else if( sendType == 2 && $('#hidUserSenderType').val() == 1){

    console.log('is a Staff...');
    $('#messageBookNewMensageForTeacher').hide();
    $('#messageBookNewMensageForResponsible').show(); 

}else if( (sendType == 2 && $('#hidUserSenderType').val() == 2) || (sendType == 2 && $('#hidUserSenderType').val() == 3)){

    console.log('is a Staff...');
    $('#messageBookNewMensageForTeacher').show();
    $('#messageBookNewMensageForResponsible').hide(); 

}else if( sendType == 3 && $('#hidUserSenderType').val() == 1){

    console.log('is a teacher...');
    $('#messageBookNewMensageForTeacher').hide();
    $('#messageBookNewMensageForResponsible').show(); 

}else if( (sendType == 3 && $('#hidUserSenderType').val() == 2) || (sendType == 3 && $('#hidUserSenderType').val() == 3)){

    console.log('is a teacher...');
    $('#messageBookNewMensageForTeacher').show();
    $('#messageBookNewMensageForResponsible').hide(); 

}


// if($('#hidUserSenderType').val() == 1){

//     $('#messageBookNewMensageForResponsible').show(); 
//     $('#messageBookNewMensageForTeacher').hide();

// }else if($('#hidUserSenderType').val() == 2 || $('#hidUserSenderType').val() == 3){

//     $('#messageBookNewMensageForResponsible').hide(); 
//     $('#messageBookNewMensageForTeacher').show();

// }else if(( $('#hidUserSenderType').val() == 2 && sendType == 1 )|| ($('#hidUserSenderType').val() == 3 && sendType == 1) ){

//     console.log('responsible sendType...');
//     $('#messageBookNewMensageForResponsible').show(); 
//     $('#messageBookNewMensageForTeacher').show();

// }

$('#messageBookNewMensageForTeacher').click(function (e) { 
    e.preventDefault();
    console.log('messageBookNewMensageForTeacher teacher..... ');
    

    var objFilters ={}
    objFilters.classRoomStudentID = $('#hidClassRoomStudentID').val();

    //sendType == 1
    if($('#hidClassRoomStudentID').val() != '' && sendType == 1  && $('#hidUserSenderType').val() == '3'){
        console.log('set classroom is a responsoble... ');
        objFilters.classRoomID =  $('#hidClassRoomStudentID').val()

    }
    
    if($('#hidStaffSegmentID').val() != '' && sendType == 1  && $('#hidUserSenderType').val() == '2'){
        
        console.log('set segment is a responsoble... ');
        objFilters.classSegment =  $('#hidStaffSegmentID').val()
        location.href = "messageBook?messageBookTo=" +$('#hidStaffSegmentUserID').val()+"&type="+sendType;
        return
    }

    //sendType == 2
    if($('#hidClassRoomStudentID').val() != '' && sendType == 2 ){
        console.log('set classroom is a Staff... ');
        objFilters.classRoomID =  $('#hidClassRoomStudentID').val()
    }

    if( $('#hidSegmentID').val() != '' && sendType == 2  ){
        console.log('set segment a Staff... ');
        objFilters.classSegment =  $('#hidSegmentID').val()
    }

    //sendType == 3 teacher
    if( sendType == 3 && $('#hidUserSenderType').val() == '1'  ){
        console.log('set responsible, is a teacher... ');
        // objFilters.classSegment =  $('#hidSegmentID').val()
    }

    if( sendType == 3 && $('#hidUserSenderType').val() == '2'  ){
        console.log('set segment, is a teacher... ');
        // objFilters.classSegment =  $('#hidSegmentID').val()
        objFilters.userID = $('#hidUserID').val();
        getMessageBookStaffByFilter(null, objFilters, null, null)
        return
        // location.href = "messageBook?messageBookTo=" +$('#hidStaffSegmentUserID').val()+"&type="+sendType;
    }

    if( sendType == 3 && $('#hidUserSenderType').val() == '3'  ){
        console.log('set teacher, is a teacher... ');
        // objFilters.classSegment =  $('#hidSegmentID').val()
    }
    
    
    getMessageBookTeacherByFilter(tblLoaderTeacherSearch, objFilters, null, null)
    $('#modalSearchTeacher').modal('show');//aqui
    
});

$("#messageBookNewMensageForResponsible").click(function (e) {  
    console.log('for responsible... ');
    $('.teacher-box').addClass('select-div');
    $('.secretary-box, .staff-box').removeClass('select-div');

    if(sendType == 2){

        var objFilters ={}
        objFilters.segmentID = $('#hidSegmentID').val();
        getMessageBookResponsibleByFilter(tblLoaderResponsibleSearch, objFilters, null, null)
        $('#modalSearchResponsible').modal('show');

    }else{
        console.warn('case');
        var objFilters ={}
        objFilters.userID = $('#hidUserID').val();
        console.log(objFilters);
        getMessageBookResponsibleWhereTeacherByFilter(tblLoaderResponsibleSearch, objFilters, null, null)
        $('#modalSearchResponsible').modal('show');
    }
    

    
    
});


//table modal tableLoaderTeacherSearch 
//------------------------------------------------------------
tblLoaderTeacherSearch = $('#tableLoaderTeacherSearch').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    {
        targets: [1,2,3,4],      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
    },
    ],
    rowId: 'teacherSeclectedID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center .divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        // {
            //     extend: 'csvHtml5',
            //     title: 'BIP_Export_Table'
            // },
        'copy',
        {
            extend: 'excelHtml5',
            title: 'BIP_Export_Table'
        }
    ],
    order: [[ 1, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: '', width:'10px'},// 	oculto		
        { data: 'classRoomID',title:'ID Class Room', width:'45px'},// 
        { data: 'teacherID',title:'ID Teacher'},   //      
        { data: 'teacherUserID', title:'ID User Teacher' },// 
        { data: 'disciplineID', title:'ID Discipline' },// 
        { data: 'classRoomName', title:'Turma' },
        { data: 'disciplineName', title:'Disciplina' },
        { data: 'teacherName', title:'Professor' },
    ]
});
    

$('#tableLoaderTeacherSearch tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblLoaderTeacherSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };

} );

$('#tableLoaderTeacherSearch tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblLoaderTeacherSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#messageBookTeacherSelectedSend').trigger("click");
});

$('#messageBookTeacherSelectedSend').click(function (e) { 
    console.log('messageBookTeacherSelectedSend ...');
    
    var table = $('#tableLoaderTeacherSearch').DataTable();
    var selectedDataArray = table.rows('.selected').data().toArray();
    console.log(selectedDataArray);
    var teacherUserID = selectedDataArray[0].teacherUserID
    location.href = "messageBook?messageBookTo=" + teacherUserID+"&type="+sendType ;
    
    
});

//table modal tableLoaderResponsibleSearch 
//------------------------------------------------------------


tblLoaderResponsibleSearch = $('#tableLoaderResponsibleSearch').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    {
        targets: [5,6,7],      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
    },
    ],
    rowId: 'responsibleSeclectedID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center .divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        // {
            //     extend: 'csvHtml5',
            //     title: 'BIP_Export_Table'
            // },
        'copy',
        {
            extend: 'excelHtml5',
            title: 'BIP_Export_Table'
        }
    ],
    order: [[ 1, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: '', width:'10px'},// 	oculto		
        { data: 'pedagogicalName',title:'Resp Pedag', width:'45px'},// 
        { data: 'financialName',title:'Resp Fin'},   //      
        { data: 'studentName', title:'Estudante' },// 
        { data: 'classRoomName', title:'Turma' },// 
        { data: 'pedagogicalUserID', title:'pedagogicalUserID' },
        { data: 'financialUserID', title:'financialUserID' },
        { data: 'studentUserID', title:'studentUserID' },
    ]
});
    

$('#tableLoaderResponsibleSearch tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblLoaderResponsibleSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };

} );

$('#tableLoaderResponsibleSearch tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblLoaderResponsibleSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#messageBookResponsibleSelectedSend').trigger("click");
});

$('#messageBookResponsibleSelectedSend').click(function (e) { 
    console.log('messageBookResponsibleSelectedSend ...');
    
    var table = $('#tableLoaderResponsibleSearch').DataTable();
    var selectedDataArray = table.rows('.selected').data().toArray();
    // console.log(selectedDataArray);
    var pedagogicalUserID = selectedDataArray[0].pedagogicalUserID
    var financialUserID = selectedDataArray[0].financialUserID
    var pedagogicalName = selectedDataArray[0].pedagogicalName
    var financialName = selectedDataArray[0].financialName

    // console.log('pedagogicalUserID: ',pedagogicalUserID);
    // console.log('financialUserID: ',financialUserID);
    // console.log('pedagogicalName: ',pedagogicalName);
    // console.log('financialName: ',financialName);

    $('#modalSearchResponsible').modal('hide');

    // $('#addResponsible').empyt();
    $('#addResponsible').append(`
        <option value="${pedagogicalUserID}">${pedagogicalName}</option>
        <option value="${financialUserID}">${financialName}</option>
    `);
    $('#modalSpeakResponsible').modal('show');
    
    
    // location.href = "messageBook?messageBookTo=" + teacherUserID+"&type="+sendType ;
    
    
});

$('#speakResponsibleSelectedSend').on('click', function () {
    console.log('responsible selected sender.... ');
    var responsibleSenderID;
    responsibleSenderID = $('#addResponsible').val();
    // $('#addResponsible').empyt(); //remove options
    location.href = "messageBook?messageBookTo=" + responsibleSenderID+"&type="+sendType ;
});

$('#speakStaffSelectedSend').on('click', function () {
    //criado dinamicamente
    console.log('Staff selected sender.... ');
    var staffSenderID;
    staffSenderID = $('#addResponsible').val();
    location.href = "messageBook?messageBookTo=" + staffSenderID+"&type="+sendType ;
});

$('#closeModalSpeakResponsible').on('click', function () {
    $('.close').trigger('click');
});

