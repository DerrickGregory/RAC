import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDrivers,getDelivery,getRoute,getChat,addChat } from './driverApi'




export const addChatAsync = createAsyncThunk(
    '/addChat',
    async ({message,deliverId,email }, {rejectWithValue }) => {
        try {
            const response = await addChat(message,deliverId,email);

            return response;

        } catch(error) {
            if (error.response && error.response.message) {
                return rejectWithValue(error.response.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);






export const getChatAsync = createAsyncThunk(
    '/getChat',
    async (deliverId) => {
        try {
            const response = await getChat(deliverId);
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);







export const getDriversAsync = createAsyncThunk(
    '/drivers',
    async () => {
        try {
            const response = await getDrivers();
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);



export const getDeliveryAsync = createAsyncThunk(
    '/delivery',
    async (driver_id) => {
        try {
            const response = await getDelivery(driver_id);
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);



export const getRouteAsync = createAsyncThunk(
    '/delivery/route',
    async (shipment_id) => {
        try {
            const response = await getRoute(shipment_id);
          
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);
