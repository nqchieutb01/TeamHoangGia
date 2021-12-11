import axios from "axios";

const API_URL = "http://localhost:8080/users/";

const register = (username, password) => {
    console.log({username,password})
    return axios.post(API_URL + "register", {
        username,
        password,
    });
};
const register_v1= (username, password) => {
    return axios.post(API_URL + "register", JSON.stringify({
        username:username,
        password:password
    }));
};
const login = (username, password) => {
    console.log('client' , username,password)
    return axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response) => {
            console.log(response)
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    register_v1,
    login,
    logout,
};