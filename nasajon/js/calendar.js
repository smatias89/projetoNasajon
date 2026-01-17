


// $('#timepicker,#eventStart,#eventEnd').datetimepicker({
//     format: 'LT'
// })
// $(document).ready(function () {
//     setTimeout(function () {
//       const btn = $('.fc-searchButton-button');
//       btn.attr('id', 'btnSearchCalendar'); 
//       btn.html('<i class="fas fa-search"></i>'); 
//     }, 100);
//   });
// obj e flags 
var objEvent = {};

var blnCheckCalendar = false

var isEdit = false;
var selectedEvent = null;
/* initialize the external events
 -----------------------------------------------------------------*/
function ini_events(ele) {
    ele.each(function () {

        // create an Event Object (https://fullcalendar.io/docs/event-object)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()) // use the element's text as the event title
        }

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject)

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 1070,
            revert: true, // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        })

    })
}

ini_events($('#external-events div.external-event'))

/* initialize the calendar
 -----------------------------------------------------------------*/
//Date for the calendar events (dummy data)
var date = new Date()
var d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear()

var Calendar = FullCalendar.Calendar;
var Draggable = FullCalendar.Draggable;

var containerEl = document.getElementById('external-events');
var checkbox = document.getElementById('drop-remove');
var calendarEl = document.getElementById('calendar');

// initialize the external events
// -----------------------------------------------------------------

// new Draggable(containerEl, {
//   itemSelector: '.external-event',
//   eventData: function(eventEl) {
//     return {
//       title: eventEl.innerText,
//       backgroundColor: window.getComputedStyle( eventEl ,null).getPropertyValue('background-color'),
//       borderColor: window.getComputedStyle( eventEl ,null).getPropertyValue('background-color'),
//       textColor: window.getComputedStyle( eventEl ,null).getPropertyValue('color'),
//     };
//   }
// });

var calendarMaxId = 1;

var calendar = new Calendar(calendarEl, {
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'newButton searchButton'/*dayGridMonth ,timeGridWeek,timeGridDay'*/
    },
    customButtons: {
        newButton: {
            text: 'Novo',
            // click: function() {
            //     alert('Cliquei no botão Novo!');
            //     
            // }
        },
        searchButton: {
            // text: 'Buscar', 
            // text: '🔍', 
            click: function () {
                // Aqui pode abrir um modal, ou exibir um input
                var table = $('#tableLoaderEventSearch').DataTable();
                table.clear().draw();
                $('#searchEventName').val('');
                $('#modalSearchEvent').modal('show');
                
            }
        }
    },
    // eventDragStart: function(info) { //detecção de evento
    //     draggingEvent = info.event;
    //     // console.log('draggingEvent :>> ', draggingEvent);
    // },
    // eventDragStop: function(info, jsEvent) {
    //     console.log('jsEvent');
    //     console.log(info.jsEvent);
    //     // verifica se soltou FORA do calendário
    //     // var calendarBounds = document.querySelector('.fc-view-container') || document.querySelector('.fc');
    //     const calendarEl = document.getElementById('calendar')
    //     var rect = calendarEl.getBoundingClientRect();
    //     // console.log('rect :>> ', rect);
    //     const largura = rect.width;
    //     const altura = rect.height;
    //     console.log('Largura:', largura, 'Altura:', altura);
    //     console.log('rect.left:', rect.left, 'rect.right:', rect.right);
    //     console.log('rect.top:', rect.top, 'rect.bottom:', rect.bottom);

    //     // if (info.jsEvent.pageX < rect.left || info.jsEvent.pageX > rect.right || info.jsEvent.pageY < rect.top ||info.jsEvent.pageY > rect.bottom) {
    //     //     if (confirm('Deseja excluir esse evento?')) {
    //     //         draggingEvent.remove();
    //     //     }
    //     // }

    //     draggingEvent = null;
    // },
    // eventDrop:function(info, jsEvent) {
    //     console.log('eventDrop');
    //     console.log(info);
    // },

    locale: 'pt-br', //add tradução
    themeSystem: 'bootstrap',
    //Random default events
   
    events: [
    //     {
    //         id: 'evt' + (calendarMaxId++),
    //         title: 'All Day Event',
    //         start: new Date(y, m, 1),
    //         backgroundColor: '#f56954', //red
    //         borderColor: '#f56954', //red
    //         allDay: true //true somente data de start
    //     },
    //     {
    //         id: 'evt' + (calendarMaxId++),
    //         title: 'Long Event',
    //         start: new Date(y, m, d - 5),
    //         end: new Date(y, m, d - 2),
    //         backgroundColor: '#f39c12', //yellow
    //         borderColor: '#f39c12' //yellow
    //     },
    //     {
    //         id: 'evt' + (calendarMaxId++),
    //         title: 'Meeting',
    //         start: new Date(y, m, d, 10, 30),
    //         allDay: false,
    //         backgroundColor: '#0073b7', //Blue
    //         borderColor: '#0073b7' //Blue
    //     },
    //     {
    //         id: 'evt' + (calendarMaxId++),
    //         title: 'Lunch',
    //         start: new Date(y, m, d, 12, 0),
    //         end: new Date(y, m, d, 14, 0),
    //         allDay: false,
    //         backgroundColor: '#00c0ef', //Info (aqua)
    //         borderColor: '#00c0ef' //Info (aqua)
    //     },
    //     {
    //         id: 'evt' + (calendarMaxId++),
    //         title: 'Birthday Party',
    //         start: new Date(y, m, d + 1, 19, 0),
    //         end: new Date(y, m, d + 1, 22, 30),
    //         allDay: false,
    //         backgroundColor: '#00a65a', //Success (green)
    //         borderColor: '#00a65a' //Success (green)
    //     },
        // {
        //     id: 'evt' + (calendarMaxId++),
        //     title: 'Click for Google',
        //     start: new Date(y, m, 27),
        //     end: new Date(y, m, 29),
        //     url: 'https://www.google.com/',
        //     backgroundColor: '#3c8dbc', //Primary (light-blue)
        //     borderColor: '#3c8dbc' //Primary (light-blue)
        // },
        // {
        //     id: 'evt' + (calendarMaxId++),
        //     title: 'Recorretne',
        //     // groupId: 'blueEvents', // recurrent events in this group move together
        //     daysOfWeek: [ '0' ],
        //     startTime: '10:45:00',
        //     endTime: '12:45:00',
        //     startRecur: '2025-04-01',
        //     endRecur: '2025-04-31',
        // },
    ],

    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar !!!
    drop: function (info) {
        // is the "remove after drop" checkbox checked?
        if (checkbox.checked) {
            // if so, remove the element from the "Draggable Events" list
            info.draggedEl.parentNode.removeChild(info.draggedEl);
        }
    },
    eventDidMount: function (info) {
        // console.log(info);
        // console.log(info.el);
        // console.log(info.event);
        //removido id=\"editEvent' + info.event.id +
        if (info.event.id !== undefined && info.event.id != null) {
            // console.log('creat id...');
            let elem = info.el;
            //   console.log(elem);
            let divIcons = document.createElement('div');
            divIcons.innerHTML = '<a href="#" class=\"editEvent\" id=' + info.event.id + '><i class="fa fa-edit"></i></a><a href="#" class=\"delEvent\" id=\"delEvent' + info.event.id + '\">&nbsp;<i class="fa fa-trash-alt"></i></a>';

            let divInnerDay = elem.querySelectorAll('div.fc-event-main div.fc-event-main-frame');
            //console.log(divInnerDay);
            if (1 == divInnerDay.length) {
                //console.log('evento do tipo dia...');
                let elemInnerDayTmp = divInnerDay[0];
                elemInnerDayTmp.appendChild(divIcons);
            } else {
                //console.log('evento do tipo intervalo...');
                elem.appendChild(divIcons);
            }


        }
        
        // $('.editEvent').on("click",function (e) { 
        //     console.log('click no dom');
        //     e.preventDefault()
        //     var evento = info.event;
        //     console.log(evento._def);

        // });

        info.el.addEventListener('dbclick', function(e) {
            e.preventDefault(); 
            console.log('biuld obj');

            var evento = info.event;
            // console.log(evento._def);
            console.log(evento.title+ ' - ' + evento.backgroundColor+ ' - ' +evento.start+ ' - ' +evento.end+ ' - ' +info.event.id + ' - ' +evento.extendedProps);

            objEvent.title = evento.title,
            objEvent.start = evento.start,
            objEvent.end = evento.end,
            objEvent.url = evento.url
            objEvent.allDay = evento.allDay
            objEvent.backgroundColor = evento.backgroundColor

        });

        // var evento = info.event;

        // console.log(evento);
        // console.log(evento.title+ ' - ' +
        //     evento.start+ ' - ' +
        //     evento.end+ ' - ' +
        //     evento.extendedProps);
        // var objEvent = {
        //     title: evento.title,
        //     start: evento.start,
        //     end: evento.end,
        //     url: evento.url
        // }
    },
    datesSet:function (event){
        console.log('start calendar...');
        var btnSearch = $('.fc-searchButton-button');
        btnSearch.attr('id', 'btnSearchCalendar'); 
        btnSearch.html('<i class="fas fa-search"></i>'); 

        // var btnNew = $('.fc-newButton-button') antes eram somente essas duas linhas
        // btnNew.attr('id', 'btnNewCalendar'); antes eram somente essas duas linhas
        // btnNew.html('<i class="fas fa-search"></i>'); 

        var btnNew = $('.fc-newButton-button')
        // if ($('#hidActionSave').val()) {
        //     // console.log($('#hidActionView').val());
        //     btnNew.attr('id', 'btnNewCalendar'); 
        // } else {
        //     btnNew.hide();
        // }
    }
    



});


