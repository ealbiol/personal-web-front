import React from 'react';
import { HashRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from "./router";
import { AuthProvider } from "./contexts/AuthContext"; // Importing the context fucntion

export default function App() {
    return (
        //AuthProvider envolves all app allowing usecontext to use states globally.
        <AuthProvider> 
            <HashRouter>
                <WebRouter />
                <AdminRouter />
            </HashRouter>
        </AuthProvider>

    )
}
