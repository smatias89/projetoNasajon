console.log('schoolReportView...'); 

//Initialize Select2 Elements
$('.select2').select2()

//Initialize Select2 Elements
$('.select2bs4').select2({
    theme: 'bootstrap4'
})

//loadCombos
loadComboBaseYearGetAll($('#baseYearID'));


$('#gradebackButton').click(function () {

    location.href = 'schoolReport';

});

if (!$("#leftMenuSchoolReport").hasClass("active")) {
    $("#leftMenuSchoolReport").addClass("active");
}	




//DataTable
tblGradeView = $('#gradeViewTable').DataTable({
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
        targets: [2,0],      
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
        "<'row'<'col-sm-2'><'col-sm-3'><'col-sm-1 text-center divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'>>",       

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
        { data: '', defaultContent: '' },
        { data: 'disciplineName' },
        { data: 'userID' },

        // Bimestre 1
        { data: 'bim1Av1', defaultContent: '' /*,createdCell: function (td, cellData, rowData, row, col) {$(td).addClass('bim1');}*/ },
        { data: 'bim1Av2', defaultContent: '' },
        { data: 'bim1Med', defaultContent: '' },

        // Bimestre 2
        { data: 'bim2Av1', defaultContent: '' },
        { data: 'bim2Av2', defaultContent: '' },
        { data: 'bim2Med', defaultContent: '' },
        { data: 'bim2RecSem1', defaultContent: '' },

        // Bimestre 3
        { data: 'bim3Av1', defaultContent: '' },
        { data: 'bim3Av2', defaultContent: '' },
        { data: 'bim3Med', defaultContent: '' },

        // Bimestre 4
        { data: 'bim4Av1', defaultContent: '' },
        { data: 'bim4Av2', defaultContent: '' },
        { data: 'bim4Med', defaultContent: '' },
        { data: 'bim4RecSem2', defaultContent: '' }, 

        // Média Final, Recuperação, Nota Final
        { data: 'medFinish', defaultContent: '' },
        { data: 'recFinish', defaultContent: '' },
        { data: 'gradeEnd', defaultContent: '' },
        { data: 'status', defaultContent: '' }
    ],

    initComplete: function (settings, json) {  
        $(this).wrap(
            "<div class='tblGradeViewContainerTable' style='overflow:auto; width:100%; position:relative;'></div>"
        );    
    },



});


$('#gradeViewTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblGradeView.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblGradeView.row($("#" + tblGradeView.table().node().id + " tr.selected")).data().flgLocked);
    if (tblGradeView.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        // $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblGradeView.rows($("#" + tblGradeView.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].shdesc;
            $('.dropdown-item').click(function () { 
                tableActions(tblGradeView, this);  
            });
           
        // $('#btnSearchAction').removeClass('disabled btn-default');
        // $('#btnSearchAction').addClass('btn-info');
    } else if (!tblGradeView.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        // $('#btnSearchAction').removeClass('btn-info');
        // $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#gradeViewTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblGradeView.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesDiscipline').trigger("click");
});


/*  &#10247; vertical 3 dots */
// $('.divDropdown').html('<button class="btn btn-xs btn-block btn-default dropdown-toggle disabled" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
//                 'Opções&nbsp;' +
//                 '</button>' +
//                 '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
// '</div>');


// $('#gradeViewTable tbody').click(function (e){
//     console.log('row Selected');
//     var elementClick = $(e.target)
    
//     var table = $('#gradeViewTable').DataTable();
//     var tdOnTable = elementClick.closest('td');
//     var cell = table.cell(tdOnTable);
    
//     var rowIdx = cell.index().row;
//     var colIdx = cell.index().column;
//     tdOnTable.attr('id','cell_'+rowIdx+colIdx);

//     // console.log('cell :>> ', cell);
//     // console.log('rowIdx :>> ', rowIdx);
//     // console.log('colIdx :>> ', colIdx);
    
    

//     if(colIdx <= 1){ 

//         e.preventDefault()
//         // console.log('menor ou igual a 1 <= 1');
//         return;
//     }

