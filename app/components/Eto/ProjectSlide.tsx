import * as React from "react";
import { EtoProject } from "../../services/eto";
import * as ReactSwipe from "react-swipe";

import Slider from "react-slick";

export const ProjectSlide = ({
  slides
}: {
  slides: EtoProject.SelectedBanner[];
}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        // charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Slider {...settings}>
        {slides.map(project => (
          <div key={project.projectLink}>
            <img src={project.imgUrl} />
          </div>
        ))}
      </Slider>
    </>
  );
};
