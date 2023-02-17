// CONTEXT CREATION: Move states globally through all app.

import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api"
import { hasExpiredToken } from "../utils"

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

            // Checking if tokens exist
            if (!accessToken || !refreshToken) {
                logout(); //Calling function to remove tokens and user.
                setLoading(false); //closing session
                return;
            }

            //Calling function to check if token expired
            // if access token expired:
            if (hasExpiredToken(accessToken)) {
                // if refresh token expired:
                if (hasExpiredToken(refreshToken)) {
                    logout();
                } else {
                    // We call reLogin function because before login we have to refresh the access token
                    await reLogin(refreshToken)
                }
            } else {
                // if it hasn't expired
                await login(accessToken);
            }

            setLoading(false);
        })();
    }, []);

    // Function to refresh refresh token
    const reLogin = async (refreshToken) => {
        try {
            // Getting new access token
            const { accessToken } = await authController.refreshAccessToken(
                refreshToken
            );
            // Updating access token in localstorage
            authController.setAccessToken(accessToken)
            await login(accessToken) //Giving new access token
        } catch (error) {
            console.error(error);
        }
    }


    //Login Function: it needs to receive the accessToken
    const login = async (accessToken) => {
        try {
            const response = await userController.getMe(accessToken);
            delete response.password
            setUser( response ) //User data received
            setToken(accessToken) //accessToken data received in LoginForm.js (login is made a global function)
        } catch (error) {
            console.log(error);
        }
    }

    //Function to close session
    const logout = () => {
        setUser(null);
        setToken(null);
        authController.removeTokens(); //Using function to remove Tokens.
    }

    //All we export here will be accessible in any component:
    const data = {
        accessToken: token, //token state
        user, // user state
        login, // login function
        logout, // logout function
    };

    // As long as loading is true (original state) no session data is given.
    if (loading) return null

    //Provider has a property value where we add what we want to export
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

// After this we have envolved the Provider in App.js so that it's accessible everywere.