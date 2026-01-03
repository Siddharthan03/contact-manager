import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

const API_URL = "http://localhost:5000/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
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
        <p className="text-muted">
          Built using MERN Stack
        </p>
      </div>

      {/* Contact Form */}
      <ContactForm fetchContacts={fetchContacts} />

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
