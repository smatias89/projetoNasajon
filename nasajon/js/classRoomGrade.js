// console.log('classRoomEdit'); 2802

//Initialize Select2 Elements
$('.select2').select2()

$('.select2bs4').select2({
    theme: 'bootstrap4'
})
// img64();

console.log('$(#hidPageFrom).val(); ::',$('#hidPageFrom').val());

//loadCombos
loadComboBaseYearGetAll($('#baseYearID'));
loadComboDisciplineByClassRomm($("#gradeDisciplene"),$("#hidGradeClassRoomID").val())

var classRoomIDParm = $('#hidClassRoomID').val();
var copyParm = $('#hidActionType').val();


$('#classRoombackButton').click(function () {

    location.href = 'classRoom';

});

if (!$("#leftMenuGrade").hasClass("active")) {
    $("#leftMenuGrade").addClass("active");
}	




//DataTable
tblGradeStudent = $('#gradeStudentTable').DataTable({
    select: {
        style: 'single',
    },
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    },
    {
        targets: [2],      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
    }, 
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
    rowId: 'gradeID',
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
        { data: null, defaultContent: '' },
        { data: 'fullName' },
        { data: 'userID' },

        // Bimestre 1
        { data: 'b1Av1', defaultContent: '' /*,createdCell: function (td, cellData, rowData, row, col) {$(td).addClass('bim1');}*/ },
        { data: 'b1Av2', defaultContent: '' },
        { data: 'b1Mdb', defaultContent: '' },

        // Bimestre 2
        { data: 'b2Av1', defaultContent: '' },
        { data: 'b2Av2', defaultContent: '' },
        { data: 'b2Mdb', defaultContent: '' },
        { data: 'b2Rs1', defaultContent: '' },

        // Bimestre 3
        { data: 'b3Av1', defaultContent: '' },
        { data: 'b3Av2', defaultContent: '' },
        { data: 'b3Mdb', defaultContent: '' },

        // Bimestre 4
        { data: 'b4Av1', defaultContent: '' },
        { data: 'b4Av2', defaultContent: '' },
        { data: 'b4Mdb', defaultContent: '' },
        { data: 'b4Rs2', defaultContent: '' }, 

        // Média Final, Recuperação, Nota Final
        { data: 'medF', defaultContent: '' },
        { data: 'recF', defaultContent: '' },
        { data: 'gradeFinish', defaultContent: '' }
    ],
    initComplete: function (settings, json) {  
            // Fix to allow Horizontal Scroll
        $("#gradeStudentTable").wrap("<div class=\"tblGradeStudent\" style='overflow:auto; width:100%;position:relative;'></div>");    
                                    
    },


});
    

