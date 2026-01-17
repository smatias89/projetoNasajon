
tblAddMusicModal = $('#addMusicTableModal').DataTable({
    select: {
        style: 'multi' // multi ou single
    },
    columnDefs: [ {
        orderable: false,
        className: 'select-checkbox',
        targets:   0,
        data: null
    }, 
    { targets: [0, 1], visible: false }, // hide column
    // {
    // orderable: true,
    // targets:   6,
    // render: function (value) {
    //                 if (value === null) return "";
    //             return moment(value).format(TO_PATTERN_DATETIME);
    //         }
    // } 
    ],
    rowId: 'AddUserModalID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdown btn-group dropdown'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
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
        { data: 'listMusicID' /*,width:'70px'*/ },
        { data: 'shdesc', title:'Música',width:'2.8125rem' },        
        { data: 'singer', title:'Cantor',width:'2.8125rem' },        
        { data: 'key',title:'Tom',width:'0.625rem'/*,width:'28px'*/ }
    ]
});
    
$('#addMusicTableModal tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblScaleAdd.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };

    // if (tblScaleAdd.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
    //     $('#divSearchActionOptions').html(divSearchActionOptionsParm);	  
    
    //         let rowsData = tblScaleAdd.rows($("#" + tblScaleAdd.table().node().id + " tr.selected")).data();
    //         objDelete = rowsData[0].shdesc;
    //         $('.dropdown-item').click(function () { 
    //             tableActions(tblScaleAdd, this);  
    //         });
           
    //     $('#btnSearchAction').removeClass('disabled btn-default');
    //     $('#btnSearchAction').addClass('btn-info');
    // } else if (!tblScaleAdd.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
    //     $('#btnSearchAction').removeClass('btn-info');
    //     $('#btnSearchAction').addClass('disabled btn-default');
    // };
} );

// $('#functionTable tbody').on( 'dblclick', 'tr', function () {
//     // console.log('double click');
//     tblScaleAdd.$('tr.selected').removeClass('selected');
//     $(this).addClass('selected');
//     $('#btnSearchAction').removeClass('disabled btn-default');
//     $('#btnSearchAction').addClass('btn-info');
//     $('#propertiesDiscipline').trigger("click");
// });



/*  &#10247; vertical 3 dots */
$('.divDropdown').html('<button class="btn btn-info new-button dropdown-toggle " type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                'Opções&nbsp;' +
                '</button>' +
                '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptions">' +							 					  
'</div>');

var divSearchActionOptionsParm = "";

divSearchActionOptionsParm =' <a class="dropdown-item" href="#" id="addScaleUser"><i class="fas fa-user-plus mr-1"></i> Adicionar Usuario </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleOnlyUser"><i class="fas fa-eraser mr-1"></i> Remover Usuario </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleSelectedUser"><i class="fas fa-trash-alt mr-1"></i> Remover Seleção </a>'+
' <a class="dropdown-item" href="#" id="deleteScaleTableUser"><i class="fas fa-exclamation-triangle"></i> Apagar Todos </a>'

$('#btnSearchAction').on('click', function () {
    console.log('clicado');

    $("#divSearchActionOptions").html(divSearchActionOptionsParm);

    $('#addScaleUser').click(function (e) { 
        e.preventDefault();
        // console.log('Clicado USer');
        $('#modalAddUser').modal('show');
        
        
    });

    
});


$("#addMusicSearch").click( function () {
    console.log('addMusicSearch');
        objFilters = {}
    objFilters.userID = $('#addMusicFullName').val();
    // objFilters.taskID = $('#addUserTask').val();


    getScaleByFilterAddMusicModal(objFilters,tblAddMusicModal)
});



$('#addMusicRowsTable').click(function (e) { 
    e.preventDefault();

    var tableaddMusicTableModal = $('#addMusicTableModal').DataTable();
    var tableMusicTable = $('#musicTable').DataTable();

    var dataInsert = tableaddMusicTableModal.rows('.selected').data().toArray();
    var dataFinal = tableMusicTable.rows().data().toArray();

    if (dataInsert.length === 0) {
        toastr.warning('Nenhum aluno para adicionar.');
        return;
    }

    dataInsert.forEach(function (element) {
        var blnCheckDuplicate = false
        console.log('user includ ...');
        dataFinal.some(function(item) {
            (item.userID === element.userID) == true?  blnCheckDuplicate = true : '';
        });

        if (!blnCheckDuplicate) {
            console.log('status ok...');
            console.log(element);
            tableMusicTable.row.add(element).draw();
        } else {
            console.log('status not...');
            toastr.warning(`Aluno ${element.fullName} já está na lista final.`);
        }
    });

    $('#modalAddMusic').modal('hide');
    
});

// function extrairVideoId(url) {
//     const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
// }

// const MINHA_API_KEY_AQUI = 'AIzaSyARuUuBGB_JzmV1-6FLC4fFYeFSEfnnirc';

// $('#buscarLink').on('click', function () {
//     const url = $('#youtubeUrl').val();
//     const videoId = extrairVideoId(url);

//     if (!videoId) {
//         alert('Link inválido');
//         return;
//     }

//     $.ajax({
//         url: 'https://www.googleapis.com/youtube/v3/videos',
//         method: 'GET',
//         data: {
//             part: 'snippet',
//             id: videoId,
//             key: MINHA_API_KEY_AQUI
//         },
//         success: function (data) {
//             if (data.items.length === 0) {
//                 $('#resultado').html('Vídeo não encontrado');
//                 return;
//             }

//             console.log(data);

//             const snippet = data.items[0].snippet;
//             const titulo = snippet.title;
//             const canal = snippet.channelTitle;

//             console.log('snippet: '+snippet+' titulo: '+ titulo +' canal: '+ canal);

//             console.log(snippet);
            
//         },
//         error: function (err) {
//             console.error(err);
//             alert('Erro ao consultar a API');
//         }
//     });
// });

