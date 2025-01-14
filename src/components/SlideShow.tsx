import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "@/contexts/AppContext";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const SlideShow = () => {
  const { showToast } = useAppContext();
  const [imageIndex, setImageIndex] = useState(0);

  const { data: slides } = useQuery("fetchSlides", apiClient.fetchSlides, {
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  function nextImage() {
    if (slides.length === 0) return;

    setImageIndex((prevState) => {
      if (prevState === slides.length - 1) {
        return 0;
      }
      return prevState + 1;
    });
  }

  function prevImage() {
    if (slides.length === 0) return;

    setImageIndex((prevState) => {
      if (prevState === 0) {
        return slides.length - 1;
      }
      return prevState - 1;
    });
  }

  useEffect(() => {
    const interval = setInterval(nextImage, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [slides]);

  if (!slides) return <></>;

  return (
    <div className="w-full relative">
      <img
        src={`${slides[imageIndex].imageUrl}`}
        alt={slides[imageIndex].alt}
        className="w-full"
      />
      <div className="flex absolute bottom-10 right-10">
        <a className="px-2 lg:text-2xl cursor-pointer" onClick={nextImage}>
          <FaArrowRight />
        </a>
        <a className="px-2 lg:text-2xl cursor-pointer" onClick={prevImage}>
          <FaArrowLeft />
        </a>
      </div>
    </div>
  );
};

export default SlideShow;
