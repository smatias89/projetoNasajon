console.log('student.js');
var objDelete;


//LoaderCombos
loadComboPeriodGetAll($('#studentPeriod'));
loadComboClassRoomGetAll($('#studentClassRoom'));
loadComboSegmentGetAll($('#studentSegment'));

//Masks
$('#studentCPF').mask('999.999.999-99').attr('placeholder','___.___.___-__');


$('.deleteConfirmation').click(function () {
    deleteStudent($('.search-button'));			
});


$('#studentFullName, #studentID, #studentCPF').keypress(function(event) {

    if (event.key === "Enter") {
        searchStudent();	
    }
});

$('#studentFgAtv, #studentClassRoom').change(function (e) { 
    e.preventDefault();
    console.log('change selecte... ');
    searchStudent();
    
});

$('.search-button').click(function () {
    searchStudent();				
});

$('#studentNew').click(function () {
    window.open('studentEdit','_self')		
});

function searchStudent() {
    var objFilters = new Object();
    objFilters.studentID = $("#studentID").val();
    objFilters.studentFullName = $("#studentFullName").val();
    objFilters.fgAtv = $("#studentFgAtv").val();
    objFilters.studentClassRoom = $("#studentClassRoom").val();
    objFilters.studentCPF = $("#studentCPF").val().replace(/[.\-]/g, "");
    objFilters.blnOnlyStudent = true;
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    // console.log(objFilters);
    getStudentByFilterTable(tblStudentSearch, objFilters, null, null);	
    tblStudentSearch.table().clear();
    return
        
}


$('#studentBackButton').click(function () {

    location.href = 'index'

});

tblStudentSearch = $('#studentTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    {
        orderable: true,
        targets:   [3],
        render: function (data) {
            // console.log(data)
            return maskCPF(data);
        }
    },
    {
        orderable: true,
        targets:   5,
        render: function (data) {
            // console.log(data[0]?.shdesc);
            return (data[0]?.shdesc == undefined?'Sem Turma edt':data[0].shdesc);
        }
    },
    // {
    //     orderable: true,
    //     targets:   6,
    //     render: function (data) {
    //         // console.log(data[0]?.classRoomPeriod);
    //         return (data[0]?.classRoomPeriod == undefined?'Sem Turno edt':data[0].shdesc);
    //     }
    // },

    // {
	// 	orderable: false,
	// 	targets:   7,
	// 	render: function (data) {
    //         // console.log(data)
    //         return maskCPF(data);
    //     }
	// },
    ],
    rowId: 'studentID',
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
    order: [[ 1, 'asc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: ''},			
        { data: 'studentID' ,title:'ID'},      
        { data: 'fullName' ,title:'Nome'},
        { data: 'studentCPF', title:'cpf' },      
        { data: 'fgAtv' ,title:'Ativo'},
        { data: 'lstClassRoom' ,title:'Turma'}
        // { data: 'registrationDate',title:'Data Matrícula',width: '85px' },      
        // { data: 'modifiedDate', title:'Modificado' } 
    ]
});
    
if (!$("#leftMenuStudent").hasClass("active")) {
    $("#leftMenuStudent").addClass("active");
}



$('#studentTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblStudentSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblStudentSearch.row($("#" + tblStudentSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblStudentSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblStudentSearch.rows($("#" + tblStudentSearch.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].fullName;
            
            $('#showModificationHistoryStudent').click(function () { 
                tableActions(tblStudentSearch, this); 
                
            }); 
            $('#deleteStudent').click(function () { 
                console.log('aqui');
                tableActions(tblStudentSearch, this); 
                
            }); 
            $('#copytudent').click(function () { 
                tableActions(tblStudentSearch, this); 
                
            }); 
            $('#propertiesStudent').click(function () { 
                tableActions(tblStudentSearch, this); 
                
            }); 
            $('#infoStudent').click(function () { 
                tableActions(tblStudentSearch, this); 
                var objFilters = new Object();
                objFilters.studentID = rowsData[0].studentID;
                getStudentByFilterTable(tblStudentInfo, objFilters , null, null);	
            }); 

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblStudentSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#studentTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblStudentSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesUser').trigger("click");
});


/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-xs btn-block btn-default dropdown-toggle disabled" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    'Actions&nbsp;' +
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

if ($('#hidStudentID').val() != null && $('#hidStudentID').val() != "" && $('#hidStudentID').val() != "null") {
    $("#studentID").val($('#hidStudentID').val());		
}

$('#studentSearch').click();

