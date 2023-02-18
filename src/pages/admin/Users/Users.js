// USERS PANEL
import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { UserForm, ListUsers } from "../../../components/Admin/Users";
import "./Users.scss";

export function Users() {

  //State to show modal
  const [showModal, setShowModal] = useState(false);
  //Reloading users
  const [reload, setReload] = useState(false)

  // Function to close and open modal
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState) // same as doing !showModal ...
  // Function to update useReload
  const onReload = () => setReload((prevState) => !prevState);

  // Tabs: semantic-ui-react own tabs configuration
  const panes = [
    {
      menuItem: "Active users",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Inactive users",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} reload={reload} />
        </Tab.Pane>
      )
    },
  ]

  return (
    <>
      <div className='users-page'>
        <Button
          className='users-page__add'
          primary onClick={onOpenCloseModal}>
          New user
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      {/*showModal: Here we pass the prop 'show' which is boolean and it will be received in BasicModal.js where we created the prop 'show'.*/}
      {/*Props we send need to have the same name as the oned created where they receive them. In this case in BasicModal.js*/}
      {/*'show' is also a property of semantic-ui-react that is by default in true*/}
      <BasicModal
        show={showModal}
        close={onOpenCloseModal} title="Creating new user"
      >
        {/*We pass the function onReload so that the list of users is reloaded when creating a new user*/}
        <UserForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  )
}
