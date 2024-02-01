import axios from "axios";

export default class TitulosService {
    getTitulos() {
        return axios.get('https://tecjusbackend.vercel.app/titulosemaberto').then((res) => res.data.rows)
    }
}
