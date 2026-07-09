import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", description: "" });
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ color: "", text: "" });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/note/${id}`);
        const note = data.note || data.data || data;
        setForm({
          title: note.title || "",
          description: note.description || "",
        });
      } catch {
        setAlert({ color: "danger", text: "Failed to load the note." });
      } finally {
        setFetching(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setAlert({ color: "", text: "" });
    try {
      await api.put(`/note/${id}`, form);
      navigate("/notes");
    } catch (err) {
      setAlert({
        color: "danger",
        text: err.response?.data?.message || "Failed to update note.",
      });
    } finally {
      setSaving(false);
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
            <MDBIcon fas icon="pen" size="2x" className="text-primary mb-3" />
            <h3 className="fw-bold mb-1">Edit note</h3>
            <p className="text-muted mb-0">Update your note details</p>
          </div>

          {alert.text && (
            <div className={`alert alert-${alert.color} py-2`} role="alert">
              {alert.text}
            </div>
          )}

          {fetching ? (
            <div className="text-center py-5">
              <MDBSpinner role="status" className="text-primary" />
            </div>
          ) : (
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
                <MDBBtn type="submit" color="primary" disabled={saving}>
                  {saving ? (
                    <>
                      <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <MDBIcon fas icon="save" className="me-2" />
                      Update note
                    </>
                  )}
                </MDBBtn>
              </div>
            </form>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Edit;
