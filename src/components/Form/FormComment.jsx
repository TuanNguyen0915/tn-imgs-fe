import { useState } from "react";
import { Link } from "react-router-dom";

const CommentForm = ({ handleSubmit, user }) => {
  const [formData, setFormData] = useState({
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = () => {
    // e.preventDefault()
    handleSubmit(formData);
    setFormData({
      content: "",
    });
  };
  if (!user) {
    return (
      <div className="mt-4">
        <h1 className="text-center">
          Please{" "}
          <span>
            <Link to="/login" className="font-bold text-emerald-600">
              log in
            </Link>
          </span>{" "}
          to add new comment
        </h1>
      </div>
    );
  }
  return (
    <form
      className="mt-5 flex w-full flex-col gap-5 md:flex-row md:items-center"
      onSubmit={handleSubmitForm}
    >
      <div className="flex w-full items-center gap-2">
        <img
          src={user.avatar}
          className="h-6 w-6 rounded-full md:h-12 md:w-12 "
        />
        <input
          type="text"
          name="content"
          value={formData.content}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 opacity-70 outline-none focus:opacity-100 focus:shadow-lg dark:text-slate-600"
          placeholder="Add a comment"
          onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center justify-center md:w-1/6">
        <button type="button" className="btn w-1/3 md:w-full" onSubmit={handleSubmitForm}>
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
