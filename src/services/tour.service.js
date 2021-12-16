import axios from "axios";
import authHeader from './auth.header';

const API_URL = "http://localhost:8080/";

const getAllTour = () =>{
    return axios.get(API_URL + "tours", {headers: authHeader()});
}
const getTourId = (id) =>{
    return axios.get(API_URL + "tours/"+id,{headers: authHeader()});
}
const createTour = (rep) => {
    return axios.post(API_URL + "tours/create", rep, {headers: authHeader()})

}
const addLoction = (req) => {
    console.log("asssss")
    console.log(req)
    return axios.post(API_URL + "tours/add_location", req, {headers: authHeader()})
}
export default {
    getAllTour,
    getTourId,
    createTour,
    addLoction
}