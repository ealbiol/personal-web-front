// COURSE FORM COMPONENT
import React, { useCallback } from 'react';
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./CourseForm.scss";

export function CourseForm() {

    //Function to upload image
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0] //accepted files were taken with getRootProps and getInputProps functions. We take the property 0 since it's the only we want.
        console.log(file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        // types of images accepted
        accept: "image/jpeg, image/png",
        // As soon as image is received onDrop function is called
        onDrop,
    })

    // Function to have a default miniature
    const getMiniature = () => {
        return null;
    }

    return (
        <Form className='course-form'>
            {/*getRootProps will get all properties and add them to this div*/}
            <div className='course-form__miniature' {...getRootProps()}>
                {/*getInputProps will get all properties and add them to the input*/}
                <input {...getInputProps()} />
                {/*If we have miniature we render it and if not drag miniature*/}
                {getMiniature() ? (
                    <Image size="small" src={getMiniature} />
                )
                    :
                    <div>
                        <span>Drag your thumbnail</span>
                    </div>
                }
            </div>

            <Form.Input name="title" placeholder="course name" />
            <Form.Input name="url" placeholder="link name" />
            <Form.TextArea name="description" placeholder="course small description" />

            <Form.Group widths="equal">
                <Form.Input type="number" name="price" placeholder="course price" />
                <Form.Input type="number" name="score" placeholder="course score" />
            </Form.Group>

            <Form.Button type="submit" primary fluid>
                Create course
            </Form.Button>
        </Form>
    )
}
