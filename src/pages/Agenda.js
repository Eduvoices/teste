import React, { useState } from 'react';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import localeBr from '@fullcalendar/core/locales/pt-br'


const Agenda = () => {
    const [events, setEvents] = useState([])

    function renderSideBarEvents(event) {
        return (
            <li key={event.id}>
                <b>{formatDate(event.start, {year: 'numeric', month: '2-digit', day: 'numeric', locale:'pt-br'})}</b>
                <i style={{marginLeft: '8px'}}>{event.title}</i>
            </li>
        )
    }

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    function createEventId() {
        let eventGuid = 0
        String(eventGuid++)
    }

    function handleDateSelect(selectInfo) {
        let title = prompt('Por favor digite o título do evento')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect()

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    function handleEventClick(clickInfo) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Tem certeza de que deseja deletar o evento: '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }

    function handleEvents(events) {
        setEvents(events)
    }

    function renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instruções</h2>

                    <ul>
                        <li>Selecione a data e você será levado a criar um novo entento</li>
                        <li>Arraste, solte e mude a extensão dos eventos</li>
                        <li>Clique em um evento deletá-lo</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>Todos os eventos</h2>
                    <ul>
                        {events.map(renderSideBarEvents)}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div className='grid'>
            <div className='col-12'>
                <div className='card calendar-demo'>
                    <div className='demo-app'>
                    {renderSidebar()}
                        <div className='demo-app-main'>
                            <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev, next, today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            initialView='dayGridMonth'
                            locale={localeBr}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={true}
                            select={handleDateSelect}
                            eventContent={renderEventContent}
                            eventClick={handleEventClick}
                            eventsSet={handleEvents}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agenda;
