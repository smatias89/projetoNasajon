console.log('gradeControl.js');
//loadCombos
loadComboBaseYearGetAll($('#baseYearID'));

if ($("#hidGradeControlID").val() != null && $("#hidGradeControlID").val() != "") {

    
    // console.log('Propriedades');
    $('#divUserID').hide();
    
    var objFilters = new Object();
    objFilters.gradeControlID = $("#hidGradeControlID").val();
    objFilters.modifiedDate = $("#hidGradeControlModifiedDate").val();			
    getGradeControlbyFilterForm(objFilters);
    
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

$('#gradeControlBackButton').click(function (e) { 
    href.location = 'index';
    
});

$(".delete-button").hide();

$('#gradeControlSave').click(function () { 
    
    var objGradeControl = {};
    
    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#gradeControlID").val() == null && $("#gradeControlID").val() != ''){
        objGradeControl.gradeControlID = $("#gradeControlID").val();

    } else{

        objGradeControl.gradeControlID = "0";
    }

    var blnCheckBim1 = 'N';
    var blnCheckBim2 = 'N';
    var blnCheckBim3 = 'N';
    var blnCheckBim4 = 'N';

    if($('#gradeControlBim1').is(':checked')){
        blnCheckBim1 = 'Y';
    }
    if($('#gradeControlBim2').is(':checked')){
        blnCheckBim2 = 'Y';
    }
    if($('#gradeControlBim3').is(':checked')){
        blnCheckBim3 = 'Y';
    }
    if($('#gradeControlBim4').is(':checked')){
        blnCheckBim4 = 'Y';
    }

    objGradeControl.flgBim1 = blnCheckBim1;
    objGradeControl.flgBim2 = blnCheckBim2;
    objGradeControl.flgBim3 = blnCheckBim3;
    objGradeControl.flgBim4 = blnCheckBim4;
    objGradeControl.baseYearID = $('#baseYearID').val();
    objGradeControl.baseYearText = $('#baseYearID').text();

    console.log(objGradeControl);
    console.log('save 3..\n2...\n1..');// return
    saveGradeControl(objGradeControl);



});