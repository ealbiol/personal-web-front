// COMPONENT LIST POSTS
import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { map, size } from "lodash";
import { Post } from "../../../../api";
import { PostItem } from "../PostItem";
import "./ListPost.scss";

const postController = new Post();

export function ListPost() {

    const [posts, setPosts] = useState(null);

    console.log(posts);

    useEffect(() => {
        (async () => {
            try {
                const response = await postController.getPosts();
                setPosts(response.docs) // Only storing the posts without the pagination data.
            } catch (error) {
                console.error(error);
            }
        })()

    }, [])

    //Adding spinner while waiting posts
    if (!posts) return <Loader active inline="centered" />
    //If there are 0 posts
    if (size(posts) === 0) return "There are no posts"

    return (
        <div className='list-post'>
            {/*Rendering all posts adding each one in component PostItem with map method.*/}
            {map(posts, (post) => (
                //Rendering each post from posts inside the component PostItem
                <PostItem key={post._id} post={post} />
            ))}

            <div>
                {/*PAGINATION*/}
            </div>
        </div>
    )
}
