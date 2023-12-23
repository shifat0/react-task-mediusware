import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(true);

  // ref to the target element
  const loaderRef = useRef(null);

  // fetching all-contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        `https://contact.mediusware.com/api/contacts/?page=${page}`
      );
      console.log(res.data.results);

      setContacts((prev) => [...prev, ...res.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      // if (err.message.includes(404)) setShowMore(false);
      if (err.response.status === 404) setShowMore(false);
      // console.log(err.message);
    }
  };

  // handling observer callback
  const handleObserver = (entries) => {
    const target = entries[0];
    // fetching contacts when target isIntersecting true
    if (target.isIntersecting) {
      fetchContacts();
    }
  };

  useEffect(() => {
    // observer options
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    // observing the users viewport
    const observer = new IntersectionObserver(handleObserver, options);
    // starting observer
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // closing observer
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [contacts]);

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
        </thead>
        <tbody>
          {contacts?.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.phone}</td>
              <td>{contact.country.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showMore && (
        <div ref={loaderRef} style={{ margin: "10px" }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default AllContacts;
