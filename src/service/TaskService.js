import axios from "axios";

export default class TaskService {
    getTasks() {
        return axios.get('https://tecjusbackend.vercel.app/tarefas').then((res) => res.data.rows)
    }
}
