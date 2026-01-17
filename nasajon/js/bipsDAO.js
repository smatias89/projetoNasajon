console.log('bipsDAO.js');


function getBipsByFilterTable(objDataTable, objFilters, objAppend, lstExclusion) {

    Pace.restart();
    //Pace.track(function () { })

    $.ajax({
        type: "POST",
        /*contentType: "application/json; charset=utf-8",*/
        data: { 'bips': JSON.stringify(objFilters) },
        datatype: "JSON",
        url: 'ajax/bipsGetByFilter',
        global: false,
        success: function (data) {

            data = JSON.parse(data);
            
            // console.log(data.reverse());
            data.reverse() // para colocar na ordem do mais novo ao mais velho
            
            if (data.length == 0) {
                toastr.warning('Resultado não encontrado', 'Atenção!');
            }
            
            var coutCheck = 1
            data.forEach(function (element) {
                // console.log(element);
                var textTmp = element.sendText;
                var textTmp = textTmp.substring(0,15);
                // console.log(textTmp.substring(0,20) + 'cout: '+coutCheck);


                console.log('load message... ');


                var blnCheckRead = false;
                var flgRead = 'N'
                element.lstMessageRead.forEach(function(element){
                    // console.log(element);
                    if(element.fgRead == 'S'){
                        console.log('read message...');
                        blnCheckRead = true
                        flgRead = 'S'
                    }
                })

                var htmlTr = `<tr id='messageBipID${element.messageBipID}' value="${element.messageBipID}" data-read ="${flgRead}" ${blnCheckRead ? 'style="background-color: rgb(133 130 130 / 0%);"' : 'style="background-color: rgb(133 130 130 / 25%);"'} ' >
                                <td>
                                    <div class="icheck-primary">
                                        <input type="checkbox" value="" id="check${coutCheck}">
                                        <label for="check${coutCheck}"></label>
                                    </div>
                                </td>
                                <td class="mailbox-star">
                                
                                    <a href="#">${blnCheckRead ? '<i class="far fa-envelope-open"></i>' : '<i class="far fa-envelope"></i>'}</a>
                                </td>
                                <td class="mailbox-name">
                                    ${blnCheckRead ? 'Remetente: ' : '<b>Remetente: </b>'}${element.senderFullName}
                                </td>
                                <td class="mailbox-subject">
                                    ${blnCheckRead ? 'Assunto: ' : '<b>Assunto: </b>'}${element.subject}
                                </td>
                                <td class="mailbox-text">
                                    ${blnCheckRead ? 'Mensagem: ' : '<b>Mensagem: </b>'}${textTmp}${'...'}
                                </td>
                                <td class="mailbox-date">
                                    ${moment(element.modifiedDate).format(TO_PATTERN_DATETIME_BRAZIL)}
                                </td>
                                <td style="display: none;">
                                    <input type="hidden" id='messageBipID' value="${element.messageBipID}">
                                </td>
                            </tr>`
                $(objAppend).append(htmlTr);
                coutCheck++
                $('.icheck-primary').hide();
                
                // return element;
            });

            console.log("getUserByFilterTable finished");
            $('tbody > tr').click(function (e) { 
                var rowValueID = $(this).attr('value')
                console.log(rowValueID);
                console.log('rowValueID');
                
                setTimeout(function () {

                    location.href = "bipsRead?bipsReadID=" + rowValueID;

                }, 500);

                
                
            });

            //navegação
            var rows = $('#tableBips tbody tr');
            var limitRowShow = 5;
            var currentPag = 0;
            var coutRows = data.length ; // console.log('coutRows :>> ', coutRows);

            function showPage(pagina) {

                console.log('showPage ...');
                var inicio = pagina * limitRowShow;
                var fim = inicio + limitRowShow;
                // console.log('inicio: ',inicio);
                // console.log('fim: ',fim);

                rows.hide();
                rows.slice(inicio, fim).show();

                // Desabilita botões se necessário
                $('#btnAnterior').prop('disabled', pagina === 0);
                $('#btnProximo').prop('disabled', fim >= rows.length);
            }

            $('#btnAnterior').click(function () {
                if (currentPag > 0) {
                    currentPag--;
                    showPage(currentPag);
                }
            });

            $('#btnProximo').click(function () {
                const totalPaginas = Math.ceil(rows.length / limitRowShow);
                if (currentPag < totalPaginas - 1) {
                    currentPag++;
                    showPage(currentPag);
                }
            });

            // Inicializa
            showPage(currentPag);

            var conutRowsTop = `01-${limitRowShow > 9? limitRowShow : '0'+limitRowShow}/${coutRows > 9? coutRows : '0'+coutRows}`
            $('#countLineTable').text(conutRowsTop);

            $('#tableRefresh').click(function (e) { 
                console.log('refresh');
                tableRefresh()
                
            });
            return
        }
    });

}

function tableRefresh(){
    var objFilters = {}
    objFilters.userID = $('#hidUserID').val()
    $('#tableBips').empty();
    getBipsByFilterTable(null, objFilters, $('#tableBips'), null)
    console.log('finish tableRefresh');
}