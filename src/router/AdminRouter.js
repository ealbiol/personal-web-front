// ADMIN USER ROUTES
import React from 'react'
import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "../layouts";
import { Auth, Users, Blog, Courses, Menu, Newsletter } from "../pages/admin";


const user = { email: "whatever@gmail.com" };

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
            {!user ? ( //if user is empty it means user is not logged it then he can only enters to the Auth page.
                <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
            ) : (
                <>
                    {["/admin", "/admin/blog"].map((path) => ( //Mapping accessible paths
                        <Route
                            key={path}
                            path={path}
                            element={loadLayout(AdminLayout, Blog)} //Both /admin and /adming/blog go to blog page.
                        />
                    ))}
                    <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
                    <Route path="/admin/courses" element={loadLayout(AdminLayout, Courses)} />
                    <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
                    <Route path="/admin/newsletter" element={loadLayout(AdminLayout, Newsletter)} />
                </>
            )}

        </Routes>
    )
}

// /*: All pages after admin/ will go to Auth page.