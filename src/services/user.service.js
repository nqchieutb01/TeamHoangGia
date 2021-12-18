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

const deleteUser = (id)=>{
    return axios.delete(API_URL +"users/delete/"+id,{headers:authHeader()} )
}

const editUser = (req)=>{
    return axios.post(API_URL+"users/update" , req,{headers:authHeader()})
}
const getTours = ()=>{
    return axios.get(API_URL + "users/tours/", {headers: authHeader()});
}
const deleteTour = (id)=>{
    return axios.delete(API_URL + "tours/delete/" + id, {headers: authHeader()});
}
export default {
    getAllUsers,
    getUserInfo,
    deleteUser,
    editUser,
    getTours,
    deleteTour
};