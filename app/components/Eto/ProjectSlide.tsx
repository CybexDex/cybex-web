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
      <div
        style={{ width: "100%", paddingTop: "51.11%", position: "relative" }}
        // style={{ height: "460px", width: "100%", paddingTop: "51.11%" }}
        // key={project.projectLink}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Slider {...settings}>
            {slides.map(project => (
              <img style={{ width: "100%" }} src={project.imgUrl} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
