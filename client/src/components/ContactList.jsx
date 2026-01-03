import api from "../services/api";

export default function ContactList({ contacts, fetchContacts }) {
  const deleteContact = async (id) => {
    try {
      await api.delete(`/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <ul className="list-group mt-4">
      {contacts.map((c) => (
        <li
          key={c._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{c.name}</strong>
            <br />
            📞 {c.phone}
            <br />
            📧 {c.email}
          </div>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteContact(c._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