tblStudentInfo = $('#studentTableInfo').DataTable({
    columnDefs: [ 
        {
        
            orderable: false,
            destroy: true, 
            autoWidth: false,
            // className: 'select-checkbox',
            // targets:   0,
            // data: null
        }, 
        {
            orderable: true,
            targets:   3,
            render: function (data) {
                // console.log(data)
                return maskCPF(data);
                
            }
        },
        {
            orderable: true,
            targets:   4,
            render: function (value) {
                if (value === null) return "";
                return moment(value).format(TO_PATTERN_DATE);
            }
        },
        {
            orderable: false,
            targets:   5,
            render: function (data) {
                // console.log(data)
                return data[0].shdesc;
            }
        },
        {
            orderable: false,
            targets:   6,
            render: function (data) {
                // console.log(data)
                return data[0].classRoomPeriod;
            }
        },
        {
            orderable: false,
            targets:   7,
            render: function (data) {
                // console.log(data);
                return data.fullName;
            }
        },
        {
            orderable: false,
            targets:   [8,10],
            render: function (data) {
                // console.log(data)
                return maskCPF(data.cpf);
            }
        },
        {
            orderable: false,
            targets:   9,
            render: function (data) {
                // console.log(data);
                return data.fullName;
            }
        },
        // {
        //     orderable: false,
        //     targets:   10,
        //     render: function (data) {
        //         // console.log(data)
        //         return maskCPF(data.cpf);
        //     }
        // },
    
    ],
    rowId: 'studentID',
    dom: 
        "<'row'<'col-sm-2'B><'col-sm-3'><'col-sm-1 text-center divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'><'col-sm-7'>>",       
    // dom: 'B',
    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        'copy',
        // {
        //     extend: 'csvHtml5',
        //     title: 'BIP_Export_Table'
        // },
        {
            extend: 'excelHtml5',
            // title: 'BIP_Export_Table'
            title: function() {
                var data = tblStudentInfo.rows().data(); 
                if (data.length > 0) {
                    return 'Aluno_' + data[0].fullName+"_"+data[0].lstClassRoom[0].shdesc;
                } else {
                    return 'Lista de Estudantes';
                }
            },
        },
        {
            extend: 'pdfHtml5',
            text: 'PDF',
            title: function() {
                var data = tblStudentInfo.rows().data(); 
                if (data.length == 1) {
                    return 'Aluno: ' + data[0].fullName+" - Turma: "+data[0].lstClassRoom[0].shdesc;
                } else {
                    return 'Lista de Estudantes';
                }
            },
            orientation: 'landscape', // 'portrait' - A4 em pé ou 'landscape' - A4 deitado
            pageSize: 'A4',
            customize: function (doc) {
                doc.styles.title = {// stylo do doc
                    fontSize: 12,
                    bold: true,
                    alignment: 'left'
                };
                doc.defaultStyle.fontSize = 10;
                doc.pageMargins = [40, 60, 40, 40]; // left, top, right, bottom
                doc.header = function() { //stylo header
                    return {
                        text: 'Relatório de Alunos - 2025',
                        margin: [0, 25, 0, 0],
                        alignment: 'center',
                        fontSize: 12,
                        bold: true
                    };
                };
                doc.footer = function(currentPage, pageCount, doc) { //stylo footer
                    return [
                        { text: `© Copyright ViperZero 2025 All Rights Reserved.`, alignment: 'center', fontSize: 8 },
                        { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center', fontSize: 8 }
                    ];
                };
            }
        },
    ],
    order: [[ 1, 'asc' ]],
    iDisplayLength: 25,		
    responsive: true,
    // scrollX: true,
    // scrollCollapse: true,
    columns: [
        // {
        //     className: 'details-control',
        //     orderable: false,
        //     "orderable": false,
        //     "data": null,
        //     "defaultContent": '',					
        // },
        { data: null, defaultContent: ''},			
        { data: 'studentID' ,title:'ID',width: '30px'},      
        { data: 'fullName' ,title:'Aluno',width: '80px'},
        { data: 'studentCPF', title:'CPF',width: '80px' },
        { data: 'registrationDate',title:'Data Matrícula',width: '85px' },      
        { data: 'lstClassRoom' ,title:'Turma',width: '40px'},      
        { data: 'lstClassRoom', title:'Turno' },      
        { data: 'lstFatherData' ,title:'Pai',width: '80px'},
        { data: 'lstFatherData',title:'Pai CPF',width: '80px' },
        { data: 'lstMotherData',title:'Mãe',width: '80px' },
        { data: 'lstMotherData',title:'Mãe CPF',width: '80px' },
        { data: 'schollCar',title:'Mãe',width: '80px' },
        { data: 'pcd' ,title:'ID',width: '30px'}    
    ]
});

