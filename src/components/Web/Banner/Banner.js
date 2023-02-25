import React from 'react';
import { Container } from "semantic-ui-react";
import "./Banner.scss";

export function Banner() {
    return (
        <div className='banner'>
            <Container>
                <h1>
                    Eduard Albiol
                    <br />
                    {/*to my site!*/}
                </h1>
                <h2>
                    Get to know a bit more about my 
                    <br />
                    career and goals
                </h2>
            </Container>

            {/*Darkening banner image background*/}
            <div className='banner__dark' />
        </div>
    )
}
