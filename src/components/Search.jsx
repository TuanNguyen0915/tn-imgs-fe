import { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";
import { CirclesSpinner } from "./Spinner/Spinner";
import {allImages}  from '../services/image'

const Search = ({ searchTerm }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null)
  
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const fetchData = async () => {
        const data = await allImages()
        const selectedImages = data.data.filter(image => {
          if (image.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return image
          } else {
            setLoading(false)
          }
        })
        setImages(selectedImages)
      }
      fetchData()
    } 
    else {
      setLoading(false);
    }
  }, [searchTerm]);

  return (
    <div className="dark:text-slate-200">
      {loading && <CirclesSpinner message="Searching pins" />}
      {images?.length !== 0 && <MasonryLayout images={images && images} />}
      {images?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Images Found!</div>
      )}
    </div>
  );
};

export default Search;
