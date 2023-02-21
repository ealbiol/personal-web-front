// COURSE FORM COMPONENT
import React, { useCallback } from 'react';
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks"
import { initialValues, validationSchema } from "./CourseForm.form";
import "./CourseForm.scss";

const courseController = new Course();

export function CourseForm(props) {

    const { onClose, onReload } = props;

    const { accessToken } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await courseController.createCourse(accessToken, formValue);
                onClose();

                onReload();
            } catch (error) {
                console.error(error);
            }
        }
    })

    //Function to upload image
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0] //accepted files were taken with getRootProps and getInputProps functions. We take the property 0 since it's the only we want.
        formik.setFieldValue("miniature", URL.createObjectURL(file)) // to show it in form
        formik.setFieldValue("file", file); // to upload it
    });

    const { getRootProps, getInputProps } = useDropzone({
        // types of images accepted
        accept: "image/jpeg, image/png",
        // As soon as image is received onDrop function is called
        onDrop,
    })

    // Function to have a default miniature or uploaded
    const getMiniature = () => {
        if (formik.values.file) { //if user has uploaded a file
            return formik.values.miniature;
        }
        return null;
    }

    return (
        <Form className='course-form' onSubmit={formik.handleSubmit}>
            {/*getRootProps will get all properties and add them to this div*/}
            <div className='course-form__miniature' {...getRootProps()}>
                {/*getInputProps will get all properties and add them to the input*/}
                <input {...getInputProps()} />
                {/*If we have miniature we render it and if not drag miniature*/}
                {getMiniature() ? (
                    <Image size="small" src={getMiniature()} />
                )
                    :
                    <div>
                        <span>Drag your thumbnail</span>
                    </div>
                }
            </div>

            <Form.Input
                name="title"
                placeholder="course name"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title}
            />
            <Form.Input
                name="url"
                placeholder="link name"
                onChange={formik.handleChange}
                value={formik.values.url}
                error={formik.errors.url}
            />
            <Form.TextArea
                name="description"
                placeholder="course small description"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.errors.description}
            />

            <Form.Group widths="equal">
                <Form.Input
                    type="number"
                    name="price"
                    placeholder="course price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    error={formik.errors.price}
                />
                <Form.Input
                    type="number"
                    name="score"
                    placeholder="course score"
                    onChange={formik.handleChange}
                    value={formik.values.score}
                    error={formik.errors.score}
                />
            </Form.Group>

            <Form.Button
                type="submit"
                primary
                fluid
                loading={formik.isSubmitting}
            >
                Create course
            </Form.Button>
        </Form>
    )
}
