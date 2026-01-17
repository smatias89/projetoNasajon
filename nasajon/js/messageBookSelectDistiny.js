var messageBookSend;
var userID = $('#hidUserID').val();

// function searchCountMessage(userID){
    
//     var objFilters = {}
//     objFilters.flgRead = ''
//     objFilters.userFromID = ''
//     objFilters.userToID = userID
//     objFilters.messageBookType = ''
    
//     getMessageBookByFilterForm(objFilters)
// }

// searchCountMessage(userID);

$('#messageBookSecretarySend').click(function (e) { 
    console.log('messageBookSecretary');
    $('.secretary-box').addClass('select-div');

    $('.staff-box, .teacher-box').removeClass('select-div');
    messageBookSend = 'messageBookSecretary'
    location.href = "messageBook?userID="+userID;
    return
    sendActions(messageBookSend)
    
});

$('#messageBookStaffSend').click(function (e) {
    console.log('messageBookStaff');
    $('.staff-box').addClass('select-div');
    $('.secretary-box, .teacher-box').removeClass('select-div');

    var staffUserID = $('#hidStaffSegmentUserID').val();

    // getMessageBookStaffByFilter(objToStaff); return

    location.href = "messageBook?messageBookTo=" + staffUserID+"&type=2" ;
    return

    messageBookSend = 'messageBookStaff'
    sendActions(messageBookSend)

});

$('#messageBookTeacherSend').click(function (e) { 
    console.log('messageBookTeacher');
    $('.teacher-box').addClass('select-div');
    $('.secretary-box, .staff-box').removeClass('select-div');

    var objFilters ={}
    objFilters.classRoomStudentID = $('#hidClassRoomStudentID').val();
    getMessageBookTeacherByFilter(tblLoaderTeacherSearch, objFilters, null, null)
    $('#modalSearchTeacher').modal('show');
    return
    location.href = "messageBook?messageBookFrom=" + teacherUserID+"&type=3" ;
    
    
});



$('#messageBookTeacherSelectedSend').click(function (e) { 
    console.log('clicado');
    
    var table = $('#tableLoaderTeacherSearch').DataTable();
    var selectedDataArray = table.rows('.selected').data().toArray();
    console.log(selectedDataArray);
    var teacherUserID = selectedDataArray[0].teacherUserID
    location.href = "messageBook?messageBookTo=" + teacherUserID+"&type=3" ;
    
    
});


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
        { data: null, defaultContent: '', width:'10px'},// 			
        { data: 'responsibleForStudentClassRoom',title:'ID Class Room', width:'45px'},// 
        { data: 'responsibleForStudentID',title:'ID Student'},   //      
        { data: 'teacherUserID', title:'ID Teacher' },// 
        { data: 'teacherStudentID', title:'ID Teacher' },// 
        { data: 'classRoomName', title:'Turma' },
        { data: 'teacherDisciplineNameForStudent', title:'Disciplina' },
        { data: 'teacherNameForStudent', title:'Professor' },
    ]
});
    
if (!$("#leftMenuTeacher").hasClass("active")) {
    $("#leftMenuTeacher").addClass("active");
}

$('#tableLoaderTeacherSearch tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblLoaderTeacherSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblLoaderTeacherSearch.row($("#" + tblLoaderTeacherSearch.table().node().id + " tr.selected")).data().flgLocked);
    // if (tblLoaderTeacherSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
    //     $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
    //         let rowsData = tblLoaderTeacherSearch.rows($("#" + tblLoaderTeacherSearch.table().node().id + " tr.selected")).data();
    //         objDelete = rowsData[0].fullName;
    //         $('.dropdown-item').click(function () { 

    //             tableActions(tblLoaderTeacherSearch, this);  
    //         });

    //     $('#btnSearchAction').removeClass('disabled btn-default');
    //     $('#btnSearchAction').addClass('btn-info');
    // } else if (!tblLoaderTeacherSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
    //     $('#btnSearchAction').removeClass('btn-info');
    //     $('#btnSearchAction').addClass('disabled btn-default');
    // };
} );

$('#tableLoaderTeacherSearch tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblLoaderTeacherSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesTeacher').trigger("click");
});


/*  &#10247; vertical 3 dots */
// $('.divDropdown').html('<button class="btn btn-xs btn-block btn-default dropdown-toggle disabled" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
//                 'Actions&nbsp;' +
//                 '</button>' +
//                 '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
// '</div>');