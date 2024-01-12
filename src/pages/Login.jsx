import { Link } from "react-router-dom";
import loginVideo from "../assets/login-register.mp4";
import whiteLogo from "../assets/white-logo.png";
import GoogleLogin from "../components/Form/GoogleLogin";
import LoginForm from "../components/Form/LoginForm";


const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="relative h-full w-full">
        <video
          src={loginVideo}
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
          <h1 className="text-white text-2xl">OR</h1>
          <LoginForm />
          <h1 className="text-lg font-semibold text-white">
            No account ?{" "}
            <Link
              to="/register"
              className="text-emerald-400 hover:uppercase hover:text-white transition-all duration-500 ease-in-out"
            >
              Create one
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
