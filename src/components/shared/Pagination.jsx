import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const MyPagination = ({ count, size, currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState(0);
  useEffect(() => {
    setPages(Math.ceil(count / size));
  }, [size, count]);
  const pageNumbers = [...Array(pages).keys()];
  const nextPage = () => {
    if (currentPage !== pages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };
  return (
    <div>
      <Pagination>
        {/* <Pagination.First /> */}
        <Pagination.Prev onClick={prevPage} />
        {pageNumbers.map((page) => (
          <Pagination.Item
            active={currentPage === page}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page+1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} />
        {/* <Pagination.Last /> */}
      </Pagination>
      
    </div>
  );
};

export default MyPagination;
