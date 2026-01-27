import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import contactsReducer from './slices/contactsSlice';


export default configureStore({
    reducer: {
        contactsList: contactsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
