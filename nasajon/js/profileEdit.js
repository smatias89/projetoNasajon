
var profileIDParm = $('#hidProfileID').val();
var copyParm = $('#hidActionType').val();
var profileModifiedDate = $('#hidProfileModifiedDate').val();
var FT = $.ui.fancytree;

loadListViewPermissionGetAll($("#profilePermissionTreeDiv"), $("#profilePermissionTreeData"));

// console.log('Profile Id -> ' + $('#hidProfileID').val());

$('#profileName').on("input", function(){
    
    updateTitle(false, $(this));
    
});

if ($('#hidProfileID').val() != null && $('#hidProfileID').val() != "" && $('#hidProfileID').val() != "null") {
    $('.title-profile-form').text("Profile - " + $('#hidProfileID').val());
}

if ($('#hidActionType').val() != null && $('#hidActionType').val() != "" && $('#hidActionType').val() != "null" && $('#hidActionType').val() == "copy") {
    $('.title-profile-form').text("Profile - New Profile");
    $("#divProfileID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

if ($('#hidProfileModifiedDate').val() != null && $('#hidProfileModifiedDate').val() != "" && $('#hidProfileModifiedDate').val() != "null") {
    $("#hidProfileModifiedDate").val($('#hidProfileModifiedDate').val());
}

$('#backButton').click(function () {

    location.href = 'profile';
    //closeActiveTab();

});

if (!$("#leftMenuProfile").hasClass("active")) {
    $("#leftMenuProfile").addClass("active");
}		

if ($("#hidProfileID").val() != null && $("#hidProfileID").val() != "") {

    var objFilters = new Object();
    objFilters.profileID = $("#hidProfileID").val();
    objFilters.modifiedDate = $("#hidProfileModifiedDate").val();			
    getProfileByFilterForm(objFilters);
    
} else {
    $("#divProfileID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#profileName'));
}

$('#profileDelete').click(function () {
    
    // console.log('profileDelete');

    $('#hidProfileID').val($('#profileID').val());	
    $('#hidActionType').val("DELETE_PROFILE");
    var messageDeleteProfile = "Do you confirm delete the Profile " + $('#profileName').val() + " ? ";
    $('.modal-title-delete').text("Delete Profile");
    $('.message-modal-delete').text(messageDeleteProfile);
    $('#modalDelete').modal('show');
});

$('.deleteConfirmation').click(function () {
    deleteProfile(null);			
});

$('#profileSave').click(function () {
    
    console.log('profileSave...');
    var blnCheckForm = true;
    if ($('#profileName').val() == null || $('#profileName').val() == "" ) {
       
        toastr.warning('The field is empty!', 'Profile Name');
        $("#profileName").focus();
        blnCheckForm = false;

    } 

    if (!blnCheckForm) {
        console.log('The field is empty check blnCheckForm!')
        return;
    }

    var objProfile = new Object();

    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidProfileID").val() != null && $("#hidProfileID").val() != "")
        objProfile.profileID = $("#profileID").val();
    else
        objProfile.profileID = "0";

    objProfile.profileName = $("#profileName").val();

    var lstProfilePermission = new Array();

    var nodes = $.ui.fancytree.getTree("#profilePermissionTreeDiv").getSelectedNodes();

    //console.log(nodes);
    
    $.each(nodes, function(index,element){
        
        //console.log('index[' + index + '] - element ');
        //console.log(element.value);
        if (!element.folder) {
            var objProfilePermission = new Object();
            objProfilePermission.profilePermissionID = element.key;
            
            lstProfilePermission.push(objProfilePermission);
        }
        
    });

    //console.log(lstProfilePermission);

    objProfile.lstPermission = lstProfilePermission;
    
    //console.log(objProfile);
    console.log('profileSave...1.2');			
    saveProfile(objProfile);
    
    
});