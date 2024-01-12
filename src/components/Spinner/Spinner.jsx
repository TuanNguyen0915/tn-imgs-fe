import { ThreeDots, Circles } from "react-loader-spinner";

export const ThreeDotsSpinner = ({ message, w, h, color }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ThreeDots
        height={`${h ? h : "80"}`}
        width={`${w ? w : "80"}`}
        color={`${color ? color : "#4fa94d"}`}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />

      {message && <p className="px-2 text-center text-lg">{message}</p>}
    </div>
  );
};

export const CirclesSpinner = ({ message }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Circles
        visible={true}
        height={50}
        width={50}
        color="#16a34a"
        ariaLabel="three-circles-loading"
        className="m-5"
      />

      {message && <p className="mt-10 px-2 text-center text-lg">{message}</p>}
    </div>
  );
};
