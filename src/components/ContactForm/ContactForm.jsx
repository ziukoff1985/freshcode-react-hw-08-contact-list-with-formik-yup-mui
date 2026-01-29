import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {
    createContact,
    updateContact,
    deleteContact,
} from '../../store/slices/contactsSlice';

// import styles from './ContactForm.module.css';
import CustomTextField from '../CustomTextField/CustomTextField';

function ContactForm() {
    const dispatch = useDispatch();

    const contactForEdit = useSelector(
        (state) => state.contactsList.contactForEdit,
    );

    const handleSubmitForm = (values, action) => {
        if (!values.id) {
            dispatch(createContact(values));
            action.resetForm();
        } else {
            dispatch(updateContact(values));
        }
    };

    const handleDeleteContact = (id) => {
        dispatch(deleteContact(id));
    };

    const contactValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Use a valid email')
            .min(5, 'Too short email')
            .max(50, 'Too long email')
            .required('Email is required'),
        phone: Yup.string()
            .min(5, 'Too short phone number')
            .max(12, 'Too long phone number')
            .required('Phone number is required'),
    });

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, width: '100%' }}>
            <Formik
                initialValues={contactForEdit}
                enableReinitialize={true}
                validationSchema={contactValidationSchema}
                onSubmit={handleSubmitForm}
            >
                {({ isValid, values }) => (
                    <Form /* className={styles.contactForm} */>
                        <Typography variant='h5' sx={{ mb: 3 }}>
                            {values.id ? 'Edit Contact' : 'Add Contact'}
                        </Typography>
                        <Stack spacing={2.5}>
                            <CustomTextField
                                name='firstName'
                                label='First Name'
                            />
                            <CustomTextField
                                name='lastName'
                                label='Last Name'
                            />
                            <CustomTextField
                                name='email'
                                label='Email'
                                type='email'
                            />
                            <CustomTextField
                                name='phone'
                                label='Phone'
                                type='tel'
                            />

                            <Stack
                                marginTop='auto'
                                direction='column'
                                spacing={2}
                                justifyContent='center'
                                pt={2}
                            >
                                <Button
                                    variant='contained'
                                    color='success'
                                    fullWidth
                                    type='submit'
                                    disabled={!isValid}
                                    startIcon={<SaveIcon />}
                                    size='large'
                                >
                                    Save
                                </Button>

                                {values.id && (
                                    <Button
                                        variant='outlined' // Outlined для видалення часто виглядає краще
                                        color='error'
                                        fullWidth
                                        startIcon={<DeleteForeverIcon />}
                                        onClick={() =>
                                            handleDeleteContact(values.id)
                                        }
                                        size='large'
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Stack>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Paper>
    );
}

export default ContactForm;
