import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import logoDark from "../assets/black-logo.png";
import logoLight from "../assets/white-logo.png";

import { categoriesLink } from "../utils/data/data";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoSunny, IoMoon } from "react-icons/io5";

// SIDEBAR
const SideBar = ({ closeToggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  const handleCloseSideBar = () => {
    if (closeToggle) closeToggle(false);
  };
  const [showCategories, setShowCategories] = useState(false);
  const isActiveStyle =
    "flex items-center gap-3 border-r-2 dark:border-r-emerald-600 border-black px-5 font-extrabold uppercase transition-all duration-150 ease-in-out";
  const isNotActiveStyle =
    "text-slate-700/60 flex items-center gap-3 px-5 transition-all duration-150 capitalize ease-in-out hover:text-emerald-600";

  const [theme, setTheme] = useState('dark');
  const element = document.documentElement;
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        break;
      case "light":
        element.classList.remove("dark");
        break;
      default:
        break;
    }
  }, [element.classList, theme]);

  return (
    <div className="flex h-full min-w-[300px] flex-col justify-between gap-5 overflow-y-auto bg-white dark:bg-slate-500 dark:text-slate-200">
      <div>
        <div className="flex items-center">
          {/* SET THEME */}
          <div className="relative z-50 ml-4 flex items-center rounded-md border border-slate-300 py-2 text-xl">
            <div
              className={`${
                theme === "dark"
                  ? " rounder-s-md right-0"
                  : "rounder-e-md left-0 border"
              } z-100 absolute h-full w-1/2 border-slate-300 bg-slate-300 duration-1000 ease-linear`}
            ></div>
            <IoSunny
              // className={`${theme === "" ? "text-sky-600" : ""} mx-2`}
              className="mx-2 text-yellow-300"
              onClick={() => setTheme("light")}
            />
            <IoMoon
              // className={`${theme === "dark" ? "text-sky-600" : ""} mx-2`}
              className="mx-2 text-violet-800"
              onClick={() => setTheme("dark")}
            />
          </div>
          <div className="ml-4 flex w-full items-center justify-between">
            {/* LOGO */}
            <Link
              to="/"
              className="my-6 flex w-[190px] items-center gap-2 px-5 pt-1"
              onClick={handleCloseSideBar}
            >
              {theme === "dark" ? (
                <img src={logoLight} alt="logo" className="w-full" />
              ) : (
                <img src={logoDark} alt="logo" className="w-full" />
              )}
            </Link>
          </div>
        </div>
        {/* NAV LINK */}
        <div className="mt-10 flex flex-col gap-5 ">
          <NavLink
            to="/"
            className={(navClass) =>
              navClass.isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSideBar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <div
            className="flex items-center gap-1"
            onClick={() => setShowCategories(!showCategories)}
          >
            <h3 className="mt-2 px-5 text-base hover:text-emerald-600 2xl:text-xl">
              Discover categories
            </h3>

            {!showCategories ? (
              <IoIosArrowDown fontSize={14} className="translate-y-1" />
            ) : (
              ""
            )}
          </div>
          {showCategories && (
            <div className="animate-slide-in ">
              {categoriesLink.map((category) => (
                <div
                  key={category.name}
                  className="mb-1 flex items-center gap-2 pl-10"
                >
                  <NavLink
                    to={`/category/${category.name}`}
                    className={(navClass) =>
                      navClass.isActive ? isActiveStyle : isNotActiveStyle
                    }
                    onClick={handleCloseSideBar}
                  >
                    <p className="hover:text-emerald-600 dark:text-slate-200">
                      {category.name}
                    </p>
                  </NavLink>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {user ? (
        <Link
          to={`user/${user._id}`}
          className="mx-3 mb-10 flex items-center gap-2 rounded-lg border border-slate-300 p-2 shadow-lg dark:border-slate-200 dark:shadow-emerald-700"
          onClick={handleCloseSideBar}
        >
          <img
            src={user?.avatar}
            alt="user's avatar"
            className="h-10 w-10 rounded-full"
          />
          <p>{user.name}</p>
        </Link>
      ) : (
        <div className="mb-[10rem] flex w-full flex-col items-center justify-center gap-2 px-2 md:mb-10">
          <p>Please </p>
          <Link
            to="/login"
            className="font-semibold uppercase text-emerald-600 hover:text-slate-400"
          >
            Login
          </Link>
          <p>to use full functionality</p>
        </div>
      )}
    </div>
  );
};

export default SideBar;
