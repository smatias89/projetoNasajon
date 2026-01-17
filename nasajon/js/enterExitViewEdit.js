console.log('enterExitEdit');

if (!$("#leftMenuEnterExitStaff").hasClass("active")) {
    $("#leftMenuEnterExitStaff").addClass("active");
}	
//placholder
$('[id*="CPF"]').mask('999.999.999-99').attr('placeholder','___.___.___-__');

//loadCombos
loadComboBaseYearGetAll($('#baseYearID'));


if ($("#hidEnterExitID").val() != null && $("#hidEnterExitID").val() != "") {

    // console.log('Edit teacherIDParm >> ',teacherIDParm,' copy');
    $('#disciplineDelete').hide();
    var objFilters = new Object();
    objFilters.enterExitID = $("#hidEnterExitID").val();
    objFilters.modifiedDate = $("#hidUserModifiedDate").val();
    objFilters.baseYearID = $('#baseYearID').val();
    getEnterExitByFilterForm(objFilters);



} else {

    // console.log('New');
    // $('.card-title').text("Nova Disciplina");
    $("#divDisciplineID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}




//----------- TABLES -------------------------
$('#enterExitAddStudent').click(function (e) { 
    addStudentClassRoom()
    
});

$('#enterExitbackButton').click(function (e) { 
    location.href = 'enterExitStaff';
    
});

function addStudentClassRoom() {
    var objFilters = new Object();

    objFilters.studentFullName = $('#enterExitFullNameModal').val();//$("#enterExitFullName").val();
    objFilters.studentCPF = $("#enterExitCPFModal").val().replace(/[.\-]/g, "");
    objFilters.blnOnlyStudent = 'true';
    
    // console.log(objFilters); 
    getEnterExitStudentLoaderByFilterTable(tblEnterExitLoadStudent, objFilters, null, null);	
    tblEnterExitLoadStudent.table().clear();
}

// table in page --------------------------------------------
tblEnterExitAddStudent = $('#enterExitAddStudentTable').DataTable({
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
		orderable: false,
		targets:   2,
		render: function (data) {
            
            var classRoom;
            // console.log(data)
            
            if(Array.isArray(data)){

                $.each(data, function (index,element){
                
                    // console.log(element.shdesc);
                    classRoom = element.shdesc;
                })

                return classRoom;
            }else{

                return data;

            }
            
            
            
            
        }
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
    rowId: 'enterExitID',
    dom: 
        "<'row'<'col-sm-2'><'col-sm-3'B><'col-sm-1 text-center divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'>>" +
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
        { data: 'fullName' },
        { data: 'lstClassRoom' },
        { data: 'studentCPF' , title:'CPF'},
        { data: 'userID' }
    ]
});
    

// $('#leftMenuClassroomBlock').click();

/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-xs btn-block  dropdown-toggle btn-info" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
'</div>');

console.log('permissions loading... ');
if(!$('#hiPermissionOnlyStaff').val()){
    // console.log('permissão falsa');
    $('.divDropdown').hide();
    toastr.warning('Nenhuma opção disponível');
}

$('#btnSearchAction').click(function (e) { 
    $('#divSearchActionOptions').html(divSearchActionOptionsParm);	

    var table = $('#enterExitAddStudentTable').DataTable();
    var rowsConut = table.rows('.selected').count()
    var dataArray = table.rows().data().toArray();
    // console.log(rowsConut);
    // console.log(dataArray);



    $('#deleteOnlyEnterExit,#deleteSelectEnterExit,#deleteEnterExit').hide();

    if(rowsConut == 1){
        $('#deleteOnlyEnterExit').show();
        $('#addStudentEnterExit').hide();
    } else if(rowsConut > 1){
        $('#deleteOnlyEnterExit,#addStudentEnterExit').hide();
        $('#deleteSelectEnterExit,#deleteEnterExit').show();
    }
    
    $('#addStudentEnterExit').click(function (e) { 
        e.preventDefault();
        console.log('clicado');

        $('#modalEnterExitAddStudent').modal('show');
        $('#enterExitAddStudent').click();
        
    });

    $('#deleteOnlyEnterExit').click(function (e) { 
        e.preventDefault();
        var table = $('#enterExitAddStudentTable').DataTable();
        table.row('.selected').remove().draw();
        
    });

    $('#deleteSelectEnterExit').click(function (e) { 
        e.preventDefault();
        var table = $('#enterExitAddStudentTable').DataTable();
        table.rows('.selected').remove().draw();
        
    });

    $('#deleteEnterExit').click(function (e) { 
        e.preventDefault();
        var table = $('enterExitAddStudentTable').DataTable();
        table.clear().draw();
        
    });



   
    
});

