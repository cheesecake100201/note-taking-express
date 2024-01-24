import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { axiosClient } from "../lib/axios";
import { NoteData, NoteVersion } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const NoteDisplayPage = () => {
  let { id } = useParams();
  const [note, setNote] = useState<NoteData>();
  const [versions, setVersions] = useState<NoteVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const noteResponse = await axiosClient.get(`/notes/${id}`, {
          headers: {
            Authorization: authToken,
          },
        });
        console.log(noteResponse.data.currentVersion);
        setNote(noteResponse.data);
        const versionsResponse = await axiosClient.get(
          `/notes/${id}/versions`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setVersions(versionsResponse.data);
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
  if (!note) {
    return <div>Note not found</div>;
  }
  return (
    <div className="flex gap-2 items-start justify-start h-full w-screen p-5">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-2">Title: {note.title}</h2>
        <p className="">Content:</p>
        {JSON.stringify(note.content)
          .split('"')[1]
          .split("\\n")
          .map((val) => {
            return <p className="text-md">{val}</p>;
          })}
        <p className="text-sm text-gray-400 mb-6">
          Updated At: {note.updatedAt}
        </p>
        <div className="flex justify-between">
          <a href={`/notes/${note.id}/edit`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
          </a>
          <button
            onClick={async () => {
              const response = await axiosClient.delete(`/notes/${id}`, {
                headers: {
                  Authorization: authToken,
                },
              });
              if (response.status === 200) {
                toast("DELETION SUCCESS");
              } else {
                toast("DELETION FAILED");
              }
              navigate("/notes");
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-5 w-full max-w-lg">
        <h3 className="font-semibold mb-2">Versions:</h3>
        <div className="space-y-4">
          {versions
            .filter((version) => version.id !== note.currentVersion)
            .map((version) => (
              <div className="bg-gray-600 text-white p-4 rounded-lg shadow-sm mb-3">
                <h4 className="text-lg font-semibold">Version {version.id}</h4>
                <h4 className="text-md font-medium">Title: {version.title}</h4>
                <p className="text-sm">Content:</p>
                {JSON.stringify(version.content)
                  .split('"')[1]
                  .split("\\n")
                  .map((val) => {
                    return <p className="text-sm">{val}</p>;
                  })}
                <p className="text-xs text-gray-400">
                  Updated At: {version.updatedAt}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NoteDisplayPage;
