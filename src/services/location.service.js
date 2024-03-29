import axios from "axios";
import authHeader from './auth.header';

import URL from '../config'
const API_URL = URL.URL_BACKEND

const searchLocation = (name) =>{
    return axios.get(API_URL + "locations?name="+name+"&address="+name, {headers: authHeader()});
}

const getAllLocations = () => {
    return axios.get(API_URL + "locations", {headers: authHeader()});
};

const deleteLocation = (id) => {
    return axios.delete(API_URL + "locations/delete/" + id, {headers: authHeader()});
}
const addLocation = (req) => {
    return axios.post(API_URL + "locations/add", req, {headers: authHeader()});
}
const getLocationId = (id) =>{
    return axios.get(API_URL + "locations/"+id, {headers: authHeader()});
}
const editLocation = (req)=>{
    return axios.post(API_URL +"locations/update/" , req , {headers:authHeader()})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    searchLocation,
    getAllLocations,
    deleteLocation,
    addLocation,
    getLocationId,
    editLocation
}