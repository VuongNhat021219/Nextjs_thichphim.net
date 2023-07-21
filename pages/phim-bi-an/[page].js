import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from 'next/image';
import { Container, Row, Col } from "react-bootstrap";
import { BiMoviePlay } from "react-icons/bi";
import styles from "@/styles/_home.module.scss";
import trendMovieCSS from "@/styles/_trendmovie.module.scss";
import MovieList from "@/components/MovieList";
import { getTrendMovieData } from "../api/getData";
import PhimMoiCSS from "@/styles/StylePage/_phimhanhdong.module.scss";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
const PaginationComponent = dynamic(
  () => import("@/components/PaginationComponent"),
  { ssr: false }
);

export default function PhimBiAn({ data, allTrendMovieDatas }) {
  return (
    <div className={`app`}>
      <Layout>
        {data === undefined ? <Loader /> : ""}
        <div
          className={`${styles.home__content} ${
            data === undefined ? "height__400" : ""
          }`}
        >
          <Container
            fluid
            className={styles.home__content___container}
            style={{ backgroundColor: "var(--header-bgr)" }}
          >
            <Row style={{ borderTop: "1px solid #3e3d3d" }}>
              <Col
                xs={2}
                className={`${styles.mobile__trendMovie} ${
                  PhimMoiCSS === undefined ? "" : PhimMoiCSS.mobile__trendMovie
                }`}
              >
                {/* trendmove */}
                <div className={trendMovieCSS.trend}>
                  <div className={trendMovieCSS.trend__title}>
                    <h3 className={trendMovieCSS.trend__title___name}>
                      <BiMoviePlay className="icon__sz" />
                      Phim nổi bật
                    </h3>
                  </div>

                  {allTrendMovieDatas === undefined
                    ? ""
                    : allTrendMovieDatas.map((trendmovie, index) => (
                        <Link
                          href={`/phim-moi/${trendmovie.movie.slug}`}
                          key={index}
                        >
                          <div className={trendMovieCSS.trend__content}>
                            <div
                              className={trendMovieCSS.trend__content___image}
                            >
                              <Image
                             
                              width={300}
                              height={300}
                                src={`${trendmovie.movie.thumb_url}`}
                                alt={trendmovie.movie.name}
                              />
                              <div
                                className={
                                  trendMovieCSS.trend__content___ribbon
                                }
                              >
                                <div
                                  className={
                                    trendMovieCSS.trend__content___ribbon___action
                                  }
                                >
                                  {trendmovie.movie.quality}
                                </div>
                                <div
                                  className={
                                    trendMovieCSS.trend__content___ribbon___status
                                  }
                                >
                                  {trendmovie.movie.year}
                                </div>
                              </div>
                            </div>
                            <div
                              className={trendMovieCSS.trend__content___list}
                            >
                              <div
                                className={
                                  trendMovieCSS.trend__content___list___title
                                }
                              >
                                <h3
                                  className={
                                    trendMovieCSS.trend__content___list___title___name
                                  }
                                >
                                  {trendmovie.movie.name}
                                </h3>
                                <div
                                  className={
                                    trendMovieCSS.trend__content___list___priview
                                  }
                                >
                                  {trendmovie.movie.origin_name}
                                </div>
                                <div style={{ fontSize: "11px", color: "red" }}>
                                  {trendmovie.movie.view} người xem
                                </div>
                                <div
                                  style={{ fontSize: "11px", color: "red" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                </div>
              </Col>
              <Col>
                <Row>
                  <Col>
                    {data === undefined ? (
                      ""
                    ) : (
                      <MovieList
                        title="Danh Sách Phim Bí Ẩn"
                        PhimMoiCSS={PhimMoiCSS}
                        DataMovie={data}
                      />
                    )}
                  </Col>
                </Row>
                <div className={`${PhimMoiCSS.nav__page}`}>
                  {data === undefined ? (
                    ""
                  ) : (
                    <PaginationComponent
                      visiblePages={20}
                      totalPages={100}
                      hrefPage={`/phim-bi-an/`}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { page } = params;

  // Xử lý dữ liệu cho trang phim hành động với `page` cụ thể
  const res = await fetch(
    `http://localhost:3000/api/v1/phim-bi-an?page=${page}`
  );
  const data = await res.json();

  const allTrendMovieDatas = await getTrendMovieData();

  return {
    props: {
      data,
      allTrendMovieDatas,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `http://localhost:3000/api/v1/all-movie/phim-bi-an`
  );
  const data = await res.json();

  const totalMovies = data.length;
  const totalPages = Math.ceil(totalMovies / 24);

  // Tạo danh sách các đường dẫn dựa trên số trang
  const paths = [];
  for (let page = 1; page <= totalPages; page++) {
    paths.push({
      params: { page: String(page) },
    });
  }

  return {
    paths,
    fallback: false,
  };
}