import React, { useEffect, useState } from "react";
import axios from "axios";

const AllContacts = () => {
  const [contacts, setContacts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      const contacts = await axios.get(
        "https://contact.mediusware.com/api/contacts/"
      );
      setContacts(contacts.data);
      setLoading(false);
    };

    fetchContacts();
  }, [setContacts]);

  // contacts.results.map((c) => console.log(c));

  return (
    <div>
      <h4>All Countries</h4>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Number</th>
            <th scope="col">Country</th>
          </tr>
          {loading
            ? "Loading..."
            : contacts?.results?.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.country.name}</td>
                </tr>
              ))}
        </thead>
      </table>
    </div>
  );
};

export default AllContacts;
