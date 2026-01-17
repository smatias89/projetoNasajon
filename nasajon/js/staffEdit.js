//MASKs
// $('[id*="RG"]').mask('99.999.999-9').attr('placeholder','__.___.___-_');
$('[id*="Birth"]').mask('9999-99-99').attr('placeholder','AAAA-MM-DD')
$('[id*="CEP"]').mask('99999-999').attr('placeholder','_____-___');
$('[id*="CPF"]').mask('999.999.999-99').attr('placeholder','___.___.___-__');
$('[id*="Phone"]').mask('(99)99999-9999').attr('placeholder','(__)_____-____');

var staffIDParm = $('#hidStaffID').val();
var copyParm = $('#hidActionType').val();
var staffModifiedDate = $('#hidStaffModifiedDate').val();

// console.log(staffIDParm,'<<<<staffIDParm');
//load combos
loadComboUF($("#endUF"));
loadComboIncomeRangeGetAll($("#staffIncomeRange"));
loadComboGenderGetAll($("#staffGender"));
loadComboSegmentGetAll($('#staffSegment'),true);

$('#staffBirthDate').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: true,
    autoApply: true,
    locale: {
        format: 'YYYY-MM-DD'
    }
}).val('');

// console.log('Staff Id -> ' + $('#hidStaffID').val());

// $('#staffName').on("input", function(){
    
//     updateTitle(false, $(this));
    
// });

$('#staffCPF').keypress(function(event) {

    if (event.key === "Enter") {

        var staffCPF = $('#staffCPF').val();
        if (staffCPF == '' || staffCPF == null || staffCPF == undefined) {
            
            toastr.warning('O campo está vazio!', 'CPF');
            $('#staffCPF').focus();
            return
        } 
    
        // staffCPF = staffCPF.replace(/[.\-]/g, "");
        staffCPF = staffCPF.split(".").join("");
        staffCPF = staffCPF.split("-").join("");
    
        if(staffCPF.length < 11){
            toastr.warning('Confira o campo!', 'CPF');
            $('#staffCPF').focus();
            return
        }
        searchCPF(staffCPF, "staff");
    }
});	

$('#endCEP').keypress(function(event) {

    if (event.key === "Enter") {
        var endCEP = $('#endCEP').val();
        if (endCEP == '' || endCEP == null || endCEP == undefined) {

            toastr.warning('O campo está vazio!', 'CEP');
            $('#endCEP').focus();
            return
        } 
        endCEP = endCEP.split("-").join("");
        if(endCEP.length < 8){
            toastr.warning('Confira o campo!', 'CEP');
            $('#endCEP').focus();
            return
        }
        loadCEP(endCEP);
    }
});	

if ($('#hidStaffID').val() != null && $('#hidStaffID').val() != "" && $('#hidStaffID').val() != "null") {
    $('.title-staff-form').text("Staff - " + $('#hidStaffID').val());
}

