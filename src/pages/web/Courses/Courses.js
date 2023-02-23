import React, { useState, useEffect } from 'react';
import { Course } from "../../../api";
import "./Courses.scss";

const courseController = new Course();

export function Courses() {

  const [courses, setCourses] = useState(null);

  // In console and page /courses
  //console.log(courses);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses();
        setCourses(response.docs)

      } catch (error) {
        console.error(error);
      }
    })()
  }, [])

  return (
    <div>
      <h1>We are in Courses</h1>
    </div>
  )
}