calendar.render();
// $('#calendar').fullCalendar()

/* ADDING EVENTS */
var currColor = '#3c8dbc' //Red by default
// Color chooser button
$('#color-chooser > li > a').click(function (e) {
    e.preventDefault()
    // Save color
    currColor = $(this).css('color')
    // Add color effect to button
    $('#add-new-event').css({
        'background-color': currColor,
        'border-color': currColor
    })
})

//clique com o botão direito

// $('[role="gridcell"]').on("contextmenu", function (e){
$('a.fc-daygrid-day-number').on("contextmenu", function (e){
    e.preventDefault()
    console.log('contextmenu .... '); 
    
    console.log('$([aria-label]).text(); :>> ', $(this).attr('aria-label'));
    var dateOpen = $(this).attr('data-date');

    var dateOpenModal = moment(dateOpen).format(TO_PATTERN_DATETIME)
    $('#eventStart').datetimepicker('date', moment(dateOpenModal))
    console.log('dateOpenModal :>> ', dateOpenModal);
    
    $('.fc-newButton-button').trigger('click');

    var dateOpenModalInput = moment(dateOpen).format('MM/DD/YYYY HH:mm:ss')
    $('#eventStartInput').val(dateOpenModalInput);
    // $('#eventStartInput').val($(this).attr('data-date'));
})
    


//oldd
// $('#add-new-event').click(function (e) {
//     e.preventDefault()
//     // Get value and make sure it is not null
//     var val = $('#new-event').val()
//     if (val.length == 0) {
//         return
//     }

//     // Create events
//     var event = $('<div />')
//     event.css({
//         'background-color': currColor,
//         'border-color': currColor,
//         'color': '#fff'
//     }).addClass('external-event')
//     event.text(val)
//     $('#external-events').prepend(event)

//     // Add draggable funtionality
//     ini_events(event)

//     // Remove event from text input
//     $('#new-event').val('');

//     console.log('calendarMaxId: ' + calendarMaxId);

//     calendar.addEvent({
//         id: 'evt' + (calendarMaxId++),
//         title: 'EVT-' + calendarMaxId,
//         start: '2025-05-07T12:30:00',
//         end: '2025-05-07T13:30:00',
//         //allDay         : true,
//         backgroundColor: '#f39c12', //yellow
//         borderColor: '#f39c12', //yellow                        
//     });

// })

//aumentar o tamanho do evento
calendar.on('eventResize', function(info) {
    var eventResize = info.event;

    console.log('Evento redimensionado:', eventResize.title);
    console.log('Nova data de início:', eventResize.start);
    console.log('Nova data de fim:', eventResize.end);

    $('.modal-title-delete').text('Mover data de evento');
    $('.message-modal-delete').text('Você deseja alterar a data do evento: ' + eventResize.title);
    $('.deleteConfirmation').attr('id', 'resizeEventCalendar'); //criação deid só por padrão
    $('.btn-default').attr('id', 'resizeEventCalendarClose'); //criação deid só por padrão

    $('#modalDelete').modal('show');
    

    $('#resizeEventCalendar').off().click(function (e) { 
        e.preventDefault();
        //cast date
        var startDate = moment(eventResize.start).format(TO_PATTERN_DATETIME)
        var endDate = moment(eventResize.end).format(TO_PATTERN_DATETIME)

        var objEventCalendar = new Object()
        objEventCalendar.eventId = eventResize.id;
        objEventCalendar.title = eventResize.title;
        objEventCalendar.urlLink = eventResize.url;
        // var typeEvent = eventDrop.allDay;
        // if (typeEvent == true) {
        //     objEventCalendar.typeEvent = '2'
        // } else if (typeEvent == false) {
        //     objEventCalendar.typeEvent = '1'
        // }
        objEventCalendar.typeEvent = eventResize.allDay == true ? '1' : '2';
        objEventCalendar.startDate = startDate;
        objEventCalendar.endDate = endDate;
        objEventCalendar.borderColor = eventResize.borderColor;
        objEventCalendar.backgroundColor = eventResize.backgroundColor;

        console.log('event drop save ...');
        blnCheckSave = true;
        console.log(objEventCalendar);return
        dropCalendar(objEventCalendar)
    })
    var blnCheckClose;
    $('#modalDelete').click(function (e) { 
        // console.log('e.target.tagName: ',e.target.tagName);
        // console.log('e.target.className: ',e.target.className);
        // console.log('e.target.id: ',e.target.id);
        blnCheckClose = e.target.className
        blnCheckClose = blnCheckClose.substring(6);
        // console.log(blnCheckClose);
        if(blnCheckClose == 'fade'){
            // console.log('caiu no ');
            info.revert();
        }
    });
    
    

    $('#resizeEventCalendarClose').click(function (e) { 
        info.revert();
        
    });
    $('.close').click(function (e) { 
        info.revert();
        
    });


});

