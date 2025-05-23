import { FC, useState } from "react";
import { motion } from "framer-motion"; // Імпортуємо motion
import s from "./PopupTour.module.css";
import AccordionGroup from "../Accordion/Accordion";
import { Day, yearEditor } from "../ActualToursSection/ActualToursSection";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Layout } from "../Layout/Layout";

interface PopupTourProps {
  info: {
    title: { rendered: string };
    input_desc: string;
    input_date_start: string;
    input_date_end: string;
    save_data_text: Day[];
    coast_booking: string;
    coast_content_11: string;
    coast_content_12: string;
    coast_content_21: string;
    coast_content_22: string;
    coast_title_1: string;
    coast_title_2: string;
    price_include: string[];
    price_uninclude: string[];
    load_image_text_image: string;
  };
  onClose: () => void;
}

export const PopupTour: FC<PopupTourProps> = ({ info, onClose }) => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const [currentDay, setCurrentDay] = useState(0);

  const totalDays = info.save_data_text.length;
  const currentSlide = info.save_data_text[currentDay];

  const handlePrev = () => {
    if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
    }
  };

  const handleNext = () => {
    if (currentDay < totalDays - 1) {
      setCurrentDay(currentDay + 1);
    }
  };

  const arrow = (
    <svg
      className={s.arrow}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.6" clipPath="url(#clip0_1367_719)">
        <path
          d="M7.39999 17V14.6H12.8L5 6.79999L6.79999 5L14.6 12.8V7.40002H17V17H7.39999Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1367_719">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="matrix(1 0 0 -1 5 17)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <motion.div
      data-lenis-prevent
      className={s.popupOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={s.popupContent}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={s.mainInfo}>
          <div className={s.tourInfo}>
            <span>
              {yearEditor(info.input_date_start, info.input_date_end)}
            </span>
            <h3>{info.title.rendered}</h3>

            <p>{info.input_desc}</p>
          </div>

          {isMobile && (
            <button onClick={onClose} className={s.closeBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
                fill="none"
              >
                <path
                  d="M39 39L13 13M39 13L13 39"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {!isMobile && (
            <div className={s.accordionContainer}>
              <AccordionGroup
                items={[
                  {
                    title: "Включено в стоимость",
                    content: (
                      <ul>
                        {info.price_include.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    ),
                  },

                  {
                    title: "Не включено в стоимость",
                    content: (
                      <ul>
                        {info.price_uninclude.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    ),
                  },
                  {
                    title: "маршрут",
                    content: (
                      <div className={s.route}>
                        <img src={info.load_image_text_image} alt="route" />

                        <button>
                          <span>открыть карту</span>
                        </button>
                      </div>
                    ),
                  },
                  {
                    title: "стоимость тура",
                    content: (
                      <div className={s.accordion}>
                        <div className={s.priceAcardon}>
                          <div>
                            <h4>1. {info.coast_title_1}</h4>
                            <ul>
                              <p>- Шеринг спорткара между двумя участниками</p>
                              <p>- Проживание в отеле в двухместном номере</p>
                            </ul>

                            {info.coast_content_11 && (
                              <div className={s.priceBlock}>
                                {arrow}
                                <p>{info.coast_content_11}</p>
                              </div>
                            )}

                            <p className="lg:mb-[0.8vw]  mb-[2.1vw]">
                              Специальная цена при бронировании двух мест сразу
                              (для друзей или пар):
                            </p>

                            {info.coast_content_12 && (
                              <div className={s.priceBlock}>
                                {arrow}
                                <p>{info.coast_content_12}</p>
                              </div>
                            )}
                          </div>

                          <div>
                            <h4>2. {info.coast_title_2}</h4>
                            <ul>
                              <p>- Шеринг спорткара между двумя участниками</p>
                              <p>- Проживание в отеле в двухместном номере</p>
                            </ul>

                            {info.coast_content_21 && (
                              <div className={s.priceBlock}>
                                {arrow}
                                <p>{info.coast_content_21}</p>
                              </div>
                            )}

                            {info.coast_content_22 && (
                              <>
                                <p className="lg:mb-[0.8vw] mb-[2.1vw]">
                                  Специальная цена при бронировании двух мест
                                  сразу (для друзей или пар):
                                </p>

                                <div className={s.priceBlock}>
                                  {arrow}
                                  <p>{info.coast_content_22}</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <p className={s.coastBooking}>* {info.coast_booking}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>

        <div
          className={s.sliderContainer}
          style={{
            backgroundImage: currentSlide
              ? `url(${currentSlide.hl_image_image})`
              : "none",
          }}
        >
          {!isMobile && (
            <button onClick={onClose} className={s.closeBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
                fill="none"
              >
                <path
                  d="M39 39L13 13M39 13L13 39"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div style={{ display: "none" }}>
            {info.save_data_text.map((day, index) => (
              <img
                key={index}
                src={day.hl_image_image}
                alt={`Preload day ${index}`}
              />
            ))}
          </div>

          <div className={s.daysSlider}>
            <div>
              <div className={s.counter}>
                <span className={s.current}>0{currentDay + 1}</span>
                <div></div>
                <span>0{info.save_data_text.length}</span>
              </div>

              <p className={s.date}>
                <span>{currentSlide.hl_input_title}</span>
              </p>

              <div className={s.image}>
                <img src={currentSlide.hl_image_image} alt="image" />
                <div className={s.location}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 9 17"
                    fill="none"
                  >
                    <rect x="4" y="4.5" width="1" height="12" fill="white" />
                    <circle cx="4.5" cy="5" r="4" fill="white" />
                  </svg>
                  {currentSlide.hl_input_way}
                </div>
              </div>

              <p className={s.distance}>{currentSlide.hl_input_distance}</p>

              <p className={s.dayDescription}>
                {currentSlide.hl_input_description}
              </p>
            </div>

            <div className={s.controller}>
              <button onClick={handlePrev} disabled={currentDay === 0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path d="M15.6841 21.5671L16.3125 20.9386L6.6885 11.3146C6.60406 11.2302 6.55872 11.1191 6.55872 11C6.55872 10.8809 6.60495 10.7697 6.6885 10.6853L16.3125 1.06131L15.6841 0.432861L6.06006 10.0569C5.8085 10.3084 5.66983 10.6435 5.66983 11C5.66983 11.3564 5.8085 11.6906 6.06006 11.9431L15.6841 21.5671Z" />
                </svg>
              </button>

              <div className={s.progressBarWrapper}>
                <div
                  className={s.progressBar}
                  style={{ width: `${((currentDay + 1) / totalDays) * 100}%` }}
                ></div>
              </div>

              <button
                onClick={handleNext}
                disabled={currentDay === totalDays - 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path d="M6.31594 21.5671L5.6875 20.9386L15.3115 11.3146C15.3959 11.2302 15.4413 11.1191 15.4413 11C15.4413 10.8809 15.3951 10.7697 15.3115 10.6853L5.6875 1.06131L6.31594 0.432861L15.9399 10.0569C16.1915 10.3084 16.3302 10.6435 16.3302 11C16.3302 11.3564 16.1915 11.6906 15.9399 11.9431L6.31594 21.5671Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobile && (
          <Layout>
            <div className={s.accordionContainer}>
              <AccordionGroup
                items={[
                  {
                    title: "Включено в стоимость",
                    content: (
                      <ul>
                        {info.price_include.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    ),
                  },

                  {
                    title: "Не включено в стоимость",
                    content: (
                      <ul>
                        {info.price_uninclude.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    ),
                  },
                  {
                    title: "маршрут",
                    content: (
                      <div className={s.route}>
                        <img src={info.load_image_text_image} alt="route" />

                        <button>
                          <span>открыть карту</span>
                        </button>
                      </div>
                    ),
                  },
                  {
                    title: "стоимость тура",
                    content: (
                      <div className={s.accordion}>
                        <div className={s.priceAcardon}>
                          <div>
                            <h4>1. {info.coast_title_1}</h4>
                            <ul>
                              <p>- Шеринг спорткара между двумя участниками</p>
                              <p>- Проживание в отеле в двухместном номере</p>
                            </ul>

                            {info.coast_content_11 && (
                              <div className={s.priceBlock}>
                                {arrow}
                                <p>{info.coast_content_11}</p>
                              </div>
                            )}

                            <p className="lg:mb-[0.8vw]  mb-[2.1vw]">
                              Специальная цена при бронировании двух мест сразу
                              (для друзей или пар):
                            </p>

                            {info.coast_content_12 && (
                              <div className={s.priceBlock}>
                                {arrow}
                                <p>{info.coast_content_12}</p>
                              </div>
                            )}
                          </div>

                          <div>
                            <h4>2. {info.coast_title_2}</h4>
                            <ul>
                              <p>- Шеринг спорткара между двумя участниками</p>
                              <p>- Проживание в отеле в двухместном номере</p>
                            </ul>

                            {info.coast_content_21 && (
                              <div className={s.priceBlock}>
                                {arrow}
                                <p>{info.coast_content_21}</p>
                              </div>
                            )}

                            {info.coast_content_22 && (
                              <>
                                <p className="lg:mb-[0.8vw] mb-[2.1vw]">
                                  Специальная цена при бронировании двух мест
                                  сразу (для друзей или пар):
                                </p>

                                <div className={s.priceBlock}>
                                  {arrow}
                                  <p>{info.coast_content_22}</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <p className={s.coastBooking}>* {info.coast_booking}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </Layout>
        )}
      </motion.div>
    </motion.div>
  );
};
