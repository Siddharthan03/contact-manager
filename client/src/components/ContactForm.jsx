import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/contacts";

export default function ContactForm({ fetchContacts }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  const isValid =
    form.name.trim() &&
    form.phone.trim() &&
    form.email.includes("@");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", form);
    await axios.post(API_URL, form);
    setForm({ name: "", email: "", phone: "", message: "" });
    setSuccess("Contact submitted successfully!");
    fetchContacts();
    setTimeout(() => setSuccess(""), 2000);
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
