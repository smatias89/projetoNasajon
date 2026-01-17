// console.log('classRoomEdit: ',$('#hidCount').val()); 

//Initialize Select2 Elements
$('.select2').select2()

//Initialize Select2 Elements
$('.select2bs4').select2({
    theme: 'bootstrap4'
})
img64();
// $('#buildClassRoom').hide();

var filterRuleDisciplineIDValidation;
$('#tableSimulate').hide();

//loadCombos
loadComboBaseYearGetAll($('#baseYearID'));
loadComboSegmentGetAll($('#classRoomSegment'), null);
loadComboPeriodGetAll($('#classRoomPeriod'));
loadComboDisciplineGetAll($('#addTeacherDiscipline'));
loadComboClassRoomGetAll($('#classRoomAddStudent'))
loadComboBaseYearGetAll($('#classRoomBaseYearID'))

var classRoomIDParm = $('#hidClassRoomID').val();
var copyParm = $('#hidActionType').val();

// console.log('classRoomIDParm >> ',classRoomIDParm,' copyParm >> ',copyParm);

$('#classRoombackButton').click(function () {

    location.href = 'classRoom';

});

if (!$("#leftMenuClassroom").hasClass("active")) {
    $("#leftMenuClassroom").addClass("active");
}	
if (!$("#leftMenuClassroomSub").hasClass("active")) {
    $("#leftMenuClassroomSub").addClass("active").css("background-color", "#98c7f8");;
}	

if ($("#hidClassRoomID").val() != null && $("#hidClassRoomID").val() != "") {
    
    // console.log('Propriedades ');

    $(".delete-button").hide();
    var objFilters = new Object();
    objFilters.classRoomID = $("#hidClassRoomID").val();
    objFilters.modifiedDate = $("#hidClassRoomModifiedDate").val();			
    getClassRoomByFilterForm(objFilters);
   
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


/**
 * @description Pag Principal
 * @name Table Adicionar Professores da turma
 */


$('#cardTitletableTeacher').text('Adicionar Disciplinas');

var divSearchActionOptionsTeacher =

' <a class="dropdown-item" href="#" id="addDisciplineTable"><i class="fas fa-user-plus mr-1"></i> Adicionar Disciplina </a>'
/*<% } else out.println("''"); %>*/ +
' <a class="dropdown-item" href="#" id="removeTeacherTable"><i class="fas fa-trash-alt mr-1"></i> Remover Disciplina </a>'
/*<% } else out.println("''"); %>*/ +

' <a class="dropdown-item" href="#" id="propertiesTeacherTable"><i class="fas fa-tools mr-1"></i> Editar Disciplina </a>';



tblClassTableTeacher = $('#classTableTeacher').DataTable({ //Adicionar Disciplinas 
    select: {
        style: 'single'
    },
    columnDefs: [ 
        {
            orderable: false,
            className: 'select-checkbox',
            targets:   0,
            data: null
        }, 
        {
            orderable: false,
            targets:   1,
            render: function (data) {

                // console.log(data);
                if(data.tableTeacherDiscipline){ //soucer classRoomDAO.js
                    return data.tableTeacherDiscipline
                }

                if(!data.lstDiscipline){ //only discipline
                    // console.log('final id discipline');
                    return data.filterRuleDisciplineID
                }
                var disciplineID;

                data.lstDiscipline.filter(function(element) {	
            
                    // console.log(element);
                    if(element.disciplineID == data.filterRuleDisciplineID){
                        // console.log(element.disciplineID);
                        disciplineID = element.disciplineID
                    }
                });

                return disciplineID
            }
        },
        {
            orderable: false,
            targets:   2,
            render: function (data) {
                
                var discipline;

                if(!data.lstDiscipline){ //only discipline
                    // console.log('final discipline');
                    return data.shdesc

                }

                data.lstDiscipline.filter(function(element) {	
            
                    // console.log(element);
                    if(element.disciplineID == data.filterRuleDisciplineID){
                        // console.log(element.shdesc);
                        discipline = element.shdesc
                    }
                });

                return discipline
            }
        },
        {
            orderable: false,
            targets:   [3,4],
            render: function (data) {
                
                // console.log(data);
                if(!data){

                    return '-';

                }else{

                    if(data == '-1'){
                        
                        return '-';

                    }else{

                        return data
                    }
                }

                 
            }
        },
    ],
    rowId: 'classRoomTableTacherID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdownTeacher btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
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
        { data: null,title:'Disc ID' },
        { data: null,title:'Disc Nome' },	
        { data: 'teacherID',title:'Prof ID' },
        { data: 'fullName',title:'Prof Nome' }
    ]
});
    



$('.divDropdownTeacher').html('<button class="btn btn-info new-button dropdown-toggle" type="button" id="addTeacher" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    'Opções&nbsp;' +
    '</button>' +
    '<div class="dropdown-menu text-xs" aria-labelledby="addTeacher" id="divSearchActionOptionsTeacher">' +							 					  
'</div>');


$('#addTeacher').click(function (e) { 

    $('#divSearchActionOptionsTeacher').html(divSearchActionOptionsTeacher);
    $('#removeTeacherTable,#propertiesTeacherTable').hide();

    var tblClassTableTeacher = $('#classTableTeacher').DataTable();
    var rowSelected = tblClassTableTeacher.rows('.selected').count();
    
    if(rowSelected > 0){
        $('#removeTeacherTable').show();
        $('#propertiesTeacherTable').show();
        $('#addDisciplineTable').hide();
    }

    $('#addDisciplineTable').click(function (e) { 
        
        console.log('add discipline ');
        $('#addTeacherDiscipline').val('');
        $('#modalAddTeacherSelect').empty()
    
        if($('#modalAddTeacherSelect').hasClass('is-valid')){
            // console.log('dentro',$(this));
            $('#modalAddTeacherSelect').removeClass('is-valid');
        }
        
        $('#addRowsTableTeacher').show();
        $('#modalAddTeacher').modal('show');
        e.preventDefault();
        
    });

    $('#removeTeacherTable').click(function (e) { 

        let rowsData = tblClassTableTeacher.rows($("#" + tblClassTableTeacher.table().node().id + " tr.selected")).data();
        filterRuleDisciplineIDValidation = rowsData[0].filterRuleDisciplineID
        // console.log(rowsData[0]);
        console.log('filterRuleDisciplineIDValidation: ',filterRuleDisciplineIDValidation);
        tableActions(tblClassTableTeacher, this);  
        e.preventDefault()
        
    });

    $('#propertiesTeacherTable').click(function (e) { // levo para propertiesTeacher
        
        var objAction = {}
        objAction.id = 'propertiesDiscipline'
        tableActions(tblClassTableTeacher, objAction);  
        
    });

    e.preventDefault();
    
});

