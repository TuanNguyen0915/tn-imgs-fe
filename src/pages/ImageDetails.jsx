// npm modules
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// component
import ImageDetail from "../components/Images/ImageDetail";
//image service
import * as imageService from "../services/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchImageStart,
  fetchImageFailure,
  fetchImageSuccess,
} from "../redux/image/imageSlice";

const ImageDetails = () => {
  const dispatch = useDispatch();
  const { imageId } = useParams();
  useEffect(() => {
    const fetchImage = async () => {
      try {
        dispatch(fetchImageStart());
        const res = await imageService.imageDetail(imageId);
        if (!res.success) {
          toast.error(res.message);
          dispatch(fetchImageFailure(res.message));
        } else {
          dispatch(fetchImageSuccess(res.data));
        }
      } catch (error) {
        toast.error(error.message);
        dispatch(fetchImageFailure(error.message));
      }
    };
    fetchImage();
  }, [imageId, dispatch]);

  return (
    <div>
      <ImageDetail />
    </div>
  );
};

export default ImageDetails;
