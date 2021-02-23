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
        axios.post(`${BASE_API_URL}/user/register`,{first_name:newUserInfo.firstName,
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
    
    searchForTechnicians: (name) => 
        axios.post(`${BASE_API_URL}/technicians/search`, {name:name}),


    requestAppointment: (appointment) =>
        axios.post(`${BASE_API_URL}/user/requestappointment`,{title:appointment.title, startDate:appointment.startDate, endDate:appointment.endDate, 
            location:appointment.location, user_id:appointment.userId, technician_id:appointment.techId, approved:appointment.approved, rated:appointment.rated} , getCustomerTokenFromStorage),
    
    approveAppointment: (id) =>
        axios.post(`${BASE_API_URL}/technician/appointments/approve`,{id:id.id} , getTechnicianTokenFromStorage),
    
    getCustomerAppointments: (id) =>
        axios.post(`${BASE_API_URL}/user/appointments`, {user_id:id.userId}, getCustomerTokenFromStorage),

    getTechnicianAppointments: (id) =>
        axios.post(`${BASE_API_URL}/technician/appointments`, {technician_id:id.techId}, getTechnicianTokenFromStorage),

    getPreviousAppointments: (id) =>
        axios.post(`${BASE_API_URL}/user/previousappointments`, {user_id:id.userId}, getCustomerTokenFromStorage),



    getCustomerProfile: (id) =>
        axios.post(`${BASE_API_URL}/user/profile`, {user_id:id.userId}, getCustomerTokenFromStorage),

    getTechnicianProfile: (id) =>
        axios.post(`${BASE_API_URL}/technician/profile`, {technician_id:id.techId}, getTechnicianTokenFromStorage),

    
    customerEditAppointment: (appointment) =>
        axios.put(`${BASE_API_URL}/user/editappointment`,{id:appointment.id, title:appointment.newTitle, 
            startDate:appointment.newStartDate, endDate:appointment.newEndDate, 
            location:appointment.newLocation} , getCustomerTokenFromStorage),

    technicianEditAppointment: (appointment) =>
        axios.put(`${BASE_API_URL}/technician/editappointment`,{title:appointment.title, 
            startDate:appointment.startDate, endDate:appointment.endDate, 
            location:appointment.location} , getTechnicianTokenFromStorage),

    customerDeleteAppointment: (id) =>
        axios.post(`${BASE_API_URL}/user/deleteappointment`,{id:id} , getCustomerTokenFromStorage),
    
    technicianDeleteAppointment: (id) =>
        axios.post(`${BASE_API_URL}/technician/deleteappointment`,{id:id} , getTechnicianTokenFromStorage),


    customerSendMessage: (message) =>
        axios.post(`${BASE_API_URL}/user/sendmessage`,{user_id:message.userId,
        technician_id:message.currentTechnicianId, content:message.newMessage, sent_by_user:true} , getCustomerTokenFromStorage),

    technicianSendMessage: (message) =>
        axios.post(`${BASE_API_URL}/technician/sendmessage`,{user_id:message.currentCustomerId,
        technician_id:message.technicianId, content:message.newMessage, sent_by_user:false} , getTechnicianTokenFromStorage),

    getMessagesFromTechnician: (messageInfo) => 
            axios.post(`${BASE_API_URL}/user/allmessages`,{user_id:messageInfo.user_id,
        technician_id:messageInfo.technician_id} , getCustomerTokenFromStorage),

    getMessagesFromUser: (messageInfo) => 
            axios.post(`${BASE_API_URL}/technician/allmessages`,{user_id:messageInfo.user_id,
        technician_id:messageInfo.technician_id} , getTechnicianTokenFromStorage),

    getUsers: (id) =>
            axios.post(`${BASE_API_URL}/technician/users`,{technician_id:id}, getTechnicianTokenFromStorage),



           

}