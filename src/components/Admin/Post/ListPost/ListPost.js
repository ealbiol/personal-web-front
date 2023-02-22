// COMPONENT LIST POSTS
import React, { useState, useEffect } from 'react'
import { Post } from "../../../../api";
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


    return (
        <div>
            <h2>List Posts</h2>
        </div>
    )
}