//levar dragg de um lado a outro
calendar.on('eventDrop', function(info) {
    //evet muving
    var eventDrop = info.event;
    // selectedEvent = info.event
    // console.log(eventDrop);
    console.log('Event drop moving');

    if(eventDrop._def.groupId != ""){
        toastr.warning('Não é possível mover esse evento com Recorrência!',eventDrop.title)
        info.revert();
        // $(".editEvent").trigger('click');
        
        
        return
    }

    
    // console.log('Evento movido:', eventDrop);
    // console.log('Evento movido id:', eventDrop.id);
    // console.log('Evento movido groupId:', eventDrop.groupId);
    // console.log('Nova data de início:', eventDrop.start);
    // console.log('Nova data de fim:', eventDrop.end);

    // confirm('Deseja mover o evento: '+ eventDrop.title)
    $('.modal-title-delete').text('Mover data de evento');
    $('.message-modal-delete').text('Você deseja alterar a data do evento: ' + eventDrop.title);
    $('.deleteConfirmation').attr('id', 'dropEventCalendar'); //criação deid só por padrão
    $('.btn-default').attr('id', 'dropEventCalendarClose'); //criação deid só por padrão

    $('#modalDelete').modal('show');
    
    
    //tudo ok até agr
    $('#dropEventCalendar').off().click(function (e) { 
        e.preventDefault();
        console.log('start drop');
        var objEventCalendar = new Object()
        var startDateTime = eventDrop.start
        // console.log(startDateTime.toISOString());
        
        var startDateTimeTMP = startDateTime.toISOString();
        startDateTimeTMP = startDateTimeTMP.split('T');
        
        var startDate = startDateTimeTMP[0];
        startHour = startDateTimeTMP[1];
        var startHour = startHour.split('.');
        startHour = startHour[0];
        // console.log(startDate);
        // console.log(startHour);


        var endDateTime = eventDrop.end
        // console.log(endDateTime);

        //objEventCalendar.endDate
        if(endDateTime != null){
            // console.log(endDateTime.toISOString());
        
            var endDateTimeTMP = endDateTime.toISOString();
            endDateTimeTMP = endDateTimeTMP.split('T');
            
            var endDate = endDateTimeTMP[0];
            endHour = endDateTimeTMP[1];
            var endHour = endHour.split('.');
            endHour = endHour[0];
            // console.log(endDate);
            // console.log(endHour);
            objEventCalendar.endDate = endDate+' '+endHour;

        }else if(endDateTime == null){
            objEventCalendar.endDate = ''
        }
        

        
        objEventCalendar.eventID = eventDrop.id;
        objEventCalendar.actionType = 'DROP';
        objEventCalendar.startDate = startDate+' '+startHour;
        console.log(objEventCalendar);
        if(eventDrop.groupId > 0 && eventDrop.groupId != null){
            objEventCalendar.startRecurrence = startDate
            objEventCalendar.endRecurrence = endDate
        }
        dropCalendar(objEventCalendar); return


    });


    var blnCheckClose;
    $('#modalDelete').click(function (e) { 
        // console.log('e.target.tagName: ',e.target.tagName);
        // console.log('e.target.className: ',e.target.className);
        // console.log('e.target.id: ',e.target.id);
        blnCheckClose = e.target.className
        blnCheckClose = blnCheckClose.substring(6);
        // console.log(blnCheckClose);
        if(blnCheckClose == 'fade'){
            // console.log('caiu no ');
            info.revert();
        }
    });
    
    

    $('#dropEventCalendarClose').click(function (e) { 
        info.revert();
        
    });
    $('.close').click(function (e) { 
        info.revert();
        
    });
    

});

// pega os dados para edição
calendar.on('eventClick', function (info) { //pegar o evento calendar.on ....
    info.jsEvent.preventDefault();

    console.log('load event for to edit ...');
    selectedEvent = info.event;

    // console.log(selectedEvent);
    // console.log(selectedEvent.extendedProps );
    // console.log(selectedEvent._def );
    // console.log(selectedEvent._def.recurringDef );
    return

    if ($(info.jsEvent.target).closest('.delEvent').length) {
        console.log('begin delete ....'); //futuramente evoluir para aqui

    }

    if (!$(info.jsEvent.target).closest('.editEvent').length) {
        console.log('Clique não foi no botão .editEvent!');
        return
    }


    $('#saveEvent').text('Salvar');

    $('#modalInfoCalendar').modal('show');
});

// add novo evento
$('.fc-newButton-button').click(function () {
    console.log('new event ...');
    $('#divEventID').hide();
    $('#divEventData').hide();
    $('#divEventRecurring').hide();
    $('#divEventRecurrenceSchedule').hide();
    $('#divEventRecurrenceTime').hide();
    $('#saveEventEditOne').hide();

    // $('#divEventAllDayStart').hide();
    // $('#divEventAllDayEnd').hide();
    $('#eventTypeDay').prop('checked', false);
    $('#eventRecurrent').prop('checked', false);

    $('#divEventDataTime').show();
    // for DAO
    $("#eventAllDayEndInput").show();
    $('#divEventAllDayEnd').show();
    // $('#divEventStart').show();
    // $('#divEventEnd').show();

    

    //set for save
    isEdit = false;
    selectedEvent = null;

    //clear campos
    $('#eventRecurrenceStartInput,#eventRecurrenceEndInput').val('');
    $('#eventRecurrenceStartTimeInput,#eventRecurrenceEndTimeInput').val('');
    $('#eventID,#eventName,#eventMeetURL,#eventType,#eventStartInput,#eventEndInput,#eventColor,#eventAllDayStartInput,#eventAllDayEndInput').val('');

    //change event
    $('#eventType').change(function (e) {
        if ($('#eventType').val() == '1') {
            $('#divEventEnd').hide()
            $('#divEventStart').show()
        } else {
            $('#divEventStart').show()
            $('#divEventEnd').show()
        }


    });
    $('#saveEvent').text('salvar');

    $('#modalInfoCalendar').modal('show');
});

