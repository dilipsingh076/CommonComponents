import React, { useState, useEffect } from "react";

interface CarouselProps {
  children: React.ReactNode;
  slidesToShow?: number;
  variant?: "default" | "disabled";
  initialActiveIndex?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesToShow = 1,
  variant,
  initialActiveIndex = 0,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const slidesArray = React.Children.toArray(children);
  const totalPages = Math.ceil(slidesArray.length / slidesToShow);

  useEffect(() => {
    if (variant === "disabled") {return;};
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages, slidesToShow, variant]);

  const handlePageChange = (index: number) => setActiveIndex(index);

  return (
    <div className={`overflow-hidden rounded-lg w-full  ${className}`}>
      <div className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${activeIndex * (100 / slidesToShow)}%)`,
          // width: `${100 * slidesArray.length / slidesToShow}%`,
        }}
      >
        {slidesArray.map((slide, index) => (
          <div
            key={index}
            className=" w-full flex-shrink-0 p-2"
            style={{ width: `${100 / slidesToShow}%` }}
          >
            {slide}
          </div>
        ))}
      </div>
      {/* Carousel dots */}
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            disabled={variant === "disabled"}
            className={`w-2 h-2 rounded-full transition-all
              ${variant === "disabled" ? "bg-gray-300 opacity-50 cursor-not-allowed" : ""}
              ${activeIndex === index ? "bg-blue-600" : "bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
