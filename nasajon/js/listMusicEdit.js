// console.log('disciplineEdit...') 0807;

//loadCombos
// loadComboBaseYearGetAll($('#baseYearID'));

if (!$("#leftMenuListmusic").hasClass("active")) {
    $("#leftMenuListmusic").addClass("active");
}	

$('#listMusicBackButton').click(function () {

    location.href = 'listMusic';

});



 
if ($("#hidListMusicID").val() != null && $("#hidListMusicID").val() != "" && $("#hidActionType").val() == 'copy') {

    console.log('copy listMusic...');
    $('.card-title').text("Copiar - Musica");
    $("#divlistMusicID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));

}  

if ($("#hidListMusicID").val() != null && $("#hidListMusicID").val() != "") {

    console.log('edit ListMusic...');
    var objFilters = new Object();
    objFilters.listMusicID = $("#hidListMusicID").val();
    objFilters.modifiedDate = $("#hidListMusicModifiedDate").val();
    getListMusicByFilterForm(objFilters);

} else {

    console.log('new task...');
    $('.card-title').text("Nova Música");
    $("#divListMusicID").hide();
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


$('#listMusicSave').click(function () {
    
    console.log('listMusicSave...');
    var blnCheckForm = true;

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objListMusic = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidListMusicID").val() != null && $("#hidListMusicID").val() != "")
        objListMusic.listMusicID = $("#listMusicID").val();
    else
        objListMusic.listMusicID = "0";


    objListMusic.singer = $("#listMusicSinger").val();			
    objListMusic.fullName = $("#listMusicFullName").val();			
    objListMusic.link = $("#listMusicLink").val();			
    objListMusic.key = $("#listMusicKey").val();
    objListMusic.fgAtv = $("#listMusicFgAtv").val();
    
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
    
    console.log('objListMusic...1.2');
    console.log(objListMusic);
    saveListMusic(objListMusic);
    return
    
    
});



$('#btnListMusicSearchYouTube').on('click', function () {
    $('#listMusicSinger').val();
    $('#listMusicFullName').val();
    $('#listMusicKey').val('original').trigger('change');

    const url = $('#listMusicLink').val();
    const videoId = extrairVideoId(url);

    getMusicByLinkYouTube(videoId)


});


