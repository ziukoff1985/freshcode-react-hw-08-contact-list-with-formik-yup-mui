import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';

import { contactsState } from '../../model/initialStates';
import { EMPTY_CONTACT, CONTACTS_SLICE_NAME } from '../../constants/constants';
import api from '../../api/contactsService';

const initialState = {
    contacts: contactsState,
    contactForEdit: EMPTY_CONTACT,
    isPending: false,
    error: null,
};

export const getContacts = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/getContacts`,
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/');
            if (response.status >= 400) {
                throw new Error(`Error status: ${response.status}`);
            }
            const { data } = response;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/createContact`,
    async (contactData, thunkAPI) => {
        try {
            const response = await api.post('/', contactData);
            if (response.status >= 400) {
                throw new Error(`Error status: ${response.status}`);
            }
            const { data } = response;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const deleteContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/deleteContact`,
    async (contactId, thunkAPI) => {
        try {
            const response = await api.delete(`/${contactId}`);
            if (response.status >= 400) {
                throw new Error(
                    `Can't delete contact. Error status: ${response.status}`,
                );
            }
            return contactId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const updateContact = createAsyncThunk(
    `${CONTACTS_SLICE_NAME}/updateContact`,
    async (contactData, thunkAPI) => {
        try {
            const response = await api.put(`/${contactData.id}`, contactData);
            if (response.status >= 400) {
                throw new Error(`Error status: ${response.status}`);
            }
            const { data } = response;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

const setError = (state, action) => {
    state.isPending = false;
    state.error = action.payload;
};

const setIsPending = (state) => {
    state.isPending = true;
    state.error = null;
};

const contactsSlice = createSlice({
    name: CONTACTS_SLICE_NAME,
    initialState,
    reducers: {
        setContactForEdit: (state, action) => {
            state.contactForEdit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContacts.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.contacts = action.payload;
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.contacts.push(action.payload);
                state.contactForEdit = { ...EMPTY_CONTACT };
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.contacts = state.contacts.filter(
                    (contact) => contact.id !== action.payload,
                );
                state.contactForEdit =
                    state.contactForEdit.id === action.payload
                        ? EMPTY_CONTACT
                        : state.contactForEdit;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.contacts = state.contacts.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact,
                );
                state.contactForEdit = action.payload;
            })
            .addMatcher(
                isAnyOf(
                    getContacts.pending,
                    createContact.pending,
                    deleteContact.pending,
                    updateContact.pending,
                ),
                setIsPending,
            )
            .addMatcher(
                isAnyOf(
                    getContacts.rejected,
                    createContact.rejected,
                    deleteContact.rejected,
                    updateContact.rejected,
                ),
                setError,
            );
    },
});

const { reducer, actions } = contactsSlice;

// експортуємо тільки СИНХРОННІ функції (з властивості reducers в createSlice)
export const { setContactForEdit } = actions;

// цей reducer буде використовуватися в store -> configureStore
export default reducer;