/**
 * @description Modal Adicionar Professores
 */



$('#addTeacherDiscipline').click(function (e) { 

    $('#modalAddTeacherSelect').empty();
    if($('#modalAddTeacherSelect').hasClass('is-valid')){
        // console.log('dentro',$(this));
        $('#modalAddTeacherSelect').removeClass('is-valid');
    }
    e.preventDefault();
    return;
    
});

$('#btnSearchDiscipline').click(function (e) { 
    console.log('Load event');
    $('#addRowsTableTeacher').hide();

    if(!$('#addTeacherDiscipline').val()){

        toastr.warning('Informação Incompleta, verifique se o campo está selecionado','Disiciplina');
        $('#addTeacherDiscipline').focus();
        if($('#modalAddTeacherSelect').hasClass('is-valid')){
            // console.log('dentro',$(this));
            $('#modalAddTeacherSelect').removeClass('is-valid');
        }
        e.preventDefault();
        return;

    }
    

    var disciplineSearch = new Object()

    disciplineSearch.teacherDiscipline = $('#addTeacherDiscipline').val();
    disciplineSearch.blnAdress = 'false';

    getModalTeacherByFilterForm(disciplineSearch,$('#modalAddTeacherSelect'))
    
});

function insertClassTableTeacher(){
    var table = $('#classTableWeekCalendar').DataTable();
    var rowCount = table.rows().count();
    console.log('insertClassTableTeacher');
    if(rowCount > 0){
        
        var table = $('#classTableTeacher').DataTable();

        var dataTblArray = table.rows().data().toArray();
        var allValuesLst = [];
        dataTblArray.forEach(function(row) {
    
            allValuesLst.push(row.filterRuleDisciplineID);
    
        });
        // console.log(allValuesLst);
        loadComboDisciplineGetAllFilterSelect(null,allValuesLst);
    }
}

$('#modalAddTeacherSelect').change(function (e) { 
    console.log('Change event'); 


    if(!$('#addTeacherDiscipline').val()){
        toastr.warning('Informação Incompleta, verifique Disiciplina','Disiciplina')
        $('#addTeacherDiscipline').focus();
        e.preventDefault()
        return
    }
    var objFilterElement = {}
    objFilterElement.teacherID = $('#modalAddTeacherSelect').val();
    objFilterElement.teacherDiscipline = $('#addTeacherDiscipline').val();
    // console.log(objFilterElement);

    getTeacherEventChangeByFilterTable(tblClassTableTeacher,objFilterElement) //tblClassTableTeacher
    
});

// add em table hide valida e insere


$("#addRowsTableTeacher").click(function (e) { 
    console.log('addRowsTableTeacher');
    
    // var tblSourceSimulate = $('#classTableTeacherSimulate').DataTable();
    // var tblDestine = $('#classTableTeacher').DataTable();

    // var data = tblSourceSimulate.rows().data().toArray();
    // var dataDest = tblDestine.rows().data().toArray();

    let blnDuplicate = false;

    console.log('not define teacher');
    var disciplineID = $('#addTeacherDiscipline').val();
    var disciplineText = $('#addTeacherDiscipline option:selected').text();
    // console.log('somente id: ',disciplineID); 
    // console.log('somente text: ',disciplineText);
    
    if($('#modalAddTeacherSelect').hasClass('is-valid') && !$('#modalAddTeacherSelect').val()){
        console.log('not teacher');
        toastr.warning('Selecione um Professor','Adicionar Professores');
        $('#modalAddTeacherSelect').focus();
        e.preventDefault();
        return
    }

    // tblClassTableTeacherSimulate.clear().draw();

    var objTmp = {
        filterRuleDisciplineID: disciplineID,
        shdesc: disciplineText,
    }
    if(!objTmp.filterRuleDisciplineID){
        console.log('not teacher');
        toastr.warning('Selecione uma Disciplina','Disciplina');
        $('addTeacherDiscipline').focus();
        e.preventDefault();
        return
    }
    var data = []
    data.push(objTmp);
    
    var dataArrayDestiny = tblClassTableTeacher.rows().data().toArray();
    // console.log(dataArrayDestiny);

    outerLoop: //Forma interessante para sair do loop pois o return não estava funcionando
    for (let i = 0; i < dataArrayDestiny.length; i++) {
        const element = dataArrayDestiny[i];
        console.log('inser discipline and teacher');
        // console.log('element: ',element);
        if(objTmp.filterRuleDisciplineID == dataArrayDestiny[i].filterRuleDisciplineID ){
            console.log('igual');
            toastr.warning('Não é possível adicionar a disciplina.','Disciplina Duplicada');
            console.log('alert duplicated');
            $('#modalAddTeacher').attr('aria-hidden', 'false');
            $('#modalAddTeacher').modal('hide');
            blnDuplicate = true;
            break outerLoop;
        }
    }

    if (!blnDuplicate) {
        // $('#modalAddTeacher').attr('aria-hidden', 'false');
        tblClassTableTeacher.rows.add(data).draw();

        insertClassTableTeacher()
        
        $('#modalAddTeacher').modal('hide');
    
    }

    return

    outerLoop: //Forma interessante para sair do loop pois o return não estava funcionando
    for (let j = 0; j < data.length; j++) {
        const sourceItem = data[j];
        console.log(sourceItem);

        for (let i = 0; i < dataDest.length; i++) {
            const destineItem = dataDest[i];
            console.log(destineItem);

            if (destineItem.filterRuleDisciplineID === sourceItem.filterRuleDisciplineID) {
                toastr.warning('Não é possível adicionar o professor ' + sourceItem.fullName + ', pois a disciplina dele já foi cadastrada.','Disciplina Duplicada');
                console.log('alert duplicated');
                $('#modalAddTeacher').attr('aria-hidden', 'false');
                $('#modalAddTeacher').modal('hide');
                blnDuplicate = true;
                break outerLoop;
            }
        }

        // add element case not duplication
        tblDestine.row.add(sourceItem).draw();
    }

    if($('#modalAddTeacherSelect').hasClass('is-valid') && !$('#modalAddTeacherSelect').val()){
        console.log('not teacher');
        toastr.warning('Selecione um Professor');
        $('#modalAddTeacherSelect').focus();
        e.preventDefault();
        return
    }
    
    

    if (!blnDuplicate) {
        // $('#modalAddTeacher').attr('aria-hidden', 'false');
        $('#modalAddTeacher').modal('hide');

        
    }

});





