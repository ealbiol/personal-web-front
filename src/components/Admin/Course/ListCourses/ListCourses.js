// COMPONENT LIST COURSES
import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { CourseItem } from "../CourseItem";
import { Course } from "../../../../api";
import "./ListCourses.scss";

const courseController = new Course();

export function ListCourses(props) {

    const { reload, onReload } = props;

    //State to store all courses:
    const [courses, setCourses] = useState(false);
    // Initial Page State
    const [page, setPage] = useState(1)
    // Storing in a state pagination properties: limit, page, pages and total.
    const [pagination, setPagination] = useState()

    useEffect(() => {
        (async () => {
            try {
                // Petition to get courses
                const response = await courseController.getCourses({ page, limit: 5 });
                setCourses(response.docs) // To store only the courses and not the pagination as well.
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total
                })
            } catch (error) {
                console.error(error);
            }
        })()
    }, [page, reload]); //when page value changes all renders.

    // Function change page
    const changePage = (_, data) => {
        setPage(data.activePage) // Telling what page to render.
    }

    //If courses does not obtain any course return loader (spinner)
    if (!courses) return <Loader active inline="centered" />
    //Message to be returned if there are no courses
    if (size(courses) === 0) return "There are no courses"

    return (
        <div className='list-courses'>
            {/*Rendering all courses and each one is rendered inside CourseItem component*/}
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} onReload={onReload} />
            ))}

            <div className='list-courses__pagination'>
                <Pagination
                    totalPages={pagination.pages}
                    defaultActivePage={pagination.page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    onPageChange={changePage}
                />
            </div>
        </div>
    )
}
