import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { formatCreatedDate } from "../../services/image";
import { useState } from "react";
import { getImagesByCategory } from "../../services/image";
import { CirclesSpinner } from "../Spinner/Spinner";
import MasonryLayout from "../MasonryLayout";
import { FaArrowDown } from "react-icons/fa";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const ImageDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentImage } = useSelector((state) => state.image);
  const [imagesByCate, setImagesByCate] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const publicAt = formatCreatedDate(currentImage?.createdAt);
  const handleClickShowMore = async () => {
    try {
      let orgData = await getImagesByCategory(currentImage.category);
      //Use filter to get data without currentImage
      let data = orgData.data.filter((image) => {
        return image._id !== currentImage._id;
      });
      //Get 5 newest and order by newest

      if (data.length > 5) data = data.slice(5);
      if (data.length > 1) data = [...data.data].reverse();
      setImagesByCate(data);
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="dark:text-slate-200">
      {currentImage && (
        <div
          className={`${
            currentUser ? "" : "mt-10"
          } container flex w-full flex-col items-center gap-5 overflow-y-auto md:flex-row md:gap-1`}
        >
          <div className="flex w-full items-center justify-center rounded-lg mr-5 pb-5">
            <img
              src={currentImage.url}
              alt={currentImage.name}
              className="m-auto max-h-[700px] rounded-lg object-contain shadow-lg shadow-emerald-600"
            />
          </div>
          <div className="container flex flex-col justify-center gap-5 md:gap-8">
            <p className="text-3xl font-extrabold md:text-4xl capitalize">
              {currentImage.title}
            </p>
            <Link
              to={`/category/${currentImage.category}`}
              className="linkText md:text-xl text-base"
            >
              <p className="capitalize">{currentImage.category}</p>
            </Link>
            <a
              href={currentImage.url}
              alt="highest resolution"
              target="_blank"
              rel="noreferrer"
              className="linkText flex items-center gap-2"
            >
              <BsFillArrowUpRightCircleFill /> Highest resolution
            </a>
            <div className="flex flex-col justify-center gap-5 md:flex-row md:items-center md:justify-between">
              <Link
                to={`/user/${currentImage.addBy._id}`}
                className="linkText flex items-center gap-5 font-semibold text-black dark:text-slate-200"
              >
                <img
                  src={currentImage.addBy.avatar}
                  alt="avatar"
                  className="h-8 w-8 rounded-full md:h-12 md:w-12"
                />
                <p>{currentImage.addBy.name}</p>
              </Link>
              <p className="text-right text-sm italic text-slate-500">
                {publicAt}
              </p>
            </div>
            {/* IF USER IS UPLOADER */}
            {currentUser?.user._id === currentImage.addBy._id && (
              <div className="flex items-center justify-between gap-5">
                <button type="button" className="btn">
                  EDIT
                </button>
                <button type="button" className="btn border-red-700 bg-red-700">
                  DELETE
                </button>
              </div>
            )}
            <Comment />
          </div>
        </div>
      )}
      <div className="my-2 mb-5" onClick={() => setShowMore(!showMore)}>
        <p
          className="linkText flex items-center justify-center gap-4"
          onClick={handleClickShowMore}
        >
          More like this <FaArrowDown />
        </p>
        {showMore ? (
          <>
            {imagesByCate.length !== 0 ? (
              <MasonryLayout images={imagesByCate} />
            ) : (
              <div className="mt-5">
                <CirclesSpinner message={"We will update soon"} />
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ImageDetail;
