import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ onChangeSelection, options, isMultiple, className, placeholder, value }) => {
  const handleChange = (selected) => {
    if (onChangeSelection) {
      onChangeSelection(selected);
    }
  };

  return (
    <Select
      className={` text-green
        w-full sm:w-1/2 md:w-1/3 lg:w-[31%] ${className} text-lg font-figtree  rounded-lg`}
      options={options}
      isMulti={isMultiple}
      placeholder={placeholder}
      value={value} 
      onChange={handleChange}
    />
  );
};

export default MultiSelect;
