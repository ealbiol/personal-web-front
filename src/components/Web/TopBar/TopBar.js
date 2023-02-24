import React, { useState, useEffect } from 'react';
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Icon } from "../../../assets";
import { Menu } from "../../../api";
import { socialData } from "../../../utils"
import "./TopBar.scss";

//Getting menus from server:
const menuController = new Menu();

export function TopBar() {

    const [menu, setMenu] = useState(null);
    //See menus
    //console.log(menu);

    //Getting menus from server
    useEffect(() => {
        (async () => {
            try {
                const response = await menuController.getMenu(true); //true meaning we want the active menus
                setMenu(response)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])


    return (
        <div className='top-bar'>
            <Container>
                <div className='top-bar__left'>
                    <Link to="/" className='logo'>
                        <Icon.LogoWhite />
                    </Link>

                    <div className='menu'>
                        {/*Rendering menus coming from server call*/}
                        {map(menu, (item) => (
                            <a key={item._id} href={item?.path}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
                <div>
                    {/*Rendering const socialData*/}
                    {map(socialData, (social) => (
                        <Button
                            key={social.type}
                            as="a" //Link
                            target="_blank"
                            href={social.link}
                            color={social.type} // from semantic: it gets color based on name.
                            icon={social.type} // from semantic: it gets icon based on name.
                        />
                    ))}
                </div>
            </Container>
        </div>
    )
}