/**
 * @description Pag Principal
 * @name Módulo: Adicionar Alunos da turma
 * @alias Title: Adicionar Alunos da turma
 */

$('#cardTitletableStudent').text('Adicionar Alunos da turma');


divSearchActionOptionsParmStudent = 
				 
// ' <a class="dropdown-item" href="#" id="copyClassRoom"><i class="fas fa-copy mr-1"></i> Copiar </a>'+
' <a class="dropdown-item" href="#" id="addClassRoomStudent"><i class="fas fa-user-plus mr-1"></i> Adicionar Aluno </a>'+
' <a class="dropdown-item" href="#" id="deleteClassRoomOnlyStudent"><i class="fas fa-eraser mr-1"></i> Remover Aluno </a>'+
' <a class="dropdown-item" href="#" id="deleteClassRoomSelectedStudent"><i class="fas fa-trash-alt mr-1"></i> Remover Seleção </a>'+
/*<% if (lstProfilePermission.stream().filter(c -> c.getPermissionShdesc().equals("DELETE_LOGIN")).findAny().orElse(null) != null) { %>*/
' <a class="dropdown-item" href="#" id="deleteClassRoomTableStudent"><i class="fas fa-exclamation-triangle"></i> Apagar Todos </a>'


/*<% if (lstProfilePermission.stream().filter(c -> c.getPermissionShdesc().equals("SAVE_LOGIN")).findAny().orElse(null) != null) { %>*/

/*<% } else out.println("''"); %>*/ 

/**
 * @description Pag Principal
 * @name Table Adicionar Alunos da turma
 */


tblClassTableStudent = $('#classTableStudent').DataTable({ //Principal 'Adicionar Alunos da turma'

    select :{
        style: 'multi'
    },
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    {
        targets: [3],      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
    },
    ],
    rowId: 'classRoomID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdownStudent btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
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
        { data: 'studentID' },//'studentID'
        { data: 'fullName' } ,   
        { data: 'userID' }    
    ]
});
    



/*  &#10247; vertical 3 dots */
$('.divDropdownStudent').html(
    '<button class="btn btn-info new-button dropdown-toggle " type="button" id="btnSearchActionStudent" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchActionStudent" id="divSearchActionOptionsStudent">' +							 					  
'</div>');

$('#btnSearchActionStudent').click(function (e) { 
    $('#divSearchActionOptionsStudent').html(divSearchActionOptionsParmStudent);
    $('#deleteClassRoomOnlyStudent,#deleteClassRoomTableStudent,#deleteClassRoomSelectedStudent').hide();


    var table = tblClassTableStudent
    var dataArray = table.rows().data().toArray();

    // console.log('table.rows(.selected).count() = ',table.rows('.selected').count());
    // console.log('dataArray.length = ',dataArray.length);

    if(dataArray.length > 0){

        $('#deleteClassRoomTableStudent').show();

    }
    if(dataArray.length > 0 && table.rows('.selected').count() === 1){
        

        $('#deleteClassRoomOnlyStudent').show();
        $('#deleteClassRoomTableStudent,#deleteClassRoomSelectedStudent,#addClassRoomStudent').hide();

    }
    if(dataArray.length > 0 && table.rows('.selected').count() > 1){

        $('#deleteClassRoomSelectedStudent').show();
        $('#deleteClassRoomOnlyStudent,#deleteClassRoomTableStudent,#addClassRoomStudent').hide();

    }
    
    $('#addClassRoomStudent').click(function (e) { 
        console.log('Search student...');
        var table = $('#classTableStudentLoader').DataTable();
        table.clear().draw();
        $('#modalAddStudent').modal('show');
        $('#addStudent').click();
        e.preventDefault();
        
    });

    $('#deleteClassRoomSelectedStudent').click(function (e) { 
        tableActions(tblClassTableStudent, this); 
        e.preventDefault() 
        
    });

    $('#deleteClassRoomTableStudent').click(function (e) { 

        tableActions(tblClassTableStudent, this); 
        e.preventDefault() 
        
    });

    $('#deleteClassRoomOnlyStudent').click(function (e) { 

        tableActions(tblClassTableStudent, this);  
        e.preventDefault()
        
    });


});

/**
 * @description Pag Modal
 * @name Módulo: carrega os studantes
 * @alias Title: Lista de Estudantes
 */


tblClassTableStudentLoader = $('#classTableStudentLoader').DataTable({ //carrega os studantes
    select: {
        style: 'multi' // multi ou single
    },
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
        targets: [4],      
        visible: false,  // oculta a coluna
        searchable: false // evita que ela entre na busca
    },
    ],
    rowId: 'classRoomID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdownStudent btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        // 'copy',
        // {
        //     extend: 'csvHtml5',
        //     title: 'BIP_Export_Table'
        // },
        // {
        //     extend: 'excelHtml5',
        //     title: 'BIP_Export_Table'
        // }
    ],
    order: [[ 1, 'desc' ]],
    iDisplayLength: 5,		
    columns: [
        { data: null, defaultContent: ''},			
        { data: 'studentID' },
        { data: 'fullName' },        
        { data: 'studentCPF' },
        { data: 'userID' }
    ]
});



