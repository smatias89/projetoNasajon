// console.log('disciplineEdit...') 0807;

//loadCombos
// loadComboBaseYearGetAll($('#baseYearID'));

if (!$("#leftMenuTask").hasClass("active")) {
    $("#leftMenuTask").addClass("active");
}	

$('#taskBackButton').click(function () {

    location.href = 'task';

});



 
if ($("#hidTaskID").val() != null && $("#hidTaskID").val() != "" && $("#hidActionType").val() == 'copy') {

    console.log('copy task...');
    $('.card-title').text("Copiar - Função");
    $("#divTaskID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));

}  

if ($("#hidTaskID").val() != null && $("#hidTaskID").val() != "") {

    console.log('edit task...');
    var objFilters = new Object();
    objFilters.taskID = $("#hidTaskID").val();
    objFilters.modifiedDate = $("#hidTaskModifiedDate").val();
    getTaskByFilterForm(objFilters);

} else {

    console.log('new task...');
    $('.card-title').text("Nova Função");
    $("#divTaskID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

// $('#disciplineDelete').click(function () {
    
//     console.log('delete discipline...');

//     $('#hidUserID').val($('#disciplineID').val());	
//     $('#hidActionType').val("DELETE_USER");
//     var messageDeleteUser = "Deseja realmente deletar a disciplina " + $('#disciplineFullName').val() + " ? ";
//     $('.modal-title-delete').text("Delete User");
//     $('.deleteConfirmation').attr("id",'deleteDisciplineEdit');
//     $('.message-modal-delete').text(messageDeleteUser);
//     $('#modalDelete').modal('show');
// });

$('#modalDelete').on('click', '#deleteDisciplineEdit', function () {

    var objDelete = $('#disciplineFullName').val();
    var btnRefresh = $('#disciplinebackButton')
    deleteDiscipline(btnRefresh,objDelete) 


});


$('#taskSave').click(function () {
    
    console.log('taskSave...');
    var blnCheckForm = true;

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objTask = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidTaskID").val() != null && $("#hidTaskID").val() != "")
        objTask.taskID = $("#taskID").val();
    else
        objTask.taskID = "0";


    objTask.taskFullName = $("#taskFullName").val();			
    objTask.taskFgAtv = $("#taskFgAtv").val();
    
    // console.log(objDiscipline);
    // var regex = /[^a-zA-Z0-9 âãõêôûáéíóúç-]/;
    // for (let key in objDiscipline) {

    //     if (objDiscipline.hasOwnProperty(key) && (objDiscipline[key] == null || objDiscipline[key] == "")) {
    //         // console.log(`O elemento ${key} é null, undefined ou vazio`);

    //         var htmlText = $('label[for="' + key + '"]').text();
    //         toastr.warning('O campo está vazio!',htmlText+'!');
    //         $('#'+key).focus();
    //         return

    //     }else if(regex.test(objDiscipline[key]) || objDiscipline[key].length <= 2 && key != 'disciplineID' &&  key != 'disciplineFgAtv'  ){
            
    //         console.log('key >> ',key);
    //         if(objDiscipline[key].length <= 2){
    //             console.log(key);
    //             var htmlText = $('label[for="' + key + '"]').text();
    //             toastr.warning('Mínimo 3 caracteres!',htmlText+'!');
    //             $('#'+key).focus();
    //             return
    //         }
    //         // console.log(key);
    //         var htmlText = $('label[for="' + key + '"]').text();
    //         toastr.warning('Caractere não permitido!',htmlText+'! '+objDiscipline[key]);
    //         $('#'+key).focus();
    //         return
    //     }

    // }
    // objDiscipline.baseYearID = $('#baseYearID').val();
    
    console.log('objDiscipline...1.2');
    // console.log(objDiscipline);
    saveTask(objTask);
    return
    
    
});
