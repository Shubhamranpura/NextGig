import React from 'react'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Componants/Common/Navbar'
import JobDetais from './Pages/JobDetais'
import { useSelector } from 'react-redux'
import ApplyJobs from './Pages/ApplyJobs'
import { Bounce, ToastContainer } from 'react-toastify'


const Layout = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/job/:id" element={<JobDetais />} />
      <Route path="/apply/:id" element={<ApplyJobs/>} />

      {/* <Route path='*' element={<Pagenotfound />} /> */}

    </Routes>
  )
}

function App() {
  const theme = useSelector((state) => state.theam.mode);
  return (
    <div className={`${theme === "dark" ? "dark" : ""}`} >
      <BrowserRouter>
        <Navbar />
        <Layout />
        <ToastContainer draggable autoClose={500} transition={Bounce}   />
      </BrowserRouter>
    </div>
  )
}

export default App
