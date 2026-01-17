console.log('student');

//MASKs
$('#studentRegistrationDate').mask('9999-99-99').attr('placeholder','AAAA-MM-DD')
$('[id*="Birth"]').mask('9999-99-99').attr('placeholder','AAAA-MM-DD')
$('[id*="CEP"]').mask('99999-999').attr('placeholder','_____-___');
$('[id*="CPF"]').mask('999.999.999-99').attr('placeholder','___.___.___-__');
$('[id*="Phone"]').mask('(99)99999-9999').attr('placeholder','(__)_____-____');

//LoadCombo
loadComboUF($("#endUF"));
loadComboUF($("#endUFOther"));
loadComboUF($("#endUFFather"));
loadComboUF($("#endUFMother"));
loadComboGenderGetAll($("#studentGender"));
loadComboSegmentGetAll($("#studentSegment"));
loadComboClassRoomGetAll($("#studentClassRoom"));
loadComboResponsibleTypeGetAll($("#studentResponsiblePedagogical"));
loadComboResponsibleTypeGetAll($("#studentResponsibleFinancial"));
loadComboBaseYearGetAll($('#baseYearID'));



$('#studentRegistrationDate, #studentBirthDate').daterangepicker({
    singleDatePicker: true,
    autoUpdateInput: true,
    autoApply: true,
    locale: {
        format: 'YYYY-MM-DD'
    }
}).val('');
// objIncident.analysisDate = $("#studentEditRegistrationDate").data('daterangepicker').startDate.format('YYYY-MM-DD');

$('#studentbackButton').click(function () {

    location.href = 'student';

});

if (!$("#leftMenuStudent").hasClass("active")) {
    $("#leftMenuStudent").addClass("active");
}	

$('#studentDelete').click(function () {
    
    console.log('studentEditDelete... ');
    // toastr.warning('Em desenvolvimento','Atenção!')

    $('#hidUserID').val($('#userID').val());	
    $('#hidActionType').val("DELETE_USER");
    var messageDeleteUser = "Deseja deletar o estudante " + $('#studentFullName').val() + " ? ";
    $('.modal-title-delete').text("Delete User");
    $('.deleteConfirmation').attr("id",'deleteStudenteEdit');
    $('.message-modal-delete').text(messageDeleteUser);
    $('#modalDelete').modal('show');
});

$('#modalDelete').on('click', '#deleteStudenteEdit', function () {

    var objDelete = $('#disciplineFullName').val();
    var btnRefresh = $('#disciplinebackButton')
    deleteDiscipline(btnRefresh,objDelete) 


});




