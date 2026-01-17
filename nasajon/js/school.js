
	
$('.deleteConfirmation').click(function () {
    deleteSchool($('.search-button'));			
});

$('#schoolID').keypress(function(event) {

    if (event.key === "Enter") {
        searchSchool();	
    }
});

$('#schoolName').keypress(function(event) {

    if (event.key === "Enter") {
        searchSchool();	
    }
});

$('.search-button').click(function () {
    searchSchool();				
});

function searchSchool() {
    var objFilters = new Object();
    objFilters.schoolID = $("#schoolID").val();
    objFilters.schoolSitePrefix = $("#schoolSitePrefix").val();
    objFilters.schoolName = $("#schoolName").val();		
    objFilters.schoolFgAtv = $("#schoolFgAtv").val();
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    tblSchoolSearch.table().clear();
        
    getSchoolByFilterTable(tblSchoolSearch, objFilters, null, null);	
}

$('.new-button').click(function () {

    /*
    let strURL = "schoolEdit";
    let strTabID = "school-new";
    let strTabTitle = "School - New";
    openNewTab(strURL, strTabID, strTabTitle);
    */
    location.href = 'schoolEdit';
    
});

$('#schoolBackButton').click(function () {

    // location.href = document.referrer;
    closeActiveTab();

});

tblSchoolSearch = $('#example1').DataTable({
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
    orderable: true,
    targets:   6,
    render: function (value) {
                    if (value === null) return "";
                return moment(value).format(TO_PATTERN_DATETIME);
            }
    } ],
    rowId: 'schoolID',
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
    order: [[ 2, 'asc' ]],
    iDisplayLength: 25,		
    columns: [
        { data: null, defaultContent: ''},			
        { data: 'schoolID' },
        { data: 'schoolSitePrefix' },        
        { data: 'schoolName' },
        { data: 'fgAtv' },
        { data: 'modifiedByFullName' },
        { data: 'modifiedDate' }
        ]
});
    
if (!$("#leftMenuSchool").hasClass("active")) {
    $("#leftMenuSchool").addClass("active");
}

$('#example1 tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblSchoolSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblSchoolSearch.row($("#" + tblSchoolSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblSchoolSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            $("#showModificationHistorySchool").on( "click", function(event) {
                tableActions(tblSchoolSearch, this)        
            });
    
            $("#deleteSchool").on( "click", function(event) {
                tableActions(tblSchoolSearch, this)        
            });
    
            $("#copySchool").on( "click", function(event) {
                tableActions(tblSchoolSearch, this, false, true)        
            });
    
            $("#propertiesSchool").on( "click", function(event) {
                tableActions(tblSchoolSearch, this, false, false)       
            });	

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblSchoolSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#example1 tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblSchoolSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesSchool').trigger("click");
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

// var schoolIDParm = '<%=request.getParameter("schoolID")%>';
    // console.log('School Id -> ' + $('#hidSchoolID').val());

if ($('#hidSchoolID').val() != null && $('#hidSchoolID').val() != "" && $('#hidSchoolID').val() != "null") {
    $("#schoolID").val($('#hidSchoolID').val());		
}

$('.search-button').click();
