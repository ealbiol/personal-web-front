import React, { useState, useEffect } from 'react';
import { Container, Image, Button } from "semantic-ui-react";
import { map } from "lodash";
import { Course as CourseController } from "../../../api";
import { image } from "../../../assets";
import { Course } from "../../../components/Web/Courses"
import "./Courses.scss";

const courseController = new CourseController();

export function Courses() {

  const [courses, setCourses] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  // Function to see whether we are in last page to hide load more button
  // Here we are checking if the current page is the last one by comparing (pagination.pages meaning the total of pages therefore the last one)
  // It gives us back true.
  const isCurrentLastPage = pagination?.page === pagination?.pages

  // In console and page /courses
  //console.log(courses);

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({ page, limit: 9 });
        setPagination({
          page: response.page,
          pages: response.pages
        })

        //Get more pages below instead of only replacing
        if (!courses) setCourses(response.docs)
        // we get the current value of courses (...courses) and we add the new value as well (...response.docs)
        else setCourses([...courses, ...response.docs])

      } catch (error) {
        console.error(error);
      }
    })()
  }, [page])

  const loadMore = () => {
    setPage((prevState) => prevState + 1)
  }

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
            <Course course={course} />
          </div>
        ))}
      </div>

      {/*Conditional stating that as long as page is not the last one we show button*/}
      {!isCurrentLastPage &&
        <div className='more'>
          <Button primary onClick={loadMore}>
            See more...
          </Button>
        </div>
      }

    </Container>
  )
}
