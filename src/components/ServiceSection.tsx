import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const cards = [
  {
    title: "Reinigungen",
    description:
      "Treppenhäuser, Fenster und Photo-Voltaik-Anlagen — Lassen Sie Ihre Immobilie in neuem Licht erstrahlen.",
    images: [
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
      "/images/6.jpg",
    ],
  },
  {
    title: "Instandhaltung und Reparaturen",
    description:
      "Unkomplizierte Reparatur und laufende Pflege für Langlebigkeit und Funktionalität.",
    images: [
      "/images/3.jpg",
      "/images/1.jpg",
      "/images/5.jpg",
      "/images/2.jpg",
      "/images/6.jpg",
      "/images/4.jpg",
    ],
  },
  {
    title: "Carports, Wintergarten und Möbel",
    description:
      "Manchmal sind es kreative Details, die Ihre Immobilie erst abrunden. Lassen Sie Ihren Ideen freien Lauf.",
    images: [
      "/images/5.jpg",
      "/images/4.jpg",
      "/images/1.jpg",
      "/images/6.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
    ],
  },
  {
    title: "Sonstiger Betrieb Ihrer Immobilie",
    description:
      "Vom Rolldienst über Winterdienst bis zum Wechsel von Leuchtmitteln unterstützen wir Sie beim reibungslosen Betrieb Ihrer Immobilie",
    images: [
      "/images/6.jpg",
      "/images/3.jpg",
      "/images/2.jpg",
      "/images/5.jpg",
      "/images/1.jpg",
      "/images/4.jpg",
    ],
  },
];

const ServisSection = () => {
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
    <section id="service" className="bg-background">
      <div className="pt-[70px] md:pt-[120px] main-container">
        <h1 className="text-h1-m lg:text-h1 max-w-[818px] mx-auto text-center">
          <span className="text-primary">Alles ist sauber</span>, funktional und
          gut geölt
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 lg:gap-6 mt-9 md:mt-14">
          {cards.map((card, index) => (
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
                  {card.images.map((image, idx) => (
                    <SwiperSlide key={idx} className="overflow-hidden h-full">
                      <img
                        src={image}
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
};

export default ServisSection;
