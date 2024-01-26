import axios from "axios";

export default class TitulosService {
    getTitulos() {
        return axios.get('assets/demo/data/titulos_em_aberto.json').then((res) => console.log(res.data.data))
    }
}