if ($("#hidStudentID").val() != null && $("#hidStudentID").val() != "") {

    // $(".delete-button").hide();
    // console.log('Propriedades');
    $("#divStudentID").show();
    $("#divUserID").show();
    
    
    var objFilters = new Object();
    objFilters.studentID = $("#hidStudentID").val();
    objFilters.modifiedDate = $("#hidStudentModifiedDate").val();			
    getStudentByFilterForm(objFilters);
    
} else {
    // console.log('Novo');
    $("#divStudentID").hide();
    $("#divUserID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#teacherName'));
}


$('[id*= "CPF"]').keypress(function (e) { 
    
    // console.log('e.id',this.id);
    if(this.id == 'studentCPF')
        validationSearchCPF(this.id)// $('#btnSearchCPFStudent').click(); 

    else if( this.id == 'studentFatherCPF')
        validationSearchCPF(this.id) //$('#btnSearchCPFFather').click();

    else if(this.id == 'studentMotherCPF')
        validationSearchCPF(this.id) // $('#btnSearchCPFMother').click();

    else if(this.id == 'studentOtherCPF')
        validationSearchCPF(this.id) //$('#btnSearchCPFOther').click();
});

$('[id*= "CPF"]').blur(function (e) { 
    
    validationSearchCPF(this.id)// $('#btnSearchCPFStudent').click(); 


    // else if(this.id == 'studentOtherCPF')
    //     validationSearchCPF(this.id) //$('#btnSearchCPFOther').click();
});

$('[id*= "btnSearchCPF"]').click(function () {


    if(this.id == 'btnSearchCPFStudent'){
          
        var varCPF = $('#studentCPF').val();
        validationSearchCPF('studentCPF')

    }else if(this.id == 'btnSearchCPFFather'){

        var varCPF = $('#studentFatherCPF').val();
        if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
            toastr.warning('O campo está vazio!', 'CPF');
            $('#studentFatherCPF').focus();
            return
        } 
        
        varCPF = varCPF.split(".").join("");
        varCPF = varCPF.split("-").join("");
        
        if(varCPF.length < 11){
            toastr.warning('Confira o campo!', 'CPF');
            $('#studentFatherCPF').focus();
            return
        }
        // console.log(varCPF);
        searchCPF(varCPF, "studentFather");

    }else if(this.id == 'btnSearchCPFMother'){

        var varCPF = $('#studentMotherCPF').val();
        if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
            toastr.warning('O campo está vazio!', 'CPF');
            $('#studentMotherCPF').focus();
            return
        } 
        
        varCPF = varCPF.split(".").join("");
        varCPF = varCPF.split("-").join("");
        
        if(varCPF.length < 11){
            toastr.warning('Confira o campo!', 'CPF');
            $('#studentMotherCPF').focus();
            return
        }
        // console.log(varCPF);
        searchCPF(varCPF, "studentMother");

    }else if(this.id == 'btnSearchCPFOther'){

        var varCPF = $('#studentOtherCPF').val();
        if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
            toastr.warning('O campo está vazio!', 'CPF');
            $('#studentOtherCPF').focus();
            return
        } 
        
        varCPF = varCPF.split(".").join("");
        varCPF = varCPF.split("-").join("");
        
        if(varCPF.length < 11){
            toastr.warning('Confira o campo!', 'CPF');
            $('#studentOtherCPF').focus();
            return
        }
        // console.log(varCPF);
        searchCPF(varCPF, "studentOther");

    }
    else if(this.id == 'btnSearchCPFPedagogical'){

        var varCPF = $('#studentResponsiblePedagogicalCPF').val();
        if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
            toastr.warning('O campo está vazio!', 'CPF');
            $('#studentResponsiblePedagogicalCPF').focus();
            return
        } 
        
        varCPF = varCPF.split(".").join("");
        varCPF = varCPF.split("-").join("");
        
        if(varCPF.length < 11){
            toastr.warning('Confira o campo!', 'CPF');
            $('#studentResponsiblePedagogicalCPF').focus();
            return
        }
        // console.log(varCPF);
        searchCPF(varCPF, "studentResponsiblePedagogical");

    }else if(this.id == 'btnSearchCPFFinancial'){

        var varCPF = $('#studentResponsibleFinancialCPF').val();
        if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
            toastr.warning('O campo está vazio!', 'CPF');
            $('#studentResponsibleFinancialCPF').focus();
            return
        } 
        
        varCPF = varCPF.split(".").join("");
        varCPF = varCPF.split("-").join("");
        
        if(varCPF.length < 11){
            toastr.warning('Confira o campo!', 'CPF');
            $('#studentResponsibleFinancialCPF').focus();
            return
        }
        // console.log(varCPF);
        searchCPF(varCPF, "studentResponsibleFinancial");

    }

});


//old

// $('[id*= "CPF"]').keypress(function (e) { 
    
//     // console.log('e.id',this.id);
//     if(event.key === "Enter")
//         if(this.id == 'studentCPF')
//             $('#btnSearchCPFStudent').click();
//         else if( this.id == 'studentFatherCPF')
//             $('#btnSearchCPFFather').click();
//         else if(this.id == 'studentMotherCPF')
//             $('#btnSearchCPFMother').click();
//         else if(this.id == 'studentOtherCPF')
//             $('#btnSearchCPFOther').click();
// });

