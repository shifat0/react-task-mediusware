import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AllContacts from "./All-Contacts";
import USAContacts from "./USA-Contacts";

const Problem2 = () => {
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  //   console.log(searchText);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/problem-2/all-contacts">
            <button
              className="btn btn-lg btn-outline-primary"
              type="button"
              onClick={() => setShow(true)}
            >
              All Contacts
            </button>
          </Link>
          <Link to="/problem-2/usa-contacts">
            <button
              className="btn btn-lg btn-outline-warning"
              type="button"
              onClick={() => setShow(true)}
            >
              US Contacts
            </button>
          </Link>
        </div>
      </div>
      {show && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header row justify-content-center gap-4">
                <div className="d-flex justify-content-between">
                  <Link to="all-contacts">
                    <button
                      className="btn text-white"
                      style={{ backgroundColor: "#46139f" }}
                    >
                      All Contacts
                    </button>
                  </Link>
                  <Link to="usa-contacts">
                    <button
                      className="btn text-white"
                      style={{ backgroundColor: "#ff7f50" }}
                    >
                      US Contacts
                    </button>
                  </Link>
                  <Link to="/problem-2">
                    <button
                      onClick={() => setShow(false)}
                      className="btn"
                      style={{
                        border: "1px solid #46139f",
                      }}
                    >
                      Close
                    </button>
                  </Link>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search"
                    className="w-100"
                    onChange={(e) =>
                      setTimeout(() => {
                        setSearchText(e.target.value);
                      }, 2000)
                    }
                  />
                </form>
              </div>

              <div className="modal-body">
                {location.pathname.split("/")[2] === "all-contacts" ? (
                  <AllContacts searchText={searchText} />
                ) : (
                  <USAContacts searchText={searchText} />
                )}
              </div>

              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem2;
