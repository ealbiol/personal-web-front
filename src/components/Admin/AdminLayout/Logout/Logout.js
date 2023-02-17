//LOGOUT COMPONENT
import React from 'react';
import { Button, Icon } from "semantic-ui-react";
// useNavigate to send user to login page once he logged out.
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks"

export function Logout() {
  
  // Extracting from useAuth the function logout.
  const { logout } = useAuth();
  
  const navigate = useNavigate();

  const onLogout = () => {
    // We execute/call logout() function to log out.
    logout();
    navigate("/admin")
  }

  return (
    <Button icon basic color="red" onClick={onLogout}>
      <Icon name="power off" />Log out
    </Button>
  )
}
