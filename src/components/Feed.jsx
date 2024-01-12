import { useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";
import { CirclesSpinner } from "./Spinner/Spinner";
import { useEffect, useState } from "react";
import * as imageServices from "../services/image";
import { useDispatch } from "react-redux";
import {getAllImages} from '../redux/image/allImagesSlice'

const Feed = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (categoryId === undefined) {
      const fetchData = async () => {
        const allData = await imageServices.allImages();
        //shuffle all images every render
        allData.data = allData.data.sort(()=> 0.5 - Math.random())
        setImages(allData.data);
        dispatch(getAllImages(allData.data))
      };
      fetchData();
      setLoading(false);
    } else {
      const fetchData = async () => {
        const allData = await imageServices.getImagesByCategory(categoryId);
        setImages(allData.data);
      };
      fetchData();
      setLoading(false);
    }
  },[categoryId, dispatch]);

  return (
    <div className="container">
      {loading ? (
        <div className="mt-10">
          <CirclesSpinner message="We are adding new idea for your feed" />
        </div>
      ) : (
        <div>
          {images.length !== 0 ? (
            <MasonryLayout images={images} />
          ) : (
            <div className="flex h-[600px] w-full items-center justify-center">
              <CirclesSpinner
                message={`We are adding new idea for ${categoryId?.toUpperCase()}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
