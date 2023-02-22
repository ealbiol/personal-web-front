import React, { useState, useEffect } from 'react';
import { Container, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Course } from "../../../api";
import { ENV } from "../../../utils";
import "./HomeCourses.scss";

const courseController = new Course();

export function HomeCourses() {

    // State to store all courses from api
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses({ limit: 6 });
                //console.log(response);
                //Storing courses received from calling function getCourses
                setCourses(response.docs) //Only getting courses and not pagination data.
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    return (
        <Container className='home-courses'>
            <h2>Learn and improve your skills</h2>

            <div className='home-courses__all-courses'>
                {/*Rendering courses*/}
                {map(courses, (course) => (
                    <a key={course._id} href={course.url} target="_blank">
                        <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
                        <div>
                            <span>{course.title}</span>
                            <span>{course.description}</span>
                        </div>
                    </a>
                ))}
            </div>

            <div className='home-courses__more'>
                <Button as={Link} to="/courses" primary>
                    Explore more
                </Button>
            </div>
        </Container>
    )
}
