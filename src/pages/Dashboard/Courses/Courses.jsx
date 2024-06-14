import { useEffect, useState } from "react";
import CourseCard from "../../../components/Courses/CourseCard";
import Loading from "../../../components/shared/Loading";
import { useCourseByUserQuery } from "../../../feature/courseApi";

function Courses() {
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(4);
  const { isLoading, isError, data, error } = useCourseByUserQuery({
    page: currentPage,
    size,
  });
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {data?.length > 0 ? (
        data?.map((course) => <CourseCard key={course._id} course={course} />)
      ) : (
        <p>No Course Found!</p>
      )}
    </div>
  );
}

export default Courses;
