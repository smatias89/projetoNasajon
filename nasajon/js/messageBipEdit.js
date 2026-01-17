//Initialize Select2 Elements
$('.select2').select2()

//Initialize Select2 Elements
$('.select2bs4').select2({
    minimumInputLength: 4,
    theme: 'bootstrap4'
})

//loadCombos
loadComboBaseYearGetAll($('#baseYearID'));

$('#messageBipClear').hide();
$('#messageBipSender').hide();

// loadComboAutocomplete($('#messageBipRecipient'))
var cout = 0;
var valueList = []
$('#messageBipRecipient').on('select2:open', function () {
    $('.select2-search__field').off('input').on('input', function (e) {
        var value = $(this).val();
        console.log('valueList: ',valueList);
        console.log('value: ',value);

        if(valueList.includes(value)){
            console.log(' está');
            return
        }

        if (value.length == 4 || value.length == 6) {

            valueList.push(value);
            console.log(valueList);

            loadComboAutocomplete($('#messageBipRecipient'), value);
            cout++
            // console.log('cout :>> ', cout);
            e.preventDefault()
        }


    });


});





$('#messageBipShdesc').summernote('code', 'Sua mensagem aqui <br><br><br><br><br> ');

// propreties , copy, delete
if ($("#hidMessageBipID").val() != null && $("#hidMessageBipID").val() != "" && $("#hidActionType").val() == 'copy') {

    console.log($("#hidActionType").val());
    $('.card-title').text("Copiar Mensagem");
    $("#divMessageBipID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));

}

if ($("#hidMessageBipID").val() != null && $("#hidMessageBipID").val() != "" ) {

    $("#divMessageBipID").show();
    $('.card-title').text("Ler Mensagem");
    var objFilters = new Object();
    objFilters.messageBipID = $("#hidMessageBipID").val();
    objFilters.modifiedDate = $("#hidMessageBipModifiedDate").val();
    // console.log(objFilters);
    getMessageBipByFilterForm(objFilters);

    //foi por aqui por conta do auto complete
    loadComboAutocompleteGetAll($("#messageBipRecipient"))

    $('#messageBipRecipient').on('select2:open', function () {
        $('.select2-search__field').off('input').on('input', function (e) {
            var value = $(this).val();
            console.log('textList ',valueList);
            console.log('text: ',value);
    
            if(valueList.includes(value)){
                console.log(' text on...');
                return
            }
    
            if (value.length == 4 || value.length == 6) {
    
                valueList.push(value);
                // console.log(valueList);
    
                loadComboAutocomplete($('#messageBipRecipient'), value);
                cout++
                // console.log('cout :>> ', cout);
                e.preventDefault()
            }
    
        });
    
    
    });

} else {

    console.log('New');
    $("#divMessageBipID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

if (!$("#leftMessageBip").hasClass("active")) {
    $("#leftMessageBip").addClass("active");
}

$('#messageBipSalvar').click(function (e) { 
    e.preventDefault();

    var objMessageBip ={}

    var valueID = $('#messageBipID').val();
    if (valueID == null || valueID == '') {
        objMessageBip.messageBipID = '0'
    } else {
        objMessageBip.messageBipID = valueID;
    }

    objMessageBip.recipient = $('#messageBipRecipient').val();
    if($('#messageBipRecipient').val() == '' || $('#messageBipRecipient').val() == null ){
        console.log('not check');
        toastr.warning('Selecione os destinatários');
        $('#messageBipRecipient').focus()
        return
    }
    objMessageBip.subject = $('#messageBipSubject').val();
    objMessageBip.shdesc = $('#messageBipShdesc').val(); // console.log($('#messageBipShdesc').summernote('code'));
    objMessageBip.fgAtv = $('#messageBipFgAtv').val();
    objMessageBip.FgDraft = $('#messageBipFgDraft').val();
    objMessageBip.baseYearID = $('#baseYearID').val();

    if(!$('#customCheckbox1,#customCheckbox2,#customCheckbox3').is(':checked')){
        console.log('not check');
        toastr.warning('Selecione a importância');
        return
    }else if($('#customCheckbox1').is(':checked')){
        objMessageBip.importanceID = '1'
    }else if($('#customCheckbox2').is(':checked')){
        objMessageBip.importanceID = '2'
    }else if($('#customCheckbox3').is(':checked')){
        objMessageBip.importanceID = '3'
    }

    // console.log(objMessageBip); 
    console.log('MessageBip save...'); 
    saveMessageBip(objMessageBip)
    
});
