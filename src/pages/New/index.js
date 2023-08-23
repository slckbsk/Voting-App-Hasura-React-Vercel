import React, { useState } from "react";
import { NEW_QUESTIONS_MUTATION } from "./queries";
import { useMutation } from "@apollo/client";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const initialOptions = [];

function New() {
  const [addQuestion, { loading, data }] = useMutation(NEW_QUESTIONS_MUTATION);

  const [question, setQuestion] = useState("");

  const [options, setOptions] = useState(initialOptions);

  const handleChangeOption = ({ target }) => {
    const newArray = options;
    newArray[target.id].option = target.value;
    setOptions([...newArray]);
  };

  const handleSave = () => {
    const filledOptions = options.filter((option) => option.option !== "");
    if (question === "" || filledOptions.length < 2) return false;

    addQuestion({
      variables: {
        input: {
          question,
          options: {
            data: filledOptions,
          },
        },
      },
    });

    setQuestion("");
    setOptions(initialOptions);
  };

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
          <h3>Questions</h3>
          <input
            className="form-control"
            style={{
              marginBottom: 10,
            }}
            placeholder="Your Question"
            value={question}
            disabled={loading}
            onChange={({ target }) => setQuestion(target.value)}
          />

          <h3>Options</h3>
          <p className="fw-lighter"> Only Five Options</p>

          {options.map((option, index) => (
            <div key={index}>
              <input
                className="form-control"
                style={{
                  marginBottom: 10,
                }}
                placeholder="Your Options .."
                value={option.title}
                id={index}
                onChange={handleChangeOption}
                disabled={loading}
              />
            </div>
          ))}

          <Button
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
              marginBottom: 10,
              visibility: options.length === 5 ? "hidden" : "visible",
            }}
            size="text"
            variant="primary"
            disabled={loading}
            onClick={() => setOptions([...options, { option: "" }])}
          >
            Add Option
          </Button>

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
            disabled={loading}
            onClick={handleSave}
          >
            Save
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default New;
