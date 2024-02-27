import axios from "axios";

export default class DocTypeService {
    getDocs() {
        return axios.get('https://tecjusbackend.vercel.app/tiposdocumentos').then((res) => res.data.rows)
    }
}
