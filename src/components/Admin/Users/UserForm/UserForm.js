// USER FORM to create or amend users
import React from 'react'
import { Form, Image } from "semantic-ui-react";
export function UserForm(props) {
    const { close, onReload, user } = props;
    return (
        <Form className='user-form'>
            <div className='user-form_avatar'>
                <span>AVATAR</span>
            </div>

            <Form.Group widths="equal">
                <Form.Input name="firstname" placeholder="Nanme" />
                <Form.Input name="lasttname" placeholder="Lastn name" />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input name="email" placeholder="Email Address" />
                <Form.Dropdown
                    placeholder='Select a role'
                    options={roleOptions}
                    selection
                />
            </Form.Group>

            <Form.Input type="password" name="password" placeholder="Password" />

            {/*Submit*/}
            <Form.Button type="submit" primary fluid>
                {/*if prop user arrives with content (true) it means update user. If not it's because we want to create a new user:*/}
                {user ? "Update User":"Create New User" }
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