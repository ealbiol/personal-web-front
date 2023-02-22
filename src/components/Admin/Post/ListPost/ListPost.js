// COMPONENT LIST POSTS
import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";
import { Post } from "../../../../api";
import { PostItem } from "../PostItem";
import "./ListPost.scss";

const postController = new Post();

export function ListPost() {

    const [posts, setPosts] = useState(null);
    // Pagination data: limit, page, total, pages.
    const [pagination, setPagination] = useState(null);
    // State of current page
    const [page, setPage] = useState(1);

    console.log(posts);

    useEffect(() => {
        (async () => {
            try {
                const response = await postController.getPosts(page, 2); //current page we want and how many posts per page
                setPosts(response.docs) // Only storing the posts without the pagination data.
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total,
                }) // Storing pagination data in an object.
            } catch (error) {
                console.error(error);
            }
        })()

    }, [page]) // Every time the state page changes its value renders all page and will render to the desired page.

    // Function change page
    const changePage = (_, data) => {
        setPage(data.activePage)
    }

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

            <div className="list-post__pagination">
               <Pagination
               totalPages={pagination.pages} // Receiving the amount of pages from the server and storing it in state pagination.
               defaultActivePage={pagination.page} // Receiving current page
               ellipsisItem={null}
               firstItem={null}
               lastItem={null}
               onPageChange={changePage} // Calling function to change page

               />
            </div>
        </div>
    )
}
