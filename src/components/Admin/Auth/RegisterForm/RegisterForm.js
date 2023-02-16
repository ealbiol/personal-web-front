import React, { useState } from 'react';
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api"; //Importing class Auth API
import { initialValues, validationSchema } from "./RegisterForm.form";
import "./RegisterForm.scss";

// REGISTER FORM COMPONENT

const authController = new Auth();

export function RegisterForm(props) {
    const { openLogin } = props;
    // Error Message State
    const [error, setError] = useState("")

    // Form formik framework. Function onSubmit to be executed when form is filled
    const formik = useFormik({
        initialValues: initialValues(), // Initial empty value

        validationSchema: validationSchema(), // Calling Yup Validition function
        validateOnChange: false, // So that form is not seend when user is still filling fields.

        onSubmit: async (formValue) => { // formValue: data sent by user
            try {
                setError("");
                await authController.register(formValue) //Connection to api fetch.
                openLogin() // Open Login window after submit
            } catch (error) {
                setError("Server Error");
            }
        }
    })

    return (
        <Form
            className='register-form'
            onSubmit={formik.handleSubmit} // Formik function executed onsubmit
        >
            <Form.Input
                name="email"
                placeholder="Email"
                onChange={formik.handleChange} // It will search the key name in the state of the fornik state (initialValues) and it will replace its content.
                value={formik.values.email}
                error={formik.errors.email} // Yup validation
            />
            <Form.Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Form.Input
                name="repeatPassword"
                type="password"
                placeholder="Repeat Password"
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />
            <Form.Checkbox
                name="conditionsAccepted"
                label="I read and accept the privacy policy."
                onChange={(_, data) =>
                    formik.setFieldValue("conditionsAccepted", data.checked) //Looks for the field we stated.
                }
                checked={formik.values.conditionsAccepted}
                error={formik.errors.conditionsAccepted}
            />
            <Form.Button
                type="submit"
                primary
                fluid
                loading={formik.isSubmitting} //If form is sending it will add a spinner.
            >
                Create an Account
            </Form.Button>
            <p className='register-form__error'>{error}</p>
        </Form>
    )
}


// Fornik Process: 

// Fornik initial State is the function with an object of empty form properties.
// When user clicks onSubmit the initialValues() function within formik state
// gets executed.

// formik.handleChange takes the key names (e.g. email), matches that name
// with a property with the same name in initialValues() and replaces its
// content