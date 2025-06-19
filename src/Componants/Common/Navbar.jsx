import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaMoon, FaSun } from 'react-icons/fa';
import Logo from "../../assets/Logo.png"
import { toggleTheme } from '../../Redux/Slices/ThemeSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const theme = useSelector((state) => state.theam.mode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="flex justify-between items-center px-5 py-2 bg-[#f5f7fa] dark:bg-gray-800 border-b-2">
      {/* Logo */}
      <img
        src={Logo}
        alt="logo"
        onClick={()=>navigate("/")}
        className="rounded-full cursor-pointer h-[60px] w-[60px] object-contain
        "
      />

      <button
        onClick={handleToggleTheme}
        className="text-gray-800 dark:text-white transition-colors duration-300"
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? <FaMoon size={22} /> : <FaSun size={22} color="yellow" />}
      </button>
    </nav>
  );
}

export default Navbar;