// end table in page --------------------------------------------
// table in MODAL --------------------------------------------

tblEnterExitLoadStudent = $('#enterExitLoadStudentTable').DataTable({ //carrega os studantes
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
    rowId: 'enterExitAddStudentID',
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



$('#addRowsStudentEnterExit').click(function (e) { 
    e.preventDefault();
    console.log('addRowsStudenT ...');
    var tableFrom = $('#enterExitLoadStudentTable').DataTable();
    var selectedDataArray = tableFrom.rows('.selected').data().toArray();
    // console.log('origem\n');
    // console.log(selectedDataArray);

    let blnDuplicate = false;

    
    var tableDestiny = $('#enterExitAddStudentTable').DataTable();
    var dataArrayDestiny = tableDestiny.rows().data().toArray();
    // console.log('destino\n');
    // console.log(dataArrayDestiny);
    // console.log(dataArrayDestiny);



    outerLoop: //Forma interessante para sair do loop pois o return não estava funcionando
    for (let i = 0; i < dataArrayDestiny.length; i++) {
        const element = dataArrayDestiny[i];
        var tblDestinyID = dataArrayDestiny[i].userID
        // console.log('tblDestinyID: ',tblDestinyID)
        
        
        for(let j = 0; j < selectedDataArray.length; j++){
            const elementFrom = selectedDataArray[j]
            var tblFromID = selectedDataArray[j].userID
            // console.log('elementFrom: ',elementFrom.userID);

            if(tblFromID == tblDestinyID ){
                toastr.warning('Não é possível adicionar a Aluno.','Aluno Duplicada');
                // console.log('tblFromID: ',tblFromID)
                blnDuplicate = true;
                break outerLoop;
            }else{
                console.log('ok');

            }
        }
        
    }

    if (!blnDuplicate) {
        
        // console.log('blnDuplicate: ',blnDuplicate);
       var table = $('#enterExitAddStudentTable').DataTable();
       var data = selectedDataArray
       console.log(data);
       table.rows.add(data).draw();
    
        $('#modalEnterExitAddStudent').modal('hide');
    }

    

    
});


$('#divEnterExitWeekDays').hide();
$('#divEnterExitDate').hide();
$('#divEnterExitHour').hide();



$('.schedule-option').click(function (e) { 
    var optionsCheckBox = $('.schedule-option')

    var count = 0;
    // var id = $('.schedule-option').attr('id');
    var idSelected = $(this).attr('id');
    // console.log(idSelected);
    $.each(optionsCheckBox, function (index,element) { 

        // console.log($(element).attr('id'));
        if($(element).is(':checked')){
            return
        }else{
            count++
        }
        
    })

    if(count < '4'){
        e.preventDefault()
        console.log('event Prevent count: ',count);
        return
    }else{
        console.log('passou count: ',count);
    }

    if(idSelected == 'enterExitScheduleWeek'){

        $('#divEnterExitWeekDays').show();
        $('#divEnterExitDate').show();
        $('#divEnterExitHour').show();
        $('#divEnterExitDateEnd').show();

        $('label[for="enterExitDate"]').first().text('Data Inicio:');


    }else if(idSelected == 'enterExitScheduleMonth'){
        $('#divEnterExitHour').show();
        $('#divEnterExitDateTime').show();
        // $('#enterExitHour').show();

        $('label[for="enterExitDate"]').first().text('Data Inicio:');

    }else if(idSelected == 'enterExitSchedulePunctual'){
        $('#divEnterExitWeekDays').show();
        $('#divEnterExitDate').show();
        $('#divEnterExitHour').show();

        $('#divEnterExitDateEnd').hide();
        var data = `    Data: `
        $('label[for="enterExitDate"]').first().text(data);
    }

    if(count == '5' &&  idSelected == 'enterExitScheduleWeek' ){
        console.log('idSelected: ',idSelected);
        $('#divEnterExitWeekDays').hide();
        $('#enterExitSunday, #enterExitMonday,#enterExitTuesday,#enterExitWednesday,#enterExitThursday,#enterExitFriday,#enterExitSaturday,#enterExitSchedule').prop('checked', false);
        $('#enterExitDateInput,#enterExitDateEndInput,#enterExitDateTimeInput').val('');
        $('#divEnterExitDate').hide();
        $('#divEnterExitHour').hide();

    }else if(count == '5' &&  idSelected == 'enterExitScheduleMonth'){
        console.log('idSelected: ',idSelected);
        $('#enterExitScheduleCalendarWeekHour').prop('checked', false);
        $('#enterExitDateTimeInput').val('');
        $('#divEnterExitHour').hide();

    }else if(count == '5' &&  idSelected == 'enterExitSchedulePunctual' ){
        console.log('idSelected: ',idSelected);
        $('#divEnterExitWeekDays').hide();
        $('#enterExitSunday, #enterExitMonday,#enterExitTuesday,#enterExitWednesday,#enterExitThursday,#enterExitFriday,#enterExitSaturday,#enterExitSchedule').prop('checked', false);
        $('#enterExitDateInput,#enterExitDateEndInput,#enterExitDateTimeInput').val('');
        $('#divEnterExitDate').hide();
        $('#divEnterExitHour').hide();

    }
    
});

$('#enterExitScheduleCalendarWeekHour').click(function (e) { 

    if($('#enterExitScheduleCalendarWeekHour').is(':checked')){
        $('#divEnterExitDateTime').hide();
        $('#enterExitDateTimeInput').val('');
    }else {
        $('#divEnterExitDateTime').show();
    }
    
})


$('#enterExitSave').click(function (e) { 
    var objEnterExit = {}

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidEnterExitID").val() != null && $("#hidEnterExitID").val() != "")
        objEnterExit.enterExitID = $("#enterExitID").val();
    else
        objEnterExit.enterExitID = "0";

    objEnterExit.fullName = $('#enterExitFullName').val();
    objEnterExit.personCPF = $("#enterExitCPF").val().replace(/[.\-]/g, ""); 
    objEnterExit.fgAtv = $('#enterExitFgAtv').val();
    objEnterExit.reason = $('#enterExitObservation').val();
    objEnterExit.personPhone = $("#enterExitPhone").val();
    objEnterExit.baseYearID = $('#baseYearID').val();
    objEnterExit.personPhone = (objEnterExit.personPhone).split("-").join("");
    objEnterExit.personPhone = (objEnterExit.personPhone).split("(").join("");
    objEnterExit.personPhone = (objEnterExit.personPhone).split(")").join("");
    objEnterExit.recorrence = '';


    if($('#enterExitDateInput').val() == ''){
        objEnterExit.dateStart = null
    }else{
        var dateStart = $('#enterExitDateInput').val().replace("/","-")
        var dateStart = dateStart.replace("/","-")
        // console.log('dateStart: '+dateStart);
        objEnterExit.dateStart = moment(dateStart).format(TO_PATTERN_DATE)
    }

    if($('#enterExitDateEndInput').val() == ''){
        objEnterExit.dateEnd = null
    }else{
        var dateEnd = $('#enterExitDateEndInput').val().replace("/","-")
        var dateEnd = dateEnd.replace("/","-")
        // console.log('dateEnd: '+dateEnd);
        objEnterExit.dateEnd = moment(dateEnd).format(TO_PATTERN_DATE)
    }

    if($('#enterExitDateTimeInput').val() == ''){
        objEnterExit.time = null
    }else{
        
        objEnterExit.time = $('#enterExitDateTimeInput').val()
    }
    

    // todos os ckeckbox
    var $blnCheckWeek = $('.custom-control-input')

    var countCheckWeek = 0

    $.each($blnCheckWeek, function (indexInArray, element) { 
        
        var blnChecked = $(element).is(':checked');

        var idElement = $(element).attr('id');

        var classElement = $(element).attr('class');
        var classElement = classElement.split(" ");

        // console.log(classElement);
        // console.log($(element).hasClass(classElement));

        if(classElement[1]){
            if(blnChecked){
                console.log('ok in week');
                countCheckWeek++
            }else{
                console.log('not ok in week');
            }
        }

        // console.log('blnChecked: ',blnChecked,'idElement: ',idElement);

        if(idElement == 'enterExitScheduleDay' && blnChecked ){
            objEnterExit.recorrence = 'D'
        }else if(idElement == 'enterExitScheduleWeek' && blnChecked ){
            objEnterExit.recorrence = 'W'
        }else if(idElement == 'enterExitScheduleMonth' && blnChecked ){
            objEnterExit.recorrence = 'M'
        }else if(idElement == 'enterExitScheduleYear' && blnChecked ){
            objEnterExit.recorrence = 'Y'
        }else if(idElement == 'enterExitSchedulePunctual' && blnChecked ){
            objEnterExit.recorrence = 'P'
        }

        if(idElement == 'enterExitSunday' && blnChecked ){
            objEnterExit.flgSunday = 'Y'
        }else if(idElement == 'enterExitSunday' && !blnChecked){
            objEnterExit.flgSunday = 'N'
        }

        if(idElement == 'enterExitMonday' && blnChecked ){
            objEnterExit.flgMonday = 'Y'
        }else if(idElement == 'enterExitMonday' && !blnChecked ){
            objEnterExit.flgMonday = 'N'
        }

        if( idElement == 'enterExitTuesday' && blnChecked){
            objEnterExit.flgTuesday = 'Y'
        }else if( idElement == 'enterExitTuesday' && !blnChecked){
            objEnterExit.flgTuesday = 'N'
        }

        if(idElement == 'enterExitWednesday' && blnChecked ){
            objEnterExit.flgWednesday = 'Y'
        }else if(idElement == 'enterExitWednesday' && !blnChecked ){
            objEnterExit.flgWednesday = 'N'
        }

        if( idElement == 'enterExitThursday' && blnChecked){
            objEnterExit.flgThursday = 'Y'
        }else if( idElement == 'enterExitThursday' && !blnChecked){
            objEnterExit.flgThursday = 'N'
        }

        if( idElement == 'enterExitFriday' && blnChecked){
            objEnterExit.flgFriday = 'Y'
        }else if( idElement == 'enterExitFriday'&& !blnChecked){
            objEnterExit.flgFriday = 'N'
        }

        if( idElement == 'enterExitSaturday' && blnChecked){
            objEnterExit.flgSaturday = 'Y'
        }else if( idElement == 'enterExitSaturday' && !blnChecked){
            objEnterExit.flgSaturday = 'N'
        }

        if( idElement == 'enterExitScheduleCalendarWeekHour' && blnChecked){
            objEnterExit.flgCalendarWeekHour = 'Y'
        }else if( idElement == 'enterExitScheduleCalendarWeekHour' && !blnChecked){
            objEnterExit.flgCalendarWeekHour = 'N'
        }


        
    });

    // check
    // if(countCheckWeek != '1'){
    //     toastr.warning('verificar a Recorrência','Recorrência')
    //     $('#enterExitSchedulePunctual').focus();
    //     setTimeout(() => {
    //         $('#enterExitSchedulePunctual').prop('checked',true)
            
    //     }, 200);
    //     setTimeout(() => {
    //         $('#enterExitScheduleDay').prop('checked',true)
            
    //     }, 400);
    //     setTimeout(() => {
    //         $('#enterExitScheduleWeek').prop('checked',true)
            
    //     }, 600);
    //     setTimeout(() => {
    //         $('#enterExitScheduleMonth').prop('checked',true)
            
    //     }, 800);
    //     setTimeout(() => {
    //         $('#enterExitScheduleYear').prop('checked',true)
            
    //     }, 1000);
    //     setTimeout(() => {
    //         $('#enterExitSchedulePunctual').prop('checked',false)
            
    //     }, 500);
    //     setTimeout(() => {
    //         $('#enterExitScheduleDay').prop('checked',false)
            
    //     }, 700);
    //     setTimeout(() => {
    //         $('#enterExitScheduleWeek').prop('checked',false)
            
    //     }, 900);
    //     setTimeout(() => {
    //         $('#enterExitScheduleMonth').prop('checked',false)
            
    //     }, 1100);
    //     setTimeout(() => {
    //         $('#enterExitScheduleYear').prop('checked',false)
            
    //     }, 1300);
    //     return
    // }

    var lstTblEnterExitAddStudent = new Array();
    

    tblEnterExitAddStudent.rows( function ( idx, data, node ) {
        
        var objEnterExitAddStudent = new Object();
        // console.log(data);
        objEnterExitAddStudent.tableStudentID = data.studentID;
        objEnterExitAddStudent.tableStudentFullName = data.fullName;
        objEnterExitAddStudent.tableStudentUserID = data.userID;
        

        
        lstTblEnterExitAddStudent.push(objEnterExitAddStudent);

    });

    objEnterExit.tblEnterExitAddStudentRows = lstTblEnterExitAddStudent;



    console.log('save 3...2...1... \n');
    // console.log(objEnterExit); //return;
    saveEnterExitView(objEnterExit)
    
});







