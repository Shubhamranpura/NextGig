import { useSelector } from "react-redux";
import HeaderImg from "../assets/headerImg.jpg";
import JobSearch from "../Features/Jobs/JobSearch";

function Home() {
  const theme = useSelector((state) => state.theam.mode);

  return (
    <div >
      <div className="w-full bg-[#f5f7fa]  text-black dark:bg-black dark:text-white">
        <section className="font-figtree overflow-hidden">
          <header className="mx-auto flex flex-col-reverse md:flex-row justify-between gap-x-2">
            <div className="w-full py-12 md:w-[60%] text-center md:text-left mx-2 ">
              <h1 className="text-3xl md:text-5xl font-bold text-[#111827] dark:text-white  leading-tight mb-4">
                Find your dream job
              </h1>
              <p className="font-base md:text-lg text-gray-700 dark:text-gray-300">
                Looking for jobs? Browse our latest job openings to view & apply to the best jobs today!
              </p>
            </div>

            <div className="w-full md:w-1/2  flex justify-center md:justify-end ">

              <img
                src={HeaderImg}
                alt="theme-img"
                className="w-full max-w-md dark:invert rounded-lg mt-2"
              />

            </div>
          </header>
        </section>

        <JobSearch />
      </div>
    </div>
  );
}

export default Home;
