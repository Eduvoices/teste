import axios from "axios";

// https://www.ahnegao.com.br/wp-content/uploads/2015/06/noticia.jpg

export default class DocTypeService {
    getDocs() {
        return axios.get('assets/demo/data/docs.json').then((res) => res.data.data)
    }
}
