
var objDelete;	

$('.deleteConfirmation').click(function () {
    deleteUser($('.search-button'),objDelete);		
});

$('#userID').keypress(function(event) {

    if (event.key === "Enter") {
        searchUser();	
    }
});

$('#userLogin').keypress(function(event) {

    if (event.key === "Enter") {
        searchUser();	
    }
});

$('#userFullName').keypress(function(event) {

    if (event.key === "Enter") {
        searchUser();	
    }
});

$('.search-button').click(function () {
    searchUser();				
});

function searchUser() {
    var objFilters = new Object();
    objFilters.userID = $("#userID").val();
    objFilters.userFullName = $("#userFullName").val();		
    objFilters.userFgAtv = $("#userFgAtv").val();
    objFilters.userEmail = $("#userLogin").val();
    // objFilters.blnProfile = 'false';			
    // objFilters.blnSchool = 'false';
    // objFilters.blnAdress = 'false';
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    tblUserSearch.table().clear();
        
    getUserByFilterTable(tblUserSearch, objFilters, null, null);	
}

$('.new-button').click(function () {

    /*
    let strURL = "userEdit";
    let strTabID = "user-new";
    let strTabTitle = "User - New";
    openNewTab(strURL, strTabID, strTabTitle);
    */
   console.log('AQUI');
    location.href = 'userEdit.php';
});

$('#userBackButton').click(function () {

    // location.href = document.referrer;
    closeActiveTab();

});

tblUserSearch = $('#example1').DataTable({
    columnDefs: [{
        orderable: false,
        className: 'select-checkbox',
        targets: 0,
        data: null
    },
    { targets: [0, 1, 3,4,6], visible: false }, // hide column
    {
        orderable: false,
        targets: 2,
        render: function (value) {
            if (value === null) return "";
            return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
    },
    {
        orderable: false,
        targets: 3,
        render: function (data) {

            return maskCPF(data);
        }
    },
    {
        orderable: true,
        targets: 6,
        render: function (value) {
            if (value === null) return "";
            return moment(value).format(TO_PATTERN_DATETIME);
        }
    }],
    rowId: 'userID',
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
    order: [1, 'desc'],
    iDisplayLength: 25,
    columns: [
        { data: null, defaultContent: '' },
        { data: 'userID' },
        { data: 'fullName' },
        { data: 'cpf' },
        { data: 'email' },
        { data: 'fgAtv' },
        { data: 'modifiedDate' }
    ]
});
    
if (!$("#leftMenuUser").hasClass("active")) {
    $("#leftMenuUser").addClass("active");
}

$('#example1 tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblUserSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblUserSearch.row($("#" + tblUserSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblUserSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
            
    
            $("#showModificationHistoryUser").on( "click", function(event) {
                tableActions(tblUserSearch, this)        
            });
    
            $("#deleteUser").on( "click", function(event) {
                tableActions(tblUserSearch, this)       
                let rowsData = tblUserSearch.rows($("#" + tblUserSearch.table().node().id + " tr.selected")).data();
                objDelete = rowsData[0].fullName; 
            });
    
            $("#copyUser").on( "click", function(event) {
                tableActions(tblUserSearch, this, false, true)        
            });
    
            $("#propertiesUser").on( "click", function(event) {
                tableActions(tblUserSearch, this, false, false)       
            });	

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblUserSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#example1 tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblUserSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesUser').trigger("click");
});


/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-xs btn-block btn-default dropdown-toggle disabled" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Mais&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
                '</div>');
                            
$('#modalLock').modal({ show: false});
$('#modalUnlock').modal({ show: false});
$('#modalUploadHistory').modal({ show: false});
$('#modalShowModificationHistory').modal({ show: false});
$('#modalDelete').modal({ show: false});	

$('#modalShowModificationHistory').on('shown.bs.modal', function (e) {
    tblModificationHistory.columns.adjust().draw();
});

// var userIDParm = '<%=request.getParameter("userID")%>';
    // console.log('User Id -> ' + $('#hidUserID').val());

if ($('#hidUserID').val() != null && $('#hidUserID').val() != "" && $('#hidUserID').val() != "null") {
    $("#userID").val($('#hidUserID').val());		
}

$('#userSearch').click();

