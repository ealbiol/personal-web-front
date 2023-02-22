// INFO COMPONENT
import React from 'react';
import { Button } from "semantic-ui-react";
import { map } from "lodash";
import { Icon } from "../../../../assets";
import { socialData } from "../../../../utils";
import "./Info.scss";

export function Info() {
    return (
        <div className='footer-info'>
            <Icon.LogoWhite className='logo' />
            <p>
                Getting into web development, enjoying each step
                creating all kind of projects and letting my imagination
                run.
            </p>
            

            {/*Rendering socialMedia array*/}
            {map(socialData, (social)=>(
                <Button
                key={social.type}
                as="a" //link
                target="_blank"
                href={social.link}
                color={social.type} // From semantic
                icon={social.type} // From semantic
                />
            ))}
        </div>
    )
}
