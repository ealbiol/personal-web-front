// USERS PANEL
import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react"
import "./Users.scss";

export function Users() {
  // Tabs: semantic-ui-react own tabs configuration
  const panes = [
    {
      menuItem: "Active users",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Active Users</h2>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Inactive users",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Inactive Users</h2>
        </Tab.Pane>
      )
    },
  ]

  return (
    <>
      <div className='users-page'>
        <Button
          className='users-page__add'
          primary onClick={() => console.log("Open form")}>
          New user
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
    </>
  )
}
