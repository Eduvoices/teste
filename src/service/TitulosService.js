import axios from "axios";

export default class TitulosService {
    getTitulos() {
        return axios.get('http://tecjusbackend.vercel.app/titulosemaberto').then((res) => res.data.rows)
    }
}
