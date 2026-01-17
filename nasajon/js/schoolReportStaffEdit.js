console.log('schoolReportStaffEdit...'); 

//Initialize Select2 Elements
$('.select2').select2()

//Initialize Select2 Elements
$('.select2bs4').select2({
    theme: 'bootstrap4'
})

//loadCombos
loadComboBaseYearGetAll($('#baseYearID'));


$('#classRoombackButton').click(function () {

    location.href = 'classRoom';

});

if (!$("#leftMenuSchoolReportStaff").hasClass("active")) {
    $("#leftMenuSchoolReportStaff").addClass("active").css("background-color", "#98c7f8");
}	
if (!$("#leftMenuClassroom").hasClass("active")) {
    $("#leftMenuClassroom").addClass("active");
}	






if ($("#hidSchoolReportID").val() != null && $("#hidSchoolReportID").val() != "") {
    
    console.log('is staff...  ');

    // $(".delete-button").hide();
    
    var objFilters = new Object();
    objFilters.classRoomID = $("#hidSchoolReportID").val();
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters); return;
    // tblGradeView.table().clear();
        
    getSchoolReportByFilterForm(objFilters)

    $("#divClassRoomID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    
   
} else {

   // console.log('Novo');
   // $('.card-title').text("Nova Turma");
   $("#divClassRoomID").hide();
   $("#divCreatedBy").hide();
   $("#divCreatedDate").hide();
   $("#divModifiedBy").hide();
   $("#divModifiedDate").hide();
   $(".delete-button").hide();

}

if ($("#hidClassRoomID").val() != null && $("#hidClassRoomID").val() != "" && $("#hidActionType").val() == 'copy') {

    // console.log('COPY');
    $('.card-title').text("Copiar Turma");
    $("#divClassRoomID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));
     
} 

