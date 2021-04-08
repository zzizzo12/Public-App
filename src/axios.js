import axios from 'axios';

const instance = axios.create({
    baseUrl: 'http://localhost:5001/amashop-9071a/us-central1/api'
});

export default instance;