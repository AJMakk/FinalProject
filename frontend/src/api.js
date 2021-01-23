import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000/api';

const getCustomerTokenFromStorage = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('CustomerAccessToken')
    }
  };

const getTechnicianTokenFromStorage = {
    headers: {
      authorization: 'Bearer ' + localStorage.getItem('TechnicianAccessToken')
    }
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {

    login: (loginCredentials) =>
        axios.post(`${BASE_API_URL}/user/login`, loginCredentials),

    technicianLogin: (loginCredentials) =>
        axios.post(`${BASE_API_URL}/technician/login`, loginCredentials),

    customerRegister: (newUserInfo) =>
        axios.post(`${BASE_API_URL}/register`,{first_name:newUserInfo.firstName,
             last_name:newUserInfo.lastName,city_id:newUserInfo.cityId, email:newUserInfo.email,
             password:newUserInfo.password, password_confirmation:newUserInfo.confirmPassword}),

    technicianRegister: (newUserInfo) =>
        axios.post(`${BASE_API_URL}/technician/apply`,{first_name:newUserInfo.firstName,
             last_name:newUserInfo.lastName,city_id:newUserInfo.cityId, category_id:newUserInfo.categoryId, email:newUserInfo.email,
             password:newUserInfo.password, password_confirmation:newUserInfo.confirmPassword, ratings:0}),        
    logout: () =>
        axios.get(`${BASE_API_URL}/logout`),
    
    getAllCities: () => 
        axios.get(`${BASE_API_URL}/cities`),
    
    getAllCategories: () => 
        axios.get(`${BASE_API_URL}/categories`),
    
    getAllTechnicians: () => 
        axios.get(`${BASE_API_URL}/technicians`),

    requestAppointment: (appointment) =>
        axios.post(`${BASE_API_URL}/user/requestappointment`,{title:appointment.title, startDate:appointment.startDate, endDate:appointment.endDate, 
            location:appointment.location, user_id:appointment.userId, technician_id:appointment.techId, approved:appointment.approved} , getCustomerTokenFromStorage),
    
    approveAppointment: (id) =>
        axios.post(`${BASE_API_URL}/technician/appointments/approve`,{id:id.id} , getTechnicianTokenFromStorage),
    
    getCustomerAppointments: (id) =>
        axios.post(`${BASE_API_URL}/user/myappointments`, {user_id:id.userId}, getCustomerTokenFromStorage),

    getTechnicianAppointments: (id) =>
        axios.post(`${BASE_API_URL}/technician/appointments`, {technician_id:id.techId}, getTechnicianTokenFromStorage),

    getCustomerProfile: (id) =>
        axios.post(`${BASE_API_URL}/user/profile`, {user_id:id.userId}, getCustomerTokenFromStorage),

    getTechnicianProfile: (id) =>
        axios.post(`${BASE_API_URL}/technician/profile`, {technician_id:id.techId}, getTechnicianTokenFromStorage),

            
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