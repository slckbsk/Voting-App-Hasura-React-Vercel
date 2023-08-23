import React from "react";
import { QUESTIONS_SUBSCRIPTION } from "./queries";
import { useSubscription } from "@apollo/client";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";

function Questions() {
  const { loading, error, data } = useSubscription(QUESTIONS_SUBSCRIPTION);

  if (loading)
    return (
      <Container
        style={{
          display: "flex",
          background: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "70%",
          height: "600px",
          padding: 10,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 400,
          }}
        >
          <Loading />
        </div>
      </Container>
    );
  if (error) return <div> Error!: {error.message}</div>;

  return (
    <Container
      style={{
        background: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "70%",
        height: "600px",
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: "1em",
        border: "1px solid Black",
      }}
    >
      <div>
        <ListGroup
          style={{
            maxWidth: "100%",
            height: "530px",
            padding: 20,
            marginTop: 20,
            marginBottom: 20,
            overflowY: "scroll",
          }}
        >
          {data.questions.map((question) => (
            <div key={question.id}>
              <Link to={`/q/${question.id}`} style={{ fontWeight: "bold" }}>
                {question.question.toUpperCase()}
              </Link>
            </div>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
}

export default Questions;
