// LIST MENU COMPONENT
import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Menu } from "../../../../api"; // Exporting class Menu
import { MenuItem } from "../MenuItem"

const menuController = new Menu();


export function ListMenu(props) {
    const { active, reload, onReload } = props; //Active prop giving back active or unactive menus.

    const [menus, setMenus] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                // Cleaning previous data to generate new data
                setMenus(null);
                // Petition: Getting active menus when prop active is true and getting inactive menus when false
                const response = await menuController.getMenu(active);
                // Saving the data so that it can be used.
                setMenus(response)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [active, reload]) //Everytime prop active changes value it renders all again.

    //If there are no menus return Loader (spinner)
    if (!menus) return <Loader active inline="centered" />
    //If array of users is 0 return message about there are no users
    if (size(menus) === 0) return "There are no menus"

    return map(menus, (menu) => (
        <MenuItem key={menu._id} menu={menu} onReload={onReload}/>
    ))

}
