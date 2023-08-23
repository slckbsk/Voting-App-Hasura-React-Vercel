import { Routes, Route, Link } from "react-router-dom";
import Questions from "./pages/Questions";
import NewQuestion from "./pages/New";
import Detail from "./pages/Detail";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import ListGroup from "react-bootstrap/ListGroup";
function App() {
  return (
    <div className="App">
      <nav>
        <Container
          style={{
            background: "#ffffff",
            maxWidth: "70%",
            height: "70px",
            padding: 10,
            borderRadius: "1em",
            border: "1px solid Black",
          }}
        >
          <ListGroup style={{ textAlign: "start", fontWeight: "bold" }}>
            <Link to="/">QUESTIONS</Link>
            <Link to="/new">NEW QUESTIONS</Link>
          </ListGroup>
        </Container>
      </nav>

      <Routes>
        <Route path="/" element={<Questions />} />
        <Route path="new" element={<NewQuestion />} />
        <Route path="q/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
