import googleIcon from "../../assets/google-icon.png";
import { app } from "../../utils/firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import * as AuthService from "../../services/auth";
import {toast} from 'react-toastify'
import { logInFailure, logInStart, logInSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const GoogleLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.user)

  const handleOAuth = async () => {
    try {
      dispatch(logInStart())
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const formData = {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };
      const data = await AuthService.Auth(formData);
      if(!data.success){
        dispatch(logInFailure(data))
        toast.error(data.message)
      } else {
        dispatch(logInSuccess(data))
        toast.success(data.message)
        navigate('/')
      }
    } catch (error) {
      dispatch(logInFailure(error))
      toast.error(error.message)
      throw new Error(error);
    }
  };

  return (
    <div>
      <button
        className="flex h-[50px] w-[300px] items-center justify-between gap-2 rounded-lg bg-white/20 backdrop-blur-md px-4 py-2 shadow-2xl"
        onClick={handleOAuth}
      >
        <img
          src={googleIcon}
          alt="google icon"
          className="flex h-full items-center justify-center object-contain"
        />
        <p className="w-full text-white">{loading?'Loading...':'Continue with Google'}</p>
      </button>
    </div>
  );
};

export default GoogleLogin;
