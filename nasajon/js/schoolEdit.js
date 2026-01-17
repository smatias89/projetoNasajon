
var schoolIDParm = $('#hidSchoolID').val();
var copyParm = $('#hidActionType').val();
var schoolModifiedDate = $('#hidSchoolModifiedDate').val();

// console.log('School Id -> ' + $('#hidSchoolID').val());

// $('#schoolName').on("input", function(){
    
//     updateTitle(false, $(this));
    
// });

if ($('#hidSchoolID').val() != null && $('#hidSchoolID').val() != "" && $('#hidSchoolID').val() != "null") {
    $('.title-school-form').text("School - " + $('#hidSchoolID').val());
}

if ($('#hidActionType').val() != null && $('#hidActionType').val() != "" && $('#hidActionType').val() != "null" && $('#hidActionType').val() == "copy") {
    $('.title-school-form').text("School - New School");
    $("#divSchoolID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

if ($('#hidSchoolModifiedDate').val() != null && $('#hidSchoolModifiedDate').val() != "" && $('#hidSchoolModifiedDate').val() != "null") {
    $("#hidSchoolModifiedDate").val($('#hidSchoolModifiedDate').val());
}

$('#backButton').click(function () {

    location.href = 'school';
    //closeActiveTab();

});

if (!$("#leftMenuSchool").hasClass("active")) {
    $("#leftMenuSchool").addClass("active");
}		

if ($("#hidSchoolID").val() != null && $("#hidSchoolID").val() != "") {

    var objFilters = new Object();
    objFilters.schoolID = $("#hidSchoolID").val();
    objFilters.modifiedDate = $("#hidSchoolModifiedDate").val();			
    getSchoolByFilterForm(objFilters);
    
} else {
    $("#divSchoolID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#schoolName'));
}

$('#schoolDelete').click(function () {
    
    // console.log('schoolDelete');

    $('#hidSchoolID').val($('#schoolID').val());	
    $('#hidActionType').val("DELETE_SCHOOL");
    var messageDeleteSchool = "Do you confirm delete the School " + $('#schoolName').val() + " ? ";
    $('.modal-title-delete').text("Delete School");
    $('.message-modal-delete').text(messageDeleteSchool);
    $('#modalDelete').modal('show');
});

$('.deleteConfirmation').click(function () {
    deleteSchool(null);			
});

$('#schoolSave').click(function () {
    
    console.log('schoolSave...');
    var blnCheckForm = true;
    if ($('#schoolName').val() == null || $('#schoolName').val() == "" ) {
       
        toastr.warning('The field is empty!', 'School Name');
        $("#schoolName").focus();
        blnCheckForm = false;

    } 

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objSchool = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidSchoolID").val() != null && $("#hidSchoolID").val() != "")
        objSchool.schoolID = $("#schoolID").val();
    else
        objSchool.schoolID = "0";

    objSchool.schoolName = $("#schoolName").val();
    objSchool.schoolDBName = $("#schoolDBName").val();
    objSchool.schoolSitePrefix = $("#schoolSitePrefix").val();
    objSchool.fgAtv = $("#schoolFgAtv").val();
    
    //console.log(objSchool);
    console.log('schoolSave...1.2');			
    saveSchool(objSchool);
    
    
});