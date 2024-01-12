import { Link } from "react-router-dom";
import { MdDownloadForOffline, MdDelete } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import * as imageService from "../../services/image";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageCard = ({ image }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(image);
  const { currentUser } = useSelector((state) => state.user);
  const user = currentUser?.user;
  const [postHovered, setPostHovered] = useState(false);
  const publicAt = imageService.formatShortCreatedDate(currentImage.createdAt);
  // download the image
  const downloadImage = async (e) => {
    e.stopPropagation();
    saveAs(currentImage.url, `tn-img-${currentImage._id}`);
    //update total download
    const data = await imageService.imageSaved(user._id, currentImage._id);
    setCurrentImage(data);
  };
  return (
    <div className="mx-2 mb-10 flex flex-col items-center justify-center">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        className={`relative w-auto cursor-zoom-in overflow-hidden rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg`}
      >
        <LazyLoadImage
          loading="lazy"
          effect="blur"
          src={currentImage.url}
          alt={currentImage.name}
          className={`${
            postHovered ? "scale-[1.2] object-center" : ""
          } w-full rounded-lg transition-all duration-300 ease-in-out hover:scale-150`}
        />

        {postHovered && (
          <div
            className="absolute top-0 z-20 flex h-full w-full flex-col justify-between bg-black/50"
            onClick={() => navigate(`/images/${currentImage._id}`)}
          >
            <div className="ml-2 mr-2 mt-2 flex items-center justify-between text-white">
              <MdDownloadForOffline
                onClick={downloadImage}
                size={32}
                className="opacity-70 outline-none transition-all duration-150 ease-in hover:ml-1 hover:scale-125 hover:opacity-100"
              />
              <div className="flex items-center justify-center rounded-lg bg-red-500 px-2 py-1 opacity-70 transition-all duration-150 ease-in hover:mr-2 hover:scale-125 hover:opacity-100">
                <button type="button" className="text-[12px]">
                  Downloads: {currentImage.saved.length}
                </button>
              </div>
            </div>
            {/* show img source */}
            <div className="flex items-center justify-between gap-2 text-white">
              <a
                href={currentImage.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-tr-lg bg-white py-1 opacity-70 hover:animate-full-width hover:rounded-none hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center gap-2 px-2 text-black">
                    <BsFillArrowUpRightCircleFill className="outline-none" />
                    <p className="text-sm">url</p>
                  </div>
                </div>
              </a>
              {/* show delete button if user = uploader photo */}
              {user?._id === currentImage.addBy._id && (
                <div className="flex items-center justify-center rounded-full bg-white p-1 text-red-700 opacity-70 transition-all duration-150 ease-in hover:scale-[1.5] hover:opacity-100">
                  <MdDelete />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* uploader's name */}
      <div></div>
      <div className="mt-2 flex w-full items-center justify-between">
        <Link
          to={`/user/${image.addBy._id}`}
          className="flex items-center gap-2 hover:text-emerald-600"
        >
          <LazyLoadImage
            effect="blur"
            src={image.addBy.avatar}
            referrerPolicy="no-referrer"
            alt="user's photo"
            className="h-6 w-6 rounded-full"
          />
          <p className="text-sm">{image.addBy.name}</p>
        </Link>
        {publicAt && (
          <p className="text-[10px] italic text-slate-500">{publicAt}</p>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
