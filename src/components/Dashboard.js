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
import {Chart} from 'primereact/chart'
import logo from '../assets/logo-white.png'

const chartData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
        {
            label: 'Vendas',
            data: [12, 19, 3, 5, 2, 3, 9, 16, 13, 22, 12, 8],
            borderColor: ['#4b453d'],
            borderWidth: 3,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 3,
            tension: 0.4
        },
        {
            label: 'Receitas',
            data: [1, 2, 5, 3, 12, 7, 15, 19, 21, 23, 25, 21],
            backgroundColor: ['rgba(187,222,251,0.2)'],
            borderColor: ['#814b05'],
            borderWidth: 3,
            fill: true,
            tension: 0.4
        },
        {
            label: 'Despesas',
            data: [7, 12, 15, 5, 3, 13, 21, 15, 11, 10, 8, 5],
            borderColor: ['#ab9c6f'],
            borderWidth: 3,
            fill: false,
            pointRadius: [4, 6, 4, 12, 8, 0, 4],
            tension: 0.4
        },
        {
            label: 'Novos usuários',
            data: [3, 7, 2, 17, 15, 13, 19, 20, 21, 23, 25, 27],
            borderColor: ['#c3b58b'],
            borderWidth: 3,
            fill: false,
            tension: 0.4
        }
    ]
};

const chartOptions = {
    responsive: true,
    hover: {
        mode: 'index'
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Mês'
            }
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Valor'
            }
        }
    }
};

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
            <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box sales">
                        <i className="overview-icon pi pi-dollar"></i>
                        <span className="overview-title">Vendas</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">$ 92,440</div>
                        <div className="overview-subinfo">21% mais do que ontem</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box views">
                        <i className="overview-icon pi pi-search"></i>
                        <span className="overview-title">Visualizações</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">7029</div>
                        <div className="overview-subinfo">2% mais do que ontem</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box users">
                        <i className="overview-icon pi pi-users"></i>
                        <span className="overview-title">Usuários</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">9522</div>
                        <div className="overview-subinfo">7% more than yesterday</div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="overview-box checkin">
                        <i className="overview-icon pi pi-map-marker"></i>
                        <span className="overview-title">Check-Ins</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">4211</div>
                        <div className="overview-subinfo">18% mais do que ontem</div>
                    </div>
                </div>

                <div className="col-6 md:col-6 lg:col-6">
                    <div className="card card-w-title" style={{height:'100%'}}>
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
                    <div className="user-card card" style={{height:'100%'}}>
                        <div className="user-card-content">
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:'8px'}}>
                                <img src={logo} alt="babylon-layout"/>
                                <div>
                                    <span style={{color:'#000', fontSize:'20px', fontWeight:'bold'}}>Tecjus</span>
                                </div>
                                <Menu ref={menuRef} popup model={items} appendTo={document.body} />
                                <Button id="user-button" type="button" icon="pi pi-bars" className="secondary-btn" onClick={menuToggle} />

                            </div>

                            <div className="user-detail">
                                <ul>
                                    <li className="clearfix">
                                        <i className="pi pi-list"></i>
                                        <span className="project-title">Tarefas</span>
                                        <span className="project-detail">3 em aberto</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '50%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-dollar"></i>
                                        <span className="project-title">Receita</span>
                                        <span className="project-detail">+20%</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '20%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-money-bill"></i>
                                        <span className="project-title">Pagamentos</span>
                                        <span className="project-detail">24 novos</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '65%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-users"></i>
                                        <span className="project-title">Clientes</span>
                                        <span className="project-detail">+80%</span>
                                        <div className="project-progressbar">
                                            <div className="project-progressbar-value" style={{ width: '80%' }}></div>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <i className="pi pi-money-bill"></i>
                                        <span className="project-title">Vendas</span>
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
                    <div className="card card-w-title tasks" style={{height:'100%'}}>
                        <h5>Tarefas</h5>
                        <ul>
                            <li>
                                <Checkbox checked={checked1} onChange={(e) => setChecked1(e.checked)} />
                                <span>Relatórios de vendas</span>
                                <span className="task-badge coffee"></span>
                            </li>
                            <li>
                                <Checkbox checked={checked2} onChange={(e) => setChecked2(e.checked)} />
                                <span>Pagar faturas</span>
                                <span className="task-badge orange"></span>
                            </li>
                            <li>
                                <Checkbox checked={checked3} onChange={(e) => setChecked3(e.checked)} />
                                <span>Aniversário da Rosana</span>
                                <span className="task-badge orange"></span>
                            </li>
                            <li>
                                <Checkbox checked={checked4} onChange={(e) => setChecked4(e.checked)} />
                                <span>Reunião com cliente</span>
                                <span className="task-badge green"></span>
                            </li>
                            <li>
                                <Checkbox checked={checked5} onChange={(e) => setChecked5(e.checked)} />
                                <span>Novos temas</span>
                                <span className="task-badge green"></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-6 md:col-6 lg:col-6">
                    <div className="card card-w-title statistics" style={{height:'100%'}}>
                        <h5>Estatísticas</h5>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
