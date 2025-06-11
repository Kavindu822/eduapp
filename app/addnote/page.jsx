"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import "./page.css";

const initialState = {
  name: "",
  year: "",
  level: "",
  language: "",
  noteFile: null,
};

const AddNote = () => {
  const CLOUDINARY_CLOUD_NAME = "dwq5xfmci";
  const UPLOAD_PRESET = "iguide_past_papers"; // change preset for notes if needed

  const [state, setState] = useState(initialState);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const editIdFromQuery = searchParams.get("editId");

  useEffect(() => {
    if (status === "authenticated") {
      fetchNotes();
    }
  }, [status]);

  useEffect(() => {
    if (notes.length > 0 && editIdFromQuery) {
      const noteToEdit = notes.find((note) => note._id === editIdFromQuery);
      if (noteToEdit) {
        startEditing(noteToEdit);
      }
    }
  }, [notes, editIdFromQuery]);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/note");
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Fetch notes error:", err);
      setError("Failed to load notes");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setState({ ...state, noteFile: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const uploadNote = async () => {
    const formData = new FormData();
    formData.append("file", state.noteFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Failed to upload note");

    const data = await res.json();
    return { id: data.public_id, url: data.secure_url };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.name || !state.year || !state.language || !state.level) {
      setError("Name, Year, Language, and Level are required.");
      return;
    }

    if (!editingId && !state.noteFile) {
      setError("Note file is required for new notes.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      let noteData = null;
      if (state.noteFile && typeof state.noteFile !== "string") {
        noteData = await uploadNote();
      }

      const payload = {
        name: state.name,
        level: Number(state.level),
        year: Number(state.year),
        language: state.language,
        note: noteData ? noteData : editingId ? undefined : null,
      };

      let response;

      if (editingId) {
        response = await fetch(`/api/note/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch("/api/note", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setSuccess(editingId ? "Note updated successfully" : "Note added successfully");
        setState(initialState);
        setEditingId(null);
        fetchNotes();
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else {
        setError(editingId ? "Failed to update note" : "Failed to add note");
      }
    } catch (err) {
      setError(err.message);
      console.error("Submit error:", err);
    }

    setIsLoading(false);
  };

  const startEditing = (note) => {
    setEditingId(note._id);
    setState({
      name: note.name,
      year: note.year,
      level: String(note.level),
      language: note.language,
      noteFile: note.note.url,
    });
    setError("");
    setSuccess("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setState(initialState);
    setError("");
    setSuccess("");
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Access denied</p>;

  return (
    <div className="container">
      <div className="form-section">
        <h2>{editingId ? "Update Note" : "Add Note"}</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Name" type="text" name="name" onChange={handleChange} value={state.name} />

          <label htmlFor="level">Level</label>
          <select name="level" value={state.level} onChange={handleChange} required>
            <option value="">Select level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <Input label="Year" type="number" name="year" onChange={handleChange} value={state.year} />

          <label htmlFor="language">Language</label>
          <select name="language" value={state.language} onChange={handleChange} required>
            <option value="">Select Language</option>
            <option value="Sinhala">Sinhala</option>
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
          </select>

          <label>Upload Note (PDF) {editingId ? "(leave empty to keep current)" : ""}</label>
          <input onChange={handleChange} type="file" name="noteFile" accept=".pdf" />

          {state.noteFile && typeof state.noteFile !== "string" && <p>Selected file: {state.noteFile.name}</p>}
          {editingId && typeof state.noteFile === "string" && (
            <p>
              Current Note:{" "}
              <a href={state.noteFile} target="_blank" rel="noopener noreferrer">
                View Note
              </a>
            </p>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? (editingId ? "Updating..." : "Uploading...") : editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              style={{
                marginLeft: "1rem",
                padding: "0.4rem 0.8rem",
                backgroundColor: "#666",
                color: "white",
                border: "none",
                borderRadius: "0.4rem",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddNote;

// ✅ Tell Next.js this page should not be statically generated
export const dynamic = "force-dynamic";
