import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
    createContact,
    updateContact,
    deleteContact,
} from '../../store/slices/contactsSlice';

import styles from './ContactForm.module.css';

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

    const renderForm = ({ isValid, values, setFieldValue }) => {
        return (
            <Form className={styles.contactForm}>
                <div className={styles.inputWrapper}>
                    <Field
                        as={TextField}
                        className={styles.input}
                        name='firstName'
                        type='text'
                        placeholder='First name'
                    />
                    <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={() => setFieldValue('firstName', '')}
                    >
                        ❌
                    </button>
                </div>

                <div className={styles.inputWrapper}>
                    <Field
                        as={TextField}
                        className={styles.input}
                        name='lastName'
                        type='text'
                        placeholder='Last name'
                    />
                    <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={() => setFieldValue('lastName', '')}
                    >
                        ❌
                    </button>
                </div>
                <div className={styles.inputWrapper}>
                    <Field
                        as={TextField}
                        className={styles.input}
                        name='email'
                        type='email'
                        placeholder='Email'
                        autoComplete='on'
                    />
                    <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={() => setFieldValue('email', '')}
                    >
                        ❌
                    </button>
                </div>
                <ErrorMessage name='email'>
                    {(msg) => <div className={styles.error}>{msg}</div>}
                </ErrorMessage>
                <div className={styles.inputWrapper}>
                    <Field
                        as={TextField}
                        className={styles.input}
                        name='phone'
                        type='tel'
                        placeholder='Phone'
                        autoComplete='on'
                    />
                    <button
                        className={styles.deleteButton}
                        type='button'
                        onClick={() => setFieldValue('phone', '')}
                    >
                        ❌
                    </button>
                </div>
                <ErrorMessage name='email'>
                    {(msg) => <div className={styles.error}>{msg}</div>}
                </ErrorMessage>
                {/* <div className={styles.buttonWrapper}>
                    <button
                        disabled={!isValid}
                        className={styles.formButton}
                        type='submit'
                    >
                        Save
                    </button>
                    {values.id && (
                        <button
                            className={styles.formButton}
                            type='button'
                            onClick={() => handleDeleteContact(values.id)}
                        >
                            Delete
                        </button>
                    )}
                </div> */}
                <Stack
                    direction='row'
                    spacing={2}
                    justifyContent='center'
                    marginTop='auto'
                >
                    <Button
                        variant='contained'
                        color='success'
                        type='submit'
                        disabled={!isValid}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                    {values.id && (
                        <Button
                            variant='contained'
                            color='error'
                            type='button'
                            startIcon={<DeleteForeverIcon />}
                            onClick={() => handleDeleteContact(values.id)}
                        >
                            Delete
                        </Button>
                    )}
                </Stack>
            </Form>
        );
    };

    return (
        <Formik
            onSubmit={handleSubmitForm}
            initialValues={contactForEdit}
            enableReinitialize={true}
            validationSchema={contactValidationSchema}
        >
            {renderForm}
        </Formik>
    );
}

export default ContactForm;
