import s from "./CarsSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./CarsSection.css";
import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { AnimatedHeading } from "../AnimatedText/AnimatedText";
import { API_URL } from "../../App";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TourType } from "../ActualToursSection/ActualToursSection";
import { useTranslation } from "react-i18next";

interface CarModel {
  hl_input_model_name: string;
}
export interface Car {
  id: number;
  title: { rendered: string };
  load_image_text_more: string;
  save_data_text: CarModel[];
}

const fetchCars = async (): Promise<Car[]> => {
  const { data } = await axios.get(`${API_URL}wp-json/wp/v2/cars`);
  return data;
};

export const CarsSection = ({ tourCars }: { tourCars?: TourType }) => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = (index: number) => {
    setIsAnimating(true);

    setTimeout(() => {
      setActiveSlide(index);
      setIsAnimating(false);
    }, 700);
  };

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });

  const { t } = useTranslation();

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <section id="cars" className={`${s.section} carSection`}>
      <div className={s.titleContainer}>
        <h2 className={tourCars ? s.tourCars : ""}>
          <AnimatedHeading
            text={
              tourCars
                ? t("Рекомендуемые машины для тура")
                : t("50+ Автомобилей в автопарке Impulse")
            }
          />
        </h2>

        {tourCars ? (
          <p>
            {t(
              "Хотите другую машину? При оформлении заявки скажите нам про свои предпочтения и мы подберём автомобиль специально для вас"
            )}
          </p>
        ) : (
          <p>
            {t(
              "Мы позаботились о том, чтобы у нас были машины на любой вкус: от стремительных суперкаров до элегантных премиум-седанов"
            )}
          </p>
        )}
      </div>

      <div className={s.sliderWrapper}>
        <div className={s.swiperController}>
          <div ref={prevRef} className={s.btn}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.0222 31.8507L23.9648 30.9081L9.52884 16.4721C9.40218 16.3454 9.33418 16.1787 9.33418 16.0001C9.33418 15.8214 9.40351 15.6547 9.52884 15.5281L23.9648 1.09208L23.0222 0.149414L8.58618 14.5854C8.20885 14.9627 8.00084 15.4654 8.00084 16.0001C8.00084 16.5347 8.20885 17.0361 8.58618 17.4147L23.0222 31.8507Z"
                fill="white"
              />
            </svg>
          </div>

          <div ref={nextRef} className={s.btn}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.97782 31.8507L8.03516 30.9081L22.4712 16.4721C22.5978 16.3454 22.6658 16.1787 22.6658 16.0001C22.6658 15.8214 22.5965 15.6547 22.4712 15.5281L8.03516 1.09208L8.97782 0.149414L23.4138 14.5854C23.7912 14.9627 23.9992 15.4654 23.9992 16.0001C23.9992 16.5347 23.7912 17.0361 23.4138 17.4147L8.97782 31.8507Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <svg
          className={s.circle}
          viewBox="0 0 1128 398"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1127.5 199C1127.5 226.269 1111.84 252.318 1083.36 276.076C1054.88 299.832 1013.64 321.248 962.642 339.243C860.644 375.231 719.703 397.5 564 397.5C408.297 397.5 267.356 375.231 165.358 339.243C114.357 321.248 73.1197 299.832 44.6422 276.076C16.1619 252.318 0.5 226.269 0.5 199C0.5 171.731 16.1619 145.682 44.6422 121.924C73.1197 98.1683 114.357 76.7523 165.358 58.7573C267.356 22.7687 408.297 0.5 564 0.5C719.703 0.5 860.644 22.7687 962.642 58.7573C1013.64 76.7523 1054.88 98.1683 1083.36 121.924C1111.84 145.682 1127.5 171.731 1127.5 199Z"
            stroke="url(#paint0_linear_1653_306)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1653_306"
              x1="564"
              y1="429.519"
              x2="564"
              y2="142.143"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0.4" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <Swiper
          className={s.swiper}
          spaceBetween={50}
          slidesPerView={3}
          centeredSlides={true}
          loop={true} // ✅ додай це
          grabCursor={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 1000,
            modifier: 1,
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          modules={[Navigation]}
          onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
          onInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
        >
          {data.map((car, index) => (
            <SwiperSlide key={index} className={s.carItem}>
              <img src={car.load_image_text_more} alt={car.title.rendered} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={`${s.carInfo} ${isAnimating ? s.hidden : ""}`}>
          <h3>{data[activeSlide]?.title.rendered}</h3>

          <ul className={s.modelsList}>
            {data[activeSlide]?.save_data_text?.map((model, index) => (
              <li key={index}>{model.hl_input_model_name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
