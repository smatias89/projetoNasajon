// console.log('teacher.js');
//loader combos
loadComboDisciplineGetAll($("#teacherDiscipline"));

//Mask
$('[id*="CPF"]').mask('999.999.999-99').attr('placeholder','___.___.___-__');

var objDelete;

$('.deleteConfirmation').click(function () {
    deleteTeacher($('.search-button'),objDelete);		
    
});

$('#teacherID,#teacherFullName,#teacherCPF').keypress(function(event) {

    if (event.key === "Enter") {
        searchTeacher();	
    }
});

$('#teacherDiscipline, #teacherFgAtv').change(function (e) { 
    e.preventDefault();
    console.log('change selecte... ');
    $('#teacherSearch').click();
    
});

$('.search-button').click(function () {
    searchTeacher();				
});

$('#teacherNew').click(function () {
    window.open('teacherEdit','_self')		
});

function searchTeacher() {
    var objFilters = new Object();
    objFilters.teacherID = $("#teacherID").val();
    objFilters.teacherFullName = $("#teacherFullName").val();		
    objFilters.fgAtv = $("#teacherFgAtv").val();
    objFilters.teacherCPF = $('#teacherCPF').val().replace(/[.\-]/g, "");		
    objFilters.teacherDiscipline = $('#teacherDiscipline').val();	
    objFilters.blnAdress = 'false';			
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    tblTeacherSearch.table().clear();

    getTeacherByFilterTable(tblTeacherSearch, objFilters, null, null);	
        
}

// $('.new-button').click(function () {

//     let strURL = "/userEdit";
//     let strTabID = "user-new";
//     let strTabTitle = "User - New";
//     openNewTab(strURL, strTabID, strTabTitle);

// });

$('#teacherBackButton').click(function () {

    history.back();

});

tblTeacherSearch = $('#teacherTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    {
        
        // targets: '_all',  
        // createdCell: function(td, cellData, rowData, row, col) {
        //     // console.log(td,' <-td ', cellData,' <-cellData ', rowData,' <-rowData ', row, ' <-row ', col, ' <-col');
        //     $(td).css({
        //         'vertical-align': 'middle', 
        //     });
           
        // }
    },
    {
		orderable: false,
		targets:   3,
        render: function(data, type, row) {
            // console.log(data);
            return maskCPF(data)
        }
	},
    {
		orderable: false,
		targets:   5,
        render: function(data, type, row) {
            // console.log(data);
            // console.log(row);
            if (data) {
                return data.map(function(element) {
                    // console.log(element);
                    return element.shdesc;  // Retorna o valor de 'shdesc' do obj
                }).join(', ');              // Junta os valores em uma string, separados por vírgula
            }
            return data;  // Caso não seja um array, retorna o valor normal
        }
	}
    // {
    // orderable: true,
    // targets:   6,
    // render: function (value) {
    //                 if (value === null) return "";
    //             return moment(value).format(TO_PATTERN_DATETIME);
    //         }
    // } 
    ],
    rowId: 'teacherID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        // {
            //     extend: 'csvHtml5',
            //     title: 'BIP_Export_Table'
            // },
        'copy',
        {
            extend: 'excelHtml5',
            title: 'BIP_Export_Table'
        }
    ],
    order: [[ 1, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: '', width:'10px'},			
        { data: 'teacherID',title:'ID', width:'45px'},
        { data: 'fullName',width:'220px' /*createdCell: function(td){$(td).css({'vertical-align': 'middle'})}*/},        
        { data: 'teacherCPF', title:'CPF' },
        { data: 'graduation',width:'57px' },
        { data: 'lstDiscipline',width:'150px' },
        { data: 'fgAtv', width:'28px'},
        { data: 'modifiedDate',width:'120px' }
    ]
});
    
if (!$("#leftMenuTeacher").hasClass("active")) {
    $("#leftMenuTeacher").addClass("active");
}

