import React from 'react';
import { Tab } from "semantic-ui-react";

export function Newsletter() {

    const panes = [
        {
            render: () => (
                <Tab.Pane attached={false}>
                    <p>Emails List</p>
                </Tab.Pane>
            ),
        }
    ]

    return (
        <div className='newsletter-page'>
            <Tab panes={panes}/>
        </div>
    )
}
