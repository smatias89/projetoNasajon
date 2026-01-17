// console.log('teacherEdit...0605');
//Initialize Select2 Elements
$('.select2').select2()

//Initialize Select2 Elements
$('.select2bs4').select2({
    theme: 'bootstrap4'
})

//MASKS
$('[id*="Birth"]').attr('placeholder','AAAA-MM-DD') //.mask('9999-99-99')
$('[id*="CEP"]').mask('99999-999').attr('placeholder','_____-___');
$('[id*="CPF"]').mask('999.999.999-99').attr('placeholder','___.___.___-__');
$('[id*="Phone"]').mask('(99)99999-9999').attr('placeholder','(__)_____-____');


//LOADCOMBO

loadComboGraduationGetAll($("#teacherGrad"));
loadComboDisciplineGetAll($("#teacherDiscipline"));
loadComboUF($("#teacherAdressUF"));
loadComboGenderGetAll($("#teacherGender"));
loadComboUF($("#endUF"));


$('#teacherBirthDate').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: true,
    autoApply: true,
    locale: {
        format: 'YYYY-MM-DD'
    }
}).val('');

// $('#teacherFullName').on("input", function(){
    
//     updateTitle(false, $(this));
    
// });

$('#teacherCPF').keypress(function(event) {

    if (event.key === "Enter") {
        var teacherCPF = $('#teacherCPF').val();
        if (teacherCPF == '' || teacherCPF == null || teacherCPF == undefined) {
            
            toastr.warning('O campo está vazio!', 'CPF');
            $('#teacherCPF').focus();
            return
        } 
    
        teacherCPF = teacherCPF.split(".").join("");
        teacherCPF = teacherCPF.split("-").join("");
    
        if(teacherCPF.length < 11){
            toastr.warning('Confira o campo!', 'CPF');
            $('#teacherCPF').focus();
            return
        }
        searchCPF(teacherCPF, "teacher");
    }
});	

$('#teacherAdressCEP').keypress(function(event) {

        if (event.key === "Enter") {
            var teacherAdressCEP = $('#teacherAdressCEP').val();
            if (teacherAdressCEP == '' || teacherAdressCEP == null || teacherAdressCEP == undefined) {
    
                toastr.warning('O campo está vazio!', 'CEP');
                $('#teacherAdressCEP').focus();
                return
            } 
            teacherAdressCEP = teacherAdressCEP.split("-").join("");
            if(teacherAdressCEP.length < 8){
                toastr.warning('Confira o campo!', 'CEP');
                $('#teacherAdressCEP').focus();
                return
            }
            loadCEP(teacherAdressCEP);
        }
        loadCEP($('#teacherAdressCEP').val());

});	

if ($('#hidTeacherID').val() != null && $('#hidTeacherID').val() != "" && $('#hidTeacherID').val() != "null") {
    $('.title-teacher-form').text("Teacher - " + $('#hidTeacherID').val());
}

