import React from 'react';
import { Container } from "semantic-ui-react";
import "./ClientLayout.scss"

export function ClientLayout(props) {
    const { children } = props;
    return (
        <div className='client-layout'>
            <div className='client-layout__header'>
                <p>HEADER</p>
            </div>

            {children}

            <div className='client-layout__footer'>
                <Container>
                    <span>INFO</span>
                    <span>MENU</span>
                    <span>NEWSLETTER</span>
                </Container>
                <Container>
                    <span>Ⓒ ALL RIGHTS RESERVED</span>
                    <span>EDUARD ALBIOL | FRONTEND DEVELOPER</span>
                </Container>
            </div>
        </div>
    )
}
