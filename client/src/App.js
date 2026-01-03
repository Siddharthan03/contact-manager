import { useEffect, useState } from "react";
import api from "./services/api";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  // 🔹 Load session-only contacts on first render
  useEffect(() => {
    const sessionContacts =
      JSON.parse(sessionStorage.getItem("sessionContacts")) || [];
    setContacts(sessionContacts);
  }, []);

  // 🔹 Add contact only for this tab session
  const addContactToUI = (newContact) => {
    setContacts((prev) => {
      const updated = [newContact, ...prev];
      sessionStorage.setItem(
        "sessionContacts",
        JSON.stringify(updated)
      );
      return updated;
    });
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2>Contact Management System</h2>
        <p className="text-muted">Built using MERN Stack</p>
      </div>

      {/* Contact Form */}
      <ContactForm addContactToUI={addContactToUI} />

      {/* Contact List */}
      <div className="mt-4">
        {contacts.length === 0 ? (
          <p className="text-center text-muted">
            No contacts found. Add your first contact above.
          </p>
        ) : (
          <ContactList contacts={contacts} />
        )}
      </div>
    </div>
  );
}

export default App;
