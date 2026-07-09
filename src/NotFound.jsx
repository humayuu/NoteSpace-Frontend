import { Link } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBIcon } from "mdb-react-ui-kit";

const NotFound = () => {
  return (
    <MDBContainer
      fluid
      className="d-flex flex-column align-items-center justify-content-center text-center px-3"
      style={{ minHeight: "100vh" }}
    >
      <MDBIcon fas icon="triangle-exclamation" size="4x" className="text-warning mb-4" />
      <h1 className="display-1 fw-bold mb-2">404</h1>
      <h4 className="fw-bold mb-2">Page not found</h4>
      <p className="text-muted mb-4" style={{ maxWidth: "420px" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <MDBBtn tag={Link} to="/" color="primary" size="lg">
        <MDBIcon fas icon="house" className="me-2" />
        Back to home
      </MDBBtn>
    </MDBContainer>
  );
};

export default NotFound;