$('#classTableStudentSimulate tbody').on( 'click', 'tr', function () {
    // if ( $(this).hasClass('selected') ) {
    //     $(this).removeClass('selected');
    // }
    // else {
    //     tblClassTableStudentSimulate.$('tr.selected').removeClass('selected');
    //     $(this).addClass('selected');
    // };

    // if (tblClassTableStudentSimulate.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
    //     // $('#divSearchActionOptionsStudent').html(divSearchActionOptionsParmStudent);	  
    


    //     $('#btnSearchAction').removeClass('disabled btn-default');
    //     $('#btnSearchAction').addClass('btn-info');
    // } else if (!tblClassTableStudentSimulate.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
    //     $('#btnSearchAction').removeClass('btn-info');
    //     $('#btnSearchAction').addClass('disabled btn-default');
    // };
} );

function addStudentClassRoom() {
    var objFilters = new Object();

    objFilters.studentFullName = $("#fullNameAddStudent").val();
    objFilters.studentClassRoom = $("#classRoomAddStudent").val();
    objFilters.studentCPF = $("#cpfAddStudent").val().replace(/[.\-]/g, "");
    objFilters.blnOnlyStudent = 'true';
    
    getStudentLoaderByFilterTable(tblClassTableStudentLoader, objFilters, null, null);	
    tblClassTableStudentLoader.table().clear();
}

$('#addStudent').click(function (e) { 
    console.log('Add student... ');
    addStudentClassRoom()
});


$('#addRowsTableStudent').click(function () {
    var tableStudentLoader = $('#classTableStudentLoader').DataTable();
    var tableDestine = $('#classTableStudent').DataTable();

    var dataInsert = tableStudentLoader.rows('.selected').data().toArray();
    var dataFinal = tableDestine.rows().data().toArray();

    if (dataInsert.length === 0) {
        toastr.warning('Nenhum aluno para adicionar.');
        return;
    }

    dataInsert.forEach(function (element) {
        var blnCheckDuplicate = false
        console.log('Student includ ...');
        dataFinal.some(function(item) {
            (item.studentID === element.studentID) == true?  blnCheckDuplicate = true : '';
        });

        if (!blnCheckDuplicate) {
            console.log('status ok...');
            tableDestine.row.add(element).draw();
        } else {
            console.log('status not...');
            toastr.warning(`Aluno ${element.fullName} já está na lista final.`);
        }
    });

    // Limpa a tabela tableStudentLoader
    tableStudentLoader.clear().draw();
    $('#modalAddStudent').modal('hide');
});

/**
 * @description cardTitleWeekCalendar
 * 
 */

divSearchActionOptionsParmWeek = 

/*<% if (lstProfilePermission.stream().filter(c -> c.getPermissionShdesc().equals("DELETE_LOGIN")).findAny().orElse(null) != null) { %>*/
' <a class="dropdown-item" href="#" id="addWeekCalendar"><i class="fas fa-clock"></i> Inserir Horário</a> '+
' <a class="dropdown-item" href="#" id="deleteOnlyRowWeekCalendar"><i class="fas fa-eraser mr-1"></i> Remover Horário</a> '+
' <a class="dropdown-item" href="#" id="deleteRowsSelectedWeekCalendar"><i class="fas fa-trash-alt mr-1"></i> Remover Seleção</a> '+
' <a class="dropdown-item" href="#" id="exportTime"><i class="fas fa-trash-alt mr-1"></i> export</a> '+

' <a class="dropdown-item" href="#" id="deleteWeekCalendar"><i class="fas fa-exclamation-triangle"></i> Apagar Todos </a>';

