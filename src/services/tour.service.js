import axios from "axios";
import authHeader from './auth.header';

const API_URL = "http://localhost:8080/";

const getAllTour = () =>{   
    return axios.get(API_URL + "tours", {headers: authHeader()});
}

const createTour = (rep) => {
    return axios.post(API_URL + "tours/create", rep, {headers: authHeader()})

}
const addLoction = (rep) => {
    console.log("asssss")
    console.log(rep)
    //return axios.post(API_URL + "tours/add_location", rep, {headers: authHeader()})
}

export default {
    getAllTour,
    createTour,
    addLoction
}