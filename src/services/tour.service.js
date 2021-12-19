import axios from "axios";
import authHeader from './auth.header';

import URL from '../config'

const API_URL = URL.URL_BACKEND

const getAllTour = () => {
    // console.log('api: ',API_URL)
    return axios.get(API_URL + "tours", {headers: authHeader()});
}
const getTourId = (id) => {
    return axios.get(API_URL + "tours/" + id, {headers: authHeader()});
}
const createTour = (rep) => {
    return axios.post(API_URL + "tours/create", rep, {headers: authHeader()})
}
const editTour = (req) => {
    return axios.post(API_URL + "tours/update", req, {headers: authHeader()})
}
const addLoction = (req) => {
    return axios.post(API_URL + "tours/add_location", req, {headers: authHeader()})
}
const deleteTour = (id) => {
    return axios.delete(API_URL + "tours/delete/" + id, {headers: authHeader()});
}
const searchTour = (req) => {
    return axios.get(API_URL + "tours", {
        params: {
            name: req.name,
            locationName: req.locationName,
            priceMin: req.priceMin,
            priceMax: req.priceMax,
            rating: req.rating
        }
    })
}

// comment api
const getAllComments = (id) => {
    return axios.get(API_URL + "tours/comment?id=" + id, {headers: authHeader()})
}

const postComment = (req) => {
    return axios.post(API_URL + "tours/review_comment", req, {headers: authHeader()})
}

const deleteComment = (id) => {
    return axios.delete(API_URL + "tours/delete_review/" + id, {headers: authHeader()})
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllTour,
    getTourId,
    createTour,
    editTour,
    addLoction,
    deleteTour,
    searchTour,
    getAllComments,
    postComment,
    deleteComment,
}