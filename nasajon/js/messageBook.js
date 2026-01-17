$(document).keydown(function(e) {
    var tecla = (e.keyCode ? e.keyCode : e.which);
    if (tecla == 13) {
        
        $('#messageBookSend').trigger('click');
        e.preventDefault(); // trigger para enviar com enter
    }
});


var userFullName = $('#hidUserFullName').val();
var sessionUserID = $('#hidUserID').val();
var sessionResponsibleForStudentID = $('#hidSResponsibleForStudentID').val();
var sessionResponsibleForStudentFullName = $('#hidSResponsibleForStudentFullName').val();

var blnCheckUserTo = $('#hidMessageBookTo').val() == '' || $('#hidMessageBookTo').val() == null ? false : true //para
var blnCheckUserFrom = $('#hidMessageBookFrom').val() == '' || $('#hidMessageBookFrom').val() == null ? false : true //respondendo
var userNameFrom ;
var messageBookCount = 0
var messageBookSend;
var dateTime = getFormattedDateTime()

var isResponsible = $('#hidIsResponsible').val();
var isStaff = $('#hidIsStaff').val();
var isTeacher = $('#hidIsTeacher').val();
var sendType = '';


if(isResponsible != '' || isResponsible == null){
    sendType = isResponsible;
    console.log('set sendType 1 \n\nisResponsible... ');
    
}else if(isStaff != '' || isStaff == null){
    sendType = isStaff;
    console.log('set sendType 2 \n\nisStaff... ');
    
}else if(isTeacher != '' || isTeacher == null){
    sendType = isTeacher;
    console.log('set sendType 3 \n\nisTeacher... ');
    
}

if (!$("#leftMenuMessageBookSelect").hasClass("active")) {
    $("#leftMenuMessageBookSelect").addClass("active");
}



$('#divMessageBookID, #divBaseYearID').hide();
$('#messageBookID').val();

$('#messageBookSend').click(function (e) { 
    e.preventDefault();
    console.log('message Send');

    messageBookSend = $('#messageBookText').val();
    // console.log('userFullName :>> ', userFullName);

    var templateSendFrom = `<div class="direct-chat-msg questionUser">
                            

                                <div class="direct-chat-infos clearfix">
                                    <span class="direct-chat-name float-left">${userFullName}</span>
                                    <span class="direct-chat-timestamp float-right">${dateTime}</span>
                                </div>
                                
                                <i class="fas fa-user bg-green direct-chat-img" style="padding-left: 13px;padding-top: 10px;"></i>
                                                        
                                <div class="direct-chat-text">
                                    ${messageBookSend}
                                </div>
                            </div>
                            `
    var templateSendTo = `<div class="direct-chat-msg right answerUser">
                                <div class="direct-chat-infos clearfix">
                                    <span class="direct-chat-name float-right">Escola</span>
                                    <span class="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
                                </div>
                                
                                <i class="fas fa-user bg-blue direct-chat-img" style="padding-left: 13px;padding-top: 10px;"></i>
                                
                                <div class="direct-chat-text">
                                    ${messageBookSend}
                                </div>
                                
                            </div>`
    

                        
                        var lastDiv = $('#messageBookChat').children('div').last();
                        // console.log(lastDiv.attr('class'));

                        if(sessionUserID == $('#hidUserID').val()){
                            console.log('msg user');
                        }

    if(blnCheckUserTo == true){
        console.log('estou enviando');
        $('#messageBookChat').append(templateSendFrom);
        messageBookCount++
        $('#messageBookCount').text(messageBookCount);
    }

    if(blnCheckUserFrom == true){
        console.log('estou respondendo');
        // console.log('colocar pergunta para escola');
        $('#messageBookChat').append(templateSendFrom);
        messageBookCount++
        $('#messageBookCount').text(messageBookCount);
    }

    $('#messageBookText').val(' ')

    //SAVE

    saveObjMessageBook()
    
    
});

