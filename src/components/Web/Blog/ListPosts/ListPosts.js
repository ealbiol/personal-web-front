import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
// Getting page in url and persistent page
import { useNavigate, useSearchParams } from "react-router-dom";
import { Post } from "../../../../api";
import { ListPostItem } from "../ListPostItem"
import "./ListPosts.scss";

const postController = new Post();

export function ListPosts() {
    const [posts, setPosts] = useState(null);
    const [pagination, setPagination] = useState();


    //state to get url of each page in browser
    const navigate = useNavigate();

    //state to keep in the same page with new rendering
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") || 1);
    console.log(searchParams.get("page"));

    //Posts
    //console.log(posts);

    useEffect(() => {
        (async () => {
            try {
                const response = await postController.getPosts(page, 9);
                setPosts(response.docs)
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total,
                })
            } catch (error) {
                console.error(error);
            }
        })()
    }, [page])

    //Function change page and calling navigate to get link of page in browser
    const changePage = (_, data) => {
        const newPage = data.activePage;
        setPage(newPage);
        navigate(`?page=${newPage}`)
    }

    // Spinner before posts loading
    if (!posts) return <Loader active inline="centered" />

    return (
        <div className='list-posts-web'>
            <div className='list'>
                {map(posts, (post) => (
                    <div key={post._id} className="item">
                        <ListPostItem post={post} />
                    </div>
                ))}
            </div>

            <div className='pagination'>
                <Pagination
                    totalPages={pagination.pages}
                    defaultActivePage={pagination.page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    secondary
                    pointing
                    onPageChange={changePage}
                />

            </div>
        </div>
    )
}
