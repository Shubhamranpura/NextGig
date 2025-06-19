import { FaSearch } from "react-icons/fa";

const SearchBar = ({searchItem,setSearchItem }) => {
  return (
    <div className="flex items-center font-figtree w-full sm:w-1/2 md:w-[30%] lg:w-[35%] px-3 py-2 border rounded-lg bg-white focus:outline-2 border-gray-300 shadow-sm ">
      <FaSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        value={searchItem}
        onChange={(e)=>setSearchItem(e.target.value)}
        placeholder="Search job title or category"
        className="w-full text-[20px] font-semibold bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchBar;
