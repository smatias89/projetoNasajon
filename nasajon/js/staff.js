var objDelete;
//mask
$('#staffCPF').mask('999.999.999-99').attr('placeholder','___.___.___-__');

$('.deleteConfirmation').click(function () {
    deleteStaff($('.search-button'),objDelete);			
});


$('#staffName,#staffID,#staffCPF,#staffEmail').keypress(function(event) {

    if (event.key === "Enter") {
        searchStaff();	
    }
});

$('.search-button').click(function () {
    searchStaff();				
});

function searchStaff() {
    var objFilters = new Object();
    objFilters.staffID = $("#staffID").val();
    objFilters.staffName = $("#staffName").val();		
    objFilters.staffEmail = $("#staffEmail").val();
    objFilters.staffCPF = $("#staffCPF").val().replace(/[.\-]/g, "");
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    tblStaffSearch.table().clear();
        
    getStaffByFilterTable(tblStaffSearch, objFilters, null, null);	
}

$('.new-button').click(function () {

    /*
    let strURL = "staffEdit";
    let strTabID = "staff-new";
    let strTabTitle = "Staff - New";
    openNewTab(strURL, strTabID, strTabTitle);
    */
    location.href = 'staffEdit';
    
});

$('#staffBackButton').click(function () {

    // location.href = document.referrer;
    closeActiveTab();

});

tblStaffSearch = $('#example1').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    {
		orderable: false,
		targets:   2,
		render: function (value) {
					if (value === null) return "";
					return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				}
	},
    {
		orderable: false,
		targets:   4,
		render: function (data) {
					
					return maskCPF(data);
				}
	},
    {
    orderable: true,
    targets:   6,
    render: function (value) {
                    if (value === null) return "";
                return moment(value).format(TO_PATTERN_DATETIME);
            }
    } ],
    rowId: 'staffID',
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
    iDisplayLength: 25,		
    columns: [
        { data: null, defaultContent: ''},			
        { data: 'staffID' },
        { data: 'fullName' },        
        { data: 'email' },
        { data: 'cpf' },
        { data: 'modifiedByFullName' },
        { data: 'modifiedDate' }
        ]
});
    
if (!$("#leftMenuStaff").hasClass("active")) {
    $("#leftMenuStaff").addClass("active");
}

$('#example1 tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblStaffSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblStaffSearch.row($("#" + tblStaffSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblStaffSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            $("#showModificationHistoryStaff").on( "click", function(event) {
                tableActions(tblStaffSearch, this)        
            });
    
            $("#deleteStaff").on( "click", function(event) {
                tableActions(tblStaffSearch, this)    
                let rowsData = tblStaffSearch.rows($("#" + tblStaffSearch.table().node().id + " tr.selected")).data();
                objDelete = rowsData[0].fullName;    
            });
    
            $("#copyStaff").on( "click", function(event) {
                tableActions(tblStaffSearch, this, false, true)        
            });
    
            $("#propertiesStaff").on( "click", function(event) {
                tableActions(tblStaffSearch, this, false, false)       
            });	

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblStaffSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#example1 tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblStaffSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesStaff').trigger("click");
});


/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-xs btn-block btn-default dropdown-toggle disabled" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Actions&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
                '</div>');
                            
//$('#modalLock').modal({ show: false});
//$('#modalUnlock').modal({ show: false});
//$('#modalUploadHistory').modal({ show: false});
$('#modalShowModificationHistory').modal({ show: false});
$('#modalDelete').modal({ show: false});	

$('#modalShowModificationHistory').on('shown.bs.modal', function (e) {
    tblModificationHistory.columns.adjust().draw();
});


if ($('#hidStaffID').val() != null && $('#hidStaffID').val() != "" && $('#hidStaffID').val() != "null") {
    $("#staffID").val($('#hidStaffID').val());		
}

$('#staffSearch').click();

