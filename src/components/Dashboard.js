import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventService from '../service/EventService';
import localeBr from '@fullcalendar/core/locales/pt-br'
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import {Chart} from 'primereact/chart'
import logo from '../assets/logo-white.png'
import TaskService from '../service/TaskService';

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
    const [tasks, setTasks] = useState([])


    useEffect(() => {
        const eventService = new EventService();

        const taskService = new TaskService()

        taskService.getTasks().then((data) => setTasks(data))


        eventService.getEvents().then((data) => setEvents(data));

    }, []);

    let array2 = []


    function parse(data, i) {

        let dateStart = data[i].start.split('.')
        let start = dateStart[0]

        let dateEnd = data[i].xend.split('.')
        let end = dateEnd[0]

        return {
                start: start,
                end: end,
                title: data[i].title
        }
    }

    function f(){
        for (let i = 0; i < events.length; i++) {
            const elemental = parse(events, i)
            array2 = [...array2, elemental]
        }
    }

    f()

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
            <div className="col-6 lg:col-6 xl:col-3">
                    <div className="overview-box sales">
                        <i className="overview-icon pi pi-dollar"></i>
                        <span className="overview-title">Caixa</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers"></div>
                    </div>
                </div>
                <div className="col-6 lg:col-6 xl:col-3">
                    <div className="overview-box views">
                        <i className="overview-icon pi pi-file"></i>
                        <span className="overview-title">Protocolos Administrativos</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers"></div>
                        <div className="overview-subinfo"></div>
                    </div>
                </div>
                <div className="col-6 lg:col-6 xl:col-3">
                    <div className="overview-box users">
                        <i className="overview-icon pi pi-users"></i>
                        <span className="overview-title">Atendimentos</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers"></div>
                    </div>
                </div>
                <div className="col-6 lg:col-6 xl:col-3">
                    <div className="overview-box checkin">
                        <i className="overview-icon pi pi-folder"></i>
                        <span className="overview-title">Novos Processos</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers"></div>
                    </div>
                </div>

                <div className="col-12 md:col-12 lg:col-6">
                    <div className="card card-w-title" style={{height:'240px', overflowX:'scroll'}}>
                        <FullCalendar
                        eventClick={handleEventClick}
                        events={array2}
                        eventContent={renderEventContent}
                        initialView='dayGridDay'
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{ left: 'prev,next today', center: 'title', right:''}}
                        editable
                        selectable
                        selectMirror
                        dayMaxEvents
                        locale={localeBr}
                        select={handleDateSelect}
                        nowIndicator
                        height='256px'
                        />
                    </div>
                </div>

                <div className="col-12 md:col-12 lg:col-6">
                    <div className="user-card card" style={{height:'240px', overflowX:'scroll'}}>
                        <div className="user-card-content">
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:'8px'}}>
                                <img src={logo} alt="babylon-layout"/>
                                <div>
                                    <h5 style={{color:'#000'}}>Prazos em aberto</h5>
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


                <div className="col-12 md:col-12 lg:col-6" >
                    <div className="card card-w-title tasks" style={{height:'240px', overflowX:'scroll'}}>
                        <h5>Tarefas</h5>
                        <ul>
                            {tasks.map((task)=> {
                                return <li key={task.Pessoa_CodigoCliente}>
                                            <input type="checkbox" id={task.Cliente} name={task.Cliente} value={task.Cliente} />
                                            <label htmlFor={task.Cliente}>{task.EtapaProcesso_Descricao} - {task.Cliente}</label>
                                        </li>
                            })}
                        </ul>
                    </div>
                </div>

                <div className="col-12 lg:col-6">
                    <div className="card card-w-title statistics" style={{height:'240px', overflowX:'scroll'}}>
                        <h5>Estatísticas de Protocolos</h5>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>

            </div>
                <button style={{position:'fixed', right:'32px', bottom:'32px', zIndex:'9999', height:'64px', width:'64px', borderRadius:'50%', backgroundColor:'#2ecc71', border:'none'}}>
                    <a href='https://wa.me/5543999877667' target='_blank' rel='noreferrer'>
                        <i className='pi pi-whatsapp' style={{color:'#fff', fontSize:'2rem'}}></i>
                    </a>
                </button>
            </div>
    );
};

export default Dashboard;
