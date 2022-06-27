import axios from 'axios';

class DataService {
    getAll(token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get("http://localhost:8000/api/datas/");
    }

    createData(data, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post("http://localhost:8000/api/datas", data)
    }

    updateData(id, data, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`http://localhost:8000/api/datas/${id}`, data);
    }

    deleteData(id, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`http://localhost:8000/api/datas/${id}`);
    }

    login(data) {
        return axios.post("http://localhost:8000/api/login/", data);
    }

    singup(data) {
        return axios.post("http://localhost:8000/api/singup/", data);
    }
}

export default new DataService();