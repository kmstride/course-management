import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useSingleCourseByIdQuery,
  useUpdateCourseByIdMutation,
} from "../../../feature/courseApi";
import { useEffect, useState } from "react";
import Loading from "../../../components/shared/Loading";
import { toast } from "react-toastify";

function EditCourse() {
  const [inputData, setInputData] = useState({
    title: "",
    price: "",
    photo: "",
    description: "",
  });
  const { id } = useParams();
  const { isLoading, isSuccess, isError, error, data } =
    useSingleCourseByIdQuery(id);
  const [
    updateCourse,
    { isLoading: successLoading, isSuccess: successUpdate, data: updateData },
  ] = useUpdateCourseByIdMutation();
  const handleChange = (event) => {
    setInputData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateCourse({data: inputData, id: data?._id})
  };
  useEffect(() => {
    if (isSuccess) {
      setInputData(data);
    }
    if (successUpdate) {
      toast.success(updateData?.message);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, data, isError, error, successUpdate, updateData]);
  if (isLoading || successLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-center text-decoration-underline">Edit Course</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Course Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter Course Title"
            onChange={handleChange}
            value={inputData.title}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Course Price"
            onChange={handleChange}
            value={inputData.price}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Thumbnail Link</Form.Label>
          <Form.Control
            type="text"
            name="photo"
            placeholder="thumbnail link"
            onChange={handleChange}
            value={inputData.photo}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            name="description"
            placeholder="Course Description"
            onChange={handleChange}
            value={inputData.description}
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-end">
          <Button type="submit"> Update Course</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditCourse;
