
	
$('.deleteConfirmation').click(function () {
    deleteProfile($('.search-button'));			
});

$('#profileID').keypress(function(event) {

    if (event.key === "Enter") {
        searchProfile();	
    }
});

$('#profileName').keypress(function(event) {

    if (event.key === "Enter") {
        searchProfile();	
    }
});

$('.search-button').click(function () {
    searchProfile();				
});

function searchProfile() {
    var objFilters = new Object();
    objFilters.profileID = $("#profileID").val();
    objFilters.profileName = $("#profileName").val();		
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    tblProfileSearch.table().clear();
        
    getProfileByFilterTable(tblProfileSearch, objFilters, null, null);	
}

$('.new-button').click(function () {

    /*
    let strURL = "profileEdit";
    let strTabID = "profile-new";
    let strTabTitle = "Profile - New";
    openNewTab(strURL, strTabID, strTabTitle);
    */
    location.href = 'profileEdit';

});

$('#profilelBackButton').click(function () {

    location.href = "profile";
    //closeActiveTab();

});

tblProfileSearch = $('#example1').DataTable({
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
    targets:   4,
    render: function (value) {
                    if (value === null) return "";
                return moment(value).format(TO_PATTERN_DATETIME);
            }
    } ],
    rowId: 'profileID',
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
        { data: 'profileID' },
        { data: 'profileName' },
        { data: 'modifiedByFullName' },
        { data: 'modifiedDate' }
        ]
});
    
if (!$("#leftMenuProfile").hasClass("active")) {
    $("#leftMenuProfile").addClass("active");
}

$('#example1 tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblProfileSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblProfileSearch.row($("#" + tblProfileSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblProfileSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            $("#showModificationHistoryProfile").on( "click", function(event) {
                tableActions(tblProfileSearch, this)        
            });
    
            $("#deleteProfile").on( "click", function(event) {
                tableActions(tblProfileSearch, this)        
            });
    
            $("#copyProfile").on( "click", function(event) {
                tableActions(tblProfileSearch, this, false, true)        
            });
    
            $("#propertiesProfile").on( "click", function(event) {
                tableActions(tblProfileSearch, this, false, false)       
            });	

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblProfileSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#example1 tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblProfileSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesProfile').trigger("click");
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

// var profileIDParm = '<%=request.getParameter("profileID")%>';
    // console.log('Profile Id -> ' + $('#hidProfileID').val());

if ($('#hidProfileID').val() != null && $('#hidProfileID').val() != "" && $('#hidProfileID').val() != "null") {
    $("#profileID").val($('#hidProfileID').val());		
}

$('.search-button').click();

