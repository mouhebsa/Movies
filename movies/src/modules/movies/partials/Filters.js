import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";

import { moviesActions } from "../slice";
import { selectMoviesObject } from "../slice/selectors";

function Header() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMoviesObject);
  const { Option } = Select;

  const handleChange = (ev) => {
    dispatch(moviesActions.addCategory(ev));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: 80,
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: "2rem", fontWeight: "bold", color: "darkgrey" }}>
        <Select
          mode="multiple"
          size={"large"}
          placeholder="Filtrer"
          onChange={handleChange}
          style={{
            marginRight: 30,
            width: 300,
          }}
          value={movies.selectedCategpries}
        >
          {movies.categories.map((item) => {
            return <Option key={item}>{item}</Option>;
          })}
        </Select>
      </p>
    </div>
  );
}

export default Header;
