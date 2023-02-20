// MENU ITEM COMPONENT.
import React, { useState } from 'react';
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { MenuForm } from "../MenuForm";
import "./MenuItem.scss";

const menuController = new Menu();

export function MenuItem(props) {
    const { menu, onReload } = props; //Obtaining menu prop from ListMenu.js. Each Menu item is a menu.
    const { accessToken } = useAuth();

    // States Edit Menu
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    // State Eliminate/activate/deactivate menu
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [isDelete, setIsDelete] = useState(false)

    // Open Modal Edit Function 
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    // Open Modal Eliminate/activate/deactivate Function
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    // Function to update modal
    const openUpdateMenu = () => {
        setTitleModal(`Update menu: ${menu.title}`)
        onOpenCloseModal();
    };

    // Function in Modal activate/deactivate
    const openDeactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(
            menu.active ? `Deactivate menu ${menu.title} ?` //if menu.active is true it means user wants to deactive. Otherwise it means user wants to delete.
                :
                `Activate menu ${menu.title} ?`
        );
        onOpenCloseConfirm();
    }

    // Function action to activate/deactivate
    const onActivateDeactivate = async () => {
        try {
            await menuController.updateMenu(accessToken, menu._id, {
                active: !menu.active // Modyfing the property active to the opposite.
            });

            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
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

                    <Button
                        icon
                        color={menu.active ? "orange" : "teal"}
                        onClick={openDeactivateActivateConfirm}
                    >
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

            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={isDelete ? console.log("Delete") : onActivateDeactivate} //If isDelete state is true is because user wants to delete, otherwise user wants to deactivate.
                content={confirmMessage}
                size="mini"

            />
        </>
    )
}
