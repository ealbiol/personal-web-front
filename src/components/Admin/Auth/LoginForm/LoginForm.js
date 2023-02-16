// LOGIN FORM COMPONENT
import React from 'react';
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api"
import { useAuth } from "../../../../hooks"; //Importing context
import { initialValues, validationSchema } from "./LoginForm.form"

const authController = new Auth();

export function LoginForm() {
    const { login } = useAuth(); //Getting context global function login

    const formik = useFormik({
        // We pass initial values
        initialValues: initialValues(),
        // We pass validationSchema
        validationSchema: validationSchema(),
        validationOnChange: false,
        //Function that is sent when form is sent
        onSubmit: async (formValue) => {
            try {
                const response = await authController.login(formValue);

                // Calling function to save tokens to localstorage
                authController.setAccessToken(response.access);
                authController.setRefreshToken(response.refresh);
                login(response.access) // Making login: It takes the access token
            } catch (error) {
                console.error(error);
            }
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                name="email"
                placeholder="Email Address"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <Form.Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
            />

            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                Enter
            </Form.Button>
        </Form>
    )
}
