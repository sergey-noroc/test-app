import axios from 'axios';

export const getUsers = () => {
    return axios.get('http://localhost:8080/api/v1/users').then((resp) => {
        return resp.data;
    });
};

export const getUserById = (id) => {
    return axios.get(`http://localhost:8080/api/v1/users/${id}`).then(resp => resp.data);
};

export const createUser = (user) => {
    user.id = Math.random().toString(36).substr(2, 5);
    return axios.post('http://localhost:8080/api/v1/users', user).then(resp => resp.data);
};

export const deleteUser = (id) => {
    return axios.delete(`http://localhost:8080/api/v1/users/${id}`).then(res => res.data);
};

export const updateUser = (user) => {
    return axios.patch(`http://localhost:8080/api/v1/users/${user.id}`, user).then(resp => resp.data);
};