import React from 'react';
import { Tab, Button } from "semantic-ui-react";
import "./Blog.scss";

export function Blog() {

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <p>List Posts</p>
        </Tab.Pane>
      ),
    }
  ]

  return (
    <>
      <div className='blog-page'>
        <div className='blog-page__add'>
          <Button primary>
            New Post
          </Button>
        </div>
        <Tab menu={{ secondary: true }} panes={panes} />

      </div>
    </>
  )
}