//load modal edit event
$("#calendar").on("click", ".editEvent", function (e) {

    console.log('calendar Edit');
    
    isEdit = true; //sert true
    e.preventDefault();

    let idTmp = $(this).attr('id');
    // console.log("edit event: " + idTmp);

    // if (idTmp.startsWith("editEvent")) {
    if (idTmp != null || idTmp != '') {
        // idTmp = idTmp.substring(9);
        // console.log(idTmp);
        let event = calendar.getEventById(idTmp);
        // console.log('event');
        // console.log(event);
        // console.log('Evento movido id:', event.id);

        var objFilters = new Object();
        objFilters.eventId = event.id;

        // console.log('filtro');
        getCalendarByFilterEventType(objFilters)


        //change
        $('#eventType').change(function (e) {
            if ($('#eventType').val() == '1') {
                $('#divEventEnd').hide()
                $('#divEventStart').show()
                
            } else {
                $('#divEventStart').show()
                $('#divEventEnd').show()
            }
    
    
        });
        
        $('#divEventID').show();
        $('#saveEvent').text('Salvar');
        $('#saveEventEditOne').hide();

        $('#modalInfoCalendar').modal('show');
        return
        event.remove();
    }


});

//Delete Event
$("#calendar").on("click", ".delEvent", function (e) {
    // Event handler code here
    e.preventDefault();
    console.log('delete event... ');

    let idTmp = $(this).attr('id');
    // console.log("Delete event" + idTmp);
    var event;

    if (idTmp.startsWith("delEvent")) {
        idTmp = idTmp.substring(8);
        // console.log(idTmp);
        let eventTMP = calendar.getEventById(idTmp);
        // console.log(eventTMP);
        event = eventTMP;

    }
    
    // console.log(event);
    $('.modal-title-delete').text('Apagar Evento');
    $('#deleteEventCalendarAll').hide();
    if(event.groupId == ""){

        $('.message-modal-delete').text('Você confirma a exclusão do evento "' + event.title+ '"?');

    }else if(event.groupId != null){

        $('#deleteEventCalendarAll').show();
        $('.message-modal-delete').text('Você confirma a exclusão somente do evento "' + event.title+ '" ou excluir todos relacionados a ele?');

    }
    
    // $('.deleteConfirmationEvent').text('Deletar')
    $('#modalDeleteCalendar').modal('show');

    // off() evita p duplo listing
    $('#deleteEventCalendarOnly').off().click(function (e) { 
        console.log('clicado');

        var objParameters = new Object();
        objParameters.eventID = parseInt(event.id);
        objParameters.actionType = 'DELETE';
        objParameters.parentEventID = '';
        objParameters.shdesc = event.title;

        deleteCalendar(null,objParameters)

    });
    $('#deleteEventCalendarAll').off().click(function (e) { 
        console.log('clicado all');

        var objParameters = new Object();
        objParameters.eventID = parseInt(event.id);
        objParameters.actionType = 'DELETE';
        objParameters.parentEventID = parseInt(event.groupId);
        objParameters.shdesc = event.title;

        deleteCalendar(null,objParameters)
        
    });

});


//blur messagem event recurrence
$('#eventRecurrenceEndTimeInput').blur(function (e) { 
    if($('#eventRecurringScheduleMonth').is(':checked')){
        var dateStart =$('#eventRecurrenceStartInput').val()
        dateStart = dateStart.split('/');
        // console.log('dateStart :>> ', dateStart,dateStart[1],dateStart[0]);
        var dateEnd =$('#eventRecurrenceEndInput').val() 
        dateEnd = dateEnd.split('/')
        // console.log('dateEnd :>> ', dateEnd);
        var textMessage = `O evento ${$('#eventName').val()} ocorrerá do dia ${dateStart[1]}/${dateStart[0]} até ${dateEnd[1]}/${dateEnd[0]} todo dia ${dateStart[1]}`
        $('#eventeRecurrenceMessage').text(textMessage);
    
    }else if($('#eventRecurringScheduleWeek').is(':checked')){
        var dateStart =$('#eventRecurrenceStartInput').val()
        dateStart = dateStart.split('/');
        // console.log('dateStart :>> ', dateStart,dateStart[1],dateStart[0]);
        var dateEnd =$('#eventRecurrenceEndInput').val() 
        dateEnd = dateEnd.split('/')
        // console.log('dateEnd :>> ', dateEnd);
        var textMessage = `O evento ${$('#eventName').val()} ocorrerá do dia ${dateStart[1]}/${dateStart[0]} até ${dateEnd[1]}/${dateEnd[0]} durante os dias da semana selecionados`
        $('#eventeRecurrenceMessage').text(textMessage);
    
    }
    
    
});

var blnCheckEditOne = 'N';
$('#saveEventEditOne').click(function(e){

    blnCheckEditOne = 'Y'
    $('#saveEvent').trigger('click')
});

