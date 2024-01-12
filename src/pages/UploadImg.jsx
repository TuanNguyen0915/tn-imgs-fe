import UploadImage from "../components/Images/UploadImage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const UploadImg = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? (
    <UploadImage user={currentUser.user} />
  ) : (
    <Navigate to="/login" />
  );
};

export default UploadImg;
