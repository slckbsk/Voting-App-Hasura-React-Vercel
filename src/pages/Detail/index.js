import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSubscription, useMutation } from "@apollo/client";
import { QUESTION_DETAIL_SUBSCRIPTION, NEW_VOTE_MUTATION } from "./queries";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Detail() {
  const { id } = useParams();
  const [isVoted, setIsVoted] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState();

  const { loading, error, data } = useSubscription(
    QUESTION_DETAIL_SUBSCRIPTION,
    {
      variables: {
        id,
      },
    }
  );

  const [newVote, { loading: loadingVote, errorVote }] = useMutation(
    NEW_VOTE_MUTATION,
    {
      onCompleted: () => {
        setIsVoted(true);
      },
    }
  );

  const handleClickVote = () => {
    newVote({
      variables: { input: { option_id: selectedOptionId } },
    });
  };

  if (loading || loadingVote)
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

  if (error || errorVote) return <Error message={error.message} />;

  const {
    questions_by_pk: { question, options },
  } = data;

  const total = options.reduce(
    (t, value) => t + value.votes_aggregate.aggregate.count,
    0
  );

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
        borderRadius: "1em",
        border: "1px solid Black",
      }}
    >
      <Form>
        <Form.Group className="mb-3">
          <h3 style={{ textAlign: "center" }}>{question.toUpperCase()}</h3>
          {options.map((option, i) => (
            <div className="vote_main" key={i}>
              <Form.Label htmlFor={i}>
                <input
                  style={{
                    margin: 5,
                  }}
                  type="radio"
                  name="selected"
                  id={id}
                  value={option.id}
                  onChange={({ target }) => setSelectedOptionId(target.value)}
                  disabled={isVoted}
                />
                <span>{option.option}</span>
                {isVoted && (
                  <span className="vote_count">
                    (%
                    {(
                      (option.votes_aggregate.aggregate.count * 100) /
                      (total === 0 ? 1 : total)
                    ).toFixed(2)}
                    )
                  </span>
                )}
              </Form.Label>
              {isVoted && (
                <div>
                  <progress
                    value={option.votes_aggregate.aggregate.count}
                    max={total}
                  />
                </div>
              )}
            </div>
          ))}

          {!isVoted && (
            <Button
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
                marginBottom: 10,
              }}
              size="text"
              variant="primary"
              disabled={loadingVote}
              onClick={handleClickVote}
            >
              Vote
            </Button>
          )}

          <div style={{ textAlign: "center" }}>
            <h4> TOPLAM OY : {total} </h4>
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Detail;
