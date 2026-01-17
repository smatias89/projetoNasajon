
loadComboProfileGetAll($("#userProfile"));
loadComboTaskGetAll($("#userTask"));
// loadComboSchoolGetAll($("#userSchool"));
// loadComboUF($("#endUF"));
// loadComboIncomeRangeGetAll($("#userIncomeRange"));
// loadComboGenderGetAll($("#userGender"));

//mask
$("#staffBirthDate").mask('9999-99-99');
$('[id*="CEP"]').mask('99999-999').attr('placeholder','_____-___');
$('[id*="CPF"]').mask('999.999.999-99').attr('placeholder','___.___.___-__');
$('[id*="Phone"]').mask('(99)99999-9999').attr('placeholder','(__)_____-____');

var userIDParm = $('#hidUserID').val();
var copyParm = $('#hidActionType').val();
var userModifiedDate = $('#hidUserModifiedDate').val();
var userPasswordChanged = false;

$('#userSchool').prop('disabled', true);


// console.log('User Id -> ' + $('#hidUserID').val());

$('#userBirthDate').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: true,
    autoApply: true,
    locale: {
        format: 'YYYY-MM-DD'
    }
}).val('');



if ($('#hidUserID').val() != null && $('#hidUserID').val() != "" && $('#hidUserID').val() != "null") {
    $('.title-user-form').text("User - " + $('#hidUserID').val());
}

