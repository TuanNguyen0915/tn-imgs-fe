import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";

//NAVBAR
const NavBar = ({ searchTerm, setSearchTerm }) => {
  const {currentUser} = useSelector(state => state.user)
  const user = currentUser?.user
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <div className="mt-5 flex w-full items-center gap-2 pb-7 md:gap-5 dark:bg-slate-900 dark:text-gray-100">
      <div className="flex h-10 w-full items-center justify-start gap-4 rounded-md border-none bg-white p-2 shadow-sm outline-none focus-within:shadow-lg md:h-12">
        <IoMdSearch fontSize={20} className="ml-2" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => navigate("/search")}
          className="w-full outline-none"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden w-12 md:flex">
          <Link to={`user/${user._id}`}>
            <img
              src={user?.avatar}
              alt="user's avatar"
              referrerPolicy="no-referrer"
              className="w-full rounded-full object-cover"
            />
          </Link>
        </div>
        <Link
          to={`/images/upload-image`}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-300 text-white md:h-12 md:w-12"
        >
          <IoMdAdd fontSize={24} />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
