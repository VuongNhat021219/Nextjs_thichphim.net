import React, { useRef, useEffect } from "react";
import Image from "next/image";
import MovieCSS from "@/styles/_movie.module.scss";
import Link from "next/link";

export default function Movie(props) {
  const movies = props.movie;
  const pathImages = props.pathImages;
  const headingRef1 = useRef(null);
  const headingRef2 = useRef(null);

  useEffect(() => {
    if (headingRef1.current) {
      const headingValue = headingRef1.current.textContent;
      const scrollTextClassName = headingValue.length > 15 ? "scroll-text" : "";
      if (scrollTextClassName) {
        headingRef1.current.classList.add(scrollTextClassName);
      }
    }
    if (headingRef2.current) {
      const headingValue = headingRef2.current.textContent;
      const scrollTextClassName = headingValue.length > 15 ? "scroll-text" : "";
      if (scrollTextClassName) {
        headingRef2.current.classList.add(scrollTextClassName);
      }
    }
  }, []);
  console.log(movies);
  return (
    <>
      <Link href={`/${movies.slug}`}>
        <div
          className={MovieCSS.bp__list}
          style={{ transform: `translateX(${props.rowSide}px)` }}
        >
          <div
            className={`${MovieCSS.bp__list___img} ${
              props.PhimMoiCSS === undefined
                ? ""
                : props.PhimMoiCSS.bp__list___img
            }`}
          >
            <Image
              src={`${pathImages}${movies.thumb_url}`}
              alt={movies.name}
              width={300}
              height={300}
            />
          </div>
          <div className={`${MovieCSS.bp__list___title} `}>
            <div
              className={`${MovieCSS.bp__list___title___EN} ${MovieCSS.scroll___container}`}
            >
              <h1
                className={`${
                  props.PhimMoiCSS === undefined
                    ? ""
                    : props.PhimMoiCSS.movie_bp__list___title___h1
                }`}
                ref={headingRef1}
              >
                {movies.origin_name}
              </h1>
            </div>
            <div
              className={`${MovieCSS.bp__list___title___VN} ${MovieCSS.scroll___container}`}
            >
              <h1
                className={`${
                  props.PhimMoiCSS === undefined
                    ? ""
                    : props.PhimMoiCSS.movie_bp__list___title___h1
                }`}
                ref={headingRef2}
              >
                {movies.name}
              </h1>
            </div>
          </div>
          <div className={MovieCSS.bp__list___ribbon}>
            <div className={MovieCSS.bp__list___ribbon___action}>
              {/* {movies.quality} */} Phụ đề
            </div>
            {/* <div className={MovieCSS.bp__list___ribbon___action}>
              {movies.lang}
            </div> */}
            <div className={MovieCSS.bp__list___ribbon___action}>
              {movies.year}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