$('#teacherTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblTeacherSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblTeacherSearch.row($("#" + tblTeacherSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblTeacherSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblTeacherSearch.rows($("#" + tblTeacherSearch.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].fullName;
            $('.dropdown-item').click(function () { 

                tableActions(tblTeacherSearch, this);  
            });

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblTeacherSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#teacherTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblTeacherSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesTeacher').trigger("click");
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

// var userIDParm = '<%=request.getParameter("userID")%>'
    // console.log('User Id -> ' + $('#hidUserID').val());

if ($('#hidTeacherID').val() != null && $('#hidTeacherID').val() != "" && $('#hidTeacherID').val() != "null") {
    $("#teacherID").val($('#hidTeacherID').val());		
}


// $('.search-button').click();


tblTeacherInfoTime = $('#teacherTableInfoTime').DataTable({
    columnDefs: [ {
        orderable: true,
        // className: 'select-checkbox',
        // targets:   0,
        // data: null
    }, 

    ],
    rowId: 'teacherTimeID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        // {
            //     extend: 'csvHtml5',
            //     title: 'BIP_Export_Table: Tempos'
            // },
        'copy',
        {
            extend: 'pdfHtml5',
            text: 'PDF',
            
            title: function() {
                
                return $('#modalTitleTeacherTime').text() // antes 'Calendário Semanal Turma: '+$('#classRoomNumber').val();
                
            },
            orientation: 'landscape', // 'portrait' - A4 em pé ou 'landscape' - A4 deitado
            pageSize: 'A4',
            customize: function (doc) {
                doc.styles.title = {
                    fontSize: 12,
                    bold: true,
                    alignment: 'left'
                };
                doc.defaultStyle.fontSize = 10;
                doc.pageMargins = [40, 60, 40, 40]; // left, top, right, bottom
                // centralizar tbl
                doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');

                // edt a altura das linhas e espessura das bordas
                var tableBody = doc.content[1].table.body;//pega atbl do documanto
                //loop duplo para pegar coluna e linha
                // i -> linha
                //j -> colluna
                for (var i = 0; i < tableBody.length; i++) {
                    for (var j = 0; j < tableBody[i].length; j++) {
                        // console.log('object i: ',i);
                        if(i == 0){
                            // console.log('row 0');
                            tableBody[i][j].alignment = 'center'; //alinhamento
                            tableBody[i][j].margin = [5, 10, 5, 10]; // espaçamento interno (top, right, bottom, left)
                            tableBody[i][j].border = [true, true, true, true]; // garante todas as bordas
                            tableBody[i][j].borderWidth = 2.5; // borda mais grossa
                            tableBody[i][j].borderColor = 'black';
                            tableBody[i][j].fillColor = '#1baac1'; // cor azul
                            tableBody[i][j].color = 'black'; //fonte
                        }else{
                            // console.log('row > 0');
                            tableBody[i][j].alignment = 'left'; //alinhamento
                            tableBody[i][j].margin = [5, 10, 5, 10]; // espaçamento interno (top, right, bottom, left)
                            tableBody[i][j].border = [true, true, true, true]; // garante todas as bordas
                            tableBody[i][j].borderWidth = 1.5; // borda mais grossa
                            tableBody[i][j].borderColor = 'black';
                        }
                        
                    }
                }
                doc.content[1].layout = {
                    hLineWidth: function(i, node) {
                        return 0.5;
                    },
                    vLineWidth: function(i, node) {
                        return 0.5;
                    },
                    hLineColor: function(i, node) {
                        return 'black';
                    },
                    vLineColor: function(i, node) {
                        return 'black';
                    }
                };
                doc.header = function() {
                    return {
                        text: 'BIP_Export_Table - Total de Tempos',
                        margin: [0, 25, 0, 0],
                        alignment: 'center',
                        fontSize: 12,
                        bold: true
                    };
                };
                doc.footer = function(currentPage, pageCount) {
                    return [
                        { text: `© Copyright ViperZero 2025 All Rights Reserved.`, alignment: 'center', fontSize: 8, font: 'Roboto' },
                        { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center', fontSize: 8, font: 'Roboto' }
                    ];
                };
            }
            
        },
        {
            extend: 'excelHtml5',
            title: function () {
                return 'BIP_Export_Table - Prof: ' + $('#modalTitleTeacherTime').text();
            }
        }
    ],
    order: [[ 1, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        // { data: null, defaultContent: '', width:'10px'},			
        { data: 'classRoomName',title:'Turma(s)', width:'45px'},
        { data: 'fullName',title:'Professor(a)' /*createdCell: function(td){$(td).css({'vertical-align': 'middle'})}*/},        
        { data: 'shdesc', title:'Disciplina(s)' },
        { data: 'teacherTime', title:'Tempos' }
    ]
});

$('#teacherTotalTime').click(function (e) { 
    // var totalTempos = tblTeacherInfoTime.columns().data() //pega todas as colunas
    var columnTimesTable= tblTeacherInfoTime.column(3, { search: 'applied' }).data().toArray() //pega uma coluna e coloca no array

    var totalTimesTechar = columnTimesTable.reduce(function(add, valAtual) {
        return add + parseFloat(valAtual);
    }, 0);

    console.log('Total de tempos:', columnTimesTable);
    console.log('totalTimesTechar:', totalTimesTechar);

    var table = $('#teacherTableInfoTime').DataTable();
    var data = [{
        classRoomName:'<b>' + ' - - ' + '</b>',
        fullName:'<b>' + ' - - ' + '</b>',
        shdesc:'<b>' + 'TOTAL DE TEMPOS' + '</b>',
        teacherTime:'<b>' + totalTimesTechar + '</b>'
    }];
    table.rows.add(data).draw();
    $('#teacherTotalTime').hide();

    console.log($('#modalTitleTeacherTime').html());
    console.log($('#modalTitleTeacherTime').text());


    
});

$('#teacherSearch').click();
