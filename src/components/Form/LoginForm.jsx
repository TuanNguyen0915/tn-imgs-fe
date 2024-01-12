import { useState } from "react";
import * as authService from "../../services/auth";
import { toast } from "react-toastify";
import {
  logInFailure,
  logInStart,
  logInSuccess,
} from "../../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(logInStart());
      const data = await authService.login(formData);
      if (!data.success) {
        dispatch(logInFailure(data.message));
        toast.error(data.message);
      } else {
        dispatch(logInSuccess(data));
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(logInFailure(error));
      toast.error(error.message);
    }
  };

  return (
    <div className="flex w-[300px] flex-col items-center justify-center">
      
      <div>
        <form
          className="mt-2 flex w-[300px] flex-col items-center justify-center gap-2 rounded-lg" //bg-white/20 p-4 backdrop-blur-lg
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email"
            autoComplete="off"
            required
            className="w-full rounded-md p-2 opacity-80 outline-none hover:opacity-100 focus:opacity-100 "
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            autoComplete="off"
            required
            className="w-full rounded-md p-2 opacity-80 outline-none hover:opacity-100 focus:opacity-100 "
            onChange={handleChange}
          />
          <button className="w-full rounded-md bg-slate-600 p-2 text-white hover:bg-slate-400">
            {loading ? <p>Loading</p> : <p>Login</p>}
          </button>
        </form>
      </div>
      {/* } */}
    </div>
  );
};

export default LoginForm;
