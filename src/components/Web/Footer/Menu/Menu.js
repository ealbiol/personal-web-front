// FOOTER MENU
import React from 'react';
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Menu.scss";

export function Menu() {
    return (
        <div className='footer-menu'>
            <h4>Navigation</h4>

            <Grid columns={2}>
                <Grid.Column>
                    <Link to="/courses">
                        <Icon name="book" /> Online Courses
                    </Link>
                    <Link to="#">
                        <Icon name="code" /> Web Development
                    </Link>
                    <Link to="#">
                        <Icon name="database" /> Database
                    </Link>
                    <Link to="#">
                        <Icon name="code" /> UI/UX
                    </Link>
                </Grid.Column>
                <Grid.Column>
                    <Link to="#">
                        <Icon name="server" /> Systems / Servers
                    </Link>
                    <Link to="#">
                        <Icon name="cogs" /> CMS
                    </Link>
                    <Link to="#">
                        <Icon name="user outline" /> Portfolio
                    </Link>
                    <Link to="#">
                        <Icon name="node" /> Nodejs
                    </Link>
                    <Link to="/admin">
                        <Icon name="home" /> Admin
                    </Link>
                </Grid.Column>
            </Grid>
        </div>
    )
}