function saveObjMessageBook(){

    var objMessageBook = new Object;
    if ($("#hidActionType").val() != null && $("#hidActionType").val() != "copy" && $("#hidMessageBookID").val() != null && $("#hidMessageBookID").val() != ""){

        objMessageBook.messageBookID = $("#messageBookID").val();
    }else{

        objMessageBook.messageBookID = "0";
    }

        
        
    objMessageBook.userFromID = $('#hidUserID').val();
    objMessageBook.messageText = messageBookSend;
    objMessageBook.flgRead = 'N';
    objMessageBook.baseYearID = $('#baseYearID').val();

    // objMessageBook.messageBookType = $('#hidMessageType').val(); //old
    objMessageBook.messageBookType = sendType //old
    objMessageBook.userToID = $('#hidMessageBookFrom').val() == ''? $('#hidMessageBookTo').val() : $('#hidMessageBookFrom').val() 



    // console.log(objMessageBook);console.log('stop...');return

    saveMessageBook(objMessageBook);
}

function loadMessagesFrom() {
    let objData = {}
    objData.userFromID = $('#hidMessageBookFrom').val() == ''? $('#hidMessageBookTo').val() : $('#hidMessageBookFrom').val()
    objData.userToID = $('#hidUserID').val();
    // console.log(objData);
    
    var userNameFrom;

    $.ajax({
        type: "POST",
        data: { 'messageBook': JSON.stringify(objData) },
        datatype: "JSON",
        url: 'ajax/messageBookLoad',
        global: false,
        success: function (data) {
            data = JSON.parse(data);
            console.log('data... ');
            var lastMessage = data[data.length-1]
            
            if (data.length === 0) {
                console.log('not msg history...');
            } else {
                console.log('loading history... ');
                console.log(data[0].lstUser.fullName);
                
                var fasFar;
                $.each(data, function (index, element) {
                    console.log('messagem... ');
                    console.log(element);
                    
                    var fasFar;
                    var messageText = element.messageText
                    var dateTimeTMP = moment(element.createdDate).format(TO_PATTERN_INBOX_DATETIME_BRAZIL)
                    // console.log('dateTimeTMP :>> ', dateTimeTMP);
                    var weekDay = weekConvert(dateTimeTMP)
                    // console.log('weekDay :>> ', weekDay);
                    if (element.messageBookType == '1') {

                        console.log('is a responsible.... ');
                        var fasFar = 'far fa-user';

                    } else if (element.messageBookType == '2') {

                        console.log('is a staff.... ');
                        var fasFar = 'fas fa-user-tag';// <i class="fas fa-user-tag"></i>

                    } else if (element.messageBookType == '3') {

                        console.log('is a teacher... ');
                        var fasFar = 'fas fa-chalkboard-teacher';
                    }

                    var templateSendFrom = `<div class="direct-chat-msg questionUser">
                            
                                                <div class="direct-chat-infos clearfix">
                                                    <span class="direct-chat-name float-left">${userFullName}</span>
                                                    <span class="direct-chat-timestamp float-right">${weekDay}</span>
                                                </div>
                                                
                                                <i class="${fasFar} bg-green direct-chat-img" style="padding-left: 13px;padding-top: 10px;"></i>
                                                                        
                                                <div class="direct-chat-text">
                                                    ${messageText}
                                                </div>
                                            </div>
                                            `
                    userNameFrom = element.lstUser.fullName;
                    // console.log('userNameFrom: ',userNameFrom);
                    var templateSendTo = `<div class="direct-chat-msg right answerUser">
                                                <div class="direct-chat-infos clearfix">
                                                    <span class="direct-chat-name float-right">${userNameFrom}</span>
                                                    <span class="direct-chat-timestamp float-left">${weekDay}</span>
                                                </div>
                                                
                                                <i class="${fasFar} bg-blue direct-chat-img" style="padding-left: 10px;padding-top: 10px;"></i>
                                                
                                                <div class="direct-chat-text">
                                                    ${messageText} <small>${element.fgAtv == 'S' ? '<i class="fas fa-check"></i>' : ''}</small>
                                                </div>
                                            </div>`

                    var lastDiv = $('#messageBookChat').children('div').last();
                    // console.log(lastDiv.attr('class'));


                    $('#messageBookText').val(' ')

                    if (sessionUserID == element.userFromID) {
                        console.log('messagem for user from');
                        $('#messageBookChat').append(templateSendFrom);
                        messageBookCount++
                        $('#messageBookCount').text(messageBookCount);
                    } else {
                        console.log('messagem for to');
                        $('#messageBookChat').append(templateSendTo);
                        messageBookCount++
                        $('#messageBookCount').text(messageBookCount);
                    }

                })

                //saveMessageBook
                console.warn(lastMessage);
                var objMessageBook = {}
                objMessageBook.messageBookID = lastMessage.messageBookID
                objMessageBook.flgRead = 'S' //userFromID
                objMessageBook.userFromID = '' 
                objMessageBook.userToID = '' 
                objMessageBook.messageBookType = '' 
                objMessageBook.messageText = '' 
                objMessageBook.baseYearID = $('#baseYearID').val();
                updateFlagReadMessageBook(objMessageBook)
                

            }

            if(data.length == '0'){
                if($('#hidMessageType').val() == '2'){
                    $('#sendMessage').text('Para: Coordenador(a) '+$('#hidStaffFullName').val());
                    console.log('aqui...');
                }else if($('#hidMessageType').val() == '3'){
                    $('#sendMessage').text('Para: Professor(a) ');
                    console.log('aqui...');
                }
            }else if (data.length >'0'){
                if($('#hidMessageType').val() == '1'){
                    $('#sendMessage').text('De: Responsável(a) '+userNameFrom);
                    console.log('aqui...',userNameFrom);
                }else if($('#hidMessageType').val() == '2'){
                    $('#sendMessage').text('De: Coordenador(a) '+userNameFrom);
                    console.log('aqui...',userNameFrom);
                }else if($('#hidMessageType').val() == '3'){
                    $('#sendMessage').text('De: Professor(a) '+userNameFrom);
                    console.log('aqui... ok',userNameFrom);
                }
            }

            $('#messageBookChat').animate({
                scrollTop: $('#messageBookChat')[0].scrollHeight
            }, 700); // 400ms
            // alert("loader finished")
                
        }

    });
    
}

