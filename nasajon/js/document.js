// console.log('document...') 0807;

var objDelete;

$('#documentID, #documentFullName,#documentFgAtv').keypress(function(event) {

    if (event.key === "Enter") {
        searchDiscipline();	
    }
});

$('#documentFgAtv').change(function (e) { 
    e.preventDefault();
    console.log('change selecte... ');
    $('.search-button').click();
    
});

$('.search-button').click(function (e) { 
    searchDiscipline()
    
});
$('.back-button').click(function (e) { 
    location.href = 'index';
    
});
$('.new-button').click(function (e) { 
    location.href = 'documentEdit';
    
});

function searchDiscipline() {
    var objFilters = new Object();
    objFilters.documentID = $("#documentID").val();
    objFilters.documentShdesc = $("#documentFullName").val();		
    objFilters.fgAtv = $("#documentFgAtv").val();		
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters);
    tblDocumentSearch.table().clear();
        
    getDisciplineByFilterTable(tblDocumentSearch, objFilters, null, null);	
}


// console.log(arrayDate);
tblDocumentSearch = $('#documentTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }
    , 
    {
		orderable: false,
		targets:   4,
		render: function (data) {
            // console.log(data);
            var arrayDate = controlBaseYear()
            // console.log(arrayDate);
            return arrayDate[data-1]
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
    rowId: 'documentID',
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
        { data: 'documentID',width:'70px' },
        { data: 'shdesc' },        
        { data: 'fgAtv',width:'28px' },
        { data: 'baseYearID' },
    ]
});
    
if (!$("#leftMenuDiscipline").hasClass("active")) {
    $("#leftMenuDiscipline").addClass("active");
}

$('#documentTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblDocumentSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblDocumentSearch.row($("#" + tblDocumentSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblDocumentSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblDocumentSearch.rows($("#" + tblDocumentSearch.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].shdesc;
            $('.dropdown-item').click(function () { 
                tableActions(tblDocumentSearch, this);  
            });
           
        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblDocumentSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#documentTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblDocumentSearch.$('tr.selected').removeClass('selected');
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
    $("#documentID").val($('#hidDisciplineID').val());		
}

$('.deleteConfirmation').click(function () {
    deleteDiscipline($('.search-button'),objDelete);		
    
});

$('#documentSearch').click();

