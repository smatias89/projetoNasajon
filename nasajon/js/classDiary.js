console.log('is teacher... ');

// console.log('discipline...') 0807;
//load combos

loadComboSegmentGetAll($('#classSegment'), null);

var objDelete;

$('#classRoomNumber,#disciplineFgAtv').keypress(function(event) {

    if (event.key === "Enter") {
        searchDiscipline();	
        event.preventDefault();
    }
});

$('#classSegment').change(function (e) { 
    e.preventDefault();
    console.log('change selecte... ');
    searchDiscipline();
    
});

$('.search-button').click(function (e) { 
    searchDiscipline()
    e.preventDefault();
    
});
$('.back-button').click(function (e) { 
    location.href = 'index';
    e.preventDefault();
    
});
$('#gradeHabilit').click(function (e) { 
    location.href = 'gradeControl';
    e.preventDefault();
    
});

// if(){
//     $('#gradeHabilit').hide();
// }

function searchDiscipline() {
    // console.log('$(#hidUserID).val(): ',$('#hidUserID').val());
    var objFilters = new Object();
    objFilters.disciplineID = $("#disciplineID").val();
    objFilters.shdesc = $("#classRoomNumber").val();		
    objFilters.fgAtv = $("#disciplineFgAtv").val();		
    objFilters.classSegment = $("#classSegment").val();		
    objFilters.userID = $('#hidUserID').val();	
    
    // console.log($('#hidUserHeadID').val()+ '  '+ $('#hidUserID').val());
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters);
    tblGradeSearch.table().clear();
        
    getGradeByFilterTable(tblGradeSearch, objFilters, null, null);	
}


// console.log(arrayDate);
tblGradeSearch = $('#gradeTable').DataTable({ 
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }
    , 
    {
        targets: [7,8],      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
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
	}
    ],
    rowId: 'classRoomGradeID',
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
    order: [[ 1, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: ''},			
        { data: 'classRoomID' },
        { data: 'shdesc' },
        { data: 'disciplineName' },
        { data: 'classRoomSegment' },        
        { data: 'classRoomPeriod' },
        { data: 'baseYearID' },
        { data: 'teacherID' }, //hide
        { data: 'teacherUserID' } //hide
    ]
});
    
if (!$("#leftMenuClassDiary").hasClass("active")) {
    $("#leftMenuClassDiary").addClass("active");
}

$('#gradeTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblGradeSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblGradeSearch.row($("#" + tblGradeSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblGradeSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblGradeSearch.rows($("#" + tblGradeSearch.table().node().id + " tr.selected")).data();
            // objDelete = rowsData[0].shdesc;
            // rowsData[0]['teacherUserID'] = $('#hidUserHeadID').val();
            // console.log(rowsData[0]);
            
            $('.dropdown-item').click(function () { 
                tableActions(tblGradeSearch, this);  
            });
           
        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblGradeSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#gradeTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblGradeSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesDiscipline').trigger("click");
});


/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-xs btn-block btn-default dropdown-toggle disabled" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
                '</div>');
                            
$('#modalLock').modal({ show: false});
$('#modalUnlock').modal({ show: false});
$('#modalUploadHistory').modal({ show: false});
$('#modalShowModificationHistory').modal({ show: false});
$('#modalDelete').hide();	

$('#modalShowModificationHistory').on('shown.bs.modal', function (e) {
    tblModificationHistory.columns.adjust().draw();
});

// var userIDParm = '<%=request.getParameter("userID")%>';
    // console.log('User Id -> ' + $('#hidUserID').val());

if ($('#hidDisciplineID').val() != null && $('#hidDisciplineID').val() != "" && $('#hidDisciplineID').val() != "null") {
    $("#disciplineID").val($('#hidDisciplineID').val());		
}

$('.deleteConfirmation').click(function () {
    deleteDiscipline($('.search-button'),objDelete);		
    
});

$('#gradeSearch').click();

