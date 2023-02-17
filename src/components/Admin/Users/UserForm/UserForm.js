// USER FORM to create or amend users
import React from 'react'
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./UserForm.form";
import "./UserForm.scss";

export function UserForm(props) {

    const { close, onReload, user } = props;

    // We pass the functions initialValues and validitionSchema to Formik
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false, //Formik prop
        onSubmit: async (formValue) => { //Getting form data.
            try {
                console.log(formValue);
            } catch (error) {
                console.error(error);
            }
        }

    });

    return (
        <Form className='user-form' onSubmit={formik.handleSubmit}>
            <div className='user-form_avatar'>
                <span>AVATAR</span>
            </div>

            <Form.Group widths="equal">
                <Form.Input
                    name="firstname"
                    placeholder="Nanme"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    error={formik.errors.firstname}
                />
                <Form.Input
                    name="lastname"
                    placeholder="Last name"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    error={formik.errors.lastname}
                />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input
                    name="email"
                    placeholder="Email Address"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <Form.Dropdown
                    placeholder='Select a role'
                    options={roleOptions}
                    selection
                    onChange={(_, data)=> formik.setFieldValue("role", data.value)}
                    value={formik.values.role}
                    error={formik.errors.role}
                />
            </Form.Group>

            <Form.Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
            />

            {/*Submit*/}
            <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
                {/*if prop user arrives with content (true) it means update user. If not it's because we want to create a new user:*/}
                {user ? "Update User" : "Create New User"}
            </Form.Button>
        </Form>
    )
}

const roleOptions = [
    {
        key: "user",
        text: "User",
        value: "user"
    },
    {
        key: "admin",
        text: "Administrator",
        value: "admin"
    },
];



// We defined in this component the names of the prop onReload.
// onReload prop receives a function that will recharge the list of users as soon as a new one is created.
// user prop is used to amend a user.