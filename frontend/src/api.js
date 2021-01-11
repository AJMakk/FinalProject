import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000/api';

const getTokenFromStorage = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('AccessToken')
    }
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    login: (loginCredentials) =>
        axios.post(`${BASE_API_URL}/user/login`, loginCredentials),

    technicianLogin: (loginCredentials) =>
        axios.post(`${BASE_API_URL}/technician/login`, loginCredentials),

    register: (newUserInfo) =>
        axios.post(`${BASE_API_URL}/register`,{first_name:newUserInfo.firstName,
             last_name:newUserInfo.lastName,city_id:newUserInfo.cityId, email:newUserInfo.email,
             password:newUserInfo.password, password_confirmation:newUserInfo.confirmPassword}),

    logout: () =>
        axios.get(`${BASE_API_URL}/logout`),
    
    getAllCities: () => 
        axios.get(`${BASE_API_URL}/cities`, getTokenFromStorage),
    
    getAllCategories: () => 
        axios.get(`${BASE_API_URL}/categories`, getTokenFromStorage),

    /* getAllCategories: () => 
        axios.get(`${BASE_API_URL}/categories`, getTokenFromStorage),
    getOneCategory: (id) =>
        axios.get(`${BASE_API_URL}/categories/${id}`, getTokenFromStorage),
    addCategory: (category) =>
        axios.post(`${BASE_API_URL}/categories/`,{name:category.name} , getTokenFromStorage),
    updateCategory: (category, id) =>
        axios.put(`${BASE_API_URL}/categories/${id}`, {name:category.name}, getTokenFromStorage),
    deleteCategory: (id) =>
        axios.delete(`${BASE_API_URL}/categories/${id}`, getTokenFromStorage), */

}