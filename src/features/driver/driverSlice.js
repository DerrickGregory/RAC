import { createSlice } from '@reduxjs/toolkit'
import { getDriversAsync,getDeliveryAsync,getRouteAsync ,getChatAsync,addChatAsync} from './driverActions';

const initialState = {
    isLoading: false,
    error: null,
    drivers:[],
     route:[],
    delivery:[],
    chats:[]
  
};

const driverSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(addChatAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(addChatAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            
            })

            .addCase(addChatAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })

            

        .addCase(getChatAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getChatAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.chats = payload
            })
            .addCase(getChatAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })



            .addCase(getRouteAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getRouteAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.route = payload
            })
            .addCase(getRouteAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            
            .addCase(getDeliveryAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getDeliveryAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.delivery = payload
            })
            .addCase(getDeliveryAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })

            .addCase(getDriversAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getDriversAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.drivers = payload
            })
            .addCase(getDriversAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default driverSlice.reducer;
