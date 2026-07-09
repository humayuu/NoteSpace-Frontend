import { Link } from "react-router-dom";
import { MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";

const Welcome = () => {
  return (
    <>
      <MDBContainer
        fluid
        className="d-flex flex-column align-items-center justify-content-center text-center px-3"
        style={{ minHeight: "calc(100vh - 90px)" }}
      >
        <MDBIcon fas icon="book-open" size="4x" className="text-primary mb-4" />
        <h1 className="display-4 fw-bold mb-3">Welcome to NoteSpace</h1>
        <p className="lead text-muted mb-4" style={{ maxWidth: "560px" }}>
          Capture your thoughts, organize your ideas, and access your notes
          anywhere. Get started in seconds.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <MDBBtn tag={Link} to="/signup" color="primary" size="lg">
            <MDBIcon fas icon="user-plus" className="me-2" />
            Get Started
          </MDBBtn>
          <MDBBtn tag={Link} to="/login" color="primary" outline size="lg">
            <MDBIcon fas icon="right-to-bracket" className="me-2" />
            Login
          </MDBBtn>
        </div>
      </MDBContainer>
    </>
  );
};

export default Welcome;