// $('[id*= "btnSearchCPF"]').click(function () {


//     if(this.id == 'btnSearchCPFStudent'){
          
//         var varCPF = $('#studentCPF').val();
//         if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
//             // toastr.warning('O campo está vazio!', 'CPF');
//             // $('#studentCPF').focus();

//             if($('#studentCPF').hasClass('is-valid')){
//                 $('#studentCPF').removeClass('is-valid')
//             }
//             if($('#studentCPF').hasClass('is-invalid')){
//                 $('#studentCPF').removeClass('is-invalid')
//             }
//             $('#studentCPF').addClass('is-warning');
//             return
//         } 
        
//         varCPF = varCPF.split(".").join("");
//         varCPF = varCPF.split("-").join("");

//         if(varCPF.length < 11){
//             // toastr.warning('Confira o campo!', 'CPF');
//             // $('#studentCPF').focus();

//             if($('#studentCPF').hasClass('is-valid')){
//                 $('#studentCPF').removeClass('is-valid')
//             }
//             if($('#studentCPF').hasClass('is-invalid')){
//                 $('#studentCPF').removeClass('is-invalid')
//             }
//             $('#studentCPF').addClass('is-warning');
//             return
//         }
//         // console.log(varCPF); form-control is-valid
//         searchCPF(varCPF, "student", '#studentCPF');

//     }else if(this.id == 'btnSearchCPFFather'){

//         var varCPF = $('#studentFatherCPF').val();
//         if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
//             toastr.warning('O campo está vazio!', 'CPF');
//             $('#studentFatherCPF').focus();
//             return
//         } 
        
//         varCPF = varCPF.split(".").join("");
//         varCPF = varCPF.split("-").join("");
        
//         if(varCPF.length < 11){
//             toastr.warning('Confira o campo!', 'CPF');
//             $('#studentFatherCPF').focus();
//             return
//         }
//         // console.log(varCPF);
//         searchCPF(varCPF, "studentFather");

//     }else if(this.id == 'btnSearchCPFMother'){

//         var varCPF = $('#studentMotherCPF').val();
//         if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
//             toastr.warning('O campo está vazio!', 'CPF');
//             $('#studentMotherCPF').focus();
//             return
//         } 
        
//         varCPF = varCPF.split(".").join("");
//         varCPF = varCPF.split("-").join("");
        
//         if(varCPF.length < 11){
//             toastr.warning('Confira o campo!', 'CPF');
//             $('#studentMotherCPF').focus();
//             return
//         }
//         // console.log(varCPF);
//         searchCPF(varCPF, "studentMother");

//     }else if(this.id == 'btnSearchCPFOther'){

//         var varCPF = $('#studentOtherCPF').val();
//         if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
//             toastr.warning('O campo está vazio!', 'CPF');
//             $('#studentOtherCPF').focus();
//             return
//         } 
        
//         varCPF = varCPF.split(".").join("");
//         varCPF = varCPF.split("-").join("");
        
//         if(varCPF.length < 11){
//             toastr.warning('Confira o campo!', 'CPF');
//             $('#studentOtherCPF').focus();
//             return
//         }
//         // console.log(varCPF);
//         searchCPF(varCPF, "studentOther");

//     }
//     else if(this.id == 'btnSearchCPFPedagogical'){

//         var varCPF = $('#studentResponsiblePedagogicalCPF').val();
//         if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
//             toastr.warning('O campo está vazio!', 'CPF');
//             $('#studentResponsiblePedagogicalCPF').focus();
//             return
//         } 
        
//         varCPF = varCPF.split(".").join("");
//         varCPF = varCPF.split("-").join("");
        
//         if(varCPF.length < 11){
//             toastr.warning('Confira o campo!', 'CPF');
//             $('#studentResponsiblePedagogicalCPF').focus();
//             return
//         }
//         // console.log(varCPF);
//         searchCPF(varCPF, "studentResponsiblePedagogical");

//     }else if(this.id == 'btnSearchCPFFinancial'){

