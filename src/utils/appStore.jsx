import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionsReducer from './connectionSlice';
import requestsReducer from './requestSlice'

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connection:connectionsReducer,
        request:requestsReducer,
    },
})

export default appStore;