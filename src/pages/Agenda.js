import React, { useEffect, useState } from 'react';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import localeBr from '@fullcalendar/core/locales/pt-br'
import EventService from '../service/EventService';

const Agenda = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const eventService = new EventService();
        eventService.getEvents().then((data) => setEvents(data));
    }, []);

    function renderSideBarEvents(event) {
        let teste = '20/02/2024'
        let teste2 = formatDate(event.Agenda_Data, {year: 'numeric', month: '2-digit', day: 'numeric', locale:'pt-br'})

        if (teste === teste2) {
            return (
                <li key={event.Agenda_Codigo}>
                    <b>{formatDate(event.Agenda_Data, {year: 'numeric', month: '2-digit', day: 'numeric', locale:'pt-br'})}</b>
                    <i style={{marginLeft: '8px'}}>{event.Agenda_Compromisso}</i>
                </li>
            )
        }

    }

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.start}</b>
                <i style={{whiteSpace:'normal'}}>{eventInfo.event.title}</i>
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

    function renderSidebar() {
        return (
            <div className='demo-app-sidebar' style={{width:'100%'}}>
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
                {renderSidebar()}
                    <div className="col-12 md:col-12 lg:col-12">
                        <div className="card card-w-title" style={{height:'100%'}}>
                        <FullCalendar
                            eventClick={handleEventClick}
                            eventContent={renderEventContent}
                            // eventsSet={handleEvents}
                            initialView="dayGridMonth"
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
                            editable
                            selectable
                            selectMirror
                            dayMaxEvents
                            locale={localeBr}
                            select={handleDateSelect}
                            events={events}
                        />
                        </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Agenda;
