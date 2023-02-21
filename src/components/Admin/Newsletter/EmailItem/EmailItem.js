// EMAIL ITEM COMPONENT
import React from 'react';
import { Button, Icon, Confirm } from "semantic-ui-react";
import "./EmailItem.scss";

//This component is being rendered with a map to obtain a list of items.
export function EmailItem(props) {

    const { email } = props;

    return (
        <>
            <div className='email-item'>
                <span>{email.email}</span>

                <div>
                    <Button icon color="red">
                        <Icon name="trash" />
                    </Button>
                </div>
            </div>
        </>
    )
}
