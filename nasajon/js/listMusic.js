// console.log('discipline...') 0807;

var objDelete;

$('#listMusicID, #listMusicFullName,#listMusicFgAtv').keypress(function(event) {

    if (event.key === "Enter") {
        searchListMusic();	
    }
});

$('#listMusicFgAtv').change(function (e) { 
    e.preventDefault();
    console.log('change selecte... ');
    $('.search-button').click();
    
});

$('.search-button').click(function (e) { 
    searchListMusic()
    
});
$('.back-button').click(function (e) { 
    location.href = 'index';
    
});
$('.new-button').click(function (e) { 
    location.href = 'listMusicEdit';
    
});

function searchListMusic() {
    var objFilters = new Object();
    objFilters.listMusicID = $("#listMusicID").val();
    objFilters.shdesc = $("#listMusicFullName").val();		
    objFilters.fgAtv = $("#listMusicFgAtv").val();		
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters);
    tblListMusicSearch.table().clear();
        
    getListMusicByFilterTable(tblListMusicSearch, objFilters, null, null);	
}


// console.log(arrayDate);
tblListMusicSearch = $('#listMusicTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    { targets: [0, 1], visible: false } // hide column
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
    rowId: 'listMusicID',
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
        { data: 'listMusicID' /*,width:'70px'*/ },
        { data: 'shdesc', title:'Música',width:'2.8125rem' },        
        { data: 'singer', title:'Cantor',width:'2.8125rem' },        
        { data: 'fgAtv',width:'0.625rem'/*,width:'28px'*/ }
    ]
});
    

if (!$("#leftMenuListMusic").hasClass("active")) {
    $("#leftMenuListMusic").addClass("active");
}

$('#listMusicTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblListMusicSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };

    if (tblListMusicSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblListMusicSearch.rows($("#" + tblListMusicSearch.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].shdesc;
            $('.dropdown-item').click(function () { 
                tableActions(tblListMusicSearch, this);  
            });
           
        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblListMusicSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#functionTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblListMusicSearch.$('tr.selected').removeClass('selected');
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
    deletListMusic($('.search-button'),objDelete);		
    
});

$('#listMusicSearch').click();

