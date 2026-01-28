// import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

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
                <div className={styles.inputWrapper}>
                    <Field
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
                <div className={styles.buttonWrapper}>
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
                </div>
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
