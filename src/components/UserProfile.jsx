import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as userServices from "../services/user";
import { toast } from "react-toastify";
import { CirclesSpinner } from "./Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { logOut } from "../redux/user/userSlice";
import MasonryLayout from "./MasonryLayout";

// get random banner
const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technogoly,car,game";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.user);
  currentUser = currentUser?.user;
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  // const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("unfollow");
  //fetch user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userServices.getUserDetails(userId);
        if (!data.success) {
          toast.error(data.message);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        toast.error(error.message);
        throw new Error(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const activeBtnStyles =
    "bg-emerald-600  text-white font-bold p-2 rounded-full min-w-[110px] outline-none dark:text-slate-200";
  const notActiveBtnStyles =
    "border-slate-400 border text-black font-bold p-2 rounded-full min-w-[110px] outline-none dark:text-slate-200";

  if (!user) {
    return <CirclesSpinner message="Loading profile ..." />;
  }

  return (
    <div className="container relative h-full items-center justify-center pb-2 dark:text-slate-200">
      <div className="flex flex-col pb-5">
        <div className="relative mb-7 flex flex-col">
          {/* BANNER, AVATAR AND LOGOUT BUTTON */}
          <div className="mt-5 flex flex-col items-center justify-center">
            <img
              src={randomImage}
              className="h-[300px] w-full rounded-lg object-cover shadow-lg md:h-[400px] "
              alt="banner"
            />
            <img
              src={user.avatar}
              alt="avatar"
              className="-mt-10 h-20 w-20 rounded-full shadow-2xl shadow-black dark:shadow-emerald-600"
            />
            <h1 className="mt-5 text-center text-3xl font-bold md:text-5xl">
              {user.name}
            </h1>
            <div className="z-1 absolute right-5 top-10 p-2">
              {currentUser?._id === userId && (
                <button
                  className="rounded-lg border-red-400 bg-red-400  p-2 text-white transition-all duration-300 ease-in-out hover:bg-red-600"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout size={30} />
                </button>
              )}
            </div>
          </div>
          {/* USER INFO */}
          <div className="my-5 text-center">
            <button
              type="button"
              onClick={() => setActiveBtn("follow")}
              className={`${
                activeBtn === "follow" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Follow
            </button>
            <button
              type="button"
              onClick={() => setActiveBtn("unfollow")}
              className={`${
                activeBtn === "unfollow" ? activeBtnStyles : notActiveBtnStyles
              } ml-2`}
            >
              Unfollow
            </button>
          </div>
          {/* SHOW ALL PHOTOS OF THIS USER */}
          {user?.images ? <MasonryLayout images={user.images}/> : <div>dont have photo</div>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