if ($('#hidActionType').val() != null && $('#hidActionType').val() != "" && $('#hidActionType').val() != "null" && $('#hidActionType').val() == "copy") {
    $('.title-staff-form').text("Staff - New Staff");
    $("#divStaffID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

if ($('#hidStaffModifiedDate').val() != null && $('#hidStaffModifiedDate').val() != "" && $('#hidStaffModifiedDate').val() != "null") {
    $("#hidStaffModifiedDate").val($('#hidStaffModifiedDate').val());
}

$('#backButton').click(function () {

    location.href = 'staff';
    //closeActiveTab();

});

$('#btnSearchCEP').click(function () {

    var endCEP = $('#endCEP').val();
    if (endCEP == '' || endCEP == null || endCEP == undefined) {
        
        toastr.warning('O campo está vazio!', 'CEP');
        $('#endCEP').focus();
        return
    } 
    endCEP = endCEP.split("-").join("");
    if(endCEP.length < 8){
        toastr.warning('Confira o campo!', 'CEP');
        $('#endCEP').focus();
        return
    }
    loadCEP(endCEP);

});

$('#btnSearchCPF').click(function () {

    var staffCPF = $('#staffCPF').val();
    if (staffCPF == '' || staffCPF == null || staffCPF == undefined) {
        
        toastr.warning('O campo está vazio!', 'CPF');
        $('#staffCPF').focus();
        return
    } 

    // staffCPF = staffCPF.replace(/[.\-]/g, "");
    staffCPF = staffCPF.split(".").join("");
    staffCPF = staffCPF.split("-").join("");

    if(staffCPF.length < 11){
        toastr.warning('Confira o campo!', 'CPF');
        $('#staffCPF').focus();
        return
    }
    searchCPF(staffCPF, "staff");

});


if (!$("#leftMenuStaff").hasClass("active")) {
    $("#leftMenuStaff").addClass("active");
}		

if ($("#hidStaffID").val() != null && $("#hidStaffID").val() != "") {

    var objFilters = new Object();
    objFilters.staffID = $("#hidStaffID").val();
    objFilters.modifiedDate = $("#hidStaffModifiedDate").val();			
    getStaffByFilterForm(objFilters);
    
} else {
    $("#divStaffID").hide();
    $("#divUserID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#staffName'));
}

$('#staffDelete').click(function () {
    
    // console.log('staffDelete');

    $('#hidStaffID').val($('#staffID').val());	
    $('#hidActionType').val("DELETE_SCHOOL");
    var messageDeleteStaff = "Do you confirm delete the Staff " + $('#staffName').val() + " ? ";
    $('.modal-title-delete').text("Delete Staff");
    $('.message-modal-delete').text(messageDeleteStaff);
    $('#modalDelete').modal('show');
});

$('.deleteConfirmation').click(function () {
    deleteStaff(null);			
});

$('#endCity').dblclick(function () { 
    console.log(this);
    $(this).prop('readonly', false);
    
});

$("#endCity").blur(function () { 
    $(this).prop('readonly', true);
    
});

$('[for= "endUF"]').dblclick(function () { 
    console.log(this);
    $('#endUF').prop('disabled', false);
    setTimeout(function(){
        $('#endUF').prop('disabled', true);
    },10*1000)
    
});



$('#staffSave').click(function () {
    
    console.log('staffSave...');
    var blnCheckForm = true;
    // apenas esse por conta do obj settar
    if ($('#staffBirthDate').val() == null || $('#staffBirthDate').val() == "" ) {
       
        toastr.warning('O campo está vazio!', 'Data Nasc');
        $("#staffBirthDate").focus();
        blnCheckForm = false;
    }

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }
    

    var objStaff = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidStaffID").val() != null && $("#hidStaffID").val() != "") {
        objStaff.staffID = $("#staffID").val();
        objStaff.userID = $("#userID").val();
    } else {
        objStaff.staffID = "0";
        objStaff.userID = "0";
    }

    objStaff.fullName = $("#staffFullName").val();
    objStaff.staffSegment = $("#staffSegment").val();
    objStaff.email = $("#staffEmail").val();
    objStaff.staffCPF = $("#staffCPF").val().replace(/[.\-]/g, "");
    objStaff.staffBirthDate = $("#staffBirthDate").data('daterangepicker').startDate.format('YYYY-MM-DD');
    objStaff.staffMotherName = $("#staffMotherName").val();
    objStaff.staffGenderID = $("#staffGender").val();
    // concatenando staffPhone1
    objStaff.staffPhone1 = $("#staffPhone1").val();
    objStaff.staffPhone1 = (objStaff.staffPhone1).split("-").join("");
    objStaff.staffPhone1 = (objStaff.staffPhone1).split("(").join("");
    objStaff.staffPhone1 = (objStaff.staffPhone1).split(")").join("");

    // concatenando endCEP
    objStaff.endCEP = $("#endCEP").val();
    objStaff.endCEP = (objStaff.endCEP).split("-").join("");

    objStaff.endStreet = $("#endStreet").val();
    objStaff.endStreetNumber = $("#endStreetNumber").val();
    objStaff.endDistrict = $("#endDistrict").val();
    objStaff.endCity = $("#endCity").val();
    objStaff.endUF = $("#endUF").val();
    objStaff.endCodIBGE = $("#endCodIBGE").val();

    for (let key in objStaff) {

        // console.log(key,' key');
        if (key == 'staffGenderID' && $('#staffGender').val() == '' ){ 
            
            // console.log('especial key >> ', key);
            toastr.warning('O campo está vazio!', 'Sexo');
            $("#staffGender").focus();
            return
        }

        if (objStaff.hasOwnProperty(key) && (objStaff[key] == null || objStaff[key] == "")) {
            // console.log(`O elemento ${key} é null, undefined ou vazio`);

            if(key == 'fullName' && $('#staffFullName').val() == null || $('#staffFullName').val() == "" ){ 
                
                // console.log('especial key >> ', key);
                toastr.warning('O campo está vazio!', 'Staff Name');
                $("#staffFullName").focus();
                return
            }else if (key == 'email' && $('#staffEmail').val() == null || $('#staffEmail').val() == "" ){ 
                
                // console.log('especial key >> ', key);
                toastr.warning('O campo está vazio!', 'Staff Email');
                $("#staffEmail").focus();
                return

            }
            var htmlText = $('label[for="' + key + '"]').text();
            toastr.warning('O campo está vazio!',htmlText+'!');
            $('#'+key).focus();
            return
        }
    }


    // campos não obrigatórios
    objStaff.staffSocialName = $("#staffSocialName").val();
    objStaff.staffPhone2 = $("#staffPhone2").val();
    objStaff.staffPhone2 = (objStaff.staffPhone2).split("-").join("");
    objStaff.staffPhone2 = (objStaff.staffPhone2).split("(").join("");
    objStaff.staffPhone2 = (objStaff.staffPhone2).split(")").join("");
    objStaff.endStreetComplement = $("#endStreetComplement").val();
    objStaff.staffIncomeRangeID = $("#staffIncomeRange").val();
    objStaff.staffFatherName = $("#staffFatherName").val();
    
    var regex = /[^a-zA-Z0-9 @.âãõêôûáéíóú]/;
    for (let key in objStaff) {
        // console.log(key,' key');
        // console.log(regex.test(objStaff[key]));
        if (key == 'email' || key == 'staffBirthDate' ){ 
                
            // console.log('seguiu com especial key >> ', key);
            // return;
        }else if(regex.test(objStaff[key])){
            console.log(`o campo ${key} tem caractere especial`);
            if(key == 'fullName'){ 
                
                // console.log('especial key >> ', key);
                toastr.warning('Caractere não permitido!', 'Staff Name');
                $("#staffFullName").focus();
                return
            }
            var htmlText = $('label[for="' + key + '"]').text();
            toastr.warning('Caractere não permitido!',htmlText+'!');
            $('#'+key).focus();
            return
        }
        
    }
    //validação nomes
    var regex = /[^a-zA-Z âãõêôûáéíóú]/
    if(regex.test(objStaff.fullName)){
        // console.log('especial key >> ', objStaff.fullName);
        toastr.warning('Caractere não permitido!', 'Staff Name');
        $("#staffFullName").focus();
        return

    } else if(regex.test(objStaff.staffFatherName)){
        // console.log('especial key >> ', objStaff.staffFatherName);
        toastr.warning('Caractere não permitido!', 'Staff Pai');
        $("#staffFatherName").focus();
        return
    
    } else if(regex.test(objStaff.staffFatherName)){
        // console.log('especial key >> ', objStaff.staffFatherName);
        toastr.warning('Caractere não permitido!', 'Staff Name');
        $("#staffMotherName").focus();
        return
    }
    
    var regex = /[^a-zA-Z0-9 âãõêôûáéíóú.-:ºª]/;
    if(regex.test(objStaff.endStreetComplement)){
        // console.log('especial key >> ', objStaff.endStreetComplement);
        toastr.warning('Caractere não permitido!', 'Staff Complemento');
        $("#endStreetComplement").focus();
        return
    }
    //validação e-mail
    var regex = /[^a-zA-Z0-9 @._-]/;
    if(regex.test(objStaff.email)){
        // console.log('especial key >> ', objStaff.email);
        toastr.warning('Caractere não permitido!', 'Staff Email');
        $("#staffEmail").focus();
        return
    }

    //Validação data
    const toDay = new Date();
    var YYYY = toDay.getFullYear();
    var MM = toDay.getMonth() + 1;
    var DD = toDay.getDate();
    MM = MM < 10 ? '0' + MM : MM;
    DD = DD < 10 ? '0' + DD : DD;


    const blnCheckBirthDate = `${YYYY}-${MM}-${DD}`;

    if(objStaff.staffBirthDate >= blnCheckBirthDate || objStaff.staffBirthDate <= '1900-01-01'){
        // toastr.warning('Data invalida!', 'Data '+objStaff.staffBirthDate);
        $("#staffBirthDate").focus();
        return
    }

    console.log(objStaff);
    console.log('staffSave...1.2');			
    saveStaff(objStaff);
    return
    
});