//adição de .off() para evitar problema de “duplicação de listeners”
//salvar
$('#saveEvent').off().on('click', function (e) {
    e.preventDefault();
    
    var objEventCalendar = {}

    console.log('add event... begin save');
    var title = $('#eventName').val();
    // console.log('blnCheckEditOne :>> ', blnCheckEditOne);
    if (!title) {
        $('#eventName').focus();
        toastr.warning('Campo vazio','Título')
        return;
    }

    var typeEvent;
    var allDayDate;
    var allDayDateStart;
    var allDayDateEnd;
    var startDate;
    var endDate;

    console.log('set startDate ');
    var startDate = moment($('#eventStartInput').val()).format(TO_PATTERN_DATETIME) //TO_PATTERN_DATE
    $('#eventStart').datetimepicker('date', moment(startDate)); //diferente do daterangepicker, tem que ter o cast antes para não dar erro

    if ($('#eventEndInput').val() == null || $('#eventEndInput').val() == '') {

        console.log('set endDate null');
        $('#eventStart').datetimepicker({
            defaultDate: false,  // coloca que não há data inicial '0000-00-00 00:00:00'
            useCurrent: false    // não deixa que a data atual seja usada ao abrir o campo
        });
        $('#eventEnd').datetimepicker('clear');
        // $('#divEventEnd').hide()
        var endDate = ''; // caso não preencha o campo ('#eventEndInput')

    } else {
        console.log('set endDate ');
        var endDate = moment($('#eventEndInput').val()).format(TO_PATTERN_DATETIME)
        $('#eventEnd').datetimepicker('date', moment(endDate)); //diferente do daterangepicker, tem que ter o cast antes para não dar erro
    }

    //Evento dia inteiro
    if($('#eventTypeDay').is(':checked')){ // só acontece se for marcado dia inteiro
        console.log('event allDay... ');
        
        allDayDateStart = moment($('#eventAllDayStartInput').val()).format(TO_PATTERN_DATE)
        allDayDateEnd = moment($('#eventAllDayEndInput').val()).format(TO_PATTERN_DATE)

        if(allDayDateStart == 'Invalid date'){
            
            toastr.warning('Selecione uma data final ou selecione como dia inteiro','Fim')
            $('#eventAllDayStartInput').focus();
        }

        if (allDayDateStart != '' && allDayDateEnd == 'Invalid date') {
            console.log('Only Start date >>> typeEvent = true'); // set event allDay = true

            typeEvent = true //1

            objEventCalendar.startDate = allDayDateStart;
            allDayDateEnd = '';
            objEventCalendar.endDate = allDayDateEnd;
            objEventCalendar.flgOnlyDate = 'Y';

            

        } else if(allDayDateStart != '' && allDayDateEnd != '') {
            console.log(' with Start date and End date >>> typeEvent = false');
            typeEvent = false // 2
            // console.log('allDayDateEnd :>> ', allDayDateEnd);
            // console.log('allDayDateStart :>> ', allDayDateStart);
            // console.log('allDayDateEnd :>> ', allDayDateEnd);

            if(allDayDateStart != allDayDateEnd){

                //cast para +1 dia
                console.log('execut cast +1day');
                var castDate = new Date(allDayDateEnd);
                castDate.setDate(castDate.getDate() + 1);

                var allDayDateEnd1 = castDate.toISOString().split('T')[0]; //toISOString() converte para o formato padrão 
                console.log(allDayDateEnd1);

                objEventCalendar.startDate = allDayDateStart;
                objEventCalendar.endDate = allDayDateEnd1;
                objEventCalendar.flgOnlyDate = 'Y';

            }else{

                //cast para +1 dia
                console.log('not cast +1');
            
                objEventCalendar.startDate = allDayDateStart;
                objEventCalendar.endDate = allDayDateEnd;
                objEventCalendar.flgOnlyDate = 'Y';

            }
            
            
            
        }
        
    } else {

        typeEvent = false // 2 

        // Não precisa do cast da data
        console.log('not all day... ');
        // console.log('Data time msm dia ou data inicio e fim diferentes ');

        var startDate = moment($('#eventStartInput').val()).format(TO_PATTERN_DATETIME) //TO_PATTERN_DATE
        $('#eventStart').datetimepicker('date', moment(startDate));

        if(!startDate){
            toastr.warning('Insira uma data incial','Data')
            return;
        }

        var endDate = moment($('#eventEndInput').val()).format(TO_PATTERN_DATETIME)
        $('#eventEnd').datetimepicker('date', moment(endDate));

        // console.log('startDate :>> ', startDate);
        // console.log('endDate :>> ', endDate);
        if(startDate.split(' ')[0] == endDate.split(' ')[0]){

            console.log('Data time the same day ');

        }else if(startDate.split(' ')[0] != endDate.split(' ')[0]){

            console.log('Data time not same day ');
            
        }

        objEventCalendar.flgOnlyDate = 'N';
        objEventCalendar.startDate = typeEvent == true ? objEventCalendar.startDate = allDayDate : objEventCalendar.startDate = startDate;
        objEventCalendar.endDate = endDate;
        
    }


    var valueID = $('#eventID').val();
    if (valueID == null || valueID == '') {
        objEventCalendar.eventId = '0'
    } else {
        objEventCalendar.eventId = valueID;
    }

    var urlLink = $('#eventMeetURL').val();
    var colorSquire = $('#eventColor').val();

    objEventCalendar.title = title;

    objEventCalendar.urlLink = urlLink;
    objEventCalendar.typeEvent = typeEvent == true ? '1' : '2';
    objEventCalendar.backgroundColor = colorSquire;
    objEventCalendar.borderColor = colorSquire;

    //necessário para edição
    // hidden input 
    console.log($('#parentEventIDElement').val());

    //edit recurrence -> recurrence
    if($('#parentEventIDElement').val() != '0'){
        console.log('recurrence -> recurrence');
        objEventCalendar.parentEventID = $('#parentEventIDElement').val();

        if(blnCheckEditOne == 'Y'){

            objEventCalendar.blnCheckEditOne = 'Y'

        }else if(blnCheckEditOne == 'N'){

            objEventCalendar.blnCheckEditOne = 'N'
        }

    }else if($('#parentEventIDElement').val() == '0' && $('#eventRecurrent').is(':checked')){

        console.log('normal -> recurrence');
        objEventCalendar.parentEventID = $('#eventID').val();
        objEventCalendar.blnCheckEditOne = 'Y';
        
    }

    // recurrences
    if($('#eventRecurrent').is(':checked')){

        console.log('flag recurrence yes... ');
        // console.log('startDate :>> ', startDate,startDate.split(' ')[0]);
        // console.log('endDate :>> ', endDate,endDate.split(' ')[0]);
        if(!$('#eventRecurringScheduleDay').is(':checked') && !$('#eventRecurringScheduleWeek').is(':checked') && !$('#eventRecurringScheduleMonth').is(':checked') && !$('#eventRecurringScheduleYear').is(':checked')){
            $('#eventName').focus();
            $('#eventName').blur();
            toastr.warning('Escolha uma recorrência')
            setTimeout(() => {
                $('#eventRecurringScheduleDay').prop('checked',true)
                
            }, 200);
            setTimeout(() => {
                $('#eventRecurringScheduleWeek').prop('checked',true)
                
            }, 400);
            setTimeout(() => {
                $('#eventRecurringScheduleMonth').prop('checked',true)
                
            }, 600);
            setTimeout(() => {
                $('#eventRecurringScheduleYear').prop('checked',true)
                
            }, 800);
            setTimeout(() => {
                $('#eventRecurringScheduleDay').prop('checked',false)
                
            }, 500);
            setTimeout(() => {
                $('#eventRecurringScheduleWeek').prop('checked',false)
                
            }, 700);
            setTimeout(() => {
                $('#eventRecurringScheduleMonth').prop('checked',false)
                
            }, 900);
            setTimeout(() => {
                $('#eventRecurringScheduleYear').prop('checked',false)
                
            }, 1100);
            
            return
        }

        var arrayListDayWeek = [];
        if($('#eventRecurringScheduleWeek').is(':checked')){
            console.log('flag recurrence week yes...');
            if($('#eventRecurringSunday').is(':checked')){
                arrayListDayWeek.push(0)
            }

            if($('#eventRecurringMonday').is(':checked')){
                arrayListDayWeek.push(1)
            }

            if($('#eventRecurringTuesday').is(':checked')){
                arrayListDayWeek.push(2)
            }

            if($('#eventRecurringWednesday').is(':checked')){
                arrayListDayWeek.push(3)
            }

            if($('#eventRecurringThursday').is(':checked')){
                arrayListDayWeek.push(4)
            }

            if($('#eventRecurringFriday').is(':checked')){
                arrayListDayWeek.push(5)
            }

            if($('#eventRecurringSaturday').is(':checked')){
                arrayListDayWeek.push(6)
            }

        }
        
        var startDate = moment($('#eventRecurrenceStartInput').val()).format(TO_PATTERN_DATE) //TO_PATTERN_DATE
        $('#eventRecurrenceStart').datetimepicker('date', moment(startDate));
        var endDate = moment($('#eventRecurrenceEndInput').val()).format(TO_PATTERN_DATE)
        $('#eventRecurrenceEnd').datetimepicker('date', moment(endDate));

        // console.log(arrayListDayWeek);
        var startTime = $('#eventRecurrenceStartTimeInput').val()
        var endTime = $('#eventRecurrenceEndTimeInput').val()


        if( arrayListDayWeek.length == '0' ){

            // console.log(startDate);
            // console.log(new Date(startDate));
            console.log('push weekday');
            var weekNumber = new Date(startDate) //verificar ta pegando o campo errado
            
            // console.log((weekNumber.getDay() + 6) % 6);
            result = (weekNumber.getDay() + 6) < 12 ? parseInt((weekNumber.getDay() + 6) % 6) + 1 : (weekNumber.getDay() + 6) % 6
            // console.log('result :>> ',result );

            //ajuste para mandar week correto para PHP
            arrayListDayWeek.push(result)
        }

        objEventCalendar.flgRecorring = 'Y';
        objEventCalendar.dayWeek = arrayListDayWeek
        objEventCalendar.flgOnlyDate = 'N';
        objEventCalendar.startDate = startDate+' '+startTime;
        objEventCalendar.endDate = endDate+' '+endTime;
        objEventCalendar.startRecurrence = startDate
        objEventCalendar.endRecurrence = endDate

        if($('[id*="eventRecurringSchedule"]:checked').attr('id') == 'eventRecurringScheduleDay'){ 
            
            objEventCalendar.recorringType = 'D';

        }else if($('[id*="eventRecurringSchedule"]:checked').attr('id') == 'eventRecurringScheduleWeek'){

            objEventCalendar.recorringType = 'W';

        }else if($('[id*="eventRecurringSchedule"]:checked').attr('id') == 'eventRecurringScheduleMonth'){

            objEventCalendar.recorringType = 'M';

        }else if($('[id*="eventRecurringSchedule"]:checked').attr('id') == 'eventRecurringScheduleYear'){

            objEventCalendar.recorringType = 'Y';

        }

        

    }else{

        objEventCalendar.flgRecorring = 'N';
        objEventCalendar.recorringType = 'N';
        //sem parent ID
        objEventCalendar.parentEventID = '';
       
    }

    
    console.log('salve event...');
    console.log(objEventCalendar); //toastr.warning('no save'); return

    //force atulization por edit
    if(selectedEvent != null){
        selectedEvent.remove()
    }
    saveCalendar(objEventCalendar, calendar)
    
    //mascara a atualização do calendário
    setTimeout(() => {
        $('#modalInfoCalendar').modal('hide');
    }, 1700); 
    


});

