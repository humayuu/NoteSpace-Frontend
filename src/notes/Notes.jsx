import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import api from "../utils/api";
import { getUserName, logout } from "../utils/auth";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ color: "", text: "" });
  const userName = getUserName();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await api.get("/note");
        const list = Array.isArray(data) ? data : data.notes || data.data || [];
        // Backend returns Mongo-style `_id`; normalize to `id` for the UI.
        setNotes(list.map((note) => ({ ...note, id: note.id ?? note._id })));
      } catch {
        setAlert({ color: "danger", text: "Failed to load notes." });
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await api.delete(`/note/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch {
      setAlert({ color: "danger", text: "Failed to delete note." });
    }
  };

  return (
    <MDBContainer className="py-5" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">My Notes</h2>
          <p className="text-muted mb-0">All your notes in one place</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="fw-semibold">
            <MDBIcon fas icon="user-circle" className="me-2 text-primary" />
            {userName}
          </span>
          <MDBBtn tag={Link} to="/notes/create" color="primary">
            <MDBIcon fas icon="plus" className="me-2" />
            Create note
          </MDBBtn>
          <MDBBtn color="danger" outline onClick={handleLogout}>
            <MDBIcon fas icon="right-from-bracket" className="me-2" />
            Logout
          </MDBBtn>
        </div>
      </div>

      {alert.text && (
        <div className={`alert alert-${alert.color} py-2`} role="alert">
          {alert.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <MDBSpinner role="status" className="text-primary" />
        </div>
      ) : notes.length === 0 ? (
        <MDBCard className="shadow-2 rounded-4 text-center">
          <MDBCardBody className="py-5">
            <MDBIcon far icon="folder-open" size="3x" className="text-muted mb-3" />
            <h5 className="fw-bold mb-1">No notes yet</h5>
            <p className="text-muted mb-3">
              Create your first note to get started.
            </p>
            <MDBBtn tag={Link} to="/notes/create" color="primary">
              <MDBIcon fas icon="plus" className="me-2" />
              Create note
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      ) : (
        <MDBRow className="g-4">
          {notes.map((note) => (
            <MDBCol key={note.id} md="6" lg="4">
              <MDBCard className="h-100 shadow-2 rounded-4">
                <MDBCardBody className="d-flex flex-column">
                  <MDBCardTitle className="fw-bold">{note.title}</MDBCardTitle>
                  <MDBCardText className="text-muted flex-grow-1">
                    {note.description}
                  </MDBCardText>
                  <div className="d-flex gap-2 mt-3">
                    <MDBBtn
                      tag={Link}
                      to={`/notes/${note.id}/edit`}
                      color="primary"
                      outline
                      size="sm"
                    >
                      <MDBIcon fas icon="pen" className="me-2" />
                      Edit
                    </MDBBtn>
                    <MDBBtn
                      color="danger"
                      outline
                      size="sm"
                      onClick={() => handleDelete(note.id)}
                    >
                      <MDBIcon fas icon="trash" className="me-2" />
                      Delete
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default Notes;
