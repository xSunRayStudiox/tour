import { useState } from 'react';

const usePagination = (data = [], itemsPerPage = 10) => {
   const [currentPage, setCurrentPage] = useState(1);

   const totalPages = Math.ceil(data.length / itemsPerPage);

   const currentItems = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
   );

   const goToPage = (page) => {
      if (page >= 1 && page <= totalPages) {
         setCurrentPage(page);
      }
   };

   const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
   };

   const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
   };

   return {
      currentPage,
      totalPages,
      currentItems,
      goToPage,
      nextPage,
      prevPage,
      setCurrentPage,
   };
};

export default usePagination;
