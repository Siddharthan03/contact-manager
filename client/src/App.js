import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  // 🔥 Add contact ONLY to memory (page lifetime)
  const addContactToUI = (newContact) => {
    setContacts((prev) => [newContact, ...prev]);
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
