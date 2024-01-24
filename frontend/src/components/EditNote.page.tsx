import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { axiosClient } from "../lib/axios";
import { NoteData } from "../types";
import { useParams } from "react-router-dom";
import NoteForm from "./Note.form";

const NoteDisplayPage = () => {
  let { id } = useParams();
  const [note, setNote] = useState<NoteData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosClient.get(`/notes/${id}`, {
          headers: {
            Authorization: authToken,
          },
        });
        setNote(response.data);
      } catch (err: any) {
        console.log(JSON.stringify(err));
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if(!note){
    return <div>Note not found</div>
  }
  return <NoteForm formMode="EDIT" note={note}/>;
};

export default NoteDisplayPage;
