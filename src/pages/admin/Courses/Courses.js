import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { ListCourses, CourseForm } from "../../../components/Admin/Course"
import "./Courses.scss";

export function Courses() {
    const [showModal, setShowModal] = useState(false);
    const [reload, setReload] = useState(false);

    // Function open/close modal
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState)
    const onReload = () => setReload((prevState) => !prevState);

    return (
        <>
            <div className='courses-page'>
                <div className='courses-page__add'>
                    <Button primary onClick={onOpenCloseModal}>
                        New Course
                    </Button>
                </div>

                <Tab.Pane attached={false}>
                    <ListCourses reload={reload} />
                </Tab.Pane>
            </div>

            <BasicModal
                show={showModal}
                close={onOpenCloseModal}
                title="Create course"
            >
                <CourseForm onClose={onOpenCloseModal} onReload={onReload} />
            </BasicModal>
        </>
    )
}
