

var chatMessage;
var chatName;
var chatUserId;

var date = new Date()
var timeChat = date.getTime()
var d = date.getDate() < 10 ? ('0'+date.getDate()):date.getDate();
var m = parseInt(date.getMonth()+1) < 10 ? ('0'+date.getMonth()):date.getMonth();
var y = date.getFullYear()


// console.log(timeChat);
var chatTime = new Date(timeChat).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
});

$('#chatSend').keypress(function(event) {

    if (event.key === "Enter") {
        $('#chatSend').off().trigger('click');
    }
});

$('#chatSend').click(function (e) {
    e.preventDefault();

    chatMessage = $('#chatText').val();
    chatName = $('#hidChatName').val()
    chatUserId = $('#hidChatUserID').val()

    var chatTime = new Date(timeChat).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    

    console.log(chatUserId);
    var divChatNew = `
                    <div class="time-label">
                        <span id='chatDate${d}${m}${y}' class="bg-red">${d}-${m}-${y}</span>
                    </div>
                    <div id='divChatMessage'>
                        <i class="fas fa-envelope bg-blue"></i>
                        <div class="timeline-item">
                        <span class="time"><i class="fas fa-clock"></i> ${chatTime}</span>
                        <h3 class="timeline-header"><a href="#">${chatName}</a> sent you an email</h3>

                        <div class="timeline-body">
                            <textarea id=''  placeholder="" readonly class="form-control" row='1'>${chatMessage}</textarea>
                            
                        </div>
                        <div class="timeline-footer">
                            <button class="btn btn-primary btn-sm">Read more</button>
                            <button id='deleteChatMessage' class="btn btn-danger btn-sm">Delete</button>
                        </div>
                        </div>
                    </div>`

                    var divChat = `
                    <div id='divChatMessage'>
                        <i class="fas fa-envelope bg-blue"></i>
                        <div class="timeline-item">
                        <span class="time"><i class="fas fa-clock"></i> ${chatTime}</span>
                        <h3 class="timeline-header"><a href="#">${chatName}</a> sent you an email</h3>

                        <div class="timeline-body">
                            <textarea id=''  placeholder="" readonly class="form-control" row='1'>${chatMessage}</textarea>
                            
                        </div>
                        <div class="timeline-footer">
                            <button class="btn btn-primary btn-sm">Read more</button>
                            <button id='deleteChatMessage' class="btn btn-danger btn-sm">Delete</button>
                        </div>
                        </div>
                    </div>`
    // $('.timeline').append(divChat);
    // console.log($('#hidChatName').val());

    var blnChatDate =`chatDate${d}${m}${y}`;
    if(blnChatDate == $('.time-label > .bg-red').prop('id')){

        $('#divChatMessage').before(divChat);
        console.log('igual');
    }else{
        console.log('diferente');
        $('.timeline').prepend(divChatNew);
    }


    $('#chatText').val('')

    var objChatSend = {}

    objChatSend.name = chatName
    objChatSend.userId = chatUserId
    objChatSend.message = chatMessage
    var dateTMP = date.toISOString()
    // console.log(dateTMP);
    dateSTG = dateTMP.split("T")
    dateFInish = dateSTG[0]
    // console.log(dateSTG);
    // console.log(dateSTG[1]);
    var timeTMP = dateSTG[1]
    var timeTMP = timeTMP.split(".")
    // console.log(timeTMP);
    var timeTMP = timeTMP[0]
    objChatSend.date = dateFInish+' '+timeTMP

    console.log('save ... ');
    console.log(objChatSend);


});


//tem que ser assim poid foi criado no prepend
$('.timeline').on('click', '#deleteChatMessage', function () {
    
    $(this).closest('#divChatMessage').empty();

});


