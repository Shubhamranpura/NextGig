import React from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

function Pagination({ filteredJobs, jobsPerPage, page, setPage }) {
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  if (totalPages <= 1) return null; 
  return (
    <div className="w-full mt-12 flex justify-center">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-2 sm:px-0">
        {/* Previous Button */}
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`p-2 rounded-full transition ${
            page === 1
              ? 'opacity-0 cursor-default'
              : 'bg-gray-300 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500'
          }`}
        >
          <FaCaretLeft size={20} />
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 min-w-[40px] text-sm rounded-lg transition font-medium text-center sm:text-center ${
              page === i + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 hover:bg-indigo-400 hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-indigo-500'
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`p-2 rounded-full transition ${
            page === totalPages
              ? 'opacity-0 cursor-default'
              : 'bg-gray-300 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500'
          }`}
        >
          <FaCaretRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
