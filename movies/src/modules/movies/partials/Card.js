import React from "react";
import { Row, Col, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import GaugeChart from "./Gauge";

import { moviesActions } from "../slice";
import { selectMoviesObject } from "../slice/selectors";

function CardComponent({ title, category, dislikes, id, likes }) {
  const dispatch = useDispatch();
  const movies = useSelector(selectMoviesObject);

  return (
    <Card
      ti
      style={{ width: "100%" }}
      title={
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {title}
        </p>
      }
    >
      <Row>
        <p style={{ fontSize: "1rem" }}>Genre: {category}</p>
      </Row>
      <Row>
        <Col
          span={12}
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
          style={{ backgroundColor: movies.like.indexOf(id) !== -1 ? 'darkgrey' : 'blue', color: 'white', marginBottom : 10 }}
          onClick={() => dispatch(moviesActions.addLike(id))}>
            Like
          </Button>
          <GaugeChart like={likes} max={movies.totalLikes} />
        </Col>
        <Col
          span={12}
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            style={{ backgroundColor: movies.dislike.indexOf(id) !== -1 ? 'darkgrey' : 'blue', color: 'white' , marginBottom : 10}}
            onClick={() => dispatch(moviesActions.addDisLike(id))}
          >
            Dislike
          </Button>
          <GaugeChart like={dislikes} max={movies.totalDisplike} />
        </Col>
      </Row>
      <Row
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => dispatch(moviesActions.deleteMovie(id))}
          type="primary"
        >
          Supprimer
        </Button>
      </Row>
    </Card>
  );
}

export default CardComponent;
