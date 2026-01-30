import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
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
            .email('Invalid email')
            .min(5, 'Too short email')
            .max(50, 'Too long email')
            .required('Email is required'),
        phone: Yup.string()
            .matches(/^\+?\d+$/, 'Only digits are allowed')
            .min(9, 'Too short phone number')
            .max(15, 'Too long phone number')
            .required('Phone number is required'),
    });

    return (
        <Paper elevation={10} sx={{ p: 3 }}>
            <Formik
                initialValues={contactForEdit}
                enableReinitialize
                validationSchema={contactValidationSchema}
                onSubmit={handleSubmitForm}
            >
                {({ isValid, values }) => (
                    <Form>
                        <Typography variant='h5' sx={{ mb: 3 }}>
                            {values.id ? 'Edit Contact' : 'Add Contact'}
                        </Typography>
                        <Stack spacing={2}>
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

                            <Stack spacing={2} pt={1}>
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
                                        variant='outlined'
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
