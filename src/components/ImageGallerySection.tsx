import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { ImageGallerySection } from "@/types/sanity";
import { urlFor } from "sanity.config";
type Props = ImageGallerySection;
export default function ImageGallerySection({ sectionId, images }: Props) {
  return (
    <section id={sectionId} className="bg-background">
      <div className="pt-[70px] md:pt-[120px] max-w-[1440px] mx-auto">
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          speed={1000}
          spaceBetween={10}
          navigation={{
            prevEl: ".gallary-prev-btn",
            nextEl: ".gallary-next-btn",
            disabledClass: "cursor-not-allowed opacity-50",
          }}
          className="!pl-2 !pr-20"
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index} className="max-w-max">
              <div className="h-[220px] w-auto max-w-max rounded-md overflow-hidden group">
                <img
                  src={urlFor(image).url()}
                  alt={image._type + index}
                  className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
                  height={220}
                  width={300}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="main-container flex items-center gap-2.5 relative mt-10 md:mt-14">
          <button className="gallary-prev-btn cursor-pointer">
            <img
              src="/icons/arrow-left.svg"
              alt="left arrow"
              className="w-2.5 h-auto object-contain"
            />
          </button>
          <div className="flex-1 h-0.5 w-full rounded-full bg-white/30"></div>
          <button className="gallary-next-btn cursor-pointer">
            <img
              src="/icons/arrow-left.svg"
              alt="left arrow"
              className="w-2.5 h-auto object-contain rotate-180"
            />
          </button>
          <div className="size-3 rounded-full bg-white absolute inset-x-0 mx-auto"></div>
        </div>
      </div>
    </section>
  );
}
