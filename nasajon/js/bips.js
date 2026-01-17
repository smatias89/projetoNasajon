$(function () {
    //Enable check and uncheck all functionality
    $('.checkbox-toggle').click(function () {
        var clicks = $(this).data('clicks')
        if (clicks) {
            //Uncheck all checkboxes
            $('.mailbox-messages input[type=\'checkbox\']').prop('checked', false)
            $('.checkbox-toggle .far.fa-check-square').removeClass('fa-check-square').addClass('fa-square')
        } else {
            //Check all checkboxes
            $('.mailbox-messages input[type=\'checkbox\']').prop('checked', true)
            $('.checkbox-toggle .far.fa-square').removeClass('fa-square').addClass('fa-check-square')
        }
        $(this).data('clicks', !clicks)
    })

    //Handle starring for font awesome
    $('.mailbox-star').click(function (e) {
        e.preventDefault()
        //detect type
        var $this = $(this).find('a > i')
        var fa = $this.hasClass('fa')

        //Switch states
        if (fa) {
            $this.toggleClass('fa-star')
            $this.toggleClass('fa-star-o')
        }
    })
})
console.log('bips.js');
if (!$("#leftMenuBips").hasClass("active")) {
    $("#leftMenuBips").addClass("active");
}


// esconder icheck-primary
$('.icheck-primary').hide();


var objFilters = {}
if ($('#hidUserStudentID').val() != '') {
    console.warn('get bip teacher or responsible or staff');
    objFilters.userID = $('#hidUserID').val()
    
    
} else {

    console.warn('get bip student');
    objFilters.userID = $('#hidUserStudentID').val()
    
}




getBipsByFilterTable(null, objFilters, $('#tableBips'), null)
// console.log($('#hidUserID').val());
console.log('getUser');


$('#tableBips tbody').on( 'mouseenter', 'tr', function () { 
    $(this).find("*").css("cursor", "pointer")
    console.log('select form mouse... ');
    
});

