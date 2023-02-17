// LIST OF USERS IN ADMIN
import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";

const userController = new User();

export function ListUsers(props) {
    const { usersActive } = props; // Prop name created here

    const [users, setUsers] = useState(null);
    const { accessToken } = useAuth();

    console.log(users);

    useEffect(() => {
        (async () => {
            try {
                setUsers(null);
                const response = await userController.getUsers(
                    accessToken,
                    usersActive
                );
                setUsers(response)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [usersActive]);

    if (!users) return <Loader active inline="centered" />
    if (size(users) === 0) return "There are no users"


    return (
        <div>
            <h2>We are seeing the users</h2>
            <p>{usersActive ? "Activos" : "Inactivos"}</p>
        </div>
    )
}
