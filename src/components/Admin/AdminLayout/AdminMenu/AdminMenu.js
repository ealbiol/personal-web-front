import React from 'react';
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import "./AdminMenu.scss"


export function AdminMenu() {

    // useLocation: Hook that allows us to know the url where user is at the moment. 
    //If taking data instead of pathname we see the full object with its properties.
    const { pathname } = useLocation();

    //Function comparing if path and pathname are equal
    const isCurrentPath = (path) => {
        if (path === pathname) return true;
        return false;
    }

    return (
        <Menu fluid vertical icon text className='admin-menu'>
            <Menu.Item as={Link} to="/admin/users"
                active={isCurrentPath("/admin/users")}>
                <Icon name="user outline" />
                User
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/menu"
                active={isCurrentPath("/admin/menu")}>
                <Icon name="bars" />
                Menu
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/courses"
                active={isCurrentPath("/admin/courses")}>
                <Icon name="computer" />
                Courses
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/newsletter"
                active={isCurrentPath("/admin/newsletter")}>
                <Icon name="mail" />
                Newsletter
            </Menu.Item>

            <Menu.Item as={Link} to="/admin/blog"
                active={isCurrentPath("/admin/blog")}>
                <Icon name="comment alternate outline" />
                Blog
            </Menu.Item>
        </Menu>
    )
}