//         var varCPF = $('#studentResponsibleFinancialCPF').val();
//         if (varCPF == '' || varCPF == null || varCPF == undefined) {
            
//             toastr.warning('O campo está vazio!', 'CPF');
//             $('#studentResponsibleFinancialCPF').focus();
//             return
//         } 
        
//         varCPF = varCPF.split(".").join("");
//         varCPF = varCPF.split("-").join("");
        
//         if(varCPF.length < 11){
//             toastr.warning('Confira o campo!', 'CPF');
//             $('#studentResponsibleFinancialCPF').focus();
//             return
//         }
//         // console.log(varCPF);
//         searchCPF(varCPF, "studentResponsibleFinancial");

//     }

// });

function confirmCEP(id,parm){
    varCEP = parm;
    if (varCEP == '' || varCEP == null || varCEP == undefined) {
        
        toastr.warning('O campo está vazio!', 'CEP');
        id.focus();
        return 'false'
    } 
    if(varCEP.length < 8){
        toastr.warning('Confira o campo!', 'CEP');
        id.focus();
        return 'false'
    }
}

$('[id*="SearchCEP"]').click(function () { 
    console.log(this.id);
    
    if(this.id == 'btnSearchCEPStudent'){
        var varCEP = $('#endCEP').val();
        console.log('varCEP >> '+varCEP);
        varCEP = varCEP.split("-").join("");
        
        if(confirmCEP($('#endCEP'),varCEP) == 'false'){
            return
        }
        loadStudentCEP(varCEP,this.id);
        

    }else if(this.id == 'btnSearchCEPFather'){

        console.log('btnSearchCEPFather');
        var varCEP = $('#endCEPFather').val();
        console.log('varCEP >> '+varCEP);
        varCEP = varCEP.split("-").join("");
        
        if(confirmCEP($('#endCEPFather'),varCEP) == 'false'){
            return
        }
        loadStudentCEP(varCEP,this.id);

    }else if(this.id == 'btnSearchCEPMother'){

        console.log('btnSearchCEPMother');
        var varCEP = $('#endCEPMother').val();
        console.log('varCEP >> '+varCEP);
        varCEP = varCEP.split("-").join("");
        
        if(confirmCEP($('#endCEPMother'),varCEP) == 'false'){
            return
        }
        loadStudentCEP(varCEP,this.id);

    }else if(this.id == 'btnSearchCEPOther'){

        console.log('btnSearchCEPOther');
        var varCEP = $('#endCEPOther').val();
        console.log('varCEP >> '+varCEP);
        varCEP = varCEP.split("-").join("");
        
        if(confirmCEP($('#endCEPOther'),varCEP) == 'false'){
            return
        }
        loadStudentCEP(varCEP,this.id);
    }
    
});


// $('#studentBirthDate').blur(function () { 
//     if(checkBirthDate(this.value)){
//         toastr.warning('Data invalida!', 'Data ');
//         $("#studentBirthDate").focus();
//         return
//     }
//     // console.log("this.value: " + this.value);
// });
    


