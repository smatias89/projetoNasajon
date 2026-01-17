//loader combos

loadComboBaseYearGetAll($('#groupMessageBaseYearID'));
loadComboProfileGetAll($('#profileMemberSearch'));

//Masks
$('#cpfMemberSearch').mask('999.999.999-99').attr('placeholder','___.___.___-__');


// propreties , copy, delete
if ($("#hidGroupMessageID").val() != null && $("#hidGroupMessageID").val() != "" && $("#hidActionType").val() == 'copy') {

    console.log('COPY');
    $('.card-title').text("Copiar Disciplina");
    $("#divDisciplineID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();
    // updateTitle(true, $('#userLogin'));

}

if ($("#hidGroupMessageID").val() != null && $("#hidGroupMessageID").val() != "") {

    // console.log('Edit teacherIDParm >> ',$("#hidGroupMessageID").val());
    $('#groupMessageDelete').hide();
    var objFilters = new Object();
    objFilters.groupMessageID = $("#hidGroupMessageID").val();
    objFilters.modifiedDate = $("#hidGroupMessageModifiedDate").val();
    getGroupMessageByFilterForm(objFilters);

} else {

    // console.log('New');
    $("#divGroupMessageID").hide();
    $("#divCreatedBy").hide();
    $("#divCreatedDate").hide();
    $("#divModifiedBy").hide();
    $("#divModifiedDate").hide();
    $(".delete-button").hide();

}

//tables
var divSearchActionOptionsParm = // ' <a class="dropdown-item" href="#" id="copyClassRoom"><i class="fas fa-copy mr-1"></i> Copiar </a>'+
' <a class="dropdown-item" href="#" id="addGroupMessageMember"><i class="fas fa-user-plus mr-1"></i> Adicionar Membro </a>'+
' <a class="dropdown-item" href="#" id="deleteGroupMessageOnlyMember"><i class="fas fa-eraser mr-1"></i> Remover Membro </a>'+
' <a class="dropdown-item" href="#" id="deleteGroupMessageSelectedMember"><i class="fas fa-trash-alt mr-1"></i> Remover Seleção </a>'+
/*<% if (lstProfilePermission.stream().filter(c -> c.getPermissionShdesc().equals("DELETE_LOGIN")).findAny().orElse(null) != null) { %>*/
' <a class="dropdown-item" href="#" id="deleteGroupMessageTableMember"><i class="fas fa-exclamation-triangle"></i> Apagar Todos </a>'

tblGroupMemberList = $('#groupMemberTable').DataTable({
    select: {
        style: 'multi',
    },
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    },
    {
		orderable: false,
		targets:   3,
        render: function(data, type, row) {
            // console.log(data);
            return maskCPF(data)
        }
	},

    ],
    rowId: 'groupMemberID',
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
        { data: null, defaultContent: ''},			
        { data: 'userID',title:'ID',width:'70px' },
        { data: 'fullName',title:'Nome' },        
        { data: 'cpf',title:'CPF',width:'28px' },
        { data: 'email',title:'Email' }
    ]
});
    
if (!$("#leftMenuGroupMessager").hasClass("active")) {
    $("#leftMenuGroupMessager").addClass("active");
}

$('#groupMemberTable tbody').on( 'click', 'tr', function () {
    
    //console.log('flgLocked -> ' + tblGroupMemberList.row($("#" + tblGroupMemberList.table().node().id + " tr.selected")).data().flgLocked);
    if (tblGroupMemberList.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        	  
    
        let rowsData = tblGroupMemberList.rows($("#" + tblGroupMemberList.table().node().id + " tr.selected")).data();
        objDelete = rowsData[0].shdesc;
        $('.dropdown-item').click(function () { 
            tableActions(tblGroupMemberList, this);  
        });
           
        // $('#btnSearchAction').removeClass('disabled btn-default');
        // $('#btnSearchAction').addClass('btn-info');

        // console.log('aqui1');
    } else if (!tblGroupMemberList.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
        // $('#btnSearchAction').removeClass('btn-info');
        // $('#btnSearchAction').addClass('disabled btn-default');
        // console.log('aqui2');
    };
} );



/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-info new-button dropdown-toggle" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
                '</div>');
                            

$('#modalDelete').hide();	


