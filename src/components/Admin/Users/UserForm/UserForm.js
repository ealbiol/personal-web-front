// USER FORM to create or amend users
import React, { useCallback } from 'react'
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { image } from "../../../../assets";
import { initialValues, validationSchema } from "./UserForm.form";
import "./UserForm.scss";

const userCotroller = new User();

export function UserForm(props) {

    const { close, onReload, user } = props;
    const { accessToken } = useAuth();

    // We pass the functions initialValues and validitionSchema to Formik
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false, //Formik prop
        onSubmit: async (formValue) => { //Getting form data.
            try {
                await userCotroller.createUser(accessToken, formValue);
                close();
            } catch (error) {
                console.error(error);
            }
        }

    });


    // Function when image is sent:
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]; // Taking the path element from the array of elements.
        formik.setFieldValue("avatar", URL.createObjectURL(file)); // To create URL of file
        formik.setFieldValue("fileAvatar", file); // To send file to server.
    });
    //useDropzone configuration:
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
    });
    // Getting user avatar (if not default avatar)
    const getAvatar = () => {
        if (formik.values.fileAvatar) {
            return formik.values.avatar;
        }
        return image.noAvatar
    }

    return (
        <Form className='user-form' onSubmit={formik.handleSubmit}>
            <div className='user-form__avatar' {...getRootProps()}>
                <input {...getInputProps()} />
                <Image avatar size="small" src={getAvatar()} />
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
                    onChange={(_, data) => formik.setFieldValue("role", data.value)}
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