if ($('#hidActionType').val() != null && $('#hidActionType').val() != "" && $('#hidActionType').val() != "null" && $('#hidActionType').val() == "copy") {
    $('.title-teacher-form').text("Teacher - New Teacher");
    $("#divTeacherID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

if ($('#hidTeacherModifiedDate').val() != null && $('#hidTeacherModifiedDate').val() != "" && $('#hidTeacherModifiedDate').val() != "null") {
    $("#hidTeacherModifiedDate").val($('#hidTeacherModifiedDate').val());
}

$('.back-button').click(function () {

    location.href = 'teacher';
    //closeActiveTab();

});

$('#btnSearchCEP').click(function () {

    var varCEP = $('#endCEP').val();
    if (varCEP == '' || varCEP == null || varCEP == undefined) {
        
        toastr.warning('O campo está vazio!', 'CEP');
        $('#endCEP').focus();
        return
    } 
    varCEP = varCEP.split("-").join("");
    if(varCEP.length < 8){
        toastr.warning('Confira o campo!', 'CEP');
        $('#endCEP').focus();
        return
    }
    loadCEP(varCEP);

});

$('#btnSearchCPF').click(function () {

    console.log('btnSearchCPF...');

    var varCPF = $('#teacherCPF').val();
    if (varCPF == '' || varCPF == null || varCPF == undefined) {
        
        toastr.warning('O campo está vazio!', 'CPF');
        $('#teacherCPF').focus();
        return
    } 

    varCPF = varCPF.split(".").join("");
    varCPF = varCPF.split("-").join("");

    if(varCPF.length < 11){
        toastr.warning('Confira o campo!', 'CPF');
        $('#teacherCPF').focus();
        return
    }
    
    searchCPF(varCPF, "teacher");

});


if (!$("#leftMenuTeacher").hasClass("active")) {
    $("#leftMenuTeacher").addClass("active");
}		

if ($("#hidTeacherID").val() != null && $("#hidTeacherID").val() != "") {

    
    // console.log('Propriedades');
    $('#divUserID').hide();
    
    var objFilters = new Object();
    objFilters.teacherID = $("#hidTeacherID").val();
    objFilters.modifiedDate = $("#hidTeacherModifiedDate").val();			
    getTeacherByFilterForm(objFilters);
    
} else {
    // console.log('Novo');
    $("#divUserID").hide();
    $("#divTeacherID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#teacherName'));
}

$('#teacherDelete').click(function () {
    
    $('#hidTeacherID').val($('#teacherID').val());	
    $('#hidActionType').val("DELETE_TEACHER");
    var messageDelete = "Deseja realmente deletar: " + $('#teacherFullName').val() + " ? ";
    $('.modal-title-delete').text("Deletar Docente");
    $('.message-modal-delete').text(messageDelete);
    $('#modalDelete').modal('show');

});

$('.deleteConfirmation').click(function () {
    deleteTeacher(null);			
});


$('#endCity').dblclick(function () { 
    // console.log(this);
    $(this).prop('readonly', false);
    
});

$("#endCity").blur(function () { 
    $(this).prop('readonly', true);
    
});

$('[for= "endUF"]').dblclick(function () { 
    // console.log(this);
    $('#endUF').prop('disabled', false);
    setTimeout(function(){
        $('#endUF').prop('disabled', true);
    },10*1000)
    
});



$('#teacherSave').click(function () {
    
    console.log('teacherEditSave...');

    var blnCheckForm = true;

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }
    

    var objTeacher = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#teacherID").val() != null && $("#teacherID").val() != "") {
        objTeacher.teacherID = $("#teacherID").val();
        objTeacher.userID = $("#userID").val();
    } else {
        objTeacher.teacherID = "0";
        objTeacher.userID = "0";
    }

    objTeacher.teacherCPF = $("#teacherCPF").val().replace(/[.\-]/g, "");
    objTeacher.teacherFullName = $("#teacherFullName").val();
    objTeacher.teacherEmail = $("#teacherEmail").val()
    objTeacher.teacherBirthDate = $("#teacherBirthDate").data('daterangepicker').startDate.format('YYYY-MM-DD');
    objTeacher.teacherFgAtv = $("#teacherFgAtv").val();
    objTeacher.teacherGender = $("#teacherGender").val();
    objTeacher.teacherGrad = $("#teacherGrad").val();
    objTeacher.teacherDiscipline = $("#teacherDiscipline").val();
    objTeacher.teacherPhone1 = $("#teacherPhone1").val().split(/[\(\)\-\s]+/).join("");
    objTeacher.endCEP = $("#endCEP").val().split("-").join("");
    objTeacher.endStreet = $("#endStreet").val();
    objTeacher.endStreetNumber = $("#endStreetNumber").val();
    objTeacher.endDistrict = $("#endDistrict").val();
    objTeacher.endCity = $("#endCity").val();
    objTeacher.endUF = $("#endUF").val();
    objTeacher.endCodIBGE = $("#endCodIBGE").val();

    
    var regex = /[^a-zA-Z0-9 âÃãõçêôûáéíóú]/;
    for (let key in objTeacher) {

        // console.log(key,' key');
        
        if (objTeacher.hasOwnProperty(key) && (objTeacher[key] == null || objTeacher[key] == "") && key != 'teacherPhone2' && key != 'endStreetComplement' ) {
            
            // console.log(`O elemento ${key} é null, undefined ou vazio`);
            var htmlText = $('label[for="' + key + '"]').text();
            toastr.warning('O campo está vazio!',htmlText+'!');
            $('#'+key).focus();
            return

        }else if(regex.test(objTeacher[key] && key != 'teacherEmail' && key != 'teacherBirthDate')){
            
            // console.log('key>> ',key);
            // console.log(key);
            var htmlText = $('label[for="' + key + '"]').text();
            toastr.warning('Caractere não permitido!',htmlText+'! '+objTeacher[key]);
            $('#'+key).focus();
            return

        }

    }
    objTeacher.teacherPhone2 = $("#teacherPhone2").val().split(/[\(\)\-\s]+/).join("");
    objTeacher.endStreetComplement = $("#endStreetComplement").val();


    //validação e-mail
    var regex = /[^a-zA-Z0-9 @._-]/;
    if(regex.test(objTeacher.teacherEmail)){
        // console.log('especial key >> ', objTeacher.teacherEmail);
        toastr.warning('Caractere não permitido!', ' Email '+objTeacher.teacherEmail);
        $("#teacherEmail").focus();
        return
    }

    //validação nomes
    var regex = /[^a-zA-Z âãõêôûáéíóú]/; 
    if(regex.test(objTeacher.teacherFullName)){
        // console.log('especial key >> ', objTeacher.teacherFullName);
        toastr.warning('Caractere não permitido!', 'Nome '+objTeacher.teacherFullName);
        $("#teacherFullName").focus();
        return

    } 
    //validação Contato
    var regex = /[^0-9]/
    if(regex.test(objTeacher.teacherPhone1) && objTeacher.teacherPhone1 != ''){
        // console.log('especial key >> ', objTeacher.teacherPhone1);
        toastr.warning('Caractere não permitido!', 'Telefone 1 '+objTeacher.teacherPhone1);
        $("#teacherPhone1").focus();
        return

    } else if(regex.test(objTeacher.teacherPhone2) && objTeacher.teacherPhone2 != ''){
        // console.log('especial key >> ', objTeacher.teacherPhone2);
        toastr.warning('Caractere não permitido!', 'Telefone 2 '+objTeacher.teacherPhone2);
        $("#teacherPhone2").focus();
        return

    } 
    var regex = /[^a-zA-Z0-9 âãõêôûáéíóú.-:ºª]/;
    if(regex.test(objTeacher.endStreetComplement)){
        // console.log('especial key >> ', objTeacher.endStreetComplement);
        toastr.warning('Caractere não permitido!', 'Complemento '+objTeacher.endStreetComplement);
        $("#endStreetComplement").focus();
        return
    }

    
    if(checkBirthDate(objTeacher.teacherBirthDate).status == 'error'){

        toastr.warning('Data invalida!', 'Data '+objTeacher.teacherBirthDate);
        $("#teacherBirthDate").focus();
        return
    }
    
    console.log('objTeacher Save...3..2..1');	
    //console.log(objTeacher); toastr.warning('no save'); return
    saveTeacher(objTeacher);
    
    return

    
});

