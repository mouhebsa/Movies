import React from "react";


function Header() {


  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: "2rem", fontWeight: "bold", color: "darkgrey" }}>
        Liste des films
      </p>
    </div>
  );
}

export default Header;
