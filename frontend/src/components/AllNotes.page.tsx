import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { axiosClient } from "../lib/axios";
import { NoteData } from "../types";

const AllNotesPage = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axiosClient.get("/notes", {
          headers: {
            Authorization: authToken,
          },
        });
        setNotes(response.data);
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

  return (
    <div className="p-4 flex flex-col space-y-4 w-screen">
      <div className="flex w-full justify-between px-10">
        <h1 className="text-3xl font-bold mb-4">All Notes</h1>
        <a href="/notes/create">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Note
          </button>
        </a>
      </div>
      <div className="flex flex-wrap gap-4 justify-start">
        {notes.map((note, index) => (
          <a key={index} href={`/notes/${note.id}`} className="w-[400px]">
            <div className="bg-gray-700 text-white p-4 rounded-lg shadow-md w-full">
              <h2 className="text-xl font-bold mb-2">Title: {note.title}</h2>
              <p className="">Content:</p>
              <div className="space-y-2 line-clamp-4">
                {JSON.stringify(note.content)
                  .split('"')[1]
                  .split("\\n")
                  .map((val, idx) => (
                    <p key={idx} className="text-md">{val}</p>
                  ))}
              </div>
              <p className="text-sm text-gray-400 mt-4">Updated At: {note.updatedAt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AllNotesPage;
