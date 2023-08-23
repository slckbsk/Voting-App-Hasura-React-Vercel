import React from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

function Error(message) {
  return (
    <Container 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "20px",
        background: "white",
        height: 250,
        maxWidth: "100%",
        borderRadius: "1em",
        border: "1px solid Black",
      }}
    >
      Error: {message}
    </Container>
  );
}

export default Error;
