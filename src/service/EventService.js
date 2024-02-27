import axios from 'axios';

export default class EventService {
    getEvents() {
        return axios.get('https://tecjusbackend.vercel.app/listaagenda').then((res) => res.data.rows);
    }
}
