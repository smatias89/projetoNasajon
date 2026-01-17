console.log('bipsRead...');
if (!$("#leftMenuBips").hasClass("active")) {
    $("#leftMenuBips").addClass("active");
}
$('#bipsReadBackButton').click(function (e) { 
    location.href = 'bips'
    
});





var objFilters = {}
objFilters.messageBipID = $('#hidbipsReadID').val()

function getbipsReadByFilterForm(objFilters) {

    Pace.restart();
    //Pace.track(function () { })

    // console.log(objFilters);
    console.log('getbipsReadByFilterForm... ');


    $.ajax({
        type: "POST",
        /*contentType: "application/json; charset=utf-8",*/
        data: { 'bips': JSON.stringify(objFilters) },
        datatype: "JSON",
        url: 'ajax/bipsGetByFilter',
        global: false,
        success: function (data) {

            data = JSON.parse(data);
            // console.log(data, 'retorno');

            $.each(data, function(index, element) {

            	// console.log(element);
                console.log('elemente loading...');
                userID = element.userID;
                $('#subjectbipsRead').text(element.subject);
                $('#senderbipsRead').text(element.senderFullName);
                $('#mensagebipsRead').html(element.sendText);
                var dateTimeTMP = moment(element.modifiedDate).format(TO_PATTERN_INBOX_DATETIME_BRAZIL)
                
                // console.log(dateTimeTMP);
                var weekDay = weekConvert(dateTimeTMP)
                
                $('#dataTimebipsRead').text(weekDay);
                
                var coutArray = element.lstMessageRead.length
                // console.log('coutArray :>> ', coutArray);

                if(coutArray == 0){
                    
                    registerValidation(null,false)
                    return
                }else if(coutArray > 0){
                    element.lstMessageRead.forEach(function(element){
                        
                        // console.log('element: ',element);
                        if(element.fgRead == 'N'){
                            console.log('NÂO REGISTRADO');

                            registerValidation(null,false)
                        }
                    })
                }
                
                

            });

            console.log("getMessageBipByFilterForm finished");
        }
    });

}

getbipsReadByFilterForm(objFilters)



//verificar
function registerValidation(parmFlg,parmReg){
    

    if(parmReg == false){
        // console.log('Não registrado');
        console.log('Not register');
        var objRegister = {}
        objRegister.messageBipID = $('#hidbipsReadID').val()
        objRegister.userID = $('#hidUserID').val()
        objRegister.fgRead = 'S'
        registerMessageBip(objRegister)
        return
    }else if(parmReg == true){
        console.log('Yes register.. ');
    }


    // if(parm1 == 'S'){
    //     return
    // }else{

    //     var objRegister = {}
    //     objRegister.messageBipID = $('#hidbipsReadID').val()
    //     objRegister.userID = $('#hidUserID').val()
    //     objRegister.fgRead = 'S'
    //     registerMessageBip(objRegister)
    //     return
    // }
}

function registerMessageBip(objFilters) {

    Pace.restart();
    //Pace.track(function () { })
    console.log('registerMessageBip ...');

    console.log('objFilters...');
    

    $.ajax({
        type: "POST",
        /*contentType: "application/json; charset=utf-8",*/
        data: { 'messageBip': JSON.stringify(objFilters) },
        datatype: "JSON",
        url: 'ajax/messageRegisterSave',
        global: false,
        success: function (data) {

            data = JSON.parse(data);
            // console.log(data, 'retorno');


            console.log("registrado finished");
        }
    });

}

// getMessageBipByFilterForm(objFilters)