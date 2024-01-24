import { FormEvent, useContext, useState } from "react";
import { NoteData } from "../types";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../lib/axios";
import { AuthContext } from "../context/auth.context";

type NoteFormProps =
  | {
      formMode: "CREATE";
      note?: never;
    }
  | {
      formMode: "EDIT";
      note: NoteData;
    };

const NoteForm = ({ formMode, note }: NoteFormProps) => {
  const [title, setTitle] = useState<string>(
    formMode === "EDIT" ? note.title : ""
  );
  const [content, setContent] = useState<string>(
    formMode === "EDIT" ? note.content : ""
  );

  const [error, setError] = useState(""); // To display errors
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (title.length < 5 || content.length < 10) {
        setError(
          "Note must have at least 5 characters in title and at least 10 character in content"
        );
        return;
      }
      if (formMode === "CREATE") {
        const response = await axiosClient.post(
          "/notes",
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        console.log(response.data);
        navigate(`/notes/${response.data.id}`);
      } else {
        await axiosClient.put(
          `/notes/${note.id}`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        navigate(`/notes/${note.id}`);
      }
    } catch (err: any) {
      // Handle errors (like displaying a message)
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="w-screen flex flex-col p-10 justify-center items-center">
      <div className="flex flex-col gap-2">
        <h1>{formMode === "CREATE" ? "Create a Note" : "Edit this Note"}</h1>
        <form className="flex flex-col gap-2 w-[400px]" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}

          <button type="submit">
            {formMode === "CREATE" ? "Create Note" : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
