// COURSE FORM COMPONENT
import React from 'react';
import { Form, Image } from "semantic-ui-react";
import "./CourseForm.scss";

export function CourseForm() {

    // Function to have a default miniature
    const getMiniature = () => {
        return null;
    }

    return (
        <Form className='course-form'>
            <div className='course-form__miniature'>
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
