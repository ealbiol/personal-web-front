import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared"
import { ListMenu, MenuForm } from "../../../components/Admin/Menu";
import "./Menu.scss";

export function Menu() {

  // Modal
  const [showModal, setShowModal] = useState(false);
  // Rerender list when a new menu is added
  const [reload, setReload] = useState(false)

  // Modal functions
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Active Menus",
      render: () => (
        <Tab.Pane attached={false}>
          {/*// true to receive active menus*/}
          <ListMenu active={true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Inactive Menus",
      render: () => (
        <Tab.Pane attached={false}>
          {/*// false to receive non active menus*/}
          <ListMenu active={false} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      )
    }
  ]
  return (
    <>
      <div className='menu-page'>
        <Button className='menu-page__add' primary onClick={onOpenCloseModal}>
          New Menu
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />{" "}
      </div>

      <BasicModal
        show={showModal}
        close={onOpenCloseModal} 
        title="Creating new menu"
      >
        {/*We pass the function onReload so that the list of menus is reloaded when creating a new menu*/}
        <MenuForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  )
}
