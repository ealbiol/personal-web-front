// CONTEXT CREATION: Move states globally through all app.
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props; // The son of the context

    // User state: If null means user is not logged in. If value means is logged in.
    const [user, setUser] = useState(null)
    // Token State: to be used in http petitions
    const [token, setToken] = useState(null)


    useEffect(() => {
        // Checking if user is logged in or not.
    }, [])

    //Login Function: it needs to receive the accessToken
    const login = async (accessToken) => {
        console.log("Login Context");
        console.log(accessToken);
    }

    //All we export here will be accessible in any component:
    const data = {
        accessToken: token, //token state
        user, //user state
        login //login function
    };

    //Provider has a property value where we add what we want to export
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

// After this we have envolved the Provider in App.js so that it's accessible everywere.