import React, { useState } from 'react';
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
//Given alias since Newsletter name is already taken by the main function of this component
import { Newsletter as NewsletterController } from "../../../../api";
import { initialValues, validationSchema } from "./Newsletter.form";
import "./Newsletter.scss";

const newsletterController = new NewsletterController();

export function Newsletter() {

    // State to show success email sent
    const [success, setSuccess] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            setSuccess(false) // Reset message to false again
            
            try {
                // See it in console
                //console.log(formValue);
                await newsletterController.registerEmail(formValue.email);
                formik.resetForm() //Reset form once POST
                setSuccess(true) // Show message
            } catch (error) {
                console.error(error);
            }
        }
    })

    return (
        <div className='footer-newsletter'>
            <h4>Subscribe and start learning!</h4>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Input
                    name="email"
                    placeholder="Email Address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                    I subscribe!
                </Form.Button>
                {success && ( //if this is true
                    <p className='success'>Email registered successfully!</p>
                )}
            </Form>
        </div>
    )
}
