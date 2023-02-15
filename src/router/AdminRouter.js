// ADMIN USER ROUTES
import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Auth } from "../pages/admin";
import { AdminLayout } from "../layouts";

export function AdminRouter() {

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
            <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
        </Routes>
    )
}

// /*: All pages after admin/ will go to Auth page.