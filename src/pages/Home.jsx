import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import logo from "../assets/black-logo.png";
import Images from "../components/Images/Images";
import UserProfile from "../components/UserProfile";
import { Route, Routes } from "react-router-dom";

const Home = () => {

  const scrollRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  const [toggleSidebar, setToggleSidebar] = useState(false);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);


  return (
    <div className="dark:text-gray-100 flex h-screen flex-col bg-gray-50 duration-100 ease-out md:flex-row dark:bg-slate-900">
      {/* DESKTOP VIEW */}
      <div className="hidden h-screen md:flex">
        <SideBar user={user && user} />
      </div>
      {/* MOBILE VIEW */}
      <div className="flex flex-row md:hidden">
        <div className="flex w-full flex-row items-center justify-between p-2 shadow-lg">
          <HiMenu
            fontSize={40}
            className="cursor-pointer dark:text-slate-200"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-[80px]" />
          </Link>
          {user && (
            <Link to={`user/${user._id}`}>
              <img
                src={user.avatar}
                alt="user-pic"
                className="mr-4 h-9 w-9 rounded-full"
              />
            </Link>
          )}
        </div>
        {toggleSidebar && (
          <div className="fixed z-10 h-screen w-4/5 animate-slide-in overflow-y-auto bg-white shadow-md">
            <div className="absolute flex w-full items-center justify-end p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer dark:text-slate-200"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <SideBar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="h-screen flex-1 overflow-y-scroll pb-2" ref={scrollRef}>
        <Routes>
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route
            path="/*"
            element={
              <Images user={user && user} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
