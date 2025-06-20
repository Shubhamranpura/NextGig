import React, { useState } from 'react';
import MultiSelect from '../../Componants/Common/MultiSelect';
import { dateFilterOptions, jobTypeOptions, locationOptions } from '../../SelectOptions';
import SearchBar from '../../Componants/Common/SearchBar';
import useJobData from '../../Hooks/GetData';
// import Button from './Common/Button';
import { useSelector } from 'react-redux';
import JobList from './JobList';

const JobSearch = () => {
  // Fetch data (you can use jobData if needed)
  // useJobData();

  const theme = useSelector((state) => state.theam.mode);
  const { jobData , loading } = useJobData()


  const [selectedLocation, setSelectedLocation] = useState({ value: '', label: 'All Locations' });
  const [location, setLocation] = useState();

  const [selectedJobType, setSelectedJobType] = useState({ value: '', label: 'All Job Types' });
  const [jobType, setJobType] = useState();

  const [selectedPublishedTime, setSelectedPublishedTime] = useState({ value: '', label: 'All Dates' });
  const [publishedTime, setPublishedTime] = useState();

  const handleLocationChange = (selected) => {
    setSelectedLocation(selected);
    setLocation(selected.value);
  };

  const [searchItem, setSearchItem] = useState("")

  const handleJobTypeChange = (selected) => {
    setSelectedJobType(selected);
    setJobType(selected.value);
  };

  const handlePublishedTime = (selected) => {
    setSelectedPublishedTime(selected);
    setPublishedTime(selected.value);
  };



  const handleRefresh = () => {
    setSelectedLocation({ value: '', label: 'All Locations' });
    setSelectedJobType({ value: '', label: 'All Job Types' });
    setSelectedPublishedTime({ value: '', label: 'All Dates' });
    setLocation('');
    setJobType('');
    setSearchItem("")
    setPublishedTime('');
  };


  return (
    <section className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="dark:bg-gray-800 dark:text-white bg-white text-black p-4">
        <p
          className="m-2 w-[50%] lg:w-[10%] text-lg font-semibold font-figtree hover:underline text-red-700 dark:text-red-400 cursor-pointer"
          onClick={handleRefresh}
        >
          Clear All Filter
        </p>

        <div className="flex flex-col md:flex-row gap-2 w-full p-2 flex-wrap">
          <MultiSelect
            className="w-[20%] text-lg"
            options={locationOptions}
            isMultiple={false}
            placeholder="Search Job Location"
            value={selectedLocation}
            onChangeSelection={handleLocationChange}
          />

          <SearchBar searchItem={searchItem} setSearchItem={setSearchItem} />

          <MultiSelect
            className="w-[20%] text-lg"
            options={jobTypeOptions}
            isMultiple={false}
            placeholder="Search Job Type"
            value={selectedJobType}
            onChangeSelection={handleJobTypeChange}
          />

          <MultiSelect
            className="w-[20%] text-lg"
            options={dateFilterOptions}
            isMultiple={false}
            placeholder="Search Latest Jobs In"
            value={selectedPublishedTime}
            onChangeSelection={handlePublishedTime}
          />
        </div>
      </div>

      <JobList location={location} jobType={jobType} searchItem={searchItem} publishedTime={publishedTime} loading={loading}  jobData={jobData} />

    </section>
  );
};

export default JobSearch;
