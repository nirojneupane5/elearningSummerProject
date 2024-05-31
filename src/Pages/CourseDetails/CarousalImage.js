import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import img1 from '../../image carousal/mern.png';
import img2 from '../../image carousal/java.png'
import img3 from '../../image carousal/javascript.jpg'

const CarousalImage = () => {
  const [index, setIndex] = useState(0);

  // Define the slides
  const slides = [
    {
      id: 1,
      image: img1,
      
    },
    {
      id: 2,
      image: img2,
      
    },
    {
      id: 3,
      image: img3,
     
    },
  ];

  useEffect(() => {
    // Set an interval to auto-slide every 3 seconds
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // 3 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  const imageStyle = {
    maxHeight: '250px', // Adjust the height as needed
  };

  return (
    <Carousel activeIndex={index} onSelect={() => {}}>
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={`Slide ${slide.id}`} style={imageStyle}
          />
          <Carousel.Caption>
            <h3>{slide.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarousalImage;
