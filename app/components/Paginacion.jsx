import React from 'react'

const Paginacion = ({pageNum, page, handlePageChange}) => {
    
  return (
    <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`rounded px-4 py-2 hover:bg-blue-500 ${
              page === pageNum
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {pageNum}
          </button>
  )
}

export default Paginacion