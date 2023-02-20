import React from 'react';
import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import { Menu } from "../../../../api";
import { ENV } from "../../../../utils";
import "./MenuForm.scss";

const userCotroller = new Menu();


export function MenuForm(props) {
    const { onClose, onReload, menu } = props;
    return (
        <Form>
            <Form.Group widths="equal">
                <Form.Input name="title" placeholder="tile" />
                <Form.Input name="number" placeholder="order" />
            </Form.Group>

            <Input
                name="path"
                placeholder="URL"
                fluid
                label={!menu ? <Dropdown options={options} /> : null} />

            <Form.Group />

            <Form.Button type="submit" primary fluid>
                {menu ? "Update Menu" : "Create Menu"}
            </Form.Button>
        </Form>
    )
}


const options = [
    { key: "https://", text: "https://", value: "https://" },
    { key: "http://", text: "http://", value: "https//" },
    { key: "/", text: "/", value: "/" }
]