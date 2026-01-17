// console.log('class.js');2802
loadComboSegmentGetAll($('#classRoomSegment'));

var objDelete;

$('#classRoomSegment, #classRoomNumber,#classRoomID,#classRoomFgAtv').keypress(function(event) {

    if (event.key === "Enter") {
        searchClassRoom();	
    }
});

$('.search-button').click(function (e) { 
    searchClassRoom()
});

$('#classRoomSegment, #classRoomFgAtv').change(function (e) { 
    e.preventDefault();
    console.log('change selecte... ');
    searchClassRoom()
    return
    
});

$('.back-button').click(function (e) { 
    location.href = 'index';
    
});

$('.new-button').click(function (e) { 
    location.href = 'classRoomEdit';
    
});

function searchClassRoom() {
    var objFilters = new Object();
    objFilters.classRoomID = $("#classRoomID").val();
    objFilters.shdesc = $("#classRoomNumber").val();		
    objFilters.classSegment = $("#classRoomSegment").val();		
    objFilters.fgAtv = $("#classRoomFgAtv").val();	
    objFilters.blnOnlyClassRoom = true;	//tem que passar dem ''
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters);
    tblClassSearch.table().clear();
        
    getClassByFilterTable(tblClassSearch, objFilters, null, null);	
}



tblClassSearch = $('#classTable').DataTable({
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
		targets:   5,
		render: function (data) {
            // console.log(data);
            var arrayDate = controlBaseYear()
            // console.log(arrayDate);
            return arrayDate[data-1]
        }
	},
    // {
	// 	orderable: false,
	// 	targets:   3,
	// 	render: function (data) {
    //         // console.log('data.classRoomSegmentID: ',data.classRoomSegmentID)
    //         var idFillter = data.classRoomSegment ;
    //         var endRender;
    //         // console.log("idFillter: " + idFillter);

    //         data.lstSegment.find(function(parm) {
    //             // console.log(parm.segmentID);
    //             if(parm.segmentID == idFillter){

    //                 endRender = parm.shdesc;
    //                 // console.log("endRender: " + endRender);
    //             }
                
    //         });
    //         // console.log(obj.shdesc);
    //         // return obj.shdesc;
    //         return endRender;
	// 	}
	// },
    // {
	// 	orderable: false,
	// 	targets:   4,
	// 	render: function (data) {
    //         // console.log(data);
    //         var idFillter = data.classRoomPeriod ;
    //         var endRender;
    //         data.lstPeriod.find(function(parm) {
    //             parm.periodeID == idFillter ? endRender = parm.shdesc:'ERROR'
    //         });
    //         return endRender;
	// 	}
	// }, 
    ],
    rowId: 'classRoomID',
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
        { data: 'classRoomSegment' },
        { data: 'classRoomPeriod' },
        { data: 'baseYearID' }
    ]
});
    
if (!$("#leftMenuClassroom").hasClass("active")) {
    $("#leftMenuClassroom").addClass("active");
    
}
if (!$("#leftMenuClassroomSub").hasClass("active")) {
    $("#leftMenuClassroomSub").addClass("active").css("background-color", "#98c7f8");;
    
}
// $('#leftMenuClassroomBlock').click();


$('#classTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblClassSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblClassSearch.row($("#" + tblClassSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblClassSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            // $("#showModificationHistoryClass").on( "click", function(event) {
            //     tableActions(tblClassSearch, this)        
            // });
            let rowsData = tblClassSearch.rows($("#" + tblClassSearch.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].shdesc;
            $('.dropdown-item').click(function () { 
                tableActions(tblClassSearch, this);  
            });

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblClassSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#classTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblClassSearch.$('tr.selected').removeClass('selected');
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

$('#confirmeGrade').click(function (e) { 
    console.log('clicado');
    var classRoomID = $('#classRoomDisciplineGrade option:selected').data('class');
    var disciplineID = $('#classRoomDisciplineGrade').val();

    console.log(classRoomID,disciplineID);
    location.href = "classRoomGrade?gradeClassRoomID=" + classRoomID +"&disciplineID="+disciplineID;
});

$('#classSearch').click();

