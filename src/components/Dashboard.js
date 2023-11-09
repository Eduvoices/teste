import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventService from '../service/EventService';
import localeBr from '@fullcalendar/core/locales/pt-br'


const Dashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const eventService = new EventService();

        eventService.getEvents().then((data) => setEvents(data));
    }, []);

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i style={{marginLeft:'8px'}}>{eventInfo.event.title}</i>
            </>
        )
    }

    function createEventId() {
        let eventGuid = 0
        String(eventGuid++)
    }

    function handleDateSelect(selectInfo) {
        let title = prompt('Por favor, digite o título do evento')
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
        if(confirm(`Tem certeza de que deseja deletar o evento ${clickInfo.event.title}`)) {
            clickInfo.event.remove()
        }
    }

    return (
        <div className="layout-dashboard">
            <div className="grid">

                <div className="col-12 md:col-12 lg:col-12">
                    <div className="card card-w-title">
                        <h5>Schedule</h5>
                        <FullCalendar
                        eventClick={handleEventClick}
                        events={events}
                        eventContent={renderEventContent}
                        initialView='timeGridDay'
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{ left: 'prev,next today', center: 'title', right:''}}
                        editable
                        selectable
                        selectMirror
                        dayMaxEvents
                        locale={localeBr}
                        select={handleDateSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
