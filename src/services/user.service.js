import axios from "axios";
import authHeader from './auth.header';
import URL from '../config'
const API_URL = URL.URL_BACKEND

const getAllUsers = () => {
    return axios.get(API_URL + "users/list", {headers: authHeader()});
};

const getUserInfo = () => {
    // return axios.get("https://61af70223e2aba0017c49342.mockapi.io/user/1",{headers: authHeader()} )
    return axios.get(API_URL + "users/info", {headers: authHeader()});
}

// const deleteUser = (id)=>{
//     return axios.delete(API_URL + )
// }

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", {headers: authHeader()});
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", {headers: authHeader()});
};

export default {
    getAllUsers,
    getUserInfo,
    getModeratorBoard,
    getAdminBoard,
};