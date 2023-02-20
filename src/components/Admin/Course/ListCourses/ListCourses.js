// COMPONENT LIST COURSES
import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { CourseItem } from "../CourseItem";
import { Course } from "../../../../api";

const courseController = new Course();

export function ListCourses() {

    //State to store all courses:
    const [courses, setCourses] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                // Petition to get courses
                const response = await courseController.getCourses();
                setCourses(response.docs) // To store only the courses and not the pagination as well.
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    //If courses does not obtain any course return loader (spinner)
    if (!courses) return <Loader active inline="centered" />
    //Message to be returned if there are no courses
    if (size(courses) === 0) return "There are no courses"

    return (
        <div>
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} />
            ))}

            <div>
                {/*Pagination to be added*/}
            </div>
        </div>
    )
}
