import { useEffect, useState } from "react";
import api from "./services/api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
      setError("Failed to load contacts. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2>Contact Management System</h2>
        <p className="text-muted">Built using MERN Stack</p>
      </div>

      {/* Contact Form */}
      <ContactForm fetchContacts={fetchContacts} />

      {/* Contact List */}
      <div className="mt-4">
        {loading && (
          <p className="text-center text-muted">Loading contacts...</p>
        )}

        {error && (
          <p className="text-center text-danger">{error}</p>
        )}

        {!loading && !error && contacts.length === 0 && (
          <p className="text-center text-muted">
            No contacts found. Add your first contact above.
          </p>
        )}

        {!loading && !error && contacts.length > 0 && (
          <ContactList
            contacts={contacts}
            fetchContacts={fetchContacts}
          />
        )}
      </div>
    </div>
  );
}

export default App;
