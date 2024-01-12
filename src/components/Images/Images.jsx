import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar, Feed, Search } from "..";
import UploadImg from "../../pages/UploadImg";
import ImageDetails from "../../pages/ImageDetails";
const Images = ({theme,setTheme}) => {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          theme={theme}
          setTheme={setTheme}
        />
      </div>
      <div className="h-full ">
        <Routes>
          <Route path="/*" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/images/:imageId"
            element={<ImageDetails />}
          />
          <Route path="/images/upload-image" element={<UploadImg />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Images;
