import axios from 'axios'
export const LoginEndpoint = '/users/login'
export const SignupEndpoint = '/users'
export const TokenFile = 'token'
export const UserFile = 'user'
export const DoctorPatientAssignmentsEndpoint = '/doctor_patient_assignments'
export const InvitesEndpoint = '/invites'
export const DoctorPatientAssignmentsRemoveEndpoint = '/doctor_patient_assignments/remove'

export const fetchGlobal = async (endpoint) =>{
    try{
        const response = await axios.get(endpoint)
        return {data: response.data, hasError: false}
    } catch(err){
        return {data: err, hasError: true}
    }
}

export const postGlobal = async (endpoint,data) =>{
    try{
        const response = await axios.post(endpoint,data)
        return {data: response.data, hasError: false}
    } catch(err){
        return {data: err, hasError: true}
    }
}



