import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventService from '../service/EventService';
import localeBr from '@fullcalendar/core/locales/pt-br'
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import logo from '../assets/logo.png'

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);

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

    const menuRef = useRef(null);


    const menuToggle = (event) => {
        menuRef.current.toggle(event);
    };

    const items = [
        { label: 'Save', icon: 'pi pi-fw pi-check' },
        { label: 'Update', icon: 'pi pi-fw pi-refresh' },
        { label: 'Delete', icon: 'pi pi-fw pi-trash' }
    ];

    return (
        <div className="layout-dashboard">
            <div className="grid">

                <div className="col-6 md:col-6 lg:col-6">
                    <div className="card card-w-title">
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

                <div className="col-6 md:col-6 lg:col-6">
                    <div className="user-card card">
                        <div className="user-card-header">
                            <img src="assets/layout/images/dashboard/bg-header.png" alt="babylon-layout" className="profile-image" />
                        </div>
                        <div className="user-card-content">
                            <img src={logo} alt="babylon-layout" />
                            <Menu ref={menuRef} popup model={items} appendTo={document.body} />
                            <Button id="user-button" type="button" icon="pi pi-bars" className="secondary-btn" onClick={menuToggle} />

                            <div className="user-card-name">
                                <span>Arlene Welch</span>
                            </div>

                            <div className="user-detail">
                                <ul>
                                    <li className="clearfix">
                                        <i className="pi pi-list"></i>
                                        <span className="project-title">Tasks</span>
                                        <span className="project-detail">3 open</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '50%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-dollar"></i>
                                        <span className="project-title">Revenue</span>
                                        <span className="project-detail">+20%</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '20%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-money-bill"></i>
                                        <span className="project-title">Payments</span>
                                        <span className="project-detail">24 new</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '65%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-users"></i>
                                        <span className="project-title">Clients</span>
                                        <span className="project-detail">+80%</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '80%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-money-bill"></i>
                                        <span className="project-title">Sales</span>
                                        <span className="project-detail">+45</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '45%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-chart-bar"></i>
                                        <span className="project-title">Performance</span>
                                        <span className="project-detail">+75</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '75%' }}></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 md:col-6 lg:col-6">
                    <div className="card card-w-title tasks">
                        <h5>Tasks</h5>
                        <ul>
                            <li>
                                <Checkbox checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                                <span>Sales Reports</span>
                                <span className="task-badge red"></span>
                            </li>
                            <li>
                                <Checkbox checked={checked2} onChange={(e) => setChecked2(e.checked)} />
                                <span>Pay Invoices</span>
                                <span className="task-badge orange"></span>
                            </li>
                            <li>
                                <Checkbox checked={checked3} onChange={(e) => setChecked3(e.checked)} />
                                <span>Kate's Birthday</span>
                                <span className="task-badge orange"></span>
                            </li>
                            <li>
                                <Checkbox checked={checked4} onChange={(e) => setChecked4(e.checked)} />
                                <span>Client Meeting</span>
                                <span className="task-badge green"></span>
                            </li>
                            <li>
                                <Checkbox checked={checked5} onChange={(e) => setChecked5(e.checked)} />
                                <span>New Themes</span>
                                <span className="task-badge green"></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-6 md:col-6 lg:col-6">
                    <div className="card card-w-title timeline">
                        <h5>Timeline</h5>
                        <ul>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-globe"></i>
                                </div>
                                <div className="timeline-content">
                                    <h3>Notes Added</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit tortor a ipsum vehicula, in semper sapien auctor.</p>
                                    <div className="timeline-footer">
                                        <i className="pi pi-clock"></i>
                                        <span>3 Sep 2018 at 10:41</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-calendar"></i>
                                </div>
                                <div className="timeline-content">
                                    <h3>Reminder Scheduled</h3>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                                        explicabo.
                                    </p>
                                    <div className="timeline-footer">
                                        <i className="pi pi-clock"></i>
                                        <span>4 Sep 2018 at 11:30</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-image"></i>
                                </div>
                                <div className="timeline-content">
                                    <div className="child">
                                        <div>
                                            <span>3 Photos Added to</span>
                                            <span className="colorful">Album-23</span>
                                        </div>
                                        <img src="assets/layout/images/dashboard/image-1.png" alt="babylon-layout" />
                                        <img src="assets/layout/images/dashboard/image-2.png" alt="babylon-layout" />
                                        <img src="assets/layout/images/dashboard/image-3.png" alt="babylon-layout" />
                                        <div className="timeline-footer">
                                            <i className="pi pi-clock"></i>
                                            <span>9 Sep 2018 at 00:44</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="activity-link"></div>
                                <div className="timeline-icon">
                                    <i className="pi pi-image"></i>
                                </div>
                                <div className="timeline-content">
                                    <div className="child">
                                        <h3>Location Update</h3>
                                        <img src="assets/layout/images/dashboard/antalya.png" alt="babylon-layout" style={{ width: '100%' }} />
                                        <div className="timeline-footer">
                                            <i className="pi pi-clock"></i>
                                            <span>16 Sep 2018 at 20:02</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;
