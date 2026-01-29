import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { EMPTY_CONTACT } from '../../constants/constants';
import {
    getContacts,
    setContactForEdit,
} from '../../store/slices/contactsSlice';
import ContactItem from '../ContactItem/ContactItem';

function ContactList() {
    const dispatch = useDispatch();

    const contacts = useSelector((state) => state.contactsList.contacts);

    function onAddNewContact() {
        dispatch(setContactForEdit(EMPTY_CONTACT));
    }

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    return (
        <Box>
            <Paper
                elevation={10}
                sx={{ mb: 3, maxHeight: 500, overflow: 'auto', width: '100%' }}
            >
                <List>
                    {contacts.length === 0 ? (
                        <Typography
                            variant='body1'
                            sx={{ p: 3, color: 'text.secondary' }}
                        >
                            No contacts yet
                        </Typography>
                    ) : (
                        contacts.map((contact) => (
                            <ContactItem key={contact.id} contact={contact} />
                        ))
                    )}
                </List>
            </Paper>

            <Button
                variant='contained'
                color='primary'
                fullWidth
                size='large'
                startIcon={<NoteAddIcon />}
                onClick={onAddNewContact}
            >
                Add New Contact
            </Button>
        </Box>
    );
}

export default ContactList;
