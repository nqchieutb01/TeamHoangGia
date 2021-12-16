import axios from "axios";
import authHeader from './auth.header';

const API_URL = "http://localhost:8080/";

const getAllTour = () =>{
    return axios.get(API_URL + "tours", {headers: authHeader()});
}
const getTourId = (id) =>{
    return axios.get(API_URL + "tours/"+id,{headers: authHeader()});
}

export default {
    getAllTour,
    getTourId
}