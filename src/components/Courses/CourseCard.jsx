/* eslint-disable react/prop-types */
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDeleteCourseMutation } from "../../feature/courseApi";
import { useEffect } from "react";
import Loading from "../shared/Loading";
import { toast } from 'react-toastify';

function CourseCard({ course }) {
  const [deleteCourse, { isLoading, isSuccess, data, isError, error }] =
    useDeleteCourseMutation();
  useEffect(() => {
    if(isSuccess){
      toast.success(data?.message)
    }
    if (isError) {
      console.log(error);
    }
  }, [isError, error, isSuccess, data]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={course?.photo} alt={course?.title} />
        <Card.Body>
          <Card.Title>{course?.title}</Card.Title>
          <Card.Text>
            {course?.description?.length > 50
              ? course?.description?.slice(0, 50)
              : course?.description}
          </Card.Text>
          <Link
            className="btn btn-primary"
            to={`/dashboard/edit-courses/${course?._id}`}
          >
            Edit
          </Link>{" "}
          <Button variant="danger" onClick={()=>deleteCourse(course?._id)}>Delete</Button>
        </Card.Body>
      </Card>
    </section>
  );
}

export default CourseCard;