tblClassTableWeekCalendar = $('#classTableWeekCalendar').DataTable({
    select: {
        style: 'multi'
    },
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0
        // data: null
    },
    // {
    //     orderable: true,
    //     targets:   [1],
    //     render: function (data) {
    //         console.log(data)
    //         // if(data.studentID){
    //         //     return data.studentID
    //         // }
            
    //     }
    // },
    ],
    // rowId: 'disciplineID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdownWeek btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        
        'copy',
  
        //edit -- okok
        {
            extend: 'pdfHtml5',
            text: 'PDF',
            
            title: function() {
                var data = tblClassTableWeekCalendar.rows().data(); 
                
                return 'Turma: '+$('#classRoomNumber').val(); // antes 'Calendário Semanal Turma: '+$('#classRoomNumber').val();
                
            },
            orientation: 'landscape', // 'portrait' - A4 em pé ou 'landscape' - A4 deitado
            pageSize: 'A4',
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6,7], // exporta só da coluna 1 (horário) até a 6 (sexta)
                format: {
                    body: function (data, row, column, node) { //(data, row, column, node)
                        // console.log(data, row, column, node);
                        // if (column === 1) {
                        //     // Coluna de horário (texto puro)
                        //     var column1 = $(node).text().trim()
                        //     console.log('column1');
                        //     console.log(column1);
                        //     return column1;
                        // } else {
                        // A partir da coluna 2 (índice 2), são selects
                        let select = $('select', node);
                        // console.log('select : ',select);
                        if (select.length > 0) {
                            return select.find('option:selected').text().trim();
                        }
                        var column = $(node).text().trim()
                        return column;
                        // }
                    }
                }
            },
            // // old
            // customize: function (doc) {
            //     doc.styles.title = {
            //         fontSize: 12,
            //         bold: true,
            //         alignment: 'left'
            //     };
            //     doc.defaultStyle.fontSize = 10;
            //     doc.pageMargins = [40, 60, 40, 40]; // left, top, right, bottom
            //     // centralizar tbl
            //     doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');

            //     // edt a altura das linhas e espessura das bordas
            //     var tableBody = doc.content[1].table.body;//pega atbl do documanto
            //     //loop duplo para pegar coluna e linha
            //     for (var i = 0; i < tableBody.length; i++) {
            //         for (var j = 0; j < tableBody[i].length; j++) {
            //             tableBody[i][j].alignment = 'center'; //alinhamento
            //             tableBody[i][j].margin = [5, 10, 5, 10]; // espaçamento interno (top, right, bottom, left)
            //             tableBody[i][j].border = [true, true, true, true]; // garante todas as bordas
            //             tableBody[i][j].borderWidth = 2.5; // borda mais grossa
            //             tableBody[i][j].borderColor = 'black';
            //         }
            //     }
            //     doc.header = function() {
            //         return {
            //             text: 'Calendário Semanal - '+$('#classRoomBaseYearID option:selected').text(),
            //             margin: [0, 25, 0, 0],
            //             alignment: 'center',
            //             fontSize: 12,
            //             bold: true
            //         };
            //     };
            //     doc.footer = function(currentPage, pageCount) {
            //         return [
            //             { text: `© Copyright ViperZero 2025 All Rights Reserved.`, alignment: 'center', fontSize: 8, font: 'Roboto' },
            //             { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center', fontSize: 8, font: 'Roboto' }
            //         ];
            //     };
            // }
            customize: function (doc) {
                //edit title tipo css
                doc.styles.title = {
                    fontSize: 16,      // tamanho da fonte
                    bold: true,        //  negrito
                    alignment: 'center', // alinha o título ao centro
                    color: 'black'     // cor do texto do título
                };
                //edit table
                doc.styles.tableHeader = {
                    bold: true,
                    fontSize: 10,
                    color: 'black',
                    // fillColor: '#f2f2f2', dessa forma ficou melhor
                    alignment: 'center'
                };
            
                doc.defaultStyle.fontSize = 10;
                doc.pageMargins = [40, 60, 40, 40];
                doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');

                // edt a altura das linhas e espessura das bordas
                var tableBody = doc.content[1].table.body;//pega atbl do documanto
                //loop duplo para pegar coluna e linha
                for (var i = 0; i < tableBody.length; i++) {
                    for (var j = 0; j < tableBody[i].length; j++) {
                        tableBody[i][j].alignment = 'center'; //alinhamento
                        tableBody[i][j].margin = [5, 10, 5, 10]; // espaçamento interno (top, right, bottom, left)
                        tableBody[i][j].border = [true, true, true, true]; // garante todas as bordas
                        tableBody[i][j].borderWidth = 1.5; // borda mais grossa
                        tableBody[i][j].borderColor = 'black';
                        //  aplica cor azul ao cabeçalho
                        if (i === 0) {
                            tableBody[i][j].fillColor = '#1baac1'; // cor azul
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
            
                doc.content[1].alignment = 'center';
            
                // doc.header = function() {
                //     return {
                //         text: 'Calendário Semanal - ' + $('#classRoomBaseYearID option:selected').text(),
                //         margin: [0, 25, 0, 0],
                //         alignment: 'center',
                //         fontSize: 20,
                //         bold: true
                //     };
                // };

                doc.header = function () {
                    
                    var logoBase64 = $('#hidBase64').val();
                    // console.log(logoBase64);
                    // console.log(typeof logoBase64); // tem que ser "string"
                    // console.log(logoBase64.startsWith("data:image")); // tem que dar true
                    // console.log("Valor no doc.header:", $('#hidBase64').val());
                    console.log("Final:", logoBase64.slice(-10));
                    return {
                        columns: [
                            {
                                text: 'Calendário Semanal - ' + $('#classRoomBaseYearID option:selected').text(),
                                alignment: 'left',
                                margin: [40, 20, 0, 0],
                                fontSize: 14,
                                bold: true
                            },
                            {
                                image: logoBase64,
                                width: 120,
                                height: 60,
                                alignment: 'right',
                                margin: [0, 10, 40, 0]
                            }
                        ]
                    };
                };
            
                doc.footer = function(currentPage, pageCount) {
                    return [
                        { text: `© Copyright ViperZero 2025 All Rights Reserved.`, alignment: 'center', fontSize: 8 },
                        { text: `Página ${currentPage} de ${pageCount}`, alignment: 'center', fontSize: 8 }
                    ];
                };
            }
            
            
        },
        {
            extend: 'excelHtml5',
            title: function () {
                return 'Calendário Semanal - Turma ' + $('#classRoomNumber').val();
            },
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                    body: function (data, row, column, node) {// exporta as celulas
                        let select = $('select', node);
                        if (select.length > 0) {
                            return select.find('option:selected').text().trim();
                        }
                        return $(node).text().trim();
                    }
                }
            }
        }
    ],
    order: [[ 1, 'asc' ]],
    iDisplayLength: 10,		
    columns: [
        { title: ''},		//horário
        { title: 'Inicio' },		//horário
        { title: 'Fim' },		//horário
        { title: 'Segunda'},		//horário
        { title: 'Terça' },      		//horário  
        { title: 'Quarta' },		//horário
        { title: 'Quinta' },		//horário
        { title: 'Sexta' }		//horário
        // { title: 'Sábado' }		//horário
    ]
});

$('#classTableWeekCalendar tbody').on( 'click', 'tr', function () {
    // if ( $(this).hasClass('selected') ) {
    //     $(this).removeClass('selected');
    // }
    // else {
    //     tblClassTableWeekCalendar.$('tr.selected').removeClass('selected');
    //     $(this).addClass('selected');
    // };

 

    // if (tblClassTableWeekCalendar.rows('.selected').any() ) {			
    //     // $('#divSearchActionOptionsWeek').html(divSearchActionOptionsParmWeek);	  
    
           
    //     $('#btnSearchActionWeek').removeClass('disabled btn-default');
    //     $('#btnSearchActionWeek').addClass('btn-info');

    // } else if (!tblClassTableWeekCalendar.rows('.selected').any() && !$('#btnSearchActionWeek').hasClass('disabled')) {		

    //     $('#btnSearchActionWeek').removeClass('btn-info');
    //     $('#btnSearchActionWeek').addClass('disabled btn-default');
    // };
} );

$('.divDropdownWeek').html('<button class="btn btn-info new-button dropdown-toggle" type="button" id="btnSearchActionWeek" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    'Opções&nbsp;' +
    '</button>' +
    '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchActionWeek" id="divSearchActionOptionsWeek">' +							 					  
'</div>');
    