if($('#hidMessageBookFrom').val() != '' && $('#hidUserID').val() != '' && $('#hidMessageBookFrom').val() != null && $('#hidUserID').val() != null){

    loadMessagesFrom();
    
}else{

    loadMessagesFrom();
}



//ok
// $('#messageBookSend').click(function (e) { 
//     e.preventDefault();
//     console.log('message Send');

//     messageBookSend = $('#messageBookText').val();
//     // console.log('userFullName :>> ', userFullName);

//     var templateSendFrom = `<div class="direct-chat-msg questionUser">
                            

//                                 <div class="direct-chat-infos clearfix">
//                                     <span class="direct-chat-name float-left">${userFullName}</span>
//                                     <span class="direct-chat-timestamp float-right">${dateTime}</span>
//                                 </div>
                                
//                                 <i class="fas fa-user bg-green direct-chat-img" style="padding-left: 13px;padding-top: 10px;"></i>
                                                        
//                                 <div class="direct-chat-text">
//                                     ${messageBookSend}
//                                 </div>
//                             </div>
//                             `
//     var templateSendTo = `<div class="direct-chat-msg right answerUser">
//                                 <div class="direct-chat-infos clearfix">
//                                     <span class="direct-chat-name float-right">Escola</span>
//                                     <span class="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
//                                 </div>
                                
//                                 <i class="fas fa-user bg-blue direct-chat-img" style="padding-left: 13px;padding-top: 10px;"></i>
                                
//                                 <div class="direct-chat-text">
//                                     ${messageBookSend}
//                                 </div>
                                
//                             </div>`
    

                        
//                         var lastDiv = $('#messageBookChat').children('div').last();
//                         // console.log(lastDiv.attr('class'));

//                         if(sessionUserID == $('#hidUserID').val()){
//                             console.log('msg user');
//                         }

//     if (lastDiv.hasClass('answerUser') ) {
        
//         console.log('colocar pergunta para escola');
//         $('#messageBookChat').append(templateSendFrom);
//         messageBookCount++
//         $('#messageBookCount').text(messageBookCount);

//     }else if(lastDiv.hasClass('questionUser')){
//         console.log('resposta da escola');
//         $('#messageBookChat').append(templateSendTo);
//         messageBookCount++
//         $('#messageBookCount').text(messageBookCount);

//     }else if(!lastDiv.hasClass('answerUser') ){
//         console.log('resposta da escola');
//         $('#messageBookChat').append(templateSendFrom);
//         messageBookCount++
//         $('#messageBookCount').text(messageBookCount);

//     }else if(!lastDiv.hasClass('questionUser') ){
//         console.log('resposta da escola');
//         $('#messageBookChat').append(templateSendTo);
//         messageBookCount++
//         $('#messageBookCount').text(messageBookCount);
//     }

//     $('#messageBookText').val(' ')

//     //SAVE

//     //saveObjMessageBook()
    
    
// });



