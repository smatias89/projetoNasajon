

if (!$("#leftMenuScaleType").hasClass("active")) {
    $("#leftMenuScaleType").addClass("active");
}	

$('#scaleTypeBackButton').click(function () {

    location.href = 'scaleType';

});



 
if ($("#hidScaleTypeID").val() != null && $("#hidScaleTypeID").val() != "" && $("#hidActionType").val() == 'copy') {

    console.log('copy task...');
    $('.card-title').text("Copiar - Função");
    $("#divScaleTypeID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));

}  

if ($("#hidScaleTypeID").val() != null && $("#hidScaleTypeID").val() != "") {

    console.log('edit scaleType...');
    var objFilters = new Object();
    objFilters.scaleTypeID = $("#hidScaleTypeID").val();
    objFilters.modifiedDate = $("#hidScaleTypeModifiedDate").val();
    getScaleTypeByFilterForm(objFilters);

} else {

    console.log('new ScaleType...');
    $('.card-title').text("Nova Tipo");
    $("#divScaleTypeID").hide();
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


$('#scaleTypeSave').click(function () {
    
    console.log('scaleTypeSave...');
    var blnCheckForm = true;

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objScaleType = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidScaleTypeID").val() != null && $("#hidScaleTypeID").val() != "")
        objScaleType.scaleTypeID = $("#scaleTypeID").val();
    else
        objScaleType.scaleTypeID = "0";


    objScaleType.scaleTypeFullName = $("#scaleTypeFullName").val();			
    objScaleType.scaleTypeFgAtv = $("#scaleTypeFgAtv").val();
    
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
    
    console.log('objScaleType...1.2');
    console.log(objScaleType);
    saveScaleType(objScaleType);
    return
    
    
});