$('#btnSearchActionWeek').click(function () { 
    $('#divSearchActionOptionsWeek').html(divSearchActionOptionsParmWeek);	

    $('#deleteWeekCalendar,#deleteOnlyRowWeekCalendar,#deleteRowsSelectedWeekCalendar').hide();


    var table = tblClassTableWeekCalendar
    var dataArray = table.rows().data().toArray();

    // console.log('table.rows(.selected).count() = ',table.rows('.selected').count());
    // console.log('dataArray.length = ',dataArray.length);

    if(dataArray.length > 0){

        $('#deleteWeekCalendar').show();

    }
    if(dataArray.length > 0 && table.rows('.selected').count() == 1){

        // console.log('aquiii');
        $('#deleteOnlyRowWeekCalendar').show();
        $('#deleteWeekCalendar,#deleteRowsSelectedWeekCalendar,#addWeekCalendar').hide();

    }
    if(dataArray.length > 0 && table.rows('.selected').count() > 1){

        $('#deleteRowsSelectedWeekCalendar').show();
        $('#deleteWeekCalendar,#deleteOnlyRowWeekCalendar,#addWeekCalendar').hide();

    }

    $('#addWeekCalendar').click(function (e) { 
        //garantir limpeza
        lstHourWeekColumn = []
        $('#modalHourWeekBeginInput').val('');
        $('#modalHourWeekEndInput').val('');
        $('#modalAddHourWeek').modal('show');
        e.preventDefault()
        
    });

    $("#deleteOnlyRowWeekCalendar").click(function (e) { 
        // console.log('clicado',this.id);
        console.log('Delete row hour week... ');
        classTableWeekCalendar = $('#classTableWeekCalendar').DataTable();
        var data = classTableWeekCalendar.rows().data().toArray();
        // console.log('deleteOnlyRowWeekCalendar : ',classTableWeekCalendar);
        if(data.length == 0){
            toastr.warning('Tabela vazia','Atenção!');
            e.preventDefault();
            return
        }
        tableActions(classTableWeekCalendar, this)
        e.preventDefault()
        
    });

    $("#deleteRowsSelectedWeekCalendar").click(function (e) { 
        console.log('clicado',this.id);
        classTableWeekCalendar = $('#classTableWeekCalendar').DataTable();
        var data = classTableWeekCalendar.rows().data().toArray();
        console.log('deleteRowsSelectedWeekCalendar : ',classTableWeekCalendar);
        if(data.length == 0){
            toastr.warning('Tabela vazia','Atenção!');
            e.preventDefault();
            return
        }
        tableActions(classTableWeekCalendar, this)
        e.preventDefault()
        
    });

    $("#deleteWeekCalendar").click(function (e) { 
        console.log('clicado',this.id);
        classTableWeekCalendar = $('#classTableWeekCalendar').DataTable();
        var data = classTableWeekCalendar.rows().data().toArray();
        console.log('classTableWeekCalendar : ',classTableWeekCalendar);
        if(data.length == 0){
            toastr.warning('Tabela vazia','Atenção!');
            e.preventDefault();
            return
        }
        tableActions(classTableWeekCalendar, this)
        e.preventDefault()
        
    });

    $('#exportTime').click(function (e) { 

        toastr.warning('SEm desenvolvimento','Atenção',{
			timeOut: 1000,
			preventDuplicates: true,
			positionClass: 'toast-top-right',
			
		});
		return
        classTableWeekCalendar = $('#classTableWeekCalendar').DataTable();
        var data = classTableWeekCalendar.rows().data().toArray();
        console.log(data);

        // tentativa 1
        tblClassTableWeekCalendar.rows().every(function () { //function (rowIdx, tableLoop, rowLoop)
            var rowNode = this.node();
        
            $(rowNode).find('select').each(function () {
                var selectedValue = $(this).val();
                var selectedText = $(this).find('option:selected').text();
        
                console.log('valor: ', selectedValue);
                console.log('texto: ', selectedText);
            });
        });

        var diasSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];

        var dataFormatada = [];

        tblClassTableWeekCalendar.rows().every(function () {
            var rowNode = this.node();
            var cells = $(rowNode).find('td');

            console.log(cells);

            var linha = {
                horario: $(cells[1]).text().trim()
            };

            for (var i = 0; i < diasSemana.length; i++) {
                var select = $(cells[i + 2]).find('select');
                var value = select.val();
                var text = select.find('option:selected').text();

                console.log(value, text);

                linha[diasSemana[i]] = value !== '--' ? value : null;
                // ou: linha[diasSemana[i]] = { value, text };
            }

            dataFormatada.push(linha);
        });

        console.log(dataFormatada);

            
            
    });

     
});


$('#timepicker,#modalHourWeekBegin,#modalHourWeekEnd').datetimepicker({
    format: 'LT'
})


function addMinutesToTime(timeStr, minutesToAdd) {
    var parts = timeStr.split(':');
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);

    // Soma os minutos
    minutes += minutesToAdd;

    // Calcula novas horas e minutos
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;

    // Formata com zero à esquerda se necessário
    var newHours = hours.toString().padStart(1, '0');
    var newMinutes = minutes.toString().padStart(2, '0');

    return `${newHours}:${newMinutes}`;
}

//auto copmlete
$('#modalHourWeekBeginInput').blur(function (e) { 
    var test = $(this).val();
    var blur = addMinutesToTime(test, 50)
    // console.log(blur);
    if(blur == 'NaN:NaN'){

        return $('#modalHourWeekEndInput').val();
    }
    $('#modalHourWeekEndInput').val(blur);
});

