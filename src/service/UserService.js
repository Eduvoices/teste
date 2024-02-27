import axios from "axios";

export default class UserService {
    getUsers() {
        return axios.get('assets/demo/data/users.json').then((res) => res.data.rows)
    }
}
