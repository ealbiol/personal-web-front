import React, { useState, useEffect } from 'react';
import { Container, Image, Button } from "semantic-ui-react";
import { map } from "lodash";
import { Course } from "../../../api";
import { image } from "../../../assets";
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
    <Container className='courses-page'>
      <Image src={image.AcademyLogo} />
      <h2>
        In this website you can find the best online developer
        courses. Join and start your career as a fronted or backed.
      </h2>

      <div className='courses'>
        {map(courses, (course) => (
          <div key={course._id} className='courses__item'>
            <span>{course.title}</span>
          </div>
        ))}

      </div>

      <div className='more'>
        <Button primary>
          Load more...
        </Button>
      </div>
    </Container>
  )
}
