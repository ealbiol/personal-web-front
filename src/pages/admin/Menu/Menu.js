import React from 'react';
import { Tab, Button } from "semantic-ui-react";
import { ListMenu } from "../../../components/Admin/Menu"
import "./Menu.scss";

export function Menu() {
  const panes = [
    {
      menuItem: "Active Menus",
      render: () => (
        <Tab.Pane attached={false}>
          {/*// true to receive active menus*/}
          <ListMenu active={true} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Inactive Menus",
      render: () => (
        <Tab.Pane attached={false}>
          {/*// false to receive non active menus*/}
          <ListMenu active={false} />
        </Tab.Pane>
      )
    }
  ]
  return (
    <>
      <div className='menu-page'>
        <Button className='menu-page__add' primary>
          New Menu
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />{" "}
      </div>
    </>
  )
}
