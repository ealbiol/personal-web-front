// SHARED COMPONENT
import React from 'react'
import { Modal } from "semantic-ui-react";

export function BasicModal(props) {
    const { show, close, title, size, children } = props;
    return (
        <Modal closeIcon open={show} onClose={close} size={size}>
            {/*title &&: If we receive a prop title: */}
            {title && <Modal.Header>{title}</Modal.Header>}
            {/*Modal content:*/}
            <Modal.Content>{children}</Modal.Content>
        </Modal>
    )
}

//Default size of modal in case user did not add any (receiving by props user decided size).
BasicModal.defaultProps = {
    size: "tiny",
}


//Props created here:
// Props names created here. They will be receiving
// properties with the same names from other components
// so that several can use this component.

// show: Whether the modal will be visible or not
// close: close function to be able to close the modal from within.
// size: modal size.
// children: modal content
// title