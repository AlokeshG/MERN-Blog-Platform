import { useState } from "react";
import UserLayout from "../layouts/UserLayout";
import API from "../api/api";
import { toast } from "react-toastify";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async () => {

    if (!name || !email || !message) {
      toast.warning("Please fill all fields");
      return;
    }

    try {

      await API.post("/contact", {
        name,
        email,
        message,
      });

      toast.success("Message Sent Successfully");

      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {

      console.log(error);

      toast.error("Failed to send message");

    }

  };

  return (

    <UserLayout>

      <div className="container mt-5">

        <h1 className="text-center mb-4">
          Contact Us
        </h1>

        <div className="card shadow p-5">

          <input
            className="form-control mb-3"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            rows="5"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={submitForm}
          >
            Send Message
          </button>

        </div>

      </div>

    </UserLayout>

  );
}

export default Contact;