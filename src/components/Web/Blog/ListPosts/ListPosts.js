import React, { useState, useEffect } from 'react';
import { Post } from "../../../../api";
import "./ListPosts.scss";

const postController = new Post();

export function ListPosts() {
    const [posts, setPosts] = useState(null);
    //Posts
    //console.log(posts);
    useEffect(() => {
        (async () => {
            try {
                const response = await postController.getPosts(1);
                setPosts(response.docs)
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    return (
        <div>
            <h2>ListPosts</h2>
        </div>
    )
}
