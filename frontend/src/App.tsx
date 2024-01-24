import { AuthProvider } from "./context/auth.context";
import AuthPage from "./components/Auth.page";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedLayout from "./components/Protected.layout";
import AllNotesPage from "./components/AllNotes.page";
import EditNotePage from "./components/EditNote.page";
import CreateNotePage from "./components/CreateNote.page";
import NoteDisplayPage from "./components/NoteDisplay.page";
import { Toaster } from "sonner";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Toaster />
      <AuthProvider>
        <div className="w-screen h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<ProtectedLayout />}>
              <Route path="/" element={<AllNotesPage />} />
              <Route path="/notes" element={<AllNotesPage />} />
              <Route path="/notes/create" element={<CreateNotePage />} />
              <Route path="/notes/:id/edit" element={<EditNotePage />} />
              <Route path="/notes/:id" element={<NoteDisplayPage />} />
            </Route>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