if ($('#hidActionType').val() != null && $('#hidActionType').val() != "" && $('#hidActionType').val() != "null" && $('#hidActionType').val() == "copy") {
    $('.title-user-form').text("User - New User");
    $("#divUserID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

if ($('#hidUserModifiedDate').val() != null && $('#hidUserModifiedDate').val() != "" && $('#hidUserModifiedDate').val() != "null") {
    $("#hidUserModifiedDate").val($('#hidUserModifiedDate').val());
}

$('#backButton').click(function () {

    location.href = 'user';
    

});


if (!$("#leftMenuUser").hasClass("active")) {
    $("#leftMenuUser").addClass("active");
}		

if ($("#hidUserID").val() != null && $("#hidUserID").val() != "") {

    console.log('edit user... ');
    var objFilters = new Object();
    objFilters.userID = $("#hidUserID").val();
    objFilters.modifiedDate = $("#hidUserModifiedDate").val();			
    objFilters.blnProfile = '0';		//passa zero ou vazio por conta da negação 	
    objFilters.blnSchool = '0';			
    objFilters.blnAdress = '0';		
    getUserByFilterForm(objFilters);
    
} else {
    console.log('new user... ');
    $("#divUserID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));
}

$("#userPassword" ).change(function() {
    userPasswordChanged = true;
});

$('#userDelete').click(function () {
    
    // console.log('userDelete');

    $('#hidUserID').val($('#userID').val());	
    $('#hidActionType').val("DELETE_USER");
    var messageDeleteUser = "Do you confirm delete the User " + $('#userLogin').val() + " ? ";
    $('.modal-title-delete').text("Delete User");
    $('.deleteConfirmation').attr("id",'deleteUserEdit');
    $('.message-modal-delete').text(messageDeleteUser);
    $('#modalDelete').modal('show');
});
$('#modalDelete').on('click', '#deleteUserEdit', function () {

    var objDelete = $('#userFullName').val();
    var btnRefresh = $('#backButton')
    deleteUser(btnRefresh, objDelete)


});

// $('.deleteConfirmation').click(function () {
//     deleteUser(null);			
// });

$('#userLink').click(function () {
    
    console.log('userLinkLogin...');
    var blnCheckForm = true;

    /*else if ( $('#userProfile option:selected').text() == null ||$('#userProfile option:selected').text() == "--") {
        
        toastr.warning('The field is empty!', 'Profile');
        $("#userProfile").focus();
        blnCheckForm = false;

    }*/

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objUser = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidUserID").val() != null && $("#hidUserID").val() != "")
        objUser.userID = $("#userID").val();
    else
        objUser.userID = "0";

    objUser.userLogin = $("#userLogin").val();
    objUser.userFullName = $("#userFullName").val();			
    objUser.userFgAtv = $("#userFgAtv").val();
    objUser.userPassword = $("#userPassword").val();
    objUser.userPasswordChanged = userPasswordChanged.toString();     
    objUser.userEmail = $("#userEmail").val();
    objUser.userCPF = $("#userCPF").val().replace(/[.\-]/g, "");
    objUser.userIntervalDaysToExpire = $("#userIntervalDaysToExpire").val();
    objUser.userFgChangePassword = $("#userFgChangePassword").val();
    objUser.userBirthDate = $("#userBirthDate").data('daterangepicker').startDate.format('YYYY-MM-DD');
    objUser.userGenderID = $("#userGender").val();
    objUser.userPhone1 = $("#userPhone1").val();
    objUser.userPhone2 = $("#userPhone2").val();

    objUser.lstProfile = $("#userProfile").val();
    objUser.lstSchool = $("#userSchool").val();


    // if($('#userFgAtv').val() == '' || $('#userFgAtv').val() == null || $('#userFgAtv').val() == undefined ){
    //     $('#userFgAtv').focus();
    //     toastr.warning('verifique se está selecionado','Ativo:',{
    //         timeOut: 1000,
    //         preventDuplicates: true,
    //         positionClass: 'toast-top-right',
            
    //     });
    //     return
    // }

    // if($('#userPassword').val() == '' ){
    //     $('#userPassword').focus();
    //     toastr.warning('atribua um Password','Password:',{
    //         timeOut: 1000,
    //         preventDuplicates: true,
    //         positionClass: 'toast-top-right',
            
    //     });
    //     return
    // }

    // if($('#userProfile').val() == '' ){
    //     $('#userProfile').focus();
    //     toastr.warning('atribua um perfil','Perfil:',{
    //         timeOut: 1000,
    //         preventDuplicates: true,
    //         positionClass: 'toast-top-right',
            
    //     });
    //     return
    // }

    // if($('#userSchool').val() == '' ){
    //     $('#userSchool').focus();
    //     toastr.warning('Selecione uma escola','Selecione:',{
    //         timeOut: 1000,
    //         preventDuplicates: true,
    //         positionClass: 'toast-top-right',
            
    //     });
    //     return
    // }



    // console.log(objUser);
    console.log('userLink...1.2');			
    linkUser(objUser,$('#userSave'))
    
    
    
});

$('#userSave').click(function () {
    
    console.log('userSave...');
    var blnCheckForm = true;

    /*else if ( $('#userProfile option:selected').text() == null ||$('#userProfile option:selected').text() == "--") {
        
        toastr.warning('The field is empty!', 'Profile');
        $("#userProfile").focus();
        blnCheckForm = false;

    }*/

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objUser = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidUserID").val() != null && $("#hidUserID").val() != "")
        objUser.userID = $("#userID").val();
    else
        objUser.userID = "0";

    objUser.userLogin = $("#userLogin").val();
    objUser.userFullName = $("#userFullName").val();			
    objUser.userFgAtv = $("#userFgAtv").val();
    objUser.userPassword = $("#userPassword").val();
    objUser.userPasswordChanged = userPasswordChanged.toString();     
    objUser.userEmail = $("#userEmail").val();
    objUser.userCPF = $("#userCPF").val().replace(/[.\-]/g, "");
    objUser.userIntervalDaysToExpire = $("#userIntervalDaysToExpire").val();
    objUser.userFgChangePassword = $("#userFgChangePassword").val();
    objUser.userBirthDate = $("#userBirthDate").data('daterangepicker').startDate.format('YYYY-MM-DD');
    objUser.userPhone1 = $("#userPhone1").val();
    objUser.userPhone2 = $("#userPhone2").val();
    
    objUser.lstProfile = $("#userProfile").val();
    objUser.lstTask = $("#userTask").val();
    objUser.lstHandScale = $("#userScale").val();
    
    // objUser.userGenderID = $("#userGender").val();
    // if($("#userSchool").val() == '' ){
    //     $('#userSchool').focus();
    //     toastr.warning('Selecione uma escola','Selecione:',{
    //         timeOut: 1000,
    //         preventDuplicates: true,
    //         positionClass: 'toast-top-right',
            
    //     });
    //     return
    // }


    // console.log(objUser);
    console.log('userSave...1.2');		
    // console.log(objUser);	
    saveUser(objUser);
    
    
});

$("#userProfile").select2({
    placeholder: 'Select',
    dropdownAdapter: $.fn.select2.amd.require('select2/selectAllAdapter')
});

$("#userTask").select2({
    placeholder: 'Select',
    dropdownAdapter: $.fn.select2.amd.require('select2/selectAllAdapter')
});