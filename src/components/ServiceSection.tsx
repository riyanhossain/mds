import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import type { ServiceSection } from "sanity.types";
import { urlFor } from "sanity.config";
type Props = {
  serviceSection: ServiceSection;
};
export default function ServiceSection({ serviceSection }: Props) {
  const [maxHeight, setMaxHeight] = React.useState(0);

  useEffect(() => {
    const updateHeights = () => {
      let newMaxHeight = 0;
      const cardContents = document.querySelectorAll(".card-content");
      cardContents.forEach((content) => {
        const height = (content as HTMLElement).offsetHeight;
        if (height > newMaxHeight) newMaxHeight = height;
      });
      setMaxHeight(newMaxHeight);
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  useEffect(() => {
    const cardContents = document.querySelectorAll(".card-content");
    cardContents.forEach((content) => {
      (content as HTMLElement).style.height = `${maxHeight}px`;
    });
    const swiperSlides = document.querySelectorAll(
      ".swiper-2 .swiper-slide img"
    );
    swiperSlides.forEach((slide) => {
      (slide as HTMLElement).style.height = `${maxHeight}px`;
    });
  }, [maxHeight]);

  return (
    <section id={serviceSection.sectionId} className="bg-background">
      <div className="pt-[70px] md:pt-[120px] main-container">
        <h1 className="text-h1-m lg:text-h1 max-w-[818px] mx-auto text-center">
          <span className="text-primary">
            {serviceSection.heading?.headlineColorText}
          </span>
          {serviceSection.heading?.headlineNormalText}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 lg:gap-6 mt-9 md:mt-14">
          {serviceSection.cards?.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden bg-placeholder grid grid-cols-1 sm:grid-cols-5 gap-6 md:gap-7 group"
            >
              <div className="p-7 md:p-9 sm:col-span-3 max-h-max card-content">
                <h4 className="text-button-m md:text-button text-primary">
                  {card.title}
                </h4>
                <p className="text-middle-m md:text-middle mt-2.5">
                  {card.description}
                </p>
              </div>
              <div className="sm:col-span-2 relative">
                <Swiper
                  modules={[Pagination]}
                  pagination={{
                    el: `.swiper-2-pagination-${index}`,
                    clickable: true,
                  }}
                  className="swiper-2 h-full"
                >
                  {card.images?.map((image, idx) => (
                    <SwiperSlide key={idx} className="overflow-hidden h-full">
                      <img
                        src={urlFor(image).url()}
                        alt="slide image"
                        className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div
                  className={`swiper-2-pagination-${index} absolute inset-x-0 bottom-3 flex items-center justify-center gap-1 z-20`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
