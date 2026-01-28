import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { EMPTY_CONTACT } from '../../constants/constants';
import {
    getContacts,
    setContactForEdit,
} from '../../store/slices/contactsSlice';
import ContactItem from '../ContactItem/ContactItem';

import styles from './ContactList.module.css';

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
        <div className={styles.contactListWrapper}>
            <ul className={styles.contactList}>
                {contacts.length === 0
                    ? 'No contacts yet'
                    : contacts.map((contact) => (
                          <ContactItem key={contact.id} contact={contact} />
                      ))}
            </ul>
            <Button
                variant='contained'
                color='success'
                type='button'
                startIcon={<NoteAddIcon />}
                onClick={onAddNewContact}
            >
                New
            </Button>
        </div>
    );
}

export default ContactList;
