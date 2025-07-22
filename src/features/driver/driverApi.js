import axios from 'axios'
import { url } from "../../utils/url"




export const getChat = async (deliverId) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/chat/${deliverId}/messages`, config)  

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}




export const  addChat = async (message,deliverId,email) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(`${url}/chat`, {message,deliverId,email }, config)   
        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}







export const getDrivers = async () => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/user/drivers`, config)  
    

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}




export const getDelivery = async (driver_id) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/delivery/${driver_id}`, config)  

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}



export const getRoute = async (shipment_id) => {
    try {
        
        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`${url}/delivery/${shipment_id}/route`, config)  

        return data
    } catch(e) {
        console.log('An error occured: ',e)
    }
}
