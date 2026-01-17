// console.log('disciplineEdit...') 0807;

//loadCombos
loadComboBaseYearGetAll($('#baseYearID'));

if (!$("#leftMenuDiscipline").hasClass("active")) {
    $("#leftMenuDiscipline").addClass("active");
}	

$('#disciplinebackButton').click(function () {

    location.href = 'discipline';

});



 
if ($("#hidDisciplineID").val() != null && $("#hidDisciplineID").val() != "" && $("#hidActionType").val() == 'copy') {

//    console.log('COPY');
   $('.card-title').text("Copiar Disciplina");
   $("#divDisciplineID").hide();
   $("#divCreatedBy").hide();
   $("#divCreatedDate").hide();
   $("#divModifiedBy").hide();
   $("#divModifiedDate").hide();
   $(".delete-button").hide();
   // updateTitle(true, $('#userLogin'));
    
}  

if ($("#hidDisciplineID").val() != null && $("#hidDisciplineID").val() != "") {

    // console.log('Edit teacherIDParm >> ',teacherIDParm,' copy');
    // $('#disciplineDelete').hide();
    var objFilters = new Object();
    objFilters.disciplineID = $("#hidDisciplineID").val();
    objFilters.modifiedDate = $("#hidUserModifiedDate").val();
    objFilters.baseYearID = $('#baseYearID').val();
    getDisciplineByFilterForm(objFilters);

} else {

    // console.log('New');
    $('.card-title').text("Nova Disciplina");
    $("#divDisciplineID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

$('#disciplineDelete').click(function () {
    
    console.log('delete discipline...');

    $('#hidUserID').val($('#disciplineID').val());	
    $('#hidActionType').val("DELETE_USER");
    var messageDeleteUser = "Deseja realmente deletar a disciplina " + $('#disciplineFullName').val() + " ? ";
    $('.modal-title-delete').text("Delete User");
    $('.deleteConfirmation').attr("id",'deleteDisciplineEdit');
    $('.message-modal-delete').text(messageDeleteUser);
    $('#modalDelete').modal('show');
});

$('#modalDelete').on('click', '#deleteDisciplineEdit', function () {

    var objDelete = $('#disciplineFullName').val();
    var btnRefresh = $('#disciplinebackButton')
    deleteDiscipline(btnRefresh,objDelete) 


});


$('#disciplineSave').click(function () {
    
    console.log('disciplineSave...');
    var blnCheckForm = true;

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objDiscipline = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidDisciplineID").val() != null && $("#hidDisciplineID").val() != "")
        objDiscipline.disciplineID = $("#disciplineID").val();
    else
        objDiscipline.disciplineID = "0";


    objDiscipline.disciplineFullName = $("#disciplineFullName").val();			
    objDiscipline.disciplineFgAtv = $("#disciplineFgAtv").val();
    
    // console.log(objDiscipline);
    var regex = /[^a-zA-Z0-9 âãõêôûáéíóúç-]/;
    for (let key in objDiscipline) {

        if (objDiscipline.hasOwnProperty(key) && (objDiscipline[key] == null || objDiscipline[key] == "")) {
            // console.log(`O elemento ${key} é null, undefined ou vazio`);

            var htmlText = $('label[for="' + key + '"]').text();
            toastr.warning('O campo está vazio!',htmlText+'!');
            $('#'+key).focus();
            return

        }else if(regex.test(objDiscipline[key]) || objDiscipline[key].length <= 2 && key != 'disciplineID' &&  key != 'disciplineFgAtv'  ){
            
            console.log('key >> ',key);
            if(objDiscipline[key].length <= 2){
                console.log(key);
                var htmlText = $('label[for="' + key + '"]').text();
                toastr.warning('Mínimo 3 caracteres!',htmlText+'!');
                $('#'+key).focus();
                return
            }
            // console.log(key);
            var htmlText = $('label[for="' + key + '"]').text();
            toastr.warning('Caractere não permitido!',htmlText+'! '+objDiscipline[key]);
            $('#'+key).focus();
            return
        }

    }
    objDiscipline.baseYearID = $('#baseYearID').val();
    
    console.log('objDiscipline...1.2');
    // console.log(objDiscipline);
    saveDisicipline(objDiscipline);
    return
    
    
});