$('#searchCalendar').click(function (e) { 
    e.preventDefault();
    console.log('Search Event Calendar...');

    var objFilters = new Object();
    objFilters.title = $('#searchEventName').val();
    getCalendarSearchByFilter(objFilters,tblLoaderEventSearch)
    return
    //old
    
    var event = calendar.getEvents();
    console.log(event);
    var eventName = $('#searchEventName').val();
    
    var eventSearch = event.find(function(element) {
        // console.log(e);
        console.log(element.title);
        if(element.title == eventName){
            return element
        }
        // return e.title //.toLowerCase().includes(titulo.toLowerCase());
    });
    console.log(eventSearch);
    
    if (eventSearch) {

        calendar.gotoDate(eventSearch.start);
        var date = moment(eventSearch.start).format(TO_PATTERN_BRAZIL)
        date = date.split(' ')

        // console.log('Evento encontrado:', eventSearch);
        toastr.success('Evento encontrado! ', eventSearch.title +" dia "+date[0],
        {
            timeOut: 2000,
            preventDuplicates: true,
			positionClass: 'toast-top-right'
        });
        $('#searchEventName').val('');
        $('#modalSearchEvent').modal('hide');

    } else {
        toastr.warning('Nenhum evento encontrado com esse nome', "Não encontrado!",
        {
            timeOut: 2000,
            preventDuplicates: true,
            positionClass: 'toast-top-right'
        });
        $('#searchEventName').val('');
        $('#modalSearchEvent').modal('hide');
    }
    
});


getCalendarLoaderEvent(calendar, {})

$('.my-colorpicker2').colorpicker()
$('.my-colorpicker2').on('colorpickerChange', function (event) {
    $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
})

loadComboEventTypeAll($('#eventType'))

// function hexTransformRgb(hex) {
//     // tira o # se estiver presente
//     hex = hex.replace(/^#/, '');
  
//     // curto tipo #abc, expande para #aabbcc
//     if (hex.length === 3) {
//       hex = hex.split('').map(function(h) {
//         return h + h;
//       }).join('');
//     }
  
//     var bigint = parseInt(hex, 16);
//     var r = (bigint >> 16) & 255;
//     var g = (bigint >> 8) & 255;
//     var b = bigint & 255;
  
//     return 'rgb(' + r + ', ' + g + ', ' + b + ')';
// }
  
//hide and show for padrão

$('#divEventRecurrenceTime').hide();
$('#eventRecurringScheduleDay').hide();

//change event allday
$('#eventTypeDay').change(function (e) { 

    if($('#eventTypeDay').is(':checked')){
        console.log('flag change check ok');
		$('#eventRecurrent').prop('checked', false);

        $('#divEventRecurrenceTime').hide();
        $("#divEventDataTime").hide();


        $("#divEventData").show();
        //for DAO motivo
        $("#divEventAllDayEnd").show();


    }else{
        console.log('flag check change off');
        $('#eventRecurrent').prop('checked', false);

        $('#divEventRecurrenceTime').hide();

        $("#divEventDataTime").show();
        $('#divEventEnd').show();

        $("#divEventData").hide();


    }
    
});

