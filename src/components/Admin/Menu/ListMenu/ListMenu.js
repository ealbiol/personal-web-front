// LIST MENU COMPONENT
import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { Menu } from "../../../../api"; // Exporting class Menu

const menuController = new Menu();


export function ListMenu(props) {
    const { active } = props; //Active prop giving back active or unactive menus.

    const [menus, setMenus] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                // Cleaning previous data to generate new data
                setMenus(null); 
                // Getting active menus when prop active is true and getting inactive menus when false
                const response = await menuController.getMenu(active);
                // Saving the data so that it can be used.
                setMenus(response)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [active]) //Everytime prop active changes value it renders all again.

    //If there are no menus return
    if (!menus) return <Loader active inline="centered" />
    //If array of users is 0 return message about there are no users
    if (size(menus) === 0) return "There are no menus"

    return (
        <h2>List Menu</h2>
    )
}