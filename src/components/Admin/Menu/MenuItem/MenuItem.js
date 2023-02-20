// MENU ITEM COMPONENT.
import React, { useState } from 'react';
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared"
import { MenuForm } from "../MenuForm";
import "./MenuItem.scss";


export function MenuItem(props) {
    const { menu, onReload } = props; //Obtaining menu prop from ListMenu.js. Each Menu item is a menu.

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    // Open Modal Function
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

    // Function to update modal
    const openUpdateMenu = () => {
        setTitleModal(`Update menu: ${menu.title}`)
        onOpenCloseModal();
    }

    return (
        <>
            <div className='menu-item'>
                <div className='menu-item__info'>
                    <span className='menu-item__info-title'>{menu.title}</span>
                    <span className='menu-item__info-path'>{menu.path}</span>
                </div>

                <div>
                    <Button icon primary onClick={openUpdateMenu}>
                        <Icon name="pencil" />
                    </Button>

                    <Button icon color={menu.active ? "orange" : "teal"}>
                        <Icon name={menu.active ? "ban" : "check"} />
                    </Button>
                    <Button icon color="red">
                        <Icon name="trash" />
                    </Button>
                </div>
            </div>

            <BasicModal
                show={showModal}
                close={onOpenCloseModal}
                title={titleModal}
            >
                <MenuForm
                    onClose={onOpenCloseModal}
                    onReload={onReload}
                    menu={menu}
                />
            </BasicModal>
        </>
    )
}
