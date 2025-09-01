
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut, Trash2, Plus, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import dashboardLogo from "@/assets/dashboard-logo.png";
import { Loader } from "@/components/ui/loader";

import axios from "axios";

interface Note {
  id: string;
  title?: string;
  content: string;
  createdAt?: string; // comes as string from backend
}

interface User {
  email: string;
  name: string;
}

const BACKEND_URL = import.meta.env.VITE_API_URL

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // State for create note form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  // State for viewing notes
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/notes/getNotes`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setNotes(response.data.notes);

      const formattedName = response.data.user.name
        .split(" ")
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      setUser({
        name: formattedName,
        email: response.data.user.email,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });

    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  const handleCreateNoteClick = () => {
    setShowCreateForm(true);
  };

  const handleCreateNote = async () => {
    try {
        setLoading(true)
      if (!newNoteTitle.trim()) {
        setLoading(false)
        toast({
          title: "Error",
          description: "Please enter a note title.",
          variant: "destructive",
        });
    
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/notes/create`,
        {
          note: newNoteContent,
          title: newNoteTitle,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success === true) {
        setNewNoteTitle("");
        setNewNoteContent("");
        setShowCreateForm(false);
        
        toast({
            title: "Note Created",
            description: "Your new note has been created.",
        });
        
        await fetchNotes(); // refresh from backend
        setLoading(false)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleCancelCreate = () => {
    setNewNoteTitle("");
    setNewNoteContent("");
    setShowCreateForm(false);
  };

  const handleDeleteNote = async (id: string) => {
    try {
        setLoading(true)
      const response = await axios.delete(
        `${BACKEND_URL}/notes/remove/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success === true) {
        toast({
          title: "Note Deleted",
          description: "The note has been deleted.",
        });
        setLoading(false)
        await fetchNotes(); // refresh from backend
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setShowNoteDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src={dashboardLogo} alt="" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Dashboard
            </span>
          </div>

          <Button
            variant="custom"
            onClick={handleSignOut}
            className="text-primary"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
        {/* Welcome Section */}
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-foreground mb-1">
              Welcome! {user?.name}
            </h2>
            <p className="text-muted-foreground text-sm">
              Email: {user?.email}
            </p>
          </CardContent>
        </Card>

        {/* Create Note Section */}
        {!showCreateForm ? (
          <Button
            variant="custom"
            className="w-full h-12 text-base"
            onClick={handleCreateNoteClick}
          >
            <Plus size={20} className="mr-2" />
            Create Note
          </Button>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Create New Note</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancelCreate}
                >
                  <X size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="note-title"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Title
                </label>
                <Input
                  id="note-title"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="note-content"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Content
                </label>
                <Textarea
                  id="note-content"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Write your note content here..."
                  className="w-full min-h-[100px]"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleCreateNote}
                  className="flex-1"
                  variant="custom"
                >
                  Create Note
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelCreate}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Your Notes ({notes.length})
          </h3>

          {loading ? (
            <Loader />
          ) : notes.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No notes yet. Create your first note above!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div
                        className="flex-1"
                        onClick={() => handleViewNote(note)}
                      >
                        <h4 className="font-medium text-foreground mb-1">
                          {note.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {note.content?.length > 100
                            ? `${note.content.substring(0, 100)}...`
                            : note.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created:{" "}
                          {note.createdAt
                            ? new Date(note.createdAt).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                      <div className="flex space-x-1 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewNote(note);
                          }}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id);
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Note View Dialog */}
      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedNote && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {selectedNote.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Created:{" "}
                  {selectedNote.createdAt
                    ? new Date(selectedNote.createdAt).toLocaleDateString()
                    : ""}{" "}
                  at{" "}
                  {selectedNote.createdAt
                    ? new Date(selectedNote.createdAt).toLocaleTimeString()
                    : ""}
                </p>
              </DialogHeader>
              <div className="mt-4">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {selectedNote.content}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
