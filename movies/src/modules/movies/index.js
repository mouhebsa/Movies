/* eslint-disable react-hooks/exhaustive-deps */
import { Row, Col } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./partials/Card";
import Header from "./partials/Header";
import Filters from "./partials/Filters";
import Pagination from "./partials/Pagination";
import { moviesActions } from "./slice";
import { selectMoviesObject } from "./slice/selectors";

function Movies() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMoviesObject);

  useEffect(() => {
    dispatch(moviesActions.getMovies([]));
  }, []);

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Header />
      <div
        style={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ width: "100%", marginBottom: 50 }}>
            <Filters />
          <Row style={{ backgroundColor: "lightgray" }}>
            {movies.listPerPage.map((elem) => (
              <Col
                key={elem.id}
                style={{ padding: 10 }}
                sm={24}
                xs={24}
                md={6}
                lg={6}
              >
                <Card
                  title={elem.title}
                  category={elem.category}
                  likes={elem.likes}
                  id={elem.id}
                  dislikes={elem.dislikes}
                />
              </Col>
            ))}
          </Row>
        </div>

        <Pagination />
      </div>
    </div>
  );
}

export default Movies;
