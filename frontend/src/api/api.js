import axios from 'axios';


const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';


axios.defaults.withCredentials = true;


export const RESTService = {
    fetchInboxAddress,
    checkUserExists,
    register

};

function fetchInboxAddress() {
    let url = api + '/fetchInboxAddress';
    return axiosGet(url);
}

function checkUserExists(data) {
    let url = api + '/checkUserExists';
    return axiosPost(url,data);
}


function register(data) {
    let url = api + '/register';
    return axiosPost(url,data);
}



function axiosPost(url, data) {
    return axios.post(url, data)
        .then(handleSuccess)
        .catch(handleError);
}

function axiosGet(url, data) {
    return axios.get(url, data)
        .then(handleSuccess)
        .catch(handleError);
}

function handleSuccess(response) {
    return response;
}

function handleError(error) {
    if (error.response) {
        return Promise.reject(error.response);
    }
}
