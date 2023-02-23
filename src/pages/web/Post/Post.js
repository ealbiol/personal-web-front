import React, { useState, useEffect } from 'react';
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
  console.log(useParams());
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


  return (
    <div>
      <h1>We are in Post</h1>
    </div>
  )
}