$('#gradeStudentTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblGradeStudent.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblGradeStudent.row($("#" + tblGradeStudent.table().node().id + " tr.selected")).data().flgLocked);
    if (tblGradeStudent.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        // $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblGradeStudent.rows($("#" + tblGradeStudent.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].shdesc;
            $('.dropdown-item').click(function () { 
                tableActions(tblGradeStudent, this);  
            });
           
        // $('#btnSearchAction').removeClass('disabled btn-default');
        // $('#btnSearchAction').addClass('btn-info');
    } else if (!tblGradeStudent.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        // $('#btnSearchAction').removeClass('btn-info');
        // $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#gradeStudentTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblGradeStudent.$('tr.selected').removeClass('selected');
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


$('#gradeStudentTable tbody').click(function (e){
    console.log('row Selected');
    var elementClick = $(e.target)
    
    var table = $('#gradeStudentTable').DataTable();
    var tdOnTable = elementClick.closest('td');
    var cell = table.cell(tdOnTable);
    
    var rowIdx = cell.index().row;
    var colIdx = cell.index().column;
    tdOnTable.attr('id','cell_'+rowIdx+colIdx);

    // console.log('cell :>> ', cell);
    // console.log('rowIdx :>> ', rowIdx);
    // console.log('colIdx :>> ', colIdx);
    
    

    if(colIdx <= 1){ 

        e.preventDefault()
        // console.log('menor ou igual a 1 <= 1');
        return;
    }

    if (colIdx >= 2) {
        table.row(rowIdx).select(); // ou .deselect() etc
        e.preventDefault();
        // console.log('igual ou maior que 2');

        // e.preventDefault();

        var originalValue = cell.data();

        // Evita colocar input se já estiver em modo edição
        if ($(tdOnTable).find('input').length === 0) {
            $(tdOnTable).html(`<input type="text" value="${originalValue}" class="form-control" />`);
            // console.log(tdOnTable);
            
            $(tdOnTable).find('input').on('blur', function () {
                // console.log('blur...');
                var newValue = $(this).val();
                cell.data(newValue).draw(); // atualiza no DataTable

                if (colIdx === 3 || colIdx === 4) {
                    var av1 = parseFloat($('#cell_'+rowIdx+'3').text())
                    var av2 = parseFloat($('#cell_'+rowIdx+'4').text())
                    var med = ((av1+av2)/2).toFixed(1);
                    console.log('med : ',med);
                    isNaN(med) ? med = '': med
                    
                    table.cell(rowIdx, 5).data(med).draw();

                } else if (colIdx === 6 || colIdx === 7) {
                    var av1 = parseFloat($('#cell_'+rowIdx+'6').text())
                    var av2 = parseFloat($('#cell_'+rowIdx+'7').text())
                    var med = ((av1+av2)/2).toFixed(1);
                    console.log('med : ',med);
                    isNaN(med) ? med = '': med
                    table.cell(rowIdx, 8).data(med).draw();

                }else if (colIdx === 10 || colIdx === 11) {
                    var av1 = parseFloat($('#cell_'+rowIdx+'10').text())
                    var av2 = parseFloat($('#cell_'+rowIdx+'11').text())
                    var med = ((av1+av2)/2).toFixed(1);
                    console.log('med : ',med);
                    isNaN(med) ? med = '': med
                    table.cell(rowIdx, 12).data(med).draw();

                }else if (colIdx === 13 || colIdx === 14) {
                    var av1 = parseFloat($('#cell_'+rowIdx+'13').text())
                    var av2 = parseFloat($('#cell_'+rowIdx+'14').text())
                    var med = ((av1+av2)/2).toFixed(1);
                    console.log('med : ',med);
                    isNaN(med) ? med = '': med
                    table.cell(rowIdx, 15).data(med).draw();
                    
                }

                

                
            });


            // $(tdOnTable).find('input').on('keydown', function (event) {
            //     if (event.key === 'Enter') {
            //         $(this).blur(); // força o blur pra salvar
            //     }
            // });
            $(tdOnTable).find('input').focus();
            
        }

        

    }


    // if(colIdx == '5' || colIdx == '7' || colIdx == '11' || colIdx == '14'){
    //     console.log('aqui 5,7,11,14');
    //     console.log('cell_03 :>> ', $('#cell_'+rowIdx+'3').text());
    //     console.log('cell_04 :>> '+ $('#cell_'+rowIdx+'4').text());
    //     if(colIdx == '5'){
            
    //         console.log(tdOnTable);
    //         console.log('rowIdx: ',rowIdx);
    //         // console.log(tdOnTable);
    //         var av1 = parseFloat($('#cell_'+rowIdx+'3').text())
    //         var av2 = parseFloat($('#cell_'+rowIdx+'4').text())
    //         var med = ((av1+av2)/2).toFixed(1);
    //         console.log('med : ',med);
    //         $('#cell_'+rowIdx+'5').text(med)
            

            
    //     }
    // }


})



$('#btnToolTableTeacher').click();



if ($("#hidGradeClassRoomID").val() != null && $("#hidGradeClassRoomID").val() != "") {
    
    console.log('search classRoom Grade ... ');

    $(".delete-button").hide();
    var objFilters = new Object();
    objFilters.classRoomID = $("#hidGradeClassRoomID").val();
    objFilters.disciplineID = $("#hidDisciplineID").val();
    objFilters.gradePoint = true
    // objFilters.modifiedDate = $("#hidClassRoomModifiedDate").val();			
    
   getGradeByFilterForm(objFilters,tblGradeStudent);
    // tbm serve mas por padrão deixei o outro
    // getGradeByFilterTable(tblGradeStudent,objFilters)
    $("#divClassRoomID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    
   
} else {

   // console.log('Novo');
   // $('.card-title').text("Nova Turma");
   $("#divClassRoomID").hide();
   $("#divCreatedBy").hide();
   $("#divCreatedDate").hide();
   $("#divModifiedBy").hide();
   $("#divModifiedDate").hide();
   $(".delete-button").hide();

}

if ($("#hidClassRoomID").val() != null && $("#hidClassRoomID").val() != "" && $("#hidActionType").val() == 'copy') {

    // console.log('COPY');
    $('.card-title').text("Copiar Turma");
    $("#divClassRoomID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));
     
} 



$('#gradeSave').click(function (e) { 
    
    var objGrade = new Object();

    // if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidGradeClassRoom").val() != null && $("#hidGradeClassRoom").val() != "")
    //     objGrade.gradeClassRoomID = $("#hidGradeClassRoom").val();
    // else
    //     objGrade.classRoomID = "0";

    // objGrade.gradeClassRoom = $("#gradeClassRoom").val();			
    // objGrade.gradeDisciplene = $("#gradeDisciplene").val();
    // objGrade.userID = ""
    // objGrade.baseYearID = $("#baseYearID").val();

    var lstTblGradeStudent = new Array();
    
    tblGradeStudent.rows( function ( idx, data, node ) {
        
        
        // console.log(data);
        var objGradeStudent = new Object();

        // console.log($("#hidGradeClassRoomID").val());
        // objGradeStudent.gradeClassRoom = $("#gradeClassRoom").val();

        objGradeStudent.gradeClassRoomID = $("#hidGradeClassRoomID").val();
        objGradeStudent.gradeDisciplene = $("#gradeDisciplene").val();
        objGradeStudent.baseYearID = $("#baseYearID").val();
        objGradeStudent.userID = data.userID

        objGradeStudent.b1Av1 = data.b1Av1 == undefined ? '' : data.b1Av1;
        objGradeStudent.b1Av2 = data.b1Av2 == undefined ? '' : data.b1Av2;
        objGradeStudent.b1Mdb = data.b1Mdb == undefined ? '' : data.b1Mdb;

        objGradeStudent.b2Av1 = data.b2Av1 == undefined ? '' : data.b2Av1;
        objGradeStudent.b2Av2 = data.b2Av2 == undefined ? '' : data.b2Av2;
        objGradeStudent.b2Mdb = data.b2Mdb == undefined ? '' : data.b2Mdb;
        objGradeStudent.b2Rs1 = data.b2Rs1 == undefined ? '' : data.b2Rs1;

        objGradeStudent.b3Av1 = data.b3Av1 == undefined ? '' : data.b3Av1;
        objGradeStudent.b3Av2 = data.b3Av2 == undefined ? '' : data.b3Av2;
        objGradeStudent.b3Mdb = data.b3Mdb == undefined ? '' : data.b3Mdb;

        objGradeStudent.b4Av1 = data.b4Av1 == undefined ? '' : data.b4Av1;
        objGradeStudent.b4Av2 = data.b4Av2 == undefined ? '' : data.b4Av2;
        objGradeStudent.b4Mdb = data.b4Mdb == undefined ? '' : data.b4Mdb;
        objGradeStudent.b4Rs2 = data.b4Rs2 == undefined ? '' : data.b4Rs2;

        objGradeStudent.medF = data.medF == undefined ? '' : data.medF;
        objGradeStudent.recF = data.recF == undefined ? '' : data.recF;

        objGradeStudent.gradeFinish = data.gradeFinish //== undefined || data.medF < '6' ? '': data.gradeFinish;

        objGradeStudent.status = data.gradeFinish == undefined || data.gradeFinish == '' || data.gradeFinish == null || data.gradeFinish <= '6' ? 'REPROVADO' : 'APROVADO';
        
        lstTblGradeStudent.push(objGradeStudent);

    });

    objGrade.tblGradeStudentRows = lstTblGradeStudent;
    console.log('objGrade save ...');
    // console.log(objGrade);
    saveGrade(objGrade);


});


