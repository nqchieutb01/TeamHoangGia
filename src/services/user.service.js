import axios from "axios";
import authHeader from './auth.header';
import URL from '../config'

const API_URL = URL.URL_BACKEND

const getAllUsers = () => {
    return axios.get(API_URL + "users/list", {headers: authHeader()});
};

const getUserInfo = () => {
    return axios.get(API_URL + "users/info", {headers: authHeader()});
}

const deleteUser = (id) => {
    return axios.delete(API_URL + "users/delete/" + id, {headers: authHeader()})
}

const editUser = (req) => {
    return axios.post(API_URL + "users/update", req, {headers: authHeader()})
}
const getTours = () => {
    return axios.get(API_URL + "users/tours/", {headers: authHeader()});
}
const updatePassword = (req) => {
    return axios.post(API_URL + "users/changePass", req, {headers: authHeader()});
}
const updateInfo = (req) => {
    return axios.post(API_URL + "users/update", req, {headers: authHeader()});

}
const deleteTour = (id) => {
    return axios.delete(API_URL + "tours/delete/" + id, {headers: authHeader()});
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllUsers,
    getUserInfo,
    deleteUser,
    editUser,
    getTours,
    updatePassword,
    deleteTour,
    updateInfo
};