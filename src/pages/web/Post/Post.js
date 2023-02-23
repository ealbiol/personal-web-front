import React, { useState, useEffect } from 'react';
import { Container, Loader } from "semantic-ui-react";
//Obtaining url path
import { useParams } from "react-router-dom";
import { Post as PostController } from "../../../api";
import "./Post.scss";

const postController = new PostController();

export function Post() {

  //State contaning the info of the post we are viewing
  const [post, setPost] = useState(null);

  //Post data
  //console.log(post);

  //useParams hooks gives us the params/path of the post. For example "nodejs-explanation". It would come from /blog/nodejs-explanation.
  //console.log(useParams());
  // What we ahcieve is that if we enter a certain post with its url we get the data of that post
  const { path } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPost(path);
        setPost(response)
      } catch (error) {
        console.error(error);
      }
    })()
  }, [path])

  if (!post) return <Loader active inline="centered" />

  return (
    <Container className='post'>
      <h1 className='title'>{post.title}</h1>

      <div
        className='content'
        // Rendering post content (content was added with an editor allowing styles as bold, etc)
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
  )
}
