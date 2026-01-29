import { useDispatch, useSelector } from 'react-redux';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import {
    deleteContact,
    setContactForEdit,
} from '../../store/slices/contactsSlice';

function ContactItem({ contact }) {
    const dispatch = useDispatch();

    const contactForEdit = useSelector(
        (state) => state.contactsList.contactForEdit,
    );

    const isActive = contactForEdit?.id === contact.id;

    function onContactDelete() {
        dispatch(deleteContact(contact.id));
    }

    function onContactEdit() {
        dispatch(setContactForEdit(contact));
    }

    return (
        <>
            <ListItem
                disablePadding
                secondaryAction={
                    <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={onContactDelete}
                        color='error'
                    >
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemButton
                    selected={isActive}
                    onDoubleClick={onContactEdit}
                >
                    <ListItemText
                        primary={`${contact.firstName} ${contact.lastName}`}
                        secondary={contact.phone}
                    />
                </ListItemButton>
            </ListItem>
            <Divider variant='inset' component='li' />
        </>
    );
}

export default ContactItem;
