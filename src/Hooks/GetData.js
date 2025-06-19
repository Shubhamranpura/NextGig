import { useEffect, useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://remotive.com/api"
});

const useJobData = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get("/remote-jobs?limit=150");
        const allJobs = response.data.jobs;
        const now = new Date();

        const filterPublishedJob = allJobs.map((job) => {
          const jobDate = new Date(job.publication_date);
          const diff = now - jobDate;
          //  console.log(diff)
          const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

          let timeAgo = ''
          if (diffInDays === 1) {
            timeAgo = '1 day ago'
          } else if (diffInDays < 30) {
            timeAgo = `${diffInDays} days ago`;
          } else {
            const months = Math.floor(diffInDays / 30);
            timeAgo = months === 1 ? '1 month ago' : `${months} months ago`
          }

          let dateCategory = 'All Dates';
          if (diffInDays === 0) {
            dateCategory = 'Today';
          } else if (diffInDays <= 7) {
            dateCategory = 'Last 7 Days';
          } else if (diffInDays <= 30) {
            dateCategory = 'Last 30 Days';
          }

          return {
            ...job,
            timeAgo,
            dateCategory
          };
        });

        setJobData(filterPublishedJob);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { jobData, loading, error };
};

export default useJobData;
