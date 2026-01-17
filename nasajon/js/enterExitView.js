// console.log('enterExitView... ');

loadComboClassRoomWithStudentGetAll($('#enterExitClassRoom'));
var objDelete;
if (!$("#leftMenuEnterExitView").hasClass("active")) {
    $("#leftMenuEnterExitView").addClass("active");
}	


$('#enterExitID, #enterExitFullName,#enterExitClassRoom').keypress(function(event) {

    if (event.key === "Enter") {
        searchEnterExit();	
    }
});

$('.search-button').click(function (e) { 
    searchEnterExit()
    
});
$('.back-button').click(function (e) { 
    location.href = 'index';
    
});






$('.new-button').click(function (e) { 
   
    location.href = 'enterExitViewEdit';
    
});

// console.log($('#hidFullName').val());

function searchEnterExit() {
    var objFilters = new Object();

    if($('#hiPermissionOnlyStaff').val()){

        
        objFilters.studentFullName =  $("#studentFullName").val();			
        objFilters.enterExitClassRoom = $("#enterExitClassRoom").val();	

    }else{

        console.log('permission loading...');
        objFilters.studentFullName =  $("#hidFullName").val();			
        objFilters.enterExitClassRoom = $("#hidClassRoomID").val();	
        $('#studentFullName').val(objFilters.studentFullName);
        $("#enterExitClassRoom").val($("#hidClassRoomID").val()).trigger("change");
    
        console.log($('#hidClassRoomID').val());
    }

    	
    objFilters.enterExitFullName = $("#enterExitFullName").val();		
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }

    
    // console.log('objFilters.. ');
    tblEnterExitSearch.table().clear();
        
    getEnterExitlByFilterTable(tblEnterExitSearch, objFilters, null, null);	
}


// console.log(arrayDate);
tblEnterExitSearch = $('#enterExitTable').DataTable({
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
    {
        targets: [5],      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
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
    rowId: 'disciplineID',
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
        { data: 'personName',title:'NOME',width:'70px' },
        { data: 'studentFullName',title:'ALUNO(S)' },        
        { data: 'fgAtv',width:'28px' },
        { data: 'baseYearID' },
        { data: 'enterExitID' }
    ]
});
    

$('#enterExitTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblEnterExitSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblEnterExitSearch.row($("#" + tblEnterExitSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblEnterExitSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblEnterExitSearch.rows($("#" + tblEnterExitSearch.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].shdesc;
            rowsData[0]['view'] = true
            $('.dropdown-item').click(function () { 
                tableActions(tblEnterExitSearch, this);  
            });
           
        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblEnterExitSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#enterExitTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblEnterExitSearch.$('tr.selected').removeClass('selected');
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
                            

// var userIDParm = '<%=request.getParameter("userID")%>';
    // console.log('User Id -> ' + $('#hidUserID').val());

if ($('#hidEnterExitID').val() != null && $('#hidEnterExitID').val() != "" && $('#hidEnterExitID').val() != "null") {
    $("#enterExitID").val($('#hidEnterExitID').val());		
}

$('.deleteConfirmation').click(function () {
    deleteDiscipline($('.search-button'),objDelete);		
    
});


$('#enterExitSearch').click()

console.log('permissions loading...');
if($('#hiPermissionOnlyStaff').val()){
    $('.new-button, .search-button').show()
}else{
    $('.new-button, .search-button').hide()
    $('#studentFullName').attr('readonly',true);
}
