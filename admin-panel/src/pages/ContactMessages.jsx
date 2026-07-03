import { useEffect, useState } from "react";
import API from "../api/api";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";

function ContactMessages() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await API.get("/contact");
      setContacts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await API.delete(`/contact/${id}`);

      toast.success("Message Deleted");

      fetchContacts();

    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <AdminLayout>

      <div className="container mt-4">

        <h2 className="mb-4">
          📨 Contact Messages
        </h2>

        <div className="table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {contacts.length === 0 ? (

                <tr>
                  <td colSpan="5" className="text-center">
                    No Messages Found
                  </td>
                </tr>

              ) : (

                contacts.map((contact) => (

                  <tr key={contact._id}>

                    <td>{contact.name}</td>

                    <td>{contact.email}</td>

                    <td>{contact.message}</td>

                    <td>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteMessage(contact._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default ContactMessages;