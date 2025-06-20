import React, { useEffect, useState } from 'react';
import { IoEarthSharp } from 'react-icons/io5';
import { PiBuildingOffice } from 'react-icons/pi';
import Pagination from '../../Componants/Common/Pagination';
import { useNavigate } from 'react-router-dom';

function JobList({ location, jobType, searchItem, publishedTime, jobData, loading }) {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [debouncedResult, setDebouncedResult] = useState(searchItem);
  const [page, setPage] = useState(1);
  const jobsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedResult(searchItem);
    }, 900);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    let finalJobData = jobData;

    if (location) {
      finalJobData = finalJobData.filter(job =>
        location === job.candidate_required_location ||
        job.candidate_required_location.includes(location)
      );
    }

    if (jobType) {
      finalJobData = finalJobData.filter(job => jobType === job.job_type);
    }

    if (publishedTime) {
      finalJobData = finalJobData.filter(job => publishedTime.trim() === job.dateCategory.trim());
    }

    if (debouncedResult) {
      const keyword = debouncedResult.toLowerCase().trim();
      finalJobData = finalJobData.filter(job =>
        job.title.toLowerCase().includes(keyword) ||
        job.category.toLowerCase().includes(keyword)
      );
    }

    setFilteredJobs(finalJobData);
    setPage(1)
  }, [location, jobType, debouncedResult, publishedTime, jobData]);

  const handleCardClick = (job) => {
    navigate(`/job/${job.id}`, { state: job });
  };

  if (loading) {
    return (
      <h1 className='font-figtree text-center text-2xl font-semibold'>
        Loading ...
      </h1>
    );
  }

  if (!jobData || jobData.length === 0) {
    return (
      <h1 className='font-figtree text-center text-md font-semibold'>
        No Jobs Available
      </h1>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <h1 className="font-figtree text-center text-md font-semibold">
        No Jobs Found ...
      </h1>
    );
  }


  return (
    <div className="px-4 sm:px-6 lg:px-4 py-4">
      {filteredJobs.length > 0 && (
        <section>
          <p className="text-lg font-semibold mb-4">{filteredJobs.length} Job Results</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage).map((job) => (
              <li
                key={job.id}
                onClick={() => handleCardClick(job)}
                className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg transition duration-300 bg-white dark:bg-gray-800 cursor-pointer"
              >
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{job.title}</h3>

                <p className="font-semibold text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2 mb-1">
                  <PiBuildingOffice className="text-indigo-600" size={20} />
                  <span>{job.company_name}</span>
                </p>

                <p className="font-semibold text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2 mb-1">
                  <IoEarthSharp className="text-blue-500" size={20} />
                  <span>{job.candidate_required_location}</span>
                </p>

                <p className="text-sm text-orange-700 bg-orange-100 dark:bg-orange-200 dark:text-orange-900 font-medium rounded-md px-2 py-1 inline-block w-max mt-2">
                  • {job.timeAgo}
                </p>

                {job.tags.length >= 1 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 text-md font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-lg font-bold text-gray-500 dark:text-white mt-1">
                  Salary : {job.salary || "Not Mentioned"}
                </p>

              </li>
            ))}
          </ul>

        </section>
      )}
      <Pagination
        filteredJobs={filteredJobs}
        jobsPerPage={jobsPerPage}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default JobList;
