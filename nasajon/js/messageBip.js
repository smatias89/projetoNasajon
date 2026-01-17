var objDelete;
console.log('messageBip');

$('#messageBipID,#messageBipTitle','#messageBipText').keypress(function(event) {

    if (event.key === "Enter") {
        searchMessageBip();	
    }
});


$('#messageBipSearch').click(function (e) { 
    searchMessageBip(); 
    
});
$('.back-button').click(function (e) { 
    location.href = 'index';
    
});
$('.new-button').click(function (e) { 
    location.href = 'messageBipEdit';
    
});


function searchMessageBip() {
    var objFilters = new Object();
    objFilters.userID = $("#hidUserID").val() != '' || $("#hidUserID").val() != '' ? $("#hidUserID").val() : '' ;
    console.log('userId  because permission is teacher_veiw');
    objFilters.messageBipID = $("#messageBipID").val();
    objFilters.subject = $("#messageBipSubject").val();		
    objFilters.fgAtv = $("#messageBipFgAtv").val();		
    objFilters.shdesc = $("#messageBipText").val();		
    
    if (!$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    }
    
    // console.log(objFilters);
    tblMessageBipSearch.table().clear();
    
    getMessageBipByFilterTable(tblMessageBipSearch, objFilters, null, null);	
}

if (!$("#leftMessageBip").hasClass("active")) {
    $("#leftMessageBip").addClass("active");
}

tblMessageBipSearch = $('#messageBipTable').DataTable({
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    },
    {
        orderable: false,
		targets:   2,
		render: function (data) {

            let textTmp = data
            var text  = textTmp
            return text
            
					
		}
    },
    {
        orderable: false,
		targets:   3,
		render: function (data) {

            // console.log('data,', typeof data);
            var coutUser = 0;
            var coutGroup = 0;
            var lstTmp = data.split(' ');
            // console.log('lstTmp :>> ', lstTmp);
            for(var i = 0 ; i <= lstTmp.length; i++){
                // console.log(lstTmp[i]);
                if(lstTmp[i] == undefined || lstTmp[i] == ' '){
                    console.log('undefine our null...  ');
                }else{
                    var strTmp = lstTmp[i]
                    // console.log(strTmp);
                    if(strTmp.startsWith("USER||")){
                        coutUser++
                    }else if(strTmp.startsWith("GROUP||")){
                        coutGroup++
                    }
                }
                
            }
            // console.log('coutGroup: '+coutGroup+' coutUser: '+coutUser);
            var columnResponse;
            if(coutUser > 0 && coutGroup > 0 ){
                columnResponse = `${coutUser} Usuários e ${coutGroup} Grupos`;
            }else if(coutUser > 0 && coutGroup == 0 ){
                columnResponse = `${coutUser} Usuários`
            }else if(coutUser == 0 && coutGroup > 0 ){
                columnResponse = `${coutGroup} Grupos`
            }

            return columnResponse
            
					
		}
    },
    {
        orderable: false,
		targets:   6,
		render: function (data) {

            // console.log(data);
            if(data == '1'){
                return 'NORMAL'
            }else if(data == '2'){
                return 'IMPORTANTE'
            }else if(data == '3'){
                return 'URGENTE'
            }
            
					
		}
    },
    {
        orderable: false,
		targets:   7,
		render: function (data) {
            // console.log(data);
            var arrayDate = controlBaseYear()
            // console.log(arrayDate);
            return arrayDate[data-1]
        }
    }
    ],
    rowId: 'groupMessageID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdown btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",       

    buttons: [
        /*'copy', 'csv', 'excel', 'pdf', 'print'*/
        'copy',
        {
            extend: 'csvHtml5',
            title: 'BIP_Export_Table'
        },
        {
            extend: 'excelHtml5',
            title: 'BIP_Export_Table'
        }
    ],
    order: [[ 1, 'desc' ]],
    iDisplayLength: 10,		
    columns: [
        { data: null, defaultContent: '',width:'28px'},			
        { data: 'messageBipID',title:'ID' ,width:'70px' },
        { data: 'flgDraft',title:'Rascunho',width:'28px' },        
        { data: 'recipient',title:'Destino',width:'70px' },
        { data: 'subject',title:'Assunto',width:'70px' },
        { data: 'fgAtv',title:'ATV',width:'28px' },
        { data: 'importance',title:'Importância',width:'28px' },
        { data: 'baseYearID',title:'Ano Acadêmico',width:'28px' }
    ]
});

/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-xs btn-block btn-default dropdown-toggle disabled" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    'Opções&nbsp;' +
    '</button>' +
    '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
'</div>');

$('#messageBipTable tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblMessageBipSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblMessageBipSearch.row($("#" + tblMessageBipSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblMessageBipSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
            let rowsData = tblMessageBipSearch.rows($("#" + tblMessageBipSearch.table().node().id + " tr.selected")).data();
            objDelete = rowsData[0].subject;
            $('.dropdown-item').click(function () { 
                tableActions(tblMessageBipSearch, this);  
            });
           
        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblMessageBipSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };
} );

$('#messageBipTable tbody').on( 'dblclick', 'tr', function () {
    // console.log('double click');
    tblMessageBipSearch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btnSearchAction').removeClass('disabled btn-default');
    $('#btnSearchAction').addClass('btn-info');
    $('#propertiesMessageBip').trigger("click");
});

if ($('#hidMessageBipID').val() != null && $('#hidMessageBipID').val() != "" && $('#hidMessageBipID').val() != "null") {
    $("#messageBipID").val($('#hidMessageBipID').val());		
}

$('.deleteConfirmation').click(function () {
    deleteMessageBip($('.search-button'),objDelete);			
});



$('#messageBipSearch').click();