//     if (colIdx >= 2) {
//         table.row(rowIdx).select(); // ou .deselect() etc
//         e.preventDefault();
//         // console.log('igual ou maior que 2');

//         // e.preventDefault();

//         var originalValue = cell.data();

//         // Evita colocar input se já estiver em modo edição
//         if ($(tdOnTable).find('input').length === 0) {
//             $(tdOnTable).html(`<input type="text" value="${originalValue}" class="form-control" />`);
//             // console.log(tdOnTable);
            
//             $(tdOnTable).find('input').on('blur', function () {
//                 // console.log('blur...');
//                 var newValue = $(this).val();
//                 cell.data(newValue).draw(); // atualiza no DataTable

//                 if (colIdx === 3 || colIdx === 4) {
//                     var av1 = parseFloat($('#cell_'+rowIdx+'3').text())
//                     var av2 = parseFloat($('#cell_'+rowIdx+'4').text())
//                     var med = ((av1+av2)/2).toFixed(1);
//                     console.log('med : ',med);
//                     isNaN(med) ? med = '': med
                    
//                     table.cell(rowIdx, 5).data(med).draw();

//                 } else if (colIdx === 6 || colIdx === 7) {
//                     var av1 = parseFloat($('#cell_'+rowIdx+'6').text())
//                     var av2 = parseFloat($('#cell_'+rowIdx+'7').text())
//                     var med = ((av1+av2)/2).toFixed(1);
//                     console.log('med : ',med);
//                     isNaN(med) ? med = '': med
//                     table.cell(rowIdx, 8).data(med).draw();

//                 }else if (colIdx === 10 || colIdx === 11) {
//                     var av1 = parseFloat($('#cell_'+rowIdx+'10').text())
//                     var av2 = parseFloat($('#cell_'+rowIdx+'11').text())
//                     var med = ((av1+av2)/2).toFixed(1);
//                     console.log('med : ',med);
//                     isNaN(med) ? med = '': med
//                     table.cell(rowIdx, 12).data(med).draw();

//                 }else if (colIdx === 13 || colIdx === 14) {
//                     var av1 = parseFloat($('#cell_'+rowIdx+'13').text())
//                     var av2 = parseFloat($('#cell_'+rowIdx+'14').text())
//                     var med = ((av1+av2)/2).toFixed(1);
//                     console.log('med : ',med);
//                     isNaN(med) ? med = '': med
//                     table.cell(rowIdx, 15).data(med).draw();
                    
//                 }

                

                
//             });


//             // $(tdOnTable).find('input').on('keydown', function (event) {
//             //     if (event.key === 'Enter') {
//             //         $(this).blur(); // força o blur pra salvar
//             //     }
//             // });
//             $(tdOnTable).find('input').focus();
            
//         }

        

//     }


//     // if(colIdx == '5' || colIdx == '7' || colIdx == '11' || colIdx == '14'){
//     //     console.log('aqui 5,7,11,14');
//     //     console.log('cell_03 :>> ', $('#cell_'+rowIdx+'3').text());
//     //     console.log('cell_04 :>> '+ $('#cell_'+rowIdx+'4').text());
//     //     if(colIdx == '5'){
            
//     //         console.log(tdOnTable);
//     //         console.log('rowIdx: ',rowIdx);
//     //         // console.log(tdOnTable);
//     //         var av1 = parseFloat($('#cell_'+rowIdx+'3').text())
//     //         var av2 = parseFloat($('#cell_'+rowIdx+'4').text())
//     //         var med = ((av1+av2)/2).toFixed(1);
//     //         console.log('med : ',med);
//     //         $('#cell_'+rowIdx+'5').text(med)
            

            
//     //     }
//     // }


// })



if ($("#hidSchoolReportID").val() != null && $("#hidSchoolReportID").val() != "") {
    
    console.log('View ...  ');

    $(".delete-button").hide();
    
    var objFilters = new Object();
    objFilters.studentUserID = $("#hidSchoolReportID").val();
    objFilters.schoolReport = '-1';		
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters);
    tblGradeView.table().clear();
        
    getGradeReportStudentByFilterTable(tblGradeView, objFilters, null, null)

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





  