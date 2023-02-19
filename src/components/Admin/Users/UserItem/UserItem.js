import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { BasicModal } from "../../../Shared";
import { ENV } from "../../../../utils";
import { UserForm } from "../UserForm";
import "./UserItem.scss";

const userController = new User();

export function UserItem(props) {

    const { user, onReload } = props;
    const { accessToken } = useAuth();

    //States to manage editing user:
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    //States to confirm activation of user OR delete
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("")
    const [isDelete, setIsDelete] = useState(false)

    //Function to open and close modal
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

    // Function to open confirm modal
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);


    //Function to edit user
    const openUpdateUser = () => {
        setTitleModal(`Update ${user.email}`);
        onOpenCloseModal();
    }


    const openDeactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(user.active
            ? `Deactivate user ${user.email}`
            : `Activate user ${user.email}`
        );
        onOpenCloseConfirm();
    };

    const onActivateDeactivate = async () => {
        try {
            await userController.updateUser(accessToken, user._id, {
                active: !user.active,
            })
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='user-item'>
                <div className='user-item__info'>
                    <Image avatar
                        src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
                        } />
                    <div>
                        <p>{user.firstname} {user.lastname}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div>
                    <Button icon primary onClick={openUpdateUser}>
                        <Icon name="pencil" />
                    </Button>
                    <Button icon color={user.active ? "orange" : "teal"} onClick={openDeactivateActivateConfirm}>
                        <Icon name={user.active ? "ban" : "check"} />
                    </Button>
                    <Button icon color="red">
                        <Icon name="trash" />
                    </Button>
                </div>
            </div>

            {/*We are passing to the Shared Form the title of the form, its visibility and closing.*/}
            <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
                <UserForm
                    close={onOpenCloseModal}
                    onReload={onReload}
                    user={user} //Passing the user data we want do modify
                />
            </BasicModal>

            {/*Confirm window activation of user*/}
            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={isDelete ? () => console.log("Confirm Delete",) : onActivateDeactivate}
                content={confirmMessage}
                size="mini"
            />
        </>
    )
}
