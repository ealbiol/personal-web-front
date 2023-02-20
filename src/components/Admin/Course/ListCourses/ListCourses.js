// COMPONENT LIST COURSES
import React, { useState, useEffect } from 'react';
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

    return (
        <div>
            <h2>List Courses</h2>
        </div>
    )
}
