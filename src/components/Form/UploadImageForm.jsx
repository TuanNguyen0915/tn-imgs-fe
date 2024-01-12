import { categoriesLink } from "../../utils/data/data";
import { ThreeDotsSpinner } from '../Spinner/Spinner'
import {useState } from "react";
import { uploadImaged } from "../../services/image";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UploadImageForm = ({ imageUrl }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [errMess, setErrMess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    decs: "",
    category: "",
  });
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await uploadImaged(formData,imageUrl, user.token);
      if (!data.success) {
        setErrMess(data.message);
        toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrMess(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="container mt-4 flex w-full justify-center dark:text-slate-200">
      <div className="container flex w-full justify-center md:w-4/5">
        <form
          className="flex w-full flex-col items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Add your title here"
            className="w-full rounded-lg bg-gray-400/20 px-4 py-1 opacity-80 outline-none focus-within:opacity-100 focus:shadow-md"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="decs"
            value={formData.decs}
            placeholder="Add some description"
            className="w-full rounded-lg bg-gray-400/20 px-4 py-1 opacity-80 outline-none focus-within:opacity-100 focus:shadow-md"
            onChange={handleChange}
          />
          <div className="flex w-full items-center justify-between">
            <p className="w-full font-semibold">Choose image category</p>
            <select
              name="category"
              onChange={handleChange}
              className={`${
                formData.category !== "other" ? "text-emerald-600" : ""
              } w-full rounded-lg bg-gray-400/20 px-4 py-1 font-bold  opacity-80 outline-none focus-within:opacity-100 focus:shadow-md`}
            >
              <option value="other">Select Category</option>
              {categoriesLink.map((category) => (
                <option key={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <button
            disabled={loading}
            className={`btn uppercase ${
              loading ? "border-none bg-transparent" : ""
            }`}
          >
            {loading ? (
              <div className="flex w-full">
                <ThreeDotsSpinner w={100} h={40} />
              </div>
            ) : (
              "Update information"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadImageForm;
