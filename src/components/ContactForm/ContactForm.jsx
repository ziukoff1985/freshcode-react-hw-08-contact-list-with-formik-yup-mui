// import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import {
    createContact,
    updateContact,
    deleteContact,
} from '../../store/slices/contactsSlice';

import styles from './ContactForm.module.css';
import { EMPTY_CONTACT } from '../../constants/constants';

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

    const onContactDelete = (values) => {
        if (values.id) {
            dispatch(deleteContact(values.id));
        }
    };

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
                        // value={contactData.phone}
                        className={styles.input}
                        name='phone'
                        type='tel'
                        placeholder='Phone'
                        autoComplete='on'
                        // onChange={onInputChange}
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
                            onClick={() => onContactDelete(values)}
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
            // validationSchema={{}}
        >
            {renderForm}
        </Formik>
    );
}

export default ContactForm;
