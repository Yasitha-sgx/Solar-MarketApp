import { useState, useRef, useEffect } from "react";
import { BsDot } from "react-icons/bs";

const BrandCarousel = ({ partnersData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(partnersData.length / 4);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const touchActive = useRef(false);

  // Interval for automatic slide change
  const slideInterval = useRef(null);

  useEffect(() => {
    // Start interval when component mounts
    startSlideInterval();

    // Clean up interval when component unmounts
    return () => {
      clearInterval(slideInterval.current);
    };
  }, [currentSlide]);

  const startSlideInterval = () => {
    // Clear previous interval to prevent overlapping
    clearInterval(slideInterval.current);
    // Set new interval to change slide every 5 seconds
    slideInterval.current = setInterval(() => {
      // Go to the next slide after a delay of 2 seconds
      setTimeout(() => {
        const nextSlide =
          currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
      }, 2000); // Delay before changing slide (2 seconds)
    }, 5000); // Change slide every 5 seconds
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
    // Restart the interval when the user manually changes slide
    startSlideInterval();
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchActive.current = true;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const diff = touchEndX.current - touchStartX.current;
      if (diff > 50) {
        // Swipe right, navigate to previous slide
        const prevSlide =
          currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        setCurrentSlide(prevSlide);
      } else if (diff < -50) {
        // Swipe left, navigate to next slide
        const nextSlide =
          currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(nextSlide);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    touchActive.current = false;
  };

  const renderSlides = () => {
    const startIndex = currentSlide * 4;
    const endIndex = Math.min(startIndex + 4, partnersData.length);

    return partnersData.slice(startIndex, endIndex).map((item) => (
      <div key={item.id} className="slide-item">
        <img
          src={item.image}
          alt={`Brand ${item.id}`}
          className="w-[239px] h-[76px]"
        />
      </div>
    ));
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-[#ffffff] border-[1px] p-5 rounded-se-[64px] rounded-[8px] overflow-hidden relative">
        <div className="grid grid-cols-1 gap-8 justify-items-center sm:grid-cols-2 md:grid-cols-4">
          {renderSlides()}
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 text-[30px] text-[#D9D9D9]">
        {[...Array(totalSlides).keys()].map((index) => (
          <BsDot
            key={index}
            className={`mx-1 cursor-pointer ${
              index === currentSlide && !touchActive.current
                ? "text-[#E45416]"
                : "hover:text-[#E45416]"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;
