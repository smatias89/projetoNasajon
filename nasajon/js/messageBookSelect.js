var messageBookSend;
var userID = $('#hidUserID').val();

var isResponsible = $('#hidIsResponsible').val();
var isStaff = $('#hidIsStaff').val();
var isTeacher = $('#hidIsTeacher').val();
var sendType = '';


// console.log('isResponsible: ',isResponsible);
// console.log('isStaff: ',isStaff);
// console.log('isTeacher: ',isTeacher);

if(isResponsible != '' || isResponsible == null){
    sendType = isResponsible;
    console.log('set -> senderType 1... ');
    
}else if(isStaff != '' || isStaff == null){
    sendType = isStaff;
    console.log('set -> senderType 2... ');
    
}else if(isTeacher != '' || isTeacher == null){
    sendType = isTeacher;
    console.log('set -> senderType 3... ');
    
}
// console.log('sendType: ',sendType);


function searchCountMessage(userID){
    
    var objFilters = {}
    objFilters.flgRead = ''
    objFilters.userFromID = ''
    objFilters.userToID = userID
    objFilters.messageBookType = ''
    
    getMessageBookByFilterForm(objFilters)
}

searchCountMessage(userID);

// $('#messageBookSecretary').click(function (e) { 
//     console.log('messageBookSecretary');
//     $('.secretary-box').addClass('select-div');

//     $('.staff-box, .teacher-box, .responsible-box').removeClass('select-div');
    
//     sendActions('messageBookSecretary')
    
// });

$('#messageBookStaff').click(function (e) { 
    console.log('messageBookStaff');
    $('.staff-box').addClass('select-div');
    $('.secretary-box, .teacher-box, .responsible-box').removeClass('select-div');

    
    sendActions('messageBookStaff')
    
});

$('#messageBookTeacher').click(function (e) { 
    console.log('messageBookTeacher');
    $('.teacher-box').addClass('select-div');
    $('.secretary-box, .staff-box, .responsible-box').removeClass('select-div');

   
    sendActions('messageBookTeacher')
    
});

$('#messageBookResponsible').click(function (e) { 
    console.log('messageBookTeacher');
    $('.responsible-box').addClass('select-div');
    $('.secretary-box, .staff-box, .teacher-box').removeClass('select-div');

    
    sendActions('messageBookResponsible')
    
});

function sendActions(send){

    if(send == 'messageBookResponsible'){

        location.href = "messageBookSearch?userID="+userID+"&type="+1;

    }else if(send == 'messageBookStaff'){

       
        
        location.href = "messageBookSearch?userID="+userID+"&type="+2;

    }else if(send == 'messageBookTeacher'){

        
        location.href = "messageBookSearch?userID="+userID+"&type="+3;

    }
}


$('#messageBookNew').click(function (e) { 
    console.log('Nova mensagem: ',messageBookSend);

    
    location.href = "messageBookSelectDistiny";
    
});


if (!$("#leftMenuMessageBookSelect").hasClass("active")) {
    $("#leftMenuMessageBookSelect").addClass("active");
}

$('#messageBookBackButton').click(function (e) { 
    location.href = "index";
    
});


