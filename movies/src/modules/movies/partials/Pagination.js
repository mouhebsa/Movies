/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from "react";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { moviesActions } from "../slice";
import { selectMoviesObject } from "../slice/selectors";

function Header() {
  const dispatch = useDispatch();
  const movies = useSelector(selectMoviesObject);

  const onShowSizeChange = (current, pageSize) => {
    dispatch(moviesActions.setPage({ page: current -1, rowsPerpage: pageSize }));
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <button  onClick={()=>onShowSizeChange(movies.page - 1, movies.rowsPerpage)}>précédent</button>;
    }

    if (type === "next") {
      return <button onClick={()=>onShowSizeChange(movies.page + 1, movies.rowsPerpage)}>suivant</button>;
    }

    return originalElement;
  };

  return (
    <Pagination
      showSizeChanger
      itemRender={itemRender}
      onChange={onShowSizeChange}
      current={movies.page +1}
      pageSize={movies.rowsPerpage}
      pageSizeOptions={[4, 8, 12]}
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={movies.page}
      total={movies.total}
    />
  );
}

export default Header;
