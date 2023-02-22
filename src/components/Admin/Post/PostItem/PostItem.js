// POST ITEM COMPONENT
import React, { useState } from 'react';
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks"
import { BasicModal } from "../../../Shared";
import { PostForm } from "../PostForm";
import "./PostItem.scss";

const postController = new Post();

export function PostItem(props) {

    const { post, onReload } = props;

    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { accessToken } = useAuth();

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    // FUNCTION TO DELETE
    const onDelete = async () => {
        try {
            await postController.deletePost(accessToken, post._id);

            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='post-item'>
                <div className='post-item__info'>
                    <span className='post-item__info-title'>{post.title}</span>
                    <span className='post-item__info-path'>{post.path}</span>
                </div>
                <div>
                    <Button
                        as={Link}
                        icon
                        to={`/blog/${post.path}`}
                        target="_blank"
                    >
                        <Icon name="eye" />
                    </Button>
                    <Button icon primary onClick={onOpenCloseModal}>
                        <Icon name="pencil" />
                    </Button>
                    <Button icon color="red" onClick={onOpenCloseConfirm}>
                        <Icon name="trash" />
                    </Button>
                </div>
            </div>

            <BasicModal
                show={showModal}
                close={onOpenCloseModal}
                title="Edit post"
                size="large"
            >
                <PostForm
                    onClose={onOpenCloseModal}
                    onReload={onReload}
                    post={post}
                />
            </BasicModal>

            <Confirm 
            open={showConfirm} 
            onCancel={onOpenCloseConfirm}
            onConfirm={onDelete} // Executing/calling onDelete function when user presses confirm button.
            content={`Delete ${post.title} ?`}
            size="mini"
            />
        </>
    )
}
