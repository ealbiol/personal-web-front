import React from 'react'
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
// Dependency for getting created post time
import { DateTime } from "luxon";
import { ENV } from "../../../../utils";
import "./ListPostItem.scss"

export function ListPostItem(props) {

    const { post } = props;
    const date = new Date(post.created_at);

    return (
        <Link className='list-post-item' to={`/blog/${post.path}`}>
            <Image src={`${ENV.BASE_PATH}/${post.miniature}`} fluid />
            <h2>{post.title}</h2>
            {/*Luxon dating*/}
            <span>
                {DateTime
                .fromISO(date.toISOString())
                .setLocale("en")
                .toFormat("dd 'of' LLLL 'of' yyyy")
                }
            </span>
        </Link>
    )
}
