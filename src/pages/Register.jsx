import registerVideo from "../assets/register_video.mp4";
import whiteLogo from "../assets/white-logo.png";
import GoogleLogin from "../components/Form/GoogleLogin";
import RegisterForm from "../components/Form/RegisterForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="relative h-full w-full">
        <video
          src={registerVideo}
          type="video/mp4"
          loop
          muted
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-2 bg-blackCover">
          <div className="h-[300px] w-[300px]">
            <img src={whiteLogo} alt="logo" className="w-full scale-125" />
          </div>
          <GoogleLogin />
          <RegisterForm />
          <h1 className="text-lg font-semibold text-white">
            Do you have account ?
            <Link
              to="/login"
              className="text-emerald-400 transition-all duration-500 ease-in-out hover:uppercase hover:text-white"
            >
              Log in
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
