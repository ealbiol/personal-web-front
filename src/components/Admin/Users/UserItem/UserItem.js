import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { UserForm } from "../UserForm";
import "./UserItem.scss";

export function UserItem(props) {

    const { user, onReload } = props;
    //States to manage editing user:
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");

    //Function to open and close modal
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

    //Function to edit user
    const openUpdateUser = () => {
        setTitleModal(`Update ${user.email}`);
        onOpenCloseModal();
    }

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
                    <Button icon color={user.active ? "orange" : "teal"}>
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
        </>
    )
}
