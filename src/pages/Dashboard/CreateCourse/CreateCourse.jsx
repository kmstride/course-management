import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCreateCourseMutation } from "../../../feature/courseApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/shared/Loading";

function CreateCourse() {
  const [createCourse, { isLoading, isSuccess, data, isError, error }] =
    useCreateCourseMutation();
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const photo = event.target.photo.value;
    const price = event.target.price.value;
    createCourse({ title, photo, description, price });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, error, data]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-center text-decoration-underline">Create Course</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Course Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter Course Title"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Course Price"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Thumbnail Link</Form.Label>
          <Form.Control
            type="text"
            name="photo"
            placeholder="thumbnail link"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course Description</Form.Label>
          <Form.Control
            name="description"
            placeholder="Course Description"
            as="textarea"
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-end">
          <Button type="submit"> Create Course</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateCourse;
