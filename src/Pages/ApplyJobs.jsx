import React, { useState } from 'react';
import Button from '../Componants/Common/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import errorsMessage from "../Messages"

function ApplyJobForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
  });
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [savedApplications, setSavedApplications] = useState([]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = errorsMessage.nameError ;
    }

    if (!formData.email.trim()) {
      newErrors.email = errorsMessage.emailError;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = errorsMessage.invalidEmail;
    }

    if (formData.resume) {
      const isPdf = formData.resume.type === 'application/pdf';
      const isSizeValid = formData.resume.size <= 5 * 1024 * 1024;

      if (!isPdf) {
        newErrors.resume = errorsMessage.fileError
      } else if (!isSizeValid) {
        newErrors.resume = errorsMessage.fileSizeError;
      }
    } else {
      newErrors.resume = errorsMessage.resumeError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const newApp = {
        ...formData,
        resumeName: formData.resume.name,
      };

      const updatedApplications = [...savedApplications, newApp];
      setSavedApplications(updatedApplications);
      localStorage.setItem("ApplicantData", JSON.stringify(updatedApplications));
      
       toast.success("Application submitted successfully!")
      setFormData({ name: '', email: '', phone: '', resume: null });
      setErrors({});
      navigate("/")
    }
  };

  return (
  <section className='bg-[#f5f7fa] dark:bg-gray-800 h-[100vh] '>
      <div className="max-w-xl mx-auto mb-6  p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Apply for this Job</h2>

      

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone (optional)</label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resume (PDF, max 5MB) *</label>
          <input
            type="file"
            name="resume"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none"
          />
          {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume}</p>}
        </div>

        <Button
          type="submit"
          onSubmit={handleSubmit}
          className="w-auto bg-green hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Apply Now
        </Button>
      </form>
    </div>
  </section>
  );
}

export default ApplyJobForm;
