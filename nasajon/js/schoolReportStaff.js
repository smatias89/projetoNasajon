console.log('schoolReportStaff.js');
loadComboSegmentGetAll($('#schoolReportSegment'));

var objDelete;

$('#schoolReportClassRoomID, #schoolReportFullName,#schoolReportSegment,#schoolReportNumber').keypress(function(event) {

    if (event.key === "Enter") {
        searchScholReport()	
    }
});

$('.search-button').click(function (e) { 
    searchScholReport()
    
});

$('#schoolReportSegment').change(function (e) { 
    e.preventDefault();
    console.log('change selecte... ');
    searchScholReport()
    
});

$('.back-button').click(function (e) { 
    location.href = 'index';
    
});

$('#schoolReportNew').click(function (e) { 
    // location.href = 'classRoomEdit';

    $('#printSchoolReport').trigger('click');
    var table = $('#schoolReportTable').DataTable();
    var selectedDataArray = table.rows('.selected').data().toArray();
    // console.log(selectedDataArray);
    if(selectedDataArray.length == 0){
        toastr.warning('Selecione um Estudante','Selecione',{
			timeOut: 1000,
			preventDuplicates: true,
			positionClass: 'toast-top-right',
			
		});
		return
    }
    
});

function searchScholReport() {
    var objFilters = new Object();

    objFilters.schoolReport = 'Y';		
    objFilters.studentUserID = '';
    objFilters.schoolReportSegment = $('#schoolReportSegment').val();
    objFilters.fullName = $('#schoolReportFullName').val();
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters); 
    tblSchoolReport.table().clear();
        
    getGradeReportByFilterTable(tblSchoolReport, objFilters, null, null)
}



tblSchoolReport = $('#schoolReportTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    {
		orderable: false,
		targets:   3,
		render: function (value) {
            if (value === null) {
                return "sem notas";
            }
            else {
                return value;
            }
					
        }
	},
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
    
    ],
    rowId: 'schoolReportID',
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
        // { data: 'shdesc' , title:'Nome'},        
        { data: 'classRoomName',title:'Turma' },
        { data: 'status',title:'Status' },
        { data: 'baseYearID' },
        { data: 'userID' } //hide
    ]
});
    
if (!$("#leftMenuSchoolReportStaff").hasClass("active")) {
    $("#leftMenuSchoolReportStaff").addClass("active").css("background-color", "#98c7f8");
}	
if (!$("#leftMenuClassroom").hasClass("active")) {
    $("#leftMenuClassroom").addClass("active");
}	

$('#schoolReportTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblSchoolReport.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblSchoolReport.row($("#" + tblSchoolReport.table().node().id + " tr.selected")).data().flgLocked);
    if (tblSchoolReport.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            
            let rowsData = tblSchoolReport.rows($("#" + tblSchoolReport.table().node().id + " tr.selected")).data();
            $('.dropdown-item').click(function () { 
                tableActions(tblSchoolReport, this);  
            });

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblSchoolReport.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#schoolReportTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblSchoolReport.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesClassRoom').trigger("click");
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

if ($('#hidClassRoomID').val() != null && $('#hidClassRoomID').val() != "" && $('#hidClassRoomID').val() != "null") {
    $("#classRoomID").val($('#hidClassRoomID').val());		
}

$('.deleteConfirmation').click(function () {
    deleteClassRoom($('.search-button'),objDelete);			
});

$('#schoolReportearch').click();