$('#studentSave').click(function () {

    // var radon = Math.floor(10000 + Math.random() * 90000)
    // var radon2 = Math.floor(10000 + Math.random() * 90000)
    // var radon3 = Math.floor(10000 + Math.random() * 90000)
    // var radon4 = Math.floor(10000 + Math.random() * 90000)
    // var radon5 = Math.floor(1000000 + Math.random() * 9000000)
    // var radon6 = Math.floor(1000000 + Math.random() * 9000000)
    // var radon7 = Math.floor(1000000 + Math.random() * 9000000)
    // // console.log(radon,radon2);

    // $('#studentEmail').val('Teste@emailradon0204'+radon);
    // $('#studentFullName').val('Nome nameradon0204'+radon);
    // $('#studentFatherEmail').val('Teste@emailradon0204'+radon2);
    // $('#studentFatherFullName').val('Nome nameradon0204'+radon2);
    // $('#studentMotherEmail').val('Teste@emailradon0204'+radon3);
    // $('#studentMotherFullName').val('Nome nameradon0204'+radon3);
    // $('#studentOtherEmail').val('Teste@emailradon0204'+radon4);
    // $('#studentOtherFullName').val('Nome nameradon0204'+radon4);
    // $('#studentFatherCPF').val('0204'+radon5);
    // $('#studentMotherCPF').val('0204'+radon6);
    // $('#studentCPF').val('0204'+radon7);

    //minimo 2 CPFs do responsável
    var emptyCount = 0;
    var validation = 0;


    if ($('#studentFatherCPF').val() == '' || $('#studentFatherCPF').val() == null ) {
        emptyCount++;
        validation += 1;

    }

    if ($('#studentMotherCPF').val() == '' || $('#studentMotherCPF').val() == null ) {
        emptyCount++;
        validation += 3;

    }
        
    if ($('#studentOtherCPF').val() == '' || $('#studentOtherCPF').val() == null ) {
        emptyCount++;
        validation += 5;

    } 
    // console.log($('#studentFatherCPF').val());
    // console.log("validation: " + validation);
    // console.log("emptyCount: " + emptyCount);

    if(emptyCount >= 2){
        // toastr.warning('Falta um cadastro de Responsável ');
        // console.log('dentro');

        if(validation == 4){
            toastr.warning('Falta um cadastro de CPF Responsável, Pai ou Mãe ');
            $('#studentFatherCPF').addClass('is-warning');
            $('#studentMotherCPF').addClass('is-warning');
            return

        } else if(validation == 6){
            toastr.warning('Falta um cadastro de CPF Responsável, Pai ou Outro ');
            $('#studentFatherCPF').addClass('is-warning');
            $('#studentOtherCPF').addClass('is-warning');
            return
        
        } else if(validation == 8){
            toastr.warning('Falta um cadastro de CPF Responsável, Mãe ou Outro ');
            $('#studentMotherCPF').addClass('is-warning');
            $('#studentOtherCPF').addClass('is-warning');
            return
        
        } else if(validation == 9){
            toastr.warning('Cadastre pelo menos 2 responsáveis ');
            $('#studentMotherCPF').addClass('is-warning');
            $('#studentOtherCPF').addClass('is-warning');
            $('#studentFatherCPF').addClass('is-warning');
            return
        
        }
            

    }

    //validatio cpf aluno e resposável

    if (formValidation($('#studentCPF'),'NUMBER').status != 'ok') {
        
        var data =  formValidation($('#studentCPF'),'NUMBER');
        console.log(data.input);
        toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
        $(data.input).focus();
            
        return

    }

    if(validation == 4){

        if (formValidation([$('#studentFatherCPF'),$('#studentMotherCPF')],'NUMBER').status != 'ok') {
        
            var data =  formValidation([$('#studentFatherCPF'),$('#studentMotherCPF')],'NUMBER');
            console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        }
        

    } else if(validation == 6){
       
        if (formValidation([$('#studentFatherCPF'),$('#studentOtherCPF')],'NUMBER').status != 'ok') {
        
            var data =  formValidation([$('#studentFatherCPF'),$('#studentOtherCPF')],'NUMBER');
            console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        }
    
    } else if(validation == 8){
 
        if (formValidation([$('#studentMotherCPF'),$('#studentOtherCPF')],'NUMBER').status != 'ok') {
        
            var data =  formValidation([$('#studentMotherCPF'),$('#studentOtherCPF')],'NUMBER');
            console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        }
    
    }


    console.log(formValidation($('#studentRegistrationDate'),'DATE'));

    if (formValidation([$('#studentRegistrationDate'),$('#studentBirthDate')],'DATE').status != 'ok' ) {
        
        var data =  formValidation([$('#studentRegistrationDate'),$('#studentBirthDate')],'DATE');
        toastr.warning(data.messange , data.title);
        $(data.input).focus();

        return
        
    } else if (formValidation($('#studentFullName'),'NAME').status != 'ok') {
        
        var data =  formValidation($('#studentFullName'),'NAME');
        toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
        $(data.input).focus();
            
        return

        
    } else if (formValidation([$('#studentGender'),$('#studentClassRoom')],'SELECT').status != 'ok') {
        
        var data =  formValidation([$('#studentGender'),$('#studentClassRoom')],'SELECT');
        toastr.warning( data.messange , data.title );
        $(data.input).focus();
            
        return

        
    } else if (formValidation($('#studentEmail'),'EMAIL').status != 'ok') {
        
        var data =  formValidation($('#studentEmail'),'EMAIL');console.log(data.input);
        toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
        $(data.input).focus();
            
        return

        
    } else 
    if (formValidation([$('#studentPhone1'),$('#endCEP'),$('#endStreetNumber')],'NUMBER').status != 'ok') {
        
        var data =  formValidation([$('#studentPhone1'),$('#endCEP'),$('#endStreetNumber')],'NUMBER');
        console.log(data.input);
        toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
        $(data.input).focus();
            
        return

    } 
    else if (formValidation([$('#endStreet'),$('#endDistrict'),$('#endCity')],'NAME').status != 'ok') {
        
        var data =  formValidation([$('#endStreet'),$('#endDistrict'),$('#endCity')],'NAME');
        toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
        $(data.input).focus();
            
        return

    } else if (formValidation([$('#endUF')],'SELECT').status != 'ok') {
        
        var data =  formValidation([$('#endUF')],'SELECT');
        toastr.warning( data.messange , data.title );
        $(data.input).focus();
            
        return

        
    }

    if($('#studentFatherCPF').val() != '' || $('#studentFatherCPF').val() == null){

        if (formValidation($('#studentFatherFullName'),'NAME').status != 'ok') {
        
            var data =  formValidation($('#studentFatherFullName'),'NAME');
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return

        } else if (formValidation($('#studentFatherEmail'),'EMAIL').status != 'ok') {
        
            var data =  formValidation($('#studentFatherEmail'),'EMAIL');console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
            
        } else if (formValidation([$('#studentFatherPhone1'),$('#endCEPFather'),$('#endStreetNumberFather')],'NUMBER').status != 'ok') {
        
            var data =  formValidation([$('#studentFatherPhone1'),$('#endCEPFather'),$('#endStreetNumberFather')],'NUMBER');
            console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        } else if (formValidation([$('#endStreetFather'),$('#endDistrictFather'),$('#endCityFather')],'NAME').status != 'ok') {
        
            var data =  formValidation([$('#endStreetFather'),$('#endDistrictFather'),$('#endCityFather')],'NAME');
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        } else if (formValidation([$('#endUFFather')],'SELECT').status != 'ok') {
            
            var data =  formValidation([$('#endUFFather')],'SELECT');
            toastr.warning( data.messange , data.title );
            $(data.input).focus();
                
            return
    
            
        }
    
    } else if($('#studentMotherCPF').val() != '' || $('#studentMotherCPF').val() == null){

        if (formValidation($('#studentMotherFullName'),'NAME').status != 'ok') {
        
            var data =  formValidation($('#studentMotherFullName'),'NAME');
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return

        } else if (formValidation($('#studentMotherEmail'),'EMAIL').status != 'ok') {
        
            var data =  formValidation($('#studentMotherEmail'),'EMAIL');console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
            
        } else if (formValidation([$('#studentMotherPhone1'),$('#endCEPMother'),$('#endStreetNumberMother')],'NUMBER').status != 'ok') {
        
            var data =  formValidation([$('#studentMotherPhone1'),$('#endCEPMother'),$('#endStreetNumberMother')],'NUMBER');
            console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        } else if (formValidation([$('#endStreetMother'),$('#endDistrictMother'),$('#endCityMother')],'NAME').status != 'ok') {
        
            var data =  formValidation([$('#endStreetMother'),$('#endDistrictMother'),$('#endCityMother')],'NAME');
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        } else if (formValidation([$('#endUFMother')],'SELECT').status != 'ok') {
            
            var data =  formValidation([$('#endUFMother')],'SELECT');
            toastr.warning( data.messange , data.title );
            $(data.input).focus();
                
            return
    
            
        }
    
    } else if($('#studentOtherCPF').val() != '' || $('#studentOtherCPF').val() == null){

        if (formValidation($('#studentOtherFullName'),'NAME').status != 'ok') {
        
            var data =  formValidation($('#studentOtherFullName'),'NAME');
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return

        } else if (formValidation($('#studentOtherEmail'),'EMAIL').status != 'ok') {
        
            var data =  formValidation($('#studentOtherEmail'),'EMAIL');console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
            
        } else if (formValidation([$('#studentOtherPhone1'),$('#endCEPOther'),$('#endStreetNumberOther')],'NUMBER').status != 'ok') {
        
            var data =  formValidation([$('#studentOtherPhone1'),$('#endCEPOther'),$('#endStreetNumberOther')],'NUMBER');
            console.log(data.input);
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        } else if (formValidation([$('#endStreetOther'),$('#endDistrictOther'),$('#endCityOther')],'NAME').status != 'ok') {
        
            var data =  formValidation([$('#endStreetOther'),$('#endDistrictOther'),$('#endCityOther')],'NAME');
            toastr.warning( data.messange + " "+ (data.inputValue == undefined? '': data.inputValue) , data.title );
            $(data.input).focus();
                
            return
    
        } else if (formValidation([$('#endUFOther')],'SELECT').status != 'ok') {
            
            var data =  formValidation([$('#endUFOther')],'SELECT');
            toastr.warning( data.messange , data.title );
            $(data.input).focus();
                
            return
    
            
        }
    
    }

    console.log('studentEditSave...');
    var blnCheckForm = true;
    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objStudent = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidStudentID").val() != null && $("#hidStudentID").val() != ""){
        objStudent.studentID = $("#studentID").val(), 
        objStudent.userID = $("#userID").val()
        // console.log('aqui');
    }else{
        objStudent.studentID = "0";
        objStudent.userID = "0";
    }
        
    // obj student validation
    
    objStudent.studentRegistrationDate = $('#studentRegistrationDate').data('daterangepicker').startDate.format('YYYY-MM-DD');
    objStudent.studentCPF = $('#studentCPF').val().replace(/[.\-]/g, "");
    objStudent.studentFullName = $('#studentFullName').val();
    objStudent.studentBirthDate = $('#studentBirthDate').data('daterangepicker').startDate.format('YYYY-MM-DD');
    objStudent.studentGender = $('#studentGender').val();
    objStudent.studentEmail = $('#studentEmail').val();
    objStudent.studentPhone1 = $('#studentPhone1').val().split(/[\(\)\-\s]+/).join("");
    objStudent.studentTransport = $('#studentTransport').val();
    objStudent.studentPCD = $('#studentPCD').val();
    objStudent.studenteFgAtv = $('#studenteFgAtv').val();
    objStudent.studentClassRoom = $('#studentClassRoom').val();
    objStudent.endCEP = $('#endCEP').val();
    objStudent.endStreet = $('#endStreet').val();
    objStudent.endStreetNumber = $('#endStreetNumber').val();
    objStudent.endStreetComplement = $('#endStreetComplement').val();
    objStudent.endDistrict = $('#endDistrict').val();
    objStudent.endCity = $('#endCity').val();
    objStudent.endUF = $('#endUF').val();
    objStudent.endCodIBGE = $('#endCodIBGE').val();
    objStudent.baseYearID = $('#baseYearID').val();

    // aba cadastro Father

    objStudent.studentFatherCPF = $('#studentFatherCPF').val().replace(/[.\-]/g, "");
    objStudent.studentFatherFullName = $('#studentFatherFullName').val();
    objStudent.studentFatherEmail = $('#studentFatherEmail').val();
    objStudent.studentFatherPhone1 = $('#studentFatherPhone1').val().split(/[\(\)\-\s]+/).join("");
    objStudent.studentFatherPhone2 = $('#studentFatherPhone2').val().split(/[\(\)\-\s]+/).join("");
    objStudent.endCEPFather = $('#endCEPFather').val();
    objStudent.endStreetFather = $('#endStreetFather').val();
    objStudent.endStreetNumberFather = $('#endStreetNumberFather').val();
    objStudent.endStreetComplementFather = $('#endStreetComplementFather').val();
    objStudent.endDistrictFather = $('#endDistrictFather').val();
    objStudent.endCityFather = $('#endCityFather').val();
    objStudent.endUFFather = $('#endUFFather').val();
    objStudent.endCodIBGEFather = $('#endCodIBGEFather').val();

    // aba cadastro Mother

    objStudent.studentMotherCPF = $('#studentMotherCPF').val().replace(/[.\-]/g, "");
    objStudent.studentMotherFullName = $('#studentMotherFullName').val();
    objStudent.studentMotherEmail = $('#studentMotherEmail').val();
    objStudent.studentMotherPhone1 = $('#studentMotherPhone1').val().split(/[\(\)\-\s]+/).join("");
    objStudent.studentMotherPhone2 = $('#studentMotherPhone2').val().split(/[\(\)\-\s]+/).join("");
    objStudent.endCEPMother = $('#endCEPMother').val();
    objStudent.endStreetMother = $('#endStreetMother').val();
    objStudent.endStreetNumberMother = $('#endStreetNumberMother').val();
    objStudent.endStreetComplementMother = $('#endStreetComplementMother').val();
    objStudent.endDistrictMother = $('#endDistrictMother').val();
    objStudent.endCityMother = $('#endCityMother').val();
    objStudent.endUFMother = $('#endUFMother').val();
    objStudent.endCodIBGEMother = $('#endCodIBGEMother').val();

    // aba cadastro Other

    objStudent.studentOtherCPF = $('#studentOtherCPF').val().replace(/[.\-]/g, "");
    objStudent.studentOtherFullName = $('#studentOtherFullName').val();
    objStudent.studentOtherEmail = $('#studentOtherEmail').val();
    objStudent.studentOtherPhone1 = $('#studentOtherPhone1').val().split(/[\(\)\-\s]+/).join("");
    objStudent.studentOtherPhone2 = $('#studentOtherPhone2').val().split(/[\(\)\-\s]+/).join("");
    objStudent.endCEPOther = $('#endCEPOther').val();
    objStudent.endStreetOther = $('#endStreetOther').val();
    objStudent.endStreetNumberOther = $('#endStreetNumberOther').val();
    objStudent.endStreetComplementOther = $('#endStreetComplementOther').val();
    objStudent.endDistrictOther = $('#endDistrictOther').val();
    objStudent.endCityOther = $('#endCityOther').val();
    objStudent.endUFOther = $('#endUFOther').val();
    objStudent.endCodIBGEOther = $('#endCodIBGEOther').val();

    //responsible
    if ($('#studentResponsiblePedagogical').val() == '' || $('#studentResponsiblePedagogical').val() == null){
        toastr.warning('Selecione o Responsável!', 'Pedagógico') 
        $("#studentResponsiblePedagogical").focus();
        return 

    } else {

        objStudent.studentResponsiblePedagogical = $('#studentResponsiblePedagogical').val();
    }
    
    if ($('#studentResponsibleFinancial').val() == '' || $('#studentResponsibleFinancial').val() == null){
        toastr.warning('Selecione o Responsável!', 'Financeiro') 
        $("#studentResponsibleFinancial").focus();
        return
        
    } else{

        objStudent.studentResponsibleFinancial = $('#studentResponsibleFinancial').val();
    }



    console.log('salvando...3...2...1');
    // console.log(objStudent);
    saveStudent(objStudent);



    
});


