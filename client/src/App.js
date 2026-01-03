import { useEffect, useState } from "react";
import api from "./services/api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 THIS IS THE KEY
  const addContactToUI = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
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
      <ContactForm
        fetchContacts={fetchContacts}
        addContactToUI={addContactToUI}
      />

      {/* Contact List */}
      <div className="mt-4">
        {loading ? (
          <p className="text-center text-muted">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-muted">
            No contacts found. Add your first contact above.
          </p>
        ) : (
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
