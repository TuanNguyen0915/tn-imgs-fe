import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { ThreeDotsSpinner } from "../Spinner/Spinner";
//components
import { CirclesSpinner } from "../Spinner/Spinner";
import UploadImageForm from "../Form/UploadImageForm";
import { uploadToCloudinary } from "../../services/uploadToCloudinary";

const UploadImage = ({ user }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadDone, setUploadDone] = useState(false);
  const [image, setImage] = useState(null);

  const handleChooseImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleDeleteImg = () => {
    setPreviewImage(null);
    setImageUrl(null);
    setUploadDone(false);
    setLoading(false);
  };

  const handleUploadImage = async () => {
    setLoading(true);
    try {
      const uploadedImage = await uploadToCloudinary(image);
      setImageUrl(uploadedImage.url);
      setUploadDone(true);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="container flex w-full items-center justify-center">
        <div className="flex w-full items-center justify-center rounded-xl bg-gray-400/20 p-3 md:w-4/5">
          <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-md border-2 border-dotted border-gray-400 p-3 md:h-[500px]">
            {!previewImage ? (
              <label className="flex cursor-pointer flex-col items-center justify-center">
                <FaImage size={40} className="text-emerald-600/80" />
                <p className="text-lg">Click to upload</p>
                <p className="mt-8 text-center text-xs text-slate-400 md:text-sm">
                  Use high-quality JPG, JPEG, SVG, PNG, or GIF less than 10 MB
                </p>
                <input
                  type="file"
                  name="upload-image"
                  accept="image/png, image/jpg, image/jpeg, image/svg, image/gif"
                  onChange={handleChooseImage}
                  hidden
                />
              </label>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative mt-8 h-[200px] w-[200px] rounded-lg md:h-[300px] md:w-[300px]">
                  <img
                    src={previewImage}
                    alt="preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  {/* DELETE BUTTON */}
                  <div className="absolute top-0 z-20 flex h-full w-full items-end justify-end rounded-lg p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 md:h-10 md:w-10">
                      <MdDelete
                        size={25}
                        className="text-[#b00000] opacity-70 hover:opacity-100"
                        onClick={handleDeleteImg}
                      />
                    </div>
                  </div>
                </div>

                <button
                  disabled={uploadDone}
                  className="btn"
                  onClick={handleUploadImage}
                >
                  {uploadDone ? (
                    "Upload Done"
                  ) : loading ? (
                    <ThreeDotsSpinner w={100} h={30} color={"#cccccc"} />
                  ) : (
                    <p className="flex items-center gap-2">
                      <FaCloudUploadAlt /> Upload
                    </p>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* UPLOAD FORM */}
      {loading && (
        <div className={`${loading ? "flex" : "hidden"} animate-slide-in`}>
          <UploadImageForm user={user} imageUrl={imageUrl} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
