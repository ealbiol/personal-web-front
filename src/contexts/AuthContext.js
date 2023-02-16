// CONTEXT CREATION: Move states globally through all app.

import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api"

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();


export function AuthProvider(props) {
    // The son of the context
    const { children } = props;
    // User state: If null means user is not logged in. If value means is logged in.
    const [user, setUser] = useState(null);
    // Token State: to be used in http petitions
    const [token, setToken] = useState(null);
    // Recover session
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //Keeping tokens in every render. Self calling function to be able to do async
        (async () => {
            // Obtaining both tokens
            const accessToken = authController.getAccessToken();
            const refreshToken = authController.getRefreshToken();

            await login(accessToken);

            setLoading(false);
        })();
    }, []);

    //Login Function: it needs to receive the accessToken
    const login = async (accessToken) => {
        try {
            const response = await userController.getMe(accessToken);
            delete response.password
            setUser({ response }) //User data received
            setToken(accessToken) //accessToken data received in LoginForm.js (login is made a global function)
        } catch (error) {
            console.log(error);
        }
    }

    //All we export here will be accessible in any component:
    const data = {
        accessToken: token, //token state
        user, //user state
        login, //login function
    };

    if (loading) return null

    //Provider has a property value where we add what we want to export
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

// After this we have envolved the Provider in App.js so that it's accessible everywere.