//check Recorrence
function changeRecurrenceCalendar(){
    console.log('f_changeRecurrenceCalendar... ')
    $('#eventRecurringScheduleWeek').change(function (e) { 
        console.log('change clear Week');
        
        if(!$('#eventRecurringScheduleWeek').is(':checked')){

            $('#eventRecurringSunday').prop('checked', false)
            $('#eventRecurringMonday').prop('checked', false)
            $('#eventRecurringTuesday').prop('checked', false)
            $('#eventRecurringWednesday').prop('checked', false)
            $('#eventRecurringThursday').prop('checked', false)
            $('#eventRecurringFriday').prop('checked', false)
            $('#eventRecurringSaturday').prop('checked', false)

            $('#divEventRecurrenceDayWeek').hide();

        }else if($('#eventRecurringScheduleWeek').is(':checked')){
            $('#divEventRecurrenceDayWeek').show();
        }
        
    });

    //change qnd estiver no DAO
    $('#eventRecurringScheduleType').change(function (e) { 
        console.log('on for DAO');
        if($('#eventRecurringScheduleDay').is(':checked')){

            $('#eventRecurringScheduleWeek').prop('checked', false)
            $('#eventRecurringScheduleMonth').prop('checked', false)
            $('#eventRecurringScheduleYear').prop('checked', false)
            $('#divEventRecurrenceDayWeek').hide();

        }else if($('#eventRecurringScheduleWeek').is(':checked')){

            $('#eventRecurringScheduleDay').prop('checked', false)
            $('#eventRecurringScheduleMonth').prop('checked', false)
            $('#eventRecurringScheduleYear').prop('checked', false)
            $('#divEventRecurrenceDayWeek').show();
            
        }else if($('#eventRecurringScheduleMonth').is(':checked')){

            $('#eventRecurringScheduleDay').prop('checked', false)
            $('#eventRecurringScheduleWeek').prop('checked', false)
            $('#eventRecurringScheduleYear').prop('checked', false)
            $('#divEventRecurrenceDayWeek').hide();
            
        }else if($('#eventRecurringScheduleYear').is(':checked')){

            $('#eventRecurringScheduleDay').prop('checked', false)
            $('#eventRecurringScheduleWeek').prop('checked', false)
            $('#eventRecurringScheduleMonth').prop('checked', false)
            $('#divEventRecurrenceDayWeek').hide();
            
        }
        
    });

    $('#eventRecurrent').change(function (e) { 
        e.preventDefault();
        if($('#eventRecurrent').is(':checked')){
            console.log('change recorrece on ...');


            $('#eventTypeDay').prop('checked', false);

            $('#divEventRecurring').show();
            $('#divEventRecurrenceTime').show();
            $('#divEventRecurrenceSchedule').show();

            $("#divEventData").hide()
            $("#divEventDataTime").hide()
            $("#eventTypeDay").hide()

            $("#divEventRecurrenceDayWeek").hide();

            $('[id*="eventRecurringSchedule"]').change(function (e) { 

                if($('#eventRecurringScheduleWeek').is(':checked')){ 
                    console.log('recorrece day ...');
                    $("#divEventRecurrenceDayWeek").show();

                    // console.log('$([id*=eventRecurringSchedule]:checked)',$('[id*="eventRecurringSchedule"]:checked').attr('id'))
        
                }else{
                    $("#divEventRecurrenceDayWeek").hide();
                }
                
            });

            if(!$('#eventRecurringScheduleType').is(':checked')){
                console.log('change clear Type');
                $('#eventRecurringScheduleDay').prop('checked', false)
                $('#eventRecurringScheduleWeek').prop('checked', false)
                $('#eventRecurringScheduleMonth').prop('checked', false)
                $('#eventRecurringScheduleYear').prop('checked', false)
            };


            $('#eventRecurringScheduleType').change(function (e) { 
                
                if($('#eventRecurringScheduleDay').is(':checked')){

                    $('#eventRecurringScheduleWeek').prop('checked', false)
                    $('#eventRecurringScheduleMonth').prop('checked', false)
                    $('#eventRecurringScheduleYear').prop('checked', false)
                    $('#divEventRecurrenceDayWeek').hide();

                }else if($('#eventRecurringScheduleWeek').is(':checked')){

                    $('#eventRecurringScheduleDay').prop('checked', false)
                    $('#eventRecurringScheduleMonth').prop('checked', false)
                    $('#eventRecurringScheduleYear').prop('checked', false)
                    $('#divEventRecurrenceDayWeek').show();
                    
                }else if($('#eventRecurringScheduleMonth').is(':checked')){

                    $('#eventRecurringScheduleDay').prop('checked', false)
                    $('#eventRecurringScheduleWeek').prop('checked', false)
                    $('#eventRecurringScheduleYear').prop('checked', false)
                    $('#divEventRecurrenceDayWeek').hide();
                    
                }else if($('#eventRecurringScheduleYear').is(':checked')){

                    $('#eventRecurringScheduleDay').prop('checked', false)
                    $('#eventRecurringScheduleWeek').prop('checked', false)
                    $('#eventRecurringScheduleMonth').prop('checked', false)
                    $('#divEventRecurrenceDayWeek').hide();
                    
                }
                
            });


        }else{
            console.log('recorrece off ...')
            $('#eventTypeDay').prop('checked', false);

            $('#divEventRecurring').hide();
            $('#divEventRecurrenceTime').hide()
            $("#eventTypeDay").show()


            if($('#eventTypeDay').is(':checked')){
            
                $("#divEventData").show();

            }else{
                $("#divEventDataTime").show();
            }


        }
        
    });
}
changeRecurrenceCalendar()


//loaderEventSearch
var divSearchActionOptionsEvent =

' <a class="dropdown-item" href="#" id="searchEventTable"><i class="fas fa-search mr-1"></i> Localizar Evento </a>'
/*<% } else out.println("''"); %>*/ +
// ' <a class="dropdown-item" href="#" id="removeEventTable"><i class="fas fa-trash-alt mr-1"></i> Remover Evento </a>'
// /*<% } else out.println("''"); %>*/ +

' <a class="dropdown-item" href="#" id="propertiesEventTable"><i class="fas fa-tools mr-1"></i> Editar Evento </a>';
tblLoaderEventSearch = $('#tableLoaderEventSearch').DataTable({
    select: {
        style: 'single' // multi ou single
    },
    columnDefs: [ 
        {
            orderable: false,
            className: 'select-checkbox',
            targets:   0,
            data: null
        }, 
        // {
        //     orderable: false,
        //     // className: 'select-checkbox',
        //     targets:   5,
        //     defaultContent: '<button type="button" aria-pressed="false" class="fc-searchButton-button btn btn-primary" id="btnModalSearchCalendar"><i class="fas fa-search"></i></button>',
        //     data: null
        // }

    ],
    rowId: 'eventSearchID',
    dom: 
        "<'row'<'col-sm-2'l><'col-sm-3'B><'col-sm-1 text-center divDropdownEvent btn-group dropright'><'offset-sm-1 col-sm-2'><'col-sm-3'f>>" +
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
        { data: null, defaultContent:'' },	
        { data: 'eventID'},			
        { data: 'shdesc' },
        { data: 'startTime' },        
        { data: 'endTime' }
        // { data: null, }			
    ]
});

$('.divDropdownEvent').html('<button class="btn disabled btn-info new-button dropdown-toggle" type="button" id="btnSearchAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    'Opções&nbsp;' +'</button>' +
    '<div class="dropdown-menu text-xs" aria-labelledby="btnSearchAction" id="divSearchActionOptionsEvent">' +							 					  
'</div>');

