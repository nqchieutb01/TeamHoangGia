import axios from "axios";
import authHeader from './auth.header';

const API_URL = "http://localhost:8080/";

const getAllLocations = () => {
    return axios.get(API_URL + "locations", {headers: authHeader()});
};

const deleteLocation = (id) => {
    return axios.delete(API_URL + "locations/delete/" + id, {headers: authHeader()});
}
const addLocation = (req) => {
    return axios.post(API_URL + "locations/add", req, {headers: authHeader()});
}

export default {
    getAllLocations,
    deleteLocation,
    addLocation,
}