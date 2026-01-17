console.log('grade.js');

// console.log('discipline...') 0807;
//load combos

loadComboSegmentGetAll($('#classSegment'), null);

var objDelete;

$('#disciplineID, #disciplineFullName,#disciplineFgAtv').keypress(function(event) {

    if (event.key === "Enter") {
        searchDiscipline();	
    }
});


$('.search-button').click(function (e) { 
    searchGradeControl()
    
});
$('.back-button').click(function (e) { 
    location.href = 'index';
    
});
$('.new-button').click(function (e) { 
    location.href = 'gradeControlEdit';
    
});

function searchGradeControl() {
    var objFilters = new Object();
    // objFilters.disciplineID = $("#disciplineID").val();	
    // objFilters.userID = $('#hidUserID').val();	
    
    // console.log($('#hidUserHeadID').val()+ '  '+ $('#hidUserID').val());
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters);
    tblGradeControlSearch.table().clear();
        
    getGradeControlByFilterTable(tblGradeControlSearch, objFilters, null, null);	
}


// console.log(arrayDate);
tblGradeControlSearch = $('#gradeControlTable').DataTable({ 
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }
    , 
    {
		orderable: false,
		targets:   1,
		render: function (data) {
            // console.log(data);
            var arrayDate = controlBaseYear()
            // console.log(arrayDate);
            return arrayDate[data-1]
        }
	},
    {
		orderable: false,
		targets:   7,
		render: function (data) {
            // console.log(data);
            var dateTimeTMP = moment(data).format(TO_PATTERN_INBOX_DATETIME_BRAZIL)
                
                // console.log(dateTimeTMP);
                var weekDay = weekConvert(dateTimeTMP)
            return weekDay
        }
	},
    {
        targets: [8],      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
    },
    ],
    rowId: 'gradeContrlID',
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
        { data: 'baseYearID',width: '70px' },
        { data: 'flgBim1',width: '70px'  },
        { data: 'flgBim2',width: '70px'  },
        { data: 'flgBim3',width: '70px'  },
        { data: 'flgBim4',width: '70px'  },
        { data: 'modifiedByFullName' },
        { data: 'modifiedDate' },
        { data: 'gradeControlID' }//hide
    ]
});
    
if (!$("#leftMenuGrade").hasClass("active")) {
    $("#leftMenuGrade").addClass("active");
}

$('#gradeControlTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblGradeControlSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblGradeControlSearch.row($("#" + tblGradeControlSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblGradeControlSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblGradeControlSearch.rows($("#" + tblGradeControlSearch.table().node().id + " tr.selected")).data();

            $('.dropdown-item').click(function () { 
                tableActions(tblGradeControlSearch, this);  
            });
           
        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblGradeControlSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#gradeControlTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblGradeControlSearch.$('tr.selected').removeClass('selected');
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

$('#gradeControlSearch').click();

