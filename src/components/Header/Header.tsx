import s from "./Header.module.css";
import { SiteLogo } from "../SiteLogo/SiteLogo";
import { Layout } from "../Layout/Layout";
import { useWindowSize } from "../../hooks/useWindowSize";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAnchorsByPage } from "../../utils/anchorsByPage";

interface HeaderProps {
  openConsult: () => void;
  toggleMenuPopup: () => void;
  menuIsOpen: boolean;
}

export const Header: FC<HeaderProps> = ({
  openConsult,
  toggleMenuPopup,
  menuIsOpen,
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;
  const { t } = useTranslation();
  const [showHeader, setShowHeader] = useState(true);

  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (menuIsOpen) {
        setShowHeader(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setScrolled(currentScrollY > 200);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuIsOpen]);

  useEffect(() => {
    if (menuIsOpen) {
      setScrolled(false);
    }
  }, [menuIsOpen]);

  useEffect(() => {
    if (menuIsOpen) {
      setScrolled(false);
    } else {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
  }, [menuIsOpen]);

  const basePath = pathname.startsWith("/tour/") ? "/tour" : pathname;

  const anchorsByPage = useAnchorsByPage();
  const navLinks = anchorsByPage[basePath] || [];

  const navigate = useNavigate();

  const handleAnchorRedirect = (href: string) => {
    const id = href.replace("/#", "").replace("#", "");
    const isHome = pathname !== "/actual-tours";
    const isActualTours = pathname === "/actual-tours";

    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else if (isActualTours) {
      navigate("/");

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  return (
    <header
      className={`${s.header} ${showHeader ? s.show : s.hide} ${
        scrolled ? s.scrolled : ""
      } ${pathname === "/contact" ? s.static : ""}`}
    >
      <Layout>
        <div className={s.headerContainer}>
          {!isMobile && navLinks.length > 0 && (
            <nav>
              <ul className={`${s.headerNavList} ${menuIsOpen && s.opacity}`}>
                {navLinks.map(({ label, href }, index) => (
                  <li key={index}>
                    {label === "Оставить заявку" ? (
                      <button type="button" onClick={openConsult}>
                        {label}
                      </button>
                    ) : (
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAnchorRedirect(href);
                        }}
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <Link
            to="/"
            className={`${s.headerLogoContainer} ${isMobile && s.mobile}`}
          >
            <SiteLogo fill="white" />
            <div className={s.logoTitle}>
              <h4>IMPULSE</h4>
              <p>
                <span></span>
                Sports car tours
                <span></span>
              </p>
            </div>
          </Link>

          <div className={s.headerRightContainer}>
            {!isMobile && (
              <div className={s.langController}>
                <div
                  onClick={() => changeLanguage("ru")}
                  className={i18n.language === "ru" ? s.active : ""}
                >
                  RU
                </div>
                <div
                  onClick={() => changeLanguage("en")}
                  className={i18n.language === "en" ? s.active : ""}
                >
                  EN
                </div>
              </div>
            )}

            <div className={s.contactContainer}>
              {!isMobile && (
                <div onClick={openConsult} className={s.contactWithUs}>
                  <span>{t("Оставить заявку")}</span>
                  <svg
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1340_1830)">
                      <path d="M14.25 0.75H3.75C2.7558 0.751191 1.80267 1.14666 1.09966 1.84966C0.396661 2.55267 0.00119089 3.5058 0 4.5L0 13.5C0.00119089 14.4942 0.396661 15.4473 1.09966 16.1503C1.80267 16.8533 2.7558 17.2488 3.75 17.25H14.25C15.2442 17.2488 16.1973 16.8533 16.9003 16.1503C17.6033 15.4473 17.9988 14.4942 18 13.5V4.5C17.9988 3.5058 17.6033 2.55267 16.9003 1.84966C16.1973 1.14666 15.2442 0.751191 14.25 0.75ZM3.75 2.25H14.25C14.6991 2.25088 15.1376 2.38614 15.5092 2.63835C15.8808 2.89057 16.1684 3.24821 16.335 3.66525L10.5915 9.4095C10.1688 9.83048 9.59656 10.0669 9 10.0669C8.40344 10.0669 7.83118 9.83048 7.4085 9.4095L1.665 3.66525C1.83161 3.24821 2.11921 2.89057 2.49079 2.63835C2.86236 2.38614 3.30091 2.25088 3.75 2.25ZM14.25 15.75H3.75C3.15326 15.75 2.58097 15.5129 2.15901 15.091C1.73705 14.669 1.5 14.0967 1.5 13.5V5.625L6.348 10.47C7.05197 11.1722 8.00569 11.5665 9 11.5665C9.99431 11.5665 10.948 11.1722 11.652 10.47L16.5 5.625V13.5C16.5 14.0967 16.2629 14.669 15.841 15.091C15.419 15.5129 14.8467 15.75 14.25 15.75Z" />
                    </g>
                    <defs>
                      <clipPath id="clip0_1340_1830">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              )}

              <div
                onClick={toggleMenuPopup}
                className={`${s.menuBtn} ${menuIsOpen && s.active}`}
              >
                <div>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </header>
  );
};
