// PUBLIC USER ZONE ROUTES
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/web";
import { ClientLayout } from "../layouts"

export function WebRouter() {
    // Function charging layout:
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }
    return (
        <Routes>
            <Route path="/" element={loadLayout(ClientLayout, Home)} />
        </Routes>
    )
}
