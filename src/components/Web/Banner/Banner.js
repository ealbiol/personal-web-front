import React from 'react';
import { Container } from "semantic-ui-react";
import "./Banner.scss";

export function Banner() {
    return (
        <div className='banner'>
            <Container>
                <h1>
                    Learn new <br /> web technologies
                </h1>
                <h2>
                    Through practical courses, updated and created by
                    <br />
                    highly experienced professionals.
                </h2>
            </Container>

            {/*Darkening banner image background*/}
            <div className='banner__dark' />
        </div>
    )
}
