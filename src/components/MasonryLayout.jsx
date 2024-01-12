import Masonry from "react-masonry-css";
import ImageCard from "./Images/ImageCard";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ images }) => {
  return (
    <Masonry
      className="my-5 flex animate-slide-fwd md:mt-10 dark:text-slate-200"
      breakpointCols={breakpointObj}
    >
      {images?.map((image) => (
        <ImageCard key={image._id} image={image} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
