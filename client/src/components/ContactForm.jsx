import { useState } from "react";
import api from "../services/api";

export default function ContactForm({ fetchContacts }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    form.email.includes("@");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", form);

      await api.post("/api/contacts", form);

      setForm({ name: "", email: "", phone: "", message: "" });
      setSuccess("Contact submitted successfully!");
      fetchContacts();

      setTimeout(() => setSuccess(""), 2000);
    } catch (error) {
      console.error("Error submitting contact:", error);
    }
  };

  return (
    <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
      <input
        className="form-control mb-3"
        placeholder="Name *"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Email *"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="form-control mb-3"
        placeholder="Phone *"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Message (optional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button className="btn btn-primary w-100" disabled={!isValid}>
        Submit
      </button>

      {success && <p className="text-success mt-3">{success}</p>}
    </form>
  );
}