$('#tableWeekCalendar').click(function (e) { 
    console.log('add time in week... ');

    var lstHourWeekColumnBegin = []
    var blnCheckNull = false

    
    var beginHourOld = $('#modalHourWeekBeginInput').val();
    var beginHourPre = beginHourOld.split(" ")
    var beginHour = beginHourPre[0]

    var endHourOld = $('#modalHourWeekEndInput').val();
    var endHourPre = endHourOld.split(" ")
    var endHour = endHourPre[0]

    if(!beginHour || !endHour){
        blnCheckNull = true
        if(!beginHour){

            toastr.warning('Campo '+beginHourOld+' vazio','Atenção!');
            $('#modalHourWeekBeginInput').focus()
            e.preventDefault()
            e.stopImmediatePropagation()
            return
        }
        if(!endHour){

            toastr.warning('Campo '+endHourOld+' vazio','Atenção!');
            $('#modalHourWeekEndInput').focus()
            e.preventDefault()
            e.stopImmediatePropagation()
            return
        }
        //teste para deter propagção de eventos
        e.preventDefault()
        e.stopImmediatePropagation()
        return
    }

    if(beginHour == endHour){
        toastr.warning('Horários iguais','Atenção!');
        
        e.preventDefault()
        e.stopImmediatePropagation()
        return
    }

    var beginHourCompare = beginHour.split(":")
    var endHourCompare = endHour.split(":")

    if(Number(beginHourCompare[0]) > Number(endHourCompare[0])){

        toastr.warning('Horários irregulares','Atenção!');
        e.preventDefault()
        e.stopImmediatePropagation()
        return

    }else if(Number(beginHourCompare[0]) == Number(endHourCompare[0]) && Number(beginHourCompare[1]) > Number(endHourCompare[1])){
        
        toastr.warning('Horários irregulares','Atenção!');
        e.preventDefault()
        e.stopImmediatePropagation()
        return
    }


    var hour = `${beginHour} - ${endHour}`
    lstHourWeekColumnBegin.push(beginHour);


    var numColumns = $('#classTableWeekCalendar thead th').length;
    var numberColumns = tblClassTableWeekCalendar.columns().count();
    var numRows = tblClassTableWeekCalendar.rows().count();

    // console.log( 'numRows');
    // console.log( numRows);

    // if(numRows > 0){
    //     tblClassTableWeekCalendar.clear().draw();
    // }


    var checkbox = ` `; //tem que passar vazio para não dar erro

    lstHourWeekColumnBegin.forEach(hour => { // for each somente cm um horário para facilitar
        // Cria um array com a primeira coluna sendo o horário e o resto com ""
        var buttons = Array(numberColumns - 3).fill(`<select class="form-control text-xs select-table-bip-combo" ><option value="">--</option></select>`)
    
        var row = [checkbox,hour,endHour, ...buttons]; //... (spread) espalha esses elementos dentro de outro array principal
        tblClassTableWeekCalendar.row.add(row).draw(false);
    });


    var table = $('#classTableTeacher').DataTable();
    var dataTblArray = table.rows().data().toArray();
    var allValuesLst = [];
    dataTblArray.forEach(function(row) {

        allValuesLst.push(row.filterRuleDisciplineID);

    });
    // console.log(allValuesLst);
    console.log('Insert values list ....');
    loadComboDisciplineGetAllFilterSelect(null,allValuesLst);

    console.log('Insert values list sucess... ');//edt --
    $('#modalAddHourWeek').modal('hide');
    
});

//impede o select dpois da coluna 2
$('#classTableWeekCalendar tbody').click(function (e){
    console.log('Row Selected... ');
    var elementClick = $(e.target)
    
    var table = $('#classTableWeekCalendar').DataTable();
    var tdOnTable = elementClick.closest('td');
    var cell = table.cell(tdOnTable);
    
    var rowIdx = cell.index().row;
    var colIdx = cell.index().column;

    if(colIdx <= 1){

        e.preventDefault()
        return;
    }

    if (colIdx > 1) {
        table.row(rowIdx).select(); // ou .deselect() etc
        
    }


})

$('.deleteConfirmation').click(function (e) { 
    // console.log('delete action');
    // var table = $('#tblClassTableTeacher').DataTable();
    // var data = table.rows().data().toArray();
    console.log(this.id);

    if( this.id == 'deleteRowTeacher'){

        console.log('delete Teacher');
        var data = tblClassTableTeacher.rows().data().toArray();
        var selectedRow = tblClassTableTeacher.row('.selected')
        selectedRow.remove().draw()

        // var table = $('#classTableWeekCalendar').DataTable();   

        // var data2 = tblClassTableWeekCalendar.rows().data().toArray();
        var removeDisciplineID = filterRuleDisciplineIDValidation;

        tblClassTableWeekCalendar.rows().every(function () { // pramentros da every function (rowIdx, tableLoop, rowLoop)
            var row = this.node(); // pega o <tr>

            // console.log("row: " + row);

            console.log('remove list value');
            $(row).find('select').each(function () {
                // console.log($(this));
                $(this).find(`option[value="${removeDisciplineID}"]`).remove();//filtro com each
            });
        });

        $('#modalDelete').modal('hide')

        e.preventDefault();

    } else if(this.id == 'deleteTableClassRoomStudent'){
        var data = tblClassTableStudent.rows().data().toArray();
        // console.log('clicado');
        console.log(data);
        tblClassTableStudent.clear().draw();
        $('#modalDelete').modal('hide')
        e.preventDefault();

    } else if(this.id == 'deleteTableClassRoomOnlyStudent'){
        
        var data = tblClassTableStudent.rows().data().toArray();
        var selectedRow = tblClassTableStudent.row('.selected')
        selectedRow.remove().draw()
        $('#modalDelete').modal('hide')
        e.preventDefault();

    } else if(this.id == 'deleteTableClassRoomSelectedStudent'){
        
        var data = tblClassTableStudent.rows().data().toArray();
        var selectedRow = tblClassTableStudent.rows('.selected')
        selectedRow.remove().draw()
        $('#modalDelete').modal('hide')
        e.preventDefault();

    } else if(this.id == 'deleteTableWeekCalendar'){
        var data = classTableWeekCalendar.rows().data().toArray();
        // console.log('clicado');
        // console.log(data);
        classTableWeekCalendar.clear().draw();
        $('#modalDelete').modal('hide')
        e.preventDefault();

     
    } else if(this.id == 'deleteTableRowWeekCalendar'){//edt deleteTableRowWeekCalendar
        // var data = classTableWeekCalendar.rows().data().toArray();
        // console.log('clicado');
        var selectedRow = classTableWeekCalendar.row('.selected')
        selectedRow.remove().draw()
        $('#modalDelete').modal('hide')
        e.preventDefault();

    } else if(this.id == 'deleteTableRowsSelectedWeekCalendar'){ //edt
        // var data = classTableWeekCalendar.rows().data().toArray();
        // console.log('clicado');
        var selectedRow = classTableWeekCalendar.rows('.selected')
        selectedRow.remove().draw()
        $('#modalDelete').modal('hide')
        e.preventDefault();

    } 
    
    var table = $('#minhaTabela').DataTable();
    table.rows('.selected').remove().draw();
    // if (row.any()) {
    //     console.log('linha sel');
    //     row.remove().draw(false)
    // }
    // console.log(data);
    // console.log('selectedRow');
    // console.log(selectedRow);
    
    
});


