import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AllContacts = ({ searchText }) => {
  const [contacts, setContacts] = useState([]);
  const [searchContacts, setSearchContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [showMore, setShowMore] = useState(true);

  // ref to the target element
  const loaderRef = useRef(null);

  // fetching search contacts
  const fetchSearchResult = async () => {
    console.log("called intersecting");
    try {
      const searchRes = await axios.get(
        `https://contact.mediusware.com/api/contacts/?page=${
          searchText ? searchPage : page
        }${searchText ? `&search=${searchText}` : ``}`
      );

      searchText
        ? setSearchContacts((prev) => [...prev, ...searchRes.data.results])
        : setContacts((prev) => [...prev, ...searchRes.data.results]);
      searchText
        ? setSearchPage((prevPage) => prevPage + 1)
        : setPage((prevPage) => prevPage + 1);
    } catch (err) {
      if (err.response.status === 404) setShowMore(false);
      console.log(err.message);
    }
  };

  const fetchWithoutIntersecting = async () => {
    console.log("called");
    try {
      const searchRes = await axios.get(
        `https://contact.mediusware.com/api/contacts/?page=${
          searchText ? searchPage : page
        }${searchText ? `&search=${searchText}` : ``}`
      );
      searchText &&
        setSearchContacts((prev) => [...prev, ...searchRes.data.results]);
      setSearchPage((prev) => prev + 1);
    } catch (err) {
      if (err.response.status === 404) setShowMore(false);
      console.log(err.message);
    }
  };

  // handling observer callback
  const handleSearchObserver = (entries) => {
    const target = entries[0];
    // console.log(target);
    // fetching contacts when target isIntersecting true
    if (target.isIntersecting && searchText === "") {
      fetchSearchResult();
    } else {
      searchText && fetchWithoutIntersecting();
    }
  };

  // search
  useEffect(() => {
    if (searchText !== null || "") {
      // observer options
      const options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      };

      // observing the users viewport
      const observer = new IntersectionObserver(handleSearchObserver, options);
      // starting observer
      if (showMore && loaderRef.current) {
        observer.observe(loaderRef.current);
      }

      // closing observer
      return () => {
        if (loaderRef.current) {
          observer.unobserve(loaderRef.current);
        }
      };
    }
  }, [page, searchPage, loaderRef, searchText]);

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
          {searchContacts.length === 0
            ? contacts?.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.country.name}</td>
                </tr>
              ))
            : searchContacts?.map((contact) => (
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
