import { useEffect, useState } from "react";
import api from "./services/api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContacts = async () => {
    try {
      setError("");
      const res = await api.get("/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
      setError("Unable to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📇 Contact Manager</h2>

      <ContactForm fetchContacts={fetchContacts} />

      {loading && <p>Loading contacts...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <ContactList contacts={contacts} fetchContacts={fetchContacts} />
      )}
    </div>
  );
}