$('#tableLoaderEventSearch tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
    }
    else {
        tblLoaderEventSearch.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    };
    //console.log('flgLocked -> ' + tblLoaderEventSearch.row($("#" + tblLoaderEventSearch.table().node().id + " tr.selected")).data().flgLocked);
    if (tblLoaderEventSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {			
        $('#divSearchActionOptionsEvent').html(divSearchActionOptionsEvent);	  

        let rowsData = tblLoaderEventSearch.rows($("#" + tblLoaderEventSearch.table().node().id + " tr.selected")).data();
        objDelete = rowsData[0].shdesc;
        $('.dropdown-item').click(function () {
            tableActionsCalendar(tblLoaderEventSearch, this);
        });

        $('#btnSearchAction').removeClass('disabled btn-default');
        $('#btnSearchAction').addClass('btn-info');
    } else if (!tblLoaderEventSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {
        $('#btnSearchAction').removeClass('btn-info');
        $('#btnSearchAction').addClass('disabled btn-default');
    };

});

function tableActionsCalendar(objDataTable, objAction){
    let tableID = objDataTable.table().node().id;
    let selectedRows = $("#" + tableID + " tr.selected");

    //let rowsId = objDataTable.row(selectedRows).id();
    let rowsData = objDataTable.rows(selectedRows).data();
    var rowsDataID = rowsData[0].eventID
    // console.log('rowsData :>> ', rowsData);
    // console.log(rowsDataID);
    if (objAction.id == 'searchEventTable') {


        //get all events
        var event = calendar.getEvents();
        // console.log(event);
        var eventSearch = event.find(function (element) {
            // console.log(e);
            console.log(element.id);
            if (element.id == rowsDataID) {
                return element
            }
            // return e.title //.toLowerCase().includes(titulo.toLowerCase());
        });
        console.log('eventSearch...');

        if (eventSearch) {

            calendar.gotoDate(eventSearch.start);
            var date = moment(eventSearch.start).format(TO_PATTERN_BRAZIL)
            var dateFocus = moment(eventSearch.start).format(TO_PATTERN_DATE)
            date = date.split(' ')

            // console.log('dateFocus :>> ', dateFocus);
            var dayFocus = $('[data-date="' + dateFocus + '"]');
            var cell = $('[data-date="' + dateFocus + '"]');

            dayFocus.css('border', '2px solid blue');
            dayFocus.css('box-shadow', '0 0 10px blue');
            $('[data-date="' + dateFocus + '"]').focus();
            

            // console.log('Evento encontrado:', eventSearch);
            toastr.success('Evento encontrado! ', eventSearch.title + " dia " + date[0],
                {
                    timeOut: 2000,
                    preventDuplicates: true,
                    positionClass: 'toast-top-right'
                });
            $('#searchEventName').val('');
            $('#modalSearchEvent').modal('hide');

            $('html, body').animate({
                scrollTop: cell.offset().top - 100
            }, 500);

            setTimeout(function(e) {
                
                dayFocus.css('border', '');
                dayFocus.css('box-shadow', '');

            }, 5000);



        } else {
            toastr.warning('Nenhum evento encontrado com esse nome', "Não encontrado!",
                {
                    timeOut: 2000,
                    preventDuplicates: true,
                    positionClass: 'toast-top-right'
                });
            $('#searchEventName').val('');
            $('#modalSearchEvent').modal('hide');
        }

    }else if( objAction.id == 'removeEventTable'){
        console.log('indisponivel');
    }else if( objAction.id == 'propertiesEventTable'){

        var objFilters = new Object();
        objFilters.eventId = rowsDataID;

        // console.log('filtro');
        getCalendarByFilterEventType(objFilters)


        //change
        $('#eventType').change(function (e) {
            if ($('#eventType').val() == '1') {
                $('#divEventEnd').hide()
                $('#divEventStart').show()
                
            } else {
                $('#divEventStart').show()
                $('#divEventEnd').show()
            }
    
    
        });
        
        $('#modalSearchEvent').modal('hide');
        $('#divEventID').show();
        $('#saveEvent').text('Salvar');
        $('#saveEventEditOne').hide();

        $('#modalInfoCalendar').modal('show');

        
    }


}

// $('#tableLoaderEventSearch tbody').on( 'click', 'td', function (e) {
//     console.log('clicado');
//     console.log(e.target);
//     console.log(e.target.id);

//     var elementClick = e.target;
//     var elementID = elementClick.closest('tr');
//     console.log(elementID);
//     const data = tblLoaderEventSearch.row(elementID).data();
//     console.log('Linha clicada:', data);

//     var dataID = data.eventID
//     console.log(dataID);

    // //get all events
    // var event = calendar.getEvents();
    // // console.log(event);
    // var eventSearch = event.find(function(element) {
    //     // console.log(e);
    //     console.log(element.id);
    //     if(element.id == dataID){
    //         return element
    //     }
    //     // return e.title //.toLowerCase().includes(titulo.toLowerCase());
    // });
    // console.log(eventSearch);
    
    // if (eventSearch) {

    //     calendar.gotoDate(eventSearch.start);
    //     var date = moment(eventSearch.start).format(TO_PATTERN_BRAZIL)
    //     date = date.split(' ')

    //     // console.log('Evento encontrado:', eventSearch);
    //     toastr.success('Evento encontrado! ', eventSearch.title +" dia "+date[0],
    //     {
    //         timeOut: 2000,
    //         preventDuplicates: true,
	// 		positionClass: 'toast-top-right'
    //     });
    //     $('#searchEventName').val('');
    //     $('#modalSearchEvent').modal('hide');

    // } else {
    //     toastr.warning('Nenhum evento encontrado com esse nome', "Não encontrado!",
    //     {
    //         timeOut: 2000,
    //         preventDuplicates: true,
    //         positionClass: 'toast-top-right'
    //     });
    //     $('#searchEventName').val('');
    //     $('#modalSearchEvent').modal('hide');
    // }
    
    
// });



// $('#classTable tbody').on( 'click', 'tr', function () {
    
//     //console.log('flgLocked -> ' + tblClassSearch.row($("#" + tblClassSearch.table().node().id + " tr.selected")).data().flgLocked);
//     if (tblLoaderEventSearch.rows('.selected').any() /*&& $('#btnSearchAction').hasClass('disabled')*/) {	
//         console.log('aqui');		
//         $('#divSearchActionOptionsEvent').html(divSearchActionOptionsEvent);  
    
//             // $("#showModificationHistoryClass").on( "click", function(event) {
//             //     tableActions(tblClassSearch, this)        
//             // });
//             let rowsData = tblLoaderEventSearch.rows($("#" + tblLoaderEventSearch.table().node().id + " tr.selected")).data();
//             objDelete = rowsData[0].shdesc;
//             $('.dropdown-item').click(function () { 
//                 tableActions(tblLoaderEventSearch, this);  
//             });

//         $('#btnSearchAction').removeClass('disabled btn-default');
//         $('#btnSearchAction').addClass('btn-info');
//     } else if (!tblLoaderEventSearch.rows('.selected').any() && !$('#btnSearchAction').hasClass('disabled')) {				
//         $('#btnSearchAction').removeClass('btn-info');
//         $('#btnSearchAction').addClass('disabled btn-default');
//     };
// } );



if (!$("#leftMenuCalendar").hasClass("active")) {
    $("#leftMenuCalendar").addClass("active");
}