//Modal
$('#btnSearchAction').click(function (e) { 
    console.log('action add member');
    
    $('#divSearchActionOptions').html(divSearchActionOptionsParm);

    var table = $('#groupMemberTable').DataTable();
    var rows = table.rows('.selected').data().toArray();
    var dataArray = table.rows().data().toArray();
    


    if(rows.length == '0' && dataArray.length > '0' ){
        
        console.log('remove all... ');
        $('#addGroupMessageMember').show();
        $('#deleteGroupMessageOnlyMember').hide();
        $('#deleteGroupMessageSelectedMember').hide();
        $('#deleteGroupMessageTableMember').show();

    }else if(rows.length == '0'){

        $('#addGroupMessageMember').show();
        $('#deleteGroupMessageOnlyMember').hide();
        $('#deleteGroupMessageSelectedMember').hide();
        $('#deleteGroupMessageTableMember').hide();

    }else if(rows.length == '1'){

        
        $('#addGroupMessageMember').show();
        $('#deleteGroupMessageOnlyMember').show();
        $('#deleteGroupMessageSelectedMember').hide();
        $('#deleteGroupMessageTableMember').hide();

        

    }else if(rows.length >= '2'){

        $('#addGroupMessageMember').show();
        $('#deleteGroupMessageOnlyMember').hide();
        $('#deleteGroupMessageSelectedMember').show();
        $('#deleteGroupMessageTableMember').hide();

    }

    $('#addGroupMessageMember').click(function (e) { 
        e.preventDefault();
        console.log('show modal');

        $('#modalAddMember').modal('show');
        $("#memberSearch").click();
        
    });

    $('#deleteGroupMessageOnlyMember').click(function (e) { 
        e.preventDefault();
        console.log('remove only... ');
        table.row('.selected').remove().draw();
        
    });

    $('#deleteGroupMessageSelectedMember').click(function (e) { 
        e.preventDefault();
        console.log('remove multi... ');
        table.rows('.selected').remove().draw();
        
    });

    $('#deleteGroupMessageTableMember').click(function (e) { 
        e.preventDefault();
        console.log('remove all... ');
        table.clear().draw();
        
    });
    
});

$('#memberSearch').click(function (e) { 
    e.preventDefault();
    console.log('memberSearch');

    var objMember = {}

    objMember.fullName = $('#nameMemberSearch').val();
    objMember.cpf = $('#cpfMemberSearch').val().replace(/[.\-]/g, "");
    // objMember.segment = $('#segmentMemberSearch').val();
    objMember.profile = $('#profileMemberSearch').val();
    objMember.email = $('#emailMemberSearch').val();
    objMember.classRoom = $('#classRoomMemberSearch').val();
    objMember.discipline = $('#disciplineMemberSearch').val();
    

    getGroupMemberByFilterTable(tblGroupMemberLoader, objMember)
    
});

var divSearchActionOptionsLoader = // ' <a class="dropdown-item" href="#" id="copyClassRoom"><i class="fas fa-copy mr-1"></i> Copiar </a>'+
// ' <a class="dropdown-item" href="#" id="addGroupMessageMember"><i class="fas fa-user-plus mr-1"></i> Adicionar Membro </a>'+
' <a class="dropdown-item" href="#" id="deleteLoaderOnlyMember"><i class="fas fa-eraser mr-1"></i> Remover Membro </a>'+
' <a class="dropdown-item" href="#" id="deleteLoaderSelectedMember"><i class="fas fa-trash-alt mr-1"></i> Remover Seleção </a>' +
/*<% if (lstProfilePermission.stream().filter(c -> c.getPermissionShdesc().equals("DELETE_LOGIN")).findAny().orElse(null) != null) { %>*/
' <a class="dropdown-item" href="#" id="deleteLoaderAllMember"><i class="fas fa-exclamation-triangle"></i> Apagar Todos </a>'

tblGroupMemberLoader = $('#tableGroupMemberLoader').DataTable({
    select: {
        style: 'multi',
    },
    columnDefs: [ 
    {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    },
    {
		orderable: false,
		targets:   5,
		render: function (data) {

            // console.log(data);
            if(data == null){
                return 'Vazio';
            }else{
                return data;
            }
					
		}
	},
    {
		orderable: false,
		targets:   6,
		render: function (data) {

            // console.log(data);
            if(data == null){
                return 'Vazio';
            }else{
                return data;
            }
					
		}
	}

    ],
    rowId: 'groupMemberLoaderID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdownLoader btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
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
        { data: null, defaultContent: ''},			
        { data: 'userID',title:'ID' },
        { data: 'fullName', title: 'Nome' },        
        { data: 'email',title:'email' },
        { data: 'cpf',title:'cpf' },
        { data: 'discipline',title:'Disciplina' },
        { data: 'classRoom',title:'Turma' },
        { data: 'profileID',title:'Staff' }
    ]
});


$('#tableGroupMemberLoader tbody').on( 'click', 'tr', function () {
    

    
} );




/*  &#10247; vertical 3 dots */
$('.divDropdownLoader').html('<button class="btn btn-info new-button dropdown-toggle" type="button" id="btnSearchActionLoader" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptionsLoader">' +							 					  
'</div>');

$('#btnSearchActionLoader').click(function (e) { 
    e.preventDefault();
    console.log('btnSearchActionLoader...  ');
    $('#divSearchActionOptionsLoader').html(divSearchActionOptionsLoader);

    var table = $('#tableGroupMemberLoader').DataTable();
    // table.rows('.selected').remove().draw();
    var rows = table.rows('.selected').data().toArray();
    var dataArray = table.rows().data().toArray();
    


    if(rows.length == '0' && dataArray.length > '0' ){
        
        console.log('remove all... ');
        $('#deleteLoaderOnlyMember').hide();
        $('#deleteLoaderSelectedMember').hide();
        $('#deleteLoaderAllMember').show();

    }else if(rows.length == '0'){

        $('#deleteLoaderOnlyMember').hide();
        $('#deleteLoaderSelectedMember').hide();
        $('#deleteLoaderAllMember').hide();

    }else if(rows.length == '1'){

        
        $('#deleteLoaderOnlyMember').show();
        $('#deleteLoaderSelectedMember').hide();
        $('#deleteLoaderAllMember').hide();

        

    }else if(rows.length >= '2'){

        $('#deleteLoaderOnlyMember').hide();
        $('#deleteLoaderSelectedMember').show();
        $('#deleteLoaderAllMember').hide();

    }

    
    $('#deleteLoaderOnlyMember').click(function (e) { 
        e.preventDefault();
        console.log('remove only... ');
        table.row('.selected').remove().draw();
        
    });

    $('#deleteLoaderSelectedMember').click(function (e) { 
        e.preventDefault();
        console.log('remove multi... ');
        table.rows('.selected').remove().draw();
        
    });

    $('#deleteLoaderAllMember').click(function (e) { 
        e.preventDefault();
        console.log('remove all... ');
        table.clear().draw();
        
    });
    
    
});


$('#addRowsTableGroupMember').click(function () {
    var tableGroupMemberLoader = $('#tableGroupMemberLoader').DataTable();
    var tableGroupMember = $('#groupMemberTable').DataTable();

    var dataInsert = tableGroupMemberLoader.rows('.selected').data().toArray();
    var dataFinal = tableGroupMember.rows().data().toArray();

    console.log('insert rows in table... ',dataInsert.length);

    if (dataInsert.length === 0) {
        toastr.warning('Nenhum aluno para adicionar.');
        return;
    }

    console.log('check duplicate... ');
    dataInsert.forEach(function (element) {
        var blnCheckDuplicate = false
        // console.log('element :>> ', element);

        dataFinal.some(function(item) {
            // console.log('item :>> ', item);
            (item.userID === element.userID) == true?  blnCheckDuplicate = true : '';
        });

        if (!blnCheckDuplicate) {
            // console.log('não duplicado');
            tableGroupMember.row.add(element).draw();
        } else {
            console.log('Duplicate');
            toastr.warning(`O ${element.fullName} já está na lista final.`);
        }
    });

    // Limpa a tabela tableGroupMemberLoader
    tableGroupMemberLoader.clear().draw();
    $('#modalAddMember').modal('hide');

});



//buttons

$("#groupMessageBackButton").click(function (e) { 
    e.preventDefault();
    location.href = "groupMessage"
});

$('#groupMessageSave').click(function (e) { 
    e.preventDefault();

    var objGroupMessage = {}

    var valueID = $('#groupMessageID').val();
    if (valueID == null || valueID == '') {
        objGroupMessage.groupMessageID = '0'
    } else {
        objGroupMessage.groupMessageID = valueID;
    }

    objGroupMessage.shdesc = $('#groupMessageName').val();
    objGroupMessage.fgAtv = $('#groupMessageFgAtv').val();
    objGroupMessage.baseYearID = $('#groupMessageBaseYearID').val();

    var lstGroupMember =[]
    var tableGroupMember = $('#groupMemberTable').DataTable();
    // tableGroupMember = tblGroupMember
    tableGroupMember.rows( function ( idx, data, node ) {
        
        var objGroupMessageTbl = new Object();
        console.log(data);
        objGroupMessageTbl.groupMemberID = (data.groupMemberID != undefined? data.groupMemberID:null);
        objGroupMessageTbl.userID = data.userID;

        lstGroupMember.push(objGroupMessageTbl);

    });

    objGroupMessage.lstGroupMember = lstGroupMember;
    // console.log('lstGroupMember :>> ', lstGroupMember);
    console.log('save groupMember... ');
    console.log(objGroupMessage); 
    saveGroupMessage(objGroupMessage)
    
});