import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import Button from '../Componants/Common/Button';

function JobDetail() {
  const { state: job } = useLocation();
  const navigate = useNavigate();

  if (!job) {
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
        Job details not available
      </p>
    );
  }

  const handleSubmit = () => {
    navigate(`/apply/${job.id}`)
  }

  return (
    <div className="p-6 max-w-full  bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100  shadow-md">
      <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

      <p className="text-2xl mb-2 font-semibold text-gray-700 dark:text-gray-300">
        {job.company_name}
      </p>

      <p className="mb-2 text-xl">
        <strong>Location:</strong> {job.candidate_required_location}
      </p>

      <p className="mb-2 text-lg">
        <strong>Type:</strong> {job.job_type
          ? job.job_type
            .split(/_|-/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
          : "Not Mentioned"}
      </p>


      <p className="mb-2 text-xl">
        <strong>Salary:</strong> {job.salary || "Not Mentioned"}
      </p>

      <div className="mt-4 text-lg font-figtree text-gray-700 dark:text-gray-200 leading-relaxed">
        {parse(job.description)}
      </div>
      <Button className={'bg-green mt-5 p-4 text-xl rounded-lg hover:bg-gr font-semibold hover:bg-[#9df864]'}
        onSubmit={handleSubmit}
      >Apply Now</Button>
    </div>
  );
}

export default JobDetail;
