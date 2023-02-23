import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
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

    // Spinner before posts loading
    if (!posts) return <Loader active inline="centered" />

    return (
        <div className='list-posts-web'>
            <div className='list'>
                {map(posts, (post) => (
                    <div key={post._id} className="item">
                        <span>{post.title}</span>
                    </div>
                ))}
            </div>

            <div className='pagination'>
                <Pagination
                    totalPages={10}
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    secondary
                    pointing
                />

            </div>
        </div>
    )
}