$('#classRoomSave').click(function () {
    
    console.log('classRoomSave...');
    var blnCheckForm = true;

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objClassRoom = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidClassRoomID").val() != null && $("#hidClassRoomID").val() != "")
        objClassRoom.classRoomID = $("#classRoomID").val();
    else
        objClassRoom.classRoomID = "0";

    objClassRoom.classRoomNumber = $("#classRoomNumber").val();			
    objClassRoom.classRoomFgAtv = $("#classRoomFgAtv").val();
    objClassRoom.classRoomSegment = $("#classRoomSegment").val();
    objClassRoom.classRoomPeriod = $("#classRoomPeriod").val();
    objClassRoom.baseYearID = $("#baseYearID").val();
    

    
    // console.log(objClassRoom);
    var regex = /[^a-zA-Z0-9 .âãõêôûáéíó/ú-]/;
    for (let key in objClassRoom) {

        if (objClassRoom.hasOwnProperty(key) && (objClassRoom[key] == null || objClassRoom[key] === "")) {
            // console.log(`O elemento ${key} é null, undefined ou vazio`);
            var htmlText = $('label[for="' + key + '"]').text();
            toastr.warning('Campo '+htmlText+' vazio','Atenção!');
            $('#'+key).focus();
            return

        }else if(regex.test(objClassRoom[key])){
            
            console.log('key>> ',key);
            if(objClassRoom[key].length <= 2){
                var htmlText = $('label[for="' + key + '"]').text();
                toastr.warning('Mínimo 3 caracteres!',htmlText+'!');
                $('#'+key).focus();
                return
            }
            // console.log(key);
            var htmlText = $('label[for="' + key + '"]').text();
            toastr.warning('Caractere não permitido!',htmlText+'! '+objClassRoom[key]);
            $('#'+key).focus();
            return

        }


    }
    

    var lstTblClassTableTeacher = new Array();
    

    tblClassTableTeacher.rows( function ( idx, data, node ) {
        
        var objClassTableTeacher = new Object();
        // console.log(data.teacherID);
        objClassTableTeacher.tableTeacherID = (data.teacherID != undefined? data.teacherID:null);
        objClassTableTeacher.tableTeacherUserID = data.userID;
        objClassTableTeacher.tableTeacherDiscipline = data.filterRuleDisciplineID;

        // console.log(objClassTableTeacher);

        
        lstTblClassTableTeacher.push(objClassTableTeacher);

    });

    objClassRoom.tblClassTableTeacherRows = lstTblClassTableTeacher

    //tables TableStudent

    var lstTblClassTableStudent = new Array();
    

    tblClassTableStudent.rows( function ( idx, data, node ) {
        
        var objClassTableStudent = new Object();
        // console.log(data);
        objClassTableStudent.tableStudentID = data.studentID;
        objClassTableStudent.tableStudentFullName = data.fullName;
        objClassTableStudent.tableStudentUserID = data.userID;
        

        
        lstTblClassTableStudent.push(objClassTableStudent);

    });

    objClassRoom.tblClassTableStudentRows = lstTblClassTableStudent

    //tables TableHourWeek

    var lstTblClassWeekCalendar = new Array();

    var daysWeek = ['wk_1','wk_2', 'wk_3', 'wk_4', 'wk_5', 'wk_6', 'wk_7'];

    tblClassTableWeekCalendar.rows().every(function () {
        var rowNode = this.node();
        var cells = $(rowNode).find('td');

        // console.log(cells);

        var row = {
            startTime: $(cells[1]).text().trim(),
            endTime: $(cells[2]).text().trim()
        };
        // console.log(row)

        for (var i = 0; i < daysWeek.length; i++) { //iniciar do 1 e termonar no 6
            // console.log('daysWeek[i] | i',daysWeek[i]," ",i);
            if(i === 0 || i === 6){

                // console.log('daysWeek[i] | i',daysWeek[i]," ",i);
                row[daysWeek[i]] = '';
                // console.log('dentro 0 ou 6');

            }else{
                var select = $(cells[i + 2]).find('select'); //cells[i + 2] pula a casa do check-box e do horário iniciando a contagem na segunda
                var value = select.val();
                var text = select.find('option:selected').text();

                // console.log(row)(value, text);
                // console.log('daysWeek[i] | i',daysWeek[i]," ",i);
                // console.log('value',value);

                row[daysWeek[i]] = value !== '--' ? value : null;
                //  row[daysWeek[i]] = { value, text };
            }
        }

        lstTblClassWeekCalendar.push(row);
    });
    

    // tblClassTableWeekCalendar.rows( function ( idx, data, node ) {
        
    //     var objClassWeekCalendar = new Object();
    //     console.log(data);
    //     // objClassWeekCalendar.tableStudentID = data.studentID;
    //     // objClassWeekCalendar.tableStudentFullName = data.fullName;
        

        
    //     lstTblClassWeekCalendar.push(objClassWeekCalendar);

    // });

    objClassRoom.tblClassTableWeekCalendarRows = lstTblClassWeekCalendar


    console.log('objClassRoom...1.2');
    // console.log(objClassRoom); return
    saveClassRoom(objClassRoom);
    
    
});