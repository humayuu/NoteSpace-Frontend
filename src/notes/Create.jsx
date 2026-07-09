import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import api from "../utils/api";

const Create = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ color: "", text: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ color: "", text: "" });
    try {
      await api.post("/note", form);
      navigate("/notes");
    } catch (err) {
      setAlert({
        color: "danger",
        text: err.response?.data?.message || "Failed to create note.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center px-3 py-4"
      style={{ minHeight: "100vh" }}
    >
      <MDBCard className="shadow-3 rounded-4 w-100" style={{ maxWidth: "560px" }}>
        <MDBCardBody className="p-4 p-md-5">
          <div className="text-center mb-4">
            <MDBIcon fas icon="pen-to-square" size="2x" className="text-primary mb-3" />
            <h3 className="fw-bold mb-1">Create note</h3>
            <p className="text-muted mb-0">Add a new note to NoteSpace</p>
          </div>

          {alert.text && (
            <div className={`alert alert-${alert.color} py-2`} role="alert">
              {alert.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <MDBInput
              className="mb-4"
              type="text"
              name="title"
              id="noteTitle"
              label="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <MDBTextArea
              className="mb-4"
              name="description"
              id="noteDescription"
              label="Description"
              rows={5}
              value={form.description}
              onChange={handleChange}
              required
            />

            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end">
              <MDBBtn
                type="button"
                color="secondary"
                outline
                onClick={() => navigate(-1)}
              >
                Cancel
              </MDBBtn>
              <MDBBtn type="submit" color="primary" disabled={loading}>
                {loading ? (
                  <>
                    <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <MDBIcon fas icon="save" className="me-2" />
                    Save note
                  </>
                )}
